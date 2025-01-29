import React from "react";
import "./TastingNoteCard.css";

interface TastingNoteCardProps {
  image: string;
  name: string;
  date: string;
  onClick?: () => void;
}

const TastingNoteCard: React.FC<TastingNoteCardProps> = ({
  image,
  name,
  date,
  onClick,
}) => {
  return (
    <div className="tasting-note-card" onClick={onClick}>
      <div className="tasting-note-image-container">
        <img src={image} alt={name} className="tasting-note-image" />
      </div>
      <p className="tasting-note-name">{name}</p>
      <p className="tasting-note-date">{date}</p>
    </div>
  );
};

export default TastingNoteCard;
