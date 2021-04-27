// If what was sent in was a function then execute it.
export const safeExec = (func?: (...args) => any, ...args) => {
  if (func && typeof func === 'function') {
    func(...args);
  }
}