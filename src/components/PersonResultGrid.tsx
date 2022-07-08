import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Person } from '../types/person';
import { DeviceWidths } from '../theme';
import placeholder from '../resources/images/person.png';
import { Link } from 'react-router-dom';

const StyledResultList = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${DeviceWidths.sm}) {
    flex-direction: column;
    width: 100%;
  }
`;
const StyledCard = styled(Card)`
  width: 7rem;
  margin: 0.5rem;
  @media (max-width: ${DeviceWidths.sm}) {
    display: flex;
    width: 100%;
    margin: 0.5rem 0;
  }
`;

const StyledCardActionArea: any = styled(CardActionArea)`
  @media (max-width: ${DeviceWidths.sm}) {
    display: flex;
    justify-content: flex-start;
  }
`;

const StyledCardMedia: any = styled(CardMedia)`
  height: 7rem;
  @media (max-width: ${DeviceWidths.sm}) {
    min-width: 4rem;
    height: 4rem;
  }
`;

const StyledCardContent = styled(CardContent)`
  padding: 0.5rem;
  height: 4rem;
  text-align: center;
  font-weight: bold;
  @media (max-width: ${DeviceWidths.sm}) {
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
      {persons.map((person: Person, index) => (
        <StyledCard variant="outlined" key={index}>
          <Link to={`/person/${person.id}`}>
            <StyledCardActionArea>
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
          </Link>
        </StyledCard>
      ))}
    </StyledResultList>
  );
};

export default PersonResultGrid;
