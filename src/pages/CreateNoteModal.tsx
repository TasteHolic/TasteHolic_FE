import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  drinkName = "Merlot",
  category = "Wine",
}) => {
  console.log("CreateNoteModal 렌더링됨, isOpen:", isOpen);

  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [selectedAromas, setSelectedAromas] = useState<string[]>([]);
  const [selectedAlcohol, setSelectedAlcohol] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [tastingNote, setTastingNote] = useState("");
  const [step, setStep] = useState<"create" | "complete">("create");
  const [isFlavorDropdownOpen, setIsFlavorDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
    console.log("CreateNoteModal isOpen 변경됨:", isOpen);
    if (!isOpen) resetFields();
  }, [isOpen]);

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

  // 생성 버튼 클릭 → 완료 화면 전환
  const handleCreate = () => {
    console.log("API 전송", {
      selectedFlavors,
      selectedAromas,
      selectedAlcohol,
      selectedColors,
      tastingNote,
    });
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
                          onClick={() =>
                            setSelectedFlavors((prev) =>
                              prev.filter((f) => f !== flavor)
                            )
                          }
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    <button
                      className={`add-button ${
                        isFlavorDropdownOpen ? "active" : ""
                      }`}
                      onClick={() =>
                        setIsFlavorDropdownOpen(!isFlavorDropdownOpen)
                      }
                    >
                      +
                    </button>

                    {isFlavorDropdownOpen && (
                      <div className="dropdown-menu">
                        <div className="search-field">
                          <span className="search-icon">🔍</span>
                          <input
                            type="text"
                            placeholder="검색"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <div className="options-list">
                          {filteredFlavors.map((flavor, index) => (
                            <div
                              key={flavor}
                              className={`option ${
                                selectedFlavors.includes(flavor)
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() => {
                                if (!selectedFlavors.includes(flavor)) {
                                  setSelectedFlavors((prev) => [
                                    ...prev,
                                    flavor,
                                  ]);
                                }
                              }}
                            >
                              {flavor}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
