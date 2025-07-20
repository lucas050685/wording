'use client';

interface LoaderProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Loader({ text, size = 'md' }: LoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizeClasses[size]} border-4 border-gray-200 dark:border-gray-600 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin`}></div>
      {text && (
        <p className="text-gray-600 dark:text-gray-300 font-medium">{text}</p>
      )}
    </div>
  );
} 