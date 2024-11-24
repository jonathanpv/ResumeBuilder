'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from './ui/scroll-area';

interface JobExperience {
    id: number;
    title: string;
    companyName: string;
    bulletPoint1: string;
    bulletPoint2: string;
    bulletPoint3: string;
}

const JobExperienceForm = ({ onSubmit, initialValues, questions }) => {
    const [jobExperience, setJobExperience] = useState<JobExperience>(initialValues || {});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setJobExperience({ ...jobExperience, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(jobExperience);
        setJobExperience({
            id: 0,
            title: '',
            companyName: '',
            bulletPoint1: '',
            bulletPoint2: '',
            bulletPoint3: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
      <div className="p-4 space-y-4">
        {questions.map((question) => (
          <div key={question.name} className="grid gap-1.5">
            <Label htmlFor={question.name}>{question.label}</Label>
            {question.inputMode === 'textarea' ? (
              <Textarea
                id={question.name}
                name={question.name}
                value={jobExperience[question.name] || ''}
                onChange={handleChange}
                placeholder={question.placeholder}
              />
            ) : (
              <Input
                id={question.name}
                name={question.name}
                value={jobExperience[question.name] || ''}
                onChange={handleChange}
                placeholder={question.placeholder}
                type={question.inputMode} // Assuming inputMode can be 'text', 'email', etc.
              />
            )}
          </div>
        ))}
      </div>
      <DialogFooter>
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </form>
      );
};


const ExperienceDialog= ({ triggerButton, onSubmit, initialValues, questions }) => (
    <Dialog>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent className="max-w-none w-[calc(100vw-20rem)] h-[calc(100vh-10rem)]">
            <DialogHeader>
                <DialogTitle>{initialValues ? 'Edit Job Experience' : 'Add Job Experience'}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="px-4">
            <JobExperienceForm onSubmit={onSubmit} initialValues={initialValues} questions={questions}/>
            </ScrollArea>
            
        </DialogContent>
    </Dialog>
);

export default ExperienceDialog;
