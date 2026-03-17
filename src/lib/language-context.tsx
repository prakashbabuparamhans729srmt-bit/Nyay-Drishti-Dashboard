"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, translations } from './translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>('hi');

  useEffect(() => {
    const saved = localStorage.getItem('nyay-language') as LanguageCode;
    if (saved && translations[saved]) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
    localStorage.setItem('nyay-language', lang);
  };

  const t = (key: string) => {
    return translations[language][key] || translations['hi'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
