import styled from 'styled-components';
import React, { useState } from 'react';
import "pretendard/dist/web/static/pretendard.css";

const RecipeLines = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const RecipeLineWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const RecipeLine = styled.input`
    display: flex;
    width: 446px;
    height: 38px;
    padding-left: 18px;
    padding-right: 40px;
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

    &:focus {
        outline: none;
    }
`;

const DeleteButton = styled.button`
    padding: 0px;
    position: absolute;
    right: 11px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &: focus {
    outline: none;}
`;

const AddRecipeButton = styled.button`
    display: flex;
    width: 507px;
    height: 42px;
    padding: 18px;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 10px;
    flex-wrap: wrap;
    border-radius: 16px;
    background: none;
    border: 1px solid rgba(139, 139, 139, 0.20);

    &:focus {
        outline: none;
    }

    &:hover {
        border: 1px solid rgba(139, 139, 139, 0.20);
    }
`;

interface WriteRecipeProps {
    line1?: string;
    line2?: string;
    line3?: string;
}

const EditWriteRecipe: React.FC<WriteRecipeProps> = ({ line1 = '', line2 = '', line3 = '' }) => {
    const [inputValues, setInputValues] = useState({
        line1,
        line2,
        line3
    });

    const [showLine3, setShowLine3] = useState(!!line3);
    const [, setFocusedField] = useState<null | 'line1' | 'line2' | 'line3'>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: 'line1' | 'line2' | 'line3') => {
        setInputValues((prev) => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleDelete = (field: 'line1' | 'line2' | 'line3') => {
        setInputValues((prev) => ({
            ...prev,
            [field]: ''
        }));
    };

    return (
        <RecipeLines>
            {['line1', 'line2', 'line3'].map((field) => {
                const isLine3 = field === 'line3';
                if (isLine3 && !showLine3) {
                    return (
                        <AddRecipeButton key={field} onClick={() => setShowLine3(true)}>
                            <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5007 5.70898V20.2923M5.20898 13.0007H19.7923" stroke="white" strokeOpacity="0.32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </AddRecipeButton>
                    );
                }

                return (
                    <RecipeLineWrapper key={field}>
                        <RecipeLine
                            type="text"
                            placeholder="레시피를 채워보세요."
                            value={inputValues[field as 'line1' | 'line2' | 'line3']}
                            onChange={(e) => handleInputChange(e, field as 'line1' | 'line2' | 'line3')}
                            onFocus={() => setFocusedField(field as 'line1' | 'line2' | 'line3')}
                            onBlur={() => setTimeout(() => setFocusedField(null), 200)} /* Delay hiding */
                        />
                        {inputValues[field as 'line1' | 'line2' | 'line3'] && (
                            <DeleteButton onClick={() => handleDelete(field as 'line1' | 'line2' | 'line3')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#D9D9D9" fill-opacity="0.3"/>
                                    <path d="M15 9L9 15" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M9 9L15 15" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </DeleteButton>
                        )}
                    </RecipeLineWrapper>
                );
            })}
        </RecipeLines>
    );
};

export default EditWriteRecipe;
