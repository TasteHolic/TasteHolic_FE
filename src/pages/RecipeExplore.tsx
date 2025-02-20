import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CocktailRecipeCard from "../components/MyRecCocktailRecipeCard";
import "./RecipeExplore.css";
import FloatingButton from "../components/FloatingButton";
import ExploreRecipe from "../components/recipe/explore/ExploreRecipe";
import RecipeHeader from "../components/Header/RecipeHeader";
import Footer from "../components/Footer";

const categories = [
  { id: "user", label: "유저등록" },
  { id: "zero", label: "논알콜" },
  { id: "high", label: "고도수" },
  { id: "fruity", label: "프루티" },
  { id: "under2", label: "재료 2개 이하" },
  {
    id: "fav", //저장한 레시피
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
  const [selectedCategory, setSelectedCategory] = useState<string>(
  localStorage.getItem("selectedCategory") || "user");
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true); 
  const loader = useRef<HTMLDivElement | null>(null);

   const [favRecipes, setFavRecipes] = useState<Set<number>>(new Set());

  useEffect(() => {

    setCursor(null); 
    setHasMore(true);
    setRecipes([]);
    
    const fetchData = async () => {

      await fetchRecipes(selectedCategory);
    };
    
    fetchData();
  }, [selectedCategory]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (loader.current) {
        const { bottom } = loader.current.getBoundingClientRect();
        if (bottom <= window.innerHeight && hasMore && !loading) {
          console.log("스크롤 끝, 추가 데이터 요청");
          fetchRecipes(selectedCategory, true);
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //fetchRecipes
  const fetchRecipes = async (category: string, loadMore = false) => {
    if (!hasMore && loadMore) return;
    if (!loadMore) {
      setLoading(true);
      setCursor(null);
      setHasMore(true);
    }
  
    try {
      let response;
      const token = localStorage.getItem("token");

      if (category === "fav") {
        if (!token) {
          console.warn("로그인이 필요합니다.");
          return;
        }
  
        response = await axios.get("http://54.180.45.230:3000/api/v1/users/recipes/fav", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
      } else if (category === "user") {
        if (!token) return;
  
        response = await axios.get("http://54.180.45.230:3000/api/v1/users/recipes", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
      } else {
        response = await axios.get(`http://54.180.45.230:3000/api/v1/recipes?type=${category}`);
      }
  
      if (response?.data) {
        let recipesData;
        
        if (category === "fav") {
          recipesData = response.data.recipes; 
        } else {
          recipesData = response.data.success?.recipes; 
        }
      
        if (recipesData && Array.isArray(recipesData)) {
          const fetchedRecipes = recipesData.map((recipe: any) => ({
            ...recipe,
            type: category === "user" ? "user" : recipe.type, // user 카테고리에서는 type을 "user"로 설정
          }));
            
          setRecipes(fetchedRecipes);
          setCursor(response.data.nextCursor || null);
          setHasMore(!!response.data.nextCursor);
        } else {
          console.warn("recipes 데이터 없음:", response.data);
          setRecipes([]);
        }
      }
      
  
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data.error?.errorCode === "R103") {
          alert("타입 값이 잘못되었습니다.");
        } else {
          console.error("레시피 목록 불러오기 실패:", error);
        }
      } else {
        console.error("네트워크 오류 또는 서버 응답 없음:", error);
      }
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchRecipes(selectedCategory);
  }, [selectedCategory]);


  const fetchFavRecipes = async () => {

      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }
      
      try {
        const response = await axios.get("http://54.180.45.230:3000/api/v1/users/recipes/fav", {
          headers: { Authorization: `Bearer ${token}` }, 
        });
  
        if (response.data && response.data.recipes) {
          const favIds = new Set<number>(response.data.recipes.map((recipe: any) => recipe.id));
          setFavRecipes(favIds);
        }
      } catch (error) {
        console.error("좋아요한 레시피 목록 불러오기 실패:", error);
      }
  };

  
  //toggleSaveRecipe
  const toggleSaveRecipe = async (id: number, type: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("로그인이 필요합니다.");
        return;
    }
    
    try {
      fetchFavRecipes();
      const isFav = favRecipes.has(id); // 좋아요한 레시피인지 확인
      console.log(isFav);
      const url = isFav
        ? `http://54.180.45.230:3000/api/v1/recipes/${id}/like/cancel?type=${type}`
        : `http://54.180.45.230:3000/api/v1/recipes/${id}/like?type=${type}`;
      console.log(url)
      await axios.patch(url, {}, {
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          }
      });

      console.log("🔍 좋아요 요청:", { id, type, isFav });

      setFavRecipes((prev) => {
        const newFavs = new Set(prev);
        isFav ? newFavs.delete(id) : newFavs.add(id);
        return newFavs;
      });

      fetchFavRecipes();

    } catch (error: any) {
      if (error.response) {
          const { status, data } = error.response;
          console.error("서버 응답 에러:", error.response);
          console.log("서버 응답 데이터:", error.response.data);

          if (status === 400) {
              alert("잘못된 요청: " + (data.error?.reason || "서버 오류"));
          } else if (status === 403) {
              alert("접근 권한 없음");
          } else if (status === 404) {
              alert("존재하지 않는 레시피입니다.");
          } else {
              alert("좋아요 처리 중 오류가 발생했습니다.");
          }
      } else {
          alert("서버와의 연결이 원활하지 않습니다.");
      }
      console.error("좋아요 처리 실패:", error);
  }
};

const handleCategoryClick = (category: string) => {
  if (selectedCategory !== category) {
    setSelectedCategory(category);
    localStorage.setItem("selectedCategory", category);
  }
};

  const handleCardClick = (recipe: any) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseExploreRecipe = () => {
    setSelectedRecipe(null);
  };

  const customPositions: Record<string, number> = {
    user: 0,
    zero: 190,
    high: 375,
    fruity: 555,
    under2: 765,
    fav: 935
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
          <div
            className="active-indicator"
            style={{ left: `${customPositions[selectedCategory] || 0}px`, transition: "left 0.3s ease-in-out" }}
          />
        </div>

        {/* 칵테일 카드 리스트 */}
        <div className="recipe-list">
          {loading ? (
            <h3>loading...</h3>
          ) : recipes && recipes.length > 0 ? (
            recipes.map((recipe) => {
              return (
                <CocktailRecipeCard
                  key={recipe.id}
                  recipeId={recipe.id}
                  type={recipe.type}
                  onToggleSave={() => {toggleSaveRecipe(recipe.id, recipe.type); }}
                  onClick={() => handleCardClick(recipe)}
                  isMyBar={recipe.myBar}
                />
              );
            })
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
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M65 38L65 92"
                  stroke="#C8CACB"
                  strokeWidth="4"
                  strokeLinecap="round"
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
                onSave={() => toggleSaveRecipe(selectedRecipe.id, selectedRecipe.type)}
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
