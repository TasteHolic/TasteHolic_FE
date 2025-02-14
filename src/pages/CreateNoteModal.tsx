import React, { useState, useEffect, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import ReactDOM from "react-dom";
import { Plus, MagnifyingGlass } from "@phosphor-icons/react";
import { SketchPicker } from "react-color";
import "./CreateNoteModal.css";

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  drinkName?: string;
  category?: string;
}

const CreateNoteModal: React.FC<CreateNoteModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  drinkName = "Merlot",
  category = "Wine",
}) => {
  // 공통 상태
  const [tastingNote, setTastingNote] = useState("");
  const [step, setStep] = useState<"create" | "complete">("create");

  // [맛] 관련 상태 및 ref
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [isFlavorDropdownOpen, setIsFlavorDropdownOpen] = useState(false);
  const [searchTermFlavor, setSearchTermFlavor] = useState("");
  const flavorDropdownRef = useRef<HTMLUListElement>(null);
  const flavorButtonRef = useRef<HTMLDivElement>(null);
  const [flavorDropdownPos, setFlavorDropdownPos] = useState({ x: 0, y: 0 });
  const [isAddFlavorActive, setIsAddFlavorActive] = useState(false);

  const flavors = [
    "달콤함 (Sweet)",
    "시트러스 (Citrus)",
    "상쾌함 (Refreshing)",
    "드라이함 (Dry)",
    "강렬함 (Intense)",
    "부드러움 (Smooth)",
    "프루티 (Fruity)",
    "허브 (Herbal)",
    "짭짤함 (Salty)",
  ];

  const filteredFlavors = searchTermFlavor
    ? flavors.filter((flavor) =>
        flavor.toLowerCase().includes(searchTermFlavor.toLowerCase())
      )
    : flavors;

  // [향] 관련 상태 및 ref
  const [selectedAromas, setSelectedAromas] = useState<string[]>([]);
  const [isAromaDropdownOpen, setIsAromaDropdownOpen] = useState(false);
  const [searchTermAroma, setSearchTermAroma] = useState("");
  const aromaDropdownRef = useRef<HTMLUListElement>(null);
  const aromaButtonRef = useRef<HTMLDivElement>(null);
  const [aromaDropdownPos, setAromaDropdownPos] = useState({ x: 0, y: 0 });
  const [isAddAromaActive, setIsAddAromaActive] = useState(false);

  const aromas = [
    "라임 (Lime)",
    "시트러스 (Citrus)",
    "아몬드 (Almond)",
    "바닐라 (Vanilla)",
    "민트 (Mint)",
    "베리 (Berry)",
    "오크 (Oaky)",
    "커피 (Coffee)",
    "오렌지 (Orange)",
  ];

  const filteredAromas = searchTermAroma
    ? aromas.filter((aroma) =>
        aroma.toLowerCase().includes(searchTermAroma.toLowerCase())
      )
    : aromas;

  // [도수] 관련 상태 (간단 select)
  const [selectedAlcohol, setSelectedAlcohol] = useState<string | null>(null);
  const alcoholOptions = [
    "논알콜",
    "0%-10%",
    "10%-20%",
    "20%-30%",
    "30%-40%",
    "40% 이상",
  ];

  // [색상] 관련 상태 – 컬러피커 사용
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const colorPickerButtonRef = useRef<HTMLDivElement>(null);
  const [colorPickerPos, setColorPickerPos] = useState({ x: 0, y: 0 });
  const [editingColorIndex, setEditingColorIndex] = useState<number | null>(
    null
  );
  const [tempColor, setTempColor] = useState<string>("#636363");

  // 모달 닫힐 때 모든 입력 초기화
  useEffect(() => {
    if (!isOpen) {
      setSelectedFlavors([]);
      setSearchTermFlavor("");
      setIsFlavorDropdownOpen(false);
      setIsAddFlavorActive(false);

      setSelectedAromas([]);
      setSearchTermAroma("");
      setIsAromaDropdownOpen(false);
      setIsAddAromaActive(false);

      setSelectedAlcohol(null);
      setSelectedColors([]);
      setTastingNote("");
      setEditingColorIndex(null);
      setTempColor("#636363");
    }
  }, [isOpen]);

  // 맛 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutsideFlavor = (event: globalThis.MouseEvent) => {
      if (
        flavorDropdownRef.current &&
        !flavorDropdownRef.current.contains(event.target as Node) &&
        flavorButtonRef.current &&
        !flavorButtonRef.current.contains(event.target as Node)
      ) {
        setIsFlavorDropdownOpen(false);
        setIsAddFlavorActive(false);
        setSearchTermFlavor("");
      }
    };

    if (isFlavorDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutsideFlavor);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideFlavor);
    };
  }, [isFlavorDropdownOpen]);

  // 향 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutsideAroma = (event: globalThis.MouseEvent) => {
      if (
        aromaDropdownRef.current &&
        !aromaDropdownRef.current.contains(event.target as Node) &&
        aromaButtonRef.current &&
        !aromaButtonRef.current.contains(event.target as Node)
      ) {
        setIsAromaDropdownOpen(false);
        setIsAddAromaActive(false);
        setSearchTermAroma("");
      }
    };

    if (isAromaDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutsideAroma);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAroma);
    };
  }, [isAromaDropdownOpen]);

  // 맛 선택 및 제거
  const handleFlavorSelect = (flavor: string) => {
    if (!selectedFlavors.includes(flavor)) {
      setSelectedFlavors((prev) => [...prev, flavor]);
      setIsFlavorDropdownOpen(false);
      setIsAddFlavorActive(false);
      setSearchTermFlavor("");
    }
  };

  const removeFlavorTag = (flavor: string) => {
    setSelectedFlavors((prev) => prev.filter((f) => f !== flavor));
  };

  // 향 선택 및 제거
  const handleAromaSelect = (aroma: string) => {
    if (!selectedAromas.includes(aroma)) {
      setSelectedAromas((prev) => [...prev, aroma]);
      setIsAromaDropdownOpen(false);
      setIsAddAromaActive(false);
      setSearchTermAroma("");
    }
  };

  const removeAromaTag = (aroma: string) => {
    setSelectedAromas((prev) => prev.filter((a) => a !== aroma));
  };

  // 맛 플러스 버튼 클릭 → 드롭다운 토글 및 위치 계산
  const handleAddFlavorClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsAddFlavorActive((prev) => !prev);
    setIsFlavorDropdownOpen((prev) => !prev);

    if (flavorButtonRef.current) {
      const rect = flavorButtonRef.current.getBoundingClientRect();
      setFlavorDropdownPos({
        x: rect.left,
        y: rect.top + rect.height,
      });
    }
  };

  // 향 플러스 버튼 클릭 → 드롭다운 토글 및 위치 계산
  const handleAddAromaClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsAddAromaActive((prev) => !prev);
    setIsAromaDropdownOpen((prev) => !prev);

    if (aromaButtonRef.current) {
      const rect = aromaButtonRef.current.getBoundingClientRect();
      setAromaDropdownPos({
        x: rect.left,
        y: rect.top + rect.height,
      });
    }
  };

  // 색상 필드 – 컬러피커 버튼 클릭 처리 (신규 색상 추가)
  const handleColorPickerClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (selectedColors.length >= 3) {
      alert("최대 3개까지만 지정할 수 있습니다. 기존 색상을 변경해주세요.");
      return;
    }
    setEditingColorIndex(null);
    setTempColor("#636363"); // 기본 색상
    setIsColorPickerOpen(true);
    if (colorPickerButtonRef.current) {
      const rect = colorPickerButtonRef.current.getBoundingClientRect();
      setColorPickerPos({
        x: rect.left,
        y: rect.top + rect.height,
      });
    }
  };

  // 색상 태그 클릭 시 – 기존 색상 수정
  const handleColorTagClick = (
    index: number,
    e: MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    setEditingColorIndex(index);
    setTempColor(selectedColors[index]);
    setIsColorPickerOpen(true);
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    setColorPickerPos({
      x: rect.left,
      y: rect.top + rect.height,
    });
  };

  // 색상 삭제 처리
  const handleColorRemove = (
    index: number,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setSelectedColors((prev) => prev.filter((_, i) => i !== index));
  };

  // 생성 버튼 클릭 (완료 처리 등)
  const handleCreate = () => {
    setStep("complete");
    // 필요 시 onComplete() 호출 등 추가 로직 구현
  };

  if (!isOpen) return null;

  return (
    <motion.div className="modal-overlay">
      <motion.div className="modal-content">
        {/* 배경 원 및 블러 효과 */}
        <div className="modal-bg-circles">
          <div className="blur-circle yellow"></div>
          <div className="blur-circle white"></div>
        </div>

        <div className="modal-body">
          {/* 제목 영역 */}
          <div className="title-section">
            <h2>{drinkName}</h2>
            <p className="subtitle">{category}</p>
          </div>

          {/* 메인 영역 */}
          <div className="tasting-note-container">
            <div className="user-note">
              <span className="section-label">나의 테이스팅 노트</span>
              <div className="fields-wrapper">
                {/* 맛 필드 */}
                <div className="field-container">
                  <label>맛</label>
                  <div className="input-field">
                    {selectedFlavors.map((flavor) => (
                      <div key={flavor} className="tag-chip">
                        <span>{flavor}</span>
                        <button
                          className="remove-tag"
                          onClick={() => removeFlavorTag(flavor)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <div className="dropdown-container">
                      <div
                        className={`tag-chip add-flavor-button ${
                          isAddFlavorActive ? "active" : ""
                        }`}
                        ref={flavorButtonRef}
                        onClick={handleAddFlavorClick}
                      >
                        <Plus size={12} weight="bold" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 향 필드 */}
                <div className="field-container">
                  <label>향</label>
                  <div className="input-field">
                    {selectedAromas.map((aroma) => (
                      <div key={aroma} className="tag-chip">
                        <span>{aroma}</span>
                        <button
                          className="remove-tag"
                          onClick={() => removeAromaTag(aroma)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <div className="dropdown-container">
                      <div
                        className={`tag-chip add-flavor-button ${
                          isAddAromaActive ? "active" : ""
                        }`}
                        ref={aromaButtonRef}
                        onClick={handleAddAromaClick}
                      >
                        <Plus size={12} weight="bold" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 도수 필드 */}
                <div className="field-container">
                  <label>도수</label>
                  <div className="input-field">
                    <select
                      value={selectedAlcohol || ""}
                      onChange={(e) => setSelectedAlcohol(e.target.value)}
                    >
                      <option value="" disabled>
                        도수 선택
                      </option>
                      {alcoholOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 색상 필드 – 컬러피커 적용 */}
                <div className="field-container">
                  <label>색상</label>
                  <div className="color-picker-container">
                    <div className="selected-colors">
                      {selectedColors.map((color, index) => (
                        <div
                          key={index}
                          className="color-tag"
                          style={{ backgroundColor: color }}
                          onClick={(e) => handleColorTagClick(index, e)}
                        >
                          <button
                            className="remove-color-button"
                            onClick={(e) => handleColorRemove(index, e)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <div
                      className="color-picker-button"
                      ref={colorPickerButtonRef}
                      onClick={handleColorPickerClick}
                    >
                      <Plus size={12} weight="bold" />
                    </div>
                  </div>
                </div>

                {/* 한줄평 필드 */}
                <div className="field-container last-field">
                  <label>한줄평</label>
                  <div className="one-line-field">
                    <textarea
                      maxLength={200}
                      placeholder="한줄평을 남겨보세요."
                      value={tastingNote}
                      onChange={(e) => setTastingNote(e.target.value)}
                      className="one-line-textarea"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="vertical-line" />
            <div className="expert-note">{/* 전문가 노트 (미구현) */}</div>
          </div>

          {/* 하단 버튼 */}
          <div className="modal-footer">
            <button className="prev-btn" onClick={onClose}>
              뒤로
            </button>
            <button className="next-btn" onClick={handleCreate}>
              생성하기
            </button>
          </div>
        </div>
      </motion.div>

      {/* Portal을 사용하여 맛 드롭다운 렌더링 */}
      {isFlavorDropdownOpen &&
        ReactDOM.createPortal(
          <ul
            className="dropdown-menu"
            ref={flavorDropdownRef}
            style={{
              position: "absolute",
              top: flavorDropdownPos.y,
              left: flavorDropdownPos.x,
              zIndex: 1002,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 맛 검색창 */}
            <div className="search-box">
              <div className="search-wrapper">
                <div className="search-input-container">
                  <MagnifyingGlass size={12} weight="bold" />
                  <input
                    type="text"
                    placeholder="검색"
                    value={searchTermFlavor}
                    onChange={(e) => setSearchTermFlavor(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* 맛 드롭다운 목록 */}
            <div className="scroll-container">
              {filteredFlavors.map((flavor) => (
                <li
                  key={flavor}
                  className={`dropdown-item ${
                    selectedFlavors.includes(flavor) ? "disabled" : ""
                  }`}
                  onClick={() => {
                    if (!selectedFlavors.includes(flavor)) {
                      handleFlavorSelect(flavor);
                    }
                  }}
                >
                  {flavor}
                </li>
              ))}
              {filteredFlavors.length === 0 && (
                <li className="dropdown-item no-match">
                  일치하는 맛이 없습니다.
                </li>
              )}
            </div>
          </ul>,
          document.body
        )}

      {/* Portal을 사용하여 향 드롭다운 렌더링 */}
      {isAromaDropdownOpen &&
        ReactDOM.createPortal(
          <ul
            className="dropdown-menu"
            ref={aromaDropdownRef}
            style={{
              position: "absolute",
              top: aromaDropdownPos.y,
              left: aromaDropdownPos.x,
              zIndex: 1002,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 향 검색창 */}
            <div className="search-box">
              <div className="search-wrapper">
                <div className="search-input-container">
                  <MagnifyingGlass size={12} weight="bold" />
                  <input
                    type="text"
                    placeholder="검색"
                    value={searchTermAroma}
                    onChange={(e) => setSearchTermAroma(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* 향 드롭다운 목록 */}
            <div className="scroll-container">
              {filteredAromas.map((aroma) => (
                <li
                  key={aroma}
                  className={`dropdown-item ${
                    selectedAromas.includes(aroma) ? "disabled" : ""
                  }`}
                  onClick={() => {
                    if (!selectedAromas.includes(aroma)) {
                      handleAromaSelect(aroma);
                    }
                  }}
                >
                  {aroma}
                </li>
              ))}
              {filteredAromas.length === 0 && (
                <li className="dropdown-item no-match">
                  일치하는 향이 없습니다.
                </li>
              )}
            </div>
          </ul>,
          document.body
        )}

      {/* Portal을 사용하여 컬러피커 팝오버 렌더링 */}
      {isColorPickerOpen &&
        ReactDOM.createPortal(
          <div
            className="color-picker-popover"
            style={{
              position: "absolute",
              top: colorPickerPos.y,
              left: colorPickerPos.x,
              zIndex: 1002,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <SketchPicker
              color={tempColor}
              onChange={(color) => {
                setTempColor(color.hex);
              }}
              disableAlpha={true}
            />
            <button
              className="color-picker-confirm"
              onClick={() => {
                if (editingColorIndex !== null) {
                  const newColors = [...selectedColors];
                  newColors[editingColorIndex] = tempColor;
                  setSelectedColors(newColors);
                  setEditingColorIndex(null);
                } else {
                  if (selectedColors.length >= 3) {
                    alert(
                      "최대 3개까지만 지정할 수 있습니다. 기존 색상을 변경해주세요."
                    );
                    return;
                  } else {
                    setSelectedColors([...selectedColors, tempColor]);
                  }
                }
                setIsColorPickerOpen(false);
              }}
            >
              확인
            </button>
          </div>,
          document.body
        )}
    </motion.div>
  );
};

export default CreateNoteModal;
