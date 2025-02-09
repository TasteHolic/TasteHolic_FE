import "./RecipeCreate.css"
import { useState } from "react";
import ItemList from "./ItemList";
import VarietyItem from "./VarietyItem";
import RecipeDropdown from "./RecipeDropdown";
import CreateWriteRecipe from "./CreateWriteRecipe";

interface RecipeInputProps {
    drinkName: string;
    onReadMore: () => void;
    onCancel: () => void;
    onSave: () => void;
}

const RecipeInput: React.FC<RecipeInputProps> = ({
    drinkName,
    onCancel,
    onSave
}) => {
    const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
    const [selectedAromas, setSelectedAromas] = useState<string[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [selectedAlcohol, setSelectedAlcohol] = useState<string | null>(null);
    const [selectedGlass, setSelectedGlass] = useState<string | null>(null);
    const [recipeLines, setRecipeLines] = useState({ line1: "", line2: "", line3: "" });

    const isFormChanged = 
        selectedFlavors.length > 0 ||
        selectedAromas.length > 0 ||
        selectedIngredients.length > 0 ||
        selectedAlcohol !== null ||
        selectedGlass !== null ||
        Object.values(recipeLines).some(line => line.trim() !== "");

    return (
        <>
            <div className="container">
                <div className="top">
                    <p className="drink-name">{drinkName}</p>
                    <p className="cocktail">Cocktail</p>
                </div>

                <div className="categories">
                    <div className="category">
                        <div className="category-name">맛</div>
                        <ItemList
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
                            onChange={setSelectedFlavors}
                        />
                    </div>
                    <div className="category">
                        <div className="category-name">향</div>
                        <ItemList
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
                            onChange={setSelectedAromas}
                        />
                    </div>
                    <div className="category">
                        <div className="category-name">재료</div>
                        <ItemList options={["vodka", "coffee", "etc"]} onChange={setSelectedIngredients} />
                    </div>
                    <div className="category">
                        <div className="category-name">도수</div>
                        <RecipeDropdown
                            placeholder="도수 찾기..."
                            options={["논알콜", "0-10%", "20-30%", "30-40%", "40% 이상"]}
                            onSelect={setSelectedAlcohol}
                        />
                    </div>
                    <div className="category">
                        <div className="category-name">잔</div>
                        <RecipeDropdown
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
                            onSelect={setSelectedGlass}
                        />
                    </div>
                    <div className="category">
                        <div className="category-name">색상</div>
                        <div className="colors">
                            <div className="color1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                    <circle cx="13" cy="13" r="12.5" fill="#3C2005" stroke="white" />
                                </svg>
                            </div>
                            <div className="color2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                    <circle cx="13" cy="13" r="12.5" fill="#AE8560" stroke="white" />
                                </svg>
                            </div>
                            <div className="color3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                    <circle cx="13" cy="13" r="13" fill="#636363" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="category2">
                        <div className="category-name">레시피</div>
                        <CreateWriteRecipe recipeLines={recipeLines} onChange={setRecipeLines} />
                    </div>
                </div>
                <div className="bottom">
                    <button className="cancel-button" onClick={onCancel}>
                        cancel
                    </button>
                    <button 
                        className={`save-button ${isFormChanged ? "active" : "disabled"}`} 
                        onClick={isFormChanged ? onSave : undefined}
                        disabled={!isFormChanged}
                    >
                        저장하기
                    </button>
                </div>
            </div>
        </>
    );
};

export default RecipeInput;
