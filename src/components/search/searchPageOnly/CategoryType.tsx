import React from "react";

interface TypeCardProps {
  type: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoryType: React.FC<TypeCardProps> = ({ type, isActive, onClick }) => {
  const styles = {
    card: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "209px",
      height: "64px",

      color: "#fff",
      textAlign: "center" as const,
      fontFamily: "Pretendard",
      fontSize: "16px",
      fontStyle: "normal" as const,
      fontWeight: 400,
      lineHeight: "normal",
      letterSpacing: "-0.64px",
      textTransform: "capitalize" as const,

      borderRadius: "8px",
      border: isActive ? "1px solid #F3F5F6" : "none",
      background: isActive ? "#4D4D4D" : "var(--grayscale-gray800, #242525)",
      boxShadow:
        "2px 2px 5px 0px rgba(0, 0, 0, 0.25) inset, 0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      cursor: "pointer",
      transition: "background 0.3s",
      outline: "none",
    },
  };

  return (
    <button
      style={styles.card}
      onClick={onClick}
      onMouseOver={(e) => {
        (e.target as HTMLElement).style.border = "1px solid #F3F5F6";
      }}
      onMouseOut={(e) => {
        (e.target as HTMLElement).style.border = isActive
          ? "1px solid #F3F5F6"
          : "none";
      }}
    >
      {type}
    </button>
  );
};

export default CategoryType;
