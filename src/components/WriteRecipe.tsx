import { useEffect, useState } from "react";
import "./WriteRecipe.css";
import RecipeInput from "./recipe/createRecipe/RecipeCreate";

function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
    if (!isOpen) return null;
    return (
      <div className="ownmodal-overlay" onClick={onClose}>
        <div className="ownpopup" onClick={(e) => e.stopPropagation()}>
          {children} 
        </div>
      </div>
    );
}


  
function Button({ onClick, children, variant, className }: { 
    onClick: () => void; 
    children: React.ReactNode; 
    variant?: string; 
    className?: string; 
}) {
    return (
      <button className={`button ${variant} ${className}`} onClick={onClick}>
        {children}
      </button>
    );
}


function Input({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
      <input 
        className="input-field"
        type="text"
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
      />
    );
}

const cocktailOptions = [
  "기넷 드래프트",
  "버드와이저",
  "블루문 벨지안 화이트",
  "스텔라 아르투아",
  "아사히 슈퍼 드라이",
  "칼스버그",
  "코로나 엑스트라",
  "하이네켄",
  "호가든",
  "필스너 우르켈",
];

export default function RecipeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [step, setStep] = useState(1);
    const [cocktailName, setCocktailName] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [borderColor, setBorderColor] = useState("border-white");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const filteredOptions = cocktailOptions.filter((option) => option.includes(searchTerm));
  const showAddOption = searchTerm && !cocktailOptions.includes(searchTerm);

  useEffect(() => {
    if (step === 1) {
      setCocktailName("");
      setSearchTerm("");
      setShowDropdown(false);
      setIsDropdownOpen(false);
      setBorderColor("border-white");
    }
  }, [step]);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!cocktailName) {
        setBorderColor("border-red-500");
        return;
      }
      setBorderColor("border-green-500");
      setStep(3);
    }
  };
  const handleBack =() => {
    if (step === 2) {
      setStep(1);
  } else if (step === 3) {
      setStep(2);
  }
  }

  const handleSelectCocktail = (name: string) => {
    setCocktailName(name);
    setSearchTerm("");
    setShowDropdown(false);
    setIsDropdownOpen(false);
    setBorderColor("border-green-500");
  };
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
    setIsDropdownOpen((prev) => !prev);
  };
  
 
  
  return (
    <div className="recipe-container">
      <Modal isOpen={isOpen} onClose={onClose}>
        {step === 1 && (
          <div className="ownmodal-content">
            <h2 className="modal-title">레시피 만들기</h2>
            <h4 className="modal-description">나만의 칵테일을 만들고 공유해 보세요</h4>
            <div className="modal-buttons">
              <Button variant="ghost" className="left-button" onClick={onClose}>Cancel</Button>
              <Button className="right-button"onClick={handleNext}>다음</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="ownmodal-content">
            <h2 className="modal-title">이름이 무엇인가요?</h2>
            <div
                className={`cocktail-input ${borderColor} ${isDropdownOpen ? "active" : ""}`}
                onClick={toggleDropdown}
            >
                <span className={`dropdown-text ${borderColor === "border-green-500" ? "text-green-500" : "text-white"}`}>
                    {cocktailName || "술 이름 찾기..."}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    className={`dropdown-icon ${isDropdownOpen ? "rotate-icon" : ""}`}
                >
                    <path d="M14 11.5L8 6.5L2 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </span>
            </div>

            {showDropdown && (
            <div className="dropdown">
                <div className="search">
                 <div className="search-bar">
                   <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9887 14L11.1835 11.1M12.6989 7.33333C12.6989 10.2789 10.3892 12.6667 7.5399 12.6667C4.69064 12.6667 2.38086 10.2789 2.38086 7.33333C2.38086 4.38781 4.69064 2 7.5399 2C10.3892 2 12.6989 4.38781 12.6989 7.33333Z" stroke="#F3F5F6" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                   <Input  
                    placeholder="검색 또는 새로 입력"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
                </div>
            <div className="owndropdown-menu">
            {filteredOptions.map((option) => (
                <div key={option} className="owndropdown-item" onClick={() => handleSelectCocktail(option)}>
                {option}
                </div>
             ))}
                 {showAddOption && (
                  <div className="dropdown-add-option" onClick={() => handleSelectCocktail(searchTerm)}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                         <path d="M14.9993 10.8327H10.8327V14.9993C10.8327 15.4577 10.4577 15.8327 9.99935 15.8327C9.54102 15.8327 9.16602 15.4577 9.16602 14.9993V10.8327H4.99935C4.54102 10.8327 4.16602 10.4577 4.16602 9.99935C4.16602 9.54102 4.54102 9.16602 4.99935 9.16602H9.16602V4.99935C9.16602 4.54102 9.54102 4.16602 9.99935 4.16602C10.4577 4.16602 10.8327 4.54102 10.8327 4.99935V9.16602H14.9993C15.4577 9.16602 15.8327 9.54102 15.8327 9.99935C15.8327 10.4577 15.4577 10.8327 14.9993 10.8327Z" fill="#BE61EB"/>
                    </svg>

                     "{searchTerm}" 추가하기
                  </div>
                )}
             </div>
            </div>
            )}

            {borderColor === "border-red-500" && (
              <p className="error-message">옵션을 선택해주세요</p>
            )}
            <div className="modal-buttons">
              <Button className="left-button" variant="ghost" onClick={handleBack}>뒤로</Button>
              <Button className="right-button" onClick={handleNext}>다음</Button>
            </div>
          </div>
        )}
        {step === 3 &&(
          <RecipeInput drinkName={cocktailName} onCancel={onClose} onSave={() => { alert("레시피 저장 완료!"); onClose(); }} />
        )}
      </Modal>
    </div>
  );
}