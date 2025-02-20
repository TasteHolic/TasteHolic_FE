import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    console.log("카카오에서 받은 code:", code); //  디버깅용

    if (code) {
      fetch("http://54.180.45.230:3000/api/auth/kakao/callback", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }), // 백엔드에서 POST로 받을 수 있도록 변경
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("어떻게 나오는지보자",data);
          if (data.resultType === "SUCCESS") {
            localStorage.setItem("token", data.success.token);
            localStorage.setItem("kakao_token", data.success.kakaoAccessToken);
            console.log("로그인 성공! 홈으로 이동합니다.");
            navigate("/");
          } else {
            // console.error("로그인 실패:", data.error);
            // alert("로그인에 실패했습니다. 다시 시도해주세요.");
          }
        })
        .catch((err) => console.error("카카오 로그인 실패:", err));
    }
  }, [navigate]);

  return <div>로그인 중입니다...</div>;
};

export default KakaoCallback;
