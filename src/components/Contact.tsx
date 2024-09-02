// src/components/Contact.tsx
import React from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  color: #66d9ef; /* Faded teal color */
`;

const Contact: React.FC = () => {
    return (
        <ContactContainer>
            <h3>Contact Information</h3>
            <p>
                <strong>Email:</strong> <a href="mailto:saminm.qureshi@gmail.com">saminm.qureshi@gmail.com</a><br />
                <strong>Phone:</strong> (647) 916-2963<br />
                <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/saminqureshi" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/saminqureshi</a><br />
                <strong>GitHub:</strong> <a href="https://www.github.com/blitzwolfz" target="_blank" rel="noopener noreferrer">https://www.github.com/blitzwolfz</a>
            </p>
        </ContactContainer>
    );
};

export default Contact;
