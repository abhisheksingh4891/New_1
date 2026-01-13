import { useEffect, useState } from "react";

const KEY = "favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(KEY) || "[]");
    setFavorites(stored);
  }, []);

  const toggleFavorite = (id: number) => {
    const updated = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];

    setFavorites(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));
  };

  return { favorites, toggleFavorite };
}
