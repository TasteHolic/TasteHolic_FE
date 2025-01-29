import React, { useState } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  margin: 0px;
  padding: 0px;
  position: relative;
  width: 248px;
  height: 368px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  background: #121212;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.8);
  }
`;

const Image = styled.img`
  position: absolute;
  width: 296px;
  height: 296px;
  object-fit: cover;
  top: 40px;
  z-index: 1;
`;

const DescriptionCard = styled.div<{ isHovered: boolean }>`
  position: relative;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(48, 48, 48, 0.7);
  border-radius: 16px;
  box-sizing: border-box;
  display: ${(props) => (props.isHovered ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${(props) => (props.isHovered ? 1 : 0)};
  padding-left: 24px;
  backdrop-filter: blur(10px);
`;

const Title = styled.h3`
  color: #f5f6f3;
  font-family: "Pretendard", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.8px;
  text-transform: capitalize;
  position: absolute;
  top: 32px;
  left: 24px;
  margin: 0px;
`;

const Divider = styled.div`
  position: absolute;
  height: 1px;
  width: 200px;
  background: #5a5a5a;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  top: 76px;
`;

const Label = styled.span`
  color: var(--grayscale-gray200, #c8cacb);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.48px;
  text-transform: capitalize;
  position: absolute;
  top: 14px;
  left: 10px;
`;
const LabelBox = styled.div`
  width: 111px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #8e8e8e;
  background: rgba(255, 255, 255, 0.13);
  position: absolute;
  top: 96px;
`;

const Value = styled.div`
  position: absolute;
  top: 10px;
  left: 43px;
  display: inline-flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.48px;
  text-transform: capitalize;
`;
const IngredientLabel = styled.span`
  color: var(--grayscale-gray200, #c8cacb);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.48px;
  text-transform: capitalize;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const IngredientList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  position: relative;
  top: 32px;
  left: 10px;
`;

const Ingredient = styled.span`
  background: #292929;
  color: #f5f6f3;
  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 400;
  padding: 4px 8px;
  border-radius: 16px;
`;
const IngredientBox = styled.div`
  width: 201px;
  height: 103px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #8e8e8e;
  background: rgba(255, 255, 255, 0.13);
  position: absolute;
  top: 154px;
`;

const Button = styled.button`
  display: inline-flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 33px;
  color: #000;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.56px;
  text-transform: capitalize;
  border-radius: 40px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  opacity: 0.9;
  background: #fff;
  cursor: pointer;
  transition: background 0.3s ease;
  position: absolute;
  top: 311px;
  left: 124px;
`;

const RecommandCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CardContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image src="/public/image/Recommand.png" alt="추천 이미지" />
      <DescriptionCard isHovered={isHovered}>
        <Title>Espresso Martini</Title>
        <Divider />

        <LabelBox>
          <Label>도수</Label>
          <Value>Medium</Value>
        </LabelBox>

        <IngredientBox>
          <IngredientLabel>재료</IngredientLabel>
          <IngredientList>
            <Ingredient>Espresso</Ingredient>
            <Ingredient>Coffee Liqueur</Ingredient>
            <Ingredient>Vodka</Ingredient>
            <Ingredient>Syrup</Ingredient>
          </IngredientList>
        </IngredientBox>
        <Button>레시피 보기</Button>
      </DescriptionCard>
    </CardContainer>
  );
};

export default RecommandCard;
