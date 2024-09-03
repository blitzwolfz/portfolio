import React, { useState } from 'react';
import styled from 'styled-components';

interface SlideProps {
    isActive: boolean;
}

const SlideshowContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Slide = styled.div<SlideProps>`
    display: ${(props) => (props.isActive ? 'block' : 'none')};
    width: 100%;
    text-align: center;
`;

const SlideContent = styled.div`
    margin: 20px 0;
`;

const Navigation = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: center;
    }
`;

const NavButton = styled.button`
    background-color: #0073e6;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;

    &:disabled {
        background-color: #ccc;
    }

    @media (max-width: 480px) {
        width: 100%;
        margin-bottom: 10px;
    }
`;

interface ProjectSlide {
    title: string;
    description: string;
    link: string;
    techStack: string[];
}

interface SlideshowProps {
    slides: ProjectSlide[];
}

const Slideshow: React.FC<SlideshowProps> = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <SlideshowContainer>
            {slides.map((slide, index) => (
                <Slide key={index} isActive={index === currentSlide}>
                    <h2>{slide.title}</h2>
                    <SlideContent>
                        <p>{slide.description}</p>
                        <p><strong>Tech Stack:</strong> {slide.techStack.join(', ')}</p>
                        <a href={slide.link} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                    </SlideContent>
                </Slide>
            ))}
            <Navigation>
                <NavButton onClick={prevSlide}>
                    Previous
                </NavButton>
                <NavButton onClick={nextSlide}>
                    Next
                </NavButton>
            </Navigation>
        </SlideshowContainer>
    );
};

export default Slideshow;
