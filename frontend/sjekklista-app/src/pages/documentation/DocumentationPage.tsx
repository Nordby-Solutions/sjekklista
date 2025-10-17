import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const docs = [
  {
    title: "docs.checklists.title",
    description: "docs.checklists.description",
    slug: "checklist-templates",
  },
  {
    title: "docs.registrations.title",
    description: "docs.registrations.description",
    slug: "checklist-templates",
  },
  {
    title: "docs.workspaces.title",
    description: "docs.workspaces.description",
    slug: "workspaces",
  },
  {
    title: "docs.roles.title",
    description: "docs.roles.description",
    slug: "roles",
  },
];

export default function DocumentationPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  const filteredDocs = docs.filter((d) =>
    t(d.title).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        {t("docs.title", "Documentation")}
      </h1>
      <p className="text-muted-foreground mb-6">
        {t(
          "docs.intro",
          "Find guides and explanations about how to use Sjekklista."
        )}
      </p>

      <Input
        type="search"
        placeholder={t("docs.searchPlaceholder", "Search documentation...")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6"
      />

      <div className="grid gap-4">
        {filteredDocs.map((doc) => (
          <Link key={doc.slug} to={`/documentation/${doc.slug}`}>
            <Card className="hover:shadow-md transition">
              <CardHeader>
                <CardTitle>{t(doc.title)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t(doc.description)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
        {filteredDocs.length === 0 && (
          <p className="text-muted-foreground text-sm">
            {t("docs.noResults", "No results found.")}
          </p>
        )}
      </div>
    </div>
  );
}
