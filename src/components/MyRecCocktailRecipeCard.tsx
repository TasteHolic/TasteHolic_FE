import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyRecCocktailRecipeCard.css";

interface CocktailRecipeCardProps {
  recipeId: number;
  type: "cocktail" | "user";
  onToggleSave: (newType: "cocktail" | "user") => void;
  onClick: () => void;
}

const CocktailRecipeCard: React.FC<CocktailRecipeCardProps> = ({
  recipeId,
  type,
  onToggleSave,
  onClick,
}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("/image/image 92.png");
  const [description, setDescription] = useState("");
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [isMyBar, setIsMyBar] = useState(false);

  const isSaved = type === "user";

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `http://54.180.45.230:3000/api/v1/recipes/${recipeId}?type=${type}`
        );

        if (response.data.resultType === "SUCCESS") {
          const recipe = response.data.success.recipe;
          setName(recipe.nameEng);
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

    const fetchMyBar = async () => {
      try {
        const response = await axios.get("http://54.180.45.230:3000/api/v1/users/my-bar/view");
        if (response.data.resultType === "SUCCESS") {
          const myBarList = response.data.success.data;
          setIsMyBar(myBarList.some((item: any) => item.id === recipeId));
        }
      } catch (error) {
        console.error("마이바 정보 불러오기 실패:", error);
      }
    };

    fetchRecipeDetails();
    fetchMyBar();
  }, [recipeId, type]);

  const handleToggleLike = async () => {
    try {
      const newType = isSaved ? "cocktail" : "user";
      const url = isSaved
        ? `http://54.180.45.230:3000/api/v1/recipes/${recipeId}/like/cancel?type=${type}`
        : `http://54.180.45.230:3000/api/v1/recipes/${recipeId}/like?type=${type}`;

      const response = await axios.patch(url);

      if (response.data.resultType === "SUCCESS") {
        setLikes(response.data.success.likes);
        onToggleSave(newType);
        setIsMyBar(newType === "user");
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data.error?.errorCode === "R001") {
          alert("존재하지 않는 레시피입니다.");
        } else if (status === 409 && data.error?.errorCode === "R002") {
          alert("이미 좋아요를 눌렀습니다.");
        } else {
          alert("좋아요 처리 중 오류가 발생했습니다.");
        }
      } else {
        alert("서버와의 연결이 원활하지 않습니다.");
      }
      console.error("좋아요 처리 실패:", error);
    }
  };

  return (
    <div className="cocktailrecipe-card" onClick={onClick}>
      <button
        className="save-icon"
        onClick={(e) => {
          e.stopPropagation();
          handleToggleLike();
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="26" viewBox="0 0 23 26" fill={isSaved ? "#ffffff" : "none"}>
          <path d="M1 1.04102V24.9604L11.3855 18.3739L21.4 24.9604V1.04102H1Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isMyBar && <div className="my-bar-label">My Bar ✔</div>}

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
