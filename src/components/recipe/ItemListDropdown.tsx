import styled from 'styled-components';
import React, { useState } from 'react';

const DropdownContainer = styled.div`
    width: 320px;
    max-height: 433px;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid var(--grayscale-gray50, #F3F5F6);
    background: var(--grayscale-gray800, #242525);
    box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.51);
`;
const SearchBarContainer = styled.div`
    width: 296px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    background: rgba(255, 255, 255, 0.10);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding: 12px;
`;
const SearchBar = styled.div`
    width: 280px;
    height: 36px;
    display: flex;
    flex-direction: row;
    justify-content:left;
    align-items: center;
    gap: 8px;
    padding-left: 16px;

    flex-shrink: 0;
    border-radius: 50px;
    border: 1px solid var(--grayscale-gray50, #F3F5F6);
    background: none;
    box-shadow: 0px 4px 10px 0px rgba(255, 255, 255, 0.10);
    &:focus {
    outline: none;}
`;
const SearchBarInput = styled.input`
    width: 220px;
    background: none;
    border: none;
    color: #FFF;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.56px;
    text-transform: capitalize;

    &::placeholder {
        color: var(--grayscale-gray400, #8D8F90);
        opacity: 1;
    }

    &:focus {
        outline: none;
    }
`;


const DropdownItem = styled.div`
    padding: 10px 10px 10px 30px;
    cursor: pointer;
    text-align: center;
    text-align: left;
    position: relative;

    &:hover {
        background: var(--grayscale-gray700, #383939);
        margin-left: 20px;
        margin-right: 20px;
        padding: 10px 10px 10px 10px;
    }

    &::after {
        content: "";
        display: block;
        width: 280px;
        height: 1px;
        background: #383939;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    &:last-child::after {
        display: none;
    }
`;
const HighlightedText = styled.span`
    color: #828282;

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.56px;
    text-transform: capitalize;
`;

const StyledOptionText = styled.span`
    color: #FFF;
    
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.56px;
    text-transform: capitalize;
`;

const formatTextWithParentheses = (text: string) => {
    const match = text.match(/(.*?)\((.*?)\)/); // Regex to detect text with parentheses

    if (match) {
        return (
            <>
                <StyledOptionText>{match[1]}</StyledOptionText>
                <HighlightedText>({match[2]})</HighlightedText>
            </>
        );
    }
    return <StyledOptionText>{text}</StyledOptionText>;
};


interface ItemListDropdownProps {
    onSelect: (item: string) => void;
    options: string[];
}

const ItemListDropdown: React.FC<ItemListDropdownProps> = ({ onSelect, options }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredItems = options.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DropdownContainer>
            <SearchBarContainer>
                <SearchBar>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.9867 14L11.1815 11.1M12.697 7.33333C12.697 10.2789 10.3872 12.6667 7.53795 12.6667C4.68869 12.6667 2.37891 10.2789 2.37891 7.33333C2.37891 4.38781 4.68869 2 7.53795 2C10.3872 2 12.697 4.38781 12.697 7.33333Z"
                            stroke="#F3F5F6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <SearchBarInput
                        type="text"
                        placeholder="검색 또는 새로 입력"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </SearchBar>
            </SearchBarContainer>

            {filteredItems.map((item, index) => (
                <DropdownItem key={index} onClick={() => onSelect(item)}>
                    {formatTextWithParentheses(item)}
                </DropdownItem>
            ))}
        </DropdownContainer>
    );
};

export default ItemListDropdown;