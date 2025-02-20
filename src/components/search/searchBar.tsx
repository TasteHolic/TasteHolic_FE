import React, { useState, useEffect } from "react";
import "pretendard/dist/web/static/pretendard.css";

interface MainSearch {
  myBarClick: () => void;
  searchClick: (query: string) => void;
  searched?: string;
}

const SearchBar: React.FC<MainSearch> = ({
  myBarClick,
  searchClick,
  searched,
}) => {
  const [isMyBar, setIsMyBar] = useState(false);
  const [inputValue, setInputValue] = useState(searched ?? "");

  useEffect(() => {
    if (searched !== undefined) {
      setInputValue(searched);
    }
  }, [searched]);

  const handleSearch = () => {
    if (inputValue.trim() === "") return;

    console.log("🔍 검색 실행:", inputValue); // 실행 확인
    searchClick(inputValue);
  };

  const handleToggle = () => {
    setIsMyBar((prevState) => !prevState);
    myBarClick();
  };

  const placeholderText =
    "위스키, 와인, 만들어보고 싶은 레시피 등을 검색해보세요.";

  return (
    <div style={styles.searchBarContainer}>
      <div
        style={{
          ...styles.searchBar,
          boxShadow: inputValue
            ? styles.searchBarActive.boxShadow
            : styles.searchBar.boxShadow,
        }}
      >
        {/* My Bar Toggle */}
        <div style={styles.toggleContainer}>
          <span style={styles.toggleLabel}>My Bar</span>
          <div
            style={{
              ...styles.toggleSwitch,
              background: isMyBar ? "#36B5F4" : "rgba(120, 120, 128, 0.40)",
            }}
            onClick={() => {
              handleToggle();
              myBarClick();
            }}
          >
            <div
              style={{ ...styles.knob, left: isMyBar ? "15.839px" : "2px" }}
            ></div>
          </div>
        </div>

        <div style={styles.separator} />

        {/* 검색 입력창 */}
        <div style={styles.inputWrapper}>
          <input
            style={styles.searchInput}
            type="text"
            placeholder={placeholderText}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {inputValue && (
            <button
              style={styles.clearButton}
              onClick={() => setInputValue("")}
            >
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

        {/* 검색 버튼 */}
        <button style={styles.searchButton} onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
              style={{
                fill: inputValue ? "#F42B72" : "#fff",
                transition: "fill 0.3s ease-in-out",
              }}
            />
          </svg>
        </button>

      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  searchBarContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "586px",
    height: "64px",
    borderRadius: "16px",
    background: "#121212",
    boxShadow: "0px 0px 20px 0px rgba(255, 255, 255, 0.25)",
    transition: "box-shadow 0.3s ease",
  },
  searchBarActive: {
    boxShadow: "0px 0px 20px 0px rgba(244, 43, 114, 0.25)",
  },
  inputWrapper: {
    display: "flex",
    position: "relative",
    flexGrow: 1,
  },
  searchInput: {
    borderRadius: "16px",
    width: "355px",
    height: "19px",
    background: "#121212",
    color: "#FFF",
    textAlign: "left" as const,
    fontFamily: "Pretendard, sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    border: "none",
    outline: "none",
    caretColor: "#F42B72",
  },
  separator: {
    width: "1px",
    height: "42px",
    background: "#818181",
    marginLeft: "26.16px",
    marginRight: "25px",
    marginTop: "5px",
  },
  clearButton: {
    position: "absolute" as const,
    top: "50%",
    right: "-1px",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#9E9E9E",
    fontSize: "18px",
    marginTop: "2px",
  },
  toggleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  toggleLabel: {
    marginLeft: "20px",
    color: "#F7FCF6",
    fontFamily: "Pretendard JP, sans-serif",
    fontSize: "14px",
  },
  toggleSwitch: {
    width: "38px",
    height: "24px",
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
    position: "absolute" as const,
    top: "2px",
    transition: "left 0.3s ease",
  },
  searchButton: {
    background: "none",
    border: "none",
    padding: "0px",
    marginRight: "20px",
    cursor: "pointer",
    fontSize: "20px",
    color: "white",
    marginTop: "5px",
  },
  searchButtonSvg: {
    width: "24px",
    height: "24px",
    fill: "#FFF",
  },
};

export default SearchBar;
