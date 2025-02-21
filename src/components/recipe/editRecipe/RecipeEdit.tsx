import React, { useState } from "react";
import "./RecipeEdit.css";
import ItemList from "./ItemList";
import RecipeDropdown from "./RecipeDropdown";
import WriteRecipe from "./EditWriteRecipe";
import ColorPicker from "../ColorPicker";

interface RecipeEditProps {
    onReadMore: () => void;
    onCancel: () => void;
    onSave: () => void;
}

const RecipeEdit: React.FC<RecipeEditProps> = ({
    onReadMore,
    onCancel,
    onSave
}) => {
    // 하드코딩된 레시피 데이터
    const [name, setName] = useState<string>("은하수 폭발");
    const [ingredients, setIngredients] = useState<{ [key: string]: string }>({
        "진": "50ml",
        "레몬 주스": "30ml",
        "설탕 시럽": "15ml",
        "탄산수": "적당량"
    });
    const [recipeSteps, setRecipeSteps] = useState<string[]>([
        "진을 잔에 붓는다.",
        "레몬 주스와 설탕 시럽을 넣고 섞는다.",
        "탄산수를 추가하고 가볍게 젓는다."
    ]);
    const [glassType, setGlassType] = useState<string>("칵테일 글래스");
    const [status, setStatus] = useState<string>("published");
    const [tastes, setTastes] = useState<string[]>(["달콤한", "상쾌한"]);
    const [aromas, setAromas] = useState<string[]>(["과일 향", "민트 향"]);
    const [colors, setColors] = useState<string[]>(["#001F3F", "#39CCCC", "#FFFFFF"]);
    const [abv, setAbv] = useState<number>(18);

    const handleUpdateRecipe = () => {
        console.log("업데이트된 레시피:", {
            name,
            ingredients,
            recipeSteps,
            glassType,
            status,
            tastes,
            aromas,
            colors,
            abv
        });
        onSave();
    };

    return (
        <>
            <div className="edit-container">
                <div className="top">
                    <p className="drink-name">{name}</p>
                    <button className="read-more-button" onClick={onReadMore}>
                        자세히 보기
                    </button>
                </div>

                <div className="categories">
                    <div className="category">
                        <div className="category-name">맛</div>
                        <ItemList 
                            items={tastes}
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
                            items={aromas}
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
                            items={Object.keys(ingredients)} 
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
                            ]} 
                        />
                    </div>
                    <div className="category">
                        <div className="category-name">도수</div>
                        <RecipeDropdown
                            option={`${abv}%`}
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
                            option={glassType}
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
                            <ColorPicker 
                                color1={colors[0]} 
                                color2={colors[1]} 
                                color3={colors[2]} 
                            />
                        </div>
                    </div>
                    <div className="category r1">
                        <div className="category-name r2">레시피</div>
                        <WriteRecipe 
                            line1={recipeSteps[0]} 
                            line2={recipeSteps[1]} 
                            line3={recipeSteps[2]} 
                        />
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
