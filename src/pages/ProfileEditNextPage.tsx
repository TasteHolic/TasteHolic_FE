import { useNavigate } from 'react-router-dom';
import './ProfileEditNextPage.css';
import Header from "../components/Header/MyHeader";
import Footer from "../components/Footer";

const ProfileNextPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoMyPage = () => {
        navigate('/mypage'); // 마이 페이지로 이동
    };

    const handleGoEditPage = () => {
        navigate('/mypage/edit-profile'); // 수정 페이지로 이동
    };

    return (
        <>
            <Header/>
                <div className="editnextpage">
                    <div className="editnextpage-top">
                        <div className="editnextpage-topimage">
                            <img src="/image/Done.png" alt="수정 완료 이미지"></img>
                        </div>
                        <div className="editnextpage-toptext">
                            회원 정보가 업데이트 되었습니다.
                        </div>
                    </div>

                    <div className="editnextpage-bottom">
                        <div className="editnextpage-btnall">
                            <button 
                                type="button" 
                                className="editnextpage-btn1"
                                onClick={handleGoEditPage}>
                                수정
                            </button>
                            <button
                                type="submit"
                                className="editnextpage-btn2"
                                onClick={handleGoMyPage}
                            >
                                마이페이지
                            </button>
                        </div>

                    </div>
                </div>
            <Footer/>
        </>
    );
};

export default ProfileNextPage;