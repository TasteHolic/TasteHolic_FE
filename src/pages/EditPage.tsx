import React, { useState } from "react";

interface Drink {
    id: number;
    name: string;
    image: string;
    rating: number;
    createdAt: Date;
    category: string;
}

interface EditPageProps {
    drink: Drink;
    onClose: () => void;
    onEditDrink: (updatedDrink: Drink) => void;
}

const EditPage: React.FC<EditPageProps> = ({ drink, onClose, onEditDrink }) => {
    const [name, setName] = useState(drink.name);
    const [image, setImage] = useState(drink.image);
    const [rating, setRating] = useState(drink.rating);
    const [category, setCategory] = useState(drink.category);

    const handleSave = () => {
        onEditDrink({ ...drink, name, image, rating, category });
    };

    return (
        <div 
            className="edit-modal" 
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                width: "100%",
                height: "100%",
            }}
        >
            <div
                className="edit-modal-content"
                style={{
                    position: "relative",
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    maxWidth: "500px",
                    width: "100%",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            >
                <h2>술 수정</h2>
                <label>
                    이름:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    이미지 URL:
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                </label>
                <label>
                    평점:
                    <input type="number" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
                </label>
                <label>
                    카테고리:
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                </label>
                <div className="edit-modal-buttons" style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                    <button
                        onClick={handleSave}
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        저장
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPage;
