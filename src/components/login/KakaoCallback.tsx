import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch("http://54.180.45.230:3000/api/v1/users/kakao-callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("token", data.token);
          navigate("/");
        })
        .catch((err) => console.error("카카오 로그인 실패:", err));
    }
  }, [navigate]);

  return <div>로그인 중입니다...</div>;
};

export default KakaoCallback;
