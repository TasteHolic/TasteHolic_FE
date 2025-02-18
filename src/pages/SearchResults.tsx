import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SearchResults.css";
import SearchBar from "../components/search/searchBar";
import TypeLabel from "../components/search/searchPageOnly/TypeLabel";
import TypeLabelSvg from "../components/search/searchPageOnly/TypeLabelSvg";
import RecipeCard from "../components/ReipeCard";
import RecipeView from "../components/recipe/viewRecipe/RecipeView";
import RecipeEdit from "../components/recipe/editRecipe/RecipeEdit";
import ExploreRecipe from "../components/recipe/explore/ExploreRecipe";
import SearchHeader from "../components/Header/SearchHeader";
import Footer from "../components/Footer";

interface SearchResultsProps {
  searched: string;
  results: { success: boolean; data: any[] };
  searchedTypes: { id: number; label: string; type: string }[];
  onSearch: () => void; //검색창 검색 시 호출
}

const Icons = {
  CocktailIcon:
    "https://s3-alpha-sig.figma.com/img/ff39/a53d/568721f519d5b8a34906e4502ad6d303?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ggyV11fWEVyTXwVC08VGBOHizZOqJZxlmc9vyzhaMfEulX9tCP13aWjGJNknahbkU9EJ~p7t4QIBbPDClAtq--Uw4CPOSGnK8L5FcFPwL-HIutFbbWe6411I0-Z8~dmaLdJY61jWA-q8gwpU6o-V2fmb8bs2lPLM1MU33NY93RFP4LnKCzNYsSk3~3tMN89PxH-~B8LogwMWj4wrSY3OyKsSBxuC0YcnGgcLDv6AuuCFujqyHCHpou~GtVrNB1GudBIRQiVyjhBKtqiRAGV~76CmuFSrRbgXi3DgZ~6D5~6Nt3OcZJXsUzI1uK717FrGT6pDYksVJ262Pa-C9CU-~w__",
  EtcIcon:
    "https://s3-alpha-sig.figma.com/img/f630/78e3/17056e2585eb5851338120a504c7c6e1?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qOyPl9-2qKHcvKs1L5tiMGzkP9Zvxv0szDmq2vsXiHGfCVYyl7VjBWfCndl~nTdcuSk~DHC1ZK-yNW3wwEcsh9n6xwYpji9~5i0qmbEXt5s0kBg~d7QuqSyBZ4LHsFHJrhvHLeF68Po6DI5L4HSWpX1hsxwJjXTPaXexSRMjB4HqkWLJuDzzgvaj1~gVeLrccYTtOxCYLKps0mdRKuXpV4AIwvrVxfodaCcNJY4RuGEeJeTeW203jDVsQix9ApdgH58Gf4uJ4eCR8lSBekWWw4xIc2BMNXr8kIdVUZNdvNZDbjbPf7Nw1W2JGyrjGPMER8dQwJ-l8MSmNmlAoSwYEQ__",
  GinrumteqIcon:
    "https://s3-alpha-sig.figma.com/img/403f/601a/484293ee2dc4d78823c9623f0fb14085?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tr8U~8HvBq5bU14yTL4sJruzwb9OuAL9t~SPCzvev1zz3V2uC~B4IuTI5SwGzFezkCZjeGO7yvLUD7prSa~CsZfKSxeLHk6d0m115azsXv-z0gPAzLJiTVfprQ7BFBQXGgV1j--kLXmWOuWFneLEuDk5bcnz-4iK~V9KHN41nays6dLfImwfR9MsKSmMekdvhcginhM8vE97dP7Od8SpQbJlldIThFwV2rVfUMa-SpM33blBzzjAx-fLS0qr6M-U~DyjE87JFljTjooi-GThC0fG6YORFA9mKwTx3m0V1CTj4jUJiRIQxFzr3UXANxbBlE7xS-~x4Bn7mU2Xuzn~Tw__",
  WhiskeyIcon:
    "https://s3-alpha-sig.figma.com/img/6ad8/8422/2c0b2b6ac687ca49ed46c32c93aa120d?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KdGeYB3nVl64dqpzfAZ4zkYDifRbfVU9P3WJlBbQ0Rz~T7TlNK-hn7ViGUoJVCm5y31XegEeUeABzckBPA5KjhKxjpmpnkxuPzbOMSmunztcXFCa0NBwnekJi3gIQawVODzatsfTDKfuxFsh2WVnLuq2d2RlPYAnxiST9bcGYNTrRXMx4o66~h8BXZe47L4Uhus2Xatc8A5A39d9mFY0Z2PSb6AwhF4KrQU9XBZ~rzc6X9TwtHnn9eNXLAwu2JZx6ZXA5QXZ9L9r91THdM~Xc1~w-yH0~LvSHOeO6GM9YOY79he0jsuBuvxo2n-zOqr5ZThIPkPhNvZSin0gQ4ZXvw__",
};

