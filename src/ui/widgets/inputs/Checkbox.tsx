import { CheckIcon } from "lucide-react";
import checkboxStyle from "@/app/css/components/checkbox.module.scss";
import { ReactNode } from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import clsx from "clsx";

type CheckboxSize = "sm" | "md";

type CheckboxProps = {
    label: ReactNode;
    checked: boolean;
    onChange: (checked: boolean) => void;
    size?: CheckboxSize;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, size = "md" }) => {
    return (
        <label className="flex items-center gap-3 cursor-pointer">
            <RadixCheckbox.Root
                className={clsx(
                    checkboxStyle.CheckboxRoot,
                    checkboxStyle[`CheckboxRoot--${size}`]
                )}
                checked={checked}
                onCheckedChange={(value) => onChange(!!value)}
                onClick={(e) => e.stopPropagation()}
            >
                <RadixCheckbox.Indicator className={checkboxStyle.CheckboxIndicator}>
                    <CheckIcon className={checkboxStyle.Icon} />
                </RadixCheckbox.Indicator>
            </RadixCheckbox.Root>
            <span className="text-content-primary fs-md select-none">{label}</span>
        </label>
    );
};

export default Checkbox;
