"use client"
import React from 'react';
import { languageService } from "@/utils/languageService";

export const LanguageSwitcher = () => {
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    languageService.setLanguage(selectedLanguage); // Update the language
  };

  return (
    <select
      onChange={handleLanguageChange}
      defaultValue={languageService.getCurrentLanguage()}
      className="bg-white text-black p-1 rounded"
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
    </select>
  );
};
