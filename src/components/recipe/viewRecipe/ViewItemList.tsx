import styled from 'styled-components';
import React, { useState } from 'react';
import "pretendard/dist/web/static/pretendard.css"


const ListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 5px;
    padding-right: 7px;
    padding-left: 7px;
    max-width: 478px;
    align-items: center;
    gap: 10px;
    row-gap: 5px;
    border-radius: 30px;
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

    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.32);
    background: rgba(12, 12, 12, 0.00);

    padding-left: 16px;
    padding-right: 16px;


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

interface ItemListProps {
    items?: string[];
    
}

const ItemList: React.FC<ItemListProps> = ({items = [] }) => {
    const [selectedItems, setSelectedItems] = useState<string[]>(items);

    return (
        <ListContainer>
            {selectedItems.map((item, index) => (
                <ItemWrapper key={index}>
                    <Item>
                        <ItemText>{item}</ItemText>
                    </Item>
                </ItemWrapper>
            ))}
        </ListContainer>
    );
};

export default ItemList;


