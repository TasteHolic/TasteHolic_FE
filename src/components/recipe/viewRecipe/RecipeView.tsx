import "./RecipeView.css"
import ItemList from "./ViewItemList";
import ViewWriteRecipe from "./ViewWriteRecipe";
import ColorPicker from "../ColorPicker";

interface RecipeViewProps {
    drinkName: string; //술 이름
    flavor?: string[]; //맛 종류들
    aroma?: string[]; //향 종류들
    ingredients?: string[]; //재료 종류들
    alcoholPer?: string[]; //도수 
    glass?: string[]; //잔
    recipeLine1: string; //레시피 작성 3줄
    recipeLine2?: string;
    recipeLine3?: string;
    onReadMore: () => void; //자세히보기 클릭 시
    onCancel: () => void; //cancel 클릭 시
    onEdit: () => void; //저장하기 클릭 시
}

const RecipeView: React.FC<RecipeViewProps> = ({
    drinkName,
    flavor,
    aroma,
    ingredients,
    alcoholPer,
    glass,
    recipeLine1,
    recipeLine2,
    recipeLine3,
    onReadMore,
    onCancel,
    onEdit
}) => {
    return (
        <>
            <div className="container">
                <div className="top">
                    <p className="drink-name">{drinkName}</p>
                    <button className="read-more-button" onClick={onReadMore}>
                        자세히 보기
                    </button>
                </div>

                <div className="categories">
                    <div className="category">
                        <div className="category-name">맛</div>
                        <ItemList items={flavor}/>
                    </div>
                    <div className="category">
                        <div className="category-name">향</div>
                        <ItemList items={aroma}/>
                    </div>
                    <div className="category">
                        <div className="category-name">재료</div>
                        <ItemList items={ingredients} />
                    </div>
                    <div className="category">
                        <div className="category-name">도수</div>
                        <ItemList items={alcoholPer}/>
                    </div>
                    <div className="category">
                        <div className="category-name">잔</div>
                        <ItemList items={glass}/>
                    </div>
                    <div className="category">
                        <div className="category-name">색상</div>
                        <div className="colors">
                            <ColorPicker
                            color1="#3C2005"
                            color2="#AE8560"
                            color3=""/>
                        </div>
                    </div>
                    <div className="category2">
                        <div className="category-name">레시피</div>
                        <ViewWriteRecipe line1={recipeLine1} line2={recipeLine2} line3={recipeLine3} />
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
