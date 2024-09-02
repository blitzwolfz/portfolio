import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Whois from './components/Whois';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AsciiArt from './components/AsciiArt';
import Man from './components/Man';
import Weather from './components/Weather';

const TerminalContainer = styled.div`
    background-color: #1c1c1c;
    color: #d0d0d0;
    padding: 20px;
    font-family: 'Courier New', Courier, monospace;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 10px;
        font-size: 14px;
    }

    @media (max-width: 480px) {
        padding: 8px;
        font-size: 12px;
    }
`;

const ContentContainer = styled.div`
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    box-sizing: border-box;
`;

const PromptLine = styled.div`
    display: flex;
    align-items: center;
`;

const PromptText = styled.span<{ color?: string }>`
    color: ${(props) => props.color || '#d0d0d0'};
`;

const CommandInput = styled.input`
    background: none;
    border: none;
    color: #d0d0d0;
    font-family: inherit;
    font-size: inherit;
    width: 100%;
    outline: none;

    @media (max-width: 768px) {
        font-size: 14px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
    }
`;

const App: React.FC = () => {
    const [command, setCommand] = useState('');
    const [output, setOutput] = useState<JSX.Element[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const defaultOutput = [
            <PromptText key={0}>Welcome to Sam Qureshi's Portfolio!</PromptText>,
            <PromptText key={1} color="#d0d0d0">Type "help" to see the list of available commands.</PromptText>,
            <br key={2} />,
        ];
        setOutput(defaultOutput);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [output]);

    const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            processCommand(command.trim());
            setCommand('');
        }
    };

    const processCommand = (cmd: string) => {
        let response: JSX.Element;

        const [command, ...args] = cmd.split(" ");
        const city = args.join(" ");

        switch (command.toLowerCase()) {
            case 'whois':
                response = <Whois />;
                break;
            case 'experience':
                response = <Experience />;
                break;
            case 'projects':
                response = <Projects />;
                break;
            case 'contact':
                response = <Contact />;
                break;
            case 'man':
                response = <Man />;
                break;
            case 'weather':
                response = <Weather city={city} />;
                break;
            case 'sudo':
                response = <PromptText>You don't have the required permissions to use 'sudo'.</PromptText>;
                break;
            case 'clear':
                setOutput([]);
                return;
            case 'help':
                response = (
                    <PromptText>
                        Available commands:
                        <br />- whois: Display information about Sam Qureshi.
                        <br />- experience: Show work experience.
                        <br />- projects: List projects.
                        <br />- contact: Show contact information.
                        <br />- weather [city]: Display the weather. If no city is provided, uses your current location.
                        <br />- sudo: Attempt to execute with superuser privileges (joke).
                        <br />- man: Display manual for commands.
                        <br />- clear: Clear the terminal.
                        <br />- help: Display this help text.
                    </PromptText>
                );
                break;
            default:
                response = <PromptText>Command not recognized. Type "help" for a list of commands.</PromptText>;
                break;
        }

        setOutput((prevOutput) => [
            ...prevOutput,
            <PromptText key={prevOutput.length}>$ {cmd}</PromptText>,
            response,
            <br key={prevOutput.length + 1} />,
        ]);
    };

    return (
        <TerminalContainer ref={containerRef}>
            <AsciiArt />
            <ContentContainer>
                {output}
                <PromptLine>
                    <PromptText>$ </PromptText>
                    <CommandInput
                        ref={inputRef}
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyDown={handleCommand}
                        autoFocus
                    />
                </PromptLine>
            </ContentContainer>
        </TerminalContainer>
    );
};

export default App;
