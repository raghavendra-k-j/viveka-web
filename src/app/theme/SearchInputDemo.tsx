import React, { useState } from "react";
import { SearchInput } from "@/ui/widgets/inputs/SearchInput";
import { FilledButton } from "@/ui/widgets/buttons/FilledButton";

export default function SearchInputDemo() {
  const [values, setValues] = useState({
    sm: "",
    md: "",
    lg: "",
  });

  const handleChange = (size: "sm" | "md" | "lg") => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [size]: e.target.value }));
    };

  const handleClear = (size: "sm" | "md" | "lg") => () => {
    setValues((prev) => ({ ...prev, [size]: "" }));
  };

  return (
    <div className="space-y-10 p-6">
      {/* Small */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Search Input - Small</h2>
        <div className="flex items-center gap-4">
          <SearchInput
            inputSize="sm"
            value={values.sm}
            onChange={handleChange("sm")}
            onClear={handleClear("sm")}
            placeholder="Search (sm)..."
          />
          <FilledButton size="sm">Go</FilledButton>
        </div>
      </section>

      {/* Medium */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Search Input - Medium</h2>
        <div className="flex items-center gap-4">
          <SearchInput
            inputSize="md"
            value={values.md}
            onChange={handleChange("md")}
            onClear={handleClear("md")}
            placeholder="Search (md)..."
          />
          <FilledButton size="md">Go</FilledButton>
        </div>
      </section>

      {/* Large */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Search Input - Large</h2>
        <div className="flex items-center gap-4">
          <SearchInput
            inputSize="lg"
            value={values.lg}
            onChange={handleChange("lg")}
            onClear={handleClear("lg")}
            placeholder="Search (lg)..."
          />
          <FilledButton size="lg">Go</FilledButton>
        </div>
      </section>
    </div>
  );
}
