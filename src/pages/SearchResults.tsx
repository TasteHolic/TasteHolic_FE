import React, { useState } from "react";
import "./SearchResults.css";
import SearchBar from "../components/search/searchBar";
import TypeLabel from "../components/search/searchPageOnly/TypeLabel";
import TypeLabelSvg from "../components/search/searchPageOnly/TypeLabelSvg";
import RecipeCard from "../components/ReipeCard";
import { Keyword } from "../components/ReipeCard";
import RecipeView from "../components/recipe/viewRecipe/RecipeView";
import RecipeEdit from "../components/recipe/editRecipe/RecipeEdit";
import SearchHeader from "../components/Header/SearchHeader";
import Footer from "../components/Footer";


interface SearchResultsProps {
    searched: string; 
    onSearch: () => void; //검색창 검색 시 호출
}

const cocktails = [
    {
      id: 1,
      name: "Old Fashioned",
      image: "/image/recipeimage1.png",
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
      id: 2,
      name: "Black Russian",
      image: "/image/recipeimage2.png",
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
      id: 3,
      name: "Margarita",
      image: "/image/recipeimage3.png",
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

  const initialSearchedTypes = [
    { id: 1, label: "칵테일", type: "variety" },
    { id: 2, label: "위스키", type: "variety" },
    { id: 3, label: "~30%", type: "alcoholPer" },
    { id: 4, label: "시트러스 (Citrus)", type: "aroma" },
    { id: 5, label: "달콤함 (Sweet)", type: "flavor" },
    { id: 6, label: "분위기", type: "mood" },
];

const cards: { 
    id: number;
    type: string; 
    name: string; 
    image: string; 
    keyWords: Keyword[];
    onClick: () => void; 
    isMyBar: boolean; 
    isSelected: boolean; 
}[] = [
    { id: 1, type: "official", name: "Old Fashioned", image: "/image/cocktail_old_fashioned-1 1.png", keyWords: [{ label: "칵테일", type: "variety" }], onClick: () => {}, isMyBar: true, isSelected: false },
    { id: 2, type: "user", name: "올드패션 오렌지", image: "/image/cocktail_old_fashioned-1 1.png", keyWords: [{ label: "위스키", type: "variety" }], onClick: () => {}, isMyBar: false, isSelected: false },
    { id: 3, type: "user", name: "편의점 재료로 만드는 올드패션", image: "/image/cocktail_old_fashioned-1 1.png", keyWords: [{ label: "~30%", type: "alcoholPer" }], onClick: () => {}, isMyBar: true, isSelected: false },
];

const Icons = {
    CocktailIcon: "https://s3-alpha-sig.figma.com/img/ff39/a53d/568721f519d5b8a34906e4502ad6d303?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ggyV11fWEVyTXwVC08VGBOHizZOqJZxlmc9vyzhaMfEulX9tCP13aWjGJNknahbkU9EJ~p7t4QIBbPDClAtq--Uw4CPOSGnK8L5FcFPwL-HIutFbbWe6411I0-Z8~dmaLdJY61jWA-q8gwpU6o-V2fmb8bs2lPLM1MU33NY93RFP4LnKCzNYsSk3~3tMN89PxH-~B8LogwMWj4wrSY3OyKsSBxuC0YcnGgcLDv6AuuCFujqyHCHpou~GtVrNB1GudBIRQiVyjhBKtqiRAGV~76CmuFSrRbgXi3DgZ~6D5~6Nt3OcZJXsUzI1uK717FrGT6pDYksVJ262Pa-C9CU-~w__",
    EtcIcon: "https://s3-alpha-sig.figma.com/img/f630/78e3/17056e2585eb5851338120a504c7c6e1?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qOyPl9-2qKHcvKs1L5tiMGzkP9Zvxv0szDmq2vsXiHGfCVYyl7VjBWfCndl~nTdcuSk~DHC1ZK-yNW3wwEcsh9n6xwYpji9~5i0qmbEXt5s0kBg~d7QuqSyBZ4LHsFHJrhvHLeF68Po6DI5L4HSWpX1hsxwJjXTPaXexSRMjB4HqkWLJuDzzgvaj1~gVeLrccYTtOxCYLKps0mdRKuXpV4AIwvrVxfodaCcNJY4RuGEeJeTeW203jDVsQix9ApdgH58Gf4uJ4eCR8lSBekWWw4xIc2BMNXr8kIdVUZNdvNZDbjbPf7Nw1W2JGyrjGPMER8dQwJ-l8MSmNmlAoSwYEQ__",
    GinrumteqIcon: "https://s3-alpha-sig.figma.com/img/403f/601a/484293ee2dc4d78823c9623f0fb14085?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tr8U~8HvBq5bU14yTL4sJruzwb9OuAL9t~SPCzvev1zz3V2uC~B4IuTI5SwGzFezkCZjeGO7yvLUD7prSa~CsZfKSxeLHk6d0m115azsXv-z0gPAzLJiTVfprQ7BFBQXGgV1j--kLXmWOuWFneLEuDk5bcnz-4iK~V9KHN41nays6dLfImwfR9MsKSmMekdvhcginhM8vE97dP7Od8SpQbJlldIThFwV2rVfUMa-SpM33blBzzjAx-fLS0qr6M-U~DyjE87JFljTjooi-GThC0fG6YORFA9mKwTx3m0V1CTj4jUJiRIQxFzr3UXANxbBlE7xS-~x4Bn7mU2Xuzn~Tw__",
    WhiskeyIcon: "https://s3-alpha-sig.figma.com/img/6ad8/8422/2c0b2b6ac687ca49ed46c32c93aa120d?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KdGeYB3nVl64dqpzfAZ4zkYDifRbfVU9P3WJlBbQ0Rz~T7TlNK-hn7ViGUoJVCm5y31XegEeUeABzckBPA5KjhKxjpmpnkxuPzbOMSmunztcXFCa0NBwnekJi3gIQawVODzatsfTDKfuxFsh2WVnLuq2d2RlPYAnxiST9bcGYNTrRXMx4o66~h8BXZe47L4Uhus2Xatc8A5A39d9mFY0Z2PSb6AwhF4KrQU9XBZ~rzc6X9TwtHnn9eNXLAwu2JZx6ZXA5QXZ9L9r91THdM~Xc1~w-yH0~LvSHOeO6GM9YOY79he0jsuBuvxo2n-zOqr5ZThIPkPhNvZSin0gQ4ZXvw__",
};


const SearchResults: React.FC<SearchResultsProps> = ({ searched, onSearch }) => {
    const [isMyBar, setIsMyBar] = useState(false);
    const [selectedCocktail, setSelectedCocktail] = useState<
        (typeof cocktails)[0] | null
    >(null);
    const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 여부
    const [searchedTypes, setSearchedTypes] = useState(initialSearchedTypes);
    
    

    const myBarClick = () => {
        setIsMyBar((prev) => !prev);
    };

    const handleDeleteType = (id: number) => {
        setSearchedTypes((prev) => prev.filter((type) => type.id !== id));
    };

    const handleCardClick = (id: number) => {
        const foundCocktail = cocktails.find((cocktail) => cocktail.id ===id);
        setSelectedCocktail(foundCocktail || null);
    }

    const filteredCards = isMyBar ? cards.filter((card) => card.isMyBar) : cards;
    const officialCards = filteredCards.filter((card) => card.type === "official");
    const userCards = filteredCards.filter((card) => card.type === "user");

    const noResults = officialCards.length === 0 && userCards.length === 0;

    return (
        <>
        <div className="search-results-container">
            <SearchHeader/>
            <div className="search-bar-labels">
                <div className="results-string">'{searched}' 검색 결과</div>
                <SearchBar myBarClick={myBarClick} searchClick={() => {onSearch}} searched={searched} />
                <div className="type-labels-container">
                    {searchedTypes.map((type) => {
                        let icon;
                        if (type.type === "variety") {
                            if (type.label === "칵테일") icon = Icons.CocktailIcon;
                            else if (type.label === "위스키") icon = Icons.WhiskeyIcon;
                            else if (type.label === "진, 럼, 데낄라") icon = Icons.GinrumteqIcon;
                            else if (type.label === "전체 선택" || type.label === "기타") icon = Icons.EtcIcon;
                        }

                        return type.type === "variety" ? (
                        <TypeLabelSvg
                            key={type.id}
                            svg={icon ? <img src={icon} alt={type.label} /> : null}
                            name={type.label}
                            onDelete={() => handleDeleteType(type.id)}
                        />
                        ) : (
                        <TypeLabel
                            key={type.id}
                            name={type.label}
                            category={type.type as "aroma" | "flavor" | "mood"}
                            onDelete={() => handleDeleteType(type.id)}
                        />
                        );
                    })}
                </div>

            </div>

            {noResults ? (
                <div className="no-search-results">
                    <img src="/image/Frame 427319276.png" className="no-results-image"/>
                    <div className="no-results-lines">
                        <div className="no-results">준비된 레시피가 아직 없어요.</div>
                        <div className="no-results">조금만 기다려주세요!</div>
                    </div>

                </div>
            ) : (
                <div className="search-results">

                    {officialCards.length > 0 && (
                        <div className="official-recipes">
                            <div className="recipes-title">공식 레시피<div className="line" /></div>
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
                            <div className="recipes-title">유저 레시피<div className="line" /></div>
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
                                onReadMore={() => console.log("자세히 보기 클릭")}
                                onCancel={() => {
                                setIsEditMode(false);
                                }}
                                onSave={() => {
                                console.log("레시피 저장 완료");
                                setIsEditMode(false);
                                }}
                            />
                            </div>

                            ) : (
                            <div className="modal-container">
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
                                onReadMore={() => console.log("자세히 보기 클릭")}
                                onCancel={() => setSelectedCocktail(null)}
                                onEdit={() => setIsEditMode(true)}
                            />
                            </div>

                            ))}
                </div>
            )}
        <Footer/>
        </div>
        </>
    );
};

export default SearchResults;
