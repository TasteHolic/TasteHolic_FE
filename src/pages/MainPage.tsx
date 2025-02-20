import React, { useEffect, useState } from "react";
import "pretendard/dist/web/static/pretendard.css";

import TasteMoodLabel from "../components/Label/MainLabels/TasteMoodLabel";
import HolicNowLabel from "../components/Label/MainLabels/HolicNowLabel";
import BestTasteLabel from "../components/Label/MainLabels/BestTasteLabel";
import PickLabel from "../components/Label/MainLabels/PickLabel";
// import { Icons } from "../components/icons/drinkIcons/index";

import { motion } from "framer-motion";
import "./MainPage.css";
import SubLabel from "../components/Label/SubLabel";
import {
  HeartIcon,
  BirthdayHatIcon,
  CoconutCocktailIcon,
  GoogleAlertsIcon,
  JingleBellIcon,
  MusicIcon,
  PartyBalloonIcon,
} from "../components/icons/subLabelIcons";
import YouTubeSlider from "../components/YouTubeslider/YouTubeSlider";

import HolicNoteCard from "../components/noteCard/holicNoteCard";
import TasteNoteCard from "../components/noteCard/tasteNoteCard";
import ProductCard, { iconPaths } from "../components/productCard/ProductCard";
import MainHeader from "../components/Header/MainHeader";
import Footer from "../components/Footer";

const MainPage: React.FC = () => {
  const cards = [
    {
      id: 1,
      imgSrc: "./image/suggest1.png",
      text: "사랑하는 사람과 로맨틱한 TASTE MOOD",
      icon: <HeartIcon />,
    },
    {
      id: 2,
      imgSrc: "./image/suggest2.png",
      text: "친구들과 신나는 TASTE MOOD",
      icon: <PartyBalloonIcon />,
    },
    {
      id: 3,
      imgSrc: "./image/suggest3.png",
      text: "조용한 분위기의 TASTE MOOD",
      icon: <MusicIcon />,
    },
    {
      id: 4,
      imgSrc: "./image/suggest1.png",
      text: "혼자만의 여유로운 TASTE MOOD",
      icon: <CoconutCocktailIcon />,
    },
    {
      id: 5,
      imgSrc: "./image/suggest1.png",
      text: "가족과 함께 따뜻한 TASTE MOOD",
      icon: <JingleBellIcon />,
    },
  ];

  const [currentCard, setCurrentCard] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [products, setProducts] = useState<any[]>([]); // 베스트 칵테일 리스트 저장
  const handleNext = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };
  const [drinks, setDrinks] = useState<any[]>([]); // 받아온 칵테일 리스트 저장
  const [currentDrink, setCurrentDrink] = useState(0);
  useEffect(() => {
    const fetchPickDrinks = async () => {
      try {
        const response = await fetch("http://54.180.45.230:3000/api/v1/home/pick");
        const data = await response.json();
  
        if (data.resultType === "SUCCESS") {
          setDrinks(data.success); // 칵테일 리스트 저장
        } else {
          console.error("추천 칵테일 불러오기 실패:", data.error);
        }
      } catch (error) {
        console.error("네트워크 오류:", error);
      }
    };
  
    fetchPickDrinks();
  }, []);
  const handleNextDrink = () => {
    setCurrentDrink((prev) => (prev + 1) % drinks.length);
  };

  const handlePrevDrink = () => {
    setCurrentDrink((prev) => (prev - 1 + drinks.length) % drinks.length);
  };
  const categoryIcons: { [key: string]: keyof typeof iconPaths } = {
    Whiskey: "WhiskeyIcon",
    Beer: "BeerIcon",
    cocktail: "CocktailIcon",
    Wine: "WineIcon",
    Rum: "GinrumteqIcon",
    Gin: "GinrumteqIcon",
    Tequila: "EtcIcon",
    Vodka: "EtcIcon",
    
  };

  useEffect(() => {
    const fetchBestTastes = async () => {
      try {
        const response = await fetch("http://54.180.45.230:3000/api/v1/home/best");
        const data = await response.json();
  
        if (data.resultType === "SUCCESS") {
          setProducts(data.success); // API 데이터 저장
          console.log("API 응답 전체:", data.success);
        } else {
          console.error("인기 칵테일 불러오기 실패:", data.error);
        }
      } catch (error) {
        console.error("네트워크 오류:", error);
      }
    };
  
    fetchBestTastes();
  }, []);
  return (
    <>
      <MainHeader />
      <div className="pick-container">
        
        <div className="picking-container">
          <button
            onClick={handlePrevDrink}
            className="pick-arrow pick-arrow-left"
          >
            <img
              src="/image/leftbutton.png"
              alt="Previous"
              className="leftarrow-image"
            />
          </button>

          <div className="pick-content">
            <PickLabel />
            <p className="drink-name">{drinks[currentDrink]?.nameEng}</p>
            <p className="drink-description">
              {drinks[currentDrink]?.intro}
            </p>
            {/* <div className="drink-img">
                <img src={drinks[currentDrink].imgSrc} alt={drinks[currentDrink].name} />
                </div> */}
                {/* {`drink-img ${currentDrink < 2 ? "short-drink" : "long-drink"}`} */}
            <div className="drink-img">
              <img
                src={drinks[currentDrink]?.imageUrl || "https://via.placeholder.com/150"}
                alt={drinks[currentDrink]?.nameEng || "Default Drink"}
                onError={(e) =>
                  (e.currentTarget.src = "https://via.placeholder.com/150")
                }
                className="drink-img"
              />
            </div>

            <div className="taste-notes">
              <div className="taste-note">
                <p className="taste-note-name">TASTE</p>
                <TasteNoteCard
                  des1={drinks[currentDrink]?.tastes?.[0] || "정보 없음"}
                  des2={drinks[currentDrink]?.tastes?.[1] || "정보 없음"}
                  des3={drinks[currentDrink]?.tastes?.[2] || "정보 없음"}
                />
              </div>
              <div className="taste-note">
                <p className="taste-note-name">HOLIC</p>
                <HolicNoteCard
                  des1={drinks[currentDrink]?.aromas?.[0] || "정보 없음"}
                  des2={drinks[currentDrink]?.aromas?.[1] || "정보 없음"}
                  des3={`${drinks[currentDrink]?.abv || "?"}%`}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleNextDrink}
            className="pick-arrow pick-arrow-right"
          >
            <img
              src="/image/rightbutton.png"
              alt="Next"
              className="rightarrow-image"
            />
          </button>
        </div>
      </div>

      <div className="best-taste-container">
        <div className="best-tastes">
          <div className="best-taste-title">
            <div className="best-taste-label">
              <BestTasteLabel />
            </div>

            <p className="best-taste-description">
              지금 tasteHolic 회원들이 가장 좋아하는 Taste를 만나보세요.
            </p>
          </div>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              name={product.nameKor}
              description={product.intro}
              imageUrl={product.imageUrl}
              iconType={categoryIcons[product.category]}
            />
          ))}
        </div>
      </div>

      <div className="taste-mood-container">
        <TasteMoodLabel />
        <p className="taste-mood-description" style={{ marginBottom: "0px" }}>
          다양한 분위기에 맞는 Taste를 제안해드릴게요.
        </p>

        <div className="taste-mood-cards">
          {cards.map((card, index) => {
            const offset = (index - currentCard + cards.length) % cards.length;
            const isCenter = offset === 2; // 중앙 카드를 정확히 계산

            return (
              <motion.div
                key={card.id}
                className={`taste-mood-card ${isCenter ? "center" : ""}`}
                style={{
                  transform: `translateX(${(offset - 2) * 100}%) scale(${
                    isCenter ? 1 : 0
                  })`,
                  zIndex: isCenter ? 10 : 5,
                  backgroundImage:
                    isCenter && hoveredCard === card.id
                      ? "./maintastemoodcard.png"
                      : "./maintastemoodcard.png",
                }}
                onMouseEnter={() => isCenter && setHoveredCard(card.id)}
                onMouseLeave={() => isCenter && setHoveredCard(null)}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                {isCenter && (
                  <div className="card-hover-buttons">
                    <button
                      onClick={handlePrev}
                      className="card-arrow card-arrow-left"
                    >
                      <img
                        src="/image/leftbutton.png"
                        alt="Previous"
                        className="leftarrow-image"
                      />
                    </button>
                    <button
                      onClick={handleNext}
                      className="card-arrow card-arrow-right"
                    >
                      <img
                        src="/image/rightbutton.png"
                        alt="Previous"
                        className="rightarrow-image"
                      />
                    </button>
                  </div>
                )}
                <SubLabel
                  text={card.text}
                  icon={card.icon}
                  isHovered={hoveredCard === card.id}
                />
                <img
                  src={card.imgSrc}
                  alt={`Card ${card.id}`}
                  className="taste-mood-card-image"
                />
              </motion.div>
            );
          })}
        </div>

        <div className="taste-mood-pagination">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`taste-mood-dot ${
                currentCard === index ? "active" : ""
              }`}
            ></div>
          ))}
        </div>
      </div>
      <div className="holicNow-container">
        <div className="holic-container">
          <div className="holicLabel">
            <HolicNowLabel />
          </div>

          <p>
            전문가들의 기술과 발자취를 따라 당신도 진정한 TasteHolic이
            되어보세요.
          </p>
        </div>
        <YouTubeSlider />
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
