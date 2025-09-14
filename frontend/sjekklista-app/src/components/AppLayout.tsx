import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, List, Settings, Pen } from "lucide-react";

export default function AppLayout() {
  const location = useLocation();

  const navItems = [
    { label: "Hjem", path: "/app", icon: <Home className="w-5 h-5" /> },
    { label: "Demo", path: "/app/demo", icon: <List className="w-5 h-5" /> },
    {
      label: "Design",
      path: "/app/design",
      icon: <Pen className="w-5 h-5" />,
    },
    {
      label: "Innstillinger",
      path: "/app/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            S
          </div>
          <h1 className="text-xl font-semibold">Sjekklista.no</h1>
        </div>
      </header>

      {/* Main scrollable content */}
      <main className="flex-1 overflow-auto p-4 space-y-4">
        {/* Outlet renders nested routes */}
        <Outlet />
      </main>

      {/* Fixed footer / tab bar */}
      <footer className="h-16 border-t bg-white flex justify-around items-center px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={`flex flex-col items-center justify-center gap-1 ${
                  isActive ? "text-primary" : "text-gray-500"
                }`}
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </footer>
    </div>
  );
}
