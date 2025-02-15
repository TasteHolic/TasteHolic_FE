import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateNoteModal from "./CreateNoteModal";
import "./TastingNoteModal.css";

type Step = "intro" | "category" | "name";

interface TastingNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onAddDrink: 부모에 새 음료 데이터 전달 (여기서는 name과 category만 전달)
  onAddDrink: (data: { name: string; category: string }) => void;
}

const TastingNoteModal: React.FC<TastingNoteModalProps> = ({
  isOpen,
  onClose,
  onAddDrink,
}) => {
  const [step, setStep] = useState<Step>("intro");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);

  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isNameOpen, setIsNameOpen] = useState(false);
  const [hasAddedNewDrink, setHasAddedNewDrink] = useState(false);

  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const nameDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const drinkCategories = [
    "Beer",
    "Cocktail",
    "Gin",
    "Rum",
    "Tequila",
    "Whiskey",
  ];
  const [drinkNames, setDrinkNames] = useState([
    "Heineken",
    "Bombay Sapphire",
    "Bacardi",
    "Jose Cuervo",
    "Jack Daniel's",
  ]);

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
    setHasAddedNewDrink(true);
    setSearchTerm("");
    setIsNameOpen(false);
    const dropdownMenu = document.querySelector(
      ".name-dropdown .dropdown-menu"
    );
    if (dropdownMenu) {
      dropdownMenu.classList.add("highlight-border");
    }
  };

  const nextStep = () => {
    if (step === "intro") {
      setStep("category");
    } else if (step === "category" && category) {
      setStep("name");
    } else if (step === "name" && name) {
      setIsCreateNoteOpen(true);
    } else {
      setError(true);
    }
  };

  const prevStep = () => {
    setError(false);
    if (step === "name") {
      setStep("category");
    } else if (step === "category") {
      setStep("intro");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && !isCreateNoteOpen && (
          <motion.div
            className="modal-overlay tasting-note-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="modal-background">
              <div className="blur-circle yellow"></div>
              <div className="blur-circle white"></div>
            </div>
            <motion.div
              className="modal-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
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
                        className={`custom-dropdown ${
                          isCategoryOpen ? "open" : ""
                        } ${
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
                            isCategoryOpen
                              ? "/image/Up.svg"
                              : "/image/DropDown.svg"
                          }
                          alt="dropdown-icon"
                          className="dropdown-icon"
                        />
                      </div>
                      {isCategoryOpen && (
                        <ul className="dropdown-menu type-dropdown">
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
                    <div className="second-component name-step-container">
                      <div className="dropdown-message-wrapper">
                        <div
                          ref={nameDropdownRef}
                          className={`custom-dropdown name-dropdown ${
                            isNameOpen ? "open" : ""
                          } ${
                            error && !name
                              ? "has-error"
                              : hasAddedNewDrink
                              ? "added-drink"
                              : name
                              ? "is-valid"
                              : ""
                          }`}
                          onClick={() => setIsNameOpen(!isNameOpen)}
                        >
                          <span>{name || "술 이름 찾기..."}</span>
                          <img
                            src={
                              isNameOpen
                                ? "/image/Up.svg"
                                : "/image/DropDown.svg"
                            }
                            alt="dropdown-icon"
                            className="dropdown-icon"
                          />
                        </div>
                        <p
                          className={`message-text ${
                            error && !name
                              ? "error"
                              : hasAddedNewDrink
                              ? "added-drink"
                              : ""
                          }`}
                        >
                          {error && !name
                            ? "옵션을 선택해주세요."
                            : hasAddedNewDrink
                            ? "새로운 술 추가 시, 전문 테이스팅 노트가 준비되지 않을 수 있습니다."
                            : ""}
                        </p>
                      </div>
                      {isNameOpen && (
                        <ul
                          className="dropdown-menu name-dropdown"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <li className="dropdown-item search-box">
                            <div className="search-icon"></div>
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
                          <div className="scroll-container">
                            {filteredNames.map((n, index) => (
                              <li
                                key={index}
                                className="dropdown-item"
                                onClick={() => {
                                  setName(n);
                                  setIsNameOpen(false);
                                  setError(false);
                                }}
                              >
                                {n}
                              </li>
                            ))}
                          </div>
                          {searchTerm &&
                            !filteredNames.includes(searchTerm) && (
                              <li
                                className="dropdown-item add-new"
                                onClick={handleAddNewDrink}
                              >
                                <img
                                  src="/image/add.svg"
                                  alt="add-icon"
                                  className="add-icon"
                                />{" "}
                                "{searchTerm}" 추가하기
                              </li>
                            )}
                        </ul>
                      )}
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* CreateNoteModal: 추가 정보 입력 → onComplete 시 부모 onAddDrink 호출 */}
      {isCreateNoteOpen && (
        <CreateNoteModal
          isOpen={isCreateNoteOpen}
          onClose={() => setIsCreateNoteModalOpen(false)}
          onComplete={(data) => {
            console.log("🟢 onComplete 실행 직전", data);
            // 부모 콜백 호출: 새 음료 데이터 전달
            onAddDrink({ name: data.name, category: data.category });
            setIsCreateNoteOpen(false);
          }}
          drinkName={name}
          category={category}
        />
      )}
    </>
  );
};

export default TastingNoteModal;
