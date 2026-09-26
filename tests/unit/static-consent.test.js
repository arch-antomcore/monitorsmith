import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { describe, expect, it, vi } from 'vitest';

const KEY = 'ms_consent_v2';

async function createPage({ saved = null, blockedStorage = false, slots = false } = {}) {
  const storage = new Map(saved ? [[KEY, JSON.stringify(saved)]] : []);
  const elements = [];
  const updates = [];
  const reload = vi.fn();
  const window = Object.assign(new EventTarget(), { location: { reload } });
  const makeElement = (tag) => {
    const element = Object.assign(new EventTarget(), {
      tag, style: {}, checked: false, removed: false, children: new Map(),
      setAttribute() {}, focus() {},
      remove() { this.removed = true; },
      querySelector(selector) {
        if (!this.children.has(selector)) this.children.set(selector, makeElement('control'));
        return this.children.get(selector);
      },
    });
    return element;
  };
  const appendChild = (element) => elements.push(element);
  const footer = { appendChild };
  const adSlots = slots ? [makeElement('ins')] : [];
  const document = {
    documentElement: { lang: 'pt-BR' },
    body: { appendChild }, head: { appendChild },
    createElement: makeElement,
    getElementById: (id) => elements.find((element) => element.id === id && !element.removed),
    querySelector: (selector) => selector === 'footer' ? footer : adSlots[0],
    querySelectorAll: () => adSlots,
  };
  const source = await readFile('scripts/generate-seo-pages.mjs', 'utf8');
  const controller = source
    .match(/const CONSENT_BODY_SCRIPT = `[\s\S]*?<script>([\s\S]*?)<\/script>`;/)[1]
    .replaceAll('${ADSENSE_CLIENT}', 'ca-pub-5926952327268950');
  vm.runInNewContext(controller, {
    window, document,
    localStorage: {
      getItem(key) { if (blockedStorage) throw new Error('Storage blocked'); return storage.get(key) ?? null; },
      setItem(key, value) { if (blockedStorage) throw new Error('Storage blocked'); storage.set(key, value); },
    },
    gtag: (...args) => updates.push(args),
  });
  const click = (element) => element.dispatchEvent(new Event('click'));
  return {
    window, storage, reload, updates,
    get banner() { return document.getElementById('ms-consent'); },
    get scripts() { return elements.filter((element) => element.tag === 'script' && !element.removed); },
    open() { click(elements.find((element) => element.tag === 'button')); },
    decide(selector) { click(this.banner.querySelector(selector)); },
    crossTab(state) {
      if (state) storage.set(KEY, JSON.stringify(state));
      else storage.delete(KEY);
      const event = new Event('storage');
      Object.defineProperty(event, 'key', { value: KEY });
      window.dispatchEvent(event);
    },
  };
}

describe('preferências de privacidade das páginas estáticas', () => {
  it('lembra a decisão na própria página quando localStorage está bloqueado', async () => {
    const page = await createPage({ blockedStorage: true });
    page.open();
    page.decide('[data-ms-accept]');
    expect(page.banner).toBeUndefined();
    page.open();
    expect(page.banner.querySelector('[data-ms-ads]').checked).toBe(true);
    expect(page.banner.querySelector('[data-ms-personalization]').checked).toBe(true);
    page.decide('[data-ms-reject]');
    expect(page.reload).not.toHaveBeenCalled();
    page.open();
    expect(page.banner.querySelector('[data-ms-ads]').checked).toBe(false);
    expect(page.scripts).toHaveLength(0);
  });

  it('sincroniza o formulário aberto quando outra aba muda a decisão', async () => {
    const page = await createPage();
    page.open();
    page.crossTab({ decided: true, ads: true, personalization: false });
    expect(page.banner.querySelector('[data-ms-ads]').checked).toBe(true);
    expect(page.banner.querySelector('[data-ms-personalization]').checked).toBe(false);
    expect(page.scripts).toHaveLength(0);
  });

  it('revogar em outra aba cancela a carga pendente antes de recarregar', async () => {
    const page = await createPage({ saved: { decided: true, ads: true, personalization: true }, slots: true });
    const script = page.scripts[0];
    expect(page.window.adsbygoogle).toHaveLength(0);
    page.crossTab({ decided: true, ads: false, personalization: false });
    expect(page.scripts).toHaveLength(0);
    expect(script.onload).toBeNull();
    expect(page.reload).toHaveBeenCalledOnce();
    expect(page.updates.at(-1)[2].ad_storage).toBe('denied');
    expect(page.window.adsbygoogle).toHaveLength(0);
  });

  it('permite nova carga depois de falha de rede e só solicita o anúncio após carregar', async () => {
    const page = await createPage({ slots: true });
    page.decide('[data-ms-accept]');
    page.scripts[0].onerror();
    expect(page.scripts).toHaveLength(0);
    page.open();
    page.decide('[data-ms-accept]');
    expect(page.scripts).toHaveLength(1);
    expect(page.window.adsbygoogle).toHaveLength(0);
    page.scripts[0].onload();
    expect(page.scripts[0].src).toBe('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5926952327268950');
    expect(page.scripts[0].async).toBe(true);
    expect(page.scripts[0].crossOrigin).toBe('anonymous');
    expect(page.window.adsbygoogle).toHaveLength(1);
  });

  it('cancelar com armazenamento bloqueado impede callbacks atrasados e permite novo consentimento', async () => {
    const page = await createPage({ blockedStorage: true, slots: true });
    page.decide('[data-ms-accept]');
    const delayedLoad = page.scripts[0].onload;
    page.open();
    page.decide('[data-ms-reject]');
    delayedLoad();
    expect(page.scripts).toHaveLength(0);
    expect(page.window.adsbygoogle).toHaveLength(0);
    expect(page.reload).not.toHaveBeenCalled();
    page.open();
    page.decide('[data-ms-accept]');
    page.scripts[0].onload();
    expect(page.window.adsbygoogle).toHaveLength(1);
  });
});
