import React, { useState, useEffect } from "react";
import NoteHeader from "../components/Header/NoteHeader";
import Footer from "../components/Footer";
import "./TastingNote.css";
import TastingNoteModal from "./TastingNoteModal";
import CompleteModal from "./CompleteModal";
import EditNoteModal from "./EditNoteModal";

interface Drink {
    noteId: string;
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

    const fetchTastingNotes = async (category: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("액세스 토큰이 없습니다. 로그인 후 다시 시도하세요.");
                return [];
            }

            const response = await fetch(
                `http://54.180.45.230:3000/api/v1/users/tasting-notes?type=${category}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log(`✅ ${category} 테이스팅 노트 불러오기 성공:`, data);
                return data.tastingNotes;
            } else {
                const errorData = await response.json();
                console.error(`🚨 ${category} 테이스팅 노트 불러오기 실패:`, errorData);
                return [];
            }
        } catch (error) {
            console.error("서버 요청 중 오류 발생:", error);
            return [];
        }
    };

    useEffect(() => {
        const loadTastingNotes = async () => {
            if (filter === "전체") {
                const categories = ["cocktail", "whiskey", "gin&rum&tequila", "wine", "other"];
                const allData = await Promise.all(categories.map(fetchTastingNotes));
                const mergedData = allData.flat();
                setDrinks(mergedData);
                localStorage.setItem("tastingNotes", JSON.stringify(mergedData));
            } else {
                const categoryMap: Record<string, string> = {
                    칵테일: "cocktail",
                    위스키: "whiskey",
                    "진, 럼, 데낄라": "gin&rum&tequila",
                    와인: "wine",
                    기타: "other",
                };
                const categoryKey = categoryMap[filter];
                if (categoryKey) {
                    const data = await fetchTastingNotes(categoryKey);
                    setDrinks(data);
                    localStorage.setItem("tastingNotes", JSON.stringify(data));
                }
            }
        };

        loadTastingNotes();
    }, [filter]);
    
    const handleAddDrink = async (data: { name: string; category: string }) => {
        const imageUrl = "/image/default.png";
    
        // 이미지 API 호출 부분 주석 처리
        // try {
        //     const response = await fetch(`/api/v1/drinks?name=${data.name}`);
        //     if (response.ok) {
        //         const drinkData = await response.json();
        //         imageUrl = drinkData.image || "/image/default.png";
        //     }
        // } catch (error) {
        //     console.error("Failed to fetch drink image", error);
        // }

        const newDrink: Drink = {
            id: Date.now(),
            name: data.name,
            image: imageUrl,
            createdAt: new Date(),
            category: data.category,
            noteId: "", // API 응답 후 업데이트할 예정
        };
    
        const updatedDrinks = [...drinks, newDrink];
        setDrinks(updatedDrinks);
        localStorage.setItem("tastingNotes", JSON.stringify(updatedDrinks));
        setIsCompleteModalOpen(true);
    
        try {
            const response = await fetch("http://54.180.45.230:3000/api/v1/users/tasting-note", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(newDrink),
            });
    
            if (!response.ok) {
                throw new Error("Failed to save drink to server");
            }
    
            const responseData = await response.json();
            console.log("음료 추가 성공:", responseData);
    
            // 📌 새롭게 생성된 noteId를 로컬 데이터에 반영
            const drinkWithNoteId = { ...newDrink, noteId: responseData.noteId };
    
            const updatedDrinksWithId = drinks.map((drink) =>
                drink.id === newDrink.id ? drinkWithNoteId : drink
            );
    
            setDrinks(updatedDrinksWithId);
            localStorage.setItem("tastingNotes", JSON.stringify(updatedDrinksWithId));
    
        } catch (error) {
            console.error("음료 추가 실패:", error);
        }
    };
    
    const handleDeleteDrink = async () => {
        if (!deleteTarget || !deleteTarget.noteId) {
            console.error("삭제할 음료의 noteId가 없습니다.");
            return;
        }
    
        try {
            const response = await fetch(
                `http://54.180.45.230:3000/api/v1/users/tasting-note/${deleteTarget.noteId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
    
            if (!response.ok) {
                throw new Error("Failed to delete drink from server");
            }
    
            setDrinks((prevDrinks) => {
                const updatedDrinks = prevDrinks.filter(
                    (drink) => drink.noteId !== deleteTarget.noteId
                );
                localStorage.setItem("tastingNotes", JSON.stringify(updatedDrinks));
                return updatedDrinks;
            });
    
            console.log(`음료 삭제 성공: ${deleteTarget.name}`);
        } catch (error) {
            console.error("음료 삭제 실패:", error);
        } finally {
            setDeleteTarget(null);
        }
    };
    
    const handleEditDrink = async (updatedDrink: Drink) => {
        const updatedDrinks = drinks.map((drink) =>
            drink.noteId === updatedDrink.noteId ? updatedDrink : drink
        );
        setDrinks(updatedDrinks);
        localStorage.setItem("tastingNotes", JSON.stringify(updatedDrinks));
        setIsEditModalOpen(false);
        setEditTarget(null);
    
        try {
            const response = await fetch(
                `http://54.180.45.230:3000/api/v1/users/tasting-note/${updatedDrink.noteId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(updatedDrink),
                }
            );
    
            if (!response.ok) {
                throw new Error("Failed to update drink on server");
            }
    
            const data = await response.json();
            console.log("음료 수정 성공:", data);
        } catch (error) {
            console.error("음료 수정 실패:", error);
        }
    };

    const handleCompleteModalClose = () => {
        setIsCompleteModalOpen(false);
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
                    noteId: editTarget.noteId,
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