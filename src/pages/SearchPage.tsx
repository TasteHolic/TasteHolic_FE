import React from "react";
import SearchBar from "../components/search/searchBar";
import Header from "../components/Header";
import SearchCategory from "../components/search/searchCategory";
import {
  TopSection,
  TopTitle,
  SearchBarWrapper,
  SearchCategoryWrapper,
  CategorySection,
  SectionTitle,
  CardWrapper,
  Container,
} from "./SearchPage.styled";
import CategoryCard from "../src/components/Category/CategoryCard";
const SearchPage = () => {
  return (
    <Container>
      <Header />
      <TopSection>
        <TopTitle>어떤 Taste를 찾고 계신가요?</TopTitle>
        <SearchBarWrapper>
          <SearchBar />
        </SearchBarWrapper>
        <SearchCategoryWrapper>
          <SearchCategory />
        </SearchCategoryWrapper>
      </TopSection>
      <CategorySection>
        <SectionTitle>원하는 주류를 빠르게 찾아보세요.</SectionTitle>
        <CardWrapper>
          <CategoryCard
            icon="/image/cocktail-icon.svg"
            title="칵테일"
            description="나만의 특별한 한 잔"
          />
          <CategoryCard
            icon="/image/whiskey-icon.svg"
            title="위스키"
            description="시간이 선물한 깊이"
          />
          <CategoryCard
            icon="/image/gin-rum-teq-icon.svg"
            title="진, 럼, 데킬라"
            description="화려한 변주의 시작"
          />
          <CategoryCard
            icon="/image/beer-icon.svg"
            title="맥주"
            description="일상을 채우는 한 모금"
          />
          <CategoryCard
            icon="/image/etc-icon.svg"
            title="기타"
            description="새로운 맛의 순간"
          />
        </CardWrapper>
      </CategorySection>
    </Container>
  );
};
export default SearchPage;
