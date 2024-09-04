import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframe animation for the signature drawing
const draw = keyframes`
    0% {
        stroke-dasharray: 0 1000;
    }
    100% {
        stroke-dasharray: 1000 0;
    }
`;

// Styled SVG component with animation
const SignatureSvg = styled.svg<{ animate: boolean }>`
    width: 184px;
    height: 94px;
    fill: none;
    stroke: #000;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-dasharray: 1000;
    animation: ${(props) => (props.animate ? draw : 'none')} 4.45s linear forwards;
`;

const Signature = () => {
    const [isVisible, setIsVisible] = useState(false); // To track if the signature is visible
    const signatureRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // If the signature is in the viewport, start the animation
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the signature is visible
        );

        if (signatureRef.current) {
            observer.observe(signatureRef.current);
        }

        return () => {
            if (signatureRef.current) {
                observer.unobserve(signatureRef.current);
            }
        };
    }, []);

    return (
        <SignatureSvg
            ref={signatureRef}
            viewBox="0 0 184 94"
            animate={isVisible} // Only animate when visible
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M85 6.72501C85 -4.12031 67.9671 6.64336 63.6142 9.97004C50.1802 20.2368 28.5994 38.5378 53.7719 48.3842C61.7694 51.5125 73.6958 54.3993 75.2792 61.9782C76.8963 69.7188 65.721 77.588 56.6881 80.1767C49.4366 82.2549 42.0027 80.4301 41.1348 74.3444C39.6783 64.132 50.3228 56.3035 58.7538 49.3489" />
            <path d="M87.5529 54.3723C91.0631 51.1916 85.5561 46.2638 82.0106 50.8902C78.6279 55.3043 76.7611 63.2895 78.9316 68.122C82.4561 75.9696 88.7248 65.5753 89.6467 62.8543C90.1864 61.2613 89.9412 53.609 91.371 56.3365C92.8719 59.1999 96.9192 65.4049 100.855 66.872C106.676 69.0425 104.835 55.1036 104.241 53.167C103.654 51.2514 106.821 52.4772 107.259 53.7473C108.253 56.6297 108.924 60.1589 108.552 63.1221C108.121 66.5569 106.269 64.2244 106.643 61.8721C106.848 60.5859 109.439 49.7703 113.048 51.6938C116.359 53.459 116.041 57.3717 117.974 59.774C118.067 59.8899 121.093 54.2764 121.915 53.2116C127.238 46.3213 129.757 57.8622 133 60.8007" />
            <path d="M145.677 31.449C145.677 30.7204 146.517 24.4668 144.032 26.8194C142.722 28.0594 142.317 29.2011 142.143 30.7567C141.19 39.2667 142.721 49.5255 147.749 57.3223C150.483 61.5621 157.152 66.0408 161.458 60.2211C167.028 52.6927 168.036 42.4885 166.088 34.2613C165.003 29.6736 161.553 19.4097 152.257 20.0266C146.784 20.3898 141.871 24.3328 138 26.7762" />
            <path d="M150.893 44.9405C158.084 49.4833 170.746 50.9598 179.847 51.8581C184.865 52.3535 179.795 52.0166 177.876 52.0333C159.889 52.1892 141.812 55.0671 124.464 58.1629C82.4105 65.6678 42.7945 77.0153 4.64349 91.4378C3.03789 92.0448 0.491939 92.56 3.16498 90.7373C7.88961 87.5156 13.8868 84.9484 19.3054 82.4185C55.0574 65.7264 94.4609 53.7487 133.151 41" />
        </SignatureSvg>
    );
};

export default Signature;
