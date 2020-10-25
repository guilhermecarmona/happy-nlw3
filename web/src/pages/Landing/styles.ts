import styled from 'styled-components';

import landingImg from '../../assets/images/landing.svg';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1100px;

  height: 100%;
  max-height: 680px;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;

  background: url(${landingImg}) no-repeat 80% center;

  div {
    display: flex;
    align-items: center;
  }

  .app-link {
    position: absolute;
    right: 0;
    bottom: 0;

    width: 80px;
    height: 80px;
    background: #ffd666;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    &:hover {
      background: #96feff;
    }
  }

  .acesso-restrito {
    position: absolute;
    right: 0;
    top: 0;
    width: 220px;
    height: 56px;
    text-decoration: none;

    background: #12d4e0;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    color: #fff;

    &:hover {
      background: #96feff;
      color: #15c3d6;
    }
  }

  main {
    max-width: 350px;
    h1 {
      font-size: 76px;
      font-weight: 900;
      line-height: 70px;
    }

    p {
      margin-top: 40px;
      font-size: 24px;
      line-height: 34px;
    }
  }
`;

export const Location = styled.div`
  margin-left: 64px;
  font-size: 24px;
  line-height: 34px;
  display: flex;
  flex-direction: column;
  text-align: right;

  strong {
    font-weight: 800;
  }
`;
