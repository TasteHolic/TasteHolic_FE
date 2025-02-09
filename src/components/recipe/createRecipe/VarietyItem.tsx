import styled from 'styled-components';
import React, { useState } from 'react';
import ItemListDropdown from './ItemListDropdown';
import "pretendard/dist/web/static/pretendard.css";

const Container = styled.div<{ isSelected: boolean }>`
    display: flex;
    padding: 5px;
    height: 51px;
    max-width: 478px;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 50px;
    background: ${(props) => (props.isSelected ? "transparent" : "rgba(0, 0, 0, 0.30)")};
    cursor: pointer;
    position: relative;
`;

const SelectedTextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const SelectedText = styled.div`
    color: #FEFEFE;
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 500;
    text-transform: capitalize;
    text-align: center;
    opacity: 0.7;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
        opacity: 1;
    }
`;

const AddButtonContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const AddButton = styled.button<{ isOpen: boolean }>`
    display: flex;
    height: 48px;
    width: 67px;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.32);
    background: ${(props) => (props.isOpen ? "#FFF" : "rgba(12, 12, 12, 0.00)")};

    &:focus {
        outline: none;
    }

    &:hover {
        border: 1px solid rgba(255, 255, 255, 0.32);
    }
`;

const DropdownWrapper = styled.div`
    position: absolute;
    top: 100%;
    left: -80px;
    transform: translateX(-50%);
    margin-top: 0px;
    z-index: 10;
`;

interface ItemListProps {
    options: string[];
}

const ItemList: React.FC<ItemListProps> = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSelect = (option: string) => {
        setSelectedOption(option.replace(/\s?\(.*?\)/g, "")); // Removes parentheses content
        setShowDropdown(false);
    };

    return (
        <Container isSelected={!!selectedOption} onClick={() => setShowDropdown(!showDropdown)}>
            {selectedOption ? (
                <SelectedTextContainer>
                    <SelectedText>{selectedOption}</SelectedText>
                </SelectedTextContainer>
            ) : (
                <AddButtonContainer>
                    <AddButton isOpen={showDropdown}>
                        <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.2106 5.20898V19.7923M5.91895 12.5007H20.5023" stroke="#8D8F90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </AddButton>
                </AddButtonContainer>
            )}

            {showDropdown && (
                <DropdownWrapper>
                    <ItemListDropdown onSelect={handleSelect} options={options} />
                </DropdownWrapper>
            )}
        </Container>
    );
};

export default ItemList;
