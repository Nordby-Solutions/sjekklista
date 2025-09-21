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
} from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useAuth0 } from "@auth0/auth0-react";

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

  pwa.canInstall; // bool
  pwa.installApp(); // promise void

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r p-6 space-y-6 shadow-sm">
        {/* Logo */}
        <img
          src="/Sjekklista-logo-3-min.png"
          alt="Sjekklista logo"
          className="w-32 mx-auto mb-4"
        />

        {/* User info */}
        {isAuthenticated && user && (
          <div className="flex flex-col items-center text-center space-y-2">
            <img
              src={user.picture}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <h2 className="text-sm font-semibold text-gray-800">{user.name}</h2>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-brand-purple/10 text-brand-purple font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="mt-auto space-y-2">
          {isAuthenticated ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="w-full justify-start gap-2 text-xs text-gray-600 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
              Logg ut
            </Button>
          ) : (
            <Button
              onClick={() => loginWithRedirect()}
              size="sm"
              className="w-full text-xs bg-brand-purple text-white hover:bg-brand-purple/90"
            >
              <LogIn className="w-2 h-2 mr-2" />
              Logg inn
            </Button>
          )}

          <Button
            variant="default"
            size="sm"
            onClick={pwa.installApp}
            className="w-full text-xs bg-brand-purple hover:bg-brand-purple/90"
          >
            <Download className="w-2 h-2 mr-2" />
            Last ned app
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header with hamburger for mobile */}
        <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between md:hidden">
          <img className="w-[113px]" src="/Sjekklista-logo-3-min.png"></img>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
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
                    className="text-xs px-2 py-1 bg-brand-purple text-white"
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
