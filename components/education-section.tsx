//@ts-nocheck
'use client'
import React, { useState, useEffect } from 'react';
import { CardTitle, CardHeader, CardContent, CardDescription, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const EducationSection = ({ education, setResume }) => {
  // Initialize education section if it doesn't exist
  useEffect(() => {
    if (!education) {
      setResume(prevResume => ({
        ...prevResume,
        education: {
          institutionName: '',
          degreeDetails: '',
          timePeriod: ''
        }
      }));
    }
  }, [education, setResume]);

  const handleInputChange = (field, value) => {
    setResume(prevResume => ({
      ...prevResume,
      education: {
        ...(prevResume.education || {}),
        [field]: value,
      },
    }));
  };

  // Early return with skeleton UI while education is being initialized
  if (!education) {
    return (
      <Card className="mt-6">
        <CardHeader className="p-4">
          <CardTitle>Education</CardTitle>
          <CardDescription>
            The education section is where you share your degree, awards, GPA, etc. 
            Only share your GPA if it's 3.5+/4.0, feel free to include Dean's List, 
            quickly list academic orgs you're a part of.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="grid gap-1.5">
            <Label>Institution Name</Label>
            <Input
              id="institutionName"
              placeholder="University of Texas at Arlington"
              disabled
            />

            <Label>Degree</Label>
            <Input
              id="degreeDetails"
              placeholder="Computer Science, Bachelor of Science"
              disabled
            />

            <Label>Time Period</Label>
            <Input
              id="educationTimePeriod"
              placeholder="Aug 2020 - Dec 2023"
              disabled
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader className="p-4">
        <CardTitle>Education</CardTitle>
        <CardDescription>
          The education section is where you share your degree, awards, GPA, etc. 
          Only share your GPA if it's 3.5+/4.0, feel free to include Dean's List, 
          quickly list academic orgs you're a part of.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="grid gap-1.5">
          <Label>Institution Name</Label>
          <Input
            id="institutionName"
            placeholder="University of Texas at Arlington"
            value={education.institutionName || ''}
            onChange={(e) => handleInputChange('institutionName', e.target.value)}
          />

          <Label>Degree</Label>
          <Input
            id="degreeDetails"
            placeholder="Computer Science, Bachelor of Science"
            value={education.degreeDetails || ''}
            onChange={(e) => handleInputChange('degreeDetails', e.target.value)}
          />

          <Label>Time Period</Label>
          <Input
            id="educationTimePeriod"
            placeholder="Aug 2020 - Dec 2023"
            value={education.timePeriod || ''}
            onChange={(e) => handleInputChange('timePeriod', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default EducationSection;