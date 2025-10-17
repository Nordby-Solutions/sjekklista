import { useTranslation } from "react-i18next";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", label: "English" },
    { code: "no", label: "Norsk" },
  ];

  const getLabel = (code: string) =>
    languages.find((lang) => lang.code === code)?.label ?? "English";

  const [selectedLang, setSelectedLang] = useState<string>(
    i18n.language.toLowerCase()
  );

  useEffect(() => {
    // Keep state in sync if i18n.language changes externally
    setSelectedLang(i18n.language.toLowerCase());
  }, [i18n.language]);

  const handleLanguageChange = (code: string) => {
    setSelectedLang(code);
    i18n.changeLanguage(code);
  };

  return (
    <Select value={selectedLang} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-32">
        <span>{getLabel(selectedLang)}</span>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
