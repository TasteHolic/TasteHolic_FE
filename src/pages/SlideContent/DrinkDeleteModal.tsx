import React from "react";
import ReactDOM from "react-dom";
import "./DrinkDeleteModal.css";
interface DrinkDeleteModalProps {
  isOpen: boolean; // 모달 열림/닫힘 상태
  drinkName: string | null; // 삭제할 음료 이름
  onClose: () => void; // 모달 닫기 함수
  onConfirm: () => void; // 삭제 확정 함수
}

const DrinkDeleteModal: React.FC<DrinkDeleteModalProps> = ({
  isOpen,
  drinkName,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !drinkName) return null; // 모달이 닫힌 상태라면 렌더링하지 않음

  // 배경 클릭 시 닫기
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return ReactDOM.createPortal(
    <div className="drink-delete-modal" onClick={handleBackgroundClick}>
      <div className="modal-content">
        <p>{`'${drinkName}'을(를) 삭제하시겠습니까?`}</p>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={onConfirm}>
            삭제
          </button>
          <button className="cancel-button" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DrinkDeleteModal;