const SearchResults: React.FC<SearchResultsProps> = ({
  searched: propsSearched,
  results = [],
  searchedTypes = [],
  onSearch,
}) => {
  const location = useLocation();
  const searched = propsSearched || location.state?.searched || "";
  const [appliedFilters, setAppliedFilters] = useState(
    location.state?.searchedTypes ?? []
  );
  const [isMyBar, setIsMyBar] = useState(false);
  const [selectedCocktail, setSelectedCocktail] = useState<any | null>(null);
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 여부
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [exploreCocktail, setExploreCocktail] = useState<any | null>(null);

  useEffect(() => {
    console.log("📌 검색 필터 데이터:", location.state?.searchedTypes);
    if (location.state?.searchedTypes) {
      setAppliedFilters(location.state.searchedTypes);
      console.log(
        "✅ `searchedTypes` 상태 업데이트됨:",
        location.state.searchedTypes
      );
    }
  }, [location.state?.searchedTypes]);
  const myBarClick = () => {
    setIsMyBar((prev) => !prev);
  };

  const handleDeleteType = (id: number) => {
    setAppliedFilters((prev) => prev.filter((type) => type.id !== id));
  };
  const handleDeleteFilter = (id: number) => {
    setAppliedFilters((prev) => prev.filter((filter) => filter.id !== id));
  };
  const handleCardClick = (id: number) => {
    const foundCocktail = cocktails.find((cocktail) => cocktail.id === id);
    setSelectedCocktail(foundCocktail || null);
  };

  const filteredResults = results?.data?.length
    ? isMyBar
      ? results.data.filter((item) => item.isMyBar)
      : results.data
    : [];

  const officialCards = filteredResults.filter(
    (item) => item.type === "official"
  );
  const userCards = filteredResults.filter((item) => item.type === "user");

  const noResults = !filteredResults.length; // 검색 결과 여부 수정

  console.log("🔍 원본 검색 결과:", results);
  console.log("📌 필터링된 결과:", filteredResults);
  console.log("📢 공식 레시피 개수:", officialCards.length);
  console.log("📢 유저 레시피 개수:", userCards.length);

  return (
    <>
      <div className="search-results-container">
        <SearchHeader />
        <div className="search-bar-labels">
          <div className="results-string">"{searched}" 검색 결과</div>
          <SearchBar
            myBarClick={myBarClick}
            searchClick={() => {
              onSearch;
            }}
            searched={searched}
          />
          <div className="type-labels-container">
            {appliedFilters && appliedFilters.length > 0 ? (
              appliedFilters.map((type, index) => {
                console.log("🔍 렌더링할 필터:", type);

                let icon;
                if (type.type === "variety") {
                  switch (type.label) {
                    case "칵테일":
                      icon = Icons.CocktailIcon;
                      break;
                    case "위스키":
                      icon = Icons.WhiskeyIcon;
                      break;
                    case "진, 럼, 데낄라":
                      icon = Icons.GinrumteqIcon;
                      break;
                    default:
                      icon = Icons.EtcIcon;
                  }
                }

                return type.type === "variety" ? (
                  <TypeLabelSvg
                    key={index}
                    svg={icon ? <img src={icon} alt={type.label} /> : null}
                    name={type.label}
                    onDelete={() => handleDeleteFilter(type.id)}
                  />
                ) : type.type === "abv" ? ( // 도수 필터 렌더링 추가
                  <TypeLabel
                    key={index}
                    name={type.label}
                    category="abv"
                    onDelete={() => handleDeleteFilter(type.id)}
                  />
                ) : (
                  <TypeLabel
                    key={index}
                    name={type.label}
                    category={type.type as "aroma" | "flavor" | "mood"}
                    onDelete={() => handleDeleteFilter(type.id)}
                  />
                );
              })
            ) : (
              <div className="no-labels">❌ 필터 없음</div> // 디버깅용
            )}
          </div>
        </div>

        {noResults ? (
          <div className="no-search-results">
            <img
              src="/image/Frame 427319276.png"
              className="no-results-image"
            />
            <div className="no-results-lines">
              <div className="no-results">준비된 레시피가 아직 없어요.</div>
              <div className="no-results">조금만 기다려주세요!</div>
            </div>
          </div>
        ) : (
          <div className="search-results">
            {officialCards.length > 0 && (
              <div className="official-recipes">
                <div className="recipes-title">
                  공식 레시피
                  <div className="line" />
                </div>
                <div className="recipe-cards">
                  {officialCards.map((card) => (
                    <RecipeCard
                      key={card.id}
                      name={card.name}
                      image={card.image}
                      keyWords={card.keyWords}
                      onClick={() => handleCardClick(card.id)}
                      isMyBar={card.isMyBar}
                      isSelected={selectedCocktail?.name === card.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {userCards.length > 0 && (
              <div className="user-recipes">
                <div className="recipes-title">
                  유저 레시피
                  <div className="line" />
                </div>
                <div className="recipe-cards">
                  {userCards.map((card) => (
                    <RecipeCard
                      key={card.id}
                      name={card.name}
                      image={card.image}
                      keyWords={card.keyWords}
                      onClick={() => handleCardClick(card.id)}
                      isMyBar={card.isMyBar}
                      isSelected={selectedCocktail?.name === card.name}
                    />
                  ))}
                </div>
              </div>
            )}
            {selectedCocktail &&
              (isEditMode ? (
                <div className="modal-container">
                  <RecipeEdit
                    drinkName={selectedCocktail.name}
                    flavor={selectedCocktail.flavor}
                    aroma={selectedCocktail.aroma}
                    ingredients={selectedCocktail.ingredients.map(
                      (ingredient) =>
                        typeof ingredient === "object"
                          ? ingredient.ingredient
                          : ingredient
                    )}
                    alcoholPer={
                      selectedCocktail.alcoholPer
                        ? selectedCocktail.alcoholPer[0]
                        : ""
                    }
                    glass={
                      selectedCocktail.glass ? selectedCocktail.glass[0] : ""
                    }
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
                </div>
              ) : (
                <div className="modal-container">
                  <RecipeView
                    drinkName={selectedCocktail.name}
                    flavor={selectedCocktail.flavor}
                    aroma={selectedCocktail.aroma}
                    ingredients={selectedCocktail.ingredients.map(
                      (ingredient) =>
                        typeof ingredient === "object"
                          ? ingredient.ingredient
                          : ingredient
                    )}
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
                    onCancel={() => setSelectedCocktail(null)}
                    onEdit={() => setIsEditMode(true)}
                  />
                </div>
              ))}
            <div className="modal-container">
              {isExploreOpen && exploreCocktail && (
                <ExploreRecipe
                  exploreTitle="레시피 탐색"
                  drinkName={exploreCocktail.name}
                  imgSrc={exploreCocktail.image}
                  viewCount={123}
                  favoriteCount={45}
                  ingredients={exploreCocktail.ingredients}
                  recipeLine1={exploreCocktail.recipeLine1}
                  recipeLine2={exploreCocktail.recipeLine2}
                  recipeLine3={exploreCocktail.recipeLine3}
                  onCancel={() => setIsExploreOpen(false)}
                  onSave={() => {
                    console.log("레시피 저장!");
                    setIsExploreOpen(false);
                  }}
                />
              )}
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default SearchResults;
