// src/components/SubLabel.tsx
import React from 'react';
import styled, {css} from 'styled-components';

// Props 타입 정의
interface SubLabelProps {
    text: string;
    icon: React.ReactNode; // 아이콘 컴포넌트 (SVG)
    isHovered: boolean;
}

// Styled Components 정의
const LabelContainer = styled.div<{ isHovered: boolean }>`
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

    ${(props) =>
        props.isHovered &&
        css`
            background: rgba(74, 74, 74, 0.30); /* 호버 시 배경색 변경 */
            transform: scale(1.05); /* 호버 시 살짝 확대 */
        `}
`;

const IconContainer = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    flex-shrink: 0;
`;

const TextContainer = styled.span<{ isHovered: boolean }>`
    
    font-family: 'Pretendard', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.64px;
    text-transform: capitalize;
`;

// SubLabel 컴포넌트
const SubLabel: React.FC<SubLabelProps> = ({ text, icon, isHovered }) => {
    return (
        <LabelContainer isHovered={isHovered}>
            <IconContainer>{icon}</IconContainer>
            <TextContainer isHovered={isHovered}>{text}</TextContainer>
        </LabelContainer>
    );
};

export default SubLabel;
