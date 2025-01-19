// src/components/MainLabel.tsx
import React from 'react';
import styled from 'styled-components';

// Props 타입 정의
interface MainLabelProps {
    text: string;
}

// Styled Components (피그마 스타일 반영)
const LabelContainer = styled.div`
    display: inline-flex;
    padding: 10px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.40);
    background: linear-gradient(0deg, rgba(128, 128, 128, 0.30) 0%, rgba(128, 128, 128, 0.30) 100%), 
                rgba(0, 0, 0, 0.70);
    color: #FFF;
    text-align: center;
    font-family: 'Pretendard', sans-serif;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -1.12px;

`;

// MainLabel 컴포넌트
const MainLabel: React.FC<MainLabelProps> = ({ text }) => {
    return <LabelContainer>{text}</LabelContainer>;
};

export default MainLabel;
