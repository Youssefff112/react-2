import { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryTabs from '../components/CategoryTabs';
import MealCard from '../components/MealCard';

const CATEGORIES = [
  'All', 'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat',
  'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 'Seafood',
  'Side', 'Starter', 'Vegan', 'Vegetarian'
];

export default function Home({ view = 'meals' }) {
  const [items, setItems] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (view === 'meals') {
      fetchMeals();
    } else if (view === 'ingredients') {
      fetchIngredients();
    } else if (view === 'area') {
      fetchAreas();
    }
  }, [view, selectedItem, selectedCategory]);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      
      if (selectedCategory !== 'All') {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
      }

      const response = await axios.get(url);
      setMeals(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching meals:', error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchIngredients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
      );
      setItems(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAreas = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
      );
      setItems(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching areas:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleIngredientSelect = async (ingredient) => {
    setSelectedItem(ingredient);
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.strIngredient}`
      );
      setMeals(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching meals by ingredient:', error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAreaSelect = async (area) => {
    setSelectedItem(area);
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area.strArea}`
      );
      setMeals(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching meals by area:', error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  if (view === 'ingredients') {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Ingredients</h2>
          {loading && <div className="text-center text-gray-600">Loading...</div>}
          {!loading && selectedItem ? (
            <div>
              <button
                onClick={() => setSelectedItem(null)}
                className="mb-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                ← Back to Ingredients
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {meals.map(meal => (
                  <MealCard key={meal.idMeal} meal={meal} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {items.map(ingredient => (
                <button
                  key={ingredient.idIngredient}
                  onClick={() => handleIngredientSelect(ingredient)}
                  className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-all border-2 border-gray-200 hover:border-orange-400"
                >
                  <p className="font-medium text-gray-800 text-sm">
                    {ingredient.strIngredient}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (view === 'area') {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Areas</h2>
          {loading && <div className="text-center text-gray-600">Loading...</div>}
          {!loading && selectedItem ? (
            <div>
              <button
                onClick={() => setSelectedItem(null)}
                className="mb-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                ← Back to Areas
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {meals.map(meal => (
                  <MealCard key={meal.idMeal} meal={meal} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {items.map(area => (
                <button
                  key={area.strArea}
                  onClick={() => handleAreaSelect(area)}
                  className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-all border-2 border-gray-200 hover:border-orange-400"
                >
                  <p className="font-medium text-gray-800 text-sm">
                    {area.strArea}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default Meals view
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h1 className="text-4xl text-orange-500 text-left mb-8" style={{ fontFamily: 'Pacifico, cursive' }}>
          Learn, Cook, Eat Your Food
        </h1>

        {/* Categories */}
        <div className="mb-12">
          <CategoryTabs 
            categories={CATEGORIES} 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Meals Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-gray-600">Loading meals...</div>
          </div>
        ) : meals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {meals.map(meal => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-gray-600">No meals found</div>
          </div>
        )}
      </div>
    </div>
  );
}
