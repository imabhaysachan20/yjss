"use client"
import React from 'react';
import { languageService } from "@/utils/languageService";

export const LanguageSwitcher = () => {
  const handleLanguageChange = (event) => {
    languageService.setLanguage(event.target.value); // Update the language
  };

  return (
    <select
      onChange={handleLanguageChange}
      defaultValue={languageService.getCurrentLanguage()}
      className="bg-white text-gray-800 font-medium text-xs sm:text-base rounded px-2 py-1 shadow-md"
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
    </select>
  );
};
