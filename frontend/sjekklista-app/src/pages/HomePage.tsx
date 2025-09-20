import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ClipboardList, FileText, Settings } from "lucide-react";
import FloatingActionButton from "@/components/FloatingActionButton";
import { API } from "@/data/api";
import SearchBar from "@/components/SearchBar";
import type { ChecklistTemplateLookup } from "@/data/models";

export default function HomePage() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<ChecklistTemplateLookup[]>([]);
  const [search, setSearch] = useState("");

  const menuItems = [
    {
      icon: <ClipboardList className="h-4 w-4" />,
      label: "Ny sjekkliste",
      onClick: () => navigate("/design"),
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "Lag rapport",
      onClick: () => console.log("Rapport"),
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: "Innstillinger",
      onClick: () => console.log("Innstillinger"),
    },
  ];

  useEffect(() => {
    (async () => {
      const data = await API.checklistTempate.getChecklistTemplateLookup();
      setTemplates(data);
    })();
  }, []);

  if (templates.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600 mb-4">Du har ingen sjekklister enda.</p>
        <Button
          className="bg-primary text-white hover:bg-blue-600"
          onClick={() => {
            navigate("/design");
          }}
        >
          ➕ Lag din første sjekkliste
        </Button>
      </div>
    );
  }

  const filtered = templates.filter((t) =>
    t?.name?.toLowerCase()?.includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="px-4 pt-6 pb-2 space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">Sjekklister</h1>
        <p className="text-sm text-gray-600">
          Trykk på en sjekkliste for å starte registrering.
        </p>

        <SearchBar
          onSearch={(query) => setSearch(query)}
          placeholder="Søk sjekklister..."
        />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {(search.length === 0 ? templates : filtered).length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            Ingen sjekklister funnet.
          </div>
        ) : (
          (search.length === 0 ? templates : filtered).map((t) => (
            <Link
              to={`/checklist/${t.id}`}
              key={t.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex items-center justify-between border border-gray-200"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {t.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {t.description || "Ingen beskrivelse tilgjengelig."}
                </p>
              </div>
              <ArrowRight className="text-gray-400" />
            </Link>
          ))
        )}
      </div>

      <FloatingActionButton items={menuItems} />
    </div>
  );
}
