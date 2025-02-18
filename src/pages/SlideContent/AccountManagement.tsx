// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountManagement.css';

interface AccountManagementProps {
    setLogoutModalOpen: (state: boolean) => void;
}

const AccountManagement: React.FC<AccountManagementProps> = ({ setLogoutModalOpen }) => {
    const navigate = useNavigate();

    const handleDeleteAccount = () => {
        navigate('/mypage/delete-account');
    };

    return (
        <div className="account-management">
            <div className="actions">
                <button onClick={() => setLogoutModalOpen(true)} className="logout-btn">
                    로그아웃
                </button>
                <hr />
                <button onClick={handleDeleteAccount} className="delete-account-btn">회원탈퇴</button>
                <hr />
            </div>
        </div>
    );
};

export default AccountManagement;
