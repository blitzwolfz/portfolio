export const workExperience = [
    {
        title: 'Lead Backend Developer',
        company: 'Paulos Poetry, Toronto, ON',
        dates: 'Aug - Present',
        description: 'Developed and implemented the complete backend for a website. Enabled a 20% increase in the speed of poem submissions. Doubled the efficiency of content delivery.',
    },
    {
        title: 'Software Developer',
        company: 'Rack-I, Toronto, ON',
        dates: 'Feb - Aug 2023',
        description: 'Made substantial contributions to back-end infrastructure, enhancing data retrieval efficiency by 30%. Collaborated with front-end teams, reducing bugs by 20%. Improved deployment time by 25%.',
    },
    {
        title: 'Hardware & Software Analyst Intern',
        company: 'Ryerson University, Toronto, ON',
        dates: 'Sept 2022 - April 2023',
        description: 'Developed an internal database, reducing data entry errors by 15%. Deployed over 50 new devices, ensuring compliance with hardware policies. Oversaw data wiping process for over 100 devices, achieving zero data breaches.',
    },
    {
        title: 'Data Clerk Intern',
        company: 'Learning Enrichment Foundation, Toronto, ON',
        dates: 'June - Sept 2022',
        description: 'Streamlined data processing, reducing time by 20%. Enhanced CRM functionality, improving user satisfaction by 10%. Documented approaches, decreasing project completion time by 15%.',
    },
];

export const projects = [
    {
        title: 'Red Language',
        description: 'A toy interpreter designed to teach the concepts behind the creation of interpreters and the programming\n' +
            'languages associated with them. It successfully compiled over 100 test cases, demonstrating robust support\n' +
            'for object-oriented design, inheritance, and polymorphism.',
        link: '', // No link for this project
        techStack: ['Java'],
        starred: true, // Non-star project
        glowType: 'golden'
    },
    {
        title: 'Meme Royale',
        description: 'A backend software used to help run and manage an online tournament, which improved moderation\n' +
            'efficiency by 25%. Includes moderation tools, user tools, API data fetching. Application also utilized\n' +
            'functional programming, and object-oriented programming.',
        link: 'https://github.com/blitzwolfz/MemeRoyale',
        techStack: ['TypeScript', 'JavaScript', 'MongoDB', 'JSON'],
        starred: true, // This is a star project
        glowType: 'golden', // Choose glow type (golden or rainbow)
    },
    {
        title: 'Pokedex',
        description: 'A little Progressive Web App (PWA) I designed due to my love of Pokemon,\n it\'s installable ' +
            'anywhere you can install a PWA. \nUses Axios and TypeScript for the main backend, and React for the frontend.',
        link: 'https://www.blitzwolfz.xyz',
        techStack: ['TypeScript', 'Vite', 'Axios', 'PWA'],
        starred: false, // This is a star project
        // glowType: 'golden', // Choose glow type (golden or rainbow)
    },
    {
        title: 'Ball Motion',
        description: 'Smartphone app that uses OpenCV to detect a ball in flight, \n' +
            'predict its path and gather information for sports analytics. \n' +
            'This is a project I am collaborating ' +
            'with friends on, and I am responsible for the backend in Python, \n' +
            'which handles computer vision and statistical calculations.',
        link: 'https://github.com/JanninTeam',
        techStack: ['Python', "TypeScript", "OpenCV"],
        starred: false, // Non-star project
    },
];