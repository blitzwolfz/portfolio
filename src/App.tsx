import React, { useState } from 'react';
import Modal from './components/Modal';
import Signature from './components/Signature';
import resumePDF from './assets/Sammy_Qureshi.pdf';

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
    renderWaveText,
    StarProjectLink, ContactMeButton, // Import the StarProjectLink styled component for glowing effect
} from './components/Portfolio.tsx';
import { projects, workExperience } from "./constants.ts";

const App: React.FC<{ setView: React.Dispatch<React.SetStateAction<'portfolio' | 'terminal'>>, toggleTheme: () => void }> = ({ setView, toggleTheme }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [scrollIndex, setScrollIndex] = useState(0);
    const [startupText, setStartupText] = useState("building a unicorn startup.🦄");
    const [isPdfVisible, setIsPdfVisible] = useState(false);
    const [isPdfAnimating, setIsPdfAnimating] = useState(false);

    const [isContactVisible, setIsContactVisible] = useState(false);

    const toggleContactVisibility = () => {
        setIsContactVisible(!isContactVisible);
    };

    const startupPhrases = [
        "building a unicorn startup.🦄",
        "launching the next big thing.🚀",
        "changing the world, one app at a time.🌍",
        "creating the future of tech.💡",
        "building something legendary.🏆",
    ];

    const changeStartupText = () => {
        let newText = startupText;
        while (newText === startupText) {
            newText = startupPhrases[Math.floor(Math.random() * startupPhrases.length)];
        }
        setStartupText(newText);
    };

    const handleViewResume = () => {
        setIsPdfAnimating(true); // Start the animation
        setTimeout(() => {
            setIsPdfVisible(!isPdfVisible);
            setIsPdfAnimating(false); // End the animation after the transition
        }, 500); // 500ms corresponds to the animation duration
    };

    // Sort projects so that starred projects are displayed on top
    const sortedProjects = projects.sort((a, b) => (a.starred === b.starred ? 0 : a.starred ? -1 : 1));

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
            {/* CSS Styles for the PDF animation */}
            <style>
                {`
                .pdf-container {
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                    height: 0;
                    transition: height 500ms ease-in-out;
                }
                .pdf-container.open {
                    height: 100vh; /* Full height for larger screens */
                }
                .pdf-container iframe {
                    width: 100%; /* Make the iframe fill the entire width */
                    height: 100%;
                    border: none;
                }
                /* Ensure the iframe is responsive on smaller devices */
                @media (max-width: 768px) {
                    .pdf-container.open {
                        height: 70vh; /* Slightly smaller for mobile */
                    }
                }
                `}
            </style>

            <Header>i’m Sammy!</Header>
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
                watching youtube, and <em><u onClick={changeStartupText}>{startupText}</u></em>
            </Subheader>

            <Subheader>
                <ContactMeButton onClick={toggleContactVisibility}>{isContactVisible ? 'Hide Contact Info' : 'Show Contact Info'}</ContactMeButton>
                {isContactVisible && (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <p>Name: Samin Qureshi</p>
                        <p>Email: <a className={"email"} href="mailto:sam.qureshi@example.com">sam.qureshi@example.com</a></p>
                        <ContactMeButton as="a" href="mailto:sam.qureshi@example.com">Email Me</ContactMeButton>
                    </div>
                )}
            </Subheader>

            <Section>
                <h3>My Resume (No subscription required 😁)</h3>
                <ResumeButton onClick={handleViewResume}>👀 {isPdfVisible ? 'Close' : 'View'}</ResumeButton>
                <ResumeButton href={resumePDF} download="Sammy_Qureshi.pdf">⬇️ Download</ResumeButton>
                {isPdfVisible && (
                    <ResumeButton as="a" href={resumePDF} target="_blank" rel="noopener noreferrer">
                        🌐 Open in New Tab
                    </ResumeButton>
                )}
                <div className={`pdf-container ${isPdfVisible && !isPdfAnimating ? 'open' : ''}`}>
                    {isPdfVisible && (
                        <iframe src={resumePDF} title="Sammy_Qureshi_Resume" />
                    )}
                </div>
            </Section>

            <h3>Cool places I've worked at</h3>

            <TimelineContainer>
                {workExperience.slice(scrollIndex, scrollIndex + 3).map((job, index) => (
                    <TimelineItem key={index} onClick={() => openJobModal(index)}>
                        <h4>{job.title} ({job.company})</h4>
                        <p>{job.dates}</p>
                    </TimelineItem>
                ))}
                {scrollIndex > 0 && <ScrollButton direction="left" onClick={() => setScrollIndex(scrollIndex - 1)}>❮</ScrollButton>}
                {scrollIndex < workExperience.length - 3 && <ScrollButton direction="right" onClick={() => setScrollIndex(scrollIndex + 1)}>❯</ScrollButton>}
            </TimelineContainer>

            <Section>
                <h3>Things I've made</h3>
                {sortedProjects.map((project, index) =>
                    project.starred ? (
                        <StarProjectLink key={index} glowType={project.glowType as 'rainbow' | 'golden'} onClick={() => openProjectModal(index)}>
                            {project.title}
                        </StarProjectLink>
                    ) : (
                        <ProjectLink key={index} onClick={() => openProjectModal(index)}>
                            {project.title}
                        </ProjectLink>
                    )
                )}
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
                        {projects[selectedProject].link && (
                            <a href={projects[selectedProject].link} target="_blank" rel="noopener noreferrer">
                                View Project
                            </a>
                        )}
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
