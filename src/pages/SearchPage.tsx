import React, { useState, useEffect } from "react";
import "./SearchPage.css";

import "pretendard/dist/web/static/pretendard.css";
import SearchBar from "../components/search/searchBar";
import SearchCategory from "../components/search/searchCategory";
import CategoryType from "../components/search/CategotyType";
import AlcoholSlideBar from "../components/search/searchPageOnly/AlcoholSlideBar";
import TypeLabel from "../components/search/searchPageOnly/TypeLabel";
import TypeLabelSvg from "../components/search/searchPageOnly/TypeLabelSvg";

const SearchPage: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [showSlideBar, setShowSlideBar] = useState<boolean>(false);
  const [selectedRange, setSelectedRange] = useState<{ min: number; max: number }>({
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
  const [showEtcAroma, setShowEtcAroma] = useState(false);
  const [showEtcFlavor, setShowEtcFlavor] = useState(false);
  const [showEtcMood, setShowEtcMood] = useState(false);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddClick = (min: number, max: number) => {
    setSelectedRange({ min, max });
    const newLabel = { name: `${min}% ~ ${max}%` };

    if (!rangeLabels.find((label) => label.name === newLabel.name)) {
      setRangeLabels((prevLabels) => [...prevLabels, newLabel]);
    }
  };

  
  const handleCategoryTypeClick = (type: string) => {
    // Map "etc~" types to unique internal labels while displaying "기타"
    const labelMapping = {
      etcVariety: "기타 주종",
      etcAroma: "기타 맛",
      etcFlavor: "기타 향",
      etcMood: "기타 분위기",
    };
  
    const displayName = labelMapping[type] || type;
    const newLabel = { name: displayName };
  
    // Toggle the selected category
    setActiveCategories((prev) =>
      prev.includes(type) ? prev.filter((cat) => cat !== type) : [...prev, type]
    );
  
    // Handle "all~" category selection
    if (type === "allVariety") {
      setVarietyLabels([{ name: "모든 주종 포함" }]);
      setActiveCategories((prev) => prev.filter((cat) => cat === "allVariety"));
      return;
    } else if (type === "allAroma") {
      setAromaLabels([{ name: "모든 맛 포함" }]);
      setActiveCategories((prev) => prev.filter((cat) => cat === "allAroma"));
      return;
    } else if (type === "allFlavor") {
      setFlavorLabels([{ name: "모든 향 포함" }]);
      setActiveCategories((prev) => prev.filter((cat) => cat === "allFlavor"));
      return;
    } else if (type === "allMood") {
      setMoodLabels([{ name: "모든 분위기 포함" }]);
      setActiveCategories((prev) => prev.filter((cat) => cat === "allMood"));
      return;
    }
  
    // Function to toggle labels for specific types
    const toggleLabel = (
      labels: { name: string }[],
      setLabels: React.Dispatch<React.SetStateAction<{ name: string }[]>>
    ) => {
      setLabels((prevLabels) => {
        const labelExists = prevLabels.find((label) => label.name === displayName);
  
        // Check if "all~" is active in the current category
        const isAllActive = prevLabels.some(
          (label) =>
            label.name === "모든 주종 포함" ||
            label.name === "모든 맛 포함" ||
            label.name === "모든 향 포함" ||
            label.name === "모든 분위기 포함"
        );
  
        // If "all~" is active and a specific type is selected, remove "all~" and add the new label
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
            newLabel, // ✅ Add the new label after removing "all~"
          ];
        }
  
        // Toggle specific type label normally
        return labelExists
          ? prevLabels.filter((label) => label.name !== displayName)
          : [...prevLabels, newLabel];
      });
    };
  
    // Determine the category and update labels accordingly
    if (categories.includes("칵테일")) {
      toggleLabel(varietyLabels, setVarietyLabels);
    } else if (categories.includes("단맛")) {
      toggleLabel(flavorLabels, setFlavorLabels);
    } else if (categories.includes("시트러스")) {
      toggleLabel(aromaLabels, setAromaLabels);
    } else if (categories.includes("깔끔한")) {
      toggleLabel(moodLabels, setMoodLabels);
    }
  }; 
  
  const handleDelete = (type: string) => {
    // Mapping "기타" labels to their corresponding category types
    const labelMapping: Record<string, string> = {
      "모든 주종 포함": "allVariety",
      "모든 맛 포함": "allAroma",
      "모든 향 포함": "allFlavor",
      "모든 여운 포함": "allMood",
      "기타 주종": "etcVariety",
      "기타 맛": "etcAroma",
      "기타 향": "etcFlavor",
      "기타 분위기": "etcMood",
    };
  
    // Find the actual type that needs to be removed from `activeCategories`
    const actualType = labelMapping[type] || type;
  
    // Remove the type from `activeCategories`
    setActiveCategories((prev) => prev.filter((cat) => cat !== actualType));
  
    // Remove the label from all relevant categories
    setVarietyLabels((prev) => prev.filter((label) => label.name !== type));
    setRangeLabels((prev) => prev.filter((label) => label.name !== type));
    setAromaLabels((prev) => prev.filter((label) => label.name !== type));
    setFlavorLabels((prev) => prev.filter((label) => label.name !== type));
    setMoodLabels((prev) => prev.filter((label) => label.name !== type));
  };
  

  const handleClick1 = () => {
    setCategories([]);
    setTimeout(() => {
      setCategories(["칵테일", "위스키", "진,럼,데낄라", "맥주"]);
    }, 0);
    setShowSlideBar(false);
    
    setShowAllVariety(true);
    setShowAllAroma(false);
    setShowAllFlavor(false);
    setShowAllMood(false);

    setShowEtcVariety(true);
    setShowEtcAroma(false);
    setShowEtcFlavor(false);
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
        "시트러스",
        "베리/열대과일",
        "꿀/시럽",
        "카라멜/초콜렛",
        "우디/오크/가죽",
        "바닐라/견과류",
        "허브(민트 등)",
        "향신료(시나몬 등)",
        "스모키",
      ]);
    }, 0);
    setShowSlideBar(false);
  
    setShowAllVariety(false);
    setShowAllAroma(true);
    setShowAllFlavor(false);
    setShowAllMood(false);

    setShowEtcVariety(false);
    setShowEtcAroma(true);
    setShowEtcFlavor(false);
    setShowEtcMood(false);
  };
  
  const handleClick4 = () => {
    setCategories([]);
    setTimeout(() => {
      setCategories(["단맛", "신맛", "쓴맛", "드라이", "부드러움", "묵직함"]);
    }, 0);
    setShowSlideBar(false);
  
    setShowAllVariety(false);
    setShowAllAroma(false);
    setShowAllFlavor(true);
    setShowAllMood(false);

    setShowEtcVariety(false);
    setShowEtcAroma(false);
    setShowEtcFlavor(true);
    setShowEtcMood(false);
  };
  
  const handleClick5 = () => {
    setCategories([]);
    setTimeout(() => {
      setCategories(["깔끔한", "달콤하게 남는", "씁쓸하게 남는", "오래가는", "짧은"]);
    }, 0);
    setShowSlideBar(false);
  
    setShowAllVariety(false);
    setShowAllAroma(false);
    setShowAllFlavor(false);
    setShowAllMood(true);

    setShowEtcVariety(false);
    setShowEtcAroma(false);
    setShowEtcFlavor(false);
    setShowEtcMood(true);
  };
  
  
  return(
    <>
      {isPopupVisible && (
        <div
          className="popup"
          style={{
            top: '220px',
            left: '370px',
            position: 'fixed',
          }}
        >
          <div className="popup-strong">My Bar를 활성해보세요</div>
          <div className="popup-small">내가 가진 술로 만들 수 있는 레시피만<br/>검색할 수 있어요!</div>
          <div className="popup-beak"></div>
        </div>
      )}
      <div className="body">
        <div className="set-up">
          <div className="greetings">어떤 Taste를 찾고 계신가요?</div>
          <SearchBar />
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

          {showEtcAroma && (
            <CategoryType 
              key="etcAroma"
              type="기타" 
              onClick={() => handleCategoryTypeClick("etcAroma")} 
              isActive={activeCategories.includes("etcAroma")} 
            />
          )}

          {showEtcFlavor && (
            <CategoryType 
              key="etcFlavor"
              type="기타" 
              onClick={() => handleCategoryTypeClick("etcFlavor")} 
              isActive={activeCategories.includes("etcFlavor")} 
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
                imgSrc = "https://s3-alpha-sig.figma.com/img/ff39/a53d/568721f519d5b8a34906e4502ad6d303?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p0g5mcpUO-JKKbxgmbDAWOhY4DHmRNWUJjPmwc2eKjRrLciJMoIRXjCUiOzjb74XHMoxElr-PkubY8YSJQypTrqNiJYJWSDFbUt5JZAyGnWyfEtN7wFTFCRnQtZXDPPFFAt92bTQhwAJ9q2A-Cm~Dym6jVvcTsNB9FIoPI~UgqBK6YX1FVXMTqf~h~b856b9QdtzTjsk2Y0rFBAyEXwXjahEAq5cONloZqDcZ555c1Fw-Tykqe6X7QGGZi7CroDcOUj3Ko~0PcOro2NBjw5t~Hr8wrMzTywcC0KZmfFo8kC~rRSb4wMFFA9Yj-4bzn1qIoWbFEGAib3CV0UEwCbYNw__";
                break;

              case "위스키":
                imgSrc = "https://s3-alpha-sig.figma.com/img/8f81/018e/394977a86445477a908eed360726a90b?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=D-kcVOF2FLHjCfz55z7i5ax41s5K1bBrwgbgoYRSUonflk5CCi1DTgqD0CZ2BiNiAzgz5JGKyvrJ~pYXh2AM5J7aECIUoHgKPAQIArmkSFX-h32dnIZYzYuuVvSFRtv4KQ~bQC7y4h8pCydtgZEwnpJLyN3xgL8-vXpHu7gLhHd1jrnpDXQIWGhmhZuCBFfON85LzhxQGoeVKOQxb07eCfTQVCd3249XOcmBWUky06VIxrCxSAhf-5lx3XI4if7wAe8aJBDmSJyO2YtY6svlhm1kGyfJO04k3BB4mtRgxdRV5RJwjvUpiX-MoBbpacFbekeZ2gWvUR0iioEYNWaLZA__";
                break;

              case "진,럼,데낄라":
                imgSrc = "https://s3-alpha-sig.figma.com/img/b3c9/e734/76227b42db42c3082e1b479673455921?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PZCJmp0JBtafu76N71mlzzSVTXJY2~uhYvwaVIv6x7ekGhI8XALZBiNp-GKuW3b1h6UONihGMD8Fju9aeQ3mLB85hyGwo7sDKm06VhFPiDTlJK7w2kf3R9yrn98MX6JqFkZXOe~8ANMaJbFPgVwgRdcebYBmjsYkRF02jSladCtjX8ydH6bt3vYkR7FCygyVrhAOyDns3ifK1pGKoles2ARL-5L6Kk5m~REGuTB6jp-IvVAd5hJyeO8oXK6zNyJtgnU1gjJo38dj8qJk4i78LskjF1h0XrwXtvqtJEB6LFkUfENs~4t7cHpbOOahilP1k3R4IPSU1l2-lMpShOBFUA__";
                break;

              case "맥주":
                imgSrc = "https://s3-alpha-sig.figma.com/img/cf15/52b4/ce55312d1404ec4272da0eaa4338814b?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WF7poQQzAWoZrMJ52B98rSHoaVUZnYHZUHvRCXhhG-DER3EnLVETzU-os~AONfVSCvkI5LiK66qrFY-kQ~uOTVufrMscVlmIZG8kcHNl4gX-x5zUpVCbfY0d-WbiQvJK20~1AiFi-6HrFD-8WTNMYQ0PZFjFMDlCycFI3isdNdNeB95hY6MthBjfL4V0QlKqGj-BIfD5G4PldWTbwcKZkE1KIsPg7-oQXp5Y5K-FBENfxu6xozQqT5exCLG4rsSm52Eco1b5onMMVMXlGP8VNifh~cSf4Dpvt6jribY5WwQ89F7AiZcY7dhLWkR6UFnXlASucpB-u9kTi3XdjX6UIA__";
                break;
                
              default:
                imgSrc = "https://s3-alpha-sig.figma.com/img/f630/78e3/17056e2585eb5851338120a504c7c6e1?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZahwAIpJVHQ13Vodsq2ZWKcW98aobtO~MPZHYhUIqr7XIdCot8s-Jt540lhfmW7tL8geR61aTYspXSOz3bEEp51XCw6BVDeRjzCZgvvf7S~KLeuqtNNh0gf4AnYkZ5DNlm9SiXWQYYpmFt-~zeKgvlMBNFoirw3eee~k01kQt9TJ1HWvfyLQ6S8uMcv3jj9JPkYGp4yvR9ba~20fXj4nEcEnF0L485U2tOnCJ2oH0Vsw7n3Bjf3~Xx5AGqZWn12AUda0tkO4op4O3CtoJXjbPZltSH3VzNT~daJBN-kjvCYMbuiick2~pPU75AA0K4LclB1Fy3JVDxM1WOoxJU~3cA__";
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

export default SearchPage;
