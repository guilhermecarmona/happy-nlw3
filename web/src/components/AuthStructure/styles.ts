import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Background = styled.div`
  flex: 1;
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 260px;
    height: 234px;
  }
`;

export const LoginSection = styled.section`
  background-color: #fff;
  width: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8fa7b2;
  position: relative;
`;

export const Location = styled.div`
  margin-top: 100px;
  font-size: 24px;
  line-height: 34px;
  display: flex;
  flex-direction: column;
  text-align: center;

  strong {
    font-weight: 800;
  }
`;

export const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 360px;
`;

export const BackButton = styled.button`
  border: 0;
  cursor: pointer;
  position: absolute;
  top: 40px;
  right: 40px;
  background: #ebf2f5;
  border-radius: 16px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
