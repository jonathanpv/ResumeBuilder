import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const tempResume = {
  "personalInfo": {
    "name": "Jonathan Padilla",
    "email": "jonpad512@gmail.com",
    "linkedin": "linkedin.com/in/jonathanpv",
    "github": "github.com/jonathanpv"
  },
  "skills": {
    "toolsAndFrameworks": [
      "React",
      "Node.js",
      "Next.js"
    ],
    "programmingLanguages": [
      "Java",
      "C",
      "C++",
      "Python"
    ]
  },
  "jobExperience": [
    {
      "title": "Software Engineer Intern",
      "dates": "May 2023 - Aug 2023",
      "companyName": "Microsoft",
      "bulletPoint1": "Built a customer onboarding chatbot for GRIP, an internal tool for non-public Azure services. Resulting in quicker and more efficient user onboarding and learning, thereby increasing GRIP's adoption rate within the company.",
      "bulletPoint2": "Developed with Microsoft Bot Framework to integrate with team’s APIs for GRIP sandbox, our demo-tier data analytics engine. Lowered entry barrier for using GRIP, expediting customer learning curve",
      "bulletPoint3": "Created API endpoints for GRIP sandbox, this extended the GRIP sandbox’s reach beyond its native interface, allowing it to be integrated to web-interfaces",
      "id": 1708870583893
    },
    {
      "title": "Software Engineer Intern",
      "dates": "Sep 2022 - May 2023",
      "companyName": "Datadog",
      "bulletPoint1": "Built a playground for VRL using Rust and WebAssembly, shifted from a server-based architecture to a client-side model. Reduced operational costs and enhanced security by eliminating the remote code execution attack vector",
      "bulletPoint2": "Built and launched VRL Playground at playground.vrl.dev, allowing users to experiment with VRL transformations in a web environment. Enhanced user learning by being the default light-weight playground for vector.dev.",
      "bulletPoint3": "Implemented multiple front-end features leveraging vanilla JS, Monaco Editor, HTML, and CSSGrid, improving the user interface and experience for the VRL Playground",
      "id": 1708870591156
    }
  ],
  "projectExperience": [
    {
      "title": "Software Engineer",
      "dates": "Aug 2023 - Aug 2024",
      "companyName": "Pluto Learning",
      "bulletPoint1": "Founding Engineer",
      "bulletPoint2": "Built MVP for Pluto Learning chat based AI tutors using **OpenAI** and **Next.js**, earned $10k in university pitching competition",
      "id": 1708870599107
    }
  ],
  "education": {
    "institutionName": "University of Texas at Arlington",
    "degreeDetails": "Software Engineering, Bachelor of Science",
    "timePeriod": "2017 - 2022"
  }
};


export const emptyResume = {
  "personalInfo": {
    "name": "",
    "email": "",
    "linkedin": "",
    "github": ""
  },
  "skills": {
    "toolsAndFrameworks": [
    ],
    "programmingLanguages": [
    ]
  },
  "jobExperience": [
    {
      "title": "",
      "dates": "",
      "companyName": "",
      "bulletPoint1": "",
      "bulletPoint2": "",
      "bulletPoint3": "",
      "id": 1
    },
    {
      "title": "",
      "dates": "",
      "companyName": "",
      "bulletPoint1": "",
      "bulletPoint2": "",
      "bulletPoint3": "",
      "id": 2
    }
  ],
  "projectExperience": [
    {
      "title": "",
      "dates": "",
      "companyName": "",
      "bulletPoint1": "",
      "id": 3
    }
  ],
  "education": {
    "institutionName": "",
    "degreeDetails": "",
    "timePeriod": ""
  },
  "sectionOrder": [
    'personalInfo',
    'skills',
    'jobExperience',
    'projectExperience',
    'education'
  ]
};
