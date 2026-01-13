import { useFavorites } from "../context/FavoritesContext";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

const Favorites = () => {
  const { favoriteIds } = useFavorites();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (favoriteIds.length === 0) {
        setMeals([]);
        return;
      }

      setLoading(true);

      const results = await Promise.all(
        favoriteIds.map((id) =>
          fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          ).then((res) => res.json())
        )
      );

      setMeals(results.map((r) => r.meals?.[0]).filter(Boolean));
      setLoading(false);
    };

    load();
  }, [favoriteIds]);

  if (loading) return <Spinner />;

  return (
    <div style={{ padding: "1.5rem" }}>
      <h1>Your Favorites</h1>

      {meals.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {meals.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;