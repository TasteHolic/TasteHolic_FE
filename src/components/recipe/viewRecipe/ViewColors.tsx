import React, { useState } from "react";
import styled from "styled-components";

const ColorPickerContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const ColorInput = styled.div<{ bgColor?: string }>`
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: ${(props) => (props.bgColor && props.bgColor !== "#636363" ? "1px solid white" : "none")};
    appearance: none;
    background-color: ${(props) => props.bgColor};
    box-sizing: border-box;
    
    &::-webkit-color-swatch {
        border: none;
        padding: 0;
    }
`;

interface ViewColorsProps {
  color1?: string;
  color2?: string;
  color3?: string;
}

const ViewColors: React.FC<ViewColorsProps> = ({ color1, color2, color3 }) => {
    const [colorValues] = useState({
      color1: color1 || "#636363",
      color2: color2 || "#636363",
      color3: color3 || "#636363",
    });


  return (
    <ColorPickerContainer>
      <ColorInput bgColor={colorValues.color1} />
      <ColorInput bgColor={colorValues.color2} />
      <ColorInput bgColor={colorValues.color3} />
    </ColorPickerContainer>
  );
};

export default ViewColors;
