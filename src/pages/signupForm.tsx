import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./signupForm.css";
import TermsAgreement from "./TermsAgreement";
import Header from "../components/Header/MainHeader";
import Footer from "../components/Footer";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });
  const [validation, setValidation] = useState({
    email: false,
    idLength: false,
    idDuplicate: false,
    password: false,
    passwordLength: false,
    passwordComplexity: false,
    confirmPassword: false,
    nickname: false,
  });
  const [messages, setMessages] = useState({
    email: "",
    idLength: "",
    idDuplicate: "",
    passwordLength: "",
    passwordComplexity: "",
    confirmPassword: "",
    nickname: "",
  });
  const [isIdChecked, setIsIdChecked] = useState(false); // 아이디 중복 여부 검사 완료 상태
  const [isIdDuplicate, setIsIdDuplicate] = useState(false); // 중복 여부
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAllRequiredChecked, setIsAllRequiredChecked] = useState(false); // 약관 동의 상태
  const [hasInteracted, setHasInteracted] = useState(false);

  const idInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);


  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
    passwordInputRef.current?.focus();
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
    confirmPasswordInputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);

    if (name === "email") {
      setIsIdChecked(false); // 아이디 수정 시 중복 여부 초기화
      setIsIdDuplicate(false); // 아이디 수정 시 중복 여부 초기화
    }
  };

  const handleFocus = (name: keyof typeof form) => {
    validateField(name, form[name]);
  };

  const validateField = (name: string, value: string) => {
    let message = "";
    let isValid = false;

    switch (name) {
      case "email": {
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const isDuplicateValid = !isIdDuplicate; // 중복 검사 여부

        setMessages((prev) => ({
          ...prev,
          idLength: isEmailValid
            ? "* example@abc.com"
            : "* example@abc.com",
          idDuplicate: isDuplicateValid
            ? "* 이메일 중복 확인"
            : "* 이메일 중복 확인",
        }));

        setValidation((prev) => ({
          ...prev,
          id: isDuplicateValid && isEmailValid,
          idLength: isEmailValid,
          idDuplicate: isDuplicateValid &&isEmailValid,
        }));
        break;
      }

      case "password": {
        const isLengthValid = value.length >= 10; // 길이 조건
        const hasLetters = /[a-zA-Z]/.test(value);
        const hasNumbers = /\d/.test(value);
        const hasSpecials = /[!@#$%^&*()_+]/.test(value);
        const isComplexValid = (hasLetters && hasNumbers) || (hasLetters && hasSpecials) || (hasNumbers && hasSpecials);

        setMessages((prev) => ({
          ...prev,
          passwordLength: isLengthValid
            ? "* 10자 이상 입력"
            : "* 10자 이상 입력",
          passwordComplexity: isComplexValid
            ? "* 영문·숫자·특수문자 중 2개 이상 조합(공백 불가)"
            : "* 영문·숫자·특수문자 중 2개 이상 조합(공백 불가)",
        }));
      
        setValidation((prev) => {
          const updatedValidation = {
            ...prev,
            passwordLength: isLengthValid,
            passwordComplexity: isComplexValid,
          };
          updatedValidation.password =
            updatedValidation.passwordLength && updatedValidation.passwordComplexity;
          return updatedValidation;
        });
        
        break;
      }

      case "confirmPassword":
        isValid = value === form.password;
        message = "* 동일한 비밀번호를 입력해주세요.";
        break;

      case "nickname":
        isValid = value.length >= 2 && /^[a-zA-Z0-9가-힣]+$/.test(value);
        message = "* 2자 이상의 한글·영문·숫자";
        break;
    }

    setMessages((prev) => ({ ...prev, [name]: message }));
    setValidation((prev) => ({ ...prev, [name]: isValid }));
  };

  // const handleIdCheck = () => {
  //   const storedUsers = JSON.parse(
  //     localStorage.getItem("registeredUsers") || "[]"
  //   );
  //   const isDuplicate = storedUsers.some(
  //     (user: { email: string }) => user.email === form.email
  //   );

  //   if (isDuplicate) {
  //     setIsIdChecked(true);
  //     setIsIdDuplicate(true);
  //     setMessages((prev) => ({
  //       ...prev,
  //     }));
  //     setValidation((prev) => ({
  //       ...prev,
  //       idDuplicate: false, // 중복된 경우 유효성 실패
  //     }));
  //     alert("이미 사용 중인 이메일입니다.");
  //   } else {
  //     setIsIdChecked(true);
  //     setIsIdDuplicate(false);
  //     setMessages((prev) => ({
  //       ...prev,
  //     }));
  //     setValidation((prev) => ({
  //       ...prev,
  //       idDuplicate: true, // 중복되지 않은 경우 유효성 성공
  //       email: validation.idLength &&!isIdDuplicate,
  //     }));
  //     alert("사용할 수 있는 이메일입니다.");
  //   }
  // };
  const handleIdCheck = async () => {
    if (!form.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
  
    try {
      const response = await fetch("http://54.180.45.230:3000/api/v1/users/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        setIsIdChecked(true);
        setIsIdDuplicate(false);
        setMessages((prev) => ({ ...prev, idDuplicate: "사용 가능한 이메일입니다." }));
        setValidation((prev) => ({ ...prev, idDuplicate: true, email: true }));
        alert(data.message);
      } else if (response.status === 409) {
        setIsIdChecked(true);
        setIsIdDuplicate(true);
        setMessages((prev) => ({ ...prev, idDuplicate: "이미 사용 중인 이메일입니다." }));
        setValidation((prev) => ({ ...prev, idDuplicate: false }));
        alert("이미 사용 중인 이메일입니다.");
      } else if (response.status === 400) {
        alert(data.error || "이메일을 입력하세요.");
      }
    } catch (error) {
      console.error("이메일 중복 확인 실패:", error);
      alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validation.password=validation.passwordComplexity&&validation.passwordLength;
    console.log("현재 validation 상태", validation);
    if (!isIdChecked) {
      alert("이메일 중복 확인을 완료해주세요.");
      return;
    }
  
    if (isIdDuplicate) {
      alert("이미 사용 중인 이메일입니다. 다른 이메일을 입력해주세요.");
      return;
    }
  
    if (!isAllRequiredChecked) {
      alert("필수 약관을 모두 동의해주세요.");
      return;
    }
  
    if (Object.values(validation).every((v) => v)) {
      try {
        const response = await fetch("http://54.180.45.230:3000/api/v1/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            nickname: form.nickname,
          }),
        });
  
        const data = await response.json();
  
        if (response.status === 201) {
          alert("회원가입이 완료되엇습니다."); // "회원가입이 완료되었습니다."
          console.log("회원가입성공");
           navigate("/signup/done");
        } else if (response.status === 400) {
          alert(data.error || "잘못된 요청입니다."); // 예: "이메일 형식이 잘못되었습니다."
        } else if (response.status === 500){
          alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("회원가입 요청 실패:", error);
        alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("입력한 정보를 확인해주세요.");
    }
  };

  const isIdValid = validation.idLength;

  return (
    <>
      <Header />
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-inform">
          <div className="signup-informbox">
            <div className="signup-imgbox">
              <img src="src\components\icons\signupIcons\logo.png" alt="logo" />
            </div>
            <h1>회원가입</h1>
            <h4>
              <span className="starcolor">*</span> 필수 입력 사항
            </h4>
          </div>
        </div>

        <div className="signup-form-group">
          <div className="signup-input-group">
            <label>
              이메일 <span className="starcolor">*</span>
            </label>
            <div className="signup-input-container">
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                ref={idInputRef}
                className={validation.idLength && !isIdDuplicate ? "valid" : ""}
                placeholder="이메일을 입력해주세요."
              />
              {isIdChecked && !isIdDuplicate && (
                <img
                  className="check-icon"
                  src="src\components\icons\signupIcons\v-circle.png"
                  alt="checkicon"
                />
              )}
              <img
                className="signup-clear-icon"
                src="src\components\icons\signupIcons\x-circle.png"
                alt="clearicon"
                onClick={() => {
                  if (!isIdChecked) { // 중복 확인이 완료된 경우에는 동작하지 않도록 함
                    setForm({ ...form, email: "" });
                    idInputRef.current?.focus();
                  }
                }}
              ></img>
            </div>
            <button
              type="button"
              onClick={handleIdCheck}
              disabled={!isIdValid||isIdChecked} // 유효하지 않으면 버튼 비활성화
              className="idbutton"
            >
              중복확인
            </button>
          </div>
          <small
            className={
              form.email === ""
                ? "signup-default-text"
                : validation.idLength
                ? "signup-valid-text"
                : "signup-error-text"
            }
          >
            {messages.idLength}
          </small>
          <small
            className={
              !form.email || !isIdChecked
                ? "signup-default-text"
                : validation.idDuplicate
                ? "signup-valid-text"
                : "signup-error-text"
            }
          >
            {messages.idDuplicate}
          </small>
        </div>

        <div className="signup-form-group">
          <div className="signup-input-group">
            <label>
              비밀번호 <span className="starcolor">*</span>
            </label>
            <div className="signup-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                onFocus={() => handleFocus("password")}
                ref={passwordInputRef}
                className={
                  validation.passwordLength && validation.passwordComplexity
                    ? "valid"
                    : ""
                }
                placeholder="비밀번호를 입력해주세요."
              />
              <img
                src={
                  showPassword
                    ? "src/components/icons/signupIcons/eye.png"
                    : "src/components/icons/signupIcons/eye-off.png"
                }
                alt={showPassword ? "보기" : "숨기기"}
                className="signup-toggle-password-icon"
                onClick={toggleShowPassword}
              />
              <img
                className="signup-clear-icon-us"
                src="src\components\icons\signupIcons\x-circle.png"
                alt="clearicon"
                onClick={() => {
                  setForm({ ...form, password: "" });
                  passwordInputRef.current?.focus(); // input에 다시 focus 설정
                }}
              ></img>
            </div>
          </div>
          <small
            className={
              form.password === ""
                ? "signup-default-text"
                : validation.passwordComplexity
                ? "signup-valid-text"
                : "signup-error-text"
            }
          >
            {messages.passwordComplexity}
          </small>

          <small
            className={
              form.password === ""
                ? "signup-default-text"
                : validation.passwordLength
                ? "signup-valid-text"
                : "signup-error-text"
            }
          >
            {messages.passwordLength}
          </small>
        </div>

        <div className="signup-form-group">
          <div className="signup-input-group">
            <label>
              비밀번호 확인 <span className="starcolor">*</span>
            </label>
            <div className="signup-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                onFocus={() => handleFocus("confirmPassword")}
                ref={confirmPasswordInputRef}
                className={validation.confirmPassword ? "valid" : ""}
                placeholder="비밀번호를 한 번 더 입력해주세요."
              />
              <img
                src={
                  showConfirmPassword
                    ? "src/components/icons/signupIcons/eye.png"
                    : "src/components/icons/signupIcons/eye-off.png"
                }
                alt={showConfirmPassword ? "보기" : "숨기기"}
                className="signup-toggle-password-icon"
                onClick={toggleShowConfirmPassword}
              />
              <img
                className="signup-clear-icon-us"
                src="src\components\icons\signupIcons\x-circle.png"
                alt="clearicon"
                onClick={() => {
                  setForm({ ...form, confirmPassword: "" });
                  confirmPasswordInputRef.current?.focus(); // input에 다시 focus 설정
                }}
              ></img>
            </div>
          </div>

          <small
            className={
              form.confirmPassword === ""
                ? "signup-default-text"
                : validation.confirmPassword
                ? "signup-valid-text"
                : "signup-error-text"
            }
          >
            {messages.confirmPassword}
          </small>
        </div>

        <div className="signup-form-group">
          <div className="signup-input-group">
            <label>닉네임 </label>
            <div className="signup-input-container">
              <input
                type="text"
                name="nickname"
                value={form.nickname}
                onChange={handleChange}
                onFocus={() => handleFocus("nickname")}
                ref={nicknameInputRef}
                className={validation.nickname ? "valid" : ""}
                placeholder="닉네임을 입력해주세요."
              />
              <img
                className="signup-clear-icon-us"
                src="src\components\icons\signupIcons\x-circle.png"
                alt="clearicon"
                onClick={() => {
                  setForm({ ...form, nickname: "" });
                  nicknameInputRef.current?.focus();
                }}
              ></img>
            </div>
          </div>

          <small
            className={
              form.nickname === ""
                ? "signup-default-text"
                : validation.nickname
                ? "signup-valid-text"
                : "signup-error-text"
            }
          >
            {messages.nickname}
          </small>
        </div>

        <hr className="contour"></hr>
        <TermsAgreement
          onChange={(isAllRequiredChecked, hasInteracted) => {
            setIsAllRequiredChecked(isAllRequiredChecked);
            setHasInteracted(hasInteracted);
            console.log("필수 약관 동의 상태:", isAllRequiredChecked);
            console.log("상호작용 상태:", hasInteracted);
          }}
        />
        {!isAllRequiredChecked && hasInteracted && (
          <div className="signup-error-message">
            필수 항목 체크를 다시 확인해주세요.
          </div>
        )}
        <div className="signup-button-container">
          <button className="signup-back-button">뒤로가기</button>
          <button
            type="submit"
            className="signup-submit-button"
            onClick={handleSubmit}
          >
            가입하기
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default SignupForm;
