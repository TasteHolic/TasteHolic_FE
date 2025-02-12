import React, { useState } from "react";
import "pretendard/dist/web/static/pretendard.css"

interface MainSearch {
    myBarClick: () => void; //My Bar 일시 호출
    searchClick: () => void; //검색 시 호출
    searched?: string;
}

const searchBar: React.FC<MainSearch> = ({myBarClick, searchClick, searched}) => {
  const [isMyBar, setIsMyBar] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const placeholderText = "위스키, 와인, 만들어보고 싶은 레시피 등을 검색해보세요.";
    
  const handleToggle = () => {
    setIsMyBar((prevState) => !prevState);
  };

  const styles = {
    searchBarContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    searchBar: {
      display: "flex",
      alignItems: "center",
      width: "586px",
      height: "64px",
      flexShrink: 0,
      borderRadius: "16px",
      background: "#121212",
      boxShadow: inputValue
        ? "0px 0px 20px 0px rgba(244, 43, 114, 0.25)"
        : "0px 0px 20px 0px rgba(255, 255, 255, 0.25)",
      transition: "box-shadow 0.3s ease",
    },
    inputWrapper: {
      display: "flex",
      position: "relative",
      flexGrow: 1,
    } as React.CSSProperties,
    searchInput: {
      borderRadius: "16px",
      width: "335px",
      height: "19px",
      background: "#121212",
      color: "#FFF",
      textAlign: "left" as const,
      fontFamily: "Pretendard, sans-serif",
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: "normal",
      letterSpacing: "-0.64px",
      textTransform: "capitalize" as const,
      border: "none",
      outline: "none",
      caretColor: "#F42B72",
    },
    pplaceholder: {
        color: "#9B9898",
        textAlign: "center",
        fontFamily: '"Pretendard JP", sans-serif',
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 300,
        lineHeight: "normal",
        letterSpacing: "-0.64px",
        textTransform: "capitalize",
    },
    separator: {
      width: "1px",
      height: "42px",
      background: "#818181",
      marginLeft: "26.16px",
      marginRight: "25px",
    },
    clearButton: {
      position: "absolute" as const,
      top: "50%",
      marginTop: "2px",
      right: "14px",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      padding: "0px",
      cursor: "pointer",
      outline: "none",
    },
    toggleContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    toggleLabel: {
      marginLeft: "20px",
      color: "#F7FCF6",
      textAlign: "center" as const,
      fontFamily: "Pretendard JP, sans-serif",
      fontSize: "14px",
      fontWeight: 300,
      letterSpacing: "-0.56px",
      textTransform: "capitalize" as const,
    },
    toggleSwitch: {
      width: "37.839px",
      height: "24px",
      background: isMyBar
        ? "#36B5F4"
        : "rgba(120, 120, 128, 0.40)",
      boxShadow: "0px 5.391px 5.391px 0px rgba(0, 0, 0, 0.25)",
      borderRadius: "12px",
      position: "relative" as const,
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    knob: {
      width: "20px",
      height: "20px",
      backgroundColor: "#fff",
      borderRadius: "50%",
      position: "relative" as const,
      marginTop: "2px",
      left: isMyBar ? "15.839px" : "2px",
      transition: "left 0.3s ease",
    },
    searchButton: {
      background: "none",
      border: "none",
      padding: "0px",
      marginTop: "5px",
      marginRight: "20px",
      cursor: "pointer",
      outline: "none",

    },
    searchButtonSvg: {
      marginTop: "5px",
      width: "24px",
      height: "24px",
      fill: inputValue ? "#F42B72" : "#fff",
    },
  };

  return (
    <div style={styles.searchBarContainer}>
      <div style={styles.searchBar}>
        <div style={styles.toggleContainer}>
          <span style={styles.toggleLabel}>My Bar</span>
          <div style={styles.toggleSwitch}   onClick={() => {
          handleToggle();
          myBarClick();
          }}>
            <div style={styles.knob}></div>
          </div>
        </div>
        <div style={styles.separator} />
        <div style={styles.inputWrapper}>
          <input
            style={styles.searchInput}
            type="text"
            placeholder={placeholderText}
            className="search-iinput"
            value={searched ?? inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {inputValue && (
            <button style={styles.clearButton} onClick={() => setInputValue("")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  fill="#D9D9D9"
                  fillOpacity="0.3"
                />
                <path
                  d="M15 9L9 15"
                  stroke="#9E9E9E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 9L15 15"
                  stroke="#9E9E9E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        <button style={styles.searchButton} onClick={searchClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
              style={styles.searchButtonSvg}
            />
          </svg>
        </button>
      </div>
      <style>
        {`
          .search-iinput::pplaceholder {
            color: ${styles.pplaceholder.color};
            text-align: ${styles.pplaceholder.textAlign};
            font-family: ${styles.pplaceholder.fontFamily};
            font-size: ${styles.pplaceholder.fontSize};
            font-style: ${styles.pplaceholder.fontStyle}
            font-weight: ${styles.pplaceholder.fontWeight};
            letter-spacing: ${styles.pplaceholder.letterSpacing};
            text-transform: ${styles.pplaceholder.textTransform};
          }
        `}
      </style>
    </div>
  );
};

export default searchBar;
