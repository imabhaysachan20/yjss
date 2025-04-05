'use client'

import { useEffect } from 'react'

export default function GoogleTranslate() {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script')
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.body.appendChild(script)

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,bn,ta,te,gu,ml',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        )
      }
    }

    addGoogleTranslateScript()
  }, [])

  return (
    <div className="hidden md:flex items-center gap-2" id="translate-container">
      <span className="text-sm text-white">Translate:</span>
      <div id="google_translate_element" />
    </div>
  )
}
