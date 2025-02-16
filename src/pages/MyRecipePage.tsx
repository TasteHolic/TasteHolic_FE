import React, { useState, useEffect } from "react";
import "./MyRecipePage.css";
import RecipeHeader from "../components/Header/RecipeHeader";
import RecipeCard from "../components/ReipeCard";
import { image } from "framer-motion/client";
import RecipeModal from "../components/WriteRecipe";
import FloatingButton from "../components/FloatingButton";
import Footer from "../components/Footer";
import RecipeView from "../components/recipe/viewRecipe/RecipeView";
import RecipeEdit from "../components/recipe/editRecipe/RecipeEdit";
import ExploreRecipe from "../components/recipe/explore/ExploreRecipe";

const cocktails = [
  {
    name: "Old Fashioned",
    image: "/image/recipe1.png",
    ismybar: true,
    keyWords: [
      { label: "칵테일", type: "variety" as const},
      { label: "상큼한", type: "flavor" as const},
      { label: "부드러운", type: "mood" as const},
    ],
    flavor: ["달콤함", "드라이함"],
    aroma: ["바닐라", "오크"],
    ingredients: ["위스키", "설탕", "비터스"],
    alcoholPer: ["40% 이상"],
    glass: ["올드패션드 글라스"],
    hexColor1: "#3C2005",
    hexColor2: "#AE8560",
    hexColor3: "",
    recipeLine1: "설탕과 비터스를 녹인다.",
    recipeLine2: "위스키를 추가하고 저어준다.",
    recipeLine3: "얼음과 함께 제공한다.",
  },
  {
    name: "Black Russian",
    image: "/image/recipeimage2.png",
    ismybar: false,
    keyWords: [
      { label: "칵테일", type: "variety" as const},
      { label: "상큼한", type: "flavor" as const},
      { label: "부드러운", type: "mood" as const},
    ],
    flavor: ["시트러스", "상쾌함"],
    aroma: ["라임", "오렌지"],
    ingredients: ["데킬라", "트리플 섹", "라임 주스"],
    alcoholPer: ["30-40%"],
    glass: ["마가리타 글라스"],
    hexColor1: "#3C2005",
    hexColor2: "#AE8560",
    hexColor3: "",
    recipeLine1: "모든 재료를 섞는다.",
    recipeLine2: "쉐이킹 후, 소금이 뿌려진 글라스에 따른다.",
    recipeLine3: "라임 조각을 올려 장식한다.",
  },
  {
    name: "Margarita",
    image: "/image/recipeimage3.png",
    ismybar: true,
    keyWords: [
      { label: "칵테일", type: "variety" as const},
      { label: "상큼한", type: "flavor" as const},
      { label: "부드러운", type: "mood" as const},
    ],
    flavor: ["시트러스", "상쾌함"],
    aroma: ["라임", "오렌지"],
    ingredients: ["데킬라", "트리플 섹", "라임 주스"],
    alcoholPer: ["30-40%"],
    glass: ["마가리타 글라스"],
    hexColor1: "#3C2005",
    hexColor2: "#AE8560",
    hexColor3: "",
    recipeLine1: "모든 재료를 섞는다.",
    recipeLine2: "쉐이킹 후, 소금이 뿌려진 글라스에 따른다.",
    recipeLine3: "라임 조각을 올려 장식한다.",
  },
  {
    name: "Mojito",
    ismybar: false,
    image: "/image/recipeimage4.png",
    keyWords: [
      { label: "칵테일", type: "variety" as const},
      { label: "상큼한", type: "flavor" as const},
      { label: "부드러운", type: "mood" as const},
    ],
    flavor: ["시트러스", "상쾌함"],
    aroma: ["라임", "오렌지"],
    ingredients: ["데킬라", "트리플 섹", "라임 주스"],
    alcoholPer: ["30-40%"],
    glass: ["마가리타 글라스"],
    hexColor1: "#3C2005",
    hexColor2: "#AE8560",
    hexColor3: "",
    recipeLine1: "모든 재료를 섞는다.",
    recipeLine2: "쉐이킹 후, 소금이 뿌려진 글라스에 따른다.",
    recipeLine3: "라임 조각을 올려 장식한다.",
  },
  {
    name: "yellow",
    image: "/image/recipeimage5.png",
    ismybar: false,
    keyWords: [
      { label: "칵테일", type: "variety" as const},
      { label: "상큼한", type: "flavor" as const},
      { label: "부드러운", type: "mood" as const},
    ],
    flavor: ["시트러스", "상쾌함"],
    aroma: ["라임", "오렌지"],
    ingredients: ["데킬라", "트리플 섹", "라임 주스"],
    alcoholPer: ["30-40%"],
    glass: ["마가리타 글라스"],
    hexColor1: "#3C2005",
    hexColor2: "#AE8560",
    hexColor3: "",
    recipeLine1: "모든 재료를 섞는다.",
    recipeLine2: "쉐이킹 후, 소금이 뿌려진 글라스에 따른다.",
    recipeLine3: "라임 조각을 올려 장식한다.",
  },
  {
    name: "whisky shower",
    image: "/image/recipeimage6.png",
    ismybar: false,
    keyWords: [
      { label: "칵테일", type: "variety" as const},
      { label: "상큼한", type: "flavor" as const},
      { label: "부드러운", type: "mood" as const},
    ],
    flavor: ["시트러스", "상쾌함"],
    aroma: ["라임", "오렌지"],
    ingredients: ["데킬라", "트리플 섹", "라임 주스"],
    alcoholPer: ["30-40%"],
    glass: ["마가리타 글라스"],
    hexColor1: "#3C2005",
    hexColor2: "#AE8560",
    hexColor3: "",
    recipeLine1: "모든 재료를 섞는다.",
    recipeLine2: "쉐이킹 후, 소금이 뿌려진 글라스에 따른다.",
    recipeLine3: "라임 조각을 올려 장식한다.",
  },
  {
    name: "whisky sho",
    ismybar: false,
    keyWords: [
      { label: "칵테일", type: "variety" as const},
      { label: "상큼한", type: "flavor" as const},
      { label: "부드러운", type: "mood" as const},
    ],
    image: "/image/recipeimage7.png",
    flavor: ["시트러스", "상쾌함"],
    aroma: ["라임", "오렌지"],
    ingredients: ["데킬라", "트리플 섹", "라임 주스"],
    alcoholPer: ["30-40%"],
    glass: ["마가리타 글라스"],
    hexColor1: "#3C2005",
    hexColor2: "#AE8560",
    hexColor3: "",
    recipeLine1: "모든 재료를 섞는다.",
    recipeLine2: "쉐이킹 후, 소금이 뿌려진 글라스에 따른다.",
    recipeLine3: "라임 조각을 올려 장식한다.",
  },
  {
    name: "whisky showe",
    image: "/image/recipeimage8.png",
    ismybar: false,
    keyWords: [
      { label: "칵테일", type: "variety" as const},
      { label: "상큼한", type: "flavor" as const},
      { label: "부드러운", type: "mood" as const},
    ],
    flavor: ["시트러스", "상쾌함"],
    aroma: ["라임", "오렌지"],
    ingredients: ["데킬라", "트리플 섹", "라임 주스"],
    alcoholPer: ["30-40%"],
    glass: ["마가리타 글라스"],
    hexColor1: "#3C2005",
    hexColor2: "#AE8560",
    hexColor3: "",
    recipeLine1: "모든 재료를 섞는다.",
    recipeLine2: "쉐이킹 후, 소금이 뿌려진 글라스에 따른다.",
    recipeLine3: "라임 조각을 올려 장식한다.",
  },
  {
    name: "whisky show",
    image: "/image/recipeimage9.png",
    ismybar: false,
    keyWords: [
      { label: "칵테일", type: "variety" as const},
      { label: "상큼한", type: "flavor" as const},
      { label: "부드러운", type: "mood" as const},
    ],
    flavor: ["시트러스", "상쾌함"],
    aroma: ["라임", "오렌지"],
    ingredients: ["데킬라", "트리플 섹", "라임 주스"],
    alcoholPer: ["30-40%"],
    glass: ["마가리타 글라스"],
    hexColor1: "#3C2005",
    hexColor2: "#AE8560",
    hexColor3: "",
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
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [exploreCocktail, setExploreCocktail] = useState<(typeof cocktails)[0] | null>(null);
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
          <RecipeCard
            name={cocktail.name}
            image={cocktail.image}
            keyWords={cocktail.keyWords}
            isMyBar={cocktail.ismybar}
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
            hexColor1={selectedCocktail.hexColor1}
            hexColor2={selectedCocktail.hexColor2}
            hexColor3={selectedCocktail.hexColor3}
            recipeLine1={selectedCocktail.recipeLine1}
            recipeLine2={selectedCocktail.recipeLine2}
            recipeLine3={selectedCocktail.recipeLine3}
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
        ) : (
          <RecipeView
            drinkName={selectedCocktail.name}
            flavor={selectedCocktail.flavor}
            aroma={selectedCocktail.aroma}
            ingredients={selectedCocktail.ingredients}
            alcoholPer={selectedCocktail.alcoholPer}
            glass={selectedCocktail.glass}
            hexColor1={selectedCocktail.hexColor1}
            hexColor2={selectedCocktail.hexColor2}
            hexColor3={selectedCocktail.hexColor3}
            recipeLine1={selectedCocktail.recipeLine1}
            recipeLine2={selectedCocktail.recipeLine2}
            recipeLine3={selectedCocktail.recipeLine3}
            onReadMore={() => {
              setExploreCocktail(selectedCocktail);
              setIsExploreOpen(true);
              setSelectedCocktail(null);
            }}
            onCancel={() => setSelectedCocktail(null)} // 모달 닫기
            onEdit={() => setIsEditMode(true)}
          />
        ))}
        {isExploreOpen && exploreCocktail && (
  <ExploreRecipe
    exploreTitle="레시피 탐색"
    drinkName={exploreCocktail.name}
    imgSrc={exploreCocktail.image}
    viewCount={123}
    favoriteCount={45}
    amount1="30ml"
    ingredient1={exploreCocktail.ingredients[0] || "재료 없음"}
    amount2="20ml"
    ingredient2={exploreCocktail.ingredients[1] || "재료 없음"}
    amount3="10ml"
    ingredient3={exploreCocktail.ingredients[2] || "재료 없음"}
    recipeLine1={exploreCocktail.recipeLine1}
    recipeLine2={exploreCocktail.recipeLine2}
    recipeLine3={exploreCocktail.recipeLine3}
    onCancel={() => setIsExploreOpen(false)}
    onSave={() => {console.log("레시피 저장!");
      setIsExploreOpen(false);
    }}
  />
)}
      <FloatingButton />
      <Footer />
    </>
  );
};

export default MyRecipePage;
