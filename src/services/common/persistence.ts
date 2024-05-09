export function genericPersistence<T>(storageKey: string) {
  return {
    load: (): T | null => {
      const rawItem = localStorage.getItem(storageKey);
      if (!rawItem) return null;
      return JSON.parse(rawItem) as T;
    },
    save: (value: T): void => localStorage.setItem(storageKey,  JSON.stringify(value)),
    drop: (): void => localStorage.removeItem(storageKey),
  }
}
