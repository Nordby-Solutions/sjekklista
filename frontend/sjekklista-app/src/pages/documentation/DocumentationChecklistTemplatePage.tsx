import { useTranslation } from "react-i18next";

export function DocumentationChecklistTemplatePage() {
  const { t } = useTranslation();
  return <h1>{t("docs.checklists.title", "Dokumentasjon sjekklister")}</h1>;
}
