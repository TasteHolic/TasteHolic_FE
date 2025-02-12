import "./MyBar.css";
import DrinkCard from "../../components/productCard/DrinkProps";
import React, { useState } from "react";
import DrinkDeleteModal from "./DrinkDeleteModal";
import AddDrinkModal from "./DrinkAddModal";

interface Drink {
  id: number;
  name: string;
  category: string;
  image: string;
}

const MyBar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [drinks, setDrinks] = useState<Drink[]>([
    {
      id: 1,
      name: "잭다니엘",
      category: "Whisky",
      image: "/image/DrinkProps.svg",
    },
    {
      id: 2,
      name: "호세 쿠엘보",
      category: "Tequila",
      image: "/image/DrinkProps.svg",
    },
    {
      id: 3,
      name: "봄베이 사파이어",
      category: "Gin",
      image: "/image/DrinkProps.svg",
    },
    { id: 4, name: "바카디", category: "Rum", image: "/image/DrinkProps.svg" },
    {
      id: 5,
      name: "말리부",
      category: "Liqueur",
      image: "/image/DrinkProps.svg",
    },
    {
      id: 6,
      name: "조니 워커 블랙",
      category: "Whisky",
      image: "/image/DrinkProps.svg",
    },
  ]);

  // 삭제 버튼 클릭 시 모달 열기
  const handleDeleteClick = (drink: Drink) => {
    console.log("삭제 버튼 클릭됨:", drink); // 선택된 음료 출력
    setSelectedDrink(drink);
    setIsDeleteModalOpen(true);
  };

  // 모달에서 삭제 확정
  const confirmDelete = () => {
    if (selectedDrink) {
      setDrinks(drinks.filter((drink) => drink.id !== selectedDrink.id));
    }
    closeDeleteModal();
  };

  // 삭제 모달 닫기
  const closeDeleteModal = () => {
    setSelectedDrink(null);
    setIsDeleteModalOpen(false);
  };

  // 추가 모달 닫기
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // 음료 추가 핸들러
  const handleAddDrink = async (newDrink: { type: string; name: string }) => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("저장된 토큰:", token);
      if (!token) {
        alert("먼저 로그인을 해주세요.");
        return;
      }

      const response = await fetch(
        "http://54.180.45.230:3000/api/v1/users/my-bar/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 로그인 토큰 사용
          },
          body: JSON.stringify({
            name: newDrink.name,
            category: newDrink.type,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "JSON 파싱 실패 - 서버 응답이 올바르지 않습니다.",
        }));

        console.error("서버 에러 상태 코드:", response.status);
        console.error("서버 에러 응답:", JSON.stringify(errorData, null, 2));
        throw new Error(
          errorData.error?.message ||
            `서버 응답 에러 (상태 코드: ${response.status})`
        );
      }

      const result = await response.json();
      console.log("서버 응답 성공:", result);

      const addedDrink = result.success;
      if (addedDrink) {
        setDrinks((prev) => [
          ...prev,
          {
            id: addedDrink.id,
            name: addedDrink.name,
            category: addedDrink.category,
            image: "/image/new.png",
          },
        ]);
      }
    } catch (error: any) {
      console.error("추가 중 에러 발생:", error.message || error);
    } finally {
      closeAddModal();
    }
  };

  // 음료를 4개씩 묶어서 그룹화
  const containers: Drink[][] = [];
  for (let i = 0; i < drinks.length; i += 4) {
    containers.push(drinks.slice(i, i + 4));
  }
  //임시 로그인
  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://54.180.45.230:3000/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "test@example.com", // 실제 이메일과 비밀번호 입력
            password: "password123",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("로그인 실패:", errorData);
        return;
      }

      const result = await response.json();
      console.log("로그인 성공:", result);
      const token = result.token;

      // 토큰을 localStorage에 저장
      localStorage.setItem("authToken", token);
      alert("로그인 성공! 이제 MyBar에 음료를 추가할 수 있습니다.");
      console.log(token);
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
    }
  };

  return (
    <div className="mybar-component">
      <button onClick={handleLogin} className="login-button">
        로그인
      </button>
      <button
        className="add-drink-button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsAddModalOpen(true)}
      >
        {isHovered ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="add-icon"
          >
            <path
              d="M14.9998 10.8346H10.8332V15.0013C10.8332 15.4596 10.4582 15.8346 9.99984 15.8346C9.5415 15.8346 9.1665 15.4596 9.1665 15.0013V10.8346H4.99984C4.5415 10.8346 4.1665 10.4596 4.1665 10.0013C4.1665 9.54297 4.5415 9.16797 4.99984 9.16797H9.1665V5.0013C9.1665 4.54297 9.5415 4.16797 9.99984 4.16797C10.4582 4.16797 10.8332 4.54297 10.8332 5.0013V9.16797H14.9998C15.4582 9.16797 15.8332 9.54297 15.8332 10.0013C15.8332 10.4596 15.4582 10.8346 14.9998 10.8346Z"
              fill="#161616"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="add-icon"
          >
            <path
              d="M14.9998 10.8346H10.8332V15.0013C10.8332 15.4596 10.4582 15.8346 9.99984 15.8346C9.5415 15.8346 9.1665 15.4596 9.1665 15.0013V10.8346H4.99984C4.5415 10.8346 4.1665 10.4596 4.1665 10.0013C4.1665 9.54297 4.5415 9.16797 4.99984 9.16797H9.1665V5.0013C9.1665 4.54297 9.5415 4.16797 9.99984 4.16797C10.4582 4.16797 10.8332 4.54297 10.8332 5.0013V9.16797H14.9998C15.4582 9.16797 15.8332 9.54297 15.8332 10.0013C15.8332 10.4596 15.4582 10.8346 14.9998 10.8346Z"
              fill="#C8CACB"
            />
          </svg>
        )}
        술 등록하기
      </button>

      {containers.map((group, index) => (
        <div className="container" key={index}>
          <div className="cards">
            {group.map((drink) => (
              <DrinkCard
                key={drink.id}
                image={drink.image}
                name={drink.name}
                category={drink.category}
                onDelete={() => handleDeleteClick(drink)}
              />
            ))}
          </div>
          <div className="separator"></div>
        </div>
      ))}

      <DrinkDeleteModal
        isOpen={isDeleteModalOpen}
        drinkName={selectedDrink?.name || null}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
      <AddDrinkModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onAdd={handleAddDrink}
      />
    </div>
  );
};

export default MyBar;
