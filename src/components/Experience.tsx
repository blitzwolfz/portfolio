// src/components/Experience.tsx
import React from 'react';
import styled from 'styled-components';

const ExperienceContainer = styled.div`
  color: #66d9ef; /* Faded teal color */
`;

const Experience: React.FC = () => {
    return (
        <ExperienceContainer>
            <h3>Internship and Work Experience</h3>
            <p>
                <strong>Software Developer</strong> (Rack-I, Toronto, ON) - Feb - Aug 2023
                <ul>
                    <li>Made substantial contributions to back-end infrastructure, enhancing data retrieval efficiency by 30%.</li>
                    <li>Collaborated with front-end teams, reducing bugs by 20%.</li>
                    <li>Improved deployment time by 25%.</li>
                </ul>
            </p>
            <p>
                <strong>Hardware & Software Analyst Intern</strong> (Ryerson University, Toronto, ON) - Sept 2022 - April 2023
                <ul>
                    <li>Developed an internal database, reducing data entry errors by 15%.</li>
                    <li>Deployed over 50 new devices, ensuring compliance with hardware policies.</li>
                    <li>Overseeing data wiping process for over 100 devices, achieving zero data breaches.</li>
                </ul>
            </p>
            <p>
                <strong>Data Clerk Intern</strong> (Learning Enrichment Foundation, Toronto, ON) - June - Sept 2022
                <ul>
                    <li>Streamlined data processing, reducing time by 20%.</li>
                    <li>Enhanced CRM functionality, improving user satisfaction by 10%.</li>
                    <li>Documented approaches, decreasing project completion time by 15%.</li>
                </ul>
            </p>
        </ExperienceContainer>
    );
};

export default Experience;
