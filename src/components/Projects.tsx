// src/components/Projects.tsx
import React from 'react';
import styled from 'styled-components';
import { projects } from "../constants.ts";

const ProjectsContainer = styled.div`
  color: #66d9ef; /* Faded teal color */
`;

const Projects: React.FC = () => {
    return (
        // <ProjectsContainer>
        //     <h3>Projects</h3>
        //     <p>
        //         <strong>Meme Royale</strong> - <a href="https://github.com/blitzwolfz/MemeRoyale" target="_blank" rel="noopener noreferrer">GitHub Repository</a><br />
        //         <em>TypeScript, JavaScript, MongoDB, JSON</em><br />
        //         A backend software used to help run and manage an online tournament, improving moderation efficiency by 25%. Includes moderation tools, user tools, and API data fetching.
        //     </p>
        //     <p>
        //         <strong>Red</strong> - <a href="https://github.com/blitzwolfz/Red" target="_blank" rel="noopener noreferrer">GitHub Repository</a><br />
        //         <em>Java</em><br />
        //         A toy interpreter designed to teach the concepts behind the creation of interpreters and programming languages. Successfully compiled over 100 test cases, demonstrating robust support for object-oriented design, inheritance, and polymorphism.
        //     </p>
        // </ProjectsContainer>

        <ProjectsContainer>
            <h3>Projects</h3>
            {projects.map((project, index) => (
                <div key={index}>
                    <h4><strong>{project.title}</strong> | <strong>Tech Stack: </strong>
                        <em>{project.techStack.join(", ")}</em></h4>
                    <p>
                        <p>{project.description}</p>
                    </p>
                </div>
            ))}
        </ProjectsContainer>
    );
};

export default Projects;
