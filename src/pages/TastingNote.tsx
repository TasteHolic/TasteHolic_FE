


import React, { useState, useEffect } from "react";
import NoteHeader from "../components/Header/NoteHeader";
import Footer from "../components/Footer";
import "./TastingNote.css";
import TastingNoteModal from "./TastingNoteModal";
import CompleteModal from "./CompleteModal";
import EditNoteModal from "./EditNoteModal";

interface Drink {
    id: number;
    name: string;
    image: string;
    createdAt: Date;
    category: string;
    flavors?: string[];
    aromas?: string[];
    alcohol?: string | null;
    colors?: string[];
    finish?: string[];
    note?: string;
}

const TasteNote: React.FC = () => {
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const [filter, setFilter] = useState("전체");
    const [isTastingNoteModalOpen, setIsTastingNoteModalOpen] = useState(false);
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<Drink | null>(null);
    const [editTarget, setEditTarget] = useState<Drink | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const tastingNoteKeys = Object.keys(localStorage).filter(key => key.startsWith("tastingNote_"));
    
        const allStoredData = tastingNoteKeys.map(key => {
            const storedData = localStorage.getItem(key);
            return storedData ? JSON.parse(storedData) : null;
        }).filter(data => data !== null);
    
        // 데이터를 최신순으로 정렬
        const sortedData = allStoredData.flat().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
        if (sortedData.length > 0) {
            setDrinks(sortedData);
        }
    }, []);
    

    const handleAddDrink = (data: { name: string; category: string }) => {
        const newDrink: Drink = {
            id: Date.now(),
            name: data.name,
            image: "/image/default.png",
            createdAt: new Date(),
            category: data.category,
        };

        // 로컬에 음료 추가
        const updatedDrinks = [...drinks, newDrink];
        setDrinks(updatedDrinks);

        // 로컬 스토리지에 저장
        localStorage.setItem(`AddNote_${newDrink.name}_${newDrink.category}`, JSON.stringify(updatedDrinks));

        setIsCompleteModalOpen(true);
    };

    const handleCompleteModalClose = () => {
        setIsCompleteModalOpen(false);
    };
    
    const handleDeleteDrink = () => {
        if (deleteTarget) {
            // 로컬 상태에서 음료 삭제
            setDrinks((prevDrinks) => {
                // 삭제된 음료를 제외한 새로운 배열을 반환
                const updatedDrinks = prevDrinks.filter((drink) => drink.id !== deleteTarget.id);
    
                // 로컬 스토리지에서 'tastingNote_{name}_{category}' 관련 항목들 삭제
                const tastingNoteKey = `tastingNote_${deleteTarget.name}_${deleteTarget.category}`;
                const addNoteKey = `AddNote_${deleteTarget.name}_${deleteTarget.category}`;
                const editNoteKey = `EditNote_${deleteTarget.name}_${deleteTarget.category}`;
    
                // tastingNote_{name}_category, AddNote, EditNote가 있으면 삭제
                if (localStorage.getItem(tastingNoteKey)) {
                    localStorage.removeItem(tastingNoteKey);
                }
                if (localStorage.getItem(addNoteKey)) {
                    localStorage.removeItem(addNoteKey);
                }
                if (localStorage.getItem(editNoteKey)) {
                    localStorage.removeItem(editNoteKey);
                }
    
                // 삭제된 음료를 제외한 새로운 배열을 반환
                localStorage.setItem("drinks", JSON.stringify(updatedDrinks)); // 상태를 다시 localStorage에 저장
    
                return updatedDrinks;
            });
    
            setDeleteTarget(null); // 삭제 모달 닫기
        }
    };
    

    const handleEditDrink = (updatedDrink: Drink) => {
        const updatedDrinks = drinks.map((drink) =>
            drink.id === updatedDrink.id ? updatedDrink : drink
        );
        setDrinks(updatedDrinks);
    
        // 새로운 로컬 스토리지 키 생성 (EditNote_{name}_{category})
        const editNoteKey = `EditNote_${updatedDrink.name}_${updatedDrink.category}`;
        
        // 로컬 스토리지에 수정된 데이터 저장
        localStorage.setItem(editNoteKey, JSON.stringify(updatedDrinks));
    
        setIsEditModalOpen(false);
        setEditTarget(null);
    };
    

    // 카테고리 매핑
    const categoryMap: Record<string, string[]> = {
        칵테일: ["Cocktail"],
        위스키: ["Whiskey"],
        "진, 럼, 데낄라": ["Gin", "Rum", "Tequila"],
        와인: ["Wine"],
        기타: ["Beer"],
    };

    const filteredDrinks =
        filter === "전체"
        ? drinks
        : drinks.filter((drink) => {
            const drinkCategories = categoryMap[drink.category] || [drink.category];
            const filterCategories = categoryMap[filter] || [filter];
            return drinkCategories.some((dCat) =>
                filterCategories.includes(dCat)
            );
        });

    const sortedDrinks = [...filteredDrinks].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB.getTime() - dateA.getTime();
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
            {["전체", "칵테일", "위스키", "진, 럼, 데낄라", "와인", "기타"].map(
                (cat) => (
                <button key={cat} onClick={() => setFilter(cat)}>
                    {cat}
                </button>
                )
            )}
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
                    onClick={() => {
                    setEditTarget(drink);
                    setIsEditModalOpen(true);
                    }}
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
                isOpen={isEditModalOpen}
                initialData={{
                    name: editTarget.name,
                    category: editTarget.category,
                    flavors: editTarget.flavors || [],
                    aromas: editTarget.aromas || [],
                    alcohol: editTarget.alcohol || null,
                    colors: editTarget.colors || [],
                    finish: editTarget.finish || [],
                    note: editTarget.note || "",
                }}
                onClose={() => setIsEditModalOpen(false)}
                onComplete={(finalData) => {
                    const updatedDrink: Drink = {
                        ...editTarget,
                        ...finalData,
                    };
                    handleEditDrink(updatedDrink);
                }}
            />
        )}

        <Footer />
        </>
    );
};

export default TasteNote;