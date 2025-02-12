import React, { useState } from "react";
import styled from "styled-components";

const ColorPickerContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const ColorInput = styled.input<{ bgColor?: string }>`
    width: 26px;
    height: 26px;
    border-radius: 50%;
    cursor: pointer;
    border: ${(props) => (props.bgColor && props.bgColor !== "#636363" ? "1px solid white" : "none")};
    appearance: none;
    background-color: ${(props) => props.bgColor};
    box-sizing: border-box;
    
    &::-webkit-color-swatch {
        border: none;
        padding: 0;
    }
`;

interface ColorPickerProps {
  color1?: string;
  color2?: string;
  color3?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color1, color2, color3 }) => {
    const [colorValues, setColorValues] = useState({
      color1: color1 || "#636363",
      color2: color2 || "#636363",
      color3: color3 || "#636363",
    });

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setColorValues((prev) => ({ ...prev, [key]: event.target.value }));
  };

  return (
    <ColorPickerContainer>
      <ColorInput type="color" bgColor={colorValues.color1} value={colorValues.color1} onChange={(e) => handleColorChange(e, "color1")} />
      <ColorInput type="color" bgColor={colorValues.color2} value={colorValues.color2} onChange={(e) => handleColorChange(e, "color2")} />
      <ColorInput type="color" bgColor={colorValues.color3} value={colorValues.color3} onChange={(e) => handleColorChange(e, "color3")} />
    </ColorPickerContainer>
  );
};

export default ColorPicker;
