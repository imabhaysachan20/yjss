"use client"; // Required for Next.js App Router

import { useEffect } from "react";

export default function GoogleTranslate() {
    useEffect(() => {
        // Create and append Google Translate script
        const script = document.createElement("script");
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        // Initialize Google Translate
        window.googleTranslateElementInit = function () {
            new window.google.translate.TranslateElement(
                { 
                    pageLanguage: "en", 
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE 
                },
                "google_translate_element"
            );
        };
    }, []);

    return (
        <div className="fixed top-4 right-4 z-50 bg-white p-2 rounded-md shadow-md border border-gray-300">
            <p className="text-sm font-semibold mb-1 text-gray-700">Translate:</p>
            <div id="google_translate_element"></div>
        </div>
    );
}
