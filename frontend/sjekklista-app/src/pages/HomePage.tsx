import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ClipboardList, FileText, Settings } from "lucide-react";
import FloatingActionButton from "@/components/FloatingActionButton";
import { API } from "@/data/api";
import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<{ id: string; name: string }[]>(
    []
  );
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
    <div className="flex-1 h-full flex flex-col gap-2">
      <SearchBar
        onSearch={(query) => setSearch(query)}
        placeholder="Søk sjekklister..."
      />

      <div className="flex flex-col gap-2 overflow-y-auto flex-1 h-full p-2">
        {/* Checklist cards */}
        {(search.length == 0 ? templates : filtered).map((t) => (
          <Link
            to={`/checklist/${t.id}`}
            key={t.id}
            className="bg-white rounded-lg shadow-md p-4 flex"
          >
            <div className="mr-auto">
              <h2 className="text-lg font-semibold text-gray-900">{t.name}</h2>
              <p className="text-gray-700 mt-2">
                Åpne denne sjekklisten for å fortsette eller gjøre endringer.
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
