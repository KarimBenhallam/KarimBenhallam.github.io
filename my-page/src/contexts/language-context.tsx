import React, { createContext, useState, ReactNode, useContext } from "react";

export type Language = "en" | "fr";

interface LanguageContextProviderProps {
  children: ReactNode;
  defaultLanguage: Language;
  //added the defaultLanguage prop in order to keep the application consistent troughout different components
}

export type LanguageContext = {
  language : Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>
}

export const LanguageContext = createContext<LanguageContext| null>(null);

export default function LanguageContextProvider({ children, defaultLanguage }: LanguageContextProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// custom hook
export function useLanguageContext() {
  const context = useContext(LanguageContext)
  if (!context){
    throw new Error("useLanguageContext should be used within a LanguageContextProvider")
  };
  return context;
}