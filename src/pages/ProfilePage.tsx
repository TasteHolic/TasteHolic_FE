import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const AccountManagement = React.lazy(() => import("./SlideContent/AccountManagement"));
const MyBar = React.lazy(() => import("./SlideContent/MyBar"));
const MyTastingNotes = React.lazy(() => import("./SlideContent/MyTastingNotes"));
const MyRecipes = React.lazy(() => import("./SlideContent/MyRecipes"));

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string | null>(null);
    const [introText, setIntroText] = useState<string>("");
    const [profilePic, setProfilePic] = useState<string>("src/components/icons/profileIcons/basicimage.png");
    const [currentMenu, setCurrentMenu] = useState<number>(0);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const menuItems = ["계정 관리", "내 바", "내 테이스팅 노트", "내 레시피"];
    const carouselViewRef = useRef<HTMLDivElement | null>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedIntro = localStorage.getItem("introText");
        const storedProfilePic = localStorage.getItem("profilePic");

        if (storedUserId) setUserId(storedUserId);
        if (storedIntro) setIntroText(storedIntro);
        if (storedProfilePic) setProfilePic(storedProfilePic);
    }, []);

    useLayoutEffect(() => {
        if (carouselViewRef.current && slideRefs.current[currentMenu]) {
            const activeSlideHeight = slideRefs.current[currentMenu]?.offsetHeight || 0;
            carouselViewRef.current.style.height = `${activeSlideHeight}px`;
        }
    }, [currentMenu, isLoggedOut]);

    const handleLogout = () => {
        localStorage.clear();
        setUserId(null);
        setIsLoggedOut(true);
        setLogoutModalOpen(false);
    };

    const handleLoginPage = () => {
        navigate('/login');
    }

    const renderSlideContent = (index: number) => {
        if (isLoggedOut) {
            return (
                <div className="logged-out-message">
                    <img src="/image/logoutIcon.png" alt="로그아웃이미지"></img>
                        <div className="message-container">
                            로그인 후 이용할 수 있는 기능입니다.
                        </div>
                    <button className="loginpage-btn" onClick={handleLoginPage}>
                        로그인하기
                    </button>
                </div>

            )
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
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-container">
                    <div className="profile-picture">
                        <img src={profilePic} alt="프로필 사진" />
                    </div>
                    <div className="profile-info">
                        <h2>{userId || "Guest"}</h2>
                        <p>
                            {introText || "술이 취미인 사람입니다."}
                            <button className="profile-info-edit" onClick={() => navigate("/mypage/edit-profile")}>
                                프로필 수정
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <div className="menu-navigation">
                {menuItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <button onClick={() => setCurrentMenu(index)} className={currentMenu === index ? "active-menu" : ""}>
                            {item}
                        </button>
                        {index !== menuItems.length - 1 && <span className="menu-separator">|</span>}
                    </React.Fragment>
                ))}
            </div>

            <div className="menu-carousel">
                <div className="carousel-view" ref={carouselViewRef}>
                    <div className="carousel-container" style={{ transform: `translateX(-${currentMenu * 100}%)`, display: "flex", transition: "transform 0.5s ease-in-out" }}>
                        {menuItems.map((_, index) => (
                            <div key={index} className="carousel-slide" ref={(el) => (slideRefs.current[index] = el)}>
                                {renderSlideContent(index)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isLogoutModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p className="modal-text">정말 로그아웃 하시겠습니까?</p>
                        <div className="modal-actions">
                            <button onClick={() => setLogoutModalOpen(false)} className="cancel-btn">닫기</button>
                            <button onClick={handleLogout} className="confirm-btn">로그아웃</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
