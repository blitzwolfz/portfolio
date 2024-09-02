// src/components/Man.tsx
import React from 'react';
import styled from 'styled-components';

const ManContainer = styled.div`
    color: #66d9ef; /* Faded teal color */
`;

const Man: React.FC = () => {
    return (
        <ManContainer>
            <h3>Manual for Terminal Commands</h3>
            <p>
                <strong>whois</strong>: Displays detailed information about Sam Qureshi, including contact info, education, experience, and projects.
            </p>
            <p>
                <strong>experience</strong>: Lists the professional experience of Sam Qureshi.
            </p>
            <p>
                <strong>projects</strong>: Provides a list of projects worked on by Sam Qureshi.
            </p>
            <p>
                <strong>contact</strong>: Shows the contact information.
            </p>
            <p>
                <strong>weather [city]</strong>: Shows the weather information. If no city is provided, it uses your current location.
            </p>
            <p>
                <strong>sudo</strong>: A joke command. Responds with a message saying you don't have permission.
            </p>
            <p>
                <strong>clear</strong>: Clears the terminal output.
            </p>
            <p>
                <strong>help</strong>: Lists all available commands with brief descriptions.
            </p>
        </ManContainer>
    );
};

export default Man;
