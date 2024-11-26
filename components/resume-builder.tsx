// @ts-nocheck

'use client'
import React from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from './SortableItem';
import { ScrollArea } from './ui/scroll-area';
import PersonalInfoSection from './personal-info-section';
import SkillsSection from './skills-section';
import ExperienceSection from './experience-section';
import EducationSection from './education-section';

export function ResumeBuilder({resume, setResume, resumeFeedback}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = resume.sectionOrder.indexOf(active.id);
      const newIndex = resume.sectionOrder.indexOf(over.id);

      setResume(prevResume => ({
        ...prevResume,
        sectionOrder: arrayMove(prevResume.sectionOrder, oldIndex, newIndex),
      }));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={resume.sectionOrder}
        strategy={verticalListSortingStrategy}
      >
        <ScrollArea>
          <div className="flex flex-col md:flex-row h-screen">
            <main className="lg:flex-1 lg:p-4 space-y-4">
              {resume.sectionOrder.map((sectionId) => {
                let sectionContent;

                switch(sectionId) {
                  case 'personalInfo':
                    sectionContent = (
                      <PersonalInfoSection 
                        resume={resume} 
                        setResume={setResume} 
                        resumeFeedback={resumeFeedback} 
                      />
                    );
                    break;
                  case 'skills':
                    sectionContent = (
                      <SkillsSection 
                        resume={resume} 
                        setResume={setResume} 
                        resumeFeedback={resumeFeedback} 
                      />
                    );
                    break;
                  case 'jobExperience':
                    sectionContent = (
                      <ExperienceSection 
                        title="Job Experience"
                        questions={[
                          { name: 'title', inputMode: 'text', label: 'Job Title', placeholder: 'Software Engineer Intern' },
                          { name: 'dates', inputMode: 'text', label: 'Start - End Date', placeholder: 'May 2021 - August 2021' },
                          { name: 'companyName', inputMode: 'text', label: 'Company Name', placeholder: 'Microdaddy' },
                          { name: 'bulletPoint1', inputMode: 'textarea', label: 'Bullet Point 1', placeholder: 'Coded a lil this and a lil that' },
                          { name: 'bulletPoint2', inputMode: 'textarea', label: 'Bullet Point 2', placeholder: 'Litra-lly met Satya' },
                          { name: 'bulletPoint3', inputMode: 'textarea', label: 'Bullet Point 3', placeholder: 'Developed and designed revolutionary new AI Copilot named Clippy-Pro-Max-Ultra, so good it put me out of a joberino pepperino :o' },
                        ]}
                        resume={resume}
                        setResume={setResume}
                        sectionKey="jobExperience"
                        isDragging={false}
                      />
                    );
                    break;
                  case 'projectExperience':
                    sectionContent = (
                      <ExperienceSection 
                        title="Project Experience"
                        questions={[
                          { name: 'title', inputMode: 'text', label: 'Role', placeholder: 'Software Engineer' },
                          { name: 'dates', inputMode: 'text', label: 'Start - End Date', placeholder: 'May 2021 - August 2021' },
                          { name: 'companyName', inputMode: 'text', label: 'Project Title', placeholder: 'ResumeGPT' },
                          { name: 'bulletPoint1', inputMode: 'textarea', label: 'Bullet Point 1', placeholder: 'Developed some supa dupa cool ting' },
                          { name: 'bulletPoint2', inputMode: 'textarea', label: 'Bullet Point 2', placeholder: 'Much wow, me likey'},
                          { name: 'bulletPoint3', inputMode: 'textarea', label: 'Bullet Point 3', placeholder: 'Hi mom' },
                        ]}
                        resume={resume}
                        setResume={setResume}
                        sectionKey="projectExperience"
                        isDragging={false}
                      />
                    );
                    break;
                  case 'education':
                    sectionContent = (
                      <EducationSection 
                        education={resume.education} 
                        setResume={setResume} 
                        isDragging={false}
                      />
                    );
                    break;
                  default:
                    sectionContent = null;
                }

                let sectionTitle = '';
                let badgeLabel = '';

                switch(sectionId) {
                  case 'personalInfo':
                    sectionTitle = 'Personal Information';
                    badgeLabel = 'Personal Info';
                    break;
                  case 'skills':
                    sectionTitle = 'Skills';
                    badgeLabel = 'Skills';
                    break;
                  case 'jobExperience':
                    sectionTitle = 'Job Experience';
                    badgeLabel = 'Job Exp';
                    break;
                  case 'projectExperience':
                    sectionTitle = 'Project Experience';
                    badgeLabel = 'Project Exp';
                    break;
                  case 'education':
                    sectionTitle = 'Education';
                    badgeLabel = 'Education';
                    break;
                  default:
                    sectionTitle = 'Section';
                    badgeLabel = 'Section';
                }

                return (
                  <SortableItem 
                    key={sectionId} 
                    id={sectionId} 
                    title={sectionTitle}
                    badgeLabel={badgeLabel}
                  >
                    {sectionContent}
                  </SortableItem>
                );
              })}
            </main>
          </div>
        </ScrollArea>
      </SortableContext>
    </DndContext>
  );
}

export default ResumeBuilder;
