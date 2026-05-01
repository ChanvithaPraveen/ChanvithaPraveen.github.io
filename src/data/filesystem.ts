/**
 * Virtual filesystem for the live terminal.
 * Contains ONLY public information — no secrets, tokens, or sensitive data.
 * Structure mirrors a unix home directory.
 */

export type FsNode = FsFile | FsDir;

export interface FsFile {
  type: 'file';
  name: string;
  content: string;
  size?: number;
  mode?: string;
  mtime?: string;
}

export interface FsDir {
  type: 'dir';
  name: string;
  children: Record<string, FsNode>;
  mode?: string;
  mtime?: string;
}

const file = (name: string, content: string, mtime = '2026-04-29'): FsFile => ({
  type: 'file',
  name,
  content,
  size: content.length,
  mode: '-rw-r--r--',
  mtime,
});

const dir = (name: string, children: Record<string, FsNode>, mtime = '2026-04-29'): FsDir => ({
  type: 'dir',
  name,
  children,
  mode: 'drwxr-xr-x',
  mtime,
});

const README = `\
================================================================
  Welcome to chanvitha@portfolio:~$
================================================================

You are connected to a public-read shell.

  Useful commands:
    help          show all commands
    ls            list current directory
    cd <dir>      change directory  (try: cd about)
    cat <file>    print file contents
    tree          show full directory map
    neofetch      operator system info
    clear         wipe terminal
    exit          close the terminal

  Suggested tour:
    $ cd about && cat bio.txt
    $ cd ../projects && ls
    $ cat ../skills/languages.txt
    $ tree

  All data here is PUBLIC. No private files exposed.

  -- Chanvitha
`;

const BIO = `\
NAME      : Chanvitha Praveen
ROLE      : Computer Engineer (BSc. Eng Hons)
LOCATION  : Sri Lanka
FOCUS     : Full-Stack Web · Machine Learning · Cyber/Blockchain · Computer Vision

I am a Computer Engineer driven by a passion for building secure,
intelligent systems and shipping software that solves real-world
problems. I work across the stack — from training neural networks
in Python/TensorFlow to deploying microservices in Java/Spring,
and crafting frontends in React/Next.js.

Always learning. Always shipping.
`;

const CONTACT = `\
EMAIL     : chanvithapraween@gmail.com
GITHUB    : https://github.com/ChanvithaPraveen
LINKEDIN  : https://www.linkedin.com/in/chanvithapraveen/
TWITTER   : https://x.com/ChanvithaP
LOCATION  : Sri Lanka

Status    : [ accepting collaborations ] [ open to opportunities ]

Note: Office hours on demand. I usually reply within 24 hours.
`;

const INTERESTS = `\
* Machine Learning & Deep Learning
* Computer Vision & Image Processing
* Full-Stack Web Engineering
* Microservices & Distributed Systems
* Blockchain & Cryptography
* Reverse Engineering & CTF challenges
* Photography (yes, my work is on Shutterstock)
`;

const EDUCATION = `\
[2019 - 2024] B.Sc. Eng. (Hons) Computer Engineering
              University of Sri Jayewardenepura, Faculty of Engineering
              Minor : Data Management
              GPA   : 3.46 / 4.00

[2015 - 2018] GCE A/L — Physical Science Stream
              Bandaranayake Central College, Veyangoda
              Result : 2A 1B  |  Z-Score: 1.713

[2009 - 2014] GCE Ordinary Level
              President's College, Minuwangoda
              Result : 9 A's
`;

const EXP_LSEG = `\
COMPANY   : London Stock Exchange Group (LSEG), Sri Lanka
ROLE      : Engineering Intern
DURATION  : Feb 2023 — Dec 2023 (10 months)

Highlights:
  - Built test-case generation prototypes powered by LLMs
  - Implemented diagram-to-text extraction pipelines
  - Wrote tooling to enumerate running AWS instances per user/region
  - Performed data collection, preprocessing & anomaly detection
  - Shipped React / Streamlit frontends for LLM prototype testing
  - Contributed to Blockchain Development Research

Tech: Python, C++, Java, React, TensorFlow, AWS, Spark, Streamlit
`;

