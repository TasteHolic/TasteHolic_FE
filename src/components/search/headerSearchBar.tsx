import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  searchBarContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "248px",
    height: "32px",
    borderRadius: "50px",
    border: "1px solid #FFF",
    boxShadow: "0px 4px 10px 0px rgba(255, 255, 255, 0.10)",
    backgroundColor: "transparent",
    position: "relative",
    boxSizing: "border-box",
  } as React.CSSProperties,
  searchInput: {
    flex: "1",
    height: "100%",
    border: "none",
    outline: "none",
    color: "#FFF",
    fontFamily: "Pretendard, sans-serif",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    letterSpacing: "-0.48px",
    textTransform: "capitalize" as const,
    padding: "0 15px",
    backgroundColor: "transparent",
    boxSizing: "border-box",
  } as React.CSSProperties,
  searchButton: {
    position: "absolute" as const,
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: (isClicked: boolean) => ({
    width: "14px",
    height: "14px",
    fill: isClicked ? "rgba(244, 43, 114, 1)" : "#FFF", // 색상을 상태에 따라 변경
    transition: "fill 0.3s ease", // 색상 변화 애니메이션 추가
  }),
};

const HeaderSearchBar: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchValue.trim() === "") {
      setIsSearching(true);
      setIsButtonClicked(true); // 클릭 상태 활성화
      navigate("/search"); // SearchPage로 이동
    }
  };

  return (
    <div style={{ position: "relative", width: "248px", height: "32px" }}>
      {!isSearching && (
        <div style={styles.searchBarContainer}>
          <input
            type="text"
            placeholder="Find Your Taste..."
            style={styles.searchInput}
            className="search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            style={styles.searchButton}
            aria-label="Search"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={styles.searchIcon(isButtonClicked)}
            >
              <path d="M10 2a8 8 0 105.29 14.29l4.71 4.7 1.42-1.42-4.7-4.71A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
            </svg>
          </button>
        </div>
      )}
      {isSearching && (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <button
            style={styles.searchButton}
            aria-label="Search"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={styles.searchIcon(isButtonClicked)}
            >
              <path d="M10 2a8 8 0 105.29 14.29l4.71 4.7 1.42-1.42-4.7-4.71A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderSearchBar;
