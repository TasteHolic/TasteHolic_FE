import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileEditPage.css';

const ProfileEditPage: React.FC = () => {
    const navigate = useNavigate();

    const [nickname, setNickname] = useState<string>(localStorage.getItem('nickname') || '');
    const [introText, setIntroText] = useState<string>(localStorage.getItem('introText') || '');
    const [profilePic, setProfilePic] = useState<string>(
        localStorage.getItem('profilePic') || 'src/components/icons/profileIcons/basicimage.png'
    );

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) {
            setProfilePic(reader.result.toString());
            }
        };
        reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSave = () => {
        localStorage.setItem('nickname', nickname);
        localStorage.setItem('introText', introText);
        localStorage.setItem('profilePic', profilePic);
        navigate('/');
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="profile-edit-page">
        <h2>프로필 수정</h2>
        <label>
            닉네임:
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </label>
        <label>
            한 줄 소개:
            <input type="text" value={introText} onChange={(e) => setIntroText(e.target.value)} />
        </label>
        <label>
            프로필 사진:
            <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
        <div className="profile-preview">
            <img src={profilePic} alt="프로필 미리보기" />
        </div>
        <button onClick={handleSave}>저장</button>
        <button onClick={handleCancel}>취소</button>
        </div>
    );
};

export default ProfileEditPage;
