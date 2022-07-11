import React, { FC, useContext, useState } from 'react';
import { emptyPerson, Person } from '../types/person';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

import { IMAGE_BASE_URL } from '../resources/constants';
import { Colors, DeviceWidths } from '../theme';
import { FaCross } from 'react-icons/fa';

import personPlaceholderImage from '../resources/images/person.png';
import { IconButton, Link, Typography } from '@mui/material';
import { PersonsContext } from '../App';

const StyledPersonPresentation = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60rem;
  min-width: 10rem;
  width: 100%;
  margin-top: 3rem;
`;

const StyledHeader = styled.div`
  display: flex;
  @media (max-width: ${DeviceWidths.sm}) {
    flex-wrap: wrap;
  }
`;

const StyledDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  @media (max-width: ${DeviceWidths.sm}) {
    text-align: center;
  }
`;

const StyledSeparator = styled.div`
  flex-grow: 1;
`;

const StyledImageWrapper = styled.div`
  margin: 1rem 1rem 1rem 0.5rem;
  @media (max-width: ${DeviceWidths.sm}) {
    margin: 0;
    display: flex;
    width: 100%;
    justify-content: center;
  }
`;

const StyledImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border: 1px solid ${Colors.PrimaryText};
  @media (max-width: ${DeviceWidths.sm}) {
    width: 15rem;
    height: 15rem;
  }
`;

const StyledNameTypography = styled(Typography)`
  margin-top: 1rem;
  font-family: inherit;
`;

const StyledNoteTypography = styled(Typography)`
  margin-top: 2rem;
  font-family: inherit;
`;

const StyledActions = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: ${DeviceWidths.sm}) {
    padding-top: 1rem;
    justify-content: center;
  }
`;

export const PersonPage: FC = () => {
  const { persons } = useContext(PersonsContext);

  const { identifier } = useParams();
  const person = persons.find((_person: Person) => _person.id === identifier) ?? emptyPerson;
  console.log('Rendrer personPage med id: ', identifier);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    // if (window.confirm(`Really delete ${person?.firstName} ${person?.lastName} ?`)) {
    //   deletePerson(identifier)
    //     .then(() => {
    //       history.push('/');
    //     })
    //     .catch((error: any) => console.error(error.message));
    // }
  };

  const handleToggleEditDialog = () => {
    setIsEditDialogOpen(!isEditDialogOpen);
  };

  return (
    <StyledPersonPresentation>
      {person && (
        <>
          <StyledHeader>
            <StyledImageWrapper>
              <Link
                href={`${IMAGE_BASE_URL}/persons/${person.profileImageUrl}`}
                target="_blank"
                rel="noopener noreferrer">
                <StyledImage
                  alt="Person"
                  src={
                    person.profileImageUrl
                      ? `${IMAGE_BASE_URL}/persons/medium/${person.profileImageUrl}`
                      : personPlaceholderImage
                  }
                />
              </Link>
            </StyledImageWrapper>
            <StyledDetailsWrapper>
              <StyledNameTypography variant="h3">{`${person.firstName} ${person.lastName}`}</StyledNameTypography>
              {person.note && <StyledNoteTypography variant="body1">{person.note}</StyledNoteTypography>}
              {(person.born || person.deceased) && (
                <StyledNoteTypography variant="body2">
                  {person.born} - {person.deceased === 'x' ? <FaCross /> : <span>{person.deceased}</span>}
                </StyledNoteTypography>
              )}
              <StyledSeparator />
              <StyledActions>
                {person.facebookLink && (
                  <IconButton
                    href={`https://www.facebook.com/${person.facebookLink}`}
                    target="_blank"
                    aria-label="facebook link">
                    <FacebookIcon />
                  </IconButton>
                )}
                <IconButton aria-label="" onClick={handleDeleteClick}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="" onClick={handleToggleEditDialog}>
                  <EditOutlinedIcon />
                </IconButton>
              </StyledActions>
            </StyledDetailsWrapper>
          </StyledHeader>

          {/*<HeadingWithLine text="Grupper" />*/}
          {/*<CommunityResultGrid personId={person.id} />*/}

          {/*<EditPersonDialog*/}
          {/*  isEditDialogOpen={isEditDialogOpen}*/}
          {/*  handleToggleDialog={handleToggleEditDialog}*/}
          {/*  person={person}*/}
          {/*  setPerson={setPerson}*/}
          {/*/>*/}
        </>
      )}
    </StyledPersonPresentation>
  );
};
