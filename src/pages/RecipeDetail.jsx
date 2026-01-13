import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { useFavorites } from "../context/FavoritesContext";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  const meal = data?.meals?.[0];
  if (!meal) return <p>Recipe not found.</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing) ingredients.push(`${ing} - ${measure}`);
  }

  return (
    <div style={{ padding: "1.5rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{meal.strMeal}</h1>

      <button
        onClick={() =>
          isFavorite(meal.idMeal)
            ? removeFavorite(meal.idMeal)
            : addFavorite(meal.idMeal)
        }
        style={{ marginBottom: "1rem" }}
      >
        {isFavorite(meal.idMeal) ? "Remove from Favorites" : "Add to Favorites"}
      </button>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      />

      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p style={{ whiteSpace: "pre-line" }}>{meal.strInstructions}</p>
    </div>
  );
};

export default RecipeDetail;