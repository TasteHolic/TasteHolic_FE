import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import Header from "../components/Header/MyHeader";
import Footer from "../components/Footer";

const AccountManagement = React.lazy(
  () => import("./SlideContent/AccountManagement")
);
const MyBar = React.lazy(() => import("./SlideContent/MyBar"));
const MyTastingNotes = React.lazy(
  () => import("./SlideContent/MyTastingNotes")
);
const MyRecipes = React.lazy(() => import("./SlideContent/MyRecipes"));


const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

 // const [isLoggedOut, setIsLoggedOut] = useState<boolean>(
  //   () => localStorage.getItem("isLoggedOut") === "false"); // 로그인 된 상태를 가정하려면 true를 false로 변경하여 테스트하면 됩니다! false로 변경 시 로그아웃 되는 상태를 저장합니다.
  // const [isLoggedOut, setIsLoggedOut] = useState<boolean>(true);
  const [nickname, setNickname] = useState<string | null>(null);
  const [introText, setIntroText] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>( "/image/basicimage.png");
  const [currentMenu, setCurrentMenu] = useState<number>(0);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const menuItems = ["계정 관리", "내 바", "내 테이스팅 노트", "내 레시피"];
  const carouselViewRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // useEffect(() => {
    
  //   if (token) {
  //     setNickname(localStorage.getItem("nickname") || "기본닉넴");
  //     setIntroText(localStorage.getItem("introText") || "본인을 설명해봐요");
  //     setProfileImage(localStorage.getItem("profileImage") || "/image/basicimage.png");
  //   } else {
  //     setNickname(null);
  //     setIntroText(null);
  //     setProfileImage("/image/basicimage.png");
  //   }
  // }, [token]);
  console.log("요청 전 토큰:", token);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) return; // 토큰 없으면 API 호출 X
  
      try {
        const response = await fetch("http://54.180.45.230:3000/api/v1/users/info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`서버 오류: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data.resultType === "SUCCESS") {
          const userInfo = data.success.data;
          setNickname(userInfo.nickname);
          setIntroText(userInfo.message || "한줄 메세지");
          setProfileImage(userInfo.imageUrl || "/image/basicimage.png"); // 기본 이미지 처리
        } else {
          console.error("프로필 조회 실패:", data.error);
        }
      } catch (error) {
        console.error("네트워크 오류:", error);
      }
    };
  
    fetchUserProfile();
  }, [token]);
  
  
  useLayoutEffect(() => {
    if (carouselViewRef.current && slideRefs.current[currentMenu]) {
      const activeSlideHeight =
        slideRefs.current[currentMenu]?.offsetHeight || 0;
      carouselViewRef.current.style.height = `${activeSlideHeight}px`;
    }
  }, [currentMenu, token]);
  const handleLogout = async () => {
    try {
      const response = await fetch("http://54.180.45.230:3000/api/v1/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 토큰 포함
        },
      });
  
      if (response.ok) {
        console.log(" 로그아웃 성공");
        localStorage.removeItem("token");
        setToken(null);
        setLogoutModalOpen(false);// 로그아웃 모달 닫기
        navigate("/");// 메인으로 이동
      } else {
        console.error("로그아웃 실패:", response.status);
      }
    } catch (error) {
      console.error("네트워크 오류:", error);
    }
  };
  
  const handleLoginPage = () => {
    navigate("/login");
  };

  const renderSlideContent = (index: number) => {
    if (!token) {
      return (
        <div className="logged-out-message">
          <img src="/image/logoutIcon.png" alt="로그아웃이미지" />
          <div className="message-container">
            로그인 후 이용할 수 있는 기능입니다.
          </div>
          <button className="loginpage-btn" onClick={handleLoginPage}>
            로그인하기
          </button>
        </div>
      );
    }

    switch (index) {
      case 0:
        return <AccountManagement setLogoutModalOpen={setLogoutModalOpen} />;
      case 1:
        return <MyBar />;
      case 2:
        return <MyTastingNotes />;
      case 3:
        return <MyRecipes />;
      default:
        return <AccountManagement setLogoutModalOpen={setLogoutModalOpen} />;
    }
  };

  return (
    <>
      <Header />
      <div className="profile-page">
        <div className="profile-header">
          <div className="profile-container">
            <div className="profile-picture">
              <img
                src={profileImage || "/image/basicimage.png"}
                alt="프로필 사진"
              />
            </div>
            <div className="profile-info">
              <h2>{nickname || "Guest"}</h2>
              <div>
                <span className="inner-text-info">
                  {introText || "로그인 후 이용해주세요."}
                </span>
                <button
                  className="profile-info-edit"
                  onClick={() => navigate("/mypage/edit-profile")}
                >
                  프로필 수정
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-navigation">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <button
                onClick={() => setCurrentMenu(index)}
                className={currentMenu === index ? "active-menu" : ""}
              >
                {item}
              </button>
              {index !== menuItems.length - 1 && (
                <span className="menu-separator">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="menu-carousel">
          <div className="carousel-view" ref={carouselViewRef}>
            <div
              className="carousel-container"
              style={{
                transform: `translateX(-${currentMenu * 100}%)`,
                display: "flex",
                transition: "transform 0.5s ease-in-out",
              }}
            >
              {menuItems.map((_, index) => (
                <div
                  key={index}
                  className="carousel-slide"
                  ref={(el) => (slideRefs.current[index] = el)}
                >
                  {renderSlideContent(index)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {isLogoutModalOpen && (
          <div className="profile-page-modal-overlay">
            <div className="profile-page-modal-content">
              <p className="profile-page-modal-text">
                정말 로그아웃 하시겠습니까?
              </p>
              <div className="profile-page-modal-actions">
                <button
                  onClick={() => setLogoutModalOpen(false)}
                  className="profile-page-cancel-btn"
                >
                  닫기
                </button>
                <button
                  onClick={handleLogout}
                  className="profile-page-confirm-btn"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;