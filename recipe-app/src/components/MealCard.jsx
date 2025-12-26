import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function MealCard({ meal }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/meal/${meal.idMeal}`}>
      <div 
        className="bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Circular Image Container */}
        <div className="relative h-52 bg-gray-100 flex items-center justify-center pt-4 pb-6">
          <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'spin-recipe' : ''}`}
            />
          </div>
        </div>
        
        {/* Meal Info */}
        <div className="px-6 py-4 text-center bg-white">
          <h3 className="font-bold text-gray-800 text-base mb-2 line-clamp-2 h-12 flex items-center justify-center">
            {meal.strMeal}
          </h3>
          {meal.strArea && (
            <p className="text-teal-600 text-sm font-medium flex items-center justify-center gap-1 mb-3">
              📍 {meal.strArea}
            </p>
          )}
          <button 
            className="w-full px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-sm font-bold transition-colors duration-200"
          >
            View Recipe
          </button>
        </div>
      </div>
    </Link>
  );
}
