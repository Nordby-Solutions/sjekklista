import { useEffect, useState } from "react";
import localforage from "localforage";
import type { ChecklistTemplate } from "@/data/models";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const getChecklistTemplateLookup = async () => {
  const data =
    (await localforage.getItem<ChecklistTemplate[]>("checklists")) ?? [];

  return data.map((x) => ({ id: x.id, name: x.name }));
};

export default function AppHome() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<{ id: string; name: string }[]>(
    []
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const data = await getChecklistTemplateLookup();
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
            navigate("/app/design");
          }}
        >
          ➕ Lag din første sjekkliste
        </Button>
      </div>
    );
  }

  const filtered = templates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Button
        className="bg-primary text-white hover:bg-blue-600"
        onClick={() => {
          navigate("/app/design");
        }}
      >
        ➕ Lag ny sjekkliste
      </Button>

      <Input
        placeholder="Søk etter sjekklister..."
        className="bg-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Checklist cards */}
      {(search.length == 0 ? templates : filtered).map((t) => (
        <div key={t.id} className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold text-gray-900">{t.name}</h2>
          <p className="text-gray-700 mt-2">
            Åpne denne sjekklisten for å fortsette eller gjøre endringer.
          </p>
          <Button
            className="mt-4 bg-secondary text-white hover:bg-orange-500"
            onClick={() => {
              console.log("Åpne sjekkliste:", t.id);
              // navigate or open checklist
            }}
          >
            Åpne sjekkliste
          </Button>
        </div>
      ))}
    </div>
  );
}
