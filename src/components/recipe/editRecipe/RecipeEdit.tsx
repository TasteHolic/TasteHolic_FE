import "./RecipeEdit.css"
import ItemList from "./ItemList";
import RecipeDropdown from "./RecipeDropdown";
import WriteRecipe from "./EditWriteRecipe";
import ColorPicker from "../ColorPicker";

interface RecipeEditProps {
    drinkName: string; //술 이름
    flavor?: string[]; //맛 종류들
    aroma?: string[]; //향 종류들
    ingredients?: string[]; //재료 종류들
    alcoholPer?: string; //도수 
    glass?: string; //잔
    hexColor1?: string; //#여섯자리숫자
    hexColor2?: string;
    hexColor3?: string;
    recipeLine1?: string; //레시피 작성 3줄
    recipeLine2?: string;
   recipeLine3?: string;
    onReadMore: () => void; //자세히보기 클릭 시
    onCancel: () => void; //cancel 클릭 시
    onSave: () => void; //저장하기 클릭 시
}

const RecipeEdit: React.FC<RecipeEditProps> = ({
    drinkName,
    flavor,
    aroma,
    ingredients,
    alcoholPer,
    glass,
    hexColor1,
    hexColor2,
    hexColor3,
    recipeLine1,
    recipeLine2,
    recipeLine3,
    onReadMore,
    onCancel,
    onSave
}) => {
    return (
        <>
            <div className="editcontainer">
                <div className="top">
                    <p className="drink-name">{drinkName}</p>
                    <button className="read-more-button" onClick={onReadMore}>
                        자세히 보기
                    </button>
                </div>

                <div className="categories">
                    <div className="category">
                        <div className="category-name">맛</div>
                        <ItemList
                            items={flavor}
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
                            items={aroma}
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
                        <ItemList items={ingredients} options={["vodka", "coffee", "etc"]} />
                    </div>
                    <div className="category">
                        <div className="category-name">도수</div>
                        <RecipeDropdown
                            option={alcoholPer}
                            placeholder="도수 찾기..."
                            options={["논알콜", "0-10%", "20-30%", "30-40%", "40% 이상"]}
                        />
                    </div>
                    <div className="category">
                        <div className="category-name">잔</div>
                        <RecipeDropdown
                            option={glass}
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
                            color1={hexColor1}
                            color2={hexColor2}
                            color3={hexColor3}/>
                        </div>
                    </div>
                    <div className="category r1">
                        <div className="category-name r2">레시피</div>
                        <WriteRecipe line1={recipeLine1} line2={recipeLine2} line3={recipeLine3} />
                    </div>
                </div>
                <div className="bottom">
                    <button className="cancel-button" onClick={onCancel}>
                        cancel
                    </button>
                    <button className="save-button" onClick={onSave}>
                        저장하기
                    </button>
                </div>
            </div>
        </>
    );
};

export default RecipeEdit;
