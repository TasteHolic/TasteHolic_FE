//TastingNote.tsx
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

    
    const categoryMap: Record<string, string> = {
        전체: "",
        칵테일: "cocktail",
        위스키: "whiskey",
        "진, 럼, 데낄라": "gin&rum&tequila",
        와인: "wine",
        기타: "other",
    };
    
    const filteredDrinks = filter === "전체"
        ? drinks
        : drinks.filter((drink) => {
            const drinkCategories = Array.isArray(drink.category) ? drink.category : [drink.category];
            const filterCategories = categoryMap[filter] ? [categoryMap[filter]] : [filter];
            
            return drinkCategories.some((dCat) =>
                filterCategories.includes(dCat)
            );
        });
    
    const sortedDrinks = [...filteredDrinks].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
    
        return dateB.getTime() - dateA.getTime();
    });
    
    useEffect(() => {
        const loadTastingNotes = async () => {
            const categoryKey = categoryMap[filter];
            
            const drinksFromApi = await fetchTastingNotes(categoryKey);
    
            if (drinksFromApi.length > 0) {
                setDrinks(drinksFromApi);
            } else {
                if (categoryKey) {
                    const categoryDrinks = Object.keys(localStorage)
                        .filter((key) => key.startsWith(`tastingnote_${categoryKey}`))
                        .map((key) => JSON.parse(localStorage.getItem(key)!));
    
                    setDrinks(categoryDrinks);
                } else {
                    const allDrinks = [];
                    for (const key in localStorage) {
                        if (key.startsWith("tastingnote_")) {
                            const drink = JSON.parse(localStorage.getItem(key)!);
                            allDrinks.push(drink);
                        }
                    }
                    setDrinks(allDrinks);
                }
            }
        };
    
        loadTastingNotes();
    }, [filter]);

    const handleAddDrink = async (data: { name: string; category: string }) => {
        const imageUrl = "/image/default.png"; // 기본 이미지 설정
        
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
            id: Date.now(), // 임시 ID
            name: data.name,
            image: imageUrl,
            createdAt: new Date(),
            category: data.category,
            noteId: "", // 처음에는 빈 값
        };
    
            // 우선 로컬 스토리지에 저장 (서버 응답 후 다시 업데이트)
        localStorage.setItem(`tastingnote_${data.name}_${data.category}`, JSON.stringify(newDrink));

        try {
            const response = await fetch("http://54.180.45.230:3000/api/v1/users/tasting-note", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name: data.name,
                    category: data.category,
                }),
            });

            if (!response.ok) {
                throw new Error("음료 추가 실패");
            }

            const responseData = await response.json();
            const noteId = responseData.success.id;

            // 서버에서 받은 `noteId`를 새 객체에 반영
            const updatedDrinkWithNoteId = {
                ...newDrink,
                noteId: noteId,
            };

            localStorage.setItem(
                `tastingnote_${data.name}_${data.category}`,
                JSON.stringify(updatedDrinkWithNoteId)
            );

            // 상태에도 `noteId`가 반영된 새 객체를 추가
            setDrinks([...drinks, updatedDrinkWithNoteId]);
            console.log("✅ 음료 추가 성공:", updatedDrinkWithNoteId);

            // CompleteModal 표시
            setIsCompleteModalOpen(true);
        } catch (error) {
            console.error("❌ 음료 추가 실패:", error);
        }
    };

    const handleDeleteDrink = async () => {
        if (!deleteTarget) return;
    
        if (!deleteTarget.noteId) {
            localStorage.removeItem(`tastingnote_${deleteTarget.name}_${deleteTarget.category}`);
            setDrinks((prevDrinks) =>
                prevDrinks.filter((drink) => drink.noteId !== deleteTarget.noteId)
            );
            setDeleteTarget(null);
            return;
        }
    
        try {
            const response = await fetch(
                `http://54.180.45.230:3000/api/v1/users/tasting-note/${deleteTarget.noteId}?type=${deleteTarget.category}`,
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
    
            // 로컬 스토리지에서 삭제
            localStorage.removeItem(`tastingnote_${deleteTarget.name}_${deleteTarget.category}`);
            setDrinks((prevDrinks) =>
                prevDrinks.filter((drink) => drink.noteId !== deleteTarget.noteId)
            );
            console.log(`음료 삭제 성공: ${deleteTarget.name}`);
        } catch (error) {
            console.error("음료 삭제 실패:", error);
        } finally {
            setDeleteTarget(null);
        }
    };
    const handleEditDrink = async (updatedDrink: Drink) => {
        // 만약 noteId가 없다면 로컬에서 수정
        if (!updatedDrink.noteId) {
            console.error("❌ noteId가 없습니다. 로컬에서 수정합니다.");
            
            const storedData = localStorage.getItem(`tastingnote_${updatedDrink.name}_${updatedDrink.category}`);
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                const updatedData = { ...parsedData, ...updatedDrink };
                localStorage.setItem(`tastingnote_${updatedDrink.name}_${updatedDrink.category}`, JSON.stringify(updatedData));
                setDrinks((prevDrinks) =>
                    prevDrinks.map((drink) =>
                        drink.name === updatedDrink.name && drink.category === updatedDrink.category ? updatedData : drink
                    )
                );
            }
            return;
        }
    
        try {
            // `updatedDrink.noteId`가 있으면 해당 noteId로 서버에 수정 요청
            const response = await fetch(
                `http://54.180.45.230:3000/api/v1/users/tasting-note/${updatedDrink.noteId}?type=${updatedDrink.category}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        tasteRating: updatedDrink.flavors || [],
                        aromaRating: updatedDrink.aromas || [],
                        abv: updatedDrink.alcohol || 0,
                        color: updatedDrink.colors || [],
                        finishRating: updatedDrink.finish || [],
                        description: updatedDrink.note || "",
                    }),
                }
            );
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.error || "❌ 음료 수정 실패");
            }
    
            const data = await response.json();
            console.log("✅ 음료 수정 성공:", data);
    
            // 만약 `data.success.id`가 응답으로 온다면, 그 ID로 다시 수정 작업을 진행할 수 있음
            const updatedNoteId = data.success.id; // 여기서 받은 ID를 사용
            console.log("서버에서 받은 수정된 noteId:", updatedNoteId);
    
            // 수정된 `updatedDrink`에 서버에서 받은 `noteId` 반영
            const updatedDrinkWithNoteId = { ...updatedDrink, noteId: updatedNoteId };
    
            // 여기서 `updatedDrinkWithNoteId`를 상태나 로컬에 저장할 수 있음
            // 예시: 로컬 스토리지에 다시 저장
            localStorage.setItem(`tastingnote_${updatedDrinkWithNoteId.name}_${updatedDrinkWithNoteId.category}`, JSON.stringify(updatedDrinkWithNoteId));
    
            // 상태 업데이트 (예: `setDrinks`를 사용하여 상태 갱신)
            setDrinks((prevDrinks) =>
                prevDrinks.map((drink) =>
                    drink.name === updatedDrinkWithNoteId.name && drink.category === updatedDrinkWithNoteId.category
                        ? updatedDrinkWithNoteId
                        : drink
                )
            );
    
        } catch (error) {
            console.error("❌ 음료 수정 실패:", error);
        }
        setIsEditModalOpen(false);
    };
    
    
    const handleCompleteModalClose = () => {
        setIsCompleteModalOpen(false);
    };

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