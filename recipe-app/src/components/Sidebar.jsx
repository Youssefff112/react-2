import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-gray-50 h-screen fixed left-0 top-0 pt-6 px-4 overflow-y-auto z-40 border-r border-gray-200">
      {/* Logo */}
      <div className="mb-6 text-center pb-6">
        <img 
          src="/logo.png" 
          alt="Recipe Logo" 
          className="h-32 w-auto mx-auto"
        />
      </div>

      <nav className="flex flex-col gap-3">
        <Link
          to="/"
          className={`flex items-center gap-3 px-6 py-4 rounded-3xl font-bold transition-all text-base ${
            isActive('/') 
              ? 'bg-orange-500 text-white shadow-lg' 
              : 'text-gray-800 bg-white border border-gray-300 hover:bg-gray-100'
          }`}
        >
          <span className="text-xl">🍽️</span>
          Meals
        </Link>
        <Link
          to="/ingredients"
          className={`flex items-center gap-3 px-6 py-4 rounded-3xl font-bold transition-all text-base ${
            isActive('/ingredients') 
              ? 'bg-orange-500 text-white shadow-lg' 
              : 'text-gray-800 bg-white border border-gray-300 hover:bg-gray-100'
          }`}
        >
          <span className="text-xl">🧂</span>
          Ingredients
        </Link>
        <Link
          to="/area"
          className={`flex items-center gap-3 px-6 py-4 rounded-3xl font-bold transition-all text-base ${
            isActive('/area') 
              ? 'bg-orange-500 text-white shadow-lg' 
              : 'text-gray-800 bg-white border border-gray-300 hover:bg-gray-100'
          }`}
        >
          <span className="text-xl">🌍</span>
          Area
        </Link>
      </nav>
    </aside>
  );
}
