import React from 'react';
import styled from 'styled-components';
import Spinner from '../utill/Spinner/spinner400px.gif'

const LoadingBackground = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #ffe7e8, #8da4d0);
`;

const LoadingText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
`;



function Loading() {
  return (
    <LoadingBackground>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src={Spinner} alt="로딩중" width="5%" />
    </LoadingBackground>
  );
};

export default Loading;