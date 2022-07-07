import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Box = styled.div`
  position: absolute;
  top: calc(50% - 75px);
  left: calc(50% - 75px);

  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotate} infinite 5s linear;

  border-radius: 100%;
  width: 150px;
  height: 150px;
  z-index: 10;
  border: dotted #ef3f46 5px;
`;

function Load() {
  return (
    <Box>
      <p>Loading</p>
    </Box>
  );
}

export default Load;
