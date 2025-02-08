import React from "react";
import styled from "styled-components";

const CategoryButton = styled.button`
  width: 328px;
  height: 180px;
  gap: 0px;
  border-radius: 16px;
  padding: 24px 0px 25px 0px;
  opacity: 1;
  background: linear-gradient(
    106.32deg,
    rgba(18, 18, 18, 0.14) 0%,
    rgba(255, 255, 255, 0.14) 99.37%
  );
  border: 0.597px solid rgba(255, 255, 255, 0.4);
  border-image-source: linear-gradient(
    134.5deg,
    rgba(255, 255, 255, 0.32) 34.52%,
    rgba(255, 255, 255, 0) 79.98%,
    rgba(255, 255, 255, 0.4) 97.92%
  );
  box-shadow: 0px 1.49px 14.92px 1.12px rgba(255, 255, 255, 0.28);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

/* 아이콘 원 컨테이너 (60x60) */
const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-color: #2a2a2a;
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.3);
  position: absolute;
  top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(50px);
  opacity: 1;
`;

/* 실제 아이콘 이미지 (42x42) */
const IconImage = styled.img`
  width: 42px;
  height: 42px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 23.87px;
  color: #ffffff;
  letter-spacing: -0.8px;
  margin: 0px;
  text-transform: capitalize;
  text-align: center;
  height: 24px;
  position: absolute;
  top: 112px;
`;

const Description = styled.p`
  font-size: 12px;
  font-family: Pretendard;
  font-weight: 400;
  line-height: 14.32px;
  letter-spacing: -0.48px;
  color: #9e9e9e;
  text-align: center;
  text-transform: capitalize;
  margin: 0;
  position: absolute;
  top: 141px;
`;

interface CategoryCardProps {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  description,
  onClick,
}) => {
  return (
    <CategoryButton onClick={onClick}>
      <IconContainer>
        <IconImage src={icon} alt="Icon" />
      </IconContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </CategoryButton>
  );
};

export default CategoryCard;
