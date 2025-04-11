import { Loader } from "@/ui/widgets/loaders/Loader";
import React from "react";

const themes = ['primary', 'neutral', 'success', 'danger'] as const;
const customThemes = ['warning', 'info', 'purple'];

export const LoaderDemo: React.FC = () => {
    return (
        <div className="loader-demo">
            <h1>Loader Component Demo</h1>

            <section>
                <h2>Default Loaders (Predefined Themes)</h2>
                <div className="loader-row">
                    {themes.map(theme => (
                        <div key={theme} className="loader-box">
                            <Loader theme={theme} />
                            <label>{theme}</label>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2>Custom Size and Thickness</h2>
                <div className="loader-row">
                    <div className="loader-box">
                        <Loader size="3rem" thickness="4px" theme="success" />
                        <label>Size: 3rem<br/>Thickness: 4px</label>
                    </div>
                    <div className="loader-box">
                        <Loader size="2rem" thickness="8px" theme="danger" />
                        <label>Size: 2rem<br/>Thickness: 8px</label>
                    </div>
                </div>
            </section>

            <section>
                <h2>Custom Theme Values</h2>
                <div className="loader-row">
                    {customThemes.map(theme => (
                        <div key={theme} className="loader-box">
                            <Loader theme={theme} />
                            <label>{theme}</label>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
