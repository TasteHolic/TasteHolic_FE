import React, {useState} from "react";

interface TypeLabelProps {
  name: string; 
  onDelete: () => void; 
  category?: "aroma" | "flavor" | "aftertaste";
}

const TypeLabel: React.FC<TypeLabelProps> = ({
  name,
  onDelete,
  category,
}) => {

  const [isFocused, setIsFocused] = useState(false);
  const styles = {
    container: {
      display: "inline-flex",
      height: "20px",
      padding: "8px 12px",
      justifyContent: "center",
      alignItems: "center",
      gap: "4px",
      flexShrink: 0,
      borderRadius: "50px",
      border: `0.8px solid ${
        category === "aroma"
          ? "#D393F4"
          : category === "flavor"
          ? "var(--primary-rose-400, #FB6BA2)"
          : category === "aftertaste"
          ? "var(--subgreen-400-main, #4ECE95)"
          : "#999"
      }`,
      background:
      category === "aroma"
        ? "rgba(211, 147, 244, 0.60)"
        : category === "flavor"
        ? "rgba(251, 107, 162, 0.60)"
        : category === "aftertaste"
        ? "rgba(78, 206, 149, 0.60)"
        : "rgba(153, 153, 153, 0.60)",
    },
    name: {
      color: "#0E0E0E",
      fontFamily: "Pretendard", 
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "normal",
      letterSpacing: "-0.64px",
      textTransform: "capitalize",
    },
    deleteButton: {
        background: "none",
        border: "none",
        padding: 0,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        ...(isFocused
          ? {
              outline: "none",
              border: "none",
            }
          : {}),
      } as React.CSSProperties,
  } as const;

  return (
    <div style={styles.container}>
      <span style={styles.name}>{name}</span>
      <button style={styles.deleteButton} onFocus={() => setIsFocused(true)} onClick={onDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5.5 5.5L14 14"
            stroke="#1D1D1D"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
          <path
            d="M14 5.5L5.5 14"
            stroke="#1D1D1D"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default TypeLabel;
