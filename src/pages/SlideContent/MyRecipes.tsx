import React, { useState } from "react";
import "./MyRecipes.css";

import arrowDown from "/image/arrow-down.png";
import arrowUp from "/image/arrow-up.png";

interface Recipe {
    id: number;
    title: string;
    ingredientsCount: number;
    stepsCount: number;
    alcoholContent: string;
    views: number;
    likes: number;
    createdAt: string;
}

const MyRecipe: React.FC = () => {
    const [sortOption, setSortOption] = useState<string>("최신순");
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const recipes: Recipe[] = [
        {
            id: 1,
            title: "그래나딘 시럽만 있으면 되는 데킬라 선라이즈",
            ingredientsCount: 4,
            stepsCount: 3,
            alcoholContent: "Light",
            views: 21,
            likes: 4,
            createdAt: "2025. 1. 12.",
        },
        {
            id: 2,
            title: "남은 라임으로 만드는 진토닉",
            ingredientsCount: 3,
            stepsCount: 3,
            alcoholContent: "Light",
            views: 21,
            likes: 3,
            createdAt: "2025. 1. 10.",
        },
    ];

    const sortedRecipes = [...recipes].sort((a, b) => {
        if (sortOption === "최신순") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortOption === "오래된 순") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        if (sortOption === "찜 많은 순") return b.likes - a.likes;
        return 0;
    });

    return (
        <div className="my-recipe-container">
            <div className="my-recipe-dropdown">
                <button
                    className={`my-recipe-dropdown-btn ${sortOption === "기본" ? "default" : "active"}`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    {sortOption}
                </button>
                <button className="arrow-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <img src={isDropdownOpen ? arrowUp : arrowDown} alt="드롭다운 화살표" />
                </button>
                {isDropdownOpen && (
                    <ul className="my-recipe-dropdown-menu">
                        {["최신순", "오래된 순", "찜 많은 순"].map((option) => (
                            <li
                                key={option}
                                className="my-recipe-dropdown-item"
                                onClick={() => {
                                    setSortOption(option);
                                    setIsDropdownOpen(false);
                                }}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="slide-my-recipe-list">
                {sortedRecipes.map((recipe) => (
                    <div key={recipe.id} className="slide-my-recipe-card">
                        <div className="slide-my-recipe-header">
                            <div>{recipe.createdAt}</div>
                            <div className="views-likes-container">
                                <img src="/image/eye.png" alt="조회수" />{recipe.views}
                                <img src="/image/saveIcon.png" alt="저장수" />{recipe.likes}
                            </div>
                        </div>
                        <div className="slide-my-recipe-title">
                            <span>{recipe.title}</span>
                        </div>
                        <div className="slide-my-recipe-container">
                            <div className="slide-my-recipe-details">
                                <span className="slide-feature1">
                                    <div className="slide-feature-circle"><img src="\image\water_drop.png" alt="물방울 이미지"></img>재료 {recipe.ingredientsCount}개</div>
                                </span>
                                <span className="slide-feature2">
                                    <div className="slide-feature-circle"><img src="\image\Clock.png" alt="시계 이미지"></img>{recipe.stepsCount}단계</div>
                                </span>
                                <span className="slide-feature3">
                                    <div className="slide-feature-circle"><img src="\image\local_bar.png" alt="칵테일 이미지"></img>도수 {recipe.alcoholContent}</div>
                                </span>
                            </div>
                            <div className="slide-recipe-footer">
                                <button
                                    className="slide-view-btn"
                                    onClick={() => window.location.href = `/recipe/${recipe.id}`}
                                >
                                    전체글 보기
                                </button>
                                <button
                                    className="slide-edit-btn"
                                    onClick={() => window.location.href = `/edit/${recipe.id}`}
                                >
                                    수정하기
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyRecipe;