"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { LANGUAGE_VERSIONS } from "@/constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

export function DropdownMenuRadioGroupDemo({ language, onSelectLanguage }) {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="bg-zinc-800 outline-0 px-3 py-1 rounded-md text-neutral-100 cursor-pointer border border-neutral-600 text-sm hover:bg-zinc-200 hover:text-zinc-800 font-semibold active:scale-95">
          {language}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-2 bg-neutral-900 border-neutral-800 text-zinc-100">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {languages.map(([language, version]) => (
            <DropdownMenuRadioItem
              key={language}
              value={language}
              onClick={() => onSelectLanguage(language)}
            >
              {language}
              <span className="text-neutral-600">({version})</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownMenuRadioGroupDemo;
