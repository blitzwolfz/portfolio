import React, { useState } from 'react';
import Modal from './components/Modal';
import Signature from './components/Signature';
import resumePDF from './assets/Sam_Qureshi.pdf';

// Import styles from Portfolio.tsx
import {
    PortfolioContainer,
    Header,
    Subheader,
    TimelineContainer,
    TimelineItem,
    ModalNavButton,
    ModalText,
    ScrollButton,
    HighlightText,
    Section,
    ProjectLink,
    PullStringContainer,
    PullString,
    Footer,
    ResumeButton,
    renderWaveText
} from './components/Portfolio.tsx';

const App: React.FC<{ setView: React.Dispatch<React.SetStateAction<'portfolio' | 'terminal'>>, toggleTheme: () => void }> = ({ setView, toggleTheme }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [scrollIndex, setScrollIndex] = useState(0);

    const workExperience = [
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

    const projects = [
        {
            title: 'Meme Royale',
            description: 'A backend software used to help run and manage an online tournament, which improved moderation\n' +
                'efficiency by 25%. Includes moderation tools, user tools, API data fetching. Application also utilized\n' +
                'functional programming, and object-oriented programming.',
            link: 'https://github.com/blitzwolfz/MemeRoyale',
            techStack: ['TypeScript', 'JavaScript', 'MongoDB', 'JSON'],
        },
        {
            title: 'Red Language',
            description: 'A toy interpreter designed to teach the concepts behind the creation of interpreters and the programming\n' +
                'languages associated with them. It successfully compiled over 100 test cases, demonstrating robust support\n' +
                'for object-oriented design, inheritance, and polymorphism.',
            link: 'https://github.com/blitzwolfz/Red',
            techStack: ['Java'],
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
        },
    ];

    const openJobModal = (index: number) => {
        setSelectedJob(index);
        setIsModalOpen(true);
    };

    const openProjectModal = (index: number) => {
        setSelectedProject(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
        setSelectedProject(null);
    };

    const handleNextJob = () => {
        if (scrollIndex < workExperience.length - 3) {
            setScrollIndex(scrollIndex + 1);
        }
    };

    const handlePrevJob = () => {
        if (scrollIndex > 0) {
            setScrollIndex(scrollIndex - 1);
        }
    };

    const handleNextModalJob = () => {
        if (selectedJob !== null && selectedJob < workExperience.length - 1) {
            setSelectedJob(selectedJob + 1);
        }
    };

    const handlePrevModalJob = () => {
        if (selectedJob !== null && selectedJob > 0) {
            setSelectedJob(selectedJob - 1);
        }
    };

    const handleNextModalProject = () => {
        if (selectedProject !== null && selectedProject < projects.length - 1) {
            setSelectedProject(selectedProject + 1);
        }
    };

    const handlePrevModalProject = () => {
        if (selectedProject !== null && selectedProject > 0) {
            setSelectedProject(selectedProject - 1);
        }
    };

    return (
        <PortfolioContainer>
            <Header>i’m Sam!</Header>
            <Subheader>
                welcome to my little corner of the internet! <br/>
                <HighlightText onClick={() => setView('terminal')}>
                    {renderWaveText('Click me Terminal nerds')}
                    😲
                </HighlightText>
                <br/>
                i’m a computer science student at George Brown College. <br/>
                Even achieved a 3.82 cGPA 😎<br/>
                i love to hack and break all my projects. <br/>
                while i’m not clicking away at my keyboard,<br/>
                you can find me jamming to my guitar, <br/>
                watching youtube, and <em><u>building a unicorn startup.🦄</u></em>
            </Subheader>

            <Section>
                <h3>My Resume (No subscription required 😁)</h3>
                <ResumeButton href={resumePDF} target="_blank" rel="noopener noreferrer">👀 View</ResumeButton>
                <ResumeButton href={resumePDF} download="Sam_Qureshi.pdf">⬇️ Download</ResumeButton>
            </Section>

            <h3>Cool places I've worked at</h3>

            <TimelineContainer>
                {workExperience.slice(scrollIndex, scrollIndex + 3).map((job, index) => (
                    <TimelineItem key={index} onClick={() => openJobModal(index)}>
                        <h4>{job.title} ({job.company})</h4>
                        <p>{job.dates}</p>
                    </TimelineItem>
                ))}
                {scrollIndex > 0 && <ScrollButton direction="left" onClick={handlePrevJob}>❮</ScrollButton>}
                {scrollIndex < workExperience.length - 3 && <ScrollButton direction="right" onClick={handleNextJob}>❯</ScrollButton>}
            </TimelineContainer>

            <Section>
                <h3>Things I've made</h3>
                {projects.map((project, index) => (
                    <ProjectLink key={index} onClick={() => openProjectModal(index)}>
                        {project.title}
                    </ProjectLink>
                ))}
            </Section>

            <PullStringContainer onClick={toggleTheme}>
                <PullString>
                    |
                    <br/>
                    |
                    <br/>
                    |
                    <br/>
                    |
                    <br/>
                    o
                </PullString>
            </PullStringContainer>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedJob !== null && (
                    <ModalText>
                        <h3>{workExperience[selectedJob].title}</h3>
                        <p>{workExperience[selectedJob].dates}</p>
                        <p>{workExperience[selectedJob].description}</p>
                        <ModalNavButton onClick={handlePrevModalJob} disabled={selectedJob === 0}>
                            Previous Job
                        </ModalNavButton>
                        <ModalNavButton onClick={handleNextModalJob} disabled={selectedJob === projects.length - 1}>
                            Next Job
                        </ModalNavButton>
                    </ModalText>
                )}
                {selectedProject !== null && (
                    <ModalText>
                        <h3>{projects[selectedProject].title}</h3>
                        <p>{projects[selectedProject].description}</p>
                        <p><strong>Tech Stack:</strong> {projects[selectedProject].techStack.join(', ')}</p>
                        <a href={projects[selectedProject].link} target="_blank" rel="noopener noreferrer">View on GitHub</a><br/>
                        <ModalNavButton onClick={handlePrevModalProject} disabled={selectedProject === 0}>
                            Previous Project
                        </ModalNavButton>
                        <ModalNavButton onClick={handleNextModalProject} disabled={selectedProject === projects.length - 1}>
                            Next Project
                        </ModalNavButton>
                    </ModalText>
                )}
            </Modal>

            <Footer>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Made with love ❤️️
                <Signature/>
            </Footer>
        </PortfolioContainer>
    );
};

export default App;
