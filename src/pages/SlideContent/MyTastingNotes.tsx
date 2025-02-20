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
  const categories = ["cocktail", "whiskey", "gin&rum&tequila", "wine", "other"];

  useEffect(() => {
    const fetchTastingNotes = async () => {
      try {
        const notes: TastingNote[] = [];

        for (const category of categories) {
          const response = await fetch(
            `http://54.180.45.230:3000/api/v1/users/tasting-notes?type=${category}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch tasting notes for ${category}`);
          }

          const data = await response.json();

          if (data.tastingNotes) {
            const formattedNotes = data.tastingNotes.map((note: any) => ({
              id: note.id,
              image: note.image ? note.image : "/image/TastingNoteCard.svg",
              name: note.Category,
              date: note.createdAt.split("T")[0],
            }));
            notes.push(...formattedNotes);
          }
        }

        setTastingNotes(notes); // 모든 카테고리 데이터를 합쳐서 상태에 저장
      } catch (error) {
        console.error("Error fetching tasting notes:", error);
      }
    };

    fetchTastingNotes();
  }, []);

  return (
    <div className="tasting-note-container">
      <div className="tasting-note-list">
        {tastingNotes.slice(0, 3).map((drink) => ( // 첫 3개만 표시
          <TastingNoteCard
            key={drink.id}
            image={drink.image}
            name={drink.name}
            date={drink.date}
            onClick={() => console.log(`${drink.name} clicked`)}
          />
        ))}
      </div>

      {tastingNotes.length > 3 && ( // 3개 초과할 때만 버튼 표시
        <button
          className="view-all-button"
          onClick={() => navigate("/view-notes")}
        >
          테이스팅 노트에서 전체보기
          <img src="/image/Arrow.svg" className="button-icon" alt="Arrow" />
        </button>
      )}
    </div>
  );
};

export default MyTastingNotes;
