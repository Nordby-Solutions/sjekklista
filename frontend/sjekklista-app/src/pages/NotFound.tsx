import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-6">
      <div className="max-w-xl text-center">
        <h2 className="text-3xl font-bold mb-2">404 — Siden ble ikke funnet</h2>
        <p className="text-slate-600 mb-6">
          Beklager, vi fant ikke det du leter etter.
        </p>
        <div className="flex justify-center">
          <Link to="/">
            <Button variant="ghost">Gå hjem</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
