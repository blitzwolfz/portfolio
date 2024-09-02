// src/components/Whois.tsx
import React from 'react';
import styled from 'styled-components';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';

const WhoisContainer = styled.div`
    color: #66d9ef; /* Faded teal color */
`;

const Whois: React.FC = () => {
    return (
        <WhoisContainer>
            <h2><strong>Sam Qureshi</strong></h2>
            <Contact/>
            <p>
                <h3><strong>Education</strong></h3>
                <strong>Computer Programming & Analysis Advanced Diploma</strong><br/>
                cGPA: 3.82<br/>
                George Brown College - Jan 2024 - Present
            </p>

            {/* Include Experience Section */}
            <Experience/>

            {/* Include Projects Section */}
            <Projects/>

            {/* Include Contact Section */}
        </WhoisContainer>
    );
};

export default Whois;
