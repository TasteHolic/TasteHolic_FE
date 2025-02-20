import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeHeader.css";
import HeaderSearchBar from "../search/headerSearchBar";

const RecipeHeader: React.FC = () => {
  const navigate = useNavigate();
  const [isRecipeHovered, setIsRecipeHovered] = useState(false);
  const [isNoteHovered, setIsNoteHovered] = useState(false);
  const [isMyHovered, setIsMyHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 여부 관리

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // token이 있으면 true, 없으면 false
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://54.180.45.230:3000/api/v1/users/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        console.log("로그아웃 성공");
        localStorage.removeItem("token");
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/");
      } else {
        console.error("로그아웃 실패:", response.status);
      }
    } catch (error) {
      console.error("네트워크 오류:", error);
    }
  };

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
          <p className="nav-link recipe-word">RECIPE</p>
          {isRecipeHovered && (
            <div className="header-dropdown-menu">
              <a href="/my-recipe" className="header-dropdown-item">
                내 레시피
              </a>
              <hr className="header-dropdown-divider" />
              <a href="/recipe" className="header-dropdown-item">
                레시피 탐색
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
            <div className="header-dropdown-menu">
              <a href="/write-note" className="header-dropdown-item">
                테이스팅 노트 작성
              </a>
              <hr className="header-dropdown-divider" />
              <a href="/view-notes" className="header-dropdown-item">
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
            <div className="header-dropdown-menu">
              {isLoggedIn ? (
                <>
                  <a href="/mypage" className="header-dropdown-item">
                    마이페이지
                  </a>
                  <hr className="header-dropdown-divider" />
                  <button
                    onClick={handleLogout}
                    className="header-dropdown-item logout-button"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="header-dropdown-item">
                    로그인
                  </a>
                  <hr className="header-dropdown-divider" />
                  <a href="/signup" className="header-dropdown-item">
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

export default RecipeHeader;
