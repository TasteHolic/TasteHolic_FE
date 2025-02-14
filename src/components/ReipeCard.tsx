import React from "react";
import "./RecipeCard.css";

export interface Keyword {
  label: string;
  type: "variety" | "alcoholPer" | "aroma" | "flavor" | "mood";
}

interface RecipeCardProps {
  name: string;
  image: string;
  keyWords: Keyword[];
  onClick: () => void;
  isMyBar: boolean;
  isSelected: boolean;
}

const Icons = {
    CocktailIcon: "https://s3-alpha-sig.figma.com/img/ff39/a53d/568721f519d5b8a34906e4502ad6d303?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ggyV11fWEVyTXwVC08VGBOHizZOqJZxlmc9vyzhaMfEulX9tCP13aWjGJNknahbkU9EJ~p7t4QIBbPDClAtq--Uw4CPOSGnK8L5FcFPwL-HIutFbbWe6411I0-Z8~dmaLdJY61jWA-q8gwpU6o-V2fmb8bs2lPLM1MU33NY93RFP4LnKCzNYsSk3~3tMN89PxH-~B8LogwMWj4wrSY3OyKsSBxuC0YcnGgcLDv6AuuCFujqyHCHpou~GtVrNB1GudBIRQiVyjhBKtqiRAGV~76CmuFSrRbgXi3DgZ~6D5~6Nt3OcZJXsUzI1uK717FrGT6pDYksVJ262Pa-C9CU-~w__",
    EtcIcon: "https://s3-alpha-sig.figma.com/img/f630/78e3/17056e2585eb5851338120a504c7c6e1?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qOyPl9-2qKHcvKs1L5tiMGzkP9Zvxv0szDmq2vsXiHGfCVYyl7VjBWfCndl~nTdcuSk~DHC1ZK-yNW3wwEcsh9n6xwYpji9~5i0qmbEXt5s0kBg~d7QuqSyBZ4LHsFHJrhvHLeF68Po6DI5L4HSWpX1hsxwJjXTPaXexSRMjB4HqkWLJuDzzgvaj1~gVeLrccYTtOxCYLKps0mdRKuXpV4AIwvrVxfodaCcNJY4RuGEeJeTeW203jDVsQix9ApdgH58Gf4uJ4eCR8lSBekWWw4xIc2BMNXr8kIdVUZNdvNZDbjbPf7Nw1W2JGyrjGPMER8dQwJ-l8MSmNmlAoSwYEQ__",
    GinrumteqIcon: "https://s3-alpha-sig.figma.com/img/403f/601a/484293ee2dc4d78823c9623f0fb14085?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tr8U~8HvBq5bU14yTL4sJruzwb9OuAL9t~SPCzvev1zz3V2uC~B4IuTI5SwGzFezkCZjeGO7yvLUD7prSa~CsZfKSxeLHk6d0m115azsXv-z0gPAzLJiTVfprQ7BFBQXGgV1j--kLXmWOuWFneLEuDk5bcnz-4iK~V9KHN41nays6dLfImwfR9MsKSmMekdvhcginhM8vE97dP7Od8SpQbJlldIThFwV2rVfUMa-SpM33blBzzjAx-fLS0qr6M-U~DyjE87JFljTjooi-GThC0fG6YORFA9mKwTx3m0V1CTj4jUJiRIQxFzr3UXANxbBlE7xS-~x4Bn7mU2Xuzn~Tw__",
    WhiskeyIcon: "https://s3-alpha-sig.figma.com/img/6ad8/8422/2c0b2b6ac687ca49ed46c32c93aa120d?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KdGeYB3nVl64dqpzfAZ4zkYDifRbfVU9P3WJlBbQ0Rz~T7TlNK-hn7ViGUoJVCm5y31XegEeUeABzckBPA5KjhKxjpmpnkxuPzbOMSmunztcXFCa0NBwnekJi3gIQawVODzatsfTDKfuxFsh2WVnLuq2d2RlPYAnxiST9bcGYNTrRXMx4o66~h8BXZe47L4Uhus2Xatc8A5A39d9mFY0Z2PSb6AwhF4KrQU9XBZ~rzc6X9TwtHnn9eNXLAwu2JZx6ZXA5QXZ9L9r91THdM~Xc1~w-yH0~LvSHOeO6GM9YOY79he0jsuBuvxo2n-zOqr5ZThIPkPhNvZSin0gQ4ZXvw__",
};

const RecipeCard: React.FC<RecipeCardProps> = ({ name, image, keyWords, onClick, isMyBar, isSelected }) => {
  return (
    <div className={`recipe-card ${isSelected ? "selected" : ""}`} onClick={onClick}>
      <div className="gradient"/>
      <img src={image} alt={name} className="cocktail-image" />

      {isMyBar &&
      <div className="my-bar-tag">
        My Bar
        <img src="/image/Done.png" className="done-img"/>
      </div>}

      <p className="name">{name}</p>
      <div className="keywords-container">
        {keyWords.slice(0, 4).map((keyword, index) => (
          <span key={index} className={`keyword ${keyword.type}`}>
            {keyword.type === "variety" && keyword.label === "칵테일" && <img src={Icons.CocktailIcon} alt="cocktail" className="icon" />}
            {keyword.type === "variety" && keyword.label === "위스키" && <img src={Icons.WhiskeyIcon} alt="whiskey" className="icon"/>}
            {keyword.type === "variety" && keyword.label === "진, 럼, 데낄라" && <img src={Icons.GinrumteqIcon} alt="ginrumteq" className="icon"/>}
            {keyword.type === "variety" && (keyword.label === "전체 선택" || keyword.label === "기타") && <img src={Icons.EtcIcon} alt="etc" className="icon"/>}
            
            {keyword.label}
          </span>
        ))}
        {keyWords.length > 4 && <div className="keyword etc">...</div>}
      </div>
    </div>
  );
};

export default RecipeCard;
