import { useNavigate } from 'react-router-dom';
import './DeleteAccount.css';

const DeleteAccountNextPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/home'); //나중에 app.tsx에서 지정한 경로로 수정하기(메인페이지 route로 변경)
    };

    return (
        <div className="signup-form">
            <div className="inform">
                <div className="informbox">
                    <h1>회원 탈퇴</h1>
                </div>
            </div>

            <div className="form-group">
                <div className="imgbox2">
                    <img src="\image\deleteimg2.png" alt="삭제 안내 내용" />
                </div>
                <h1 id="after-delete">
                    탈퇴가 완료되었습니다. <br />
                    그동안 Tasteholic을 사용해주셔서 감사합니다. <br />
                </h1>
            </div>

            <div className="homebutton-container">
                <button
                    type="submit"
                    className="home-button"
                    onClick={handleGoHome}
                >
                    홈으로
                </button>
            </div>
        </div>
    )
};
export default DeleteAccountNextPage;