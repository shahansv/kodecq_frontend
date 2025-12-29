"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { LANGUAGE_DATA, LANGUAGE_VERSIONS } from "../constants";
import { ChevronDown } from "lucide-react";

const languages = Object.entries(LANGUAGE_VERSIONS);

export function SelectLanguage({ language, onSelectLanguage }) {
  const [position, setPosition] = React.useState("bottom");

  const data = LANGUAGE_DATA[language];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="bg-zinc-800 outline-0 px-3 py-1 rounded-md text-neutral-100 cursor-pointer border border-neutral-600 text-sm hover:bg-zinc-200 hover:text-zinc-800 font-semibold flex items-center gap-2">
          {data && (
            <>
              <img
                src={data.logo}
                alt={data.label}
                className="h-3.5 rounded-xs"
              />
              <span>{data.label}</span>
              <ChevronDown className="h-5" />
            </>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 ml-2 bg-neutral-900 border-neutral-800 text-zinc-100">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {languages.map(([lang, version]) => {
            const data = LANGUAGE_DATA[lang];

            return (
              <DropdownMenuRadioItem
                key={lang}
                value={lang}
                onClick={() => onSelectLanguage(lang)}
                className="flex items-center gap-2"
              >
                {data && (
                  <>
                    <img
                      src={data.logo}
                      alt={data.label}
                      className="h-3.5 rounded-xs"
                    />
                    <span>{data.label}</span>
                  </>
                )}

                <span className="text-neutral-600">({version})</span>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SelectLanguage;
