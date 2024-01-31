import React, { createContext, useState, ReactNode, useContext } from "react";

export type Content = "home" | "about" | "resume" | "work";

//I am creating this context because github pages won't allow routing other than username/{repository}
//I am taking this as a good challenge to try a less convential approach, which might allow for a more modern look to the website

interface ContentContextProviderProps {
  children: ReactNode;
}

export type ContentContext = {
  content : Content;
  setContent: React.Dispatch<React.SetStateAction<Content>>
}

export const ContentContext = createContext<ContentContext| null>(null);

export default function ContentContextProvider({ children }: ContentContextProviderProps) {
  const [content, setContent] = useState<Content>("home");

  return (
    <ContentContext.Provider value={{content, setContent }}>
      {children}
    </ContentContext.Provider>
  );
}

// custom hook
export function useContentContext() {
  const context = useContext(ContentContext)
  if (!context){
    throw new Error("useContentContext should be used within a ContentContextProvider")
  };
  return context;
}