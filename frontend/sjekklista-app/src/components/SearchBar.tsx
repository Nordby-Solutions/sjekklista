import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

export default function SearchBar({
  onSearch,
  placeholder,
}: {
  onSearch: (query: string) => void;
  placeholder?: string;
}) {
  const [search, setSearch] = useState("");
  const debounced = useDebouncedValue(search, 300);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced]);

  return (
    <div className="relative w-full max-w-md">
      <Input
        placeholder={placeholder || "Søk..."}
        className="bg-white pr-10 pl-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Search icon (left) */}
      <Search className="absolute w-4 h-4 left-3 top-1/2 -translate-y-1/2 text-gray-400" />

      {/* Clear icon (right) */}
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
