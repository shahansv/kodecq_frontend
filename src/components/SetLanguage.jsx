"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/shadcn/DropdownMenu";
import { LANGUAGE_DATA, LANGUAGE_VERSIONS } from "../constants";
import { ChevronDown } from "lucide-react";

const languages = Object.entries(LANGUAGE_VERSIONS);

export function SetLanguage({ language, onSetLanguage }) {
  const [open, setOpen] = React.useState(false);
  const dialogRef = React.useRef(null);

  const data = LANGUAGE_DATA[language];
  const handlePointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dialogRef.current.showModal();
  };

  const confirmOpenDropdown = () => {
    dialogRef.current.close();
    setOpen(true);
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            onPointerDown={handlePointerDown}
            className="bg-zinc-200 dark:bg-zinc-800 ark:bg-zinc-800 px-3 py-1 rounded-md dark:text-neutral-100 text-neutral-800 border border-neutral-400 dark:border-neutral-600 text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:text-zinc-200 dark:hover:text-zinc-800 font-semibold flex items-center gap-2"
          >
            {data && (
              <>
                <img src={data.logo} alt={data.label} className="h-3.5" />
                <span>{data.label}</span>
                <ChevronDown className="h-5" />
              </>
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 ml-2 dark:bg-neutral-900 dark:border-neutral-800">
          <DropdownMenuRadioGroup value={language}>
            {languages.map(([lang, version]) => {
              const item = LANGUAGE_DATA[lang];
              return (
                <DropdownMenuRadioItem
                  key={lang}
                  value={lang}
                  onClick={() => {
                    onSetLanguage(lang);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  {item && (
                    <>
                      <img src={item.logo} alt={item.label} className="h-3.5" />
                      <span>{item.label}</span>
                    </>
                  )}
                  <span className="text-neutral-600">({version})</span>
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <dialog ref={dialogRef} className="modal bg-black/80">
        <div className="modal-box rounded-2xl bg-zinc-200 dark:bg-zinc-800">
          <h3 className="font-bold text-lg">Change language</h3>

          <p className="pt-4 text-zinc-600 dark:text-zinc-300">
            Changing the programming language will reset the editor content for
            everyone in this workspace.
          </p>

          <div className="modal-action">
            <button
              onClick={() => dialogRef.current.close()}
              className="btn rounded-lg bg-slate-600 border border-slate-900 hover:bg-slate-800 px-5 text-slate-50"
            >
              Cancel
            </button>

            <button
              onClick={confirmOpenDropdown}
              className="rounded-lg bg-blue-500  px-5 text-white cursor-pointer active:scale-95 font-semibold flex justify-center items-center"
            >
              Continue
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default SetLanguage;
