import React from "react";
import SearchBar from "../src/components/search/searchBar";
import Header from "../src/components/Header";
import SearchCategory from "../src/components/search/searchCategory";
import "../src/index.css";
import RecommandCard from "../src/components/Category/RecommandCard";
import CategoryCard from "../src/components/Category/CategoryCard";
import Footer from "../src/components/Footer";
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
