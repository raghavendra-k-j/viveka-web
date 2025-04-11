import React from "react";
import { OutlinedButton } from "@/ui/widgets/buttons/OutlinedButton";

export default function OutlinedButtonsDemo() {
    const themes = ['primary', 'success', 'danger', 'neutral'] as const;

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h2 className="font-semibold text-lg">Outlined Button - Medium</h2>
                {themes.map((theme) => (
                    <div key={theme} className="flex flex-wrap gap-4 items-center">
                        <OutlinedButton theme={theme} onClick={() => { }}>Default</OutlinedButton>
                        <OutlinedButton theme={theme} loading onClick={() => { }}>Loading</OutlinedButton>
                        <OutlinedButton theme={theme} disabled onClick={() => { }}>Disabled</OutlinedButton>
                        <OutlinedButton theme={theme} loading disabled onClick={() => { }}>Loading + Disabled</OutlinedButton>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                <h2 className="font-semibold text-lg">Outlined Button - Small</h2>
                {themes.map((theme) => (
                    <div key={theme} className="flex flex-wrap gap-4 items-center">
                        <OutlinedButton theme={theme} size="small" onClick={() => { }}>Default</OutlinedButton>
                        <OutlinedButton theme={theme} size="small" loading onClick={() => { }}>Loading</OutlinedButton>
                        <OutlinedButton theme={theme} size="small" disabled onClick={() => { }}>Disabled</OutlinedButton>
                        <OutlinedButton theme={theme} size="small" loading disabled onClick={() => { }}>Loading + Disabled</OutlinedButton>
                    </div>
                ))}
            </div>
        </div>
    );
}
