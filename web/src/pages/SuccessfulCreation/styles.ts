import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #37c77f;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Message = styled.div`
  width: 392px;
  height: 490px;
  margin-right: 122px;
  text-align: center;

  h1 {
    margin-top: 76px;
    font-weight: 800;
    font-size: 80px;
    line-height: 80px;
  }

  p {
    margin-top: 32px;
    margin-bottom: 60px;
    font-weight: 600;
    font-size: 24px;
    line-height: 34px;
  }

  button {
    cursor: pointer;
    border: 0;
    width: 243px;
    height: 64px;
    background: #31b272;
    border-radius: 20px;
    font-weight: 800;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    color: #ffffff;
    transition: background-color 0.2s;

    &:hover {
      background-color: #3bd689;
    }
  }
`;
