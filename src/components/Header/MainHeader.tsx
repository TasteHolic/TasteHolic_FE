import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MainHeader.css";
import HeaderSearchBar from "../search/headerSearchBar";

const MainHeader: React.FC = () => {
  const navigate =useNavigate();
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
      const response = await fetch("http://54.180.45.230:3000/api/v1/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 토큰 포함
        },
      });

      if (response.ok) {
        console.log(" 로그아웃 성공");
        localStorage.removeItem("token"); //토큰 삭제
        setIsLoggedIn(false); //
        navigate("/"); // main페이지 이동
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
          <p className="nav-link">RECIPE</p>
          {isRecipeHovered && (
            <div className="recipe-dropdown-menu">
              <a href="/recipe" className="recipe-item">
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
                  {/* <a href="/logout" className="my-item">
                    로그아웃
                  </a> */}
                  <button onClick={handleLogout} className="my-item logout-button">로그아웃</button> 
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
