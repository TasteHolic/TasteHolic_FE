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
  // 한줄평 텍스트필드
  const [tastingNote, setTastingNote] = useState("");

  const [step, setStep] = useState<"create" | "complete">("create");

  // 맛 드롭다운 상태
  const [isFlavorDropdownOpen, setIsFlavorDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  // 맛 검색 필터
  const filteredFlavors = searchTerm
    ? flavors.filter((flavor) =>
        flavor.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : flavors;

  // 모달 닫힐 때 입력 필드들 초기화
  const resetFields = () => {
    setSelectedFlavors([]);
    setSelectedAromas([]);
    setSelectedAlcohol(null);
    setSelectedColors([]);
    setTastingNote("");
  };

  useEffect(() => {
    if (!isOpen) resetFields();
  }, [isOpen]);

  // 외부 클릭 감지 → 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFlavorDropdownOpen(false);
        setIsAddFlavorActive(false); // + 버튼의 활성화 상태 해제
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

  // 맛 추가/제거
  const handleFlavorSelect = (flavor: string) => {
    if (!selectedFlavors.includes(flavor)) {
      setSelectedFlavors((prev) => [...prev, flavor]);
      setIsFlavorDropdownOpen(false);
      setIsAddFlavorActive(false);
      setSearchTerm("");
    }
  };
  const removeFlavorTag = (flavor: string) => {
    setSelectedFlavors((prev) => prev.filter((f) => f !== flavor));
  };

  // 색상 선택
  const toggleColorSelection = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else if (selectedColors.length < maxColors) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  // 플러스 버튼 클릭 → 맛 드롭다운 열기
  const handleAddFlavorClick = () => {
    console.log("버튼 클릭!");
    setIsAddFlavorActive(!isAddFlavorActive);
    setIsFlavorDropdownOpen(!isFlavorDropdownOpen);
  };

  // 생성하기 버튼 클릭 → 완료
  const handleCreate = () => {
    setStep("complete");
    // 실제로는 onComplete() 등 API 전송 로직
  };

  if (!isOpen) return null;

  return (
    <motion.div className="modal-overlay">
      <motion.div className="modal-content">
        {/* 배경 서클 */}
        <div className="modal-bg-circles">
          <div className="blur-circle yellow"></div>
          <div className="blur-circle white"></div>
        </div>

        <div className="modal-body">
          {/* 제목 구역 */}
          <div className="title-section">
            <h2>{drinkName}</h2>
            <p className="subtitle">{category}</p>
          </div>

          {/* 메인 컨테이너 */}
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

                    {/* 드롭다운 버튼 */}
                    <div className="dropdown-container" ref={dropdownRef}>
                      <div
                        className={`tag-chip add-flavor-button ${
                          isAddFlavorActive ? "active" : ""
                        }`}
                        onClick={handleAddFlavorClick}
                      >
                        <Plus size={12} weight="bold" />
                      </div>

                      {/* 맛 드롭다운 */}
                      {isFlavorDropdownOpen && (
                        <ul
                          className="dropdown-menu"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* 검색창 */}
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

                          {/* 검색 결과 목록 */}
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

                {/* 향 필드 */}
                <div className="field-container">
                  <label>향</label>
                  <div className="input-field">{/* ... */}</div>
                </div>

                {/* 도수 필드 */}
                <div className="field-container">
                  <label>도수</label>
                  <div className="input-field">{/* ... */}</div>
                </div>

                {/* 색상 필드 */}
                <div className="field-container">
                  <label>색상</label>
                  <div className="input-field">{/* ... */}</div>
                </div>

                {/* 한줄평 필드 */}
                <div className="field-container last-field">
                  <label>한줄평</label>
                  {/* 한줄평 전용 영역 */}
                  <div className="one-line-field">
                    <textarea
                      maxLength={200} // 200자 제한
                      placeholder="한줄평을 남겨보세요."
                      value={tastingNote}
                      onChange={(e) => setTastingNote(e.target.value)}
                      className="one-line-textarea"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 세로 구분선 */}
            <div className="vertical-line" />

            {/* 전문가 노트 (미구현) */}
            <div className="expert-note"></div>
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
    </motion.div>
  );
};

export default CreateNoteModal;
