import styled, { keyframes } from 'styled-components';

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
export const PortfolioContainer = styled.div`
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

export const Header = styled.h1`
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 10px;
`;

export const Subheader = styled.h2`
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 20px;
    max-width: 800px;
`;

export const TimelineContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 900px;
    margin-bottom: 50px;
    position: relative;
    overflow: visible;
    padding: 0 30px;

    @media (max-width: 768px) {
        padding: 0 15px;
    }
`;

export const TimelineItem = styled.div`
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

    @media (max-width: 768px) {
        max-width: 100%;
        padding: 15px;
        margin: 10px 0;
    }
`;

export const ModalNavButton = styled.button`
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

export const ModalText = styled.div`
    color: ${(props) => props.theme.color};
    padding: 20px;
    font-size: 1.1rem;
    line-height: 1.5;

    a {
        color: ${(props) => props.theme.color};
        text-decoration: underline;

        &:visited {
            color: ${(props) => props.theme.color};
        }

        &:hover {
            text-shadow: 0 0 5px currentColor;
        }
    }
`;

interface ScrollButtonProps {
    direction: 'left' | 'right';
}

export const ScrollButton = styled.button<ScrollButtonProps>`
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

const sectionalRGBWave = keyframes`
    0% { color: red; }
    20% { color: orange; }
    40% { color: yellow; }
    60% { color: green; }
    80% { color: blue; }
    100% { color: violet; }
`;

export const HighlightText = styled.span`
    display: inline-block;
    cursor: pointer;
    font-weight: bold;
    animation: ${sectionalRGBWave} 4s linear infinite;

    span {
        display: inline-block;
        animation: ${sectionalRGBWave} 4s linear infinite;
        animation-delay: calc(0.15s * var(--char-index));
    }

    &:hover {
        text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
        stroke: currentColor;
    }
`;

export const Section = styled.div`
    max-width: 900px;
    margin-bottom: 50px;
`;

export const ProjectLink = styled.button`
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

export const PullStringContainer = styled.div`
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

export const PullString = styled.div`
    font-size: 1.5rem;
    line-height: 1.2;
    white-space: pre;
`;

export const Footer = styled.footer`
    margin-top: auto;
    padding: 20px 0;
    font-size: 1rem;
    color: ${(props) => props.theme.buttonBackgroundColor};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ResumeButton = styled.a`
    cursor: pointer;
    color: ${(props) => props.theme.color};
    
    @media (max-width: 768px) {
        max-width: 100%;
        padding: 15px;
        margin: 10px;
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
    props.theme.backgroundColor === 'rgb(254, 243, 199)'
        ? 'rgba(0, 0, 0, 0.6)'
        : 'rgba(255, 255, 255, 0.6)'};
    transition: transform 0.3s, box-shadow 0.3s;
    animation: ${glowingBorderSpin} 2s linear infinite;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 0 20px ${(props) =>
    props.theme.backgroundColor === 'rgb(254, 243, 199)'
        ? 'rgba(0, 0, 0, 0.8)'
        : 'rgba(255, 255, 255, 0.8)'};
    }
`;

// Keyframes for Rainbow Glow
const rainbowGlow = keyframes`
    0% { box-shadow: 0 0 10px red; }
    20% { box-shadow: 0 0 10px orange; }
    40% { box-shadow: 0 0 10px yellow; }
    60% { box-shadow: 0 0 10px green; }
    80% { box-shadow: 0 0 10px blue; }
    100% { box-shadow: 0 0 10px violet; }
`;

// Keyframes for Golden Glow
const goldenGlow = keyframes`
    0% { box-shadow: 0 0 10px rgb(255, 215, 0); }
    50% { box-shadow: 0 0 20px rgb(255, 215, 0); }
    100% { box-shadow: 0 0 10px rgb(255, 215, 0); }
`;

// Styled component for StarProjectLink with fillover and updated golden glow
export const StarProjectLink = styled.button<{ glowType: 'rainbow' | 'golden' }>`
    background-color: ${(props) => props.theme.buttonBackgroundColor};
    color: ${(props) => props.theme.buttonTextColor};
    border: none;
    padding: 15px 30px;
    margin: 20px;
    cursor: pointer;
    border-radius: 30px;
    font-size: 1.25rem;
    font-weight: 500;
    text-decoration: none;
    box-shadow: 0 0 10px ${(props) =>
            props.theme.backgroundColor === 'rgb(254, 243, 199)' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)'};
    animation: ${(props) => (props.glowType === 'rainbow' ? rainbowGlow : goldenGlow)} 2s linear infinite;
    transition: transform 0.3s, background-color 0.3s, box-shadow 0.3s;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 0 20px ${(props) =>
                props.theme.backgroundColor === 'rgb(254, 243, 199)' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
        background: linear-gradient(90deg, ${(props) => props.theme.buttonBackgroundColor}, #5e63f7); /* Fillover effect */
    }
`;

export const renderWaveText = (text: string) => {
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
