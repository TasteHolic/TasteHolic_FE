import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RecipeView.css"
import ItemList from "./ViewItemList";
import ViewWriteRecipe from "./ViewWriteRecipe";
import ViewColors from "./ViewColors";

interface RecipeViewProps {
    recipeId: number;
    type: "user" | "cocktail";
    onReadMore: () => void;
    onCancel: () => void;
    onEdit: () => void;
}

const RecipeView: React.FC<RecipeViewProps> = ({
    recipeId,
    type,
    onReadMore,
    onCancel,
    onEdit
}) => {
    const [recipe, setRecipe] = useState<any>(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(
                    `http://54.180.45.230:3000/api/v1/recipes/${recipeId}?type=${type}`
                );

                if (response.data.resultType === "SUCCESS") {
                    setRecipe(response.data.success.recipe);
                } else {
                    alert("레시피를 불러오는 데 실패했습니다.");
                }
            } catch (err: any) {
                if (err.response?.status === 404) {
                    alert("해당 레시피를 찾을 수 없습니다.");
                } else if (err.response?.status === 400) {
                    alert("잘못된 요청입니다. (타입을 확인하세요)");
                } else {
                    alert("서버 오류가 발생했습니다.");
                }
                console.error("레시피 조회 실패:", err);
            }
        };

        fetchRecipe();
    }, [recipeId, type]);

    return (
        <>
            <div className="container">
                <div className="top">
                    <p className="drink-name">{recipe?.name}</p>
                    <button className="read-more-button" onClick={onReadMore}>
                        자세히 보기
                    </button>
                </div>

                <div className="categories">
                    <div className="category">
                        <div className="category-name">맛</div>
                        <ItemList items={recipe?.tastes || []}/>
                    </div>
                    <div className="category">
                        <div className="category-name">향</div>
                        <ItemList items={recipe?.aromas || []}/>
                    </div>
                    <div className="category">
                        <div className="category-name">재료</div>
                        <ItemList items={Object.keys(recipe?.ingredients || {})} />
                    </div>
                    <div className="category">
                        <div className="category-name">도수</div>
                        <ItemList items={[`${recipe?.abv || 0}%`]}/>
                    </div>
                    <div className="category">
                        <div className="category-name">잔</div>
                        <ItemList items={[recipe?.glassType || "기본 잔"]}/>
                    </div>
                    <div className="category">
                        <div className="category-name">색상</div>
                        <div className="colors">
                            <ViewColors
                            color1={recipe?.colors?.[0] || ""}
                            color2={recipe?.colors?.[1] || ""}
                            color3={recipe?.colors?.[2] || ""}/>
                        </div>
                    </div>
                    <div className="category r1">
                        <div className="category-name r2">레시피</div>
                        <ViewWriteRecipe
                        line1={recipe?.recipe?.[0] || ""}
                        line2={recipe?.recipe?.[1] || ""}
                        line3={recipe?.recipe?.[2] || ""}
                        />
                    </div>
                </div>
                <div className="bottom">
                    <button className="cancel-button" onClick={onCancel}>
                        cancel
                    </button>
                    <button className="edit-button" onClick={onEdit}>
                        수정하기
                    </button>
                </div>
            </div>
        </>
    );
};

export default RecipeView;