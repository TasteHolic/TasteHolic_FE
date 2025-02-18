import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileEditPage.css";
import Header from "../components/Header/MyHeader";
import Footer from "../components/Footer";

const ProfileEditPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("example@example.com");

    const [nickname, setNickname] = useState(localStorage.getItem("nickname") || "");
    const [introText, setIntroText] = useState(localStorage.getItem("introText") || "");
    // const [profileImage, setProfileImage] = useState<File | string | null>(
    //     localStorage.getItem("profileImage") || null
    // );
    const [profileImage, setProfileImage] = useState<File | null>(null); // 🔵 API 전송용
    const [previewImage, setPreviewImage] = useState<string | null>(null); // 🟢 미리보기용 (Base64 URL)

    
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

    const isPasswordChangeRequired = password.length > 0; // 비밀번호 변경 여부 확인
    const isFormValid = (!isPasswordChangeRequired || (validation.passwordLength && validation.passwordComplexity && validation.confirmPassword));
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    useEffect(() => {
        const fetchUserInfo = async () => {
          const token = localStorage.getItem("token"); // 저장된 토큰 가져오기
          if (!token) {
            alert("로그인이 필요합니다.");
            return;
          }
      
          try {
            const response = await fetch("http://54.180.45.230:3000/api/v1/users/info", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // 토큰 포함
              },
            });
      
            if (!response.ok) {
              throw new Error(`서버 오류: ${response.status}`);
            }
      
            const data = await response.json();
      
            if (data.resultType === "SUCCESS") {
              const userInfo = data.success.data;
              setEmail(userInfo.email); // API에서 받아온 이메일 설정
              setPreviewImage(userInfo.profileImageUrl || "/image/basicimage.png");
            } else {
              console.error("사용자 정보 조회 실패:", data.error);
            }
          } catch (error) {
            console.error("네트워크 오류:", error);
          }
        };
      
        fetchUserInfo();
      }, []);
   

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

    const handleProfileImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string); 
            };
            reader.readAsDataURL(file); // Base64 변환
            await handleProfileUpdate("image", file);
        }
    };

    const getMessageColor = (isValid: boolean, isEmpty: boolean) => {
        return isEmpty ? "#A8AAAB" : isValid ? "#4ECE95" : "#FDA4C7";
    };

    const handleProfileUpdate = async (field: string, file?: File) => {
        if (!token) {
          alert("로그인이 필요합니다.");
          return;
        }
      
        const formData = new FormData();
      
        if (field === "image" && file) {
          formData.append("image", file);
        }
      
        if (field === "nickname") {
          formData.append("nickname", nickname);
        }
      
        if (field === "message") {
          formData.append("message", introText);
        }
      
        if (field === "password") {
          formData.append("password", password);
        }
      
        try {
          const response = await fetch("http://54.180.45.230:3000/api/v1/users/profile/change", {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });
      
          const data = await response.json();
      
          if (response.ok) {
            alert(`${field}이(가) 성공적으로 변경되었습니다.`); 
             if (field === "image") {
                setProfileImage(null); //  성공 후 파일 초기화
            }
         
          }
        } catch (error) {
          console.error("변경 실패:", error);
          alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
        }
      };
            
    return (
        <>
            <Header/>
                <div className="profile-edit-page">
                    <div className="profile-edit-section">
                        <div className="profile-edit-image-container">
                            <img src={previewImage || "/image/basicimage.png"} alt="프로필 사진" />
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
                                        handleProfileUpdate("nickname");
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
                                    handleProfileUpdate("message")
                                }}>수정</button>
                            </div>
                        </div>
                    </div>

                    <div className="profile-security-text">
                        보안 관리 <span><img src="/image/deleteimg.png" alt="보안관리 아이콘" /></span>
                    </div>

                    <div className="security-section">
                        <div className="email-fixed">이메일 <span>{email}</span></div>

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
                                        // handleProfileUpdate("password")
                                        
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
                                        handleProfileUpdate("password")
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
                        <button
                            onClick={() => {
                                // if (isFormValid) {
                                //     if (isPasswordChangeRequired) {
                                //         localStorage.setItem("password", password);
                                //     }
                                //     localStorage.setItem("nickname", nickname);
                                //     localStorage.setItem("introText", introText);
                                //     alert("변경 사항이 저장되었습니다.");
                                //     navigate("/mypage/edit-profile/done");
                                // } else {
                                //     alert("비밀번호 변경 조건을 확인해주세요.");
                                // }
                                alert("변경 사항이 저장되었습니다.");
                                navigate("/mypage/edit-profile/done");
                            }}
                            className={`edit-done-button ${isFormValid ? "" : "disabled"}`} // 버튼 비활성화 스타일 추가 가능
                            disabled={!isFormValid}
                        >
                            완료
                        </button>
                    </div>
                </div>
            <Footer/>
        </>
    );
};

export default ProfileEditPage;
