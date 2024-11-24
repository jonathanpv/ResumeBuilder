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
      "title": "f",
      "dates": "may 2021 -- may 3033",
      "companyName": "f",
      "bulletPoint1": "f",
      "bulletPoint2": "f",
      "bulletPoint3": "f",
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

// function that hahndles the json events

function createLatexStringHeader(personalInfo) {

  if (personalInfo.name.length == 0 || personalInfo.email.length == 0 || personalInfo.github.length == 0 || personalInfo.linkedin.length == 0) {
    return ``;
  }

  return `
  \\begin{center}
  \\textbf{\\huge \\scshape ${personalInfo.name}} \\\\
  \\small \\href{mailto:${personalInfo.email}}{\\underline{${personalInfo.email}}} $|$ 
  \\href{https://${personalInfo.github}}{\\underline{${personalInfo.github}}} $|$ 
  \\href{https://${personalInfo.linkedin}}{\\underline{${personalInfo.linkedin}}}
\\end{center}

  `;
}


function createLatexStringSkillsSection(skills) {
  if (skills.toolsAndFrameworks.length == 0 || skills.programmingLanguages.length == 0) {
    return ``;
  }
  // Helper to escape the # keyword since # in latex is a special key. And users may sometimes include C# as a skill.
  const escapeLatexCharacters = (str) => str.replace(/#/g, '\\#');

  // Map over tools and frameworks and programming languages to escape characters
  const toolsFrameworks = skills.toolsAndFrameworks.map(escapeLatexCharacters).join(', ');
  const programmingLanguages = skills.programmingLanguages.map(escapeLatexCharacters).join(', ');


  return `
  \\section{Skills}
\\begin{itemize}
  \\item \\textbf{Code:} ${programmingLanguages}
  \\item \\textbf{Tools:} ${toolsFrameworks}
\\end{itemize}
  `;
}

function createLatexStringExperienceSection(sectionTitle, jobExperience) {
  if (jobExperience.length == 0) {
    return ``;
  }

  let experienceSection = `\\section{${sectionTitle}}
\\resumeSubHeadingListStart
`;

  jobExperience.forEach((job) => {
    experienceSection += `  \\resumeSubheading
    {${job.companyName}}{${job.dates}}
    {${job.title}}{}
    \\resumeItemListStart
      \\resumeItem{${job.bulletPoint1}}
      \\resumeItem{${job.bulletPoint2}}
      \\resumeItem{${job.bulletPoint3}}
    \\resumeItemListEnd
`;
  });

  experienceSection += `\\resumeSubHeadingListEnd`;

  return experienceSection;
}


function createLatexStringEducationSection(sectionTitle, education) {
  if (education.institutionName.length == 0 || education.degreeDetails.length == 0 || education.timePeriod.length == 0) {
    return ``;
  }

  let educationSection = `\\section{${sectionTitle}}
\\resumeSubHeadingListStart
`;

  
    educationSection += `  \\resumeSubheading
    {${education.institutionName}}{${education.timePeriod}}
    {${education.degreeDetails}}{}
`;

educationSection += `\\resumeSubHeadingListEnd`;

  return educationSection;
}


// given teh above example generate a function taht takes in teh experience key and outputs a latex string like the one above

export const jsonToLatexString = (resumeJSON) => {
  
  return [
    preamble, 
    createLatexStringHeader(resumeJSON.personalInfo),
    createLatexStringSkillsSection(resumeJSON.skills),
    createLatexStringExperienceSection("Experience", resumeJSON.jobExperience),
    createLatexStringExperienceSection("Projects", resumeJSON.projectExperience),
    createLatexStringEducationSection("Education", resumeJSON.education),

    `\\end{document}`
  ].join('\n');

}
