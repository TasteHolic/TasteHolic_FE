import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px !important;
  padding: 0px !important;
  box-sizing: border-box;
`;
export const TopSection = styled.div`
  width: 1280px;
  height: 599px;
  background: #181818;
  border-radius: 0px, 0px, 32px, 32px;
  box-shadow: 0px 4px 20px 0px rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column; /* 자식 요소들을 세로 정렬 */
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

export const TopTitle = styled.h1`
  color: #fff;
  font-family: "Pretendard", sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -1.28px;
  text-transform: capitalize;
  margin-bottom: 33px;
`;

export const SearchBarWrapper = styled.div`
  margin-bottom: 28px;
`;
export const SearchCategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CategorySection = styled.div`
  width: 1280px;
  height: 681px;
  flex-shrink: 0;
  background: #121212;
  text-align: center;
`;
export const SectionTitle = styled.h2`
  height: 33px;
  color: #fff;
  text-align: center;
  font-family: "Pretendard", sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.12px;
  text-transform: capitalize;
  margin-top: 100px;
  margin-bottom: 64px;
`;
export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  justify-items: center;
  width: calc(100% - 248px);
  max-width: 1032px;
  margin: 0 auto;
`;
