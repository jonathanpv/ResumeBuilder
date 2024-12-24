// @ts-nocheck

'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function PersonalInfoSection({ resume, setResume, resumeFeedback }) {
  const handleInputChange = (field, value) => {
    setResume(prevResume => ({
      ...prevResume,
      personalInfo: {
        ...prevResume.personalInfo,
        [field]: value,
      },
    }));
  };

  return (
        <>
            <div className="flex flex-col gap-2">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={resume.personalInfo.name || ''}
                        placeholder="Your name"
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        value={resume.personalInfo.email || ''}
                        placeholder="Your email"
                        onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                </div>
                <div>
                    <Label>Github</Label>
                    <Input
                        id="github"
                        value={resume.personalInfo.github || ''}
                        placeholder="https://github.com/username"
                        onChange={(e) => handleInputChange('github', e.target.value)}
                    />
                </div>
                <div>
                    <Label>LinkedIn</Label>
                    <Input
                        id="linkedin"
                        value={resume.personalInfo.linkedin || ''}
                        placeholder="https://linkedin.com/in/username"
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    />
                </div>
            </div>
        </>
  );
}

export default PersonalInfoSection; 