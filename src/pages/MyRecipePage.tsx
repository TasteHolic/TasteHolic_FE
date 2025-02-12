import React, { useState, useEffect } from "react";
import "./MyRecipePage.css";
import RecipeHeader from "../components/Header/RecipeHeader";
import CocktailCard from "../components/CocktailCard";
import { image } from "framer-motion/client";
import RecipeModal from "../components/WriteRecipe";
import FloatingButton from "../components/FloatingButton";
import Footer from "../components/Footer";
import RecipeView from "../components/recipe/viewRecipe/RecipeView";
import RecipeEdit from "../components/recipe/editRecipe/RecipeEdit";

const cocktails = [
  {
    name: "Old Fashioned",
    image: "/image/recipeimage1.png",
    flavor: ["달콤함", "드라이함"],
    aroma: ["바닐라", "오크"],
    ingredients: ["위스키", "설탕", "비터스"],
    alcoholPer: ["40% 이상"],
    glass: ["올드패션드 글라스"],
    recipeLine1: "설탕과 비터스를 녹인다.",
    recipeLine2: "위스키를 추가하고 저어준다.",
    recipeLine3: "얼음과 함께 제공한다.",
  },
  {
    name: "Black Russian",
    image: "/image/recipeimage2.png",
    flavor: ["시트러스", "상쾌함"],
    aroma: ["라임", "오렌지"],
    ingredients: ["데킬라", "트리플 섹", "라임 주스"],
    alcoholPer: ["30-40%"],
    glass: ["마가리타 글라스"],
    recipeLine1: "모든 재료를 섞는다.",
    recipeLine2: "쉐이킹 후, 소금이 뿌려진 글라스에 따른다.",
    recipeLine3: "라임 조각을 올려 장식한다.",
  },
  {
    name: "Margarita",
    image: "/image/recipeimage3.png",
    flavor: ["시트러스", "상쾌함"],
    aroma: ["라임", "오렌지"],
    ingredients: ["데킬라", "트리플 섹", "라임 주스"],
    alcoholPer: ["30-40%"],
    glass: ["마가리타 글라스"],
    recipeLine1: "모든 재료를 섞는다.",
    recipeLine2: "쉐이킹 후, 소금이 뿌려진 글라스에 따른다.",
    recipeLine3: "라임 조각을 올려 장식한다.",
  },
  {
    name: "Mojito",
    image: "/image/recipeimage4.png",
    flavor: ["시트러스", "상쾌함"],
    aroma: ["라임", "오렌지"],
    ingredients: ["데킬라", "트리플 섹", "라임 주스"],
    alcoholPer: ["30-40%"],
    glass: ["마가리타 글라스"],
    recipeLine1: "모든 재료를 섞는다.",
    recipeLine2: "쉐이킹 후, 소금이 뿌려진 글라스에 따른다.",
    recipeLine3: "라임 조각을 올려 장식한다.",
  },
  {
    name: "yellow",
    image: "/image/recipeimage5.png",
    flavor: ["시트러스", "상쾌함"],
    aroma: ["라임", "오렌지"],
    ingredients: ["데킬라", "트리플 섹", "라임 주스"],
    alcoholPer: ["30-40%"],
    glass: ["마가리타 글라스"],
    recipeLine1: "모든 재료를 섞는다.",
    recipeLine2: "쉐이킹 후, 소금이 뿌려진 글라스에 따른다.",
    recipeLine3: "라임 조각을 올려 장식한다.",
  },
  {
    name: "whisky shower",
    image: "/image/recipeimage6.png",
    flavor: ["시트러스", "상쾌함"],
    aroma: ["라임", "오렌지"],
    ingredients: ["데킬라", "트리플 섹", "라임 주스"],
    alcoholPer: ["30-40%"],
    glass: ["마가리타 글라스"],
    recipeLine1: "모든 재료를 섞는다.",
    recipeLine2: "쉐이킹 후, 소금이 뿌려진 글라스에 따른다.",
    recipeLine3: "라임 조각을 올려 장식한다.",
  },
  {
    name: "whisky sho",
    image: "/image/recipeimage7.png",
    flavor: ["시트러스", "상쾌함"],
    aroma: ["라임", "오렌지"],
    ingredients: ["데킬라", "트리플 섹", "라임 주스"],
    alcoholPer: ["30-40%"],
    glass: ["마가리타 글라스"],
    recipeLine1: "모든 재료를 섞는다.",
    recipeLine2: "쉐이킹 후, 소금이 뿌려진 글라스에 따른다.",
    recipeLine3: "라임 조각을 올려 장식한다.",
  },
  {
    name: "whisky showe",
    image: "/image/recipeimage8.png",
    flavor: ["시트러스", "상쾌함"],
    aroma: ["라임", "오렌지"],
    ingredients: ["데킬라", "트리플 섹", "라임 주스"],
    alcoholPer: ["30-40%"],
    glass: ["마가리타 글라스"],
    recipeLine1: "모든 재료를 섞는다.",
    recipeLine2: "쉐이킹 후, 소금이 뿌려진 글라스에 따른다.",
    recipeLine3: "라임 조각을 올려 장식한다.",
  },
  {
    name: "whisky show",
    image: "/image/recipeimage9.png",
    flavor: ["시트러스", "상쾌함"],
    aroma: ["라임", "오렌지"],
    ingredients: ["데킬라", "트리플 섹", "라임 주스"],
    alcoholPer: ["30-40%"],
    glass: ["마가리타 글라스"],
    recipeLine1: "모든 재료를 섞는다.",
    recipeLine2: "쉐이킹 후, 소금이 뿌려진 글라스에 따른다.",
    recipeLine3: "라임 조각을 올려 장식한다.",
  },
];

