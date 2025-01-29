import React, { useState } from "react";
import "./YouTubeSlider.css";

const YouTubeSlider: React.FC = () => {
  const videos = [
    { id: 1, src: "https://www.youtube.com/embed/TYIkr7MIfSM" },
    { id: 2, src: "https://www.youtube.com/embed/b0IuTL3Z-kk" },
    { id: 3, src: "https://www.youtube.com/embed/AWnIqpsfyPU" },
    { id: 4, src: "https://www.youtube.com/embed/sSbd6r4PA8w" },
    { id: 5, src: "https://www.youtube.com/embed/yqniYWLN6PE" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div className="youtube-slider-container">
      <div
        className="slider-wrapper"
        style={{
          transform: `translateX(-${currentIndex * 41.7}%)`,
        }}
      >
        {videos.map((video, index) => {
          // 세 번째로 보이는 영상 계산
          const thirdVideoIndex = (currentIndex + 2) % videos.length;
          const isThird = thirdVideoIndex === index;

          return (
            <div
              key={video.id}
              className={`slider-item ${
                isThird ? "inactive" : "active"
              }`}
            >
              <iframe
                className="video-frame"
                src={video.src}
                frame-border="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          );
        })}
      </div>
      <button className="slider-button next-button" onClick={handleNext}>
        <img
            src="/image/rightbutton.png"
            alt="Previous"
            className="rightarrow-image"
                    />
      </button>
    </div>
  );
};

export default YouTubeSlider;
