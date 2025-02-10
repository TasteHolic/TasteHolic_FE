import React from "react";

interface CocktailCardProps {
  name: string;
  image: string;
  onClick: () => void;
  isSelected: boolean;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ name, image, onClick, isSelected }) => {
  return (
    <div className={`cocktail-card ${isSelected ? "selected" : ""}`}
      
      onClick={onClick}
    >
      <img src={image} alt={name} className="cocktail-image" />
    </div>
  );
};

export default CocktailCard;
