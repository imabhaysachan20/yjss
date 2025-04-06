import en from '../translations/en.json';
import hi from '../translations/hi.json';

class LanguageService {
  constructor() {
    if (LanguageService.instance) {
      return LanguageService.instance;
    }
    this.currentLanguage = typeof window !== 'undefined' 
      ? localStorage.getItem('language') || 'hi'
      : 'hi';
    this.translations = { en, hi };
    this.listeners = new Set();
    LanguageService.instance = this;
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    this.notifyListeners();
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentLanguage));
  }

  translate(key) {
    const keys = key.split('.');
    let current = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      if (current[k] === undefined) {
        return key;
      }
      current = current[k];
    }
    
    return current;
  }
}

export const languageService = new LanguageService();
export const t = (key) => languageService.translate(key);