// props에 onCocktailSelect 추가
interface MyRecipePageProps {
  onCocktailSelect?: (cocktail: { name: string; image: string }) => void;
}

const MyRecipePage: React.FC<MyRecipePageProps> = ({ onCocktailSelect }) => {
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [selectedCocktail, setSelectedCocktail] = useState<
    (typeof cocktails)[0] | null
  >(null);
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 여부

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
        <button
          className="addrecipe"
          onClick={() => setIsRecipeModalOpen(true)}
        >
          <svg
            className="plusicon"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 10.8327H11.3333V14.9993C11.3333 15.4577 10.9583 15.8327 10.5 15.8327C10.0416 15.8327 9.66663 15.4577 9.66663 14.9993V10.8327H5.49996C5.04163 10.8327 4.66663 10.4577 4.66663 9.99935C4.66663 9.54102 5.04163 9.16602 5.49996 9.16602H9.66663V4.99935C9.66663 4.54102 10.0416 4.16602 10.5 4.16602C10.9583 4.16602 11.3333 4.54102 11.3333 4.99935V9.16602H15.5C15.9583 9.16602 16.3333 9.54102 16.3333 9.99935C16.3333 10.4577 15.9583 10.8327 15.5 10.8327Z"
              fill="#F3F5F6"
            />
          </svg>
          레시피 등록하기
        </button>
      </div>

      {isRecipeModalOpen && (
        <RecipeModal
          isOpen={isRecipeModalOpen}
          onClose={() => setIsRecipeModalOpen(false)}
        />
      )}
      <div className="recipes-container">
        {cocktails.map((cocktail) => (
          <CocktailCard
            key={cocktail.name}
            name={cocktail.name}
            image={cocktail.image}
            onClick={() => setSelectedCocktail(cocktail)}
            isSelected={selectedCocktail?.name === cocktail.name} // ✅ 선택된 칵테일인지 체크
          />
        ))}
      </div>
      {selectedCocktail &&
        (isEditMode ? (
          <RecipeEdit
            drinkName={selectedCocktail.name}
            flavor={selectedCocktail.flavor}
            aroma={selectedCocktail.aroma}
            ingredients={selectedCocktail.ingredients}
            alcoholPer={
              selectedCocktail.alcoholPer ? selectedCocktail.alcoholPer[0] : ""
            }
            glass={selectedCocktail.glass ? selectedCocktail.glass[0] : ""}
            recipeLine1={selectedCocktail.recipeLine1}
            recipeLine2={selectedCocktail.recipeLine2}
            recipeLine3={selectedCocktail.recipeLine3}
            onReadMore={() => console.log("자세히 보기 클릭")}
            onCancel={() => {
              setIsEditMode(false);
            }}
            onSave={() => {
              console.log("레시피 저장 완료");
              setIsEditMode(false);
            }}
          />
        ) : (
          <RecipeView
            drinkName={selectedCocktail.name}
            flavor={selectedCocktail.flavor}
            aroma={selectedCocktail.aroma}
            ingredients={selectedCocktail.ingredients}
            alcoholPer={selectedCocktail.alcoholPer}
            glass={selectedCocktail.glass}
            recipeLine1={selectedCocktail.recipeLine1}
            recipeLine2={selectedCocktail.recipeLine2}
            recipeLine3={selectedCocktail.recipeLine3}
            onReadMore={() => console.log("자세히 보기 클릭")}
            onCancel={() => setSelectedCocktail(null)} // 모달 닫기
            onEdit={() => setIsEditMode(true)}
          />
        ))}

      <FloatingButton />
      <Footer />
    </>
  );
};

export default MyRecipePage;