const EXP_SPA = `\
COMPANY   : Spa Ceylon — Janet Lanka PLC, Sri Lanka
ROLE      : Reception Front Officer & Sales Assistant
DURATION  : Oct 2018 — Sep 2019 (1 year)

Highlights:
  - Hit maximum monthly sales targets consistently
  - Front-office reception, customer interaction, cashiering
  - Strong cross-functional communication skills

Tech: Soft skills · Sales · Customer ops
`;

const SKILLS_LANGS = `\
[ LANGUAGES ]
  C, C++, Java, Python, JavaScript, TypeScript, Dart, Solidity, PHP, SQL, HTML, CSS
`;

const SKILLS_FRAMEWORKS = `\
[ FRAMEWORKS / LIBRARIES ]
  React, Next.js, Node.js, Spring Boot, FastAPI, Streamlit,
  Flutter, TensorFlow, OpenCV, Tailwind CSS, Material-UI,
  React Native (basic), Hardhat, Vite
`;

const SKILLS_TOOLS = `\
[ DEV TOOLS / DEVOPS ]
  Git, GitHub, Docker, Jenkins, Linux, AWS, Postman, Jira,
  PyCharm, IntelliJ, CLion, VS Code, Figma, Adobe XD,
  Photoshop, Illustrator

[ DATABASES ]
  MySQL, PostgreSQL, MongoDB, Firebase, SQLite, Hive
`;

const SKILLS_CYBER = `\
[ CYBER / RESEARCH AREAS ]
  - Introduction to Cybersecurity (Cisco)
  - Smart contract development (Solidity / Ropsten)
  - Blockchain transaction systems
  - AI image authenticity classification (ViT)
  - Adversarial / generative model exploration
`;

const CERTS = `\
[01]  Python Data Structures            University of Michigan (Coursera)
      https://www.coursera.org/account/accomplishments/verify/XNZC76Q72C3R

[02]  Introduction To Machine Learning  Kaggle
      https://www.kaggle.com/learn/certification/chanvithapraveen/intro-to-machine-learning

[03]  React Basics                      Meta (Coursera)
      https://www.coursera.org/account/accomplishments/verify/6K8KHLAPUYH5

[04]  AWS Educate Intro to Cloud        AWS / Credly
      https://www.credly.com/badges/210bb767-b183-4f4a-84ee-e16f331aff77/linked_in_profile

[05]  SQL For Data Science              UC Davis (Coursera)
      https://www.coursera.org/account/accomplishments/certificate/6F8ABW67RB2S

[06]  Introduction To Cybersecurity     Cisco / Credly
      https://www.credly.com/badges/6cba6cba-ac08-4715-9a89-920c307ebe89?source=linked_in_profile
`;

const PROJECT_FILES: Record<string, string> = {
  'clothcraft-ar.md': `\
# AR/VR-based Garment Simulator (ClothCraftAR)
A virtual try-on platform: input basic body measurements, a custom deep
learning model derives complex measurements, and users can wear
admin-designed garments in a virtual wardrobe before purchasing.

Stack : React, Node.js, MongoDB, FastAPI, Python, Supabase
GitHub: https://github.com/Nilupa-Illangarathna/FYP-ClothCraftAR_NodeBackend
`,

  'airline-system.md': `\
# Microserviced Online Airline Reservation System
Independent services for User, Reservation, Flight Info, Frontend.
Eureka discovery, load balancers, dedicated databases, blue/green
deployments aiming for zero downtime.

Stack : Java, Spring Boot, Eureka, React, Docker
GitHub: https://github.com/Binary-Clan/Airline-Reservation-System
`,

  'visual-sudoku.md': `\
# Advanced Vision Sudoku Solver
9x9 & 16x16 Sudoku solver. Camera-based capture, EasyOCR digit
extraction, then C++ heuristic backtracking for fast solves
(~2.6 ms for 9x9, ~16.5 ms for 16x16).

Stack : C++, Python, React, OpenCV, OCR, ML
GitHub: https://github.com/rusirugunaratne/VisualSudoku.git
`,

  'elcare.md': `\
# elCare Mobile Application
Digital companion for senior citizens — manages medical routines,
sleep tracking, emergency contacts, family-doctor connection,
and shared medical info.

Stack : Flutter, Dart, Firebase, SQLite, Hive
GitHub: https://github.com/ChanvithaPraveen/elCare-Mobile-Application.git
`,

  'ipl-analyzer.md': `\
# IPL Twitter Hashtags Analysis & Forecaster
Analyzes hashtag engagement over time and across cities — historical
macro/micro analytics + forecasting. Feature engineering grew the
dataset from 11 to 22 columns.

Stack : Python, Streamlit, FastAPI, TensorFlow, GEO-API
GitHub: https://github.com/ChanvithaPraveen/IPL-Twitter-Hashtags-Analysis.git
`,

  'realtime-translator.md': `\
# Realtime Chat Translator
A web app that translates user messages on-the-fly to each
recipient's preferred language — promoting ethnic cohesion.

Stack : Python, Streamlit, MyMemory Translation API, Firebase
GitHub: https://github.com/ChanvithaPraveen/Realtime-Message-Translator.git
`,

  'cryptanz.md': `\
# Cryptanz Blockchain Transaction System
Send digital currency over Ethereum (Ropsten test network). View
recent transactions; future work: AES-encrypted messages and PGP
mail-server based login.

Stack : JavaScript, Solidity, React, Tailwind, Hardhat, Vite
GitHub: https://github.com/ChanvithaPraveen/cryptanz-blockchain-transaction-system.git
`,

  'ai-vs-real.md': `\
# AI vs Real Human Faces — Research
Classifies high-realism Stable Diffusion AI faces vs real photographs.
Custom dataset (~17k images) on a Vision Transformer (ViT) model;
~99.97% current accuracy. API to integrate into social uploaders.

Stack : Python, FastAPI, Google Colab, ViT, Pandas
`,
};

