import React from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2 absolute top-4 right-4">
      <button
        className={`px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-green-600' : 'bg-gray-800'}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <button
        className={`px-2 py-1 rounded ${i18n.language === 'ja' ? 'bg-green-600' : 'bg-gray-800'}`}
        onClick={() => changeLanguage('ja')}
      >
        JP
      </button>
    </div>
  );
}
