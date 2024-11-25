//@ts-nocheck
'use client';

import React, {
  useState,
  ChangeEvent,
  useImperativeHandle,
  forwardRef,
  Ref,
} from 'react';
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogClose,
  Dialog,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from './ui/scroll-area';

interface JobExperience {
  id: number;
  title: string;
  companyName: string;
  bulletPoint1: string;
  bulletPoint2: string;
  bulletPoint3: string;
}

interface Question {
  name: keyof JobExperience;
  label: string;
  inputMode: string;
  placeholder: string;
}

interface JobExperienceFormProps {
  onSubmit: (jobExperience: JobExperience) => void;
  initialValues?: JobExperience;
  questions: Question[];
}

export interface JobExperienceFormRef {
  submit: () => void;
}

const JobExperienceForm = forwardRef<
  JobExperienceFormRef,
  JobExperienceFormProps
>(({ onSubmit, initialValues, questions }, ref: Ref<JobExperienceFormRef>) => {
  const [jobExperience, setJobExperience] = useState<JobExperience>({
    id: initialValues?.id || 0,
    title: initialValues?.title || '',
    companyName: initialValues?.companyName || '',
    bulletPoint1: initialValues?.bulletPoint1 || '',
    bulletPoint2: initialValues?.bulletPoint2 || '',
    bulletPoint3: initialValues?.bulletPoint3 || '',
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJobExperience({
      ...jobExperience,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(jobExperience);
    // Reset the form after submission if needed
    setJobExperience({
      id: 0,
      title: '',
      companyName: '',
      bulletPoint1: '',
      bulletPoint2: '',
      bulletPoint3: '',
    });
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
  }));

  return (
    <div className="px-1 space-y-4">
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
              type={question.inputMode} // e.g., 'text', 'email'
            />
          )}
        </div>
      ))}
    </div>
  );
});

JobExperienceForm.displayName = 'JobExperienceForm';

interface ExperienceDialogProps {
  triggerButton: React.ReactNode;
  onSubmit: (jobExperience: JobExperience) => void;
  initialValues?: JobExperience;
  questions: Question[];
}

const ExperienceDialog: React.FC<ExperienceDialogProps> = ({
  triggerButton,
  onSubmit,
  initialValues,
  questions,
}) => {
  const formRef = React.useRef<JobExperienceFormRef>(null);

  const handleSubmit = () => {
    formRef.current?.submit();
    // Optionally, handle dialog close here if needed
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-w-none px-0 md:px-6 w-[calc(100vw-1rem)] h-[calc(100vh-4rem)] lg:max-w-4xl lg:max-h-[700px] md:w-[calc(100vw-20rem)] md:h-[calc(100vh-10rem)]">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? 'Edit Job Experience' : 'Add Job Experience'}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="px-0 md:px-4">
          <JobExperienceForm
            ref={formRef}
            onSubmit={onSubmit}
            initialValues={initialValues}
            questions={questions}
          />
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handleSubmit}>
              {initialValues ? 'Update' : 'Submit'}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceDialog;
