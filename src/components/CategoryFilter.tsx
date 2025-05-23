
import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    'All',
    'AI Innovations',
    'Technology News',
    'Industry Insights',
    'Machine Learning',
    'Data Science'
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-teal-600 dark:bg-teal-700 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
