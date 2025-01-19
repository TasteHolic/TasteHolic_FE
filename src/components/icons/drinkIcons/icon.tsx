import React from 'react';
import styled from 'styled-components';
//drinkicons
// Props 타입 정의
interface IconProps {
    src: string;
    alt?: string;
    size?: number;
}

// Styled Components
const StyledIcon = styled.img<{ size?: number }>`
    width: ${({ size }) => size || 34}px;
    height: ${({ size }) => size || 34}px;
    flex-shrink: 0;
`;

// 아이콘 컴포넌트 (URL 기반)
const Icon: React.FC<IconProps> = ({ src, alt = 'icon', size }) => {
    return <StyledIcon src={src} alt={alt} size={size} />;
};

export default Icon;
