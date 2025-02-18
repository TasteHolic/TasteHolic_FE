import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CocktailRecipeCard from "../components/MyRecCocktailRecipeCard";
import "./RecipeExplore.css";
import FloatingButton from "../components/FloatingButton";
import ExploreRecipe from "../components/recipe/explore/ExploreRecipe";
import RecipeHeader from "../components/Header/RecipeHeader";
import Footer from "../components/Footer";

const categories = [
  { id: "my", label: "유저등록" },
  { id: "zero", label: "논알콜" },
  { id: "high", label: "고도수" },
  { id: "fruity", label: "프루티" },
  { id: "under2", label: "재료 2개 이하" },
  {
    id: "user",
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Group 728">
          <circle id="Ellipse 106" cx="15" cy="15" r="15" fill="white" fillOpacity="0.2" />
          <g id="Group 720">
            <path
              id="Vector 209"
              d="M8.65283 6.92383V23.0777L15.4081 18.6295L21.9221 23.0777V6.92383H8.65283Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    ),
  },
];

const RecipeExplore: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<{ [key: number]: boolean }>({});
  const [selectedCategory, setSelectedCategory] = useState("my");
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true); 
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchRecipes(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      if (loader.current) {
        const { bottom } = loader.current.getBoundingClientRect();
        if (bottom <= window.innerHeight) {
          fetchRecipes(selectedCategory, true);
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedCategory, cursor]);

  const fetchRecipes = async (category: string, loadMore = false) => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://54.180.45.230:3000/api/v1/recipes?type=${category}`);
      if (response.data.recipes) {
        setRecipes(response.data.recipes);

        setCursor(response.data.nextCursor || null);
        setHasMore(!!response.data.nextCursor);
      }
    } catch (error) {
      console.error("레시피 목록 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSaveRecipe = async (id: number, type: string) => {
    try {
      if (savedRecipes[id]) {
        await axios.patch(`http://54.180.45.230:3000/api/v1/recipes/${id}/like/cancel?type=user`);
      } else {
        await axios.patch(`http://54.180.45.230:3000/api/v1/recipes/${id}/like?type=cocktail`);
      }
      setSavedRecipes((prev) => ({ ...prev, [id]: !prev[id] }));
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCardClick = (recipe: any) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseExploreRecipe = () => {
    setSelectedRecipe(null);
  };

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
              className={`menu-item ${selectedCategory === id ? "active" : ""}`}
              onClick={() => handleCategoryClick(id)}
            >
              {icon && <span className="menu-icon">{icon}</span>}
              {label}
            </button>
            
          ))}
          </div>
          <div className="active-indicator" style={{ left: `${categories.findIndex(c => c.id === selectedCategory) * 190}px` }} />
        </div>

        {/* 칵테일 카드 리스트 */}
        <div className="recipe-list">
          {loading ? (
            <p>loading...</p>
          ) : recipes.length > 0 ? (
            recipes.map((recipe) => (
              <CocktailRecipeCard
                key={recipe.id}
                recipeId={recipe.id}
                type={recipe.type}
                onToggleSave={(newType) => toggleSaveRecipe(recipe.id, newType)}
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

        {selectedRecipe && (
          <div className="explore-recipe-background">
            <div className="explore-recipe">
              <ExploreRecipe
                recipeId={selectedRecipe.id}
                type={selectedRecipe.type}
                onCancel={handleCloseExploreRecipe}
              />
            </div>
          </div>
        )}
      </div>
      <div ref={loader} style={{ height: "10px", background: "transparent" }} />
      <FloatingButton/>
      <Footer />
    </>
  );
};

export default RecipeExplore;
