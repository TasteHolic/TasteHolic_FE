import React, { useEffect, useState } from "react";
import "./RecipeEdit.css";
import ItemList from "./ItemList";
import RecipeDropdown from "./RecipeDropdown";
import WriteRecipe from "./EditWriteRecipe";
import ColorPicker from "../ColorPicker";
import axios from "axios";

interface RecipeEditProps {
    recipeId: number;
    onReadMore: () => void;
    onCancel: () => void;
    onSave: () => void;
}

const RecipeEdit: React.FC<RecipeEditProps> = ({
    recipeId,
    onReadMore,
    onCancel,
    onSave
}) => {
    const [recipe, setRecipe] = useState<any>(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(`http://54.180.45.230:3000/api/v1/recipes/${recipeId}`);
                if (response.data.resultType === "SUCCESS") {
                    setRecipe(response.data.success.recipe);
                } else {
                    alert("레시피 정보를 불러오는 데 실패했습니다.");
                }
            } catch (error) {
                console.error("레시피 상세 정보 불러오기 실패:", error);
                alert("레시피 정보를 불러오는 중 오류가 발생했습니다.");
            }
        };

        fetchRecipeDetails();
    }, [recipeId]);

    const handleUpdateRecipe = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("레시피 소유자만 수정할 수 있습니다.");
                return;
            }

            const updatedRecipe = {
                name: recipe.name,
                ingredients: recipe.ingredients,
                recipe: recipe.recipe,
                glassType: recipe.glassType,
                status: "published",
                tastes: recipe.tastes,
                aromas: recipe.aromas,
                colors: recipe.colors,
                abv: recipe.abv,
            };

            const response = await axios.patch(`http://54.180.45.230:3000/api/v1/recipes/${recipeId}`, updatedRecipe, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data.resultType === "SUCCESS") {
                alert("레시피 수정 완료!");
                onCancel();
            } else {
                alert("레시피 수정 실패!");
            }
        } catch (error: any) {
            alert("서버 응답이 없습니다.");
            console.error("레시피 수정 실패:", error);
        }
        onSave();
    };

    if (!recipe) return <p>로딩 중...</p>;

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
                        <ItemList 
                            items={recipe.tastes}
                            options={[
                                "달콤함 (Sweet)", 
                                "시트러스 (Citrus)", 
                                "상쾌함 (Refreshing)", 
                                "드라이함 (Dry)", 
                                "강렬함 (Intense)", 
                                "부드러움 (Smooth)", 
                                "프루티 (Fruity)", 
                                "허브 (Herbal)", 
                                "짭짤함 (Salty)"
                             ]}
                              />
                    </div>
                    <div className="category">
                        <div className="category-name">향</div>
                        <ItemList 
                            items={recipe.aromas}
                            options={[
                                "바닐라 (Vanilla)", 
                                "라임 (Lime)", 
                                "시트러스 (Citrus)", 
                                "아몬드 (Almond)", 
                                "민트 (Mint)", 
                                "베리 (Berry)", 
                                "오크 (Oaky)", 
                                "오렌지 (Orange)", 
                                "커피 (Coffee)"
                            ]}
                            />
                    </div>
                    <div className="category">
                        <div className="category-name">재료</div>
                        <ItemList items={Object.keys(recipe.ingredients)} options={["vodka", "coffee", "etc"]} />
                    </div>
                    <div className="category">
                        <div className="category-name">도수</div>
                        <RecipeDropdown
                            option={`${recipe.abv}%`}
                            placeholder="도수 찾기..."
                            options={[
                                "논알콜", 
                                "0-10%", 
                                "20-30%", 
                                "30-40%", 
                                "40% 이상"
                            ]}
                        />
                    </div>
                    <div className="category">
                        <div className="category-name">잔</div>
                        <RecipeDropdown
                            option={recipe.glassType}
                            placeholder="주종 찾기..."
                            options={[
                                "마티니 글라스", 
                                "올드패션드 글라스", 
                                "하이볼 글라스", 
                                "콜린스 글라스", 
                                "쿠페 글라스", 
                                "마가리타 글라스", 
                                "샴페인 플루트", 
                                "와인 글라스", 
                                "틴 컵", 
                                "모스코 뮬 머그"
                            ]}
                        />
                    </div>
                    <div className="category">
                        <div className="category-name">색상</div>
                        <div className="colors">
                            <ColorPicker color1={recipe.colors?.[0]} color2={recipe.colors?.[1]} color3={recipe.colors?.[2]} />
                        </div>
                    </div>
                    <div className="category r1">
                        <div className="category-name r2">레시피</div>
                        <WriteRecipe line1={recipe.recipe[0]} line2={recipe.recipe[1]} line3={recipe.recipe[2]} />
                    </div>
                </div>
                <div className="bottom">
                    <button className="cancel-button" onClick={onCancel}>cancel</button>
                    <button className="save-button" onClick={handleUpdateRecipe}>저장하기</button>
                </div>
            </div>
        </>
    );
};

export default RecipeEdit;