import { useMemo } from 'react';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

export const DEFAULT_KEYBOARD_SHORTCUTS = [
  {
    id: 'black',
    group: 'Modos de exibição',
    keys: ['B'],
    action: 'Tela preta',
    description: 'Ativa preto absoluto para reduzir luz e ocultar distrações.',
  },
  {
    id: 'white',
    group: 'Modos de exibição',
    keys: ['W'],
    action: 'Luz suave',
    description: 'Abre a iluminação neutra para chamadas e preenchimento facial.',
  },
  {
    id: 'cleaner',
    group: 'Modos de exibição',
    keys: ['C'],
    action: 'Inspeção para limpeza',
    description: 'Realça poeira, marcas e variações de superfície.',
  },
  {
    id: 'focus-timer',
    group: 'Modos de exibição',
    keys: ['P'],
    action: 'Temporizador de foco',
    description: 'Abre um timer discreto para ciclos de foco.',
  },
  {
    id: 'message',
    group: 'Modos de exibição',
    keys: ['M'],
    action: 'Mensagem em tela',
    description: 'Exibe um status grande no monitor secundário.',
  },
  {
    id: 'fullscreen',
    group: 'Navegação',
    keys: ['F'],
    action: 'Alternar tela cheia',
    description: 'Expande o app para ocupar 100% da tela física (ocultando abas do navegador e a barra de tarefas do Windows).',
  },
  {
    id: 'restore',
    group: 'Navegação',
    keys: ['Esc'],
    action: 'Restaurar controles',
    description: 'Revela a interface e sai do foco quando aplicável.',
  },
  {
    id: 'help',
    group: 'Navegação',
    keys: ['?'],
    action: 'Abrir esta ajuda',
    description: 'Consulta os atalhos globais de navegação.',
  },
];

const SHORTCUT_COPY = {
  openLibrary: {
    action: 'Todas as ferramentas',
    description: 'Retorna à visão geral do MonitorSmith para escolher uma ferramenta por tarefa.',
    group: 'Navegação',
  },
  toggleFullscreen: {
    action: 'Alternar tela cheia',
    description: 'Entra ou sai do modo imersivo do navegador.',
    group: 'Navegação',
  },
  activateBlackScreen: {
    action: 'Tela preta',
    description: 'Ativa preto absoluto para reduzir luz e ocultar distrações.',
    group: 'Modos de exibição',
  },
  activateWhiteLighting: {
    action: 'Luz suave',
    description: 'Abre a iluminação neutra para chamadas e preenchimento facial.',
    group: 'Modos de exibição',
  },
  activateScreenCleaner: {
    action: 'Inspeção para limpeza',
    description: 'Realça poeira, marcas e variações de superfície.',
    group: 'Modos de exibição',
  },
  openCalibration: {
    action: 'Verificação do display',
    description: 'Abre padrões de gamma, escala de cinza, nitidez e RGB.',
    group: 'Modos de exibição',
  },
  openColorStudio: {
    action: 'Estúdio de cor',
    description: 'Abre cores sólidas, presets e um atalho de verde para chroma.',
    group: 'Modos de exibição',
  },
  openFocusTimer: {
    action: 'Temporizador de foco',
    description: 'Abre um timer discreto para ciclos de foco.',
    group: 'Modos de exibição',
  },
  openClock: {
    action: 'Relógio em tela',
    description: 'Exibe hora e data em tipografia própria para um segundo monitor.',
    group: 'Modos de exibição',
  },
  openMessageOverlay: {
    action: 'Mensagem em tela',
    description: 'Exibe um status grande no monitor secundário.',
    group: 'Modos de exibição',
  },
  restoreInterface: {
    action: 'Restaurar controles',
    description: 'Revela a interface e sai do foco quando aplicável.',
    group: 'Navegação',
  },
  toggleHelp: {
    action: 'Abrir esta ajuda',
    description: 'Consulta os atalhos globais de navegação.',
    group: 'Navegação',
  },
};

function normalizeShortcuts(shortcuts) {
  const source = Array.isArray(shortcuts)
    ? shortcuts
    : shortcuts && typeof shortcuts === 'object'
      ? Object.values(shortcuts)
      : DEFAULT_KEYBOARD_SHORTCUTS;

  return source.map((shortcut, index) => {
    const copy = SHORTCUT_COPY[shortcut.action] || {};
    return {
      id: shortcut.id || shortcut.action || `shortcut-${index}`,
      group: shortcut.group || copy.group || 'Geral',
      keys: Array.isArray(shortcut.keys)
        ? shortcut.keys
        : shortcut.key
          ? [shortcut.label || String(shortcut.key).replace(/^key/i, '').toUpperCase()]
          : [],
      action:
        shortcut.title ||
        shortcut.actionLabel ||
        copy.action ||
        shortcut.description ||
        shortcut.label ||
        'Atalho',
      description: shortcut.detail || copy.description || '',
    };
  });
}

/** Modal reutilizavel que aceita a matriz de atalhos ativa por props. */
export default function KeyboardShortcutsModal({
  open,
  onClose,
  shortcuts = DEFAULT_KEYBOARD_SHORTCUTS,
}) {
  const groups = useMemo(() => {
    return normalizeShortcuts(shortcuts).reduce((collection, shortcut) => {
      if (!collection[shortcut.group]) collection[shortcut.group] = [];
      collection[shortcut.group].push(shortcut);
      return collection;
    }, {});
  }, [shortcuts]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Atalhos de teclado"
      description="Atalhos globais para trocar de ferramenta. Ajustes locais aparecem no próprio modo e campos de texto permanecem preservados."
      size="lg"
      footer={
        <Button variant="primary" onClick={onClose}>
          Entendi
        </Button>
      }
    >
      <div className="wbp-shortcuts">
        {Object.entries(groups).map(([group, entries], groupIndex) => (
          <section className="wbp-shortcuts__group" key={group} aria-labelledby={`shortcut-group-${groupIndex}`}>
            <h3 id={`shortcut-group-${groupIndex}`}>{group}</h3>
            <ul className="wbp-shortcuts__list">
              {entries.map((shortcut) => (
                <li className="wbp-shortcuts__item" key={shortcut.id}>
                  <div className="wbp-shortcuts__copy">
                    <strong>{shortcut.action}</strong>
                    {shortcut.description ? <span>{shortcut.description}</span> : null}
                  </div>
                  {shortcut.keys.length ? (
                    <span className="wbp-shortcuts__keys" aria-label={`Tecla ${shortcut.keys.join(' mais ')}`}>
                      {shortcut.keys.map((key, index) => (
                        <span className="wbp-shortcuts__key-pair" key={`${shortcut.id}-${key}-${index}`}>
                          {index > 0 ? <span className="wbp-shortcuts__plus" aria-hidden="true">+</span> : null}
                          <kbd>{key}</kbd>
                        </span>
                      ))}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Modal>
  );
}
