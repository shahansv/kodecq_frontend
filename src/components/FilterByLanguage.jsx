"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/shadcn/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/shadcn/Command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/shadcn/Popover";

import { LANGUAGE_DATA } from "../constants";

const languages = Object.entries(LANGUAGE_DATA).map(([value, data]) => ({
  value,
  label: data.label,
  logo: data.logo,
}));

const ALL_OPTION = {
  value: "all",
  label: "All",
  logo: null,
};

export function FilterByLanguage({ onLanguageChange }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const selected =
    value === "all" ? ALL_OPTION : languages.find((l) => l.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-55 justify-between bg-neutral-100/80 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-300   "
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
            "Filter by language"
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-55 p-0 border-zinc-300 dark:border-zinc-700 bg-transparent">
        <Command className="bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
          <CommandInput placeholder="Search language" className="h-9" />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>

            <CommandGroup>
              <CommandItem
                value="all"
                onSelect={() => {
                  setValue("all");
                  onLanguageChange("all");
                  setOpen(false);
                }}
                className="text-zinc-800 dark:text-zinc-100"
              >
                All
                <Check
                  className={cn(
                    "ml-auto",
                    value === "all" ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>

              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    onLanguageChange(currentValue);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 
                  text-zinc-800 dark:text-zinc-100 "
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
