import React from "react";
import "./AccountManagement.css";

const AccountManagement: React.FC = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleDeleteAccount = () => {
    if (window.confirm("정말로 회원탈퇴 하시겠습니까?")) {
      localStorage.clear(); // 회원탈퇴 시 localStorage 초기화
      window.location.reload();
    }
  };

  return (
    <div className="account-management">
      <div className="actions">
        <button onClick={handleLogout} className="logout-btn">
          로그아웃
        </button>
        <hr></hr>
        <button onClick={handleDeleteAccount} className="delete-account-btn">
          회원탈퇴
        </button>
        <hr></hr>
      </div>
    </div>
  );
};

export default AccountManagement;
