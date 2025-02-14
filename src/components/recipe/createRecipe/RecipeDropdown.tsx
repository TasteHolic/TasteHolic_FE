import React, { useState } from 'react';
import styled from 'styled-components';

interface DropdownProps {
    option?: string;
    placeholder: string;
    options: string[];
    onSelect: (selected: string) => void; // Callback function for state lifting
}

const DropdownContainer = styled.div`
    position: relative;
    width: 200px;
    height: 52px;
`;

const DropdownButton = styled.div`
    background: var(--grayscale-gray800, #242525);
    border: 1px solid #ccc;
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
`;

const DropdownContent = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: var(--grayscale-gray800, #242525);
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 4px;
    z-index: 10;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding-top: 8px;
    padding-bottom: 8px;
`;

const DropdownItem = styled.div`
    padding: 10px 10px 10px 30px;
    cursor: pointer;
    position: relative;
    text-align: left;

    &:hover {
        background: var(--grayscale-gray700, #383939);
    }

    &::after {
        content: "";
        display: block;
        width: 160px;
        height: 1px;
        background: var(--grayscale-gray700, #383939);
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    &:last-child::after {
        display: none;
    }
`;

const OptionText = styled.div`
    color: #FFF;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.56px;
    text-transform: capitalize;
`;

const ArrowDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
        <path d="M2 5.5L8 10.5L14 5.5" stroke="#E2E4E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ArrowUp = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
        <path d="M13 6.5L7 1.5L1 6.5" stroke="#E2E4E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const RecipeDropdown: React.FC<DropdownProps> = ({ placeholder, options, option, onSelect }) => {
    const [isActive, setIsActive] = useState(false);
    const [selected, setSelected] = useState<string | null>(option || null);

    const handleSelect = (selectedItem: string) => {
        setSelected(selectedItem);
        setIsActive(false);
        onSelect(selectedItem);
    };

    return (
        <DropdownContainer>
            <DropdownButton onClick={() => setIsActive(!isActive)}>
                {selected || placeholder}
                {isActive ? <ArrowUp /> : <ArrowDown />}
            </DropdownButton>
            {isActive && (
                <DropdownContent>
                    {options.map((optionItem, index) => (
                        <DropdownItem key={index} onClick={() => handleSelect(optionItem)}>
                            <OptionText>{optionItem}</OptionText>
                        </DropdownItem>
                    ))}
                </DropdownContent>
            )}
        </DropdownContainer>
    );
};

export default RecipeDropdown;
