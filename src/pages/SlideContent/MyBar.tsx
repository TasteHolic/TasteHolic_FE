import "./MyBar.css";
import React, { useState } from "react";
import DrinkCard from "../../components/productCard/DrinkProps";
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

  const fetchWithAuth = async (url: string, options: RequestInit) => {
    try {
      let token =
        localStorage.getItem("token") || localStorage.getItem("authToken");
      if (!token)
        throw new Error("로그인 토큰이 없습니다. 먼저 로그인 해주세요.");
      token = token.replace(/^"|"$/g, "");

      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "서버 응답 오류" }));
        throw new Error(
          errorData.error?.message ||
            `서버 에러 (상태 코드: ${response.status})`
        );
      }

      return await response.json();
    } catch (error: any) {
      console.error("API 요청 중 오류 발생:", error.message || error);
      throw error;
    }
  };

  const handleAddDrink = async (newDrink: { type: string; name: string }) => {
    try {
      const result = await fetchWithAuth(
        "http://54.180.45.230:3000/api/v1/users/my-bar/post",
        {
          method: "POST",
          body: JSON.stringify({
            name: newDrink.name,
            category: newDrink.type,
          }),
        }
      );

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
      alert(error.message || "음료 추가 중 문제가 발생했습니다.");
    } finally {
      closeAddModal();
    }
  };

  const handleDeleteClick = (drink: Drink) => {
    setSelectedDrink(drink);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDrink) {
      setDrinks(drinks.filter((drink) => drink.id !== selectedDrink.id));
    }
    closeDeleteModal();
  };

  const closeDeleteModal = () => {
    setSelectedDrink(null);
    setIsDeleteModalOpen(false);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const renderDrinkGroups = () => {
    const containers: Drink[][] = [];
    for (let i = 0; i < drinks.length; i += 4) {
      containers.push(drinks.slice(i, i + 4));
    }
    return containers.map((group, index) => (
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
    ));
  };

  return (
    <div className="mybar-component">
      <button
        className="add-drink-button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsAddModalOpen(true)}
      >
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
            fill={isHovered ? "#161616" : "#C8CACB"}
          />
        </svg>
        술 등록하기
      </button>

      {renderDrinkGroups()}

      <DrinkDeleteModal
        isOpen={isDeleteModalOpen}
        drinkName={selectedDrink?.name || ""}
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
