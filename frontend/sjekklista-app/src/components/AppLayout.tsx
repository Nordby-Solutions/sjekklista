import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, Home, List, Settings, Pen } from "lucide-react";

const navItems = [
  { label: "Hjem", path: "/", icon: <Home className="w-5 h-5" /> },
  { label: "Demo", path: "/demo", icon: <List className="w-5 h-5" /> },
  { label: "Design", path: "/design", icon: <Pen className="w-5 h-5" /> },
  { label: "Historikk", path: "/history", icon: <List className="w-5 h-5" /> },
  {
    label: "Innstillinger",
    path: "/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white border-r p-4 space-y-4">
        <h1 className="text-xl font-semibold mb-6">Sjekklista.no</h1>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 ${
                  isActive ? "text-brand-purple font-medium" : "text-gray-600"
                }`}
              >
                {item.icon}
                {item.label}
              </Button>
            </Link>
          );
        })}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header with hamburger for mobile */}
        <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between md:hidden">
          <h1 className="text-lg font-semibold">Sjekklista.no</h1>
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
