import React from "react";
import { FilledButton, FilledButtonTheme } from "@/ui/widgets/buttons/FilledButton";

const themes: FilledButtonTheme[] = ['primary', 'success', 'danger'];

export default function FilledButtonsDemo() {
  return (
    <div className="space-y-10 p-6">
      {/* Default Size Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Filled Buttons - Medium</h2>
        {themes.map((theme) => (
          <div key={theme} className="flex flex-wrap gap-4 items-center">
            <FilledButton theme={theme}>Default</FilledButton>
            <FilledButton theme={theme} loading>Loading</FilledButton>
            <FilledButton theme={theme} disabled>Disabled</FilledButton>
            <FilledButton theme={theme} loading disabled>
              Loading + Disabled
            </FilledButton>
          </div>
        ))}
      </section>

      {/* Small Size Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Filled Buttons - Small</h2>
        {themes.map((theme) => (
          <div key={theme} className="flex flex-wrap gap-4 items-center">
            <FilledButton theme={theme} size="small">Default</FilledButton>
            <FilledButton theme={theme} size="small" loading>Loading</FilledButton>
            <FilledButton theme={theme} size="small" disabled>Disabled</FilledButton>
            <FilledButton theme={theme} size="small" loading disabled>
              Loading + Disabled
            </FilledButton>
          </div>
        ))}
      </section>
    </div>
  );
}
