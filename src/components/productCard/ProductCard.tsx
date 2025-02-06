// src/ProductCard.tsx
import React from "react";
import styled from "styled-components";
import Icon from "../icons/drinkIcons/icon";
import { Icons } from "../icons/drinkIcons/index"; // 아이콘 URL 모음 파일 import

// Props 타입 정의
interface ProductCardProps {
  name: string;
  description: string;
  imageUrl: string;
  iconType: keyof typeof Icons; // 아이콘의 이름을 제한 (Icons 객체의 key만 사용 가능)
}

// Styled-Components 정의
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 242px;
  height: 295px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  opacity: 0.9;
  background: #000;
  box-shadow: 0px 2px 20px 1.5px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 13px;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 188.72px;
  height: 188.72px;
  object-fit: cover;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0 0 16px 16px;
  box-sizing: border-box;
`;

const ProductText = styled.div`
  display: flex;
  width: 132px;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const ProductName = styled.h3`
  color: #f5f6f7;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  margin: 0;
  letter-spacing: -0.64px;
`;

const ProductDescription = styled.p`
  color: #f5f6f7;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  margin: 8px 0 0;
  letter-spacing: -0.48px;
`;

// ProductCard 컴포넌트
const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  imageUrl,
  iconType,
}) => {
  return (
    <Card>
      {/* 이미지 섹션 */}
      <ImageContainer>
        <ProductImage src={imageUrl} alt={name} />
      </ImageContainer>

      {/* 정보 섹션 (아이콘 URL 사용) */}
      <InfoSection>
        <ProductText>
          <ProductName>{name}</ProductName>
          <ProductDescription>{description}</ProductDescription>
        </ProductText>
        {/* Icon 컴포넌트로 URL을 직접 전달 */}
        <Icon src={Icons[iconType]} alt={`${name} icon`} size={34} />
      </InfoSection>
    </Card>
  );
};

export default ProductCard;
