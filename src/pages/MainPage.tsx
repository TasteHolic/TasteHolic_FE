import React, { useState } from "react";
import "pretendard/dist/web/static/pretendard.css";

import TasteMoodLabel from "../components/Label/MainLabels/TasteMoodLabel";
import HolicNowLabel from "../components/Label/MainLabels/HolicNowLabel";
import BestTasteLabel from "../components/Label/MainLabels/BestTasteLabel";
import PickLabel from "../components/Label/MainLabels/PickLabel";
import { Icons } from "../components/icons/drinkIcons/index";

import { motion } from "framer-motion";
import './MainPage.css';
import SubLabel from "../components/Label/SubLabel";
import { HeartIcon, BirthdayHatIcon, CoconutCocktailIcon, GoogleAlertsIcon, JingleBellIcon, MusicIcon, PartyBalloonIcon} from "../components/icons/subLabelIcons";
import YouTubeSlider from "../components/YouTubeslider/YouTubeSlider";

import HolicNoteCard from "../components/noteCard/holicNoteCard";
import TasteNoteCard from "../components/noteCard/tasteNoteCard";
import ProductCard from "../components/productCard/ProductCard";
import Header from "../components/Header";
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
    { name: '호세 쿠엘보 골드',
     description: '1758년부터 이어진 전통의 맛',
     imageUrl: 'https://s3-alpha-sig.figma.com/img/51aa/a5a6/b1af3a8a09d8681ef1201a0c35e005ea?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=k35vNwSUuZI8HtaESxmhIl1Vq2Hhh~2~KON4YvOirT1NxaGUmG-dU4ruPFogZh4Npt5CQaqg2p-OHTCxq6O~~Hr9uuRM69~-AUgkMM8u7~XWb0UR7Ps4-Nle4K6cPqww5bQ5Vol9o0DxrwTmA9ghCgmxGFioHQHnqlfFazt5Cod2RXQZiLwmz-Y40QkPoj6HfFEn7TDzSWVvcmzNnASU0WU8V~TZA2aSxoycOv~BfFJwn65zuqQvwpHLJC8~bj~9amZ5sxgJ5gJ5-N2n4L2oXtYMJ3Uu32MDaK9EnAOcT7CtuP6PRcdapbanJr5H07jP3zLS8HPWFZec~Ebw0-beUg__',
     iconType: 'WhiskeyIcon' },
    { name: '바카디 카르타 블랑카',
      description: '모든 칵테일에 빠질 수 없는 필수 럼', 
      imageUrl: 'https://s3-alpha-sig.figma.com/img/ac26/1a1f/75f510ef8faff56bcda703b5df87ba7b?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ZEXIBuvChiwQosyx1WhzqpNHfufK~eoi2Udrs9Sl6GdQyEs2ViyF0zmO~GA5pee6YtuygfgtYV~kjrOxyhyNeRXiw1QBj~ZeKsB77t3pglOCuWQHHM~Yt1OfbrivtECc8PJcEgBmjlr~R9BT6zJ3SNuSsHYR8oTpLJRQ0tBtPjv2E8nWPxxARJkKzvssHd-aJpip~dCBJc2tzrXTvQKoTFzuHgOUiArxaORhreCZsoMV8cr7wNC0tmMPzYmfMQDJ3G9gTNk8S1fWPCBWuEKGfXP-zqHkqMg-z5m0WhhsRKQ2c19eaLMbFRATOB6kStn1EEmsw0mVY5myTbyQr65fng__', 
      iconType: 'WhiskeyIcon' },
    { name: '모엣 샹동 임페리얼', 
      description: '축하의 순간을 위한 베이직 샴페인', 
      imageUrl: 'https://s3-alpha-sig.figma.com/img/ab48/a83f/996930a28534372207c01b0762856a90?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HKXm1NSsupatL1uFfOYMSC3y3fkM4fqs7PnzRhrB2BCS5-S-IYjHEvdB~YTmd-ATbbadLjBxURSqehfySnk9Z-zhFugbj7yCK1yd-CtYW8~DjpDvBe8jPbBELDhL9stlsziHgMlhYda6geBGvrAcy4int~2hEfi7CUjdzoNcqnk0FKTBoJpSCjNUCedII6HaplfjE4sYIFxBelNbsTcLtHz33tEEYozQOTJ0T8PZoT6jaxApJlVwJx5T6r9ReqmWVkvB~6qPLYn-OQqTC4~C9IJH7ye1knm7pUSIGMaE83xI-aqt40nlxBnQdKDq4rGsI1tILRfRLlHHkWm9HQvSmA__', 
      iconType: 'WhiskeyIcon' },
    { name: '몬테스 알파 까베르네', 
      description: '가성비 끝판왕 레드 와인', 
      imageUrl: 'https://s3-alpha-sig.figma.com/img/b17a/261b/96fcbca96701a1e2d7afa59f17f66d92?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=deD-UWsHqNOXNwouX8PBHShu9FbThWkM7G53w9xyezRPJ2o2xPLIHRx19pkkdElyMGQth9Nimb52GQNldr0GDGDP~LPlPStLcXu3zvyluJbLoixKE4ZTvzEOkSSAyzyd6JubcwFF2qIfXc21B4OJ4SVs~fd6gq9mYAH4cnlcYWgu3m3kSYNlQ0bqZTFfqaZN-Ls~1-FEL3db5wv8G0f3eVACixy2rhRBl2BjX2Zrvxyx2zFmPi~og5ErGeh0mBypVxeCyjyX6DheVODqe6zVtmwN3blF20nOkcvhQKZwPaSwhWm3iHT7FNbnVoL5NlKOVteaNru4uQLxjrk59UvZ9w__', 
      iconType: 'WhiskeyIcon' },
    { name: '기네스 드래프트', 
      description: '크리미한 질감의 대표 흑맥주', 
      imageUrl: 'https://s3-alpha-sig.figma.com/img/bbf4/2f7a/4f05b169b02e506eeaee794c25bd5781?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WikHaOpgM6YQPd7XLz6H8MAxlJHDcVg6xT2zbwiJ6ZcCAlkBJ29LVsTM82mn3vGLitr-lIpv7Sxcnga63E5-QeF4zHZesirN1oWyj0R-NFhos8Qy4Hb9it4AaBhqMnnL4E~QNZ~ubGKgUQiiB8HDWpG11UD5fZUZdJ31KQ6N0Jv8A8K1W3-O-BNRsc74HQVZP4C4hJqr3kbKEbGNHhnusDOuHrRkhvP9II9Xb8-xd8-6CAQQegWvbTyTiTGBbPTzvwX18b3NSFoUWupcDO80U9kknuqTb~2EZH2dRcHZt94SYgmv48JIIiKEnqWAhvurTc1XJmqQo2~PX2UJgpGbbQ__', 
      iconType: 'WhiskeyIcon' },
    { name: '마가리타', 
      description: '솔티, 라임, 중독적인 마무리', 
      imageUrl: 'https://s3-alpha-sig.figma.com/img/7dbd/7a27/c0d51b73785689553a9c6fdaec1be74a?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ac-LvTooEq8UngDIWZug914ZAvV2h0xMEPoSWSOqR1GJL1X5G3m-q8SkMuuF-eM~TqgeP2GW0ZzMM9kdvzrb-8XeTJRfQyDB-ONOcFGb78oSUKAchuibqYsifL8vJsQ6uyiq2okLRJkrXJd3fZTWnfzgasXEY2yHOQBCqt6zlgtf4DdrDwLm4b856Sx2NJlCc6TDb9lLHF01wZd-XU0wbZWZvSnZC4M96KTsHqdIzHa8asmFwt0ioiAGF-wyJyKIASppxJyre5oTWOuoCK1PNO7012aQI6EY69kHir3UfZyv9TWdQsHC7Rd4sr-tT~lFf4z-aTh~AMbZDFLAVLCO-w__', 
      iconType: 'WhiskeyIcon' },
    { name: '말리부', 
      description: '달콤한 코코넛 럼의 대명사', 
      imageUrl: 'https://s3-alpha-sig.figma.com/img/3365/5fa9/b28403af3a2b2e94e9a74f558dd6cbc0?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pTi4FuKfx-41Iz17h3JDGlWBkA8IPOJrNqP~wZdwnRf1crS5MvOsbsKbC970w3SPrphYTRJ-gDrtj2ertZeY3PXVQsRWX~FdBJEStw7v5~ijwkfqTfuHHRrbjDHHk7TyiC7tXGk-03Of6lJh6be~DPMCryCVP8VSYbcA3q0-1O~ErX5mcPY~Xp3whE8BIFdZjYr529fEXluRSHuPzfNU11pUKHNsWvr-xZLgUZtM~M3F7sku3Cy8owMb8MvLvwUgIrpmQyvnHfLknvPSJHzwVaePDoWiL-fckCYmo4uUslUWxxzx2UFm4AmThq8n-RLWHhhEh1Z0FwC6SOqxohDB~A__', 
      iconType: 'WhiskeyIcon' },
  ];
  

  return (
    <>
      <Header/>
      <div className="pick-container">
        <div className="picking-container">
          <button onClick={handlePrevDrink} className="pick-arrow pick-arrow-left">
            <img src="/image/leftbutton.png" alt="Previous" className="leftarrow-image" />
          </button>

          <div className="pick-content">
                <PickLabel />
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
