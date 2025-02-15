import React, { useState, useEffect } from "react";
import NoteHeader from "../components/Header/NoteHeader";
import Footer from "../components/Footer";
import EditNoteModal from "./EditNoteModal";
import "./TastingNote.css";
import TastingNoteModal from "./TastingNoteModal";
import CompleteModal from "./CompleteModal";

interface Drink {
    id: number;
    name: string;
    image: string;
    createdAt: Date;
    category: string;
}

const DEFAULT_DRINKS: Drink[] = [
    {
        id: 1,
        name: "Black Russian",
        image: "/image/alcohol1.png",
        createdAt: new Date(),
        category: "칵테일",
    },
    {
        id: 2,
        name: "Martini",
        image: "/image/alcohol2.png",
        createdAt: new Date(),
        category: "칵테일",
    },
    {
        id: 3,
        name: "Whiskey Sour",
        image: "/image/alcohol3.png",
        createdAt: new Date(),
        category: "위스키",
    },
    {
        id: 4,
        name: "Pina Colada",
        image: "/image/alcohol4.png",
        createdAt: new Date(),
        category: "진, 럼, 데낄라라",
    },
    {
        id: 5,
        name: "Black Russian",
        image: "/image/alcohol5.png",
        createdAt: new Date(),
        category: "칵테일",
    },
    {
        id: 6,
        name: "Martini",
        image: "/image/alcohol6.png",
        createdAt: new Date(),
        category: "칵테일",
    },
    {
        id: 7,
        name: "Whiskey Sour",
        image: "/image/alcohol7.png",
        createdAt: new Date(),
        category: "위스키",
    },
    {
        id: 8,
        name: "Pina Colada",
        image: "/image/alcohol8.png",
        createdAt: new Date(),
        category: "와인",
    },
    {
        id: 9,
        name: "Pina Colada",
        image: "/image/alcohol9.png",
        createdAt: new Date(),
        category: "진, 럼, 데낄라",
    },
];

const TasteNote: React.FC = () => {
    const [drinks, setDrinks] = useState<Drink[]>(DEFAULT_DRINKS);
    const [filter, setFilter] = useState("전체");
    const [isTastingNoteModalOpen, setIsTastingNoteModalOpen] = useState(false);
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<Drink | null>(null);
    const [editTarget, setEditTarget] = useState<Drink | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleAddDrink = (data: { name: string; category: string }) => {
        const newDrink: Drink = {
        id: Date.now(),
        name: data.name,
        image: "/image/default.png",
        createdAt: new Date(),
        category: data.category,
        };
        setDrinks((prevDrinks) => [...prevDrinks, newDrink]);
        setIsCompleteModalOpen(true);
    };

    const handleCompleteModalClose = () => {
        setIsCompleteModalOpen(false);
    };

    const handleDeleteDrink = () => {
        if (deleteTarget) {
        setDrinks(drinks.filter((drink) => drink.id !== deleteTarget.id));
        setDeleteTarget(null);
        }
    };

    const handleEditDrink = (updatedDrink: Drink) => {
        if (editTarget) {
        setDrinks(
            drinks.map((drink) =>
            drink.id === editTarget.id ? updatedDrink : drink
            )
        );
        }
        setIsEditModalOpen(false);
        setEditTarget(null);
    };

    const filteredDrinks =
        filter === "전체"
        ? drinks
        : drinks.filter((drink) => drink.category === filter);

    const sortedDrinks = [...filteredDrinks].sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime(); // 최근 작성순 정렬
    });

    return (
        <>
            <NoteHeader />
            <div className={`taste-note-container ${deleteTarget ? "blurred" : ""}`}>
                <header>
                    <div className="taste-note-header">
                        <h1>테이스팅 노트</h1>
                        <h4>맛과 향, 도수를 기록하고 전문가와 비교해보세요.</h4>
                    </div>
                </header>
                <hr className="taste-note-list-line" />
                <div className="taste-note-drink-categories">
                    {["전체", "칵테일", "위스키", "진, 럼, 데낄라", "와인", "기타"].map((cat) => (
                        <button key={cat} onClick={() => setFilter(cat)}>
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="taste-note-drink-list">
                    {sortedDrinks.length > 0 && (
                        <button
                            className="taste-note-add-drink"
                            onClick={() => setIsTastingNoteModalOpen(true)}
                        >
                            <img src="/image/addbutton.png" alt="추가버튼" />
                        </button>
                    )}
                    {sortedDrinks.length > 0 ? (
                        sortedDrinks.map((drink) => (
                            <div
                                key={drink.id}
                                className="taste-note-drink-item"
                                onClick={() => setEditTarget(drink)}
                            >
                                <div className="taste-note-drink-hover-container">
                                    <div className="change-item-to-blur-hover"></div>
                                    <img src={drink.image} alt={drink.name} />
                                    <div className="taste-note-drink-hover">{drink.name}</div>
                                    <button
                                        className="taste-note-delete-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDeleteTarget(drink);
                                        }}
                                    >
                                        <img src="/image/trash.png" alt="삭제버튼" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="taste-note-empty-container">
                            <button
                                className="taste-note-empty-add-plus"
                                onClick={() => setIsTastingNoteModalOpen(true)}
                            >
                                <img src="/image/addbutton.png" alt="추가버튼" />
                            </button>
                            <div className="taste-note-empty-message">
                                텅 비었네요!
                                <br />
                                오늘의 특별한 한 잔을 기록하러 가볼까요?
                            </div>
                            <div className="taste-note-empty-box">
                                <div>
                                    <img src="/image/wine-Bar.png" alt="술 선택" />
                                    <h3>마신 술 선택하기</h3>
                                    <h4>원하는 술을 검색하거나 직접 추가하세요</h4>
                                </div>
                                <div>
                                    <img src="/image/Create.png" alt="향, 도수 기록" />
                                    <h3>향, 맛, 도수 기록하기</h3>
                                    <h4>술의 특징을 상세하게 기록해보세요</h4>
                                </div>
                                <div>
                                    <img src="/image/Read.png" alt="전문가비교" />
                                    <h3>전문가와 비교하기</h3>
                                    <h4>전문가의 평가와 비교해보세요</h4>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
    
            {/* TastingNoteModal: 이름, 주종 입력 */}
            {isTastingNoteModalOpen && (
                <TastingNoteModal
                    isOpen={isTastingNoteModalOpen}
                    onClose={() => setIsTastingNoteModalOpen(false)}
                    onAddDrink={handleAddDrink}
                />
            )}
    
            {/* CompleteModal: 생성 완료 후 */}
            {isCompleteModalOpen && (
                <CompleteModal
                    isOpen={isCompleteModalOpen}
                    onClose={handleCompleteModalClose}
                />
            )}
    
            {/* 삭제 확인 모달 */}
            {deleteTarget && (
                <div className="taste-note-delete-modal">
                    <p>‘{deleteTarget.name}’을 삭제하시겠습니까?</p>
                    <button
                        className="delete-btn-in-tastenote"
                        onClick={handleDeleteDrink}
                    >
                        삭제
                    </button>
                    <button
                        className="cancel-btn-in-tastenote"
                        onClick={() => setDeleteTarget(null)}
                    >
                        취소
                    </button>
                </div>
            )}
    
            {/* 수정 모달 */}
            {isEditModalOpen && editTarget && (
                <EditNoteModal
                    drink={editTarget}
                    onClose={() => setIsEditModalOpen(false)}
                    onEditDrink={handleEditDrink}
                />
            )}
    
            <Footer />
        </>
    );
    
};

export default TasteNote;