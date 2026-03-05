import React, { useState } from 'react';

export const LanguageSwitcher: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ne'>('en');

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'ne' : 'en';
    setLang(newLang);
    
    // Trigger a custom event that App.tsx can listen to
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLang }));
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 px-4 py-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all border-2 border-green-600 flex items-center gap-2"
    >
      <span className="text-2xl">🌐</span>
      <span className="font-semibold text-gray-700">
        {lang === 'en' ? 'नेपाली' : 'English'}
      </span>
    </button>
  );
};