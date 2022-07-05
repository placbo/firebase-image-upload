import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Colors } from '../theme';

const StyledHeaderWithLine = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  color: ${Colors.SecondaryText};
`;

const StyledLine = styled.div`
  flex-grow: 1;
  height: 0.3rem;
  border-bottom: 1px solid ${Colors.SecondaryText};
  margin-left: 1rem;
`;

const HeadingWithLine: FC<{ text: string }> = ({ text }) => {
  return (
    <StyledHeaderWithLine>
      <Typography variant="h5">{text}</Typography>
      <StyledLine />
    </StyledHeaderWithLine>
  );
};

export default HeadingWithLine;
