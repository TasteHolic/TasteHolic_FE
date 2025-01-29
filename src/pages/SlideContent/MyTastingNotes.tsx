import "./MyTastingNotes.css";
import TastingNoteCard from "../../components/productCard/TastingNoteCard";
import React from "react";
import { useNavigate } from "react-router-dom";
const dummyData = [
  {
    id: 1,
    image: "/image/TastingNoteCard.svg",
    name: "에스프레소 마티니",
    date: "2025. 2. 16",
  },
  {
    id: 2,
    image: "/image/TastingNoteCard.svg",
    name: "홀라후프",
    date: "2025. 2. 16",
  },
  {
    id: 3,
    image: "/image/TastingNoteCard.svg",
    name: "갓 파더",
    date: "2025. 2. 16",
  },
  {
    id: 4,
    image: "/image/TastingNoteCard.svg",
    name: "모히또",
    date: "2025. 2. 16",
  },
  {
    id: 5,
    image: "/image/TastingNoteCard.svg",
    name: "피나콜라다",
    date: "2025. 2. 16",
  },
];

const MyTastingNotes: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="tasting-note-container">
      <div className="tasting-note-list">
        {dummyData.map((drink, index) => (
          <TastingNoteCard
            key={index}
            image={drink.image}
            name={drink.name}
            date={drink.date}
            onClick={() => console.log(`${drink.name} 클릭됨`)}
          />
        ))}
      </div>

      <button
        className="view-all-button"
        onClick={() => navigate("/tastingnote")}
      >
        테이스팅 노트에서 전체보기
        <img src="/image/Arrow.svg" className="button-icon" />
      </button>
    </div>
  );
};

export default MyTastingNotes;
