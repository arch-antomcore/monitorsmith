import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildNavigationHref, resolveLocationLaunch } from '../../src/hooks/useAppRouting';
import { useToolStore } from '../../src/store/toolStore';
import { useUIStore } from '../../src/store/uiStore';

describe('presets e navegação reproduzível', () => {
  it('lançamento pelo store aplica preset e toggle de ajuda sempre guarda booleanos', () => {
    useToolStore.getState().activateMode('color', 'green-screen');
    expect(useToolStore.getState().activePreset).toEqual({ customColor: '#00B140', ambientBrightness: 100 });
    useUIStore.getState().setIsHelpOpen(false);
    useUIStore.getState().setIsHelpOpen((previous) => !previous);
    expect(useUIStore.getState().isHelpOpen).toBe(true);
    useUIStore.getState().setIsHelpOpen((previous) => !previous);
    expect(useUIStore.getState().isHelpOpen).toBe(false);
  });

  it('mantém parâmetros do preset ao normalizar o hash e não contamina a próxima ferramenta', () => {
    const input = new URL('https://monitorsmith.app/?lang=pt#color?color=123456&brightness=42');
    const target = resolveLocationLaunch(input);
    const href = buildNavigationHref(target.toolId, target.preset, input.href);
    expect(href).toBe('/?lang=pt&color=123456&brightness=42#color');
    expect(resolveLocationLaunch(new URL(href, input)).preset).toEqual(target.preset);
    expect(buildNavigationHref('black', {}, new URL(href, input).href)).toBe('/?lang=pt#black');
  });

  it.each(['5abc', '12.5', '-1', '101'])('ignora brilho inválido %s', (brightness) => {
    expect(resolveLocationLaunch(new URL(`https://monitorsmith.app/?tool=color&brightness=${brightness}`)).preset)
      .not.toHaveProperty('ambientBrightness');
  });

  it('preserva âncoras de conteúdo e mantém o preset padrão do chroma em uma URL curta', () => {
    expect(resolveLocationLaunch(new URL('https://monitorsmith.app/#faq')).preserveHash).toBe(true);
    const green = resolveLocationLaunch(new URL('https://monitorsmith.app/#green-screen'));
    expect(green.preset).toEqual({ customColor: '#00B140', ambientBrightness: 100 });
    expect(buildNavigationHref(green.toolId, green.preset, 'https://monitorsmith.app/')).toBe('/#green-screen');
  });
});

describe('consentimento e carregamento assíncrono de publicidade', () => {
  let consent;
  let storage;
  let scripts;

  beforeEach(async () => {
    vi.resetModules();
    storage = new Map();
    scripts = [];
    vi.stubGlobal('localStorage', {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
      removeItem: (key) => storage.delete(key),
    });
    vi.stubGlobal('window', Object.assign(new EventTarget(), { dataLayer: [] }));
    vi.stubGlobal('document', {
      createElement: () => ({ remove: vi.fn() }),
      head: { appendChild: (script) => scripts.push(script) },
    });
    consent = await import('../../src/lib/consent');
  });

  afterEach(() => vi.unstubAllGlobals());

  it.each([
    { decided: true, ads: 'false', personalization: 'true' },
    { decided: false, ads: true, personalization: true },
    { decided: true, ads: false, personalization: true },
  ])('não trata valores inválidos como autorização: %j', (state) => {
    storage.set('ms_consent_v2', JSON.stringify(state));
    expect(consent.readConsent().ads).toBe(false);
    expect(consent.readConsent().personalization).toBe(false);
  });

  it('recusa carregar qualquer script antes da decisão', async () => {
    expect(await consent.loadAdSense({ ads: true })).toBe(false);
    expect(scripts).toHaveLength(0);
  });

  it('preserva a escolha nesta aba mesmo quando o armazenamento falha', () => {
    localStorage.setItem = () => { throw new Error('Storage blocked'); };
    consent.writeConsent({ ads: true, personalization: false });
    expect(consent.readConsent()).toEqual({ decided: true, ads: true, personalization: false });
  });

  it('cancela uma carga pendente ao revogar e permite nova carga após consentir', async () => {
    const allowed = consent.writeConsent({ ads: true, personalization: false });
    const pending = consent.loadAdSense(allowed);
    expect(scripts).toHaveLength(1);
    consent.writeConsent({ ads: false });
    expect(await pending).toBe(false);
    expect(scripts[0].remove).toHaveBeenCalled();
    const next = consent.loadAdSense(consent.writeConsent({ ads: true, personalization: true }));
    expect(scripts).toHaveLength(2);
    scripts[1].onload();
    expect(await next).toBe(true);
    expect(window.adsbygoogle.requestNonPersonalizedAds).toBe(0);
  });

  it('permite tentar novamente depois de erro de rede', async () => {
    const allowed = consent.writeConsent({ ads: true });
    const failed = consent.loadAdSense(allowed);
    scripts[0].onerror();
    expect(await failed).toBe(false);
    const retry = consent.loadAdSense(allowed);
    scripts[1].onload();
    expect(await retry).toBe(true);
  });

  it('atualiza a preferência quando outra aba revoga o consentimento', () => {
    consent.writeConsent({ ads: true });
    const listener = vi.fn();
    const unsubscribe = consent.subscribeConsent(listener);
    storage.set('ms_consent_v2', JSON.stringify({ decided: true, ads: false }));
    const event = new Event('storage');
    Object.defineProperty(event, 'key', { value: 'ms_consent_v2' });
    window.dispatchEvent(event);
    expect(listener).toHaveBeenCalledWith({ decided: true, ads: false, personalization: false });
    unsubscribe();
  });
});
