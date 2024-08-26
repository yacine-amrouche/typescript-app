import { useState, useEffect } from "react";
export function useLocalStorage<T>(key: string, intialValue: T | (() => T)) {
  const [value, setvalue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof intialValue === "function") {
        return (intialValue as () => T)();
      } else {
        return intialValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setvalue] as [T, typeof setvalue];
}
