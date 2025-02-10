import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import AddPage from "./AddPage";
import EditPage from "./EditPage";
import "./TastingNote.css";

interface Drink {
    id: number;
    name: string;
    image: string;
    rating: number;
    createdAt: Date;
    category: string;
}

const DEFAULT_DRINKS: Drink[] = [
    { id: 1, name: "Black Russian", image: "/image/alcohol1.png", rating: 4, createdAt: new Date(), category: "칵테일" },
    { id: 2, name: "Martini", image: "/image/alcohol2.png", rating: 5, createdAt: new Date(), category: "칵테일" },
    { id: 3, name: "Whiskey Sour", image: "/image/alcohol3.png", rating: 3, createdAt: new Date(), category: "위스키" },
    { id: 4, name: "Pina Colada", image: "/image/alcohol4.png", rating: 5, createdAt: new Date(), category: "진, 럼, 데낄라라" },
    { id: 5, name: "Black Russian", image: "/image/alcohol5.png", rating: 4, createdAt: new Date(), category: "칵테일" },
    { id: 6, name: "Martini", image: "/image/alcohol6.png", rating: 2, createdAt: new Date(), category: "칵테일" },
    { id: 7, name: "Whiskey Sour", image: "/image/alcohol7.png", rating: 3, createdAt: new Date(), category: "위스키" },
    { id: 8, name: "Pina Colada", image: "/image/alcohol8.png", rating: 1, createdAt: new Date(), category: "와인" },
    { id: 9, name: "Pina Colada", image: "/image/alcohol9.png", rating: 3, createdAt: new Date(), category: "진, 럼, 데낄라" },
];

const TasteNote: React.FC = () => {
    const [drinks, setDrinks] = useState<Drink[]>(DEFAULT_DRINKS);
    const [filter, setFilter] = useState("전체");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<Drink | null>(null);
    const [editTarget, setEditTarget] = useState<Drink | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("recent");

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleSelect = (value: string) => {
        setSelectedOption(value);
        setIsOpen(false);
    };

    const handleAddDrink = (drink: Drink) => {
        setDrinks([...drinks, { ...drink, id: Date.now(), createdAt: new Date() }]);
        setIsModalOpen(false);
    };

    const handleDeleteDrink = () => {
        if (deleteTarget) {
            setDrinks(drinks.filter(drink => drink.id !== deleteTarget.id));
            setDeleteTarget(null);
        }
    };

    const handleEditDrink = (updatedDrink: Drink) => {
        if (editTarget) {
            setDrinks(drinks.map(drink => drink.id === editTarget.id ? updatedDrink : drink));
        }
        setIsEditModalOpen(false);
        setEditTarget(null);
    };

    const filteredDrinks = filter === "전체" ? drinks : drinks.filter(drink => drink.category === filter);

    const sortedDrinks = [...filteredDrinks].sort((a, b) => {
        return selectedOption === "recent" ? b.createdAt.getTime() - a.createdAt.getTime() : b.rating - a.rating;
    });

    return (
        <>
        <Header/>
        <div className={`taste-note-container ${deleteTarget ? "blurred" : ""}`}>
            <header>
                <div className="taste-note-header">
                    <h1>테이스팅 노트</h1>
                    <h4>맛과 향, 도수를 기록하고 전문가와 비교해보세요.</h4>
                </div>
                <div className="taste-note-dropdown">
                    <button className="taste-note-dropdown-btn" onClick={toggleDropdown}>
                        {selectedOption === "recent" ? "최근 작성순" : "평점순"}
                        {!isOpen && <img src="/image/arrow-down.png" alt="드롭다운 화살표" />}
                    </button>
                    {isOpen && (
                    <ul className={`taste-note-dropdown-menu ${isOpen ? "open" : ""}`}>
                        {["recent", "rating"].filter(option => option !== selectedOption).map((option) => (
                            <li key={option} onClick={() => handleSelect(option)}>
                                {option === "recent" ? "최근 작성순" : "평점순"}
                            </li>
                        ))}
                    </ul>
                    )}
                </div>
            </header>
            <hr className="taste-note-list-line"></hr>

            <div className="taste-note-drink-categories">
                {['전체', '칵테일', '위스키', '진, 럼, 데낄라', '와인', '기타'].map(category => (
                    <button key={category} onClick={() => setFilter(category)}>{category}</button>
                ))}
            </div>
            <div className="taste-note-drink-list">
                {sortedDrinks.length > 0 && (
                    <button className="taste-note-add-drink" onClick={() => setIsModalOpen(true)}><img src="/image/addbutton.png" alt="추가버튼"></img></button>
                )}
                {sortedDrinks.length > 0 ? (
                    sortedDrinks.map((drink) => (
                        <div key={drink.id} className="taste-note-drink-item">
                            <div className="taste-note-drink-hover-container">
                                <div className="change-item-to-blur-hover"></div>
                                <img src={drink.image} alt={drink.name} onClick={() => { setEditTarget(drink); setIsEditModalOpen(true); }} />
                                <div className="taste-note-drink-hover">{drink.name}</div>
                                <button className="taste-note-delete-button" onClick={() => setDeleteTarget(drink)}><img src="/image/trash.png" alt="삭제버튼"></img></button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="taste-note-empty-container">
                        <button className="taste-note-empty-add-plus" onClick={() => setIsModalOpen(true)}><img src="/image/addbutton.png" alt="추가버튼"></img></button>
                        <div className="taste-note-empty-message">텅 비었네요!<br></br>오늘의 특별한 한 잔을 기록하러 가볼까요?</div>
                        <div className="taste-note-empty-box">
                            <div>
                                <img src="/image/wine-Bar.png" alt="술 선택"></img>
                                <h3>마신 술 선택하기</h3>
                                <h4>원하는 술을 검색하거나 직접 추가하세요</h4>
                            </div>
                            <div>
                                <img src="/image/Create.png" alt="향, 도수 기록"></img>
                                <h3>향, 맛, 도수 기록하기</h3>
                                <h4>술의 특징을 상세하게 기록해보세요</h4>
                            </div>
                            <div>
                                <img src="/image/Read.png" alt="전문가비교"></img>
                                <h3>전문가와 비교하기</h3>
                                <h4>전문가의 평가와 비교해보세요</h4>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    
        {/* 추가 모달 */}
        {isModalOpen && <AddPage isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddDrink={handleAddDrink} />}

        {/* 삭제 확인 모달 */}
        {deleteTarget && (
            <div className="taste-note-delete-modal">
                <p>‘Black Russian‘을 삭제하시겠습니까?</p>
                <button  className="delete-btn-in-tastenote" onClick={handleDeleteDrink}>삭제</button>
                <button  className="cancel-btn-in-tastenote" onClick={() => setDeleteTarget(null)}>취소</button>
            </div>
        )}

        {/* 수정 모달 */}
        {isEditModalOpen && editTarget && (
            <EditPage
                drink={editTarget}
                onClose={() => setIsEditModalOpen(false)}
                onEditDrink={handleEditDrink}
            />
        )}


        <Footer/>
        </>
    );
};

export default TasteNote;
