import React, { useState } from "react";
import "./AlcoholSlideBar.css";

interface AlcoholSlideBarProps {
  addClick: (min: number, max: number) => void;
}

const AlcoholSlideBar: React.FC<AlcoholSlideBarProps> = ({ addClick }) => {
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(100);
  const [isActive, setIsActive] = useState(false);

  const gap = 10;

  const handleMinChange = (value: number) => {
    if (maxRange - value >= gap) {
      setMinRange(value);
      setIsActive(false);
    } else {
      setMinRange(maxRange - gap);
    }
  };

  const handleMaxChange = (value: number) => {
    if (value - minRange >= gap) {
      setMaxRange(value);
      setIsActive(false);
    } else {
      setMaxRange(minRange + gap);
    }
  };

  const handleButtonClick = () => {
    setIsActive(true);
    addClick(minRange, maxRange);
  };

  const progressStyle = {
    "--left": `${minRange}%`,
    "--right": `${100 - maxRange}%`,
  } as React.CSSProperties;

  const minLabelPosition = {
    left: `calc(${(minRange / 100) * 487}px)`,
  };
  const maxLabelPosition = {
    left: `calc(${(maxRange / 100) * 487}px)`,
  };

  return (
    <div className="container">
      <div className="val">
        <div className="minVal" style={minLabelPosition}>
          <div className="min-value numberVal">
            <input type="number" min="0" max="100" value={minRange} disabled />
            <span className="percentage-symbol">%</span>
          </div>
          <svg
            className="anchor"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7 2H12V0H0V2L5 2L5 10H7L7 2Z"
              fill="#454545"
            />
          </svg>
        </div>

        <div className="maxVal" style={maxLabelPosition}>
          <div className="max-value numberVal">
            <input type="number" min="0" max="100" value={maxRange} disabled />
            <span className="percentage-symbol">%</span>
          </div>
          <svg
            className="anchor"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7 2H12V0H0V2L5 2L5 10H7L7 2Z"
              fill="#454545"
            />
          </svg>
        </div>
      </div>

      <div className="range-slider">
        <div className="progress" style={progressStyle}></div>
        <input
          type="range"
          className="range-min"
          min="0"
          max="100"
          value={minRange}
          onChange={(e) => handleMinChange(Number(e.target.value))}
        />
        <input
          type="range"
          className="range-max"
          min="0"
          max="100"
          value={maxRange}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
        />
      </div>

      <button
        className={`addButton ${isActive ? "activeButton" : ""}`}
        onClick={handleButtonClick}
      >
        추가하기
      </button>
    </div>
  );
};

export default AlcoholSlideBar;
