import styled from 'styled-components';
import React from 'react';
import "pretendard/dist/web/static/pretendard.css";

const RecipeLines = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const RecipeLine = styled.div`
    display: flex;
    width: 470px;
    height: 38px;
    padding-left: 18px;
    padding-right: 18px;
    align-items: center;
    border-radius: 16px;
    border: 1px solid #8B8B8B;
    background: rgba(162, 162, 162, 0.10);
    color: #FFF;
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.8px;
    text-transform: capitalize;
`;

interface WriteRecipeProps {
    line1?: string;
    line2?: string;
    line3?: string;
}

const ViewWriteRecipe: React.FC<WriteRecipeProps> = ({ line1, line2, line3 }) => {
    return (
        <RecipeLines>
            {line1 && <RecipeLine>{line1}</RecipeLine>}
            {line2 && <RecipeLine>{line2}</RecipeLine>}
            {line3 && <RecipeLine>{line3}</RecipeLine>}
        </RecipeLines>
    );
};

export default ViewWriteRecipe;
