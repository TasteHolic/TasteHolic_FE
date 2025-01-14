import React, { useState } from "react";

const searchCategory: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleCardClick = (card: string) => {
    setActiveCard(card);
  };

  const cards = ["주종", "도수", "향", "맛", "여운"];

  const styles = {
    container: {
      display: "flex",
      gap: "12px",
    },
    card: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "120px",
      height: "44px",
      color: "#FFF",
      fontFamily: "Pretendard",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: "normal",
      letterSpacing: "-0.64px",
      textTransform: "capitalize" as const,
      borderRadius: "8px",
      border: "1px solid #999",
      background: "#121212",
      cursor: "pointer",
      transition: "background 0.3s, border 0.3s",
      outline: "none",
    },
    cardActivated: {
      background: "#343434",
    },
    hover: {
      border: "1px solid #999",
    },
  };

  return (
    <div style={styles.container}>
      {cards.map((card) => (
        <button
          key={card}
          style={{
            ...styles.card,
            ...(activeCard === card && styles.cardActivated),
          }}
          onClick={() => handleCardClick(card)}
          onMouseOver={(e) => {
            (e.target as HTMLElement).style.border = styles.hover.border;
          }}
          onMouseOut={(e) => {
            (e.target as HTMLElement).style.border = "1px solid #999";
          }}
        >
          {card}
        </button>
      ))}
    </div>
  );
};

export default searchCategory;
