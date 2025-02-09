import styled from 'styled-components';
import React, { useState } from 'react';
import ItemListDropdown from './ItemListDropdown';
import "pretendard/dist/web/static/pretendard.css"


const ListContainer = styled.div`
    display: flex;
    padding: 5px;
    padding-right: 7px;
    padding-left: 7px;
    height: 51px;
    max-width: 478px;
    align-items: center;
    gap: 10px;
    border-radius: 50px;
    background: rgba(0, 0, 0, 0.30);
`;

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

const Item = styled.div`
    height: 40px;
    display: flex;
    padding-left: 16px;

    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.32);
    background: rgba(12, 12, 12, 0.00);

    padding: 2px;
    padding-left: 16px;


`;
const ItemText = styled.div`
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.8px;
    text-transform: capitalize;
`;
const DeleteButton = styled.div`
    background: none;
    padding: 0px;
    cursor: pointer;
    height: 30px;
    width: 30px;
    margin-left: -5px;
`;
const AddButtonContainer = styled.div`
position: relative;
    display: flex;
    flex-direction: column;
    align-items: left;
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

    &: focus {
    outline: none;}
    &: hover {
    border: 1px solid rgba(255, 255, 255, 0.32);
    }
`;
const DropdownWrapper = styled.div`
    position: absolute;
    top: 100%;
    left: 150px;
    transform: translateX(-50%);
    margin-top: 5px;
    z-index: 10;
`;
interface ItemListProps {
    items?: string[];
    options: string[];
    
}

const ItemList: React.FC<ItemListProps> = ({ options, items = [] }) => {
    const [selectedItems, setSelectedItems] = useState<string[]>(items);

    const [showDropdown, setShowDropdown] = useState(false);

    const addItem = (item: string) => {
        const cleanedItem = item.replace(/\s?\(.*?\)/g, ""); 
        setSelectedItems([...selectedItems, cleanedItem]);
        setShowDropdown(false);
    };

    const deleteItem = (index: number) => {
        const updatedItems = selectedItems.filter((_, i) => i !== index);
        setSelectedItems(updatedItems);
    };

    return (
        <ListContainer>
            {selectedItems.map((item, index) => (
                <ItemWrapper key={index}>
                    <Item>
                        <ItemText>{item}</ItemText>
                        <DeleteButton onClick={() => deleteItem(index)}>
                            <svg width="30" height="30" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.3132 9.04176L8.3977 15.9573M8.3977 9.04176L15.3132 15.9573" stroke="white" strokeOpacity="0.32" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </DeleteButton>
                    </Item>
                </ItemWrapper>
            ))}
            <AddButtonContainer>
                <AddButton isOpen={showDropdown} onClick={() => setShowDropdown(!showDropdown)}>
                    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.2106 5.20898V19.7923M5.91895 12.5007H20.5023" stroke="#8D8F90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </AddButton>

                {showDropdown && (
                    <DropdownWrapper>
                        <ItemListDropdown onSelect={addItem} options={options} />
                    </DropdownWrapper>
                )}
            </AddButtonContainer>
        </ListContainer>
    );
};

export default ItemList;


