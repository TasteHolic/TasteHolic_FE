import "./MyBar.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DrinkCard from "../../components/productCard/DrinkProps";
import DrinkDeleteModal from "./DrinkDeleteModal";
import AddDrinkModal from "./DrinkAddModal";

interface Drink {
  id: number;
  name: string;
  category: string;
  image: string;
}

// 카테고리별 이미지 경로 반환 함수
const getImageForCategory = (category: string): string => {
  switch (category.toLowerCase()) {
    case "whisky":
      return "/image/empty-whiskey.svg";
    case "tequila":
      return "/image/empty-teq.svg";
    case "gin":
      return "/image/empty-gin.svg";
    case "rum":
      return "/image/empty-rum.svg";
    case "liqueur":
      return "/image/empty-liqeur.svg";
    case "beer":
      return "/image/empty-beer.svg";
    default:
      return "/image/empty-etc.svg";
  }
};

const MyBar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [drinks, setDrinks] = useState<Drink[]>([]);

  /**
   * 마이바 조회 API 호출
   */
  const fetchMyBarDrinks = async () => {
    try {
      let token =
        localStorage.getItem("token") || localStorage.getItem("authToken");
      if (!token) {
        throw new Error("로그인 토큰이 없습니다. 먼저 로그인 해주세요.");
      }
      token = token.replace(/^"|"$/g, ""); // 따옴표 제거

      const response = await axios.get(
        "http://54.180.45.230:3000/api/v1/users/my-bar/view",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedDrinks = response.data.success.data.map((drink: any) => ({
        id: drink.id,
        name: drink.name,
        category: drink.category,
        image: getImageForCategory(drink.category),
      }));

      setDrinks(fetchedDrinks);
    } catch (error: any) {
      console.error(
        "마이바 조회 중 오류 발생:",
        error.response?.data || error.message
      );
    }
  };

  /**
   * 컴포넌트 마운트 시 마이바 조회
   */
  useEffect(() => {
    fetchMyBarDrinks();
  }, []);

  /**
   * 음료 추가
   */
  const handleAddDrink = async (newDrink: { type: string; name: string }) => {
    try {
      let token =
        localStorage.getItem("token") || localStorage.getItem("authToken");
      if (!token) {
        throw new Error("로그인 토큰이 없습니다. 먼저 로그인 해주세요.");
      }
      token = token.replace(/^"|"$/g, "");

      const result = await axios.post(
        "http://54.180.45.230:3000/api/v1/users/my-bar/post",
        {
          name: newDrink.name,
          category: newDrink.type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const addedDrink = result.data.success;
      if (addedDrink) {
        // 로컬 상태 업데이트 (주종에 따라 이미지 설정)
        setDrinks((prev) => [
          ...prev,
          {
            id: addedDrink.id,
            name: addedDrink.name,
            category: addedDrink.category,
            image: getImageForCategory(addedDrink.category),
          },
        ]);
        // 서버와 동기화 위해 재조회 (선택 사항)
        await fetchMyBarDrinks();
      }
    } catch (error: any) {
      alert(error.message || "음료 추가 중 문제가 발생했습니다.");
    } finally {
      closeAddModal();
    }
  };

  /**
   * 음료 삭제
   */
  const handleDeleteDrink = async (drinkId: number) => {
    try {
      let token =
        localStorage.getItem("token") || localStorage.getItem("authToken");
      if (!token) {
        throw new Error("로그인 토큰이 없습니다. 먼저 로그인 해주세요.");
      }
      token = token.replace(/^"|"$/g, "");

      await axios.delete(
        `http://54.180.45.230:3000/api/v1/users/my-bar/delete/${drinkId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 로컬 상태에서 제거
      setDrinks((prevDrinks) =>
        prevDrinks.filter((drink) => drink.id !== drinkId)
      );
    } catch (error: any) {
      console.error(
        "삭제 중 오류 발생:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.error?.message || "삭제 중 문제가 발생했습니다."
      );
    } finally {
      closeDeleteModal();
    }
  };

  /**
   * 삭제 모달 열기
   */
  const handleDeleteClick = (drink: Drink) => {
    setSelectedDrink(drink);
    setIsDeleteModalOpen(true);
  };

  /**
   * 삭제 모달에서 확인 버튼 클릭
   */
  const confirmDelete = () => {
    if (selectedDrink) {
      handleDeleteDrink(selectedDrink.id);
    }
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const closeAddModal = () => setIsAddModalOpen(false);

  /**
   * 4개 단위로 그룹화하여 렌더링
   */
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
