import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./DrinkAddModal.css";

interface AddDrinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (drink: { type: string; name: string }) => void;
}

const DrinkAddModal: React.FC<AddDrinkModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [drinkType, setDrinkType] = useState("");
  const [drinkName, setDrinkName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isNameOpen, setIsNameOpen] = useState(false);
  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const nameDropdownRef = useRef<HTMLDivElement>(null);

  // 주종 & 이름 드롭다운 위치 설정
  const [typeDropdownPosition, setTypeDropdownPosition] = useState({
    top: "0px",
    left: "0px",
    width: "180px",
  });

  const [nameDropdownPosition, setNameDropdownPosition] = useState({
    top: "0px",
    left: "0px",
    width: "320px",
  });

  const drinkTypes = ["Beer", "Gin", "Rum", "Tequila", "Whiskey"];
  const [drinkNames, setDrinkNames] = useState([
    "Heineken",
    "Bombay Sapphire",
    "Bacardi",
    "Jose Cuervo",
    "Jack Daniel's",
  ]);

  // 주종 드롭다운 위치 업데이트
  useEffect(() => {
    if (isTypeOpen && typeDropdownRef.current) {
      const { offsetTop, offsetHeight, offsetLeft, offsetWidth } =
        typeDropdownRef.current;
      setTypeDropdownPosition({
        top: `${offsetTop + offsetHeight}px`,
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [isTypeOpen]);

  // 이름 드롭다운 위치 업데이트
  useEffect(() => {
    if (isNameOpen && nameDropdownRef.current) {
      const { offsetTop, offsetHeight, offsetLeft, offsetWidth } =
        nameDropdownRef.current;
      setNameDropdownPosition({
        top: `${offsetTop + offsetHeight}px`,
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [isNameOpen]);

  // 검색어에 따라 필터링된 리스트 생성
  const filteredNames = searchTerm
    ? drinkNames.filter((name) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : drinkNames;

  // 검색어 입력 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 새 항목 추가
  const handleAddNewDrink = () => {
    if (!searchTerm.trim()) return;

    setDrinkNames((prev) => [...prev, searchTerm]); // 기존 리스트 유지하며 추가
    setDrinkName(searchTerm);
    setSearchTerm("");
    setIsNameOpen(false);
  };

  const handleAddClick = () => {
    if (!drinkType || !drinkName) {
      setError(true);
      return;
    }
    onAdd({ type: drinkType, name: drinkName });
    onClose();
  };

  return isOpen
    ? ReactDOM.createPortal(
        <div className="add-drink-modal">
          <div className="modal-content">
            {/* 주종 선택 */}
            <div className="form-group">
              <label>어떤 종류인가요?</label>
              <div
                ref={typeDropdownRef}
                className={`custom-dropdown ${isTypeOpen ? "open" : ""} ${
                  error && !drinkType
                    ? "has-error"
                    : drinkType
                    ? "is-valid"
                    : ""
                }`}
                onClick={() => setIsTypeOpen(!isTypeOpen)}
              >
                <span>{drinkType || "주종 찾기..."}</span>
                <img
                  src={isTypeOpen ? "/image/Up.svg" : "/image/DropDown.svg"}
                  alt="dropdown-icon"
                  className="dropdown-icon"
                />
              </div>
              {isTypeOpen && (
                <ul
                  className="dropdown-menu"
                  style={{
                    position: "absolute",
                    top: typeDropdownPosition.top,
                    left: typeDropdownPosition.left,
                    width: typeDropdownPosition.width,
                  }}
                >
                  {drinkTypes.map((type, index) => (
                    <li
                      key={index}
                      className="dropdown-item"
                      onClick={() => {
                        setDrinkType(type);
                        setIsTypeOpen(false);
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
                  error && !drinkType ? "show-error" : ""
                }`}
              >
                옵션을 선택해주세요.
              </p>
            </div>

            {/* 이름 선택 */}
            <div className="form-group">
              <label>무슨 이름인가요?</label>
              <div
                ref={nameDropdownRef}
                className={`custom-dropdown name-dropdown ${
                  isNameOpen ? "open" : ""
                } ${
                  error && !drinkName
                    ? "has-error"
                    : drinkName
                    ? "is-valid"
                    : ""
                }`}
                onClick={() => setIsNameOpen(!isNameOpen)}
              >
                <span>{drinkName || "술 이름 찾기..."}</span>
                <img
                  src={isNameOpen ? "/image/Up.svg" : "/image/DropDown.svg"}
                  alt="dropdown-icon"
                  className="dropdown-icon"
                />
              </div>
              {isNameOpen && (
                <ul
                  className="dropdown-menu name-dropdown"
                  style={{
                    position: "absolute",
                    top: nameDropdownPosition.top,
                    left: nameDropdownPosition.left,
                    width: nameDropdownPosition.width,
                  }}
                >
                  {/* 검색창 추가 */}
                  <li className="dropdown-item search-box">
                    <span className="search-icon"></span> {/* 검색 아이콘 */}
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

                  {/* 필터링된 결과 표시 */}
                  {filteredNames.length > 0
                    ? filteredNames.map((name, index) => (
                        <li
                          key={index}
                          className="dropdown-item"
                          onClick={() => {
                            setDrinkName(name);
                            setIsNameOpen(false);
                            setError(false);
                          }}
                        >
                          {name}
                        </li>
                      ))
                    : null}
                  {/* 추가 옵션 제공 */}
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
                className={`error-text ${
                  error && !drinkName ? "show-error" : ""
                }`}
              >
                옵션을 선택해주세요.
              </p>
            </div>

            <div className="modal-buttons">
              <button className="cancel-button" onClick={onClose}>
                닫기
              </button>
              <button className="confirm-button" onClick={handleAddClick}>
                추가하기
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default DrinkAddModal;
