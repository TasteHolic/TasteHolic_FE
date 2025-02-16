import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeleteAccount.css';
import Header from '../components/Header/MyHeader';
import Footer from '../components/Footer';

const DeleteAccount: React.FC = () => {
    const navigate = useNavigate();
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
        passwordInputRef.current?.focus();
    };

    // 회원 탈퇴 처리 함수
    const handleDeleteAccount = async () => {
        if (!password.trim()) {
            setMessage("비밀번호를 입력하지 않았습니다. 다시 확인해주세요.");
            return;
        }

        setIsLoading(true);

        try {
            // 1️⃣ 비밀번호 검증 요청
            const verifyResponse = await fetch(
                "http://54.180.45.230:3000/api/v1/users/verify-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ password }),
                }
            );

            
            if (!verifyResponse.ok) {
                setMessage("비밀번호가 맞지 않습니다. 다시 확인해주세요.");
                setIsLoading(false);
                return;
            }

            // 2️⃣ 회원 탈퇴 요청
            const deleteResponse = await fetch(
                "http://54.180.45.230:3000/api/v1/users/delete-user",
                {
                    method: "DELETE", 
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const deleteData = await deleteResponse.json();
            if (!deleteResponse.ok) {
                throw new Error(deleteData.message || "회원 탈퇴 실패");
            }

            // 3️⃣ 회원 정보 삭제 후 이동
            localStorage.removeItem("token");
            localStorage.removeItem("nickname");
            localStorage.removeItem("profileImage");

            navigate('/mypage/delete-account/done');
        } catch (error) {
            if (error instanceof Error) {
                setMessage(error.message);
            } else {
                setMessage("탈퇴 처리 중 알 수 없는 오류가 발생했습니다.");
            }
        }
        
    };

    return (
        <>
            <Header />
            <div className="delete-account-form">
                <div className="delete-account-inform">
                    <div className="delete-account-informbox">
                        <h1>회원 탈퇴</h1>
                        <h2>잠깐! 탈퇴하시기 전에 아래 내용을 확인해주세요</h2>
                    </div>
                </div>

                <div className="delete-form-group">
                    <div className="imgbox2">
                        <img src="/image/deleteimg.png" alt="삭제 안내 내용" />
                    </div>
                    <h1 id="before-delete">
                        탈퇴 시 계정 이용 기록은 모두 삭제되며, 삭제된 데이터는 복구가 불가능합니다. <br />
                        또한 탈퇴 후 동일 계정으로 재가입 시 제한을 받을 수 있습니다.<br />
                        탈퇴를 진행할까요?
                    </h1>
                </div>

                <div className="delete-pwdcheck">
                    <h4>비밀번호<span className="delete-account-starcolor"> *</span></h4>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setMessage(""); // 입력 시 오류 메시지 초기화
                            }}
                            ref={passwordInputRef}
                            placeholder="비밀번호를 입력해주세요."
                        />
                        <img
                            src={showPassword ? '/image/eye.png' : '/image/eye-off.png'}
                            alt={showPassword ? '보기' : '숨기기'}
                            className="toggle-password-icon"
                            onClick={toggleShowPassword}
                        />
                        <img
                            className="clear-icon"
                            src="/image/x-circle.png"
                            alt="clear icon"
                            onClick={() => {
                                setPassword("");
                                setMessage("");
                                passwordInputRef.current?.focus();
                            }}
                        />
                    </div>
                    <p className="delete-account-error-message">{message}</p>

                    <div className="delete-account-agreement-container">
                        <span className={isAgreed ? 'delete-account-agreed-text' : ''}>
                            위 주의사항을 모두 숙지했고, 탈퇴에 동의합니다.
                        </span>
                        <button
                            className={`delete-account-agree-button ${isAgreed ? 'active' : ''}`}
                            onClick={() => setIsAgreed(!isAgreed)}
                            disabled={isLoading}
                        >
                            동의
                        </button>
                    </div>
                </div>

                <div className="delete-account-button-container">
                    <button className="back-button" onClick={() => navigate(-1)} disabled={isLoading}>
                        뒤로가기
                    </button>
                    <button
                        type="submit"
                        className={`submit-button ${!password || !isAgreed || isLoading ? 'disabled' : ''}`}
                        disabled={ !isAgreed }
                        onClick={handleDeleteAccount}
                    >
                            탈퇴하기
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DeleteAccount;
