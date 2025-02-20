import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyRecCocktailRecipeCard.css";

interface CocktailRecipeCardProps {
  recipeId: number;
  type: "user" | "cocktail";
  onToggleSave: () => void;
  onClick: () => void;
  isMyBar: boolean;
}

const CocktailRecipeCard: React.FC<CocktailRecipeCardProps> = ({
  recipeId,
  type,
  onToggleSave,
  onClick,
  isMyBar
}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("/image/image 92.png");
  const [description, setDescription] = useState("");
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [favRecipes, setFavRecipes] = useState<Set<number>>(new Set());
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `http://54.180.45.230:3000/api/v1/recipes/${recipeId}?type=${type}`
        );

        if (response.data.resultType === "SUCCESS") {
          const recipe = response.data.success.recipe;
          setName(recipe.name);
          setImage(recipe.imageUrl || "/image/image 92.png");
          setViews(recipe.views);
          setLikes(recipe.likes);

          // 첫 번째 재료 가져와서 "양, 재료명" 형태로 설정
          const firstIngredient = Object.entries(recipe.ingredients)[0];
          if (firstIngredient) {
            setDescription(`${firstIngredient[1]}, ${firstIngredient[0]}`);
          }
        }
      } catch (error) {
        console.error("레시피 상세 정보 불러오기 실패:", error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId, type]);

  useEffect(() => {
    const fetchFavRecipes = async () => {
      const token = localStorage.getItem("token");
        if (!token) {
            console.log("비로그인 유저");
            return;
        }
        try {
            const response = await axios.get("http://54.180.45.230:3000/api/v1/users/recipes/fav", 
              {headers: { Authorization: `Bearer ${token}` },}
          );

            if (response.data && response.data.recipes) {
                const favIds = new Set<number>(response.data.recipes.map((recipe: any) => recipe.id));
                setFavRecipes(favIds); 
            }
            
            
        } catch (error) {
            console.error("좋아요한 레시피 목록 불러오기 실패:", error);
        }
    };

    fetchFavRecipes();
}, [favRecipes]);

useEffect(() => {
  setIsSaved(favRecipes.has(recipeId));
}, [favRecipes, recipeId]);

  return (
    <div className="cocktailrecipe-card" onClick={onClick}>
      <button
        className="save-icon"
        onClick={(e) => {
          e.stopPropagation();
          onToggleSave();
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="26" viewBox="0 0 23 26" fill={isSaved ? "#ffffff" : "none"}>
          <path d="M1 1.04102V24.9604L11.3855 18.3739L21.4 24.9604V1.04102H1Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isMyBar && <div className="my-bar-label">
        My Bar
        <img src="/image/Done.png" alt="My Bar" className="my-bar-check-icon"/>
      </div>}

      <div className="image-container">
        <img src={image} alt={name} className="cocktailrecipe-image" />
      </div>

      <div className="cocktail-info">
        <div className="text">
          <p className="cocktail-description">{description}</p>
          <h3 className="cocktail-name">{name}</h3>
          <div className="cocktail-meta">
            <div className="count">
              <img src="/image/iconamoon_eye-duotone.png" className="count-img" />
              <div className="count-number">{views}</div>
            </div>
            <div className="count">
              <img src="/image/Group 913.png" className="count-img" />
              <div className="count-number">{likes}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailRecipeCard;
