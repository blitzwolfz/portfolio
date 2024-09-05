import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Terminal from './Terminal';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Cookies from 'js-cookie'; // Add js-cookie for cookie management

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: 'Arial', sans-serif;
        background-color: ${(props) => props.theme.backgroundColor};
        color: ${(props) => props.theme.color};
        transition: background-color 0.3s ease;
    }
`;

const lightTheme = {
    backgroundColor: 'rgb(254, 243, 199)',
    color: '#333',
    buttonBackgroundColor: 'rgb(140, 149, 244)', // Lavender color for light mode
    buttonTextColor: '#fff',
};

const darkTheme = {
    backgroundColor: 'rgb(30, 41, 59)',
    color: 'rgb(226, 232, 240)',
    buttonBackgroundColor: 'rgb(111, 122, 213)', // Updated lavender color for dark mode
    buttonTextColor: '#fff',
};

const Root: React.FC = () => {
    const [view, setView] = useState<'portfolio' | 'terminal'>('portfolio');
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = Cookies.get('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        Cookies.set('theme', newMode ? 'dark' : 'light', { expires: 365 }); // Save to cookie
    };

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <GlobalStyle />
            {view === 'portfolio' ? (
                <App setView={setView} toggleTheme={toggleTheme} />
            ) : (
                <Terminal setView={setView} />
            )}
        </ThemeProvider>
    );
};

ReactDOM.render(<Root />, document.getElementById('root'));
