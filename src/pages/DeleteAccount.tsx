import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeleteAccount.css';

const DeleteAccount: React.FC = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        password: '',
    });

    const [validation, setValidation] = useState({
        password: false,
    });

    const [message, setMessages] = useState({
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);

    const passwordInputRef = useRef<HTMLInputElement>(null);

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
        passwordInputRef.current?.focus();
    };

    const validateField = (name: string, value: string) => {
        let message = '';
        let isValid = false;

        if (name === 'password') {
            const storedPassword = localStorage.getItem('userPassword') || ''; // 저장된 비밀번호 가져오기
            const isEmpty = value.trim().length === 0;
            const isMatch = value === storedPassword;

            if (isEmpty) {
                message = '아이디 또는 비밀번호를 입력하지 않았습니다. 다시 확인해주세요.';
            } else if (!isMatch) {
                message = '비밀번호가 맞지 않습니다. 다시 확인해주세요.';
            } else {
                isValid = true; // 비밀번호가 맞을 때 유효성 검사 통과
            }

            setMessages((prev) => ({
                ...prev,
                password: message,
            }));

            setValidation((prev) => ({
                ...prev,
                password: isValid,
            }));
        }
    };

    const handleDeleteAccount = () => {
        navigate('/mypage/delete-account-next'); // 탈퇴 완료 후 이동할 페이지
    };

    return (
        <div className="signup-form">
            <div className="inform">
                <div className="informbox">
                    <h1>회원 탈퇴</h1>
                    <h2>잠깐! 탈퇴하시기 전에 아래 내용을 확인해주세요</h2>
                </div>
            </div>

            <div className="form-group">
                <div className="imgbox2">
                    <img src="\image\deleteimg.png" alt="삭제 안내 내용" />
                </div>
                <h1 id="before-delete">
                    탈퇴 시 계정 이용 기록은 모두 삭제되며, 삭제된 데이터는 복구가 불가능합니다. <br />
                    또한 탈퇴 후 동일 계정으로 재가입 시 제한을 받을 수 있습니다.<br />
                    탈퇴를 진행할까요?
                </h1>
            </div>

            <div className="pwdcheck">
                <h4>비밀번호<span className="starcolor"> *</span></h4>
                <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={form.password}
                        onChange={(e) => {
                            setForm({ ...form, password: e.target.value });
                            validateField('password', e.target.value);
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
                            setForm({ ...form, password: '' });
                            passwordInputRef.current?.focus();
                        }}
                    />
                </div>
                <p className="error-message">{message.password}</p>

                <div className="agreement-container">
                    <span className={isAgreed ? 'agreed-text' : ''}>
                        위 주의사항을 모두 숙지했고, 탈퇴에 동의합니다.
                    </span>
                    <button
                        className={`agree-button ${isAgreed ? 'active' : ''}`}
                        onClick={() => setIsAgreed(!isAgreed)}
                    >
                        동의
                    </button>
                </div>
            </div>

            <div className="button-container">
                <button className="back-button" onClick={() => navigate(-1)}>
                    뒤로가기
                </button>
                <button
                    type="submit"
                    className={`submit-button ${!validation.password || !isAgreed ? 'disabled' : ''}`}
                    disabled={!validation.password || !isAgreed}
                    onClick={() => {
                        if (validation.password && isAgreed) {
                            handleDeleteAccount();
                        }
                    }}
                >
                    탈퇴하기
                </button>
            </div>
        </div>
    );
};

export default DeleteAccount;
