import { useLocation } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

const SearchResults = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query") || "";

  const { data, loading, error } = useFetch(
    query
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      : null
  );

  if (!query) return <p>Search for a recipe above.</p>;
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  const meals = data?.meals || [];

  return (
    <div style={{ padding: "1.5rem" }}>
      <h1>Results for "{query}"</h1>

      {meals.length === 0 ? (
        <p>No recipes found.</p>
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

export default SearchResults;