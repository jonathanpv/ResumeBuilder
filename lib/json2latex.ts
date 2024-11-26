let preamble = 
`
%-------------------------
% Resume in Latex
% Author : Jonathan Padilla
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}


%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
\\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}


\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\large
}{}{0em}{\\MakeUppercase}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}



%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}

`

let resumeJSON = {
  "personalInfo": {
    "name": "jonathan padilla",
    "email": "jonpad512@gmail.com",
    "linkedin": "linkedin.com/in/jonathanpv",
    "github": "github.com"
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
      "title": "",
      "dates": "",
      "companyName": "",
      "bulletPoint1": "",
      "bulletPoint2": "",
      "bulletPoint3": "",
      "id": 1708289585992
    }
  ],
  "projectExperience": [],
  "education": {
    "institutionName": "",
    "degreeDetails": "",
    "timePeriod": ""
  }
}

// Function to sanitize strings for LaTeX
function sanitizeLatexString(str: string): string {
  if (!str) return '';

  // Escape LaTeX special characters
  const specialChars: { [key: string]: string } = {
    '\\': '\\textbackslash{}',
    '{': '\\{',
    '}': '\\}',
    '#': '\\#',
    '$': '\\$',
    '%': '\\%',
    '&': '\\&',
    '_': '\\_',
    '~': '\\textasciitilde{}',
    '^': '\\textasciicircum{}',
    '<': '\\textless{}',
    '>': '\\textgreater{}',
    '|': '\\textbar{}',
    '`': '\\textasciigrave{}'
  };

  let escapedStr = str.replace(/([\\{}#$%&_^~<>|`])/g, match => specialChars[match] || match);

  // Replace markdown bold and italics with LaTeX equivalents
  // Bold: **text** or __text__
  escapedStr = escapedStr.replace(/(\*\*|__)(.*?)\1/g, '\\textbf{$2}');

  // Italic: *text* or _text_
  escapedStr = escapedStr.replace(/(\*|_)(.*?)\1/g, '\\textit{$2}');

  return escapedStr;
}

// Function that handles the JSON events

function createLatexStringHeader(personalInfo: any) {

  const { name, email, github, linkedin } = personalInfo;

  if (name.length === 0 || email.length === 0) {
    return ``;
  }

  let header = `
  \\begin{center}
  \\textbf{\\huge \\scshape ${sanitizeLatexString(name.toUpperCase())}} \\\\
  \\small \\href{mailto:${sanitizeLatexString(email)}}{\\underline{${sanitizeLatexString(email)}}}`;
  
  if (github && github.length > 0) {
    header += ` $|$ \\href{https://${sanitizeLatexString(github)}}{\\underline{${sanitizeLatexString(github)}}}`;
  }

  if (linkedin && linkedin.length > 0) {
    header += ` $|$ \\href{https://${sanitizeLatexString(linkedin)}}{\\underline{${sanitizeLatexString(linkedin)}}}`;
  }

  header += `
  \\end{center}
  `;

  return header;
}


function createLatexStringSkillsSection(skills: any) {
  const { toolsAndFrameworks, programmingLanguages } = skills;

  if ((toolsAndFrameworks.length === 0 || toolsAndFrameworks.every((item: string) => item.trim().length === 0)) &&
      (programmingLanguages.length === 0 || programmingLanguages.every((item: string) => item.trim().length === 0))) {
    return ``;
  }

  // Helper to escape the # keyword since # in latex is a special key. And users may sometimes include C# as a skill.
  const escapeLatexCharacters = (str: string) => sanitizeLatexString(str);

  // Map over tools and frameworks and programming languages to escape characters
  const toolsFrameworks = toolsAndFrameworks.map(escapeLatexCharacters).filter((item: string) => item.length > 0).join(', ');
  const programmingLanguagesStr = programmingLanguages.map(escapeLatexCharacters).filter((item: string) => item.length > 0).join(', ');

  let skillsSection = `
  \\section{Skills}
\\begin{itemize}
`;

  if (programmingLanguagesStr.length > 0) {
    skillsSection += `  \\item \\textbf{Code:} ${programmingLanguagesStr}\n`;
  }

  if (toolsFrameworks.length > 0) {
    skillsSection += `  \\item \\textbf{Tools:} ${toolsFrameworks}\n`;
  }

  skillsSection += `\\end{itemize}
  `;

  return skillsSection;
}

function createLatexStringExperienceSection(sectionTitle: string, experiences: any[]) {
  // Filter out empty experiences
  const validExperiences = experiences.filter(exp => exp.companyName && exp.companyName.trim().length > 0 && exp.title && exp.title.trim().length > 0);

  if (validExperiences.length === 0) {
    return ``;
  }

  let experienceSection = `\\section{${sanitizeLatexString(sectionTitle)}}
\\resumeSubHeadingListStart
`;

  validExperiences.forEach((job) => {
    experienceSection += `  \\resumeSubheading
    {${sanitizeLatexString(job.companyName)}}{${sanitizeLatexString(job.dates)}}
    {${sanitizeLatexString(job.title)}}{}
    \\resumeItemListStart
`;

    if (job.bulletPoint1 && job.bulletPoint1.trim().length > 0) {
      experienceSection += `      \\resumeItem{${sanitizeLatexString(job.bulletPoint1)}}
`;
    }
    if (job.bulletPoint2 && job.bulletPoint2.trim().length > 0) {
      experienceSection += `      \\resumeItem{${sanitizeLatexString(job.bulletPoint2)}}
`;
    }
    if (job.bulletPoint3 && job.bulletPoint3.trim().length > 0) {
      experienceSection += `      \\resumeItem{${sanitizeLatexString(job.bulletPoint3)}}
`;
    }

    experienceSection += `    \\resumeItemListEnd
`;
  });

  experienceSection += `\\resumeSubHeadingListEnd`;

  return experienceSection;
}


function createLatexStringEducationSection(sectionTitle: string, education: any) {
  const { institutionName, degreeDetails, timePeriod } = education;

  if (institutionName.length === 0 || degreeDetails.length === 0 || timePeriod.length === 0) {
    return ``;
  }

  let educationSection = `\\section{${sanitizeLatexString(sectionTitle)}}
\\resumeSubHeadingListStart
`;

  educationSection += `  \\resumeSubheading
    {${sanitizeLatexString(institutionName)}}{${sanitizeLatexString(timePeriod)}}
    {${sanitizeLatexString(degreeDetails)}}{}
`;

  educationSection += `\\resumeSubHeadingListEnd`;

  return educationSection;
}


// Given the above example, generate a function that takes in the experience key and outputs a LaTeX string like the one above

export const jsonToLatexString = (resumeJSON: any, sectionOrder: string[]) => {
  
  const sectionGenerators: { [key: string]: () => string } = {
    personalInfo: () => createLatexStringHeader(resumeJSON.personalInfo),
    skills: () => createLatexStringSkillsSection(resumeJSON.skills),
    jobExperience: () => createLatexStringExperienceSection("Experience", resumeJSON.jobExperience),
    projectExperience: () => createLatexStringExperienceSection("Projects", resumeJSON.projectExperience),
    education: () => createLatexStringEducationSection("Education", resumeJSON.education),
  };

  const sectionsLaTeX = sectionOrder.map(sectionKey => {
    const generator = sectionGenerators[sectionKey];
    return generator ? generator() : '';
  }).filter(section => section.trim().length > 0).join('\n');

  return [
    preamble, 
    sectionsLaTeX,
    `\\end{document}`
  ].join('\n');

}
