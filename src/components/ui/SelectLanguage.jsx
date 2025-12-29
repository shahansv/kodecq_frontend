"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { LANGUAGE_DATA } from "../../constants";

const languages = Object.entries(LANGUAGE_DATA).map(([value, data]) => ({
  value,
  label: data.label,
  logo: data.logo,
}));

export function SelectLanguage({ setLanguage }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const selected = languages.find((l) => l.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-xs  md:w-2xl justify-between bg-[#1E1E1E] text-zinc-500"
        >
          {selected ? (
            <span className="flex items-center gap-2">
              {selected.logo && (
                <img
                  src={selected.logo}
                  alt={selected.label}
                  className="h-4 w-4"
                />
              )}
              {selected.label}
            </span>
          ) : (
            "Select language"
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-xs  md:w-2xl p-0 border-zinc-700 bg-transparent">
        <Command className="bg-zinc-800 text-zinc-100">
          <CommandInput placeholder="Search language" className="h-9" />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>

            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setLanguage(currentValue);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 text-zinc-100"
                >
                  <img
                    src={language.logo}
                    alt={language.label}
                    className="h-4 w-4"
                  />
                  {language.label}

                  <Check
                    className={cn(
                      "ml-auto",
                      value === language.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
