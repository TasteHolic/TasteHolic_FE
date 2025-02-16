import "./ExploreRecipe.css"
import ViewWriteRecipe from "../viewRecipe/ViewWriteRecipe";

export interface ingredients {
    ingredient: string;
    amount: string;
}

interface ExploreRecipeProps {
    exploreTitle: string; //탐색창 이름
    drinkName: string; //칵테일 이름
    imgSrc: string; //배경 이미지
    viewCount: number; //조회수
    favoriteCount: number; // 하트수

    ingredients: ingredients[];

    recipeLine1?: string; //레시피 작성
    recipeLine2?: string;
    recipeLine3?: string;
    onCancel: () => void; //cancel 클릭 시
    onSave: () => void; //저장하기 클릭 시
}

const ExploreRecipe: React.FC<ExploreRecipeProps> = ({
    exploreTitle,
    drinkName,
    imgSrc,
    viewCount,
    favoriteCount,
    ingredients,
    recipeLine1,
    recipeLine2,
    recipeLine3,
    onCancel,
    onSave
}) => {
    return(
        <>
        <div className="explore-recipe-container">
            <div className="gradient-over-img"/>
            <img src={imgSrc} className="background-img"/>
            <div className="contents">
                <div className="title">
                    <div className="explore-title">{exploreTitle}</div>
                    <div className="explore-recipe-drink-name">{drinkName}</div>
                    <div className="counts">
                        <div className="count">
                            
                            <img
                                src="/image/iconamoon_eye-duotone.png"
                                className="count-img"
                            />
                            <div className="count-number">{viewCount}</div>
                            
                        </div>
                        <div className="count">
                            <img
                                src="/image/favorite_border.png"
                                className="count-img"
                            />
                            <div className="count-number">{favoriteCount}</div>
                            
                        </div>
                    </div>
                </div>
                <div className="explore-recipe-wrapper">
                <div className="explore-recipe-category">
                    <div className="explore-recipe-category-title">재료</div>
                    <div className="ingredients">
                        {ingredients.map((item, index) => (
                            <div className="ingredient" key={index}>
                                <div className="amount">{item.amount}</div>
                                <div className={`label label-${index + 1}`}>
                                    {item.ingredient}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="explore-recipe-category">
                    <div className="explore-recipe-category-title">레시피</div>
                    <div className="recipe">
                    <ViewWriteRecipe
                        line1={recipeLine1}
                        line2={recipeLine2}
                        line3={recipeLine3}
                        />
                    </div>

                </div>
                </div>
                <div className="explore-recipe-bottom">
                    <button className="cancel-button" onClick={onCancel}>
                        cancel
                    </button>
                    <button className="save-button" onClick={onSave}>
                        저장하기
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default ExploreRecipe;
