// useAutoCollapseForWidePage.ts
"use client";

import { useSidebar } from "@/components/SidebarContext";
import { useEffect } from "react";

export function useAutoCollapseSidebarForWidePage() {
  const { requestCollapseForPage, releaseCollapseRequest } = useSidebar();

  useEffect(() => {
    requestCollapseForPage();
    return () => {
      releaseCollapseRequest();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
