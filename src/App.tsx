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

// Styled for the timeline with dynamic sizing and spinning glowing effect around the box only
const TimelineContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 900px;
    margin-bottom: 50px;
    position: relative;
    overflow: visible; /* Allow overflow for the glow effect */
    padding: 0 30px; /* Extra padding to prevent cutoffs */

    @media (max-width: 768px) {
        padding: 0 15px;
    }
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
    margin: 20px 0; /* Space between items to avoid cutoff at the top/bottom */

    &:hover {
        animation: ${glowingBorderSpin} 1.5s linear infinite;
        box-shadow: ${(props) =>
                props.theme.backgroundColor === '#000'
                        ? '0px 0px 20px 5px gold, 0px 0px 20px 5px inset gold' // Golden glow in dark mode
                        : '0px 0px 20px 5px lightblue, 0px 0px 20px 5px inset lightblue'}; // Light blue glow in light mode
    }

    h4 {
        margin-bottom: 10px;
        font-size: 1.25rem;
    }

    p {
        margin-bottom: 5px;
        color: ${(props) => props.theme.color}; // Ensuring text is readable in both modes
    }

    @media (max-width: 768px) {
        max-width: 100%; /* Ensures the box takes full width on mobile */
        padding: 15px;
        margin: 10px 0; /* Adjust margins for mobile */
    }
`;

// Styled for navigation buttons in job modals
const ModalNavButton = styled.button`
    background-color: ${(props) => props.theme.buttonBackgroundColor};
    color: ${(props) => props.theme.buttonTextColor};
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
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

    /* Styles for the links */
    a {
        color: ${(props) => props.theme.color}; /* Use a visible color for unvisited links */
        text-decoration: underline;

        &:visited {
            color: ${(props) => props.theme.color}; /* Ensure visited links remain visible */
        }

        &:hover {
            text-shadow: 0 0 5px currentColor; /* Optional hover effect */
        }
    }
`;

// Define the direction prop
interface ScrollButtonProps {
    direction: 'left' | 'right'; // Restrict to 'left' or 'right'
}

const ScrollButton = styled.button<ScrollButtonProps>`
    position: absolute;
    top: 50%;
    ${(props) => (props.direction === 'left' ? 'left: 10px;' : 'right: 10px;')}
    transform: translateY(-50%);
    background-color: ${(props) => props.theme.buttonBackgroundColor};
    color: ${(props) => props.theme.buttonTextColor};
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 50%;
    transition: transform 0.3s;

    &:hover {
        transform: translateY(-50%) scale(1.1);
    }
`;

// Animated wave for text
const sectionalRGBWave = keyframes`
    0% { color: red; }
    20% { color: orange; }
    40% { color: yellow; }
    60% { color: green; }
    80% { color: blue; }
    100% { color: violet; }
`;

const HighlightText = styled.span`
    display: inline-block;
    cursor: pointer;
    font-weight: bold;
    animation: ${sectionalRGBWave} 4s linear infinite;

    span {
        display: inline-block;
        animation: ${sectionalRGBWave} 4s linear infinite;
        // @ts-ignore
        animation-delay: calc(0.15s * var(--char-index));
    }

    &:hover {
        text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
        stroke: currentColor;
    }
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

const PullStringContainer = styled.div`
    position: fixed;
    top: 0;
    right: 20px;
    cursor: pointer;
    text-align: center;
    z-index: 1000;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: translateY(10px);
    }

    &:active {
        transform: translateY(30px);
    }
`;

const PullString = styled.div`
    font-size: 1.5rem;
    line-height: 1.2;
    white-space: pre;
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

// Styled for glowing buttons with dark glow in light mode and light glow in dark mode
const ResumeButton = styled.a`

    cursor: pointer;
    color: ${(props) => props.theme.color};
    

    @media (max-width: 768px) {
        max-width: 100%; /* Ensures the box takes full width on mobile */
        padding: 15px;
        margin: 10px; /* Adjust margins for mobile */
    }
    
    display: inline-block;
    background-color: ${(props) => props.theme.buttonBackgroundColor};
    padding: 15px 30px;
    margin: 15px;
    cursor: pointer;
    border-radius: 30px;
    font-size: 1.25rem;
    font-weight: 500;
    text-decoration: none;
    box-shadow: 0 0 10px ${(props) =>
            props.theme.backgroundColor === 'rgb(254, 243, 199)' // Light mode background
                    ? 'rgba(0, 0, 0, 0.6)'  // Dark glow in light mode
                    : 'rgba(255, 255, 255, 0.6)'};  // Light glow in dark mode
    transition: transform 0.3s, box-shadow 0.3s;
    animation: ${glowingBorderSpin} 2s linear infinite;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 0 20px ${(props) =>
                props.theme.backgroundColor === 'rgb(254, 243, 199)' // Light mode background
                        ? 'rgba(0, 0, 0, 0.8)'  // Stronger dark glow in light mode
                        : 'rgba(255, 255, 255, 0.8)'};  // Stronger light glow in dark mode
    }
`;

const renderWaveText = (text: string) => {
    return text.split('').map((char, index) => (
        <span
            key={index}
            style={{
                '--char-index': index,
                whiteSpace: char === ' ' ? 'pre' : 'normal',
            } as React.CSSProperties}
        >
      {char}
    </span>
    ));
};

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

            {/* Add Cool places I've worked at */}
            <h3>Cool places I've worked at</h3>

            {/* Timeline Experience Section with Scroll Buttons */}
            <TimelineContainer>
                {workExperience.slice(scrollIndex, scrollIndex + 3).map((job, index) => (
                    <TimelineItem key={index} onClick={() => openJobModal(index)}>
                        <h4>{job.title} ({job.company})</h4>
                        <p>{job.dates}</p>
                    </TimelineItem>
                ))}
                {/*@ts-ignore*/}
                {scrollIndex > 0 && <ScrollButton direction="left" onClick={handlePrevJob}>❮</ScrollButton>}
                {/*@ts-ignore*/}
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
                Made with love ❤️
                <Signature/>
            </Footer>
        </PortfolioContainer>
    );
};

export default App;
