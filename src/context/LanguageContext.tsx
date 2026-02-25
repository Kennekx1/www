'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import ru from '@/i18n/ru.json';
import kk from '@/i18n/kk.json';

type Language = 'ru' | 'kk';

const translations: Record<Language, any> = { ru, kk };

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('ru');

    useEffect(() => {
        const savedLang = localStorage.getItem('vittorio-lang') as Language;
        if (savedLang && (savedLang === 'ru' || savedLang === 'kk')) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLanguageState(savedLang);
            document.documentElement.lang = savedLang;
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('vittorio-lang', lang);
        document.documentElement.lang = lang;
    };

    const t = (key: string): string => {
        const keys = key.split('.');
        let result: any = translations[language];

        for (const k of keys) {
            if (result && typeof result === 'object' && k in result) {
                result = result[k];
            } else {
                return key; // fallback to key itself
            }
        }

        return typeof result === 'string' ? result : key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
