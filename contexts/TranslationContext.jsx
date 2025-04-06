"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { languageService } from '../utils/languageService';

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState(languageService.currentLanguage);

  useEffect(() => {
    return languageService.subscribe((newLang) => {
      setLanguage(newLang);
    });
  }, []);

  return (
    <TranslationContext.Provider value={{ language }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return { 
    t: (key) => languageService.translate(key),
    language: context.language,
    setLanguage: (lang) => languageService.setLanguage(lang)
  };
}
