// src/components/SubLabel.tsx
import React from 'react';
import styled from 'styled-components';

// Props 타입 정의
interface SubLabelProps {
    text: string;
    icon: React.ReactNode; // 아이콘 컴포넌트 (SVG)
}

// Styled Components 정의
const LabelContainer = styled.div`
    display: inline-flex;
    padding: 10px 16px;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.40);
    background: #555;
    backdrop-filter: blur(25px);

    transition: background 0.3s ease;

    &:hover {
        background: rgba(74, 74, 74, 0.30);
    }
`;

const IconContainer = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    flex-shrink: 0;
`;

const TextContainer = styled.span`
    color: #FFF;
    font-family: 'Pretendard', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.64px;
    text-transform: capitalize;
`;

// SubLabel 컴포넌트
const SubLabel: React.FC<SubLabelProps> = ({ text, icon }) => {
    return (
        <LabelContainer>
            <IconContainer>{icon}</IconContainer>
            <TextContainer>{text}</TextContainer>
        </LabelContainer>
    );
};

export default SubLabel;
