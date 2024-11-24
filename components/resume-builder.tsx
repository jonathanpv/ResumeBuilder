// @ts-nocheck

'use client'
import React, { useState, useEffect } from 'react';

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SkillsSection } from "@/components/skills-section"
import ExperienceSection from '@/components/experience-section'
import EducationSection from './education-section';

export function ResumeBuilder({resume, setResume, resumeFeedback}) {
  // This is the personalInfo stateful variable
  const handleInputChange = (section, field, value) => {
    setResume(prevResume => ({
      ...prevResume,
      [section]: {
        ...prevResume[section],
        [field]: value,
      },
    }));
  };

  // Handler for changes in arrays like jobExperience and projectExperience
  const handleArrayChange = (section, value) => {
    setResume(prevResume => ({
      ...prevResume,
      [section]: value,
    }));
  };

  // Handler for skills change, assuming it might have a different structure or requires special handling
  const handleSkillsChange = (value) => {
    setResume(prevResume => ({
      ...prevResume,
      skills: value,
    }));
  };

  
//   const [personalInfo, setPersonalInfo] = useState({
//     name: '',
//     email: '',
//     linkedin: '',
//     github: ''
//   });


//   // This is the jobExperience stateful variable
//   const [jobExperience, setJobExperience] = useState([]);
  
//   // This is the projectExperience stateful variable
//   const [projectExperience, setProjectExperience] = useState([]);

//   // This is the stateful skills list variable
//   const [skills, setSkills] = useState({
//     toolsAndFrameworks: ['React', 'Node.js', 'Next.js'],
//     programmingLanguages: ['Java', 'C', 'C++', 'Python']
//   });

//   const [education, setEducation] = useState({
//     institutionName: '',
//     degreeDetails: '',
//     timePeriod: ''
//   });

//   const [isLoadingResume, setIsLoadingResume] = useState(false);

//   // Add a new function to load resume data from JSON
//   const loadResume = (resumeData) => {
//     setIsLoadingResume(true);
//     setPersonalInfo(resumeData.personalInfo || {});
//     setSkills(resumeData.skills || {});
    
//     setJobExperience(resumeData.jobExperience || []);
//     setProjectExperience(resumeData.projectExperience || []);
//     setEducation(resumeData.education || []);

//   };

//   // Call the loadResume function with the JSON object you want to load
//   // You can replace this with the JSON object read from the URL params
//   useEffect(() => {
    
//     let ignore = false;

//     return () => {
//       ignore = true;
//     };
//   }, []);


//   React.useEffect(() => {
//     // Logic to execute when resume changes
//     console.log('Resume has changed:', resume);
//     // For instance, you could check if the resume state is not empty
//     // and then perform some action based on that
//     if (Object.keys(resume).length > 0) {
//         // Perform some action when resume is set
//         console.log('Resume is set, performing some action...');
//         // This could be updating the UI, making an API call, etc.
//     } else {
//         // Handle the case where resume is empty
//         console.log('Resume is not set or cleared.');
//     }
//     loadResume(resume);
// }, [resume]); // This effect depends on the `resume` state


//   const handlePersonalInfoChange = (field, value) => {
//     setPersonalInfo({ ...personalInfo, [field]: value });
//   };

//   const handleJobExperienceChange = (experienceData) => {
//     setJobExperience(experienceData);
//   };
  
//   const handleProjectExperienceChange = (experienceData) => {
//     setProjectExperience(experienceData);
//   };
  
//   const handleEducationChange = (educationData) => {
//     setEducation(educationData);
//   };
 
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-y-scroll">
      <main className="lg:flex-1 lg:p-4">

        <Card>
          <CardHeader className="p-4">
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {/* Explicitly handling each field */}
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
        </Card>
        <SkillsSection resume={resume} setResume={setResume}></SkillsSection>
        <ExperienceSection 
          description={"The experience section is where you showcase the skills you claim to have up top. If you don't have a job history then you can leave this blank and populate your resume with the projects section."}
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

        <ExperienceSection 
          title="Projects"
          triggerLabel="Add New Project"
          description={"Don't have any Job experience? No worries, fill this out and add any hackathon projects, difficult school assignments, tutorials you followed and build out your resume that way :)"}
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

        <EducationSection 
          education={resume?.education} 
          setResume={setResume} 
        />
        {/* <Button className="mt-6" onClick={getResume}>Get Resume</Button>

        <Button className="mt-6">Save as JSON</Button> */}
      </main>
      {/* <aside className="lg:flex-1">
        <Card className="h-[calc(100vh-2rem)] m-4 border rounded-lg">
          
        </Card>
      </aside> */}
    </div>
  )
}
