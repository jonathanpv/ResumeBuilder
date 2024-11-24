'use client'

import React, { useState, useEffect } from 'react';
import { CardTitle, CardHeader, CardContent, CardDescription, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import ExperienceDialog from './experience-dialog';
import { Separator } from "@/components/ui/separator";

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
    experiences?: JobExperience[];
};

const ExperienceSection = ({
    title="Experience",
    triggerLabel="Add experience",
    description="",
    questions,
    resume,
    setResume,
    sectionKey
}: ExperienceSectionProps) => {
    const [editingExperience, setEditingExperience] = useState(null);

    // Initialize the section if it doesn't exist
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

    // Helper function to check if an experience is empty
    const isExperienceEmpty = (experience: JobExperience) => {
        return !experience.title && !experience.companyName && 
               !experience.bulletPoint1 && !experience.bulletPoint2 && 
               !experience.bulletPoint3 && !experience.dates;
    };

    // Helper function to check if the section is effectively empty
    const isSectionEmpty = () => {
        if (!resume[sectionKey]) return true;
        if (!Array.isArray(resume[sectionKey])) return true;
        if (resume[sectionKey].length === 0) return true;
        
        // Check if all experiences are empty objects or contain only empty strings
        return resume[sectionKey].every(isExperienceEmpty);
    };

    const EmptyState = () => (
        <Card className="mt-6">
            <CardHeader className="p-4">
                <div className="flex flex-row justify-start items-center">
                    <CardTitle className="flex-grow">{title}</CardTitle>
                    <ExperienceDialog
                        triggerButton={<Badge className="!mt-0 flex justify-center cursor-pointer" variant="secondary">{triggerLabel}</Badge>}
                        onSubmit={handleAddExperience}
                        initialValues={null}
                        questions={questions}
                    />
                </div>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <div className="text-center py-8 text-gray-500">
                    <p className="mb-4">No experiences added yet</p>
                    <p className="text-sm">Click "{triggerLabel}" to add your first experience</p>
                </div>
            </CardContent>
        </Card>
    );

    if (isSectionEmpty()) {
        return <EmptyState />;
    }

    return (
        <Card className="mt-6">
            <CardHeader className="p-4">
                <div className="flex flex-row justify-start items-center">
                    <CardTitle className="flex-grow">{title}</CardTitle>
                    <ExperienceDialog
                        triggerButton={<Badge className="!mt-0 flex justify-center cursor-pointer" variant="secondary">{triggerLabel}</Badge>}
                        onSubmit={handleAddExperience}
                        initialValues={null}
                        questions={questions}
                    />
                </div>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            
            <CardContent className="p-4 flex flex-col gap-2">
                {resume[sectionKey]
                    .filter(experience => !isExperienceEmpty(experience))
                    .map((experience) => (
                        <div key={experience.id}>
                            <div className="flex flex-row justify-between w-full">
                                <h3 className="text-xl font-semibold">{experience.title}</h3>
                                <p className="text-gray-700">{experience.dates}</p>
                            </div>
                            
                            <p className="text-gray-700">{experience.companyName}</p>
                            <ul className="list-disc pl-5">
                                <li>{experience.bulletPoint1}</li>
                                <li>{experience.bulletPoint2}</li>
                                <li>{experience.bulletPoint3}</li>
                            </ul>
                            <div className="mt-4 flex justify-start space-x-2">
                                <ExperienceDialog
                                    triggerButton={<Button onClick={() => setEditingExperience(experience)}>Edit</Button>}
                                    onSubmit={handleEditExperience}
                                    initialValues={editingExperience}
                                    questions={questions}
                                />
                                <Button variant="secondary" onClick={() => handleDeleteExperience(experience.id)}>Delete</Button>
                            </div>
                            <Separator className="my-4" />
                        </div>
                    ))}
            </CardContent>
        </Card>
    );
};

export default ExperienceSection;