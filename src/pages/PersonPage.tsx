import React, { FC, useContext, useState } from 'react';
import { emptyPerson, Person } from '../types/person';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import DeleteIcon from '@mui/icons-material/Delete';

import { Colors, DeviceWidths } from '../theme';
import { FaCross } from 'react-icons/fa';

import personPlaceholderImage from '../resources/images/person.png';
import { CircularProgress, IconButton, Link, Typography } from '@mui/material';
import { PersonsContext } from '../App';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, updatePerson } from '../firebase/firebaseHelper';
import { v4 } from 'uuid';

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
const StyledLabelButtonFileUpload = styled.label`
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
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
  const { identifier } = useParams();
  const { persons, setPersons } = useContext(PersonsContext);

  const [person, setPerson] = useState(persons.find((_person: Person) => _person.id === identifier) ?? emptyPerson);

  // useEffect(() => {
  //   console.log('HEPP!', persons);
  //   if (persons && persons.length > 0)
  //     setPerson(persons.find((_person: Person) => _person.id === identifier) ?? emptyPerson);
  // }, [persons]);

  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // const handleDeleteClick = () => {
  //   // if (window.confirm(`Really delete ${person?.firstName} ${person?.lastName} ?`)) {
  //   //   deletePerson(identifier)
  //   //     .then(() => {
  //   //       history.push('/');
  //   //     })
  //   //     .catch((error: any) => console.error(error.message));
  //   // }
  // };

  // const handleToggleEditDialog = () => {
  //   setIsEditDialogOpen(!isEditDialogOpen);
  // };
  const [isUploading, setIsUploading] = useState(false);
  const handleFileUpload = async (file: File | null) => {
    if (!file) return;
    setIsUploading(true);
    console.log('Laster opp bilde: ', file.name);
    //todo: Scale image
    //todo: Save thumbs as well
    const storageRef = ref(storage, `images/${v4()}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    const newPersonsArray = persons.map((_person: Person) =>
      _person.id === person.id ? { ..._person, profileImageUrl: imageUrl } : _person
    );
    setPersons(newPersonsArray); //oppdaterer context)
    setPerson(newPersonsArray.find((_person: Person) => _person.id === person.id)); //opppdaterer lokal view uten å være avhengig av context
    await updatePerson({ ...person, profileImageUrl: imageUrl });
    setIsUploading(false);
  };

  return (
    <StyledPersonPresentation>
      {person && (
        <>
          <StyledHeader>
            <StyledImageWrapper>
              <Link href={person.profileImageUrl} target="_blank" rel="noopener noreferrer">
                <StyledImage
                  alt="Person"
                  src={person.profileImageUrl ? person.profileImageUrl : personPlaceholderImage}
                />
              </Link>
              <div>
                <StyledLabelButtonFileUpload htmlFor="file-upload">Velg nytt profilbilde</StyledLabelButtonFileUpload>
                <input
                  id="file-upload"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleFileUpload(event.target.files && event.target.files[0]);
                  }}
                  type="file"
                  style={{ display: 'none' }}
                />
                {isUploading && <CircularProgress size={'1rem'} style={{ marginLeft: '1rem' }} />}
              </div>
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
                    style={{ color: 'blue' }}
                    href={`https://www.facebook.com/${person.facebookLink}`}
                    target="_blank"
                    aria-label="facebook link">
                    <FacebookIcon />
                  </IconButton>
                )}
                {/*<IconButton aria-label="" onClick={handleDeleteClick}>*/}
                {/*  <DeleteIcon />*/}
                {/*</IconButton>*/}
                {/*<IconButton aria-label="" onClick={handleToggleEditDialog}>*/}
                {/*  <EditOutlinedIcon />*/}
                {/*</IconButton>*/}
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
