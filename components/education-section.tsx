//@ts-nocheck
'use client'
import React, { useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SortableItem } from './SortableItem';

const EducationSection = ({ education, setResume, isDragging }) => {
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

  const description = "The education section is where you share your degree, awards, GPA, etc. Only share your GPA if it's 3.5+/4.0, feel free to include Dean's List, quickly list academic orgs you're a part of.";

  return (
    <div className="grid gap-1.5">
    <Label>Institution Name</Label>
    <Input
      id="institutionName"
      placeholder="University of Texas at Arlington"
      value={education?.institutionName || ''}
      onChange={(e) => handleInputChange('institutionName', e.target.value)}
      disabled={!education}
    />

    <Label>Degree</Label>
    <Input
      id="degreeDetails"
      placeholder="Computer Science, Bachelor of Science"
      value={education?.degreeDetails || ''}
      onChange={(e) => handleInputChange('degreeDetails', e.target.value)}
      disabled={!education}
    />

    <Label>Time Period</Label>
    <Input
      id="educationTimePeriod"
      placeholder="Aug 2020 - Dec 2023"
      value={education?.timePeriod || ''}
      onChange={(e) => handleInputChange('timePeriod', e.target.value)}
      disabled={!education}
    />
  </div>
  );
}

export default EducationSection;