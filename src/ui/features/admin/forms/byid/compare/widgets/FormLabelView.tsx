import React, { useState, useEffect } from "react";
import { Edit } from "lucide-react";

type FormLabelViewProps = {
    label: string;
    onLabelChange: (newLabel: string) => void;
};

export function FormLabelView({ label, onLabelChange }: FormLabelViewProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [labelText, setLabelText] = useState(label);
    const [prevLabel, setPrevLabel] = useState(label);

    useEffect(() => {
        setLabelText(label);
        setPrevLabel(label);
    }, [label]);

    const handleSave = () => {
        if (labelText.trim() !== "") {
            setIsEditing(false);
            onLabelChange(labelText);
        } else {
            setLabelText(prevLabel);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 30) {
            setLabelText(e.target.value);
        }
    };

    return (
        <div>
            <div className="inline-flex flex-row items-center justify-between space-x-2 text-primary bg-primary-subtle px-2 py-1 rounded-sm fs-sm-p">
                {isEditing ? (
                    <input
                        autoFocus
                        value={labelText}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSave();
                            }
                        }}
                        className="fs-sm-p font-semibold bg-transparent border rounded px-1 focus-visible:ring-2 focus-visible:ring-primary"
                    />
                ) : (
                    <span className="font-semibold">{labelText}</span>
                )}
                <button className="cursor-pointer" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
