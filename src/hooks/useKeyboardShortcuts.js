import { useEffect, useRef } from 'react';

import { SHORTCUTS } from '../constants/shortcuts';

function canUseDom() {
  return typeof window !== 'undefined';
}

function isEditableTarget(target) {
  if (typeof Element === 'undefined' || !(target instanceof Element)) {
    return false;
  }

  return Boolean(
    target.isContentEditable ||
      target.closest('input, textarea, select, [contenteditable]'),
  );
}

function isShortcutScopeBlocked(target) {
  if (typeof document === 'undefined') return false;

  if (document.querySelector('[role="dialog"][aria-modal="true"], [data-ms-shortcuts-disabled="true"]')) {
    return true;
  }

  return Boolean(
    target instanceof Element
    && target.closest('[data-ms-shortcuts-disabled="true"]'),
  );
}

function matchesShortcut(event, shortcut) {
  const eventKey = event.key?.toLowerCase();
  const shortcutKey = shortcut.key?.toLowerCase();

  if (shortcut.shiftKey !== undefined && event.shiftKey !== shortcut.shiftKey) {
    return false;
  }

  if (shortcut.code && event.code === shortcut.code) {
    return !shortcutKey || eventKey === shortcutKey || shortcutKey === '?';
  }

  return Boolean(shortcutKey && eventKey === shortcutKey);
}

function normalizeArguments(configOrShortcuts, legacyHandlers, legacyOptions) {
  if (Array.isArray(configOrShortcuts)) {
    return {
      shortcuts: configOrShortcuts,
      handlers: legacyHandlers || {},
      ...(legacyOptions || {}),
    };
  }

  return configOrShortcuts || {};
}

export function useKeyboardShortcuts(configOrShortcuts = {}, legacyHandlers, legacyOptions) {
  const config = normalizeArguments(configOrShortcuts, legacyHandlers, legacyOptions);
  const {
    shortcuts = SHORTCUTS,
    handlers = {},
    enabled = true,
    ignoreEditable = true,
  } = config;
  const shortcutsRef = useRef(shortcuts);
  const handlersRef = useRef(handlers);
  const ignoreEditableRef = useRef(ignoreEditable);

  useEffect(() => {
    shortcutsRef.current = shortcuts;
    handlersRef.current = handlers;
    ignoreEditableRef.current = ignoreEditable;
  }, [handlers, ignoreEditable, shortcuts]);

  useEffect(() => {
    if (!canUseDom() || !enabled) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.defaultPrevented || event.isComposing || event.key === 'Process') {
        return;
      }

      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      if (isShortcutScopeBlocked(event.target)) {
        return;
      }

      const shortcut = shortcutsRef.current.find((candidate) => matchesShortcut(event, candidate));
      if (!shortcut) {
        return;
      }

      if (
        ignoreEditableRef.current &&
        !shortcut.allowInEditable &&
        isEditableTarget(event.target)
      ) {
        return;
      }

      if (event.repeat && !shortcut.allowRepeat) {
        return;
      }

      const handler = handlersRef.current[shortcut.action] || handlersRef.current[shortcut.id];
      if (typeof handler !== 'function') {
        return;
      }

      event.preventDefault();
      handler(event, shortcut);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled]);
}

export default useKeyboardShortcuts;
