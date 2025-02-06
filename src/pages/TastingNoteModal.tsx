import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TastingNoteModalBackground from "../components/TastingNoteModalBackground";
import "./TastingNoteModal.css";

type Step = "intro" | "category" | "name";

const TastingNoteModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState<Step>("intro");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isNameOpen, setIsNameOpen] = useState(false);

  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const nameDropdownRef = useRef<HTMLDivElement>(null);

  const drinkCategories = ["Beer", "Gin", "Rum", "Tequila", "Whiskey"];
  const [drinkNames, setDrinkNames] = useState([
    "Heineken",
    "Bombay Sapphire",
    "Bacardi",
    "Jose Cuervo",
    "Jack Daniel's",
  ]);

  // 검색어 필터링
  const filteredNames = searchTerm
    ? drinkNames.filter((n) =>
        n.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : drinkNames;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddNewDrink = () => {
    if (!searchTerm.trim()) return;
    setDrinkNames((prev) => [...prev, searchTerm]);
    setName(searchTerm);
    setSearchTerm("");
    setIsNameOpen(false);
  };

  const nextStep = () => {
    if (step === "intro") {
      setStep("category");
    } else if (step === "category") {
      if (!category) {
        setError(true);
        return;
      }
      setStep("name");
    } else if (step === "name") {
      if (!name) {
        setError(true);
        return;
      }
      onClose();
    }
  };

  const prevStep = () => {
    setError(false);
    if (step === "name") setStep("category");
    else if (step === "category") setStep("intro");
  };

  return (
    <div className="modal-overlay">
      <motion.div
        className="modal-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <TastingNoteModalBackground />

        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div key="intro" className="modal-content">
              <h2>테이스팅 노트 만들기</h2>
              <div className="second-component">
                <p className="intro-text">
                  나만의 칵테일을 만들고, 공유해보세요.
                </p>
              </div>
              <div className="modal-footer">
                <button className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button className="next-btn" onClick={nextStep}>
                  다음
                </button>
              </div>
            </motion.div>
          )}

          {step === "category" && (
            <motion.div key="category" className="modal-content">
              <h2>어떤 종류인가요?</h2>
              <div className="second-component">
                <div
                  ref={categoryDropdownRef}
                  className={`custom-dropdown ${isCategoryOpen ? "open" : ""} ${
                    error && !category
                      ? "has-error"
                      : category
                      ? "is-valid"
                      : ""
                  }`}
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                  <span>{category || "주종 찾기..."}</span>
                  <img
                    src={
                      isCategoryOpen ? "/image/Up.svg" : "/image/DropDown.svg"
                    }
                    alt="dropdown-icon"
                    className="dropdown-icon"
                  />
                </div>

                {isCategoryOpen && (
                  <ul className="dropdown-menu">
                    {drinkCategories.map((type, index) => (
                      <li
                        key={index}
                        className="dropdown-item"
                        onClick={() => {
                          setCategory(type);
                          setIsCategoryOpen(false);
                          setError(false);
                        }}
                      >
                        {type}
                      </li>
                    ))}
                  </ul>
                )}
                <p
                  className={`error-text ${
                    error && !category ? "show-error" : ""
                  }`}
                >
                  옵션을 선택해주세요.
                </p>
              </div>
              <div className="modal-footer">
                <button className="prev-btn" onClick={prevStep}>
                  뒤로
                </button>
                <button className="next-btn" onClick={nextStep}>
                  다음
                </button>
              </div>
            </motion.div>
          )}

          {step === "name" && (
            <motion.div key="name" className="modal-content">
              <h2>무슨 이름인가요?</h2>
              <div className="second-component">
                <div
                  ref={nameDropdownRef}
                  className={`custom-dropdown name-dropdown ${
                    isNameOpen ? "open" : ""
                  } ${error && !name ? "has-error" : name ? "is-valid" : ""}`}
                  onClick={() => setIsNameOpen(!isNameOpen)}
                >
                  <span>{name || "술 이름 찾기..."}</span>
                  <img
                    src={isNameOpen ? "/image/Up.svg" : "/image/DropDown.svg"}
                    alt="dropdown-icon"
                    className="dropdown-icon"
                  />
                </div>

                {isNameOpen && (
                  <ul className="dropdown-menu name-dropdown">
                    <li className="dropdown-item search-box">
                      <span className="search-icon"></span>
                      <input
                        type="text"
                        placeholder="검색 또는 새로 입력"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddNewDrink();
                          }
                        }}
                      />
                    </li>

                    {filteredNames.map((name, index) => (
                      <li
                        key={index}
                        className="dropdown-item"
                        onClick={() => {
                          setName(name);
                          setIsNameOpen(false);
                          setError(false);
                        }}
                      >
                        {name}
                      </li>
                    ))}

                    {searchTerm && !filteredNames.includes(searchTerm) && (
                      <li
                        className="dropdown-item add-new"
                        onClick={handleAddNewDrink}
                      >
                        <img
                          src="/image/add.svg"
                          alt="add-icon"
                          className="add-icon"
                        />
                        "{searchTerm}" 추가하기
                      </li>
                    )}
                  </ul>
                )}

                <p
                  className={`error-text ${error && !name ? "show-error" : ""}`}
                >
                  옵션을 선택해주세요.
                </p>
              </div>
              <div className="modal-footer">
                <button className="prev-btn" onClick={prevStep}>
                  뒤로
                </button>
                <button className="next-btn" onClick={nextStep}>
                  만들러가기
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TastingNoteModal;