const SOCIAL = `\
[ social.json ]
{
  "github"    : "https://github.com/ChanvithaPraveen",
  "linkedin"  : "https://www.linkedin.com/in/chanvithapraveen/",
  "twitter"   : "https://x.com/ChanvithaP",
  "facebook"  : "https://facebook.com/chanvitha.edirisinghedewayalage",
  "shutter"   : "https://www.shutterstock.com/g/chanvitha+praveen",
  "email"     : "chanvithapraween@gmail.com"
}
`;

const NOW_PLAYING = `\
$ cat /proc/now_playing

  STATUS    : [ online ]
  CURRENTLY : Shipping production code, training models, exploring AI safety.
  AVAILABLE : Yes — open to collaborations & opportunities.
  MOOD      : Caffeine-fueled. Curious. Building.
`;

export const HOME_PATH = '/home/chanvitha';

export const filesystem: FsDir = dir('/', {
  home: dir('home', {
    chanvitha: dir('chanvitha', {
      'README.md': file('README.md', README),
      about: dir('about', {
        'bio.txt': file('bio.txt', BIO),
        'contact.txt': file('contact.txt', CONTACT),
        'interests.txt': file('interests.txt', INTERESTS),
        'now-playing.txt': file('now-playing.txt', NOW_PLAYING),
      }),
      education: dir('education', {
        'timeline.txt': file('timeline.txt', EDUCATION),
      }),
      experience: dir('experience', {
        'lseg.txt': file('lseg.txt', EXP_LSEG),
        'spa-ceylon.txt': file('spa-ceylon.txt', EXP_SPA),
      }),
      projects: dir(
        'projects',
        Object.fromEntries(
          Object.entries(PROJECT_FILES).map(([n, c]) => [n, file(n, c)])
        )
      ),
      skills: dir('skills', {
        'languages.txt': file('languages.txt', SKILLS_LANGS),
        'frameworks.txt': file('frameworks.txt', SKILLS_FRAMEWORKS),
        'tools.txt': file('tools.txt', SKILLS_TOOLS),
        'cyber.txt': file('cyber.txt', SKILLS_CYBER),
      }),
      certifications: dir('certifications', {
        'list.txt': file('list.txt', CERTS),
      }),
      social: dir('social', {
        'links.json': file('links.json', SOCIAL),
      }),
    }),
  }),
  etc: dir('etc', {
    'motd': file(
      'motd',
      'Welcome aboard. This is a public-read kernel surface. Have fun exploring.\n'
    ),
    'os-release': file(
      'os-release',
      [
        'NAME="ChanvithaOS"',
        'VERSION="0x2026.05 (Neon Grid)"',
        'ID=chanvithaos',
        'PRETTY_NAME="ChanvithaOS 0x2026.05 (Neon Grid)"',
        'HOME_URL="https://chanvithapraveen.github.io"',
        'BUG_REPORT_URL="mailto:chanvithapraween@gmail.com"',
        '',
      ].join('\n')
    ),
  }),
});
