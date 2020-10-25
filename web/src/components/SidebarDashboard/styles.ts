import styled from 'styled-components';

export const StyledSidebar = styled.aside`
  position: fixed;
  height: 100%;
  padding: 32px 24px;
  background: linear-gradient(329.54deg, #15b6d6 0%, #15d6d6 100%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  img {
    width: 48px;
  }
`;

export const MenuOptions = styled.div`
  button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 16px;
    color: #fff;
    border: 0;
    background-color: #12afcb;
    cursor: pointer;
    transition: background 0.2s;

    & + button {
      margin-top: 16px;
    }

    &:hover {
      background: #17d6eb;
    }
  }

  .active {
    background-color: #ffd666;
    color: #0089a5;
  }
`;

export const Footer = styled.footer`
  button {
    width: 48px;
    height: 48px;

    border: 0;

    background: #12afcb;
    border-radius: 16px;

    cursor: pointer;

    transition: background-color 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: #17d6eb;
    }
  }
`;
