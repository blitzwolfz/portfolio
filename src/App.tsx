import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Modal from './components/Modal';
import Signature from './components/Signature';
import resumePDF from './assets/Sam_Qureshi.pdf';

// Keyframes for glowing border effect without spinning the box
const glowingBorderSpin = keyframes`
    0% {
        box-shadow: 0 0 10px 0px, 0 0 10px 0px inset;
    }
    50% {
        box-shadow: 0 0 20px 5px, 0 0 20px 5px inset;
    }
    100% {
        box-shadow: 0 0 10px 0px, 0 0 10px 0px inset;
    }
`;

// Styled Components for the Portfolio
const PortfolioContainer = styled.div`
    min-height: 100vh;
    padding: 60px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
`;

const Header = styled.h1`
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 10px;
`;

const Subheader = styled.h2`
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 20px;
    max-width: 800px;
`;

const TimelineContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 900px;
    margin-bottom: 50px;
    padding: 0 30px;
`;

const TimelineItem = styled.div`
    width: 100%;
    max-width: 600px;
    border: 2px solid ${(props) => props.theme.buttonBackgroundColor};
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};
    transition: transform 0.3s;
    margin: 20px 0;

    &:hover {
        animation: ${glowingBorderSpin} 1.5s linear infinite;
        box-shadow: ${(props) =>
    props.theme.backgroundColor === '#000'
        ? '0px 0px 20px 5px gold, 0px 0px 20px 5px inset gold'
        : '0px 0px 20px 5px lightblue, 0px 0px 20px 5px inset lightblue'};
    }

    h4 {
        margin-bottom: 10px;
        font-size: 1.25rem;
    }

    p {
        margin-bottom: 5px;
        color: ${(props) => props.theme.color};
    }
`;

const ModalNavButton = styled.button`
    background-color: ${(props) => props.theme.buttonBackgroundColor};
    color: ${(props) => props.theme.buttonTextColor};
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    margin: 10px;

    &:hover {
        background-color: #5e63f7;
    }

    &:disabled {
        background-color: #ccc;
    }
`;

const ModalText = styled.div`
    color: ${(props) => props.theme.color};
    padding: 20px;
    font-size: 1.1rem;
    line-height: 1.5;
`;

const Section = styled.div`
    max-width: 900px;
    margin-bottom: 50px;
`;

const ProjectLink = styled.button`
    background-color: ${(props) => props.theme.buttonBackgroundColor};
    color: ${(props) => props.theme.buttonTextColor};
    border: none;
    padding: 12px 24px;
    margin: 15px;
    cursor: pointer;
    border-radius: 30px;
    font-size: 1rem;
    font-weight: 500;
    transition: background-color 0.3s, transform 0.3s;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: #5e63f7;
        transform: translateY(-3px);
    }
`;

const Footer = styled.footer`
    margin-top: auto;
    padding: 20px 0;
    font-size: 1rem;
    color: ${(props) => props.theme.buttonBackgroundColor};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// Main App Component
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
            description: 'Made substantial contributions to back-end infrastructure, enhancing data retrieval efficiency by 30%.',
        },
        {
            title: 'Hardware & Software Analyst Intern',
            company: 'Ryerson University, Toronto, ON',
            dates: 'Sept 2022 - April 2023',
            description: 'Developed an internal database, reducing data entry errors by 15%.',
        },
        {
            title: 'Data Clerk Intern',
            company: 'Learning Enrichment Foundation, Toronto, ON',
            dates: 'June - Sept 2022',
            description: 'Streamlined data processing, reducing time by 20%.',
        },
    ];

    const projects = [
        {
            title: 'Meme Royale',
            description: 'A backend software used to help run and manage an online tournament, which improved moderation efficiency by 25%.',
            link: 'https://github.com/blitzwolfz/MemeRoyale',
            techStack: ['TypeScript', 'JavaScript', 'MongoDB', 'JSON'],
        },
        {
            title: 'Red Language',
            description: 'A toy interpreter designed to teach the concepts behind interpreters and programming languages.',
            link: 'https://github.com/blitzwolfz/Red',
            techStack: ['Java'],
        },
        {
            title: 'Ball Motion',
            description: 'Smartphone app using OpenCV to detect a ball in flight and predict its path for sports analytics.',
            link: 'https://github.com/JanninTeam',
            techStack: ['Java'],
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
                Welcome to my portfolio! <br/>
                I'm a computer science student at George Brown College. <br/>
                Check out my resume or explore the projects and job experience I've worked on.
            </Subheader>

            <Section>
                <h3>Cool places I've worked at</h3>
                <TimelineContainer>
                    {workExperience.map((job, index) => (
                        <TimelineItem key={index} onClick={() => openJobModal(index)}>
                            <h4>{job.title} ({job.company})</h4>
                            <p>{job.dates}</p>
                        </TimelineItem>
                    ))}
                </TimelineContainer>
            </Section>

            <Section>
                <h3>Things I've made</h3>
                {projects.map((project, index) => (
                    <ProjectLink key={index} onClick={() => openProjectModal(index)}>
                        {project.title}
                    </ProjectLink>
                ))}
            </Section>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedJob !== null && (
                    <ModalText>
                        <h3>{workExperience[selectedJob].title}</h3>
                        <p>{workExperience[selectedJob].dates}</p>
                        <p>{workExperience[selectedJob].description}</p>
                        <ModalNavButton onClick={handlePrevModalJob} disabled={selectedJob === 0}>
                            Previous Job
                        </ModalNavButton>
                        <ModalNavButton onClick={handleNextModalJob} disabled={selectedJob === workExperience.length - 1}>
                            Next Job
                        </ModalNavButton>
                    </ModalText>
                )}
                {selectedProject !== null && (
                    <ModalText>
                        <h3>{projects[selectedProject].title}</h3>
                        <p>{projects[selectedProject].description}</p>
                        <p><strong>Tech Stack:</strong> {projects[selectedProject].techStack.join(', ')}</p>
                        <a href={projects[selectedProject].link} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                        <ModalNavButton onClick={handlePrevModalProject} disabled={selectedProject === 0}>
                            Previous Project
                        </ModalNavButton>
                        <ModalNavButton onClick={handleNextModalProject} disabled={selectedProject === projects.length - 1}>
                            Next Project
                        </ModalNavButton>
                    </ModalText>
                )}
            </Modal>

            <Footer>Made with love ❤️ <Signature/></Footer>
        </PortfolioContainer>
    );
};

export default App;
