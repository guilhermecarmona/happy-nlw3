import styled from 'styled-components';
import { Map, MapProps } from 'react-leaflet';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const DashboardContainer = styled.div`
  margin: 0 auto;
  min-width: 1120px;
  position: relative;
`;

export const NoOrphanage = styled.section`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  p {
    margin-top: 16px;
    color: #8fa7b3;
  }
`;

export const DashboardHeader = styled.div`
  margin-top: 64px;
  border-bottom: 1px solid #d3e2e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;

  h1 {
    font-size: 32px;
    line-height: 34px;
    color: #4d6f80;
    font-weight: 800;
  }

  p {
    font-size: 16px;
    line-height: 22px;
    font-weight: 600;
    color: #8fa7b3;
  }
`;
export const OrphanagesList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 40px 0;
  column-gap: 32px;
  row-gap: 32px;
`;
export const OrphanageCard = styled.div`
  height: 309px;
  border: 1px solid #d3e2e5;
  border-radius: 20px;
  background: #fff;
`;
export const StyledMap = styled(Map)<MapProps>`
  width: 100%;
  height: 227px;
  border-radius: 20px;
`;

export const CardFooter = styled.div`
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 24px;
    line-height: 34px;
    color: #4d6f80;
    font-weight: bold;
  }
`;
export const Buttons = styled.div`
  display: flex;
  button {
    border: 0;
    background: #ebf2f5;
    border-radius: 16px;
    width: 48px;
    height: 48px;
    color: #15c3d6;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    & + button {
      margin-left: 8px;
    }
  }
`;
