interface Experience {
    company: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    startDate: string;
    endDate: string;
}

const experiences: Experience[] = [
    {
        company: 'London Stock Exchange Group (LSEG), Sri Lanka',
        title: 'Engineering Intern (10 Months)',
        description: 'I support & develop sub tasks related to test case generation LLM, Data extract from diagrams & convert them into textual format, program for identify running AWS Instances in every user in the domain in specific region, Data collect & preprocess, anomaly detections, React/Streamlit base frontend for LLM’S prototype testing, and Blockchain Development Research, etc.',
        image: '/lseg.jpg',
        technologies: ['Python', 'C++', 'Java', 'React', 'TensorFlow', 'AWS', 'Spark', 'Streamlit'],
        startDate: 'Feb 2023',
        endDate: 'Dec 2023',
    },
    {
        company: 'Spa Ceylon – Janet Lanka PLC, Sri Lanka',
        title: 'Reception Front Officer & Sales Assistant (1 Year)',
        description: 'Had a great work experience in sales assisting, cashiering and front office receptionist. Achieved maximum monthly sales targets and done a huge commitment for the company.',
        image: '/spa-ceylon.png',
        technologies: ['Receptionist Duties', 'Communication', 'Sales Assessments', 'Customer Interaction'],
        startDate: 'Oct 2018',
        endDate: 'Sep 2019',
    },
    // Add more experiences as needed
];

export default experiences;