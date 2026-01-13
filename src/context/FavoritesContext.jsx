import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useLocalStorage("favoriteRecipes", []);

  const addFavorite = (id) => {
    setFavoriteIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFavorite = (id) => {
    setFavoriteIds((prev) => prev.filter((fav) => fav !== id));
  };

  const isFavorite = (id) => favoriteIds.includes(id);

  const value = useMemo(
    () => ({
      favoriteIds,
      addFavorite,
      removeFavorite,
      isFavorite,
    }),
    [favoriteIds]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);