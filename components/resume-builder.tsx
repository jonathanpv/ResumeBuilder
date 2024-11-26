// @ts-nocheck

'use client'
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from './SortableItem';
import { Handle } from './Handle'; // Ensure Handle is imported if used in SortableItem

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SkillsSection } from "@/components/skills-section"
import ExperienceSection from '@/components/experience-section'
import EducationSection from './education-section';
import { ScrollArea } from './ui/scroll-area';

export function ResumeBuilder({resume, setResume, resumeFeedback}) {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedId, setDraggedId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    console.log("::debug logic:: Drag started", {
      activeId: event.active.id,
      currentOrder: resume.sectionOrder
    });
    setIsDragging(true);
    setDraggedId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log("::debug logic:: Drag ended", {
      activeId: active.id,
      overId: over?.id,
      currentOrder: resume.sectionOrder
    });

    setIsDragging(false);
    setDraggedId(null);

    if (active.id !== over?.id) {
      const oldIndex = resume.sectionOrder.indexOf(active.id);
      const newIndex = resume.sectionOrder.indexOf(over.id);
      
      console.log("::debug logic:: Reordering", {
        oldIndex,
        newIndex,
        activeId: active.id,
        overId: over.id
      });

      const newOrder = arrayMove(resume.sectionOrder, oldIndex, newIndex);
      console.log("::debug logic:: New order", newOrder);

      setResume(prevResume => ({
        ...prevResume,
        sectionOrder: newOrder,
      }));
    }
  };

  // Handler functions remain the same
  const handleInputChange = (section, field, value) => {
    setResume(prevResume => ({
      ...prevResume,
      [section]: {
        ...prevResume[section],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (section, value) => {
    setResume(prevResume => ({
      ...prevResume,
      [section]: value,
    }));
  };

  const handleSkillsChange = (value) => {
    setResume(prevResume => ({
      ...prevResume,
      skills: value,
    }));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={resume.sectionOrder}
        strategy={verticalListSortingStrategy}
      >
        <ScrollArea>
          <div className="flex flex-col md:flex-row h-screen">
            <main className="lg:flex-1 lg:p-4">
              {resume.sectionOrder.map((sectionId) => {
                const isBeingDragged = isDragging && draggedId === sectionId;
                
                return (
                  <div key={sectionId} className={`mb-4 transition-all duration-200 ${isBeingDragged ? 'opacity-50' : ''}`}>
                    {sectionId === 'personalInfo' && (
                      <SortableItem id={sectionId}>
                        <Card className={isDragging ? 'py-2' : ''}>
                          <CardHeader className="p-4">
                            <CardTitle>Personal Information</CardTitle>
                          </CardHeader>
                          {!isDragging && (
                            <CardContent className="p-4 space-y-4">
                              {/* Personal Information Fields */}
                              <div className="grid gap-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                  id="name"
                                  value={resume?.personalInfo?.name || ''}
                                  placeholder="Your name"
                                  onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                                />
                              </div>
                              <div className="grid gap-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  value={resume?.personalInfo?.email || ''}
                                  placeholder="Your email"
                                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                                />
                              </div>
                              <div className="grid gap-1.5">
                                <Label htmlFor="linkedin">LinkedIn</Label>
                                <Input
                                  id="linkedin"
                                  value={resume?.personalInfo?.linkedin || ''}
                                  placeholder="Your LinkedIn profile url"
                                  onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
                                />
                              </div>
                              <div className="grid gap-1.5">
                                <Label htmlFor="github">GitHub</Label>
                                <Input
                                  id="github"
                                  value={resume?.personalInfo?.github || ''}
                                  placeholder="Your GitHub profile url"
                                  onChange={(e) => handleInputChange('personalInfo', 'github', e.target.value)}
                                />
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      </SortableItem>
                    )}

                    {sectionId === 'skills' && (
                      <SortableItem id={sectionId}>
                        <div className={isDragging ? 'collapsed-section' : ''}>
                          <SkillsSection resume={resume} setResume={setResume} />
                        </div>
                      </SortableItem>
                    )}

                    {sectionId === 'jobExperience' && (
                      <SortableItem id={sectionId}>
                        <div className={isDragging ? 'collapsed-section' : ''}>
                          <ExperienceSection 
                            description={!isDragging ? "The experience section is where you showcase the skills you claim to have up top. If you don't have a job history then you can leave this blank and populate your resume with the projects section." : ""}
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
                          />
                        </div>
                      </SortableItem>
                    )}

                    {sectionId === 'projectExperience' && (
                      <SortableItem id={sectionId}>
                        <div className={isDragging ? 'collapsed-section' : ''}>
                          <ExperienceSection 
                            title="Projects"
                            triggerLabel="Add New Project"
                            description={!isDragging ? "Don't have any Job experience? No worries, fill this out and add any hackathon projects, difficult school assignments, tutorials you followed and build out your resume that way :)" : ""}
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
                          />
                        </div>
                      </SortableItem>
                    )}

                    {sectionId === 'education' && (
                      <SortableItem id={sectionId}>
                        <div className={isDragging ? 'collapsed-section' : ''}>
                          <EducationSection 
                            education={resume?.education} 
                            setResume={setResume} 
                          />
                        </div>
                      </SortableItem>
                    )}
                  </div>
                );
              })}
            </main>
          </div>
        </ScrollArea>
      </SortableContext>
    </DndContext>
  )
}

export default ResumeBuilder;
