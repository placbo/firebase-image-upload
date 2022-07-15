import { AppBar, Button, IconButton, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React, { FC } from 'react';
import styled from '@emotion/styled';

// import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
// import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Colors, DeviceWidths } from '../theme';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseHelper';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${DeviceWidths.sm}) {
    justify-content: flex-start;
  } ;
`;

const StyledExtraButtons: any = styled.div`
  @media (max-width: ${DeviceWidths.sm}) {
    display: none;
  } ;
`;

const StyledSeparator = styled.div`
  flex-grow: 1;
  @media (max-width: ${DeviceWidths.sm}) {
    margin-left: 1rem;
  } ;
`;

const StyledLink = styled(Link)`
  color: ${Colors.Background};
  text-: none;
`;

export const Header: FC = () => {
  // const [isAddPersonDialogOpen, setIsAddPersonDialogOpen] = useState(false);
  // const [isAddCommunityDialogOpen, setIsAddCommunityDialogOpen] = useState(false);
  const [user, loading] = useAuthState(auth);

  // const toggleAddPersonDialog = () => {
  //   setIsAddPersonDialogOpen(!isAddPersonDialogOpen);
  // };
  // const toggleAddCommunityDialog = () => {
  //   setIsAddCommunityDialogOpen(!isAddCommunityDialogOpen);
  // };

  return (
    <>
      <AppBar position="static">
        <StyledToolbar>
          <StyledLink to="/">
            <IconButton color="inherit" size="large">
              <HomeIcon />
            </IconButton>
          </StyledLink>
          <StyledLink to="/communities">
            <IconButton color="inherit" size="large">
              <GroupIcon />
            </IconButton>
          </StyledLink>
          <StyledExtraButtons>
            {/*<IconButton href="/person/1" color="inherit" size="large">*/}
            {/*  <AccessibilityNewIcon />*/}
            {/*</IconButton>*/}
            {/*<IconButton onClick={toggleAddPersonDialog} color="inherit" size="large">*/}
            {/*  <PersonAddIcon />*/}
            {/*</IconButton>*/}
            <StyledLink to="/newperson">
              <IconButton color="inherit" size="large">
                <PersonAddIcon />
              </IconButton>
            </StyledLink>
            {/*<IconButton onClick={toggleAddCommunityDialog} color="inherit" size="large">*/}
            {/*  <GroupAddIcon />*/}
            {/*</IconButton>*/}
          </StyledExtraButtons>

          <StyledSeparator />
          {/*<PersonSearch />*/}
          {!loading &&
            (user ? (
              <Button
                style={{ color: 'white' }}
                variant={'text'}
                onClick={() => {
                  auth.signOut();
                }}>
                Logg ut
              </Button>
            ) : (
              <Button style={{ color: 'white' }} variant={'text'} href="/">
                Logg inn
              </Button>
            ))}
        </StyledToolbar>
      </AppBar>
      {/*<EditPersonDialog isEditDialogOpen={isAddPersonDialogOpen} handleToggleDialog={toggleAddPersonDialog} />*/}
      {/*<EditCommunityDialog isEditDialogOpen={isAddCommunityDialogOpen} handleToggleDialog={toggleAddCommunityDialog} />*/}
    </>
  );
};
