import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const RecipeCard = ({ meal }) => {
  const { idMeal, strMeal, strMealThumb } = meal;
  const { isFavorite } = useFavorites();

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      <img
        src={strMealThumb}
        alt={strMeal}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />

      <div style={{ padding: "0.75rem" }}>
        <h3>{strMeal}</h3>
        {isFavorite(idMeal) && <p>★ Favorite</p>}
        <Link to={`/recipe/${idMeal}`}>View Details</Link>
      </div>
    </div>
  );
};

export default RecipeCard;