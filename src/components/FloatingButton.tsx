import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FloatingButton.css";

const FloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="floating-button-container">
      {/* 오버레이 (isOpen이 true일 때만 표시) */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}

      {isOpen && (
        <div className="plusmenu">
          <button className="plusmenu-item" onClick={() => navigate("/recipe")}>
            레시피 탐색
          </button>
          <button className="plusmenu-item" onClick={() => navigate("/my-recipe")}>
            내 레시피
          </button>
        </div>
      )}

      <button className="floating-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <svg className="xbutton" width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Group 951">
              <g id="Group 944">
                <path id="Vector" d="M27.1299 80.6102C41.9699 95.4501 66.0301 95.4501 80.8701 80.6102C95.71 65.7702 95.71 41.71 80.8701 26.8701C66.0301 12.0301 41.9699 12.0301 27.1299 26.8701C12.29 41.71 12.29 65.7702 27.1299 80.6102Z" fill="#292929" stroke="#808080" strokeOpacity="0.3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <g id="Group 945">
                  <path id="Vector_2" d="M64.6066 43.1348L43.3934 64.348" stroke="#8D8F90" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path id="Vector_3" d="M43.3934 43.1348L64.6066 64.348" stroke="#8D8F90" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
            </g>
          </svg>
        ) : (
          <svg className="plusbutton" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 78C60.9868 78 78 60.9868 78 40C78 19.0132 60.9868 2 40 2C19.0132 2 2 19.0132 2 40C2 60.9868 19.0132 78 40 78Z" fill="#E2E4E6" stroke="#808080" strokeOpacity="0.3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M40 25V55" stroke="#8D8F90" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M25 40H55" stroke="#8D8F90" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default FloatingButton;
