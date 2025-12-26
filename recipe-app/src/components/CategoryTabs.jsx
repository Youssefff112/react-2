export default function CategoryTabs({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center px-4">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-2 rounded-full font-bold transition-all text-sm cursor-pointer hover:shadow-lg ${
            selectedCategory === category
              ? 'bg-black text-white shadow-md'
              : 'bg-white text-gray-500 border-2 border-gray-400 hover:border-gray-500'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
