import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ExploreRecipe.css";
import ViewWriteRecipe from "../viewRecipe/ViewWriteRecipe";

export interface Ingredients {
    ingredient: string;
    amount: string;
}

interface ExploreRecipeProps {
    recipeId: number;
    type: "user" | "cocktail";
    onCancel: () => void;
    onSave: () => void;
}

const ExploreRecipe: React.FC<ExploreRecipeProps> = ({
    recipeId,
    type,
    onCancel,
    onSave
}) => {
    const [recipeDetails, setRecipeDetails] = useState<any>(null);
    const [favRecipes, setFavRecipes] = useState<Set<number>>(new Set());
    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {

    }, []);
    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(
                    `http://54.180.45.230:3000/api/v1/recipes/${recipeId}?type=${type}`
                );
                setRecipeDetails(response.data.success.recipe);
            } catch (error: any) {
                console.error("레시피 상세 정보 불러오기 실패:", error);

                if (error.response) {
                    const { status, data } = error.response;
                    if (status === 400 && data.error?.errorCode === "R103") {
                        alert("잘못된 타입이 입력되었습니다.");
                    } else {
                        alert("레시피 정보를 불러오는 중 오류가 발생했습니다.");
                    }
                } else {
                    alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
                }
            }
        };

        fetchRecipeDetails();
    }, [recipeId, type]);

    useEffect(() => {
        const fetchFavRecipes = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("비로그인 유저");
                return;
            }
            try {
                const response = await axios.get("http://54.180.45.230:3000/api/v1/users/recipes/fav", 
                 {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

                if (response.data && response.data.recipes) {
                    const favIds = new Set<number>(response.data.recipes.map((recipe: any) => recipe.id));
                    setFavRecipes(favIds);
                }
            } catch (error) {
                console.error("좋아요한 레시피 목록 불러오기 실패:", error);
            }
        };

        fetchFavRecipes();
    }, [onSave]);

    useEffect(() => {
      setIsSaved(favRecipes.has(recipeId));
    }, [favRecipes, recipeId]);

    return (
        <>
            {recipeDetails && (
                <div className="explore-recipe-container">
                    <div className="gradient-over-img"/>
                    <img src={recipeDetails.imageUrl || "/image/image 92.png"} className="background-img" />
                    <div className="contents">
                        <div className="title">
                            <div className="explore-title">{recipeDetails.name}</div>
                            <div className="explore-recipe-drink-name">{recipeDetails.nameEng}</div>
                            <div className="counts">
                                <div className="count">
                                    <img src="/image/iconamoon_eye-duotone.png" className="count-img" />
                                    <div className="count-number">{recipeDetails.views}</div>
                                </div>
                                <div className="count">
                                    <img src="/image/Group 913.png" className="count-img" />
                                    <div className="count-number">{recipeDetails.likes}</div>
                                </div>
                            </div>
                        </div>
                        <div className="explore-recipe-wrapper">
                            <div className="explore-recipe-category">
                                <div className="explore-recipe-category-title">재료</div>
                                    <div className="ingredients">
                                        {Object.entries(recipeDetails.ingredients).map(([ingredient, amount], index) => {
                                            const amountStr = amount as string;

                                            let extraClass = "";
                                            if (amountStr.endsWith("Tsp")) {
                                                extraClass = "Tsp-label";
                                            } else if (amountStr.endsWith("Splash")) {
                                                extraClass = "Splash-label";
                                            }

                                            return (
                                                <div className="ingredient" key={index}>
                                                    <div className="amount">{amountStr}</div>
                                                    <div className={`label ${extraClass}`}>{ingredient}</div>
                                                </div>
                                            );
                                        })}
                                    </div>

                            </div>
                            <div className="explore-recipe-category">
                                <div className="explore-recipe-category-title">레시피</div>
                                <div className="recipe">
                                    <ViewWriteRecipe
                                        line1={recipeDetails.recipe[0]}
                                        line2={recipeDetails.recipe[1]}
                                        line3={recipeDetails.recipe[2]}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="explore-recipe-bottom">
                            <button className="cancel-button" onClick={onCancel}>
                                cancel
                            </button>
                            <button 
                                className="save-button" 
                                onClick={onSave}
                            >
                                {isSaved ? "저장됨" : "저장하기"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExploreRecipe;
