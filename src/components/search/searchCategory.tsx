import React, { useState } from "react";

interface SearchCategories {
    onClick1: () => void; // 주종 선택 시 호출
    onClick2: () => void; // 도수 선택 시 호출
    onClick3: () => void; // 향 선택 시 호출
    onClick4: () => void; // 맛 선택 시 호출
    onClick5: () => void; // 분위기 선택 시 호출
}
const SearchCategory: React.FC<SearchCategories> = ({ onClick1, onClick2, onClick3, onClick4, onClick5 }) => {
    const [activeCard, setActiveCard] = useState<string | null>(null);

    const handleCardClick = (card: string) => {
        setActiveCard(card);
        switch (card) {
            case "주종":
                onClick1();
                break;
            case "도수":
                onClick2();
                break;
            case "향":
                onClick3();
                break;
            case "맛":
                onClick4();
                break;
            case "분위기":
                onClick5();
                break;
            default:
                break;
        }
    };

    const cards = ["주종", "도수", "향", "맛", "분위기"];

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

export default SearchCategory;

