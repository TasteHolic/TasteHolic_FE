import React, { useState } from "react";
import CocktailRecipeCard from "../components/CocktailRecipeCard";
import "./RecipeExplore.css";
import FloatingButton from "../components/FloatingButton";
import RecipeHeader from "../components/Header/RecipeHeader";
import Footer from "../components/Footer";

const cocktailData = [
  {
    id: 1,
    name: "피냐콜라다 정복하기",
    image: "/image/recipe1.png",
    description: "1 bottle, beverage coconut cream",
    views: 21,
    likes: 3,
    category: "user",
  },
  {
    id: 2,
    name: "내 방이 칵테일 바가 되는 방법",
    image: "/image/recipe2.png",
    description: "1 bottle, beverage sugar syrup",
    views: 18,
    likes: 5,
    category: "low-alcohol",
  },
  {
    id: 3,
    name: "3가지 재료로 만드는 다이키리",
    image: "/image/recipe3.png",
    description: "1 bottle, beverage honey",
    views: 30,
    likes: 8,
    category: "fruity",
  },
  {
    id: 4,
    name: "피냐콜라다",
    image: "/image/recipe1.png",
    description: "1 bottle, beverage coconut cream",
    views: 21,
    likes: 3,
    category: "user",
  },
  {
    id: 5,
    name: "입문용 칵테일",
    image: "/image/recipe1.png",
    description: "1 bottle, beverage coconut cream",
    views: 11,
    likes: 3,
    category: "user",
  },
  {
    id: 6,
    name: "칵테일",
    image: "/image/recipe1.png",
    description: "1 bottle, beverage coconut cream",
    views: 11,
    likes: 18,
    category: "user",
  },
];

const categories = [
  { id: "user", label: "유저등록" },
  { id: "low-alcohol", label: "논알콜" },
  { id: "high-alcohol", label: "고도수" },
  { id: "fruity", label: "프루티" },
  { id: "few-ingredients", label: "재료 2개 이하" },
  {
    id: "saved",
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group 728">
          <circle
            id="Ellipse 106"
            cx="15"
            cy="15"
            r="15"
            fill="white"
            fill-opacity="0.2"
          />
          <g id="Group 720">
            <path
              id="Vector 209"
              d="M8.65283 6.92383V23.0777L15.4081 18.6295L21.9221 23.0777V6.92383H8.65283Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </g>
      </svg>
    ),
  },
];

const RecipeExplore: React.FC = () => {
  const [savedRecipes, setSavedRecipes] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [selectedCategory, setSelectedCategory] = useState("user");

  const toggleSaveRecipe = (id: number) => {
    setSavedRecipes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCardClick = (recipe: any) => {
    alert(`레시피 상세 보기: ${recipe.name}`); // 기존 기능 유지
  };

  const filteredRecipes =
    selectedCategory === "saved"
      ? cocktailData.filter((recipe) => savedRecipes[recipe.id])
      : cocktailData.filter((recipe) => recipe.category === selectedCategory);

  return (
    <>
      <RecipeHeader />
      <div className="recipe-explore">
        <h1>레시피 탐색</h1>
        <p className="subtitle">
          원하는 레시피 및 Drink와 레시피를 자유롭게 찾아보세요.
        </p>

        {/* 메뉴바 */}
        <div className="menu-bar">
          <div className="buttons">
            {categories.map(({ id, label, icon }) => (
              <button
                key={id}
                className={`menu-item ${
                  selectedCategory === id ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(id)}
              >
                {icon && <span className="menu-icon">{icon}</span>}
                {label}
              </button>
            ))}
          </div>
          <div
            className="active-indicator"
            style={{
              left: `${
                categories.findIndex((c) => c.id === selectedCategory) * 190
              }px`,
            }}
          />
        </div>

        {/* 칵테일 카드 리스트 */}
        <div className="recipe-list">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <CocktailRecipeCard
                key={recipe.id}
                name={recipe.name}
                image={recipe.image}
                description={recipe.description}
                views={recipe.views}
                likes={recipe.likes}
                isSaved={!!savedRecipes[recipe.id]}
                onToggleSave={() => toggleSaveRecipe(recipe.id)}
                onClick={() => handleCardClick(recipe)}
              />
            ))
          ) : (
            <div className="empty-message">
              <svg
                className="emptyicon"
                width="131"
                height="131"
                viewBox="0 0 131 131"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="65.2471" cy="65.2471" r="65.2471" fill="#292929" />
                <path
                  d="M38 63H92"
                  stroke="#C8CACB"
                  stroke-width="4"
                  stroke-linecap="round"
                />
                <path
                  d="M65 38L65 92"
                  stroke="#C8CACB"
                  stroke-width="4"
                  stroke-linecap="round"
                />
                <circle cx="65.2471" cy="65.2471" r="65.2471" fill="#292929" />
                <path
                  d="M70.5312 36.4375L69.8281 76.6719H62.0938L61.3906 36.4375H70.5312ZM60.4531 88C60.4141 84.9531 62.9531 82.4531 66 82.4531C69.0078 82.4531 71.5078 84.9531 71.5469 88C71.5078 91.0469 69.0078 93.5078 66 93.5469C62.9531 93.5078 60.4141 91.0469 60.4531 88Z"
                  fill="#C8CACB"
                />
              </svg>
              <p>텅 비었네요!</p>
              <p>오늘의 특별한 한 잔을 기록하러 가볼까요?</p>
            </div>
          )}
        </div>
        <FloatingButton />
      </div>
      <Footer />
    </>
  );
};

export default RecipeExplore;
