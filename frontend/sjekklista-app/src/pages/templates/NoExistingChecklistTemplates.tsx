import { useTranslation } from "react-i18next";
import { ArrowUpRightIcon, FolderIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "react-router-dom";

export function NoExistingChecklistTemplates() {
  const { t } = useTranslation();
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>{t("noTemplates.title", "Ingen sjekklister")}</EmptyTitle>
        <EmptyDescription>
          {t(
            "noTemplates.description",
            "Du har ingen sjekklister registrert. Kom i gang ved å opprette din første sjekkliste."
          )}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Link to="/design">
            <Button>
              {t("noTemplates.createButton", "Opprett Sjekkliste")}
            </Button>
          </Link>
          {/* <Button variant="outline">Import Project</Button> */}
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          {t("noTemplates.learnMore", "Lær mer")} <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  );
}
