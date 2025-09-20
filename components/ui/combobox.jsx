"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

// We've removed the `cn` import
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function Combobox({ options, value, onValueChange, placeholder, searchPlaceholder }) {
  const [open, setOpen] = React.useState(false)

  const findLabel = (val) => {
    if (!val) return placeholder;
    const foundOption = options.find((option) => option.value.toLowerCase() === val.toLowerCase());
    return foundOption ? foundOption.label : placeholder;
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {findLabel(value)}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder || "Search..."} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue.toLowerCase() === value?.toLowerCase() ? "" : option.value;
                    onValueChange(newValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    // --- MODIFIED LINE ---
                    // Replaced `cn()` with a template literal for conditional classes
                    className={`mr-2 h-4 w-4 ${value?.toLowerCase() === option.value.toLowerCase() ? "opacity-100" : "opacity-0"}`}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}