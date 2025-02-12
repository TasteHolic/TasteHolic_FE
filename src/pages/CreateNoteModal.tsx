import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CreateNoteModal.css";
import { Plus, MagnifyingGlass } from "@phosphor-icons/react";

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
  drinkName = "Merlot",
  category = "Wine",
}) => {
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [selectedAromas, setSelectedAromas] = useState<string[]>([]);
  const [selectedAlcohol, setSelectedAlcohol] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [tastingNote, setTastingNote] = useState("");
  const [step, setStep] = useState<"create" | "complete">("create");
  const [isFlavorDropdownOpen, setIsFlavorDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

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
  const alcoholLevels = [
    "논알콜",
    "0%-10%",
    "10%-20%",
    "20%-30%",
    "30%-40%",
    "40% 이상",
  ];
  const maxColors = 3;

  const filteredFlavors = searchTerm
    ? flavors.filter((flavor) =>
        flavor.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : flavors;

  // 초기화 함수
  const resetFields = () => {
    setSelectedFlavors([]);
    setSelectedAromas([]);
    setSelectedAlcohol(null);
    setSelectedColors([]);
    setTastingNote("");
  };

  // 모달 닫을 때 초기화
  useEffect(() => {
    if (!isOpen) resetFields();
  }, [isOpen]);

  // 외부 클릭 감지를 위한 이벤트 리스너
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFlavorDropdownOpen(false);
        setSearchTerm("");
      }
    };

    if (isFlavorDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFlavorDropdownOpen]);

  // 키워드 추가 및 제거
  const toggleSelection = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // 색상 선택 로직 추가
  const toggleColorSelection = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else if (selectedColors.length < maxColors) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  // 맛 키워드 선택 처리
  const handleFlavorSelect = (flavor: string) => {
    if (!selectedFlavors.includes(flavor)) {
      setSelectedFlavors((prev) => [...prev, flavor]);
      setIsFlavorDropdownOpen(false); // 선택 후 드롭다운 닫기
      setSearchTerm(""); // 검색어 초기화
    }
  };

  // 맛 태그 제거
  const removeFlavorTag = (flavor: string) => {
    setSelectedFlavors((prev) => prev.filter((f) => f !== flavor));
  };

  // 생성 버튼 클릭 → 완료 화면 전환
  const handleCreate = () => {
    setStep("complete");
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

                    <div ref={dropdownRef}>
                      <div
                        className={`tag-chip add-flavor-button ${
                          isFlavorDropdownOpen ? "open" : ""
                        }`}
                        onClick={() =>
                          setIsFlavorDropdownOpen(!isFlavorDropdownOpen)
                        }
                      >
                        <Plus size={12} weight="bold" />
                      </div>

                      {isFlavorDropdownOpen && (
                        <ul
                          className="dropdown-menu"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="search-box">
                            <div className="search-wrapper">
                              <div className="search-input-container">
                                <MagnifyingGlass size={12} weight="bold" />
                                <input
                                  type="text"
                                  placeholder="검색"
                                  value={searchTerm}
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="scroll-container">
                            {filteredFlavors.map((flavor) => (
                              <li
                                key={flavor}
                                className={`dropdown-item ${
                                  selectedFlavors.includes(flavor)
                                    ? "disabled"
                                    : ""
                                }`}
                                onClick={() =>
                                  !selectedFlavors.includes(flavor) &&
                                  handleFlavorSelect(flavor)
                                }
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
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className="field-container">
                  <label>향</label>
                  <div className="input-field">{/* 향 필드 내용 */}</div>
                </div>

                <div className="field-container">
                  <label>도수</label>
                  <div className="input-field">{/* 도수 필드 내용 */}</div>
                </div>

                <div className="field-container">
                  <label>색상</label>
                  <div className="input-field">{/* 색상 필드 내용 */}</div>
                </div>

                <div className="field-container">
                  <label>한줄평</label>
                  <div className="input-field">{/* 한줄평 필드 내용 */}</div>
                </div>
              </div>
            </div>

            <div className="vertical-line" />

            <div className="expert-note">
              {/* 전문가 테이스팅 노트 섹션은 추후 구현 */}
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
    </motion.div>
  );
};

export default CreateNoteModal;
