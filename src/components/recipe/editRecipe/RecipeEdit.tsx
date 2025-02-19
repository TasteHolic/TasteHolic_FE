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

    const [name, setName] = useState<string>("");
    const [ingredients, setIngredients] = useState<{ [key: string]: string }>({});
    const [recipeSteps, setRecipeSteps] = useState<string[]>([]);
    const [glassType, setGlassType] = useState<string>("");
    const [status, setStatus] = useState<string>("published");
    const [tastes, setTastes] = useState<string[]>([]);
    const [aromas, setAromas] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [abv, setAbv] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchRecipeDetails = async () => {
    
            try {
                const response = await axios.get(`http://54.180.45.230:3000/api/v1/recipes/${recipeId}?type=user`);
    
                if (response.data.resultType === "SUCCESS") {
                    const recipeData = response.data.success.recipe;
                    setRecipe(recipeData);
  
    
                    setName(recipeData.name);
                    setIngredients(recipeData.ingredients);
                    setRecipeSteps(recipeData.recipe);
                    setGlassType(recipeData.glassType);
                    setStatus(recipeData.status);
                    setTastes(recipeData.tastes);
                    setAromas(recipeData.aromas);
                    setColors(recipeData.colors || []); // 색상이 null일 수도 있음
                    setAbv(recipeData.abv);
                    setIsLoading(false);
                } else {
                    alert("레시피 정보를 불러오는 데 실패했습니다.");
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("레시피 상세 정보 불러오기 실패:", error);
                setIsLoading(false);
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
                name,
                ingredients, 
                recipe: recipeSteps,
                glassType,
                status,
                tastes,
                aromas,
                colors,
                abv,
            };
    
            const response = await axios.patch(`http://54.180.45.230:3000/api/v1/recipes/${recipeId}`, updatedRecipe, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
    
            if (response.data.resultType === "SUCCESS") {
                console.log("레시피 수정 완료!");
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
    

    if (isLoading) return  <p style={{ color: "#ffffff" }}>로딩 중...</p>;

    return (
        <>
            <div className="edit-container">
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
                        <ItemList 
                        items={Object.keys(recipe.ingredients)} 
                        options={[
                            "보드카",  
                            "라임 주스",  
                            "진",  
                            "럼",  
                            "심플 시럽",  
                            "레몬 주스",  
                            "버몬트",  
                            "오렌지 주스",  
                            "아마레토",  
                            "위스키",  
                            "가루 설탕",  
                            "소다수",  
                            "데킬라",  
                            "크렘 드 멘트",  
                            "트리플 섹",  
                            "얼음" 
                            ]} />
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
