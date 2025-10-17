import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-6">
      <div className="max-w-xl text-center">
        <h2 className="text-3xl font-bold mb-2">{t("notFoundTitle")}</h2>
        <p className="text-slate-600 mb-6">{t("notFoundMessage")}</p>
        <div className="flex justify-center">
          <Link to="/">
            <Button variant="ghost">{t("goToHome")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
