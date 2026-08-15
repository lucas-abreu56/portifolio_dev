"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

type Language = "en" | "pt";

const STORAGE_KEY = "portfolio-lang";
const DEFAULT_LANGUAGE: Language = "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (ptText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// localStorage is an external store, so it is read through useSyncExternalStore
// rather than copied into state inside an effect. That keeps the server and the
// first client render agreed on DEFAULT_LANGUAGE, then swaps to the stored value
// in the same pass React uses to hydrate.
const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  // "storage" only fires for *other* tabs; this tab is notified by emit().
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function emit() {
  for (const listener of listeners) listener();
}

function readStoredLanguage(): Language {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "en" || saved === "pt" ? saved : DEFAULT_LANGUAGE;
}

function readServerLanguage(): Language {
  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribe,
    readStoredLanguage,
    readServerLanguage
  );

  const toggleLanguage = useCallback(() => {
    localStorage.setItem(
      STORAGE_KEY,
      readStoredLanguage() === "en" ? "pt" : "en"
    );
    emit();
  }, []);

  const value = useMemo<LanguageContextType>(
    () => ({
      language,
      toggleLanguage,
      t: (ptText: string, enText: string) =>
        language === "pt" ? ptText : enText,
    }),
    [language, toggleLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
