import React,  { useState } from "react";
import './MyRecipePage.css';
import { useNavigate } from "react-router-dom";
import MainHeader from "../components/Header/MainHeader";
import CocktailCard from "../components/CocktailCard";
import { image } from "framer-motion/client";
import RecipeModal from "../components/WriteRecipe";
import FloatingButton from "../components/FloatingButton";
import Footer from "../components/Footer";

const cocktails = [
    { name: "Old Fashioned", image: "/image/recipeimage1.png" },
    { name: "Black Russian", image: "/image/recipeimage2.png" },
    { name: "Margarita", image: "/image/recipeimage3.png" },
    { name: "Mojito", image: "/image/recipeimage4.png" },
    { name: "yellow", image: "/image/recipeimage5.png"},
    { name: "whisky shower", image: "/image/recipeimage6.png"},
    { name: "whisky sho", image: "/image/recipeimage7.png"},
    { name: "whisky showe", image: "/image/recipeimage8.png"},
    { name: "whisky show", image: "/image/recipeimage9.png"},

  ];

// props에 onCocktailSelect 추가
interface MyRecipePageProps {
    onCocktailSelect?: (cocktail: { name: string; image: string }) => void;
  }
  
  const MyRecipePage: React.FC<MyRecipePageProps> = ({ onCocktailSelect }) => {
    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false); // 팝업 상태
    return (
      <>
        <MainHeader/>
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
        {isRecipeModalOpen && <RecipeModal isOpen={isRecipeModalOpen} onClose={() => setIsRecipeModalOpen(false)} />}
        <div className="recipes-container">
          {cocktails.map((cocktail) => (
            <CocktailCard
              key={cocktail.name}
              name={cocktail.name}
              image={cocktail.image}
              onClick={() => onCocktailSelect?.(cocktail)} // 클릭 시 부모로 데이터 전달
            />
          ))}
        </div>
        <FloatingButton/>
        <Footer/>
      </>
    );
  };
  
export default MyRecipePage;