import { API } from "@/data/api";
import type { Checklist } from "@/data/models";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HistoryPage() {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [filteredChecklists, __] = useState<Checklist[]>([]);
  const [search, _] = useState("");

  useEffect(() => {
    (async () => {
      const data = await API.checklist.getChecklists();

      console.log(data);

      setChecklists(data);
    })();
  }, []);

  return (
    <div>
      <div className="px-4 pt-6 pb-2 space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Tidligere registreringer
        </h1>
        <p className="text-sm text-gray-600">
          Her finner du en oversikt over sjekklister du allerede har fullført.
        </p>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto flex-1 h-full p-2">
        {/* Checklist cards */}
        {(search.length == 0 ? checklists : filteredChecklists).map((t) => (
          <Link
            to={`/checklist/${t.id}`}
            key={t.id}
            className="bg-white rounded-lg shadow-md p-4 flex"
          >
            <div className="mr-auto">
              <h2 className="text-lg font-semibold text-gray-900">
                {t.status}
              </h2>
              <h2 className="text-lg font-semibold text-gray-900">
                {t.createdBy} - {t.createdAt}
              </h2>
              <p className="text-gray-700 mt-2">
                Åpne denne sjekklisten for å fortsette eller gjøre endringer.
              </p>
            </div>
            <ArrowRight />
          </Link>
        ))}
      </div>
    </div>
  );
}
