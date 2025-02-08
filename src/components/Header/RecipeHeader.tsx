import React, { useState } from "react";
import "./MainHeader.css";
import HeaderSearchBar from "../search/headerSearchBar";

const MainHeader: React.FC = () => {
  const [isRecipeHovered, setIsRecipeHovered] = useState(false);
  const [isNoteHovered, setIsNoteHovered] = useState(false);
  const [isMyHovered, setIsMyHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 여부 관리

  const handleRecipeMouseEnter = () => setIsRecipeHovered(true);
  const handleRecipeMouseLeave = () => setIsRecipeHovered(false);

  const handleNoteMouseEnter = () => setIsNoteHovered(true);
  const handleNoteMouseLeave = () => setIsNoteHovered(false);

  const handleMyMouseEnter = () => setIsMyHovered(true);
  const handleMyMouseLeave = () => setIsMyHovered(false);

  return (
    <header className="header">
      <a href="/" className="logo">
        <img src="/image/Logo.svg" alt="Tasteholic Logo" />
        <span className="logo-text">Tasteholic</span>
      </a>
      <div className="header-search-bar">
        <HeaderSearchBar />
      </div>
      <ul className="nav-links">
        {/* RECIPE */}
        <li
          className="nav-item"
          onMouseEnter={handleRecipeMouseEnter}
          onMouseLeave={handleRecipeMouseLeave}
        >
          <p className="nav-link recipeWord">RECIPE</p>
          {isRecipeHovered && (
            <div className="recipe-dropdown-menu">
              <a href="/user-recipe" className="recipe-item">
                유저 레시피
              </a>
              <hr className="dropdown-divider" />
              <a href="/my-recipe" className="recipe-item">
                내 레시피 보기
              </a>
              <hr className="dropdown-divider" />
              <a href="/write-recipe" className="recipe-item">
                레시피 작성하기
              </a>
            </div>
          )}
        </li>

        {/* NOTE */}
        <li
          className="nav-item"
          onMouseEnter={handleNoteMouseEnter}
          onMouseLeave={handleNoteMouseLeave}
        >
          <p className="nav-link">NOTE</p>
          {isNoteHovered && (
            <div className="note-dropdown-menu">
              <a href="/write-note" className="note-item">
                테이스팅 노트 작성
              </a>
              <hr className="note-divider" />
              <a href="/view-notes" className="note-item">
                전체 노트 보기
              </a>
            </div>
          )}
        </li>

        {/* MY */}
        <li
          className="nav-item"
          onMouseEnter={handleMyMouseEnter}
          onMouseLeave={handleMyMouseLeave}
        >
          <p className="nav-link">MY</p>
          {isMyHovered && (
            <div
              className={
                isLoggedIn
                  ? "my-dropdown-menu logged-in"
                  : "my-dropdown-menu logged-out"
              }
            >
              {isLoggedIn ? (
                <>
                  <a href="/profile/account" className="my-item">
                    마이페이지
                  </a>
                  <hr className="my-divider" />
                  <a href="/profile/myrecipes" className="my-item">
                    작성한 레시피
                  </a>
                  <hr className="my-divider" />
                  <a href="/profile/mybar" className="my-item">
                    내 바
                  </a>
                  <hr className="my-divider" />
                  <a href="/logout" className="my-item">
                    로그아웃
                  </a>
                </>
              ) : (
                <>
                  <a href="/login" className="my-item">
                    로그인
                  </a>
                  <hr className="my-divider" />
                  <a href="/signup" className="my-item">
                    회원가입
                  </a>
                </>
              )}
            </div>
          )}
        </li>
      </ul>
    </header>
  );
};

export default MainHeader;
