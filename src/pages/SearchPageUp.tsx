import React, { useState, useEffect } from "react";
import "./SearchPageUp.css";
import { useNavigate } from "react-router-dom";
import "pretendard/dist/web/static/pretendard.css";
import SearchBar from "../components/search/searchBar";
import SearchCategory from "../components/search/searchCategory";
import CategoryType from "../components/search/searchPageOnly/CategoryType";
import AlcoholSlideBar from "../components/search/searchPageOnly/AlcoholSlideBar";
import TypeLabel from "../components/search/searchPageOnly/TypeLabel";
import TypeLabelSvg from "../components/search/searchPageOnly/TypeLabelSvg";

const SearchPageUp: React.FC = () => {
  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [showSlideBar, setShowSlideBar] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAromas, setSelectedAromas] = useState<string[]>([]);
  const [selectedTastes, setSelectedTastes] = useState<string[]>([]);
  const [selectedRange, setSelectedRange] = useState<{
    min: number;
    max: number;
  }>({
    min: 0,
    max: 100,
  });

  const [varietyLabels, setVarietyLabels] = useState<{ name: string }[]>([]);
  const [rangeLabels, setRangeLabels] = useState<{ name: string }[]>([]);
  const [flavorLabels, setFlavorLabels] = useState<{ name: string }[]>([]);
  const [aromaLabels, setAromaLabels] = useState<{ name: string }[]>([]);
  const [moodLabels, setMoodLabels] = useState<{ name: string }[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const [showAllVariety, setShowAllVariety] = useState(false);
  const [showAllAroma, setShowAllAroma] = useState(false);
  const [showAllFlavor, setShowAllFlavor] = useState(false);
  const [showAllMood, setShowAllMood] = useState(false);

  const [showEtcVariety, setShowEtcVariety] = useState(false);
  const [showEtcMood, setShowEtcMood] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  const categoryMapping: Record<string, string> = {
    칵테일: "Cocktail",
    위스키: "Whiskey",
    "진,럼,데낄라": "Gin/Rum/Tequila",
    기타: "Others",
    "전체 선택": "All",
  };
  const handleSearchClick = async (query: string) => {
    setSearchQuery(query); // 검색어 업데이트

    if (!query.trim() && selectedCategories.length === 0) {
      alert("검색어 또는 카테고리를 선택해야 합니다!");
      return;
    }
    const translatedCategory =
      selectedCategories.length > 0
        ? categoryMapping[selectedCategories[0]] || selectedCategories[0]
        : "";
    const requestData = {
      category: translatedCategory,
      query: query.trim(),
      minAbv: selectedRange.min,
      maxAbv: selectedRange.max,
      aroma: selectedAromas,
      taste: selectedTastes,
    };
    console.log("📡 서버로 보낼 데이터:", requestData);
    // API 요청
    try {
      const response = await fetch(
        "http://54.180.45.230:3000/api/v1/users/search/category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();
      console.log("✅ 검색 결과:", data);

      if (data.success) {
        navigate("/search-results", {
          state: {
            results: data.data,
            searched: query,
            searchedTypes: [
              ...selectedCategories.map((cat, index) => ({
                id: index,
                label: cat,
                type: "variety",
              })),
              ...selectedAromas.map((aroma, index) => ({
                id: selectedCategories.length + index,
                label: aroma,
                type: "aroma",
              })),
              ...selectedTastes.map((taste, index) => ({
                id: selectedCategories.length + selectedAromas.length + index,
                label: taste,
                type: "flavor",
              })),
              {
                id:
                  selectedCategories.length +
                  selectedAromas.length +
                  selectedTastes.length,
                label: `${selectedRange.min}% ~ ${selectedRange.max}%`,
                type: "abv",
              },
            ],
          },
        });
      } else {
        console.error("❌ 검색 실패:", data.message);
      }
    } catch (error) {
      console.error("🚨 API 요청 중 오류 발생:", error);
    }
  };

  const handleAddClick = (min: number, max: number) => {
    setSelectedRange({ min, max });
    const newLabel = { name: `${min} % ~ ${max} %` };

    if (!rangeLabels.find((label) => label.name === newLabel.name)) {
      setRangeLabels((prevLabels) => [...prevLabels, newLabel]);
    }
  };

  const handleCategoryTypeClick = (type: string) => {
    // (1) 기존 label 매핑
    const labelMapping: Record<string, string> = {
      etcVariety: "기타 주종",
      etcMood: "기타 분위기",
    };
    const displayName = labelMapping[type as keyof typeof labelMapping] || type;

    // (2) activeCategories 업데이트
    setActiveCategories((prev) =>
      prev.includes(type) ? prev.filter((cat) => cat !== type) : [...prev, type]
    );

    // (3) 각 필터 그룹에 해당하는 타입 배열 정의
    const varietyTypes = [
      "칵테일",
      "위스키",
      "진,럼,데낄라",
      "etcVariety",
      "allVariety",
    ];
    const aromaTypes = [
      "라임",
      "시트러스 향",
      "아몬드",
      "바닐라",
      "민트",
      "베리",
      "오크",
      "커피",
      "오렌지",
      "allAroma",
    ];
    const tasteTypes = [
      "달콤함",
      "시트러스",
      "상쾌함",
      "드라이함",
      "강렬함",
      "부드러움",
      "프루티",
      "허브",
      "짭짤함",
      "allFlavor",
    ];

    // (4) 해당 그룹에 따라 선택 상태 업데이트
    if (varietyTypes.includes(type)) {
      setSelectedCategories((prev) =>
        prev.includes(type)
          ? prev.filter((item) => item !== type)
          : [...prev, type]
      );
    } else if (aromaTypes.includes(type)) {
      setSelectedAromas((prev) =>
        prev.includes(type)
          ? prev.filter((item) => item !== type)
          : [...prev, type]
      );
    } else if (tasteTypes.includes(type)) {
      setSelectedTastes((prev) =>
        prev.includes(type)
          ? prev.filter((item) => item !== type)
          : [...prev, type]
      );
    }

    // (5) 화면에 보이는 라벨 토글 처리 (기존 로직)
    const toggleLabel = (
      labels: { name: string }[],
      setLabels: React.Dispatch<React.SetStateAction<{ name: string }[]>>
    ) => {
      setLabels((prevLabels) => {
        const labelExists = prevLabels.find(
          (label) => label.name === displayName
        );
        const isAllActive = prevLabels.some(
          (label) =>
            label.name === "모든 주종 포함" ||
            label.name === "모든 맛 포함" ||
            label.name === "모든 향 포함" ||
            label.name === "모든 분위기 포함"
        );
        if (isAllActive) {
          setActiveCategories((prev) =>
            prev.filter(
              (cat) =>
                cat !== "allVariety" &&
                cat !== "allAroma" &&
                cat !== "allFlavor" &&
                cat !== "allMood"
            )
          );
          return [
            ...prevLabels.filter(
              (label) =>
                label.name !== "모든 주종 포함" &&
                label.name !== "모든 맛 포함" &&
                label.name !== "모든 향 포함" &&
                label.name !== "모든 분위기 포함"
            ),
            { name: displayName },
          ];
        }
        return labelExists
          ? prevLabels.filter((label) => label.name !== displayName)
          : [...prevLabels, { name: displayName }];
      });
    };

    if (categories.includes("칵테일")) {
      toggleLabel(varietyLabels, setVarietyLabels);
    } else if (
      categories.includes("시트러스") ||
      categories.includes("베리/열대과일")
    ) {
      toggleLabel(aromaLabels, setAromaLabels);
    } else if (categories.includes("단맛")) {
      toggleLabel(flavorLabels, setFlavorLabels);
    } else if (categories.includes("깔끔한")) {
      toggleLabel(moodLabels, setMoodLabels);
    }
  };

  const handleDelete = (type: string) => {
    const labelMapping: Record<string, string> = {
      "모든 주종 포함": "allVariety",
      "모든 맛 포함": "allAroma",
      "모든 향 포함": "allFlavor",
      "모든 여운 포함": "allMood",
      "기타 주종": "etcVariety",
      "기타 분위기": "etcMood",
    };

    const actualType = labelMapping[type] || type;

    // activeCategories 업데이트
    setActiveCategories((prev) => prev.filter((cat) => cat !== actualType));

    // selected 상태에서도 해당 필터를 제거
    setSelectedCategories((prev) => prev.filter((item) => item !== actualType));
    setSelectedAromas((prev) => prev.filter((item) => item !== actualType));
    setSelectedTastes((prev) => prev.filter((item) => item !== actualType));

    // 라벨 배열에서도 제거
    setVarietyLabels((prev) => prev.filter((label) => label.name !== type));
    setRangeLabels((prev) => prev.filter((label) => label.name !== type));
    setAromaLabels((prev) => prev.filter((label) => label.name !== type));
    setFlavorLabels((prev) => prev.filter((label) => label.name !== type));
    setMoodLabels((prev) => prev.filter((label) => label.name !== type));
  };

  const handleClick1 = () => {
    setCategories([]);
    setTimeout(() => {
      setCategories(["칵테일", "위스키", "진,럼,데낄라"]);
    }, 0);
    setShowSlideBar(false);

    setShowAllVariety(true);
    setShowAllAroma(false);
    setShowAllFlavor(false);
    setShowAllMood(false);

    setShowEtcVariety(true);
    setShowEtcMood(false);
  };

  const handleClick2 = () => {
    setShowSlideBar(true);
    setCategories([]);
  };

  const handleClick3 = () => {
    setCategories([]);
    setTimeout(() => {
      setCategories([
        "라임",
        "시트러스 향",
        "아몬드",
        "바닐라",
        "민트",
        "베리",
        "오크",
        "커피",
        "오렌지",
      ]);
    }, 0);
    setShowSlideBar(false);

    setShowAllVariety(false);
    setShowAllAroma(true);
    setShowAllFlavor(false);
    setShowAllMood(false);

    setShowEtcVariety(false);
    setShowEtcMood(false);
  };

  const handleClick4 = () => {
    setCategories([]);
    setTimeout(() => {
      setCategories([
        "달콤함",
        "시트러스",
        "상쾌함",
        "드라이함",
        "강렬함",
        "부드러움",
        "프루티",
        "허브",
        "짭짤함",
      ]);
    }, 0);
    setShowSlideBar(false);

    setShowAllVariety(false);
    setShowAllAroma(false);
    setShowAllFlavor(true);
    setShowAllMood(false);

    setShowEtcVariety(false);
    setShowEtcMood(false);
  };

  const handleClick5 = () => {
    setCategories([]);
    setTimeout(() => {
      setCategories([
        "로맨틱한",
        "취하고 싶은 날",
        "홈바(혼술)",
        "여름",
        "겨울",
        "비 오는 날",
      ]);
    }, 0);
    setShowSlideBar(false);

    setShowAllVariety(false);
    setShowAllAroma(false);
    setShowAllFlavor(false);
    setShowAllMood(true);

    setShowEtcVariety(false);
    setShowEtcMood(true);
  };

  return (
    <>
      {isPopupVisible && (
        <div className="popup" draggable="false">
          <div className="popup-strong">My Bar를 활성해보세요</div>
          <div className="popup-small">
            내가 가진 술로 만들 수 있는 레시피만
            <br />
            검색할 수 있어요!
          </div>
          <div className="popup-beak"></div>
        </div>
      )}
      <div className="body">
        <div className="set-up">
          <div className="greetings">어떤 Taste를 찾고 계신가요?</div>
          <SearchBar myBarClick={() => {}} searchClick={handleSearchClick} />
          <SearchCategory
            onClick1={handleClick1}
            onClick2={handleClick2}
            onClick3={handleClick3}
            onClick4={handleClick4}
            onClick5={handleClick5}
          />
        </div>

        {categories.length > 0 && (
          <div className="category-container">
            {showAllVariety && (
              <CategoryType
                key="allVariety"
                type="전체 선택"
                onClick={() => handleCategoryTypeClick("allVariety")}
                isActive={activeCategories.includes("allVariety")}
              />
            )}

            {showAllAroma && (
              <CategoryType
                key="allAroma"
                type="전체 선택"
                onClick={() => handleCategoryTypeClick("allAroma")}
                isActive={activeCategories.includes("allAroma")}
              />
            )}

            {showAllFlavor && (
              <CategoryType
                key="allFlavor"
                type="전체 선택"
                onClick={() => handleCategoryTypeClick("allFlavor")}
                isActive={activeCategories.includes("allFlavor")}
              />
            )}

            {showAllMood && (
              <CategoryType
                key="allMood"
                type="전체 선택"
                onClick={() => handleCategoryTypeClick("allMood")}
                isActive={activeCategories.includes("allMood")}
              />
            )}

            {categories.map((category, index) => (
              <CategoryType
                key={index}
                type={category}
                onClick={() => handleCategoryTypeClick(category)}
                isActive={activeCategories.includes(category)}
              />
            ))}

            {showEtcVariety && (
              <CategoryType
                key="etcVariety"
                type="기타"
                onClick={() => handleCategoryTypeClick("etcVariety")}
                isActive={activeCategories.includes("etcVariety")}
              />
            )}

            {showEtcMood && (
              <CategoryType
                key="etclMood"
                type="기타"
                onClick={() => handleCategoryTypeClick("etcMood")}
                isActive={activeCategories.includes("etcMood")}
              />
            )}
          </div>
        )}

        {showSlideBar && <AlcoholSlideBar addClick={handleAddClick} />}

        <div className="labels-container">
          {varietyLabels.map((label, index) => {
            let imgSrc;

            switch (label.name) {
              case "칵테일":
                imgSrc = "/image/cocktail-icon.svg";
                break;

              case "위스키":
                imgSrc = "/image/whiskey-icon.svg";
                break;

              case "진,럼,데낄라":
                imgSrc = "/image/gin-rum-teq-icon.svg";
                break;

              default:
                imgSrc = "/image/etc-icon.svg";
                break;
            }

            return (
              <TypeLabelSvg
                svg={
                  <img
                    src={imgSrc}
                    alt={label.name}
                    width="24"
                    height="24"
                    style={{ objectFit: "contain" }}
                  />
                }
                key={`variety-${index}`}
                name={label.name}
                onDelete={() => handleDelete(label.name)}
              />
            );
          })}

          {rangeLabels.map((label, index) => (
            <TypeLabel
              key={`range-${index}`}
              name={label.name}
              onDelete={() => handleDelete(label.name)}
            />
          ))}

          {aromaLabels.map((label, index) => (
            <TypeLabel
              key={`aroma-${index}`}
              name={label.name}
              onDelete={() => handleDelete(label.name)}
              category="aroma"
            />
          ))}

          {flavorLabels.map((label, index) => (
            <TypeLabel
              key={`flavor-${index}`}
              name={label.name}
              onDelete={() => handleDelete(label.name)}
              category="flavor"
            />
          ))}

          {moodLabels.map((label, index) => (
            <TypeLabel
              key={`mood-${index}`}
              name={label.name}
              onDelete={() => handleDelete(label.name)}
              category="mood"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchPageUp;
