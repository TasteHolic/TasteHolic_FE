import React from "react";
import styled from "styled-components";

const CategoryButton = styled.button`
  width: 328px;
  height: 180px;
  top: 20px;
  left: 20px;
  gap: 0px;
  border-radius: 16px;
  opacity: 1;
  background: linear-gradient(
    106.32deg,
    rgba(18, 18, 18, 0.14) 0%,
    rgba(255, 255, 255, 0.14) 99.37%
  );
  border: 0.6px solid transparent;
  border-image-source: linear-gradient(
    134.5deg,
    rgba(255, 255, 255, 0.32) 34.52%,
    rgba(255, 255, 255, 0) 79.98%,
    rgba(255, 255, 255, 0.4) 97.92%
  );
  box-shadow: 0px 1.49px 14.92px 1.12px rgba(255, 255, 255, 0.28); /* 그림자 값 반영 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  position: relative;
  overflow: hidden;
`;
const Icon = styled.img`
  width: 60px;
  height: 60px;
  border-radius:50%;
  border:1px solid rgba(255,255,255,0.5);
  background-color:#2a2a2a;
  box-shadow: 0 0 12px rgba(255,255,255,0.3)
margin-bottom:10px;
position:absolute;
backdrop-filter: blur(50px);
top:24px;
gap:0px
opacity: 1;`;
const Title = styled.h3`
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 23.87px;
  color: #ffffff;
  letter-spacing: -0.04em;
  margin: 0px;
  text-align: center;
  width: 51px;
  height: 24px;
  position: absolute;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  top: 112px;
`;
const Description = styled.p`
  font-size: 12px;
  font-family: pretendard;
  font-weight: 400;
  line-height: 14.32px;
  letter-spacing: -0.04em;
  color: #9e9e9e;
  text-align: center;
  margin: 0;
  position: absolute;
  top: 141px;
`;
interface CategoryCardProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  description,
  onClick,
}) => {
  return (
    <CategoryButton onClick={onClick}>
      <Icon src={icon} alt="Icon" />
      <Title>{title}</Title>
      <Description>{description}</Description>
    </CategoryButton>
  );
};
export default CategoryCard;
