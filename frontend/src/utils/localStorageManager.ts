class localStorageManager {
  static setItem(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem(key: string) {
    const value = localStorage.getItem(key);
    const finalValue = value ? JSON.parse(value) : null;
    try {
      return JSON.parse(finalValue);
    } catch {
      return finalValue;
    }
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}

export default localStorageManager;
