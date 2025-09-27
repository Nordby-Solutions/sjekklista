import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const STORAGE_KEY = "app:sidebarCollapsed";

type SidebarContextType = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  requestCollapseForPage: () => void;
  releaseCollapseRequest: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      const raw =
        typeof window !== "undefined"
          ? localStorage.getItem(STORAGE_KEY)
          : null;
      return raw ? JSON.parse(raw) : false;
    } catch {
      return false;
    }
  });

  // If a page requests collapse we keep track so multiple pages/components can request safely
  const requestCountRef = useRef<number>(0);
  const savedStateRef = useRef<boolean | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collapsed));
    } catch {
      // noop
    }
  }, [collapsed]);

  const isDesktop = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches;

  const requestCollapseForPage = () => {
    if (!isDesktop()) return; // only auto collapse on desktop
    if (requestCountRef.current === 0) savedStateRef.current = collapsed;
    requestCountRef.current += 1;
    setCollapsed(true);
  };

  const releaseCollapseRequest = () => {
    requestCountRef.current = Math.max(0, requestCountRef.current - 1);
    if (requestCountRef.current === 0 && savedStateRef.current !== null) {
      setCollapsed(savedStateRef.current);
      savedStateRef.current = null;
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        requestCollapseForPage,
        releaseCollapseRequest,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return ctx;
}
