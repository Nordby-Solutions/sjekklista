import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ClipboardList } from "lucide-react";
import FloatingActionButton from "@/components/FloatingActionButton";
import { API } from "@/data/api";
import SearchBar from "@/components/SearchBar";
import { NoExistingChecklistTemplates } from "./NoExistingChecklistTemplates";
import { useTranslation } from "react-i18next";

export default function ChecklistTemplatesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<{ id: string; name: string }[]>(
    []
  );
  const [search, setSearch] = useState("");

  const menuItems = [
    {
      icon: <ClipboardList className="h-4 w-4" />,
      label: t("noTemplates.createButton", "Ny sjekkliste"),
      onClick: () => navigate("/design"),
    },
  ];

  useEffect(() => {
    (async () => {
      const data = await API.checklistTempate.getChecklistTemplateLookup();
      setTemplates(data);
    })();
  }, []);

  if (templates.length === 0) {
    return <NoExistingChecklistTemplates />;
  }

  const filtered = templates.filter((t) =>
    t?.name?.toLowerCase()?.includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 h-full flex flex-col gap-2">
      <SearchBar
        onSearch={(query) => setSearch(query)}
        placeholder={t("noTemplates.searchPlaceholder", "Søk sjekklister...")}
      />

      <div className="flex flex-col gap-2 overflow-y-auto flex-1 h-full p-2">
        {/* Checklist cards */}
        {(search.length == 0 ? templates : filtered).map((template) => (
          <Link
            to={`/design/${template.id}`}
            key={template.id}
            className="bg-white rounded-lg shadow-md p-4 flex"
          >
            <div className="mr-auto">
              <h2 className="text-lg font-semibold text-gray-900">
                {template.name}
              </h2>
              <p className="text-gray-700 mt-2">
                {t(
                  "noTemplates.openToEdit",
                  "Åpne denne sjekklisten å gjøre endringer."
                )}
              </p>
            </div>
            <ArrowRight />
          </Link>
        ))}
      </div>

      <FloatingActionButton items={menuItems} />
    </div>
  );
}
