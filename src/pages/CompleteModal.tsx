import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CompleteModal.css";

interface CompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompleteModal: React.FC<CompleteModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="complete-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="complete-modal-content"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="modal-bg-circles">
              <div className="blur-circle yellow"></div>
              <div className="blur-circle white"></div>
            </div>

            <div className="complete-body">
              <h2>테이스팅 노트가 완성되었어요</h2>
              <p>완성된 노트로 테이스팅을 즐겨보세요.</p>
            </div>
            <button className="complete-close-btn" onClick={onClose}>
              완료
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompleteModal;
