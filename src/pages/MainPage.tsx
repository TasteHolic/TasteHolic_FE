import React, { useState } from "react";
import "pretendard/dist/web/static/pretendard.css";

import TasteMoodLabel from "../components/Label/MainLabels/TasteMoodLabel";
import HolicNowLabel from "../components/Label/MainLabels/HolicNowLabel";
import BestTasteLabel from "../components/Label/MainLabels/BestTasteLabel";
import PickLabel from "../components/Label/MainLabels/PickLabel";
import { Icons } from '../components/icons/drinkIcons/index';

import { motion } from "framer-motion";
import './MainPage.css';
import SubLabel from "../components/Label/SubLabel";
import { HeartIcon, BirthdayHatIcon, CoconutCocktailIcon, GoogleAlertsIcon, JingleBellIcon, MusicIcon, PartyBalloonIcon} from "../components/icons/subLabelIcons";
import YouTubeSlider from "../components/YouTubeslider/YouTubeSlider";

import HolicNoteCard from "../components/noteCard/holicNoteCard";
import TasteNoteCard from "../components/noteCard/tasteNoteCard";
import ProductCard from "../components/productCard/ProductCard";
import Footer from "../components/Footer";


const MainPage: React.FC = () => {
  const cards = [
    { id: 1, imgSrc: "./image/suggest1.png", text: "사랑하는 사람과 로맨틱한 TASTE MOOD", icon: <HeartIcon /> },
    { id: 2, imgSrc: "./image/suggest2.png", text: "친구들과 신나는 TASTE MOOD", icon: <PartyBalloonIcon />  },
    { id: 3, imgSrc: "./image/suggest3.png", text: "조용한 분위기의 TASTE MOOD", icon: <MusicIcon />  },
    { id: 4, imgSrc: "./image/suggest1.png", text: "혼자만의 여유로운 TASTE MOOD", icon: <CoconutCocktailIcon />  },
    { id: 5, imgSrc: "./image/suggest1.png", text: "가족과 함께 따뜻한 TASTE MOOD", icon: <JingleBellIcon />  },
  ];



  const [currentCard, setCurrentCard] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleNext = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const drinks = [
    {
      name: "GOD FATHER",
      description: "달콤한 아마레토와\n강렬한 스카치 위스키,\n묵직한 달콤함",
      imgSrc: "https://s3-alpha-sig.figma.com/img/e8fb/fe3d/f94198fcf4c596609ddece2824d871c7?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=LsKybvBzjwuHX5uKUgL36GycVWsdpVIc4Hx9NwrpCs48u7xeeM-2DFPn2JE17E15cGtIVjU1cZXHKX1sEo~OlGVXYe9f4GRezupdPaa2XOudlFoO~iinJhYjeb5vsonx378iYqFPzmvU7Zx3sWIp6XcIH~BTKEnHD3HXqd~cGtr2Jlepbibt53YthO0U~Csa-mcM7O5mcEcnkDI7qreYvD6dvU7H6Jwig~mUMqSr~3MBKT4mOW0diaaCQ67Z7YX-Sj1qDKKeuXVbNrhLj-7T~2TmmgUNQLv1fdDs1yORS~ynM9UOrYzsrd~mNb931zQsBjE5J85DASykcQwV~Wu77Q__",
      tasteNote: { des1: "아몬드, 바닐라, 견과류", des2: "부드러움, 달콤한 아몬드, 쌉싸름", des3: "긴 여운, 고소함, 아몬드의 잔향" },
      holicNote: { des1: "디저트와 함께, 가벼운 술자리에서", des2: "스카치 위스키, 아마레토", des3: "25% - 30%" },
    },
    {
      name: "",
      description: "",
      imgSrc: "",
      tasteNote: { des1: "", des2: "", des3: "" },
      holicNote: { des1: "", des2: "", des3: "" },
    },
    // pick 추가
  ];

  const [currentDrink, setCurrentDrink] = useState(0);

  const handleNextDrink = () => {
    setCurrentDrink((prev) => (prev + 1) % drinks.length);
  };

  const handlePrevDrink = () => {
    setCurrentDrink((prev) => (prev - 1 + drinks.length) % drinks.length);
  };

  const products: { name: string; description: string; imageUrl: string; iconType: keyof typeof Icons }[] = [
    { name: '라임 모히또', 
     description: '상쾌한 라임 향기, 터지는 탄산', 
     imageUrl: 'https://s3-alpha-sig.figma.com/img/5851/54a8/480176b823aeffdd487a500374c3d811?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Pf~WjikjbgP7cUWdieGl9nyogFE8uVO9ZcqENRQ8zegux7a6fvZEw8XdTn1QaJT19meSaC7Tcn6-O-kJbpjSnqrMQkx8Xi~gxNOq2YRlURPXpzM2cGjxtxjdLmNeYXmlm6dT09COB9ZgG8hSwf3e5DI97NBrYH30kVsv2niEodcc86tuzb3asnMY8etOpOYfbPFWXXVWmH2z851PG2EC1sBlid46V8SymYBA9DOYJl3eVuD5DLi-WfBkj9NZtIkN2N7kae2Bj7CvBt3IbT3lao5a-s-pQUhbzTMgfQjWZ6hwdL1rGhXD-PMpOLQSYxi~7zx6CvIZL5Sjusf-xDy2RA__', 
     iconType: "CocktailIcon" },
    { name: '', description: '', imageUrl: '', iconType: 'WhiskeyIcon' },
    { name: '', description: '', imageUrl: '', iconType: 'WhiskeyIcon' },
    { name: '', description: '', imageUrl: '', iconType: 'WhiskeyIcon' },
    { name: '', description: '', imageUrl: '', iconType: 'WhiskeyIcon' },
    { name: '', description: '', imageUrl: '', iconType: 'WhiskeyIcon' },
    { name: '', description: '', imageUrl: '', iconType: 'WhiskeyIcon' },
    { name: '', description: '', imageUrl: '', iconType: 'WhiskeyIcon' },
  ];
  

  return (
    <>
      <div className="pick-container">
        <PickLabel />
        <div className="picking-container">
          <button onClick={handlePrevDrink} className="pick-arrow pick-arrow-left">
            <img src="/image/leftbutton.png" alt="Previous" className="leftarrow-image" />
          </button>

          <div className="pick-content">
                <p className="drink-name">{drinks[currentDrink].name}</p>
                <p className="drink-description">{drinks[currentDrink].description}</p>
                {/* <div className="drink-img">
                <img src={drinks[currentDrink].imgSrc} alt={drinks[currentDrink].name} />
                </div> */}
                <div className="drink-img">
                    <img src={drinks[currentDrink].imgSrc || "https://via.placeholder.com/150"} 
                        alt={drinks[currentDrink].name || "Default Drink"} 
                        onError={(e) => e.currentTarget.src = "https://via.placeholder.com/150"}
                        className="drink-img"
                    />
                </div>

                <div className="taste-notes">
                    <div className="taste-note">
                        <p className="taste-note-name">TASTE</p>
                        <TasteNoteCard
                            des1={drinks[currentDrink].tasteNote.des1}
                            des2={drinks[currentDrink].tasteNote.des2}
                            des3={drinks[currentDrink].tasteNote.des3}
                        />
                    </div>
                    <div className="taste-note">
                        <p className="taste-note-name">HOLIC</p>
                        <HolicNoteCard
                            des1={drinks[currentDrink].holicNote.des1}
                            des2={drinks[currentDrink].holicNote.des2}
                            des3={drinks[currentDrink].holicNote.des3}
                        />
                    </div>
            </div>
          </div>

          <button onClick={handleNextDrink} className="pick-arrow pick-arrow-right">
            <img src="/image/rightbutton.png" alt="Next" className="rightarrow-image" />
          </button>
        </div>
      </div>


    <div className="best-taste-container">
      <div className="best-tastes">
          <div className="best-taste-title">
              <div className="best-taste-label"><BestTasteLabel/></div>

              <p className="best-taste-description">지금 tasteHolic 회원들이 가장 좋아하는 Taste를 만나보세요.</p>
          </div>
      </div>
      
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard
              key={index}
              name={product.name}
              description={product.description}
              imageUrl={product.imageUrl}
              iconType={product.iconType}
          />
        ))}
      </div>
    </div>

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
            <div className="holicLabel"><HolicNowLabel/></div>

            <p>전문가들의 기술과 발자취를 따라 당신도 진정한 TasteHolic이 되어보세요.</p>
        </div>
        <YouTubeSlider/>
    </div>
    <Footer/>
    </>
  );
};

export default MainPage;
