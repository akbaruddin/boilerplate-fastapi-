import { writable } from "svelte/store";

export default function localStore(key, initialValue) {
  // Read from localStorage
  const storedValue = localStorage.getItem(key);
  const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;

  // Create a writable store with the parsed value
  const store = writable(parsedValue);

  // Subscribe to store changes and update localStorage
  store.subscribe((value) => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return store;
}
