import React from "react";

interface CocktailCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

const CocktailCard: React.FC<CocktailCardProps> = ({ name, image, onClick }) => {
  return (
    <div className="cocktail-card" onClick={onClick}>
      <img src={image} alt={name} className="cocktail-image" />
    </div>
  );
};

export default CocktailCard;
