import styled from 'styled-components';

export const ForgotPasswordForm = styled.form`
  h1 {
    color: #5c8599;
    margin-bottom: 24px;
  }

  p {
    width: 312px;
    margin-bottom: 40px;
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
