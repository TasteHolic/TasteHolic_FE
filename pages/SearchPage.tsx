import React from "react";
import SearchBar from "../src/components/search/searchBar";
import SearchHeader from "../src/components/Header/SearchHeader";
import SearchCategory from "../src/components/search/searchCategory";
import "../src/index.css";
import RecommandCard from "../src/components/Category/RecommandCard";
import CategoryCard from "../src/components/Category/CategoryCard";
import Footer from "../src/components/Footer";
import SearchPageUp from "../src/pages/SearchPageUp";
import {
  TopSection,
  TopTitle,
  SearchBarWrapper,
  SearchCategoryWrapper,
  CategorySection,
  SectionTitle,
  CardWrapper,
  Container,
  RecommandSection,
  RecommandCardWrapper,
  RecommandTitle,
  InfoText,
} from "./SearchPage.styled";

const SearchPage = () => {
  return (
    <Container>
      <SearchHeader />
      <TopSection>
        <SearchPageUp />
      </TopSection>
      <CategorySection>
        <SectionTitle>원하는 레시피를 빠르게 찾아보세요.</SectionTitle>
        <CardWrapper>
          <CategoryCard
            icon="/image/cocktail-icon.svg"
            title="모든 레시피"
            description="최신 레시피를 한눈에"
          />
          <CategoryCard
            icon="/image/Sign Up.svg"
            title="유저 등록"
            description="유저들이 직접 공유한 특별한 한 잔"
          />
          <CategoryCard
            icon="/image/etc-icon.svg"
            title="논알콜"
            description="알코올 없이도 즐길 수 있는"
          />
          <CategoryCard
            icon="/image/high.svg"
            title="고도수"
            description="강렬한 한 잔, 깊은 풍미"
          />
          <CategoryCard
            icon="/image/fruit.svg"
            title="프루티"
            description="상큼한 과일의 향이 가득한 한 잔"
          />
          <CategoryCard
            icon="/image/check.svg"
            title="재료 2개 이하"
            description="적은 재료로 완성하는"
          />
        </CardWrapper>
      </CategorySection>
      <RecommandSection>
        <RecommandTitle>
          UMC 님의 취향을 완성할 TASTE를 제안합니다.
        </RecommandTitle>
        <InfoText>
          이러한 알고리즘에 의해 추천된다는 것을 알리는 안내문구
        </InfoText>
        <RecommandCardWrapper>
          <RecommandCard />
          <RecommandCard />
          <RecommandCard />
        </RecommandCardWrapper>
      </RecommandSection>
      <Footer />
    </Container>
  );
};
export default SearchPage;
