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
  gap: 24px;
  width: 100%;
  max-width: 1032px;
  margin: 0 auto;
  justify-content: center;

  grid-template-columns: repeat(6, 1fr);

  & > :nth-child(1) {
    grid-column: 2 / 4;
  }

  & > :nth-child(2) {
    grid-column: 4 / 7;
  }

  & > :nth-child(3) {
    grid-column: 1 / 3;
  }

  & > :nth-child(4) {
    grid-column: 3 / 5;
  }

  & > :nth-child(5) {
    grid-column: 5 / 7;
  }
`;
export const RecommandSection = styled.div`
  width: 1280px;
  height: 800px;
  background: linear-gradient(180deg, #202020 0%, #121212 100%);
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const RecommandCardWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  align-items: center;
  margin: 0 auto;
`;
export const RecommandTitle = styled.h2`
  height: 33px;
  color: #fff;
  text-align: center;
  font-family: "Pretendard", sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -1.12px;
  text-transform: capitalize;
  margin-top: 80px;
  margin-bottom: 16px;
`;
export const InfoText = styled.p`
  color: #b1b1b1;
  margin-bottom: 48px;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.48px;
  text-transform: capitalize;
  display:flex;
  align-items: center;
  width: 273px;
  justify-content: center;
  &::before {
    content: "";
    background-image: url("/image/information.svg");
    background-size: contain;
    background-repeat: no-repeat;
    width: 13px;
    height: 13px;
    margin-right: 4px;
`;
