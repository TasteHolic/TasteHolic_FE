import React from "react";
import "./TastingNoteModalBackground.css";

const TastingNoteModalBackground: React.FC = () => {
  return (
    <div className="modal-background">
      <div className="blur-circle yellow"></div>
      <div className="blur-circle white"></div>
    </div>
  );
};

export default TastingNoteModalBackground;
