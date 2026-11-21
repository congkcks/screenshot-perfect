import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ninhbinh_saved_places";
const DEFAULT_SAVED = ["trang-an", "hang-mua"];
const EVENT_NAME = "ninhbinh_favorites_changed";

function getStoredFavorites(): string[] {
  if (typeof window === "undefined") return DEFAULT_SAVED;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SAVED;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_SAVED;
  } catch {
    return DEFAULT_SAVED;
  }
}

export function useFavorites() {
  const [savedIds, setSavedIds] = useState<string[]>(getStoredFavorites);

  useEffect(() => {
    // Initial sync
    setSavedIds(getStoredFavorites());

    const handleUpdate = () => {
      setSavedIds(getStoredFavorites());
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new Event(EVENT_NAME));
      } catch {}
      return next;
    });
  }, []);

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds]
  );

  const clearSaved = useCallback(() => {
    setSavedIds([]);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      window.dispatchEvent(new Event(EVENT_NAME));
    } catch {}
  }, []);

  return {
    savedIds,
    savedCount: savedIds.length,
    toggleSave,
    isSaved,
    clearSaved,
  };
}
