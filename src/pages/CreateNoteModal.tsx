//CreateNoteModal.tsx
import React, { useState, useEffect, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import ReactDOM from "react-dom";
import { Plus, MagnifyingGlass } from "@phosphor-icons/react";
import { SketchPicker } from "react-color";
import "./CreateNoteModal.css";

interface FinalData {
  id: number | null;
  name: string;
  category: string;
  flavors: string[];
  aromas: string[];
  alcohol: string | null;
  colors: string[];
  finish: string[];
  note: string;
}

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (finalData: FinalData) => void;
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
  // 모달이 열릴 때 body 스크롤을 막음
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const [tastingNote, setTastingNote] = useState("");

  // [맛]
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

  // [향]
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

  // [도수] – 기존 select대신 새 드랍다운 사용
  const [selectedAlcohol, setSelectedAlcohol] = useState<string | null>(null);
  const alcoholOptions = [
    "논알콜",
    "0%-10%",
    "10%-20%",
    "20%-30%",
    "30%-40%",
    "40% 이상",
  ];
  const [isAlcoholDropdownOpen, setIsAlcoholDropdownOpen] = useState(false);
  const alcoholDropdownRef = useRef<HTMLUListElement>(null);
  const alcoholButtonRef = useRef<HTMLDivElement>(null);
  const [alcoholDropdownPos, setAlcoholDropdownPos] = useState({ x: 0, y: 0 });

  // [색상]
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const colorPickerButtonRef = useRef<HTMLDivElement>(null);
  const [colorPickerPos, setColorPickerPos] = useState({ x: 0, y: 0 });
  const [editingColorIndex, setEditingColorIndex] = useState<number | null>(
    null
  );
  const [tempColor, setTempColor] = useState<string>("#636363");

  // [여운] (Cocktail이 아닐 때만)
  const [selectedFinish, setSelectedFinish] = useState<string[]>([]);
  const [isFinishDropdownOpen, setIsFinishDropdownOpen] = useState(false);
  const [searchTermFinish, setSearchTermFinish] = useState("");
  const finishDropdownRef = useRef<HTMLUListElement>(null);
  const finishButtonRef = useRef<HTMLDivElement>(null);
  const [finishDropdownPos, setFinishDropdownPos] = useState({ x: 0, y: 0 });
  const [isAddFinishActive, setIsAddFinishActive] = useState(false);

  const finishKeywords = [
    "부드러운 (Smooth)",
    "향신료 (Spicy)",
    "오크 (Oak)",
    "스모키 (Smoky)",
    "은은한 (Subtle)",
    "긴 여운 (Long Finish)",
    "헤이즐넛 (Hazelnut)",
    "설탕에 절인 과일 (Candied Fruit)",
    "달콤한 (Sweet)",
    "산뜻한 (Fresh)",
  ];
  const filteredFinish = searchTermFinish
    ? finishKeywords.filter((keyword) =>
        keyword.toLowerCase().includes(searchTermFinish.toLowerCase())
      )
    : finishKeywords;

  // 전문가 노트 (더미)
  const [expertData, setExpertData] = useState<any | null>(null);
  const dummyExpertData = {
    flavors: [
      "드라이함 (Dry)",
      "짭짤함 (Salty)",
      "짭짤함 (Salty)",
      "짭짤함 (Salty)",
    ],
    aromas: ["오렌지 (Orange)", "바닐라 (Vanilla)"],
    alcohol: ["20%"],
    finish: ["스모키 (Smoky)"],
    ingredients: ["럼 (Rum)", "라임주스 (Lime Juice)"],
  };
  const [isExpertDataAvailable, setIsExpertDataAvailable] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setExpertData(dummyExpertData);
      setIsExpertDataAvailable(true);
    }
  }, [isOpen]);

  // ─────────────────────────
  // 드랍다운 외부 클릭 관련 useEffect들
  // ─────────────────────────
  useEffect(() => {
    const handleClickOutsideFlavor = (event: MouseEvent) => {
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

  useEffect(() => {
    const handleClickOutsideAroma = (event: MouseEvent) => {
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

  useEffect(() => {
    const handleClickOutsideFinish = (event: MouseEvent) => {
      if (
        finishDropdownRef.current &&
        !finishDropdownRef.current.contains(event.target as Node) &&
        finishButtonRef.current &&
        !finishButtonRef.current.contains(event.target as Node)
      ) {
        setIsFinishDropdownOpen(false);
        setIsAddFinishActive(false);
        setSearchTermFinish("");
      }
    };
    if (isFinishDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutsideFinish);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideFinish);
    };
  }, [isFinishDropdownOpen]);

  // 도수 드랍다운 외부 클릭 처리
  useEffect(() => {
    const handleClickOutsideAlcohol = (event: MouseEvent) => {
      if (
        alcoholDropdownRef.current &&
        !alcoholDropdownRef.current.contains(event.target as Node) &&
        alcoholButtonRef.current &&
        !alcoholButtonRef.current.contains(event.target as Node)
      ) {
        setIsAlcoholDropdownOpen(false);
      }
    };
    if (isAlcoholDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutsideAlcohol);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAlcohol);
    };
  }, [isAlcoholDropdownOpen]);

  // ─────────────────────────
  // 이벤트 핸들러들
  // ─────────────────────────
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

  const handleFinishSelect = (finish: string) => {
    if (!selectedFinish.includes(finish)) {
      setSelectedFinish((prev) => [...prev, finish]);
      setIsFinishDropdownOpen(false);
      setIsAddFinishActive(false);
      setSearchTermFinish("");
    }
  };
  const removeFinishTag = (finish: string) => {
    setSelectedFinish((prev) => prev.filter((f) => f !== finish));
  };

  const handleAddFlavorClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsAddFlavorActive((prev) => !prev);
    setIsFlavorDropdownOpen((prev) => !prev);

    if (flavorButtonRef.current) {
      const rect = flavorButtonRef.current.getBoundingClientRect();
      setFlavorDropdownPos({
        x: rect.left,
        y: rect.top + rect.height + 10,
      });
    }
  };

  const handleAddAromaClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsAddAromaActive((prev) => !prev);
    setIsAromaDropdownOpen((prev) => !prev);

    if (aromaButtonRef.current) {
      const rect = aromaButtonRef.current.getBoundingClientRect();
      setAromaDropdownPos({
        x: rect.left,
        y: rect.top + rect.height + 10,
      });
    }
  };

  const handleAddFinishClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsAddFinishActive((prev) => !prev);
    setIsFinishDropdownOpen((prev) => !prev);

    if (finishButtonRef.current) {
      const rect = finishButtonRef.current.getBoundingClientRect();
      setFinishDropdownPos({
        x: rect.left,
        y: rect.top + rect.height + 10,
      });
    }
  };

  // 도수 드랍다운 버튼 클릭 핸들러
  const handleAlcoholDropdownClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsAlcoholDropdownOpen((prev) => !prev);
    if (alcoholButtonRef.current) {
      const rect = alcoholButtonRef.current.getBoundingClientRect();
      setAlcoholDropdownPos({
        x: rect.left,
        y: rect.top + rect.height + 10,
      });
    }
  };

  const handleAlcoholSelect = (option: string) => {
    setSelectedAlcohol(option);
    setIsAlcoholDropdownOpen(false);
  };

  const handleColorPickerClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (selectedColors.length >= 3) {
      alert("최대 3개까지만 지정할 수 있습니다. 기존 색상을 변경해주세요.");
      return;
    }
    setEditingColorIndex(null);
    setTempColor("#636363");
    setIsColorPickerOpen(true);

    if (colorPickerButtonRef.current) {
      const rect = colorPickerButtonRef.current.getBoundingClientRect();
      setColorPickerPos({
        x: rect.left,
        y: rect.top + rect.height,
      });
    }
  };
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
  const handleColorRemove = (
    index: number,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setSelectedColors((prev) => prev.filter((_, i) => i !== index));
  };

  // ─────────────────────────
  // "생성하기" 버튼 핸들러
  // ─────────────────────────
  // FinalData 타입을 수정 (타입 정의 파일에서 변경 필요)
  const handleCreate = async () => { 
    if (selectedFlavors.length === 0) {
        alert("맛은 필수 항목입니다. 입력해주세요.");
        return;
    }
    if (selectedAromas.length === 0) {
        alert("향은 필수 항목입니다. 입력해주세요.");
        return;
    }
    if (!selectedAlcohol) {
        alert("도수는 필수 항목입니다. 선택해주세요.");
        return;
    }
    if (!tastingNote.trim()) {
        alert("한줄평은 필수 항목입니다. 입력해주세요.");
        return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
        alert("로그인이 필요합니다.");
        return;
    }

    const validTypes = ["cocktail", "whiskey", "gin", "rum", "tequila", "wine", "beer", "other"];
    const type = validTypes.includes(category) ? category : "other"; 

    try {
        const response = await fetch(`http://54.180.45.230:3000/api/v1/users/tasting-note?type=${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: drinkName || "",
                tasteRating: selectedFlavors,
                aromaRating: selectedAromas,
                abv: selectedAlcohol,
                color: selectedColors,
                finishRating: selectedFinish,
                description: tastingNote,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error("테이스팅 노트 작성 실패:", errorData);
            alert(`테이스팅 노트 작성 실패: ${errorData?.error || "알 수 없는 오류"}`);
            return;
        }

        const data = await response.json();
        console.log("✅ 음료 생성 성공:", data);

        const savedData: FinalData = {
            id: data.success?.id ?? null,  // 서버에서 받은 ID 적용
            name: drinkName || "",
            category,
            flavors: selectedFlavors,
            aromas: selectedAromas,
            alcohol: selectedAlcohol,
            colors: selectedColors,
            finish: selectedFinish,
            note: tastingNote,
        };

        // 로컬스토리지에 저장
        localStorage.setItem(`tastingnote_${savedData.name}_${savedData.category}`, JSON.stringify(savedData));

        // 상태 업데이트를 비동기적으로 실행
        requestAnimationFrame(() => {
            onComplete(savedData);
        });
    } catch (error) {
        console.error("테이스팅 노트 작성 중 오류 발생:", error);
        alert(`테이스팅 노트 작성 중 오류 발생: ${JSON.stringify(error)}`);
    }
};


  if (!isOpen) return null;

  return (
    <motion.div className="modal-overlay">
      <motion.div className="modal-content">
        <div className="modal-bg-circles">
          <div className="blur-circle yellow"></div>
          <div className="blur-circle white"></div>
        </div>
        <div className="modal-body">
          <div className="title-section">
            <h2>{drinkName}</h2>
            <p className="subtitle">{category}</p>
          </div>
          <div className="tasting-note-container">
            <div className="user-note">
              <span className="section-label">나의 테이스팅 노트</span>
              <div className="fields-wrapper">
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
                {/* 도수 드랍다운 – 기존의 select 대신 새로 구현 */}
                <div className="field-container">
                  <label>도수</label>
                  <div className="dropdown-container">
                    <div
                      className={`alcohol-dropdown-button ${
                        isAlcoholDropdownOpen ? "active" : ""
                      }`}
                      ref={alcoholButtonRef}
                      onClick={handleAlcoholDropdownClick}
                    >
                      <span className="dropdown-text">
                        {selectedAlcohol || "도수 선택"}
                      </span>
                      <span
                        className={`arrow-icon ${
                          isAlcoholDropdownOpen ? "rotated" : ""
                        }`}
                      >
                        ▾
                      </span>
                    </div>
                  </div>
                </div>

                {category === "Cocktail" ? (
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
                ) : (
                  <div className="field-container">
                    <label>여운</label>
                    <div className="input-field">
                      {selectedFinish.map((finish) => (
                        <div key={finish} className="tag-chip">
                          <span>{finish}</span>
                          <button
                            className="remove-tag"
                            onClick={() => removeFinishTag(finish)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <div className="dropdown-container">
                        <div
                          className={`tag-chip add-flavor-button ${
                            isAddFinishActive ? "active" : ""
                          }`}
                          ref={finishButtonRef}
                          onClick={handleAddFinishClick}
                        >
                          <Plus size={12} weight="bold" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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

            <div className="expert-note">
              <span className="section-label expert-label">
                전문가 테이스팅 노트
              </span>

              {!isExpertDataAvailable ? (
                <div className="expert-empty-state">
                  <div className="expert-empty-icon">[ICON]</div>
                  <p className="expert-empty-text">전문가 데이터가 없습니다.</p>
                  <p className="expert-empty-text">추후에 추가될 예정입니다.</p>
                </div>
              ) : (
                <div className="expert-fields-wrapper">
                  <div className="field-container">
                    <label>맛</label>
                    <div className="expert-input-field">
                      {expertData?.flavors?.map((fl: string, idx: number) => (
                        <div key={idx} className="tag-chip">
                          <span>{fl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="field-container">
                    <label>향</label>
                    <div className="expert-input-field">
                      {expertData?.aromas?.map((ar: string, idx: number) => (
                        <div key={idx} className="tag-chip">
                          <span>{ar}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="field-container">
                    <label>도수</label>
                    <div className="expert-input-field">
                      {expertData?.alcohol?.map((alc: string, idx: number) => (
                        <div key={idx} className="tag-chip">
                          <span>{alc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {category === "Cocktail" ? (
                    <div className="field-container">
                      <label>구성</label>
                      <div className="expert-input-field">
                        {expertData?.ingredients?.map(
                          (ing: string, idx: number) => (
                            <div key={idx} className="tag-chip">
                              <span>{ing}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="field-container">
                      <label>여운</label>
                      <div className="expert-input-field">
                        {expertData?.finish?.map((fi: string, idx: number) => (
                          <div key={idx} className="tag-chip">
                            <span>{fi}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

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

      {/* 맛 드랍다운 */}
      {isFlavorDropdownOpen &&
        ReactDOM.createPortal(
          <ul
            className="dropdown-menu"
            ref={flavorDropdownRef}
            style={{
              position: "fixed",
              top: flavorDropdownPos.y,
              left: flavorDropdownPos.x,
              zIndex: 99999,
            }}
            onClick={(e) => e.stopPropagation()}
          >
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

      {/* 향 드랍다운 */}
      {isAromaDropdownOpen &&
        ReactDOM.createPortal(
          <ul
            className="dropdown-menu"
            ref={aromaDropdownRef}
            style={{
              position: "fixed",
              top: aromaDropdownPos.y,
              left: aromaDropdownPos.x,
              zIndex: 99999,
            }}
            onClick={(e) => e.stopPropagation()}
          >
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

      {/* 도수 드랍다운 – 검색 섹션 없이 단순 키워드 선택 */}
      {isAlcoholDropdownOpen &&
        ReactDOM.createPortal(
          <ul
            className="dropdown-menu"
            ref={alcoholDropdownRef}
            style={{
              position: "fixed",
              top: alcoholDropdownPos.y,
              left: alcoholDropdownPos.x,
              zIndex: 99999,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {alcoholOptions.map((option) => (
              <li
                key={option}
                className={`dropdown-item ${
                  selectedAlcohol === option ? "disabled" : ""
                }`}
                onClick={() => handleAlcoholSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>,
          document.body
        )}

      {/* 색상 선택 팝오버 */}
      {isColorPickerOpen &&
        ReactDOM.createPortal(
          <div
            className="color-picker-popover"
            style={{
              position: "fixed",
              top: colorPickerPos.y,
              left: colorPickerPos.x,
              zIndex: 99999,
              overscrollBehavior: "none",
              touchAction: "none",
            }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onTouchMove={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
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

      {/* 여운 드랍다운 */}
      {category !== "Cocktail" &&
        isFinishDropdownOpen &&
        ReactDOM.createPortal(
          <ul
            className="dropdown-menu finish-dropdown"
            ref={finishDropdownRef}
            style={{
              position: "fixed",
              top: finishDropdownPos.y,
              left: finishDropdownPos.x,
              zIndex: 99999,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-box">
              <div className="search-wrapper">
                <div className="search-input-container">
                  <MagnifyingGlass size={12} weight="bold" />
                  <input
                    type="text"
                    placeholder="검색"
                    value={searchTermFinish}
                    onChange={(e) => setSearchTermFinish(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="scroll-container">
              {filteredFinish.map((fi) => (
                <li
                  key={fi}
                  className={`dropdown-item ${
                    selectedFinish.includes(fi) ? "disabled" : ""
                  }`}
                  onClick={() => {
                    if (!selectedFinish.includes(fi)) {
                      handleFinishSelect(fi);
                    }
                  }}
                >
                  {fi}
                </li>
              ))}
              {filteredFinish.length === 0 && (
                <li className="dropdown-item no-match">
                  일치하는 여운이 없습니다.
                </li>
              )}
            </div>
          </ul>,
          document.body
        )}
    </motion.div>
  );
};

export default CreateNoteModal;