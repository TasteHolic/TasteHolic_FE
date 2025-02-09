import "./ExploreRecipe.css"
import ViewWriteRecipe from "../viewRecipe/ViewWriteRecipe";

interface ExploreRecipeProps {
    exploreTitle: string; //탐색창 이름
    drinkName: string; //칵테일 이름
    imgSrc: string; //배경 이미지
    viewCount: number; //조회수
    favoriteCount: number; // 하트수

    amount1: string; //첫 번째 재료양
    ingredient1: string; //첫 번째 재료
    amount2: string; //두 번째 재료양
    ingredient2: string; //두 번째 재료
    amount3: string; //세 번째 재료양
    ingredient3: string; //세 번째 재료

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
    amount1,
    amount2,
    amount3,
    ingredient1,
    ingredient2,
    ingredient3,
    recipeLine1,
    recipeLine2,
    recipeLine3,
    onCancel,
    onSave
}) => {
    return(
        <>
        <div className="explore-recipe-container">
            <img src={imgSrc} className="background-img"/>
            <div className="contents">
                <div className="title">
                    <div className="explore-title">{exploreTitle}</div>
                    <div className="drink-name">{drinkName}</div>
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
                <div className="category">
                    <div className="category-title">재료</div>
                    <div className="ingredients">
                        <div className="ingredient">
                            <div className="amount">
                                {amount1}
                            </div>
                            <div className="label label-1">
                                {ingredient1}
                            </div>
                        </div>
                        <div className="ingredient">
                            <div className="amount">
                                {amount2}
                            </div>
                            <div className="label label-2">
                                {ingredient2}
                            </div>
                        </div>
                        <div className="ingredient">
                            <div className="amount">
                                {amount3}
                            </div>
                            <div className="label label-3">
                                {ingredient3}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="category">
                    <div className="category-title">레시피</div>
                    <div className="recipe">
                    <ViewWriteRecipe
                        line1={recipeLine1}
                        line2={recipeLine2}
                        line3={recipeLine3}
                        />
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
        </div>
        </>
    );
};

export default ExploreRecipe;