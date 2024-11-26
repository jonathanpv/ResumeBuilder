// @ts-nocheck
'use client'
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/5CbmLe0W0l6
 */

import React, { useState } from 'react';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import SkillEditDialog from '@/components/skill-edit-dialog';

export function SkillsSection({ resume, setResume, isDragging }) {
  // const [toolsAndFrameworks, setToolsAndFrameworks] = useState(['React', 'Node.js', 'Next.js']);
  // const [programmingLanguages, setProgrammingLanguages] = useState(['Java', 'C', 'C++', 'Python']);

  const allToolsAndFrameworks = ['React', 'Node.js', 'Next.js', 'Vue', 'Angular', 'Django', 'ojw', 'wfoj', 'jfwo'];
  const allProgrammingLanguages = ['Java', 'C', 'C++', 'Python', 'JavaScript', 'TypeScript'];

  const updateSkills = (category, updatedSkills) => {
    setResume(prevResume => ({
      ...prevResume,
      skills: {
        ...prevResume.skills,
        [category]: updatedSkills,
      },
    }));
  };

  return (
    <div className="sortable-section">
      <Card className="mt-6">
        <CardHeader className="p-4">
          <div className="flex flex-row justify-start items-center">
            <CardTitle>Skills</CardTitle>
            {/* Add drag handle if needed */}
          </div>
        </CardHeader>
        <CardContent className={isDragging ? 'hidden' : 'p-4 flex flex-col gap-2'}>
          <SkillEditDialog
            title="Tools and Frameworks"
            skills={resume?.skills?.toolsAndFrameworks || []}
            allSkills={allToolsAndFrameworks}
            setSkills={(updatedSkills) => updateSkills('toolsAndFrameworks', updatedSkills)}
            dialogButtonText="Add new Tool/Framework"
          />

          <Separator className="my-4" />

          <SkillEditDialog
            title="Programming Languages"
            skills={resume?.skills?.programmingLanguages || []}
            allSkills={allProgrammingLanguages}
            setSkills={(updatedSkills) => updateSkills('programmingLanguages', updatedSkills)}
            dialogButtonText="Add New Language"
          />

        </CardContent>
      </Card>
    </div>
  );
}
