import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ArtContainerProps {
    fontSize: number;
}

const ArtContainer = styled.div<ArtContainerProps>`
    color: #808080; /* Faded purple color */
    white-space: pre; /* Preserve whitespace for ASCII art */
    font-family: 'Courier New', Courier, monospace;
    text-align: left; /* Keep the ASCII art left-aligned */
    font-size: ${({ fontSize }) => fontSize}px;

    @media (max-width: 768px) {
        font-size: ${({ fontSize }) => fontSize * 0.8}px; /* Scale down for tablets */
    }

    @media (max-width: 480px) {
        font-size: ${({ fontSize }) => fontSize * 0.6}px; /* Scale down further for mobile devices */
    }
`;

const AsciiArt: React.FC = () => {
    const [fontSize, setFontSize] = useState<number>(16); // Default font size

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;

            if (screenWidth > 768) {
                setFontSize(16); // Default font size for large screens
            } else if (screenWidth > 480) {
                setFontSize(14); // Slightly smaller for tablets
            } else {
                setFontSize(12); // Smallest font size for mobile devices
            }
        };

        // Set initial font size
        handleResize();

        // Add event listener to handle resizing
        window.addEventListener('resize', handleResize);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const currentYear = new Date().getFullYear(); // Fetch the current year dynamically

    return (
        <ArtContainer fontSize={fontSize}>
            <pre>
        {`    ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
   _____                              ____                                   __      _ 
  / ___/  ____ _   ____ ___          / __ \\  __  __   _____  ___    _____   / /_    (_)
  \\__ \\  / __ /  / __ __ \\        / / / / / / / /  / ___/ / _ \\  / ___/  / __ \\  / / 
 ___/ / / /_/ /  / / / / / /       / /_/ / / /_/ /  / /    /  __/ (__  )  / / / / / /  
/____/  \\__,_/  /_/ /_/ /_/        \\___\\_\\ \\__,_/  /_/     \\___/ /____/  /_/ /_/ /_/   
    ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★                                                                                        
            `}
            </pre>
            <p>Currently Studying @ George Brown College © Sam Qureshi 2024 - {currentYear}</p>
        </ArtContainer>
    );
};

export default AsciiArt;
