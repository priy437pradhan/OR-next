'use client';

import { useTheme } from '@/context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="OR-dark-mode-toggle" onClick={toggleTheme}>
      <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
    </div>
  );
}