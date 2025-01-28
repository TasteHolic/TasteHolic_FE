import React, { useState } from "react";
import TasteMoodLabel from "../components/Label/MainLabels/TasteMoodLabel";
import { motion } from "framer-motion";
import './TasteMood.css';
import SubLabel from "../components/Label/SubLabel";
import { HeartIcon } from "../components/icons/subLabelIcons";
import HolicNowLabel from "../components/Label/MainLabels/HolicNowLabel";
import YouTubeSlider from "../components/YouTubeslider/YouTubeSlider";


const TasteMood: React.FC = () => {
  const cards = [
    { id: 1, imgSrc: "./image/suggest1.png" },
    { id: 2, imgSrc: "./image/suggest1.png" },
    { id: 3, imgSrc: "./image/suggest1.png" },
    { id: 4, imgSrc: "./image/suggest1.png" },
    { id: 5, imgSrc: "./image/suggest1.png" },
  ];
  

  const [currentCard, setCurrentCard] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleNext = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };
  

  return (
    <>
    <div className="taste-mood-container">
      <TasteMoodLabel />
      <p className="taste-mood-description"
      style={{ marginBottom: "0px" }}>다양한 분위기에 맞는 Taste를 제안해드릴게요.</p>

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
                  isCenter ? 1 : 0})`,
                zIndex: isCenter ? 10 : 5,
                backgroundImage:
                  isCenter && hoveredCard === card.id ? "./maintastemoodcard.png": "./maintastemoodcard.png",
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
                text="사랑하는 사람과 로맨틱한 TASTE MOOD"
                icon={<HeartIcon />}
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
            <div className="holicLabel"><HolicNowLabel/></div>

            <p>전문가들의 기술과 발자취를 따라 당신도 진정한 TasteHolic이 되어보세요.</p>
        </div>
        <YouTubeSlider/>
    </div>
    
    </>
  );
};

export default TasteMood;
