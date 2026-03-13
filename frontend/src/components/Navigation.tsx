import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  language: 'en' | 'ne';
  onLanguageToggle: () => void;
}

export const Navigation: React.FC<Props> = ({ language, onLanguageToggle }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: { en: 'Home', ne: 'होम' }, icon: '🏠' },
    { path: '/about', label: { en: 'About', ne: 'बारेमा' }, icon: 'ℹ️' },
    { path: '/diseases', label: { en: 'Diseases', ne: 'रोगहरू' }, icon: '🦠' },
    { path: '/how-it-works', label: { en: 'How It Works', ne: 'यो कसरी काम गर्छ' }, icon: '⚙️' },
    { path: '/help', label: { en: 'Help', ne: 'मद्दत' }, icon: '❓' }
  ];

  return (
    <nav className="bg-white shadow-md mb-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-green-700 hover:text-green-800 transition-colors">
            🌾 <span className="hidden sm:inline">Smart Farming</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1
                    ${isActive 
                      ? 'bg-green-600 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-green-50 hover:text-green-800'
                    }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label[language]}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side: Language Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={onLanguageToggle}
              className="px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border-2 border-green-600 flex items-center gap-2"
            >
              <span className="text-xl">🌐</span>
              <span className="hidden sm:inline font-semibold text-gray-700">
                {language === 'en' ? 'नेपाली' : 'English'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex gap-1 pb-3 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1 whitespace-nowrap
                  ${isActive 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-600 hover:bg-green-50'
                  }`}
              >
                <span>{item.icon}</span>
                <span className="sm:inline hidden">{item.label[language]}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};