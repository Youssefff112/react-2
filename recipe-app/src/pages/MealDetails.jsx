import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MealDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMealDetails();
  }, [id]);

  const fetchMealDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      
      if (response.data.meals && response.data.meals.length > 0) {
        setMeal(response.data.meals[0]);
      } else {
        setError('Meal not found. Please check the ID and try again.');
      }
    } catch (err) {
      console.error('Error fetching meal:', err);
      setError('Failed to load meal details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
        <div className="text-xl text-red-600">{error}</div>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-xl text-gray-600">No meal data</div>
      </div>
    );
  }

  // Extract ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ name: ingredient, measure: measure || '' });
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-800 mb-8" style={{ fontFamily: 'Pacifico, cursive' }}>
          {meal.strMeal}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Instructions */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="mb-6">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Instructions */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6 border-2 border-gray-200">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {meal.strInstructions}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              {meal.strYoutube && (
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  <span>▶</span>
                  youtube
                </a>
              )}
              {meal.strSource && (
                <a
                  href={meal.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
                >
                  <span>🌐</span>
                  source
                </a>
              )}
            </div>
          </div>

          {/* Right Column - Ingredients */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Ingredients
              </h2>
              <div className="border-t-2 border-gray-200">
                {ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-4 py-3 border-b border-gray-200"
                  >
                    <div className="text-gray-800 font-medium">
                      {ingredient.name}:
                    </div>
                    <div className="text-gray-600 text-right">
                      {ingredient.measure}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
