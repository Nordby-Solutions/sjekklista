import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, List, Settings, Pen } from "lucide-react";

export default function AppLayout() {
  const location = useLocation();

  const navItems = [
    { label: "Hjem", path: "/", icon: <Home className="w-5 h-5" /> },
    { label: "Demo", path: "/demo", icon: <List className="w-5 h-5" /> },
    {
      label: "Design",
      path: "/design",
      icon: <Pen className="w-5 h-5" />,
    },
    {
      label: "Innstillinger",
      path: "/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex flex-col max-h-screen h-screen overflow-hidden bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Sjekklista.no</h1>
        </div>
      </header>

      {/* Main scrollable content */}
      <main className="flex-1 overflow-auto p-4">
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
