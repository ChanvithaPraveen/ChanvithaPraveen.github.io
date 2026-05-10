interface Experience {
    company: string;
    title: string;
    description: string;
    image: string;
    hoverImage?: string;
    technologies: string[];
    startDate: string;
    endDate: string;
}

const experiences: Experience[] = [
    {
        company: 'Singapore-based Logistics Management Software Company',
        title: 'Software Engineer (Full-Stack)',
        description:
            'Contributing to a scalable product platform with 12 microservices, supporting 7 major clients and 20+ operations. Building a new KPI-focused dashboard, revamping the GPS module, and delivering urgent client requirements. Ensuring system stability & performance by fixing L1 issues, writing unit tests, and improving development efficiency using Cursor & other modern tooling in sprint-based workflows.',
        image: '/sywftfloai.png',
        technologies: [
            'Angular',
            'NestJS',
            'Python',
            'Java',
            'SpringBoot',
            'TypeScript',
            'REST',
            'GraphQL',
            'MongoDB',
            'GCloud',
            'Bitbucket',
            'Kubernetes',
        ],
        startDate: 'Jan 2025',
        endDate: 'Present',
    },
    {
        company: 'Outsourced Contract Projects',
        title: 'Software Engineer – ML',
        description:
            'Delivered three contract ML projects: (1) Smart Attendance System for Workstation, (2) Dental Radiology Report Generator, and (3) Text-to-Video, Image-to-Video + Audio Generation Pipeline. Owned end-to-end work — data pipeline, model integration, and API delivery — for each engagement.',
        image: '/outsourced.jpg',
        technologies: ['Python', 'FastAPI', 'PyTorch', 'Computer Vision', 'LLM', 'Generative AI', 'OpenCV'],
        startDate: 'Aug 2024',
        endDate: 'Dec 2024',
    },
    {
        company: 'London Stock Exchange Group (LSEG), Sri Lanka',
        title: 'ML Engineer Intern (10 Months)',
        description:
            'Extracted data from diagram images and converted them into textual format to feed an in-house LLM. Engaged in data collection, web scraping, preprocessing, and tested LLamaCPP locally. Designed React/Streamlit-based frontends for LLM prototype endpoint testing. Built a CLI tool to identify running AWS instances by user and region to reduce cost. Did anomaly detection with multiple algorithms and research on blockchain systems for the Stock Market.',
        image: '/LSEG.png',
        hoverImage: '/lseg.jpg',
        technologies: ['Python', 'C++', 'Java', 'React', 'TensorFlow', 'AWS', 'Spark', 'Streamlit', 'Selenium', 'Automation'],
        startDate: 'Feb 2023',
        endDate: 'Dec 2023',
    },
    {
        company: 'Spa Ceylon – Janet Lanka PLC, Sri Lanka',
        title: 'Reception Front Officer & Sales Assistant (1 Year)',
        description:
            'Had a great work experience in sales assisting, cashiering and front office receptionist. Achieved maximum monthly sales targets and made significant commitments for the company.',
        image: '/spa_ceylon.jpg',
        hoverImage: '/spa-ceylon.png',
        technologies: ['Receptionist Duties', 'Communication', 'Sales Assessments', 'Customer Interaction'],
        startDate: 'Oct 2018',
        endDate: 'Sep 2019',
    },
];

export default experiences;
