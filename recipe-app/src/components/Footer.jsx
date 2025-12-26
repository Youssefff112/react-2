export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-4">
          {/* Left: Recipe Logo */}
          <div className="flex items-center gap-2">
            <img 
              src="/src/assets/logo.png" 
              alt="Recipe Logo" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-gray-800">Recipe</span>
          </div>
          
          {/* Right: Route */}
          <div>
            <span className="text-2xl font-bold text-blue-600">Route</span>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>© 2025 Nagy Osama™. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
