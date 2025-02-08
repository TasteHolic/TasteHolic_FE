import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileEditPage.css";

const ProfileEditPage: React.FC = () => {
    const navigate = useNavigate();
    const storedEmail = localStorage.getItem("email") || "example@example.com";

    const [nickname, setNickname] = useState(localStorage.getItem("nickname") || "");
    const [introText, setIntroText] = useState(localStorage.getItem("introText") || "");
    const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [messages, setMessages] = useState({
        passwordLength: "* 10자 이상 입력",
        passwordComplexity: "* 영문·숫자·특수문자 중 2개 이상 조합(공백 불가)",
        confirmPassword: "* 동일한 비밀번호를 입력해주세요.",
    });

    const [validation, setValidation] = useState({
        passwordLength: false,
        passwordComplexity: false,
        confirmPassword: false,
    });

    const passwordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // 로컬스토리지에서 최신 정보 불러오기 및 검증
        const storedNickname = localStorage.getItem("nickname");
        const storedIntroText = localStorage.getItem("introText");
        const storedProfileImage = localStorage.getItem("profileImage");

        // 상태와 로컬스토리지 값이 다를 경우에만 업데이트
        if (storedNickname && storedNickname !== nickname) {
            setNickname(storedNickname);
        }
        if (storedIntroText && storedIntroText !== introText) {
            setIntroText(storedIntroText);
        }
        if (storedProfileImage && storedProfileImage !== profileImage) {
            setProfileImage(storedProfileImage);
        }

    }, []);  // useEffect가 처음 한번만 실행되도록 의존성 배열에 빈 배열을 추가

    const handlePasswordChange = (value: string) => {
        const isLengthValid = value.length >= 10;
        const isComplexValid =
            (/[a-zA-Z]/.test(value) && /\d/.test(value)) || 
            (/[a-zA-Z]/.test(value) && /[!@#$%^&*()_+]/.test(value)) || 
            (/\d/.test(value) && /[!@#$%^&*()_+]/.test(value));

        setMessages(prev => ({
            ...prev,
            passwordLength: isLengthValid ? "* 10자 이상 입력" : "* 10자 이상 입력",
            passwordComplexity: isComplexValid
                ? "* 영문·숫자·특수문자 중 2개 이상 조합(공백 불가)"
                : "* 영문·숫자·특수문자 중 2개 이상 조합(공백 불가)",
        }));

        setValidation(prev => ({
            ...prev,
            passwordLength: isLengthValid,
            passwordComplexity: isComplexValid,
        }));

        setPassword(value);
    };

    const handleConfirmPasswordChange = (value: string) => {
        const isValid = value === password;

        setMessages(prev => ({
            ...prev,
            confirmPassword: isValid ? "* 동일한 비밀번호를 입력해주세요." : "* 동일한 비밀번호를 입력해주세요.",
        }));

        setValidation(prev => ({
            ...prev,
            confirmPassword: isValid,
        }));

        setConfirmPassword(value);
    };

    const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageData = reader.result as string;
                setProfileImage(imageData);
                localStorage.setItem("profileImage", imageData);
            };
            reader.readAsDataURL(file);
        }
    };

    const getMessageColor = (isValid: boolean, isEmpty: boolean) => {
        return isEmpty ? "#A8AAAB" : isValid ? "#4ECE95" : "#FDA4C7";
    };

    return (
        <div className="profile-edit-page">
            <div className="profile-edit-section">
                <div className="profile-edit-image-container">
                    <img src={profileImage || "/image/basicimage.png"} alt="프로필 사진" />
                    <label className="custom-file-upload">
                        <img src="/image/imageChange.png" alt="프로필 사진 변경" />
                        <input
                            id="profile-image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                            style={{ display: "none" }}
                        />
                    </label>
                </div>

                <div className="profile-edit-info">
                    <div className="edit-info-text1">
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="* 2자 이상의 한글·영문·숫자"
                        />
                        <button onClick={() => {
                            if (nickname.length >= 2 && /^[a-zA-Z0-9가-힣]+$/.test(nickname)) {
                                localStorage.setItem("nickname", nickname);
                                alert("닉네임이 변경되었습니다.");
                            } else {
                                alert("닉네임은 2자 이상의 한글, 영문, 숫자만 가능합니다.");
                            }
                        }}>수정</button>
                    </div>

                    <div className="edit-info-text2">
                        <textarea
                            value={introText}
                            onChange={(e) => {
                                if (e.target.value.length <= 100) {
                                    setIntroText(e.target.value);
                                }
                            }}
                            placeholder="회원님의 이야기를 들려주세요."
                            rows={4}
                            maxLength={100}
                        />
                        <button onClick={() => {
                            localStorage.setItem("introText", introText);
                            alert("자기소개가 변경되었습니다.");
                        }}>수정</button>
                    </div>
                </div>
            </div>

            <div className="profile-security-text">
                보안 관리 <span><img src="/image/deleteimg.png" alt="보안관리 아이콘" /></span>
            </div>

            <div className="security-section">
                <div className="email-fixed">이메일 <span>{storedEmail}</span></div>

                <div className="profile-edit-container">
                    <label>새 비밀번호 </label><span>*</span>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        placeholder="비밀번호를 입력해주세요."
                    />
                    <img
                        src={showPassword ? "/image/eye.png" : "/image/eye-off.png"}
                        alt={showPassword ? "보기" : "숨기기"}
                        className="edit-toggle-password-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                    <img
                        className="edit-clear-icon-us"
                        src="/image/x-circle.png"
                        alt="clearicon"
                        onClick={() => {
                            setPassword("");
                            passwordInputRef.current?.focus();
                        }}
                    />
                    <button
                        onClick={() => {
                            if (validation.passwordLength && validation.passwordComplexity) {
                                localStorage.setItem("password", password);
                                alert("비밀번호가 변경되었습니다.");
                            } else {
                                alert("비밀번호 조건을 충족해주세요.");
                            }
                        }}
                    >
                        수정
                    </button>
                </div>

                <div className="edit-error-message">
                    <p style={{ color: getMessageColor(validation.passwordComplexity, password.length === 0) }}>
                        {messages.passwordComplexity}
                    </p>
                    <p style={{ color: getMessageColor(validation.passwordLength, password.length === 0) }}>
                        {messages.passwordLength}
                    </p>
                </div>

                <div className="profile-edit-check-container">
                    <label>비밀번호 확인 </label><span>*</span>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                        placeholder="비밀번호를 한 번 더 입력해주세요."
                    />
                    <img
                        src={showConfirmPassword ? "/image/eye.png" : "/image/eye-off.png"}
                        alt={showConfirmPassword ? "보기" : "숨기기"}
                        className="edit-toggle-password-icon"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                    <img
                        className="edit-clear-icon-us"
                        src="/image/x-circle.png"
                        alt="clearicon"
                        onClick={() => {
                            setConfirmPassword("");  // 비밀번호 확인 필드 초기화
                            confirmPasswordInputRef.current?.focus();
                        }}
                    />
                    <button
                        onClick={() => {
                            if (confirmPassword === password && validation.passwordLength && validation.passwordComplexity) {
                                localStorage.setItem("password", password);
                                alert("비밀번호가 변경되었습니다.");
                            } else {
                                alert("비밀번호가 일치하는지 확인하세요.");
                            }
                        }}
                    >
                        수정
                    </button>
                </div>

                <p className="edit-error-message" style={{ color: getMessageColor(validation.confirmPassword, confirmPassword.length === 0) }}>
                    {messages.confirmPassword}
                </p>
            </div>

            <div className="edit-done-btn">
                <button onClick={() => navigate("/mypage/edit-profile/done")} className="edit-done-button">완료</button>
            </div>
        </div>
    );
};

export default ProfileEditPage;
