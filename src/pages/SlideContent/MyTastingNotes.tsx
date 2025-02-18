import "./MyTastingNotes.css";
import TastingNoteCard from "../../components/productCard/TastingNoteCard";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TastingNote {
  id: number;
  image: string;
  name: string;
  date: string;
}

const MyTastingNotes: React.FC = () => {
  const navigate = useNavigate();
  const [tastingNotes, setTastingNotes] = useState<TastingNote[]>([]);

  useEffect(() => {
    const fetchTastingNotes = async () => {
      try {
        const response = await fetch("http://54.180.45.230:3000/api/v1/users/tasting-notes?type=whiskey", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasting notes");
        }

        const data = await response.json();

        if (data.tastingNotes) {
          const formattedNotes = data.tastingNotes.map((note: any) => ({
            id: note.id,
            // 이미지 URL이 API에 없을 경우 기본 이미지 사용
            image: note.image ? note.image : "/image/TastingNoteCard.svg",
            name: note.Category,
            date: note.createdAt.split("T")[0],
          }));
          setTastingNotes(formattedNotes);
        }
      } catch (error) {
        console.error("Error fetching tasting notes:", error);
      }
    };

    fetchTastingNotes();
  }, []);

  return (
    <div className="tasting-note-container">
      <div className="tasting-note-list">
        {tastingNotes.map((drink) => (
          <TastingNoteCard
            key={drink.id}
            image={drink.image}
            name={drink.name}
            date={drink.date}
            onClick={() => console.log(`${drink.name} clicked`)}
          />
        ))}
      </div>

      <button
        className="view-all-button"
        onClick={() => navigate("/view-notes")}
      >
        테이스팅 노트에서 전체보기
        <img src="/image/Arrow.svg" className="button-icon" />
      </button>
    </div>
  );
};

export default MyTastingNotes;
