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

const certsBlock = `\
1. Python Data Structures — University of Michigan (Coursera)
2. Introduction To Machine Learning — Kaggle
3. React Basics — Meta (Coursera)
4. AWS Educate Introduction to Cloud — AWS / Credly
5. SQL For Data Science — UC Davis (Coursera)
6. Introduction To Cybersecurity — Cisco / Credly`;

export const KNOWLEDGE_BASE = `\
# CHANVITHA PRAVEEN — public profile

## Identity
- Full name      : Chanvitha Praveen
- Role           : Computer Engineer (BSc. Eng Hons)
- Location       : Sri Lanka
- Email          : chanvithapraween@gmail.com
- GitHub         : https://github.com/ChanvithaPraveen
- LinkedIn       : https://www.linkedin.com/in/chanvithapraveen/
- Twitter / X    : https://x.com/ChanvithaP
- Facebook       : https://facebook.com/chanvitha.edirisinghedewayalage
- Shutterstock   : https://www.shutterstock.com/g/chanvitha+praveen

## Bio
Computer Engineer driven by a passion for building secure, intelligent
systems and shipping software that solves real-world problems. Works
across the stack — from training neural networks in Python/TensorFlow
to deploying microservices in Java/Spring, and crafting frontends in
React/Next.js. Always learning, always shipping. Open to collaborations
and opportunities; usually replies within 24 hours.

## Focus areas
- Full-stack web engineering
- Machine learning, deep learning, computer vision
- Microservices & distributed systems
- Blockchain & cryptography
- Reverse engineering / CTF challenges
- Photography (also publishes on Shutterstock)

## Education

${educationBlock}

## Industry experience

${experienceBlock}

## Projects

${projectsBlock}

## Skills (technologies, tools, frameworks)
${skillsBlock}

## Certifications
${certsBlock}

## Availability
- Status        : online / actively building
- Open to       : collaborations, internships, full-time roles
- Response time : within ~24 hours via email

## Things NOT to disclose / topics out of scope
- No private contact details, addresses, phone numbers, or family info.
- No salary expectations.
- No personal opinions on politics, religion, or unrelated topics.
- If asked about anything outside this knowledge base, politely refuse
  and redirect the user back to portfolio-related questions.
`;

export default KNOWLEDGE_BASE;
