import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyRecipePage.css";
import RecipeHeader from "../components/Header/RecipeHeader";
import RecipeCard from "../components/ReipeCard";
import RecipeModal from "../components/WriteRecipe";
import FloatingButton from "../components/FloatingButton";
import Footer from "../components/Footer";
import RecipeView from "../components/recipe/viewRecipe/RecipeView";
import RecipeEdit from "../components/recipe/editRecipe/RecipeEdit";
import ExploreRecipe from "../components/recipe/explore/ExploreRecipe";

// props에 onCocktailSelect 추가
interface MyRecipePageProps {
  onCocktailSelect?: (cocktail: { name: string; image: string }) => void;
}

const MyRecipePage: React.FC<MyRecipePageProps> = ({ onCocktailSelect }) => {
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedCocktail, setSelectedCocktail] = useState<any | null>(null);
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 여부
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [exploreCocktail, setExploreCocktail] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const fetchMyRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://54.180.45.230:3000/api/v1/users/recipes");
      if (response.data.success && response.data.success.recipes) {
        setRecipes(response.data.success.recipes);
      }
    } catch (error) {
      console.error("내 레시피 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <RecipeHeader />
      <div className="Myrecipe-title">
        <h1>내 레시피</h1>
        <h3>나만의 칵테일을 만들고, 공유해보세요.</h3>
      </div>
      <div className="list-title">
        <h2>레시피 리스트</h2>
      </div>
      <div className="line-container">
        <div className="long-line"></div>
        <div className="short-line"></div>
      </div>

      <div className="addrecipe-container">
        <button className="addrecipe" onClick={() => setIsRecipeModalOpen(true)}>
          <svg className="plusicon" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 10.8327H11.3333V14.9993C11.3333 15.4577 10.9583 15.8327 10.5 15.8327C10.0416 15.8327 9.66663 15.4577 9.66663 14.9993V10.8327H5.49996C5.04163 10.8327 4.66663 10.4577 4.66663 9.99935C4.66663 9.54102 5.04163 9.16602 5.49996 9.16602H9.66663V4.99935C9.66663 4.54102 10.0416 4.16602 10.5 4.16602C10.9583 4.16602 11.3333 4.54102 11.3333 4.99935V9.16602H15.5C15.9583 9.16602 16.3333 9.54102 16.3333 9.99935C16.3333 10.4577 15.9583 10.8327 15.5 10.8327Z" fill="#F3F5F6"/>
          </svg>
          레시피 등록하기
        </button>
      </div>
      
      {isRecipeModalOpen &&
            <RecipeModal 
            isOpen={isRecipeModalOpen} 
            onClose={() => setIsRecipeModalOpen(false)} />
      }

      <div className="recipes-container">
        {loading ? (
          <p>loading...</p>
        ) : recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipeId={recipe.id}
              type={recipe.type}
              onClick={() => setSelectedCocktail(recipe)}
              isSelected={selectedCocktail?.id === recipe.id}
            />
          ))
        ) : (
          <div className="my-empty-message">
          <svg
            className="my-emptyicon"
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

      {selectedCocktail &&
        (isEditMode ? (
          <div className="myrecipe-recipe-background">
          <div className="myrecipe-modal">
          <RecipeEdit
            recipeId={selectedCocktail.id}
            onReadMore={() => {
              setExploreCocktail(selectedCocktail);
              setIsExploreOpen(true);
              setSelectedCocktail(null);
            }}
            onCancel={() => {
              setIsEditMode(false);
            }}
            onSave={() => {
              console.log("레시피 저장 완료");
              setIsEditMode(false);
              setSelectedCocktail(null);
            }}
          />
          </div>
          </div>
        ) : (
          <div className="myrecipe-recipe-background">
          <div className="myrecipe-modal">
          <RecipeView
            recipeId={selectedCocktail.id}
            type={selectedCocktail.type}
            onReadMore={() => {
              setExploreCocktail(selectedCocktail);
              setIsExploreOpen(true);
              setSelectedCocktail(null);
            }}
            onCancel={() => setSelectedCocktail(null)} // 모달 닫기
            onEdit={() => setIsEditMode(true)}
          />
          </div>
          </div>
        ))}

      {isExploreOpen && exploreCocktail && (
        <div className="myrecipe-recipe-background">
          <div className="myrecipe-modal">
            <ExploreRecipe
              recipeId={exploreCocktail.id}
              type={exploreCocktail.type}
              onCancel={() => setIsExploreOpen(false)}
            />
          </div>
        </div>
      )}
      <FloatingButton />
      <Footer />
    </>
  );
};

export default MyRecipePage;
