import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardList, FileText, Settings, X } from "lucide-react";
import FloatingActionButton from "@/components/FloatingActionButton";
import SearchBar from "@/components/SearchBar";
import { API } from "@/data/api";
import type { Checklist, ChecklistTemplateLookup } from "@/data/models";
import { createPdf } from "@/logic/createPdf";

export default function ChecklistDashboard() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<ChecklistTemplateLookup[]>([]);
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [checklistTemplates, setChecklistTemplates] = useState<
    { id: string; name: string }[]
  >([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<Checklist["status"]>("in_progress");
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);

  const statusOptions: Checklist["status"][] = [
    "draft",
    "in_progress",
    "completed",
  ];

  useEffect(() => {
    (async () => {
      const [templateLookup, checklistData, templateData] = await Promise.all([
        API.checklistTempate.getChecklistTemplateLookup(),
        API.checklist.getChecklists(),
        API.checklistTempate.getChecklistTemplates(),
      ]);
      setTemplates(templateLookup);
      setChecklists(checklistData);
      setChecklistTemplates(
        templateData.map((x) => ({ id: x.id, name: x.name }))
      );
    })();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowTemplateDialog(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredChecklists = checklists.filter(
    (c) => c.status === statusFilter
  );
  const filteredTemplates = templates.filter((t) =>
    t?.name?.toLowerCase()?.includes(search.toLowerCase())
  );

  const menuItems = [
    {
      icon: <ClipboardList className="h-4 w-4" />,
      label: "Ny registrering",
      onClick: () => {
        if (templates.length === 1) {
          navigate(`/checklist/${templates[0].id}`);
        } else {
          setShowTemplateDialog(true);
        }
      },
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

  return (
    <main className="flex flex-col h-full">
      {/* Header */}
      <header className="px-4 pt-6 pb-2 space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">Registreringer</h1>
        <p className="text-sm text-gray-600">
          Fortsett registrering eller start en ny.
        </p>
        <SearchBar
          onSearch={(query) => setSearch(query)}
          placeholder="Søk registreringer..."
        />
      </header>

      {/* Status Filter Tabs */}
      <nav
        className="sticky top-0 z-10 bg-white px-4 py-2 flex gap-2 border-b"
        aria-label="Statusfilter"
      >
        {statusOptions.map((status) => (
          <Button
            key={status}
            variant={statusFilter === status ? "default" : "outline"}
            onClick={() => setStatusFilter(status)}
          >
            {status === "in_progress"
              ? "Pågående"
              : status === "completed"
              ? "Fullført"
              : "Utkast"}
          </Button>
        ))}
      </nav>

      {/* Checklist History */}
      <section
        aria-labelledby="checklist-heading"
        className="flex flex-col gap-2 overflow-y-auto flex-1 p-4"
      >
        <h2 id="checklist-heading" className="sr-only">
          Tidligere sjekklister
        </h2>
        {filteredChecklists.map((checklist) => {
          const templateName = checklistTemplates.find(
            (x) => x.id === checklist.templateId
          )?.name;
          const isInProgress = checklist.status === "in_progress";
          const isCompleted = checklist.status === "completed";

          const card = (
            <article
              aria-label={`Sjekkliste ${templateName}`}
              className="bg-white rounded-lg shadow-md p-4 flex items-center hover:bg-gray-50 transition"
            >
              <div className="mr-auto">
                <h3 className="text-lg font-semibold text-gray-900">
                  {templateName}
                </h3>
                <p className="text-sm text-gray-600">
                  {checklist.createdBy} –{" "}
                  {new Date(checklist.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  {isInProgress
                    ? "Fortsett registreringen"
                    : isCompleted
                    ? "Fullført – klar for PDF"
                    : "Utkast"}
                </p>
              </div>
              {isCompleted ? (
                <Button onClick={() => createPdf(checklist)}>PDF</Button>
              ) : (
                <ArrowRight className="text-gray-500" />
              )}
            </article>
          );

          return isInProgress ? (
            <Link
              key={checklist.id}
              to={`/checklist/${checklist.id}`}
              role="link"
              aria-label={`Åpne sjekkliste ${templateName}`}
              className="block"
            >
              {card}
            </Link>
          ) : (
            <div key={checklist.id}>{card}</div>
          );
        })}
      </section>

      {/* Template Selection Dialog */}
      {showTemplateDialog && (
        <div
          className="fixed inset-0 backdrop-blur-2xl z-50 bg-opacity-50 flex items-center justify-center"
          onClick={() => setShowTemplateDialog(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTemplateDialog(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Lukk dialog"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Velg en mal</h2>
            <ul className="space-y-2">
              {filteredTemplates.map((template) => (
                <li key={template.id}>
                  <Button
                    className="w-full justify-start"
                    onClick={() => {
                      navigate(`/checklist/${template.id}`);
                      setShowTemplateDialog(false);
                    }}
                  >
                    {template.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <FloatingActionButton items={menuItems} />
    </main>
  );
}
