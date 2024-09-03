import React from 'react';
import styled, { keyframes } from 'styled-components';
import Modal from './components/Modal';
import Slideshow from './components/Slideshow';
import Signature from './components/Signature';

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
    animation: ${sectionalRGBWave} 4s linear infinite; /* Slower and more blocky animation */

    span {
        display: inline-block;
        animation: ${sectionalRGBWave} 4s linear infinite;
        animation-delay: calc(0.15s * var(--char-index)); /* Increased delay for blocky effect */
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

const ContactLink = styled.a`
    color: ${(props) => props.theme.buttonBackgroundColor};
    font-weight: 500;
    text-decoration: none;
    margin: 0 5px;
    transition: color 0.3s;
    &:hover {
        color: #5e63f7;
        text-decoration: underline;
    }
`;

const PullStringContainer = styled.div`
    position: fixed;
    top: 0;
    right: 20px;
    cursor: pointer;
    text-align: center;
    z-index: 1000;
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

const renderWaveText = (text: string) => {
    return text.split('').map((char, index) => (
        <span
            key={index}
            style={{
                '--char-index': index,
                whiteSpace: char === ' ' ? 'pre' : 'normal', // Preserve spaces
            } as React.CSSProperties}
        >
            {char}
        </span>
    ));
};

const App: React.FC<{ setView: React.Dispatch<React.SetStateAction<'portfolio' | 'terminal'>>, toggleTheme: () => void }> = ({ setView, toggleTheme }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedProject, setSelectedProject] = React.useState<number | null>(null);

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

    const openModal = (index: number) => {
        setSelectedProject(index);
        setIsModalOpen(true);
    };

    return (
        <PortfolioContainer>
            <Header>i’m Sam!</Header>
            <Subheader>
                welcome to my little corner of the internet! <br />
                <HighlightText onClick={() => setView('terminal')}>
                    {renderWaveText('Click me Terminal nerds')}
                    😲
                </HighlightText>
                <br />
                i’m a computer science student at George Brown College. <br />
                Even got a 3.82 cGPA 😎<br />
                i love to hack and break all my projects. <br />
                while i’m not clicking away at my keyboard,<br />
                you can find me jamming to my guitar, <br />
                watching youtube, and <em><u>building a unicorn startup.🦄</u></em>
            </Subheader>
            <Section>
                <h3>Find me somewhere else on the web:</h3>
                <p>
                    <ContactLink href="https://github.com/blitzwolfz" target="_blank" rel="noopener noreferrer">GitHub</ContactLink> |
                    <ContactLink href="https://www.linkedin.com/in/saminqureshi" target="_blank" rel="noopener noreferrer"> LinkedIn</ContactLink> |
                    <ContactLink href="mailto:saminm.qureshi@gmail.com"> Email</ContactLink>
                </p>
                <h3>Things I've made</h3>
                {projects.map((project, index) => (
                    <ProjectLink key={index} onClick={() => openModal(index)}>
                        {project.title}
                    </ProjectLink>
                ))}
            </Section>

            <PullStringContainer onClick={toggleTheme}>
                <PullString>
                    |
                    <br />
                    |
                    <br />
                    |
                    <br />
                    |
                    <br />
                    o
                </PullString>
            </PullStringContainer>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {selectedProject !== null && <Slideshow slides={[projects[selectedProject]]} />}
            </Modal>

            <Footer>
                Made with love ❤️
                <Signature />
            </Footer>
        </PortfolioContainer>
    );
};

export default App;
