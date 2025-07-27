// src/components/ThemeToggle.tsx

import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700"
    >
      Switch to {theme === 'light' ? 'dark' : 'light'}
    </button>
  );
}