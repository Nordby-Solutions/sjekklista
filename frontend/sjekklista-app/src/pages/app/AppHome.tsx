import { Button } from "@/components/ui/button";

export default function AppHome() {
  return (
    <>
      {/* Example card */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Forrige sjekkliste – Aker Bygg
        </h2>
        <p className="text-gray-700 mt-2">
          Se gjennom oppgaver fra forrige prosjekt og noter status for hver del.
        </p>
        <Button className="mt-4 bg-primary text-white hover:bg-blue-600">
          Start oppfølging
        </Button>
      </div>

      {/* Neste sjekkliste */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Neste sjekkliste – Nytt prosjekt
        </h2>
        <p className="text-gray-700 mt-2">
          Gå gjennom kommende oppgaver og fordel ansvar til teammedlemmer.
        </p>
        <Button className="mt-4 bg-secondary text-white hover:bg-orange-500">
          Åpne sjekkliste
        </Button>
      </div>
    </>
  );
}
