//@ts-nocheck
'use client'

import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ExperienceDialog from './experience-dialog';
import { Separator } from "@/components/ui/separator";
import { SortableItem } from './SortableItem';

interface JobExperience {
    id: number;
    title: string;
    companyName: string;
    bulletPoint1: string;
    bulletPoint2: string;
    bulletPoint3: string;
    dates: string;
}

interface FormQuestion {
    name: string;
    label: string;
    placeholder?: string;
}

type ExperienceSectionProps = {
    title?: string;
    triggerLabel?: string;
    description?: string;
    questions: any;
    resume: any;
    setResume: any;
    sectionKey: string;
    isDragging: boolean;
    experiences?: JobExperience[];
};

const ExperienceSection = ({
    title="Experience",
    triggerLabel="Add experience",
    description="",
    questions,
    resume,
    setResume,
    sectionKey,
    isDragging
}: ExperienceSectionProps) => {
    const [editingExperience, setEditingExperience] = useState(null);

    useEffect(() => {
        if (!resume[sectionKey]) {
            setResume(prevResume => ({
                ...prevResume,
                [sectionKey]: []
            }));
        }
    }, [resume, sectionKey, setResume]);

    const handleAddExperience = (newExperience) => {
        const updatedExperience = { ...newExperience, id: Date.now() };
        setResume(prevResume => ({
            ...prevResume,
            [sectionKey]: [...(prevResume[sectionKey] || []), updatedExperience],
        }));
    };

    const handleEditExperience = (updatedExperience) => {
        setResume(prevResume => ({
            ...prevResume,
            [sectionKey]: prevResume[sectionKey].map(experience =>
                experience.id === updatedExperience.id ? updatedExperience : experience
            ),
        }));
        setEditingExperience(null);
    };

    const handleDeleteExperience = (id) => {
        setResume(prevResume => ({
            ...prevResume,
            [sectionKey]: prevResume[sectionKey].filter(experience => experience.id !== id),
        }));
    };

    const isExperienceEmpty = (experience: JobExperience) => {
        return !experience.title && !experience.companyName && 
               !experience.bulletPoint1 && !experience.bulletPoint2 && 
               !experience.bulletPoint3 && !experience.dates;
    };

    const isSectionEmpty = () => {
        if (!resume[sectionKey]) return true;
        if (!Array.isArray(resume[sectionKey])) return true;
        if (resume[sectionKey].length === 0) return true;
        return resume[sectionKey].every(isExperienceEmpty);
    };

    return (
        <>
            {isSectionEmpty() && (
                <div className="flex flex-col">
                    <div className="text-center py-8 text-gray-500">
                    <p className="mb-4">No experiences added yet</p>
                    <p className="text-sm">Click "{triggerLabel}" to add your first experience</p>
                    <Separator className="my-7"/>
                    <div className="flex w-full justify-end">
                        <ExperienceDialog
                            triggerButton={<Button className="">{triggerLabel}</Button>}
                            onSubmit={handleAddExperience}
                            initialValues={null}
                            questions={questions}
                        />
                    </div>
                </div>
                </div>
                
            )}
            <div className="space-y-4">
                {resume[sectionKey]
                    .filter(experience => !isExperienceEmpty(experience))
                    .map((experience) => (
                        <div key={experience.id} className="space-y-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-semibold">{experience.title}</h3>
                                    <p className="text-gray-700">{experience.companyName}</p>
                                    <p className="text-gray-500">{experience.dates}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <ExperienceDialog
                                        triggerButton={<Button>Edit</Button>}
                                        onSubmit={handleEditExperience}
                                        initialValues={experience}
                                        questions={questions}
                                    />
                                    <Button variant="secondary" onClick={() => handleDeleteExperience(experience.id)}>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            <ul className="list-disc pl-5">
                                {experience.bulletPoint1 && <li>{experience.bulletPoint1}</li>}
                                {experience.bulletPoint2 && <li>{experience.bulletPoint2}</li>}
                                {experience.bulletPoint3 && <li>{experience.bulletPoint3}</li>}
                            </ul>
                            <Separator className="my-9"/>
                            <div className="flex w-full justify-end">
                                <ExperienceDialog
                                    triggerButton={<Button className="">{triggerLabel}</Button>}
                                    onSubmit={handleAddExperience}
                                    initialValues={null}
                                    questions={questions}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );}

export default ExperienceSection;