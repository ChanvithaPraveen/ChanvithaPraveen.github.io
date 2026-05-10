/**
 * Knowledge base for "Chana" — the portfolio AI assistant.
 *
 * This file flattens public information about Chanvitha Praveen into a
 * single plain-text blob that gets sent to the LLM as context. It only
 * uses data that is ALREADY public on the site — no secrets.
 *
 * If you update projects/experience/skills/etc, also update this file
 * (or just re-derive from the existing data files — the helpers below).
 */

import projects from './projects';
import experiences from './experience';
import educationData from './education';
import techSkills from './techStack';
import publications from './publications';

interface Proj {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  link?: string;
}

const PROJECTS = projects as Proj[];

const projectsBlock = PROJECTS.map(
  (p, i) => `\
${i + 1}. ${p.title}
   - description: ${p.description.replace(/\s+/g, ' ').trim()}
   - tech: ${p.technologies.join(', ')}
   - github: ${p.github && p.github !== '#' ? p.github : 'n/a'}
   - link: ${p.link || 'n/a'}`
).join('\n\n');

const experienceBlock = experiences
  .map(
    (e, i) => `\
${i + 1}. ${e.title} @ ${e.company}
   - duration: ${e.startDate} – ${e.endDate}
   - tech: ${e.technologies.join(', ')}
   - summary: ${e.description.replace(/\s+/g, ' ').trim()}`
  )
  .join('\n\n');

const educationBlock = (educationData as any[])
  .map(
    (ed, i) => `\
${i + 1}. ${ed.institution}
   - school: ${ed.degree}
   - period: ${ed.duration}`
  )
  .join('\n\n');

const skillsBlock = (techSkills as any[]).map((s) => s.label.replace(/\.js$/, '')).join(', ');

const publicationsBlock = publications
  .map(
    (p, i) => `\
${i + 1}. ${p.title}
   - venue     : ${p.venue}, ${p.location}, ${p.year}, ${p.pages}
   - publisher : ${p.publisher}
   - doi       : ${p.doi}
   - link      : ${p.link}
   - authors   : ${p.authors.join(', ')}
   - keywords  : ${p.keywords.join(', ')}
   - abstract  : ${p.abstract.replace(/\s+/g, ' ').trim()}
   - citation  : ${p.citation}`
  )
  .join('\n\n');

const certsBlock = `\
1. Python Data Structures — University of Michigan (Coursera)
2. Introduction To Machine Learning — Kaggle
3. React Basics — Meta (Coursera)
4. AWS Educate Introduction to Cloud — AWS / Credly
5. SQL For Data Science — UC Davis (Coursera)
6. Introduction To Cybersecurity — Cisco / Credly`;

const proficientConceptsBlock = `\
- Object Oriented Programming (OOP)
- Data Structures & Algorithms (DSA)
- Software Engineering & QA
- Data Mining & Database Management
- Machine / Deep Learning & Intelligent Systems
- Microservices & Monolithic Architectures
- Agile & Waterfall environments
- Design Patterns
- Networking & Security`;

const softSkillsBlock = `\
Fast Learning · Team Working · Good Communication · Time Management ·
Problem Solving · Work-Life Balance with Hobbies`;

const extracurricularsBlock = `\
1. Editor IT — FLAIR Club, USJ (led ~20-person media team)         Apr 2022 – Dec 2023
2. Finance Member — IEEE Student Branch, USJ (sponsorships,
   budget handling)                                                 Oct 2021 – Oct 2023
3. Lead Marketing Member — Computer Engineering Society
   (CENSOC), FOE, USJ                                               May 2022 – Jun 2024
4. Active Student Member — IEEE & Computer Society
5. Active Student Member — IESL (Institution of Engineers Sri Lanka)`;

const refereesBlock = `\
1. Dr. Udaya Wijenayake — Department Head & Senior Lecturer,
   Computer Engineering, Faculty of Engineering, USJ
2. Mr. Keshan Sodimana — Associate Architect, Machine Learning,
   LSEG Technology
(Contact details available on direct request via email.)`;

export const KNOWLEDGE_BASE = `\
# CHANVITHA PRAVEEN — public profile

## Identity
- Full name      : Chanvitha Praveen
- Role           : Computer Engineer (BSc. Eng. Hons)
- Current job    : Software Engineer at a Singapore-based Logistics
                   Management Software company (Jan 2025 – Present)
- Location       : Sri Lanka (Minuwangoda)
- Email          : chanvithapraween@gmail.com
- GitHub         : https://github.com/ChanvithaPraveen
- LinkedIn       : https://www.linkedin.com/in/chanvithapraveen/
- Twitter / X    : https://x.com/ChanvithaP
- Facebook       : https://facebook.com/chanvitha.edirisinghedewayalage
- Shutterstock   : https://www.shutterstock.com/g/chanvitha+praveen
- Portfolio      : http://chanvithapraveen.me

## Bio
Computer Engineer driven by a passion for building secure, intelligent
systems and shipping software that solves real-world problems. Works
across the stack — from training neural networks in Python/TensorFlow,
to building microservices in Java/Spring, NestJS, and Angular, to
crafting frontends in React/Next.js. Currently contributing to a
12-microservice logistics product platform supporting 7 major clients
and 20+ operations. Always learning, always shipping. Open to
collaborations and opportunities; usually replies within 24 hours.

## Current focus (2025)
- Scalable microservice product engineering (Angular / NestJS / Java
  Spring Boot) at a Singapore-based logistics SaaS.
- KPI-focused dashboards, GPS module work, L1 stability, unit testing.
- Sprint workflow productivity using Cursor and modern tooling.
- Side: Generative AI / Vision Transformer research, photography.

## Focus areas
- Full-stack web engineering (Angular, React, NestJS, Spring Boot)
- Microservices & distributed systems (12-service platform, Kubernetes)
- Machine learning, deep learning, computer vision, generative AI
- Blockchain & cryptography
- Reverse engineering / CTF challenges
- Photography (also publishes on Shutterstock)

## Proficient concepts
${proficientConceptsBlock}

## Education

${educationBlock}

## Industry experience

${experienceBlock}

## Projects

${projectsBlock}

## Skills (technologies, tools, frameworks)
${skillsBlock}

## Publications (peer-reviewed)

${publicationsBlock}

## Certifications
${certsBlock}

## Soft skills
${softSkillsBlock}

## Extracurricular activities & memberships
${extracurricularsBlock}

## Referees
${refereesBlock}

## Availability
- Status        : online / actively building
- Open to       : collaborations, internships, full-time roles,
                  freelance / outsourced ML & full-stack contracts
- Response time : within ~24 hours via email

## Things NOT to disclose / topics out of scope
- No private contact details, addresses, phone numbers, or family info.
- No salary expectations.
- No personal opinions on politics, religion, or unrelated topics.
- Do not name the specific Singapore-based current employer; refer to
  it as "a Singapore-based Logistics Management Software company".
- If asked about anything outside this knowledge base, politely refuse
  and redirect the user back to portfolio-related questions.
`;

export default KNOWLEDGE_BASE;
