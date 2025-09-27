import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  Menu,
  Home,
  List,
  Settings,
  Pen,
  LogIn,
  LogOut,
  Download,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useAuth0 } from "@auth0/auth0-react";
import { useSidebar } from "./SidebarContext";

const navItems = [
  { label: "Hjem", path: "/", icon: <Home className="w-5 h-5" /> },
  {
    label: "Registreringer",
    path: "/history",
    icon: <List className="w-5 h-5" />,
  },
  {
    label: "Sjekklister",
    path: "/checklist-templates",
    icon: <Pen className="w-5 h-5" />,
  },
  {
    label: "Rapporter",
    path: "/report-designer",
    icon: <Pen className="w-5 h-5" />,
  },
  {
    label: "Innstillinger",
    path: "/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function AppLayout() {
  const location = useLocation();
  const pwa = usePWAInstall();
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex md:flex-col bg-white border-r shadow-sm transition-all duration-200 ease-in-out
          ${collapsed ? "w-12" : "w-72"}`}
      >
        {/* Sidebar header: collapse toggle + optional logo */}
        <div className="flex items-center justify-between px-2 py-3 border-b">
          <div className="flex items-center gap-2">
            {!collapsed && (
              <img
                src="/Sjekklista-logo-3-min.png"
                alt="Sjekklista logo"
                className="w-36"
              />
            )}
          </div>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-600"
              title={collapsed ? "Utvid" : "Skjul"}
            >
              {collapsed ? (
                <ChevronsRight className="w-4 h-4" />
              ) : (
                <ChevronsLeft className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* User info (hidden entirely when collapsed) */}
        <div
          className={`flex flex-col items-center text-center px-4 py-3 border-b transition-all duration-150
            ${
              collapsed
                ? "h-0 p-0 opacity-0 pointer-events-none overflow-hidden"
                : "h-auto opacity-100"
            }`}
          aria-hidden={collapsed}
        >
          {isAuthenticated && user ? (
            <>
              <img
                src={user.picture}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <h2 className="text-sm font-semibold text-gray-800 mt-2">
                {user.name}
              </h2>
              <p className="text-xs text-gray-500">{user.email}</p>
            </>
          ) : (
            <p className="text-xs text-gray-500">Ingen pålogget bruker</p>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-auto px-1 py-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className="block">
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 px-2 py-2 rounded-md transition-colors text-sm
                    ${
                      isActive
                        ? "bg-brand-purple/10 text-brand-purple font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  title={item.label}
                >
                  <span className="flex items-center justify-center w-8">
                    {item.icon}
                  </span>
                  <span
                    className={`ml-2 transition-all duration-150 ${
                      collapsed
                        ? "opacity-0 w-0 overflow-hidden"
                        : "opacity-100"
                    }`}
                    aria-hidden={collapsed}
                  >
                    {item.label}
                  </span>
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Actions (icons only when collapsed) */}
        <div className="border-t px-2 py-3 space-y-2">
          {isAuthenticated ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className={`w-full justify-start gap-2 text-xs ${
                collapsed ? "text-gray-600" : "text-gray-600 hover:text-red-600"
              }`}
              title="Logg ut"
            >
              <span className="flex items-center justify-center w-8">
                <LogOut className="w-4 h-4" />
              </span>
              <span
                className={`${
                  collapsed ? "opacity-0 w-0 overflow-hidden" : "ml-2"
                }`}
              >
                Logg ut
              </span>
            </Button>
          ) : (
            <Button
              onClick={() => loginWithRedirect()}
              size="sm"
              className="w-full text-xs bg-brand-purple text-white hover:bg-brand-purple/90"
              title="Logg inn"
            >
              <div className="flex items-center justify-center w-8">
                <LogIn className="w-4 h-4" />
              </div>
              <span
                className={`${
                  collapsed ? "opacity-0 w-0 overflow-hidden" : "ml-2"
                }`}
              >
                Logg inn
              </span>
            </Button>
          )}

          <Button
            variant="default"
            size="sm"
            onClick={pwa.installApp}
            className="w-full text-xs bg-brand-purple hover:bg-brand-purple/90"
            title="Last ned app"
          >
            <div className="flex items-center justify-center w-8">
              <Download className="w-4 h-4" />
            </div>
            <span
              className={`${
                collapsed ? "opacity-0 w-0 overflow-hidden" : "ml-2"
              }`}
            >
              Last ned app
            </span>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header only (no desktop topnav) */}
        <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between md:hidden">
          <img
            className="w-[113px]"
            src="/Sjekklista-logo-3-min.png"
            alt="logo"
          />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="p-4 space-y-4">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link key={item.path} to={item.path}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start gap-3 ${
                          isActive
                            ? "text-brand-purple font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}

                {pwa.canInstall && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={pwa.installApp}
                    className="text-xs"
                  >
                    Last ned app
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
