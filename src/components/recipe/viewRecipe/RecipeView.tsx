import React, { useState } from "react";
import "./RecipeView.css";
import ItemList from "./ViewItemList";
import ViewWriteRecipe from "./ViewWriteRecipe";
import ViewColors from "./ViewColors";

interface RecipeViewProps {
    onReadMore: () => void;
    onCancel: () => void;
    onEdit: () => void;
}

const RecipeView: React.FC<RecipeViewProps> = ({
    onReadMore,
    onCancel,
    onEdit
}) => {
    // 하드코딩된 레시피 데이터
    const recipe = {
        name: "은하수 폭발",
        tastes: ["달콤한", "시큼한"],
        aromas: ["과일 향", "민트 향"],
        ingredients: {
            "진": "50ml",
            "레몬 주스": "30ml",
            "설탕 시럽": "15ml",
            "탄산수": "적당량"
        },
        abv: 15,
        glassType: "칵테일 글래스",
        colors: ["#001F3F", "#39CCCC", "#FFFFFF"],
        recipe: [
            "진을 잔에 붓는다.",
            "레몬 주스와 설탕 시럽을 넣고 섞는다.",
            "탄산수를 추가하고 가볍게 젓는다."
        ]
    };

    return (
        <>
            <div className="container">
                <div className="top">
                    <p className="drink-name">{recipe.name}</p>
                    <button className="read-more-button" onClick={onReadMore}>
                        자세히 보기
                    </button>
                </div>

                <div className="categories">
                    <div className="category">
                        <div className="category-name">맛</div>
                        <ItemList items={recipe.tastes} />
                    </div>
                    <div className="category">
                        <div className="category-name">향</div>
                        <ItemList items={recipe.aromas} />
                    </div>
                    <div className="category">
                        <div className="category-name">재료</div>
                        <ItemList items={Object.keys(recipe.ingredients)} />
                    </div>
                    <div className="category">
                        <div className="category-name">도수</div>
                        <ItemList items={[`${recipe.abv}%`]} />
                    </div>
                    <div className="category">
                        <div className="category-name">잔</div>
                        <ItemList items={[recipe.glassType]} />
                    </div>
                    <div className="category">
                        <div className="category-name">색상</div>
                        <div className="colors">
                            <ViewColors
                                color1={recipe.colors[0]}
                                color2={recipe.colors[1]}
                                color3={recipe.colors[2]}
                            />
                        </div>
                    </div>
                    <div className="category r1">
                        <div className="category-name r2">레시피</div>
                        <ViewWriteRecipe
                            line1={recipe.recipe[0]}
                            line2={recipe.recipe[1]}
                            line3={recipe.recipe[2]}
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
