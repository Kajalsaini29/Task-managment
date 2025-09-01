// "use client";

// import { useState, useEffect } from "react";

// export function useLocalStorage<T>(key: string, initialValue: T) {
//   const [state, setState] = useState<T>(() => {
//     try {
//       if (typeof window === "undefined") return initialValue;
//       const stored = localStorage.getItem(key);
//       return stored ? (JSON.parse(stored) as T) : initialValue;
//     } catch {
//       return initialValue;
//     }
//   });

//   useEffect(() => {
//     try {
//       localStorage.setItem(key, JSON.stringify(state));
//     } catch {}
//   }, [key, state]);

//   return [state, setState] as const;
// }


"use client";
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const item = localStorage.getItem(key);
      if (item) setStoredValue(JSON.parse(item));
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (mounted) localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
