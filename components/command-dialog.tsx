//@ts-nocheck
"use client"

import * as React from "react"
import {
  Binary,
  ClipboardCopy,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

import { tempResume } from "@/lib/utils"

export function CommandDialogDemo({setResume, printResume}) {
  const [open, setOpen] = React.useState(false)
  const [currentCommand, setCurrentCommand] = React.useState();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <p className="text-sm text-secondary-foreground">
        Press{" "}
        <kbd className="text-secondary-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Debug Commands">
            
            
            <CommandItem onSelect={() => {
              setResume({
                ...tempResume,
                sectionOrder: [
                  "personalInfo",
                  "skills",
                  "jobExperience",
                  "projectExperience",
                  "education"
                ]
              });
              setOpen((open) => !open);
            }}>
              <Binary className="mr-2 h-4 w-4" />
              <span>Set Demo Resume</span>
            </CommandItem>
            
            
            <CommandItem onSelect={() => {printResume(); ; setOpen((open) => !open)}}>
              <ClipboardCopy className="mr-2 h-4 w-4" />
              <span>Print Resume JSON to console</span>
            </CommandItem>

          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
