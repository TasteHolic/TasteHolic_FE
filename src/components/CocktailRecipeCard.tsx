import React, { useState } from "react";
import "./CocktailRecipeCard.css";

interface CocktailRecipeCardProps {
  name: string;
  image: string;
  description: string;
  views: number;
  likes: number;
  isSaved: boolean;
  onToggleSave: () => void;
  onClick: () => void;
}

const CocktailRecipeCard: React.FC<CocktailRecipeCardProps> = ({
  name,
  image,
  description,
  views,
  likes,
  isSaved,
  onToggleSave,
  onClick,
}) => {
  return (
    <div className="cocktailrecipe-card" onClick={onClick}>
      {/* 저장 아이콘 */}
      <button className="save-icon" onClick={(e) => {
        e.stopPropagation(); // 부모 클릭 이벤트 방지
        onToggleSave();
      }}>
        {isSaved ? <svg xmlns="http://www.w3.org/2000/svg" width="23" height="26" viewBox="0 0 23 26" fill="none">
  <path d="M1 1.04102V24.9604L11.3855 18.3739L21.4 24.9604V1.04102H1Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="23" height="26" viewBox="0 0 23 26" fill="none">
  <path d="M1 1.04102V24.9604L11.3855 18.3739L21.4 24.9604V1.04102H1Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>}
      </button>

      {/* MyBar 라벨 (저장된 경우만 표시) */}
      {isSaved && <div className="my-bar-label">My Bar <svg className="checkicon" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
<rect y="0.892578" width="20" height="20" fill="url(#pattern0_1717_3941)"/>
<defs>
<pattern id="pattern0_1717_3941" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlinkHref="#image0_1717_3941" transform="scale(0.015625)"/>
</pattern>
<image id="image0_1717_3941" width="64" height="64" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADe0lEQVR4nO3aa6ilUxzH8TUzDGMyuc2MW5pByKU0QtIUESlJucwL5YVGvJEXkyR5YVKTF6Kk5AVNpijJJSIiMq6NYcww0TDu99zvt48W/8lDx/Pss29n7+esb506Zz+/57/2/7fXfz3/tddJqVAoFAqFQqFQKBRaAq7AGsxL0w2s8g/rsHuaLmBlJP4z3o3f12OP1HawIhL+DcuwJzbFa5uxd2oruLSS/HmV1xdgQ1x7HfumtoHl+CN+Lpzg+q54IUzYiv1TW8DBleQvqtFlEzaGCWtTW8DOuAsXNOhOxA9hwKo0ncBx+CaSvxUz0ziD03BvJwsajsbXkfzqtiT/UyR0SoP2SHwR2jsxK40zOKlSxzd0sDh+HNp7sH23gy7AM3g4LzhpisBSfBcJ3YQZDcl/FNoHMLvbQefjlUpf/fRUbC5wbGURu62ujrEf3g7to9ixl09+YwTaVAm6dpgzAUvwZYy9ZhLJP4Gd+vHJb46eOgd/a5gzAUfg8xjzbmxXo10Y7zXzbNcfkgmSr1wbmgk4CB/GWA9hh4b3/GpoX8pdX9+TH6YJOBAfxBiP1NUxdontrtj0dL/39/cCk/kkrwE1usWDWhOwCO9E7McwpyH5F0ObZ8D8Xgc/A79GwKsbtH03IXd2eDNiPoW5Ndp5eC60b2CvXsf/C5yNXyLwtamGCcqhaxPiqfNaxFpfV8d5dY9VXsyWRd2OOxIm5K+rKo/cl7FbjXZOlEbmvYHt7Q3JhKjjdZWFd2GNdnZ0dqLNPSQNEgM2Ier4+U7qOPfyuC+0n+KwNAwMyISo4ydDuwX71Ghn4Y7Q5q5wSRom+mxC1PHjoclfXS+uiTcTt4f2q7y/T1OBPpkQdfxgXHsfB9TEmYGbQ5t3gkvTVKJHE6KO7680W4c2JJ+3vZnvcUIaBXBOD81S3tBkPsPhDfdeF9ofcXIaJXQ/E7bV8VEN91xTOd46PY0iJj8TtkbyxzRor4qY2eAz0yhjcibMbdqm4rLK8da5aRzAWZ2WQ0OcSyJGPuFZnsYJPZqQT3Uqx1sXp3FElybgfPwe961I44xJmhBPk21ryOWpDejQhLzCV3RXpjahwQScWjneWpnaiP8xIXd10d1lrk9txn9MwPH4Nv6+MU0H/LtZyq1t5pa6s722z4TVY39G3w35LD/+jW28z+gLhUKhUCgUUov4E6BaQvUgsPVaAAAAAElFTkSuQmCC"/>
</defs>
</svg>
</div>}

      {/* 이미지 */}
     <div className="image-container">
      <img src={image} alt={name} className="cocktailrecipe-image" />
    </div>
      {/* 하단 정보 */}
      <div className="cocktail-info">
        <div className="text">
            <p className="cocktail-description">{description}</p>
            <h3 className="cocktail-name">{name}</h3>
            <div className="cocktail-meta">
                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
  <g opacity="0.8">
    <path opacity="0.16" fill-rule="evenodd" clip-rule="evenodd" d="M7.99999 4.7832C5.33485 4.7832 3.19999 6.44206 2.28571 8.7832C3.19999 11.1243 5.33485 12.7832 7.99999 12.7832C10.6651 12.7832 12.8 11.1243 13.7143 8.7832C12.8 6.44206 10.6651 4.7832 7.99999 4.7832ZM7.99999 10.4975C8.45465 10.4975 8.89068 10.3169 9.21217 9.99539C9.53367 9.6739 9.71428 9.23786 9.71428 8.7832C9.71428 8.32855 9.53367 7.89251 9.21217 7.57102C8.89068 7.24953 8.45465 7.06892 7.99999 7.06892C7.54533 7.06892 7.1093 7.24953 6.78781 7.57102C6.46632 7.89251 6.28571 8.32855 6.28571 8.7832C6.28571 9.23786 6.46632 9.6739 6.78781 9.99539C7.1093 10.3169 7.54533 10.4975 7.99999 10.4975Z" fill="#8D8F90"/>
    <path d="M9.71428 8.78264C9.71428 9.2373 9.53367 9.67334 9.21217 9.99483C8.89068 10.3163 8.45465 10.4969 7.99999 10.4969C7.54533 10.4969 7.1093 10.3163 6.78781 9.99483C6.46632 9.67334 6.28571 9.2373 6.28571 8.78264C6.28571 8.32799 6.46632 7.89195 6.78781 7.57046C7.1093 7.24897 7.54533 7.06836 7.99999 7.06836C8.45465 7.06836 8.89068 7.24897 9.21217 7.57046C9.53367 7.89195 9.71428 8.32799 9.71428 8.78264Z" stroke="#8D8F90" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.28571 8.7832C3.19999 6.44206 5.33485 4.7832 7.99999 4.7832C10.6651 4.7832 12.8 6.44206 13.7143 8.7832C12.8 11.1243 10.6651 12.7832 7.99999 12.7832C5.33485 12.7832 3.19999 11.1243 2.28571 8.7832Z" stroke="#8D8F90" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg> {views}  </span>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                 <path d="M11 2.66602C9.83998 2.66602 8.72665 3.20602 7.99998 4.05935C7.27331 3.20602 6.15998 2.66602 4.99998 2.66602C2.94665 2.66602 1.33331 4.27935 1.33331 6.33268C1.33331 8.85268 3.59998 10.906 7.03331 14.026L7.99998 14.8993L8.96665 14.0194C12.4 10.906 14.6666 8.85268 14.6666 6.33268C14.6666 4.27935 13.0533 2.66602 11 2.66602ZM8.06665 13.0327L7.99998 13.0993L7.93331 13.0327C4.75998 10.1593 2.66665 8.25935 2.66665 6.33268C2.66665 4.99935 3.66665 3.99935 4.99998 3.99935C6.02665 3.99935 7.02665 4.65935 7.37998 5.57268H8.62665C8.97331 4.65935 9.97331 3.99935 11 3.99935C12.3333 3.99935 13.3333 4.99935 13.3333 6.33268C13.3333 8.25935 11.24 10.1593 8.06665 13.0327Z" fill="#8D8F90"/>
                    </svg>{likes}</span>
            </div>
            
            
            </div>
          </div>
        </div>
  );
};

export default CocktailRecipeCard;
