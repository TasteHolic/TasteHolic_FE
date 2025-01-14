import React from "react";

const styles = {
  searchBarContainer: {
    background: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "20px",
  },
  searchBar: {
    width: "248px",
    height: "32px",
    position: "relative",
  } as React.CSSProperties,
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    width: "100%",
  } as React.CSSProperties,
  searchInput: {
    width: "100%",
    padding: "10px 15px",
    paddingRight: "40px",
    border: "1px solid #ffffff",
    borderRadius: "20px",
    color: "#FFF",
    height: "14px",
    fontFamily: "Pretendard, sans-serif",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    letterSpacing: "-0.48px",
    textTransform: "capitalize" as const,
    opacity: 0.7,
    outline: "none",
    transition: "border 0.3s",
    boxShadow: "0px 4px 10px 0px rgba(255, 255, 255, 0.10)",
  },
  searchInputPlaceholder: {
    color: "#FFF",
    width: "84px",
    height: "13.176px",
    flexShrink: 0,
    fontFamily: "Pretendard, sans-serif",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    letterSpacing: "-0.48px",
    textTransform: "capitalize" as const,
    opacity: 0.7,
  },
  searchButton: {
    position: "absolute" as const,
    background: "none",
    border: "none",
    right: "-7px",
    color: "#ffffff",
    cursor: "pointer",
    outline: "none",
  },
};

const headerSearchBar: React.FC = () => {
  const placeholderText: string = "Find Your Taste...";

  return (
    <div style={styles.searchBarContainer}>
      <div style={styles.searchBar}>
        <div style={styles.inputWrapper}>
          <input
            style={styles.searchInput}
            type="text"
            placeholder={placeholderText}
          />
          <button style={styles.searchButton} aria-label="Search">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.25 11.9412L9.7125 9.55296M11.0833 6.45099C11.0833 8.87672 8.994 10.8432 6.41667 10.8432C3.83934 10.8432 1.75 8.87672 1.75 6.45099C1.75 4.02527 3.83934 2.05884 6.41667 2.05884C8.994 2.05884 11.0833 4.02527 11.0833 6.45099Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default headerSearchBar;
