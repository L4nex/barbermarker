import { useState } from "react";


export function useLocalStorage(key: string) {
  const [storedValue, setStoredValue] = useState(() => {
    let item
    try {
      const item = localStorage.getItem(key);
      return JSON.parse(item ?? "")
    } catch {
      return item
    }
  });

  const setValue = (value?: number | string | object) => {
    try {
      setStoredValue(value)
      if (typeof value === "object") {
        localStorage.setItem(key, JSON.stringify(value))
      } else if (value) {
        localStorage.setItem(key, value.toString())
      }
    } catch (error) {
      console.log("Erro ao persistir dados", error)
    }
  }

  return { storedValue, setValue }
}