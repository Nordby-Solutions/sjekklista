import React from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface NonAuthenticatedLayoutProps {
  children: React.ReactNode;
}

export const NonAuthenticatedLayout: React.FC<NonAuthenticatedLayoutProps> = ({
  children,
}) => {
  const { t } = useTranslation();

  return (
    <div className="h-screen max-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-white to-indigo-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="flex justify-between items-center px-6 pt-4 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl text-indigo-700 dark:text-indigo-300 tracking-tight">
            Sjekklista
          </span>
        </div>
        <div>
          <LanguageSwitcher />
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center px-4 py-8 overflow-auto">
        <div className="w-full max-w-md backdrop-blur-5xl dark:bg-gray-800/90 rounded-xl shadow-lg">
          {children}
        </div>
      </main>
      <footer className="flex-shrink-0 text-center text-xs text-gray-400 py-4">
        {t("brandName", "Sjekklista")} &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};
