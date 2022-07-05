import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Person } from '../types/person';
import { Colors, DeviceWidths } from '../theme';
import placeholder from '../resources/images/person.png';

const StyledResultList = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${DeviceWidths.sm + 'px'}) {
    flex-direction: column;
    width: 100%;
  }
`;
const StyledCard = styled(Card)`
  width: 7rem;
  margin: 0.5rem;
  background-color: ${Colors.SubtleBackground};
  && .MuiCardActionArea-root:hover {
    background-color: ${Colors.SubtleBackgroundHover};
  }
  @media (max-width: ${DeviceWidths.sm + 'px'}) {
    display: flex;
    width: 100%;
    margin: 0.5rem 0;
  }
`;

const StyledCardActionArea: any = styled(CardActionArea)`
  @media (max-width: ${DeviceWidths.sm + 'px'}) {
    display: flex;
    justify-content: flex-start;
  }
`;

const StyledCardMedia: any = styled(CardMedia)`
  height: 7rem;
  @media (max-width: ${DeviceWidths.sm + 'px'}) {
    min-width: 4rem;
    height: 4rem;
  }
`;

const StyledCardContent = styled(CardContent)`
  padding: 0.5rem;
  height: 4rem;
  text-align: center;
  font-weight: bold;
  @media (max-width: ${DeviceWidths.sm + 'px'}) {
    text-align: left;
  }
`;

const StyledTypography = styled(Typography)`
  font-weight: 500;
  text-overflow: ellipsis;
  font-size: small;
`;

const PersonResultGrid: FC<{ persons: Person[] }> = ({ persons }) => {
  return (
    <StyledResultList>
      {persons.map((person: Person) => (
        <StyledCard key={person.id}>
          <StyledCardActionArea href={`/person/${person.id}`}>
            <StyledCardMedia
              image={person.profileImageUrl ? person.profileImageUrl : placeholder}
              title="Profile photo"
            />
            <StyledCardContent>
              <StyledTypography gutterBottom variant={'body2'}>
                {[person.lastName, person.firstName].filter(Boolean).join(', ')}
              </StyledTypography>
            </StyledCardContent>
          </StyledCardActionArea>
        </StyledCard>
      ))}
    </StyledResultList>
  );
};

export default PersonResultGrid;
