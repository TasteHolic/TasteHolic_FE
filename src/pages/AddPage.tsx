import React, { useState } from "react";

interface Drink {
    id: number;
    name: string;
    image: string;
    rating: number;
    createdAt: Date;
    category: string;
}

interface AddPageProps {
    isOpen: boolean;
    onClose: () => void;
    onAddDrink: (drink: Drink) => void;
}

const DRINK_OPTIONS: Drink[] = [
    { id: 1, name: "Black Russian", image: "/image/alcohol1.png", rating: 4, createdAt: new Date() , category: "칵테일" },
    { id: 2, name: "Martini", image: "/image/alcohol2.png", rating: 5, createdAt: new Date(), category: "칵테일" },
    { id: 3, name: "Whiskey Sour", image: "/image/alcohol3.png", rating: 3, createdAt: new Date(), category: "위스키" },
    { id: 4, name: "Pina Colada", image: "/image/alcohol4.png", rating: 5, createdAt: new Date(), category: "진, 럼, 데낄라라" },
    { id: 5, name: "Black Russian", image: "/image/alcohol5.png", rating: 4, createdAt: new Date(), category: "칵테일" },
    { id: 6, name: "Martini", image: "/image/alcohol6.png", rating: 2, createdAt: new Date(), category: "칵테일" },
    { id: 7, name: "Whiskey Sour", image: "/image/alcohol7.png", rating: 3, createdAt: new Date(), category: "위스키" },
    { id: 8, name: "Pina Colada", image: "/image/alcohol8.png", rating: 1, createdAt: new Date(), category: "와인" },
    { id: 9, name: "Pina Colada", image: "/image/alcohol9.png", rating: 3, createdAt: new Date(), category: "진, 럼, 데낄라" },
];

const AddPage: React.FC<AddPageProps> = ({ isOpen, onClose, onAddDrink }) => {
    const [search, setSearch] = useState("");
    const filteredDrinks = DRINK_OPTIONS.filter(drink =>
        drink.name.toLowerCase().includes(search.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>새로운 테이스팅 노트 추가</h2>
                <input 
                    type="text" 
                    placeholder="술 이름 검색" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
                <ul>
                    {filteredDrinks.map((drink) => (
                        <li key={drink.id} onClick={() => onAddDrink(drink)}>
                            {drink.name}
                        </li>
                    ))}
                </ul>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default AddPage;
