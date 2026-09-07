/** Preferências são opcionais: bloquear o armazenamento não deve bloquear a UI. */
export const safeStorage = {
  getItem(key) {
    try { return localStorage.getItem(key); }
    catch { return null; }
  },
  setItem(key, value) {
    try { localStorage.setItem(key, value); }
    catch { /* O estado desta sessão continua disponível na memória. */ }
  },
  removeItem(key) {
    try { localStorage.removeItem(key); }
    catch { /* Armazenamento indisponível. */ }
  },
};
