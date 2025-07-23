'use client';

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import cn from "classnames";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  const className = cn(
    'bg-white dark:bg-gray-100 text-gray-700 dark:text-gray-800',
    'rounded-full p-3 md:p-4',
    'transition-all duration-200',
    'shadow-lg hover:shadow-xl',
    'focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-gray-300',
    'border border-gray-200 dark:border-gray-300',
    'hover:bg-gray-50 dark:hover:bg-gray-200',
    // Responsive sizing
    'w-12 h-12 md:w-14 md:h-14',
    // Centering
    'flex items-center justify-center'
  );

  return (
    <button
      onClick={handleToggle}
      className={className}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 md:w-6 md:h-6" />
      ) : (
        <Sun className="w-5 h-5 md:w-6 md:h-6" />
      )}
    </button>
  );
} 