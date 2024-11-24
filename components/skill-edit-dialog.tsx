//@ts-nocheck

'use client'

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const SkillEditDialog = ({ title, skills, allSkills, setSkills, dialogButtonText }) => {
  const toggleSkill = (selectedSkills) => {
    setSkills(selectedSkills); // Pass flat array of skills
  };


  return (
    <>
      <Label className="mb-2 flex flex-row items-center justify-start">
        <span className="flex-grow">{title}</span>
        <Dialog isOpen>
          <DialogTrigger asChild>
            <Badge className="flex justify-center cursor-pointer px-2 py-1 rounded-lg ml-4 min-w-20" variant="secondary">
              Edit
            </Badge>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select {title}</DialogTitle>
              <DialogDescription>
                You can also add new skills that aren't listed here by clicking "{dialogButtonText}"
              </DialogDescription>
            </DialogHeader>
            <ToggleGroup type="multiple" className="flex flex-wrap justify-start"
              value={skills}
              onValueChange={toggleSkill}
            >
              {allSkills.map(skill => (
                <ToggleGroupItem key={skill} value={skill}>
                  {skill}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <DialogFooter>
              <Button className="flex-grow">{dialogButtonText}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Label>
      <div className="flex justify-between items-start">
        <ToggleGroup aria-label={title} className="grid grid-cols-3" defaultValue="none" type="single">
          {skills.map(skill => (
            <Badge key={skill} className="flex justify-center px-2 py-1 rounded-lg min-w-20">{skill}</Badge>
          ))}
        </ToggleGroup>
      </div>
    </>
  );
};

export default SkillEditDialog;
