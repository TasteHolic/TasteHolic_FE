import "./MyTastingNotes.css";
import TastingNoteCard from "../../components/productCard/TastingNoteCard";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditNoteModal from "../EditNoteModal";

interface TastingNote {
  id: number;
  image: string;
  name: string;
  date: string;
  category: string;
}

const MyTastingNotes: React.FC = () => {
  const navigate = useNavigate();
  const [tastingNotes, setTastingNotes] = useState<TastingNote[]>([]);
  const [selectedNoteData, setSelectedNoteData] = useState<any | null>(null);
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
            for (const note of data.tastingNotes) {
              notes.push({
                id: note.id,
                image: note.image ? note.image : "/image/TastingNoteCard.svg",
                name: note.name,
                date: note.createdAt.split("T")[0],
                category,
              });
            }
          }
        }

        setTastingNotes(notes);
      } catch (error) {
        console.error("Error fetching tasting notes:", error);
      }
    };

    fetchTastingNotes();
  }, []);

  const fetchNoteDetails = async (noteId: number) => {
    try {
      const response = await fetch(
        `http://54.180.45.230:3000/api/v1/users/tasting-note/${noteId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tasting note details");
      }

      const data = await response.json();
      console.log("📌 Fetched Note Data:", data);

      if (!data.userTastingNote) {
        console.warn("⚠️ No user tasting note found");
        return;
      }

      setSelectedNoteData(data);
    } catch (error) {
      console.error("Error fetching note details:", error);
    }
  };

  return (
    <div className="tasting-note-container">
      <div className="tasting-note-list">
        {tastingNotes.slice(0, 3).map((drink) => (
          <TastingNoteCard
            key={drink.id}
            image={drink.image}
            name={drink.name}
            date={drink.date}
            onClick={() => fetchNoteDetails(drink.id)}
          />
        ))}
      </div>

      {tastingNotes.length > 3 && (
        <button
          className="view-all-button"
          onClick={() => navigate("/view-notes")}
        >
          테이스팅 노트에서 전체보기
          <img src="/image/Arrow.svg" className="button-icon" alt="Arrow" />
        </button>
      )}

      {/* EditNoteModal - API 데이터가 로드되었을 때만 표시 */}
      {selectedNoteData && (
        <EditNoteModal
          isOpen={Boolean(selectedNoteData)}
          onClose={() => setSelectedNoteData(null)}
          onComplete={(updatedData) => {
            setTastingNotes((prevNotes) =>
              prevNotes.map((note) =>
                note.id === Number(updatedData.noteId)
                  ? { ...note, name: updatedData.name, date: updatedData.date }
                  : note
              )
            );
            setSelectedNoteData(null);
          }}
          initialData={{
            noteId: String(selectedNoteData.userTastingNote.id),
            name: selectedNoteData.userTastingNote.name,
            category: selectedNoteData.userTastingNote.category,
            flavors: selectedNoteData.userTastingNote.tasteRating ?? [],
            aromas: selectedNoteData.userTastingNote.aromaRating ?? [],
            alcohol: selectedNoteData.userTastingNote.abv ?? null,
            colors: [],
            finish: selectedNoteData.userTastingNote.finishRating ?? [],
            note: selectedNoteData.userTastingNote.description ?? "",
            ingredients: selectedNoteData.expertTastingNote?.ingredients ?? [],
          }}
        />
      )}
    </div>
  );
};

export default MyTastingNotes;
