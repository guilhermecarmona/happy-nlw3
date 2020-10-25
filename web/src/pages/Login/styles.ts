import styled from 'styled-components';

export const LoginForm = styled.form`
  h1 {
    color: #5c8599;
    margin-bottom: 40px;
  }

  a {
    display: block;
    margin-top: 24px;
    color: #8fa7b3;
    font-size: 16px;
    line-height: 22px;
    text-decoration: none;
    text-align: center;
  }

  button {
    width: 100%;
    border: 0;
    margin-top: 40px;
    height: 64px;
    background: #37c77f;
    border-radius: 20px;
    color: #fff;
    text-decoration: none;
    text-align: center;
    line-height: 64px;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;
