import React from "react";
import "./DrinkProps.css";

interface DrinkProps {
  image: string;
  name: string;
  category: string;
  onDelete: () => void;
}

const DrinkCard: React.FC<DrinkProps> = ({
  image,
  name,
  category,
  onDelete,
}) => {
  return (
    <div className="drink-card">
      <div className="drink-image-container">
        <img src={image} alt={name} className="drink-image" />
        <div className="delete-button" onClick={onDelete}>
          <img src="/image/trash.svg" alt="Delete" />
        </div>
      </div>
      <p className="drink-name">{name}</p>
      <p className="drink-category">{category}</p>
    </div>
  );
};

export default DrinkCard;
