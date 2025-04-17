import React, { useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { observer } from "mobx-react-lite";
import { SearchInput } from "@/ui/widgets/inputs/SearchInput";
import { SelectFormDialogStoreProvider, useSelectFormDialogStore } from "./storeCtx";
import FormList from "./FormList";


type SelectFormDialogProps = {
    isOpen: boolean;
    onClose: () => void;
}

export default function SelectFormDialog(props: SelectFormDialogProps) {
    return (
        <SelectFormDialogStoreProvider>
            <DialogContent isOpen={props.isOpen} onClose={props.onClose} />
        </SelectFormDialogStoreProvider>
    );
}

const DialogContent = observer((props: SelectFormDialogProps) => {
    const store = useSelectFormDialogStore();

    useEffect(() => {
        if (props.isOpen) {
            store.loadData(1);
        }
    }, [props.isOpen, store]);

    return (
        <Dialog open={props.isOpen} onClose={props.onClose}>
            <DialogBackdrop className="dialog-overlay" />
            <div className="dialog-container p-4">
                <DialogPanel className="dialog-panel w-full mx-auto max-w-lg radius-dialog flex flex-col" style={{ maxHeight: "100%", minHeight: "min(100%, 576px)" }}>
                    <Header onClose={props.onClose} />
                    <SearchBar />
                    <FormList />
                </DialogPanel>
            </div>
        </Dialog>
    );
});

const Header = ({ onClose }: { onClose: VoidFunction }) => (
    <div className="flex flex-row space-x-4 items-center justify-between px-4 py-3 border-b border-dialog-divider">
        <div className="dialog-default-title">Select Assessment</div>
        <button onClick={onClose}><X className="dialog-close-button" /></button>
    </div>
);

const SearchBar = observer(() => {
    const store = useSelectFormDialogStore();
    return (<div className="px-4 py-3 border-b border-dialog-divider">
        <SearchInput inputSize="md" value={store.searchQuery} onChange={(e) => store.onSearchQueryChange(e.target.value)} />
    </div>);
});
