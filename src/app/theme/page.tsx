"use client";

import OutlinedButtonsDemo from "./OutlinedButtonsDemo";
import {LoaderDemo} from "./LoaderDemo";
import SearchInputDemo from "./SearchInputDemo";
import FilledButtonsDemo from "./FilledButtonsDemo";
import { DialogDemo } from "./DialogDemo";
import PaginationDemo from "./PaginationDemo";


export default function ThemePage() {
    return (
        <main className="p-10 space-y-10">
           <LoaderDemo/>
           <hr/>
           <FilledButtonsDemo/>
           <hr/>
           <OutlinedButtonsDemo/>
           <hr/>
           <DialogDemo/>
           <hr/>
           <SearchInputDemo/>
           <hr/>
           <PaginationDemo/>
        </main>
    );
}
