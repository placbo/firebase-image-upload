import { AppBar, Button, IconButton, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React, { FC, useState } from 'react';
import styled from '@emotion/styled';

import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { DeviceWidths } from '../theme';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseHelper';

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${DeviceWidths.sm + 'px'}) {
    justify-content: flex-start;
  } ;
`;

const StyledExtraButtons: any = styled.div`
  @media (max-width: ${DeviceWidths.sm + 'px'}) {
    display: none;
  } ;
`;

const StyledSeparator = styled.div`
  flex-grow: 1;
  @media (max-width: ${DeviceWidths.sm + 'px'}) {
    margin-left: 1rem;
  } ;
`;

const Header: FC = () => {
  const [isAddPersonDialogOpen, setIsAddPersonDialogOpen] = useState(false);
  const [isAddCommunityDialogOpen, setIsAddCommunityDialogOpen] = useState(false);
  const [user, loading] = useAuthState(auth);

  const toggleAddPersonDialog = () => {
    setIsAddPersonDialogOpen(!isAddPersonDialogOpen);
  };
  const toggleAddCommunityDialog = () => {
    setIsAddCommunityDialogOpen(!isAddCommunityDialogOpen);
  };

  return (
    <>
      <AppBar position="static">
        <StyledToolbar>
          <IconButton href="/" color="inherit" size="large">
            <HomeIcon />
          </IconButton>
          {/*<IconButton href="/communities" color="inherit" size="large">*/}
          {/*  <GroupIcon />*/}
          {/*</IconButton>*/}
          <StyledExtraButtons>
            {/*<IconButton href="/person/1" color="inherit" size="large">*/}
            {/*  <AccessibilityNewIcon />*/}
            {/*</IconButton>*/}
            {/*<IconButton onClick={toggleAddPersonDialog} color="inherit" size="large">*/}
            {/*  <PersonAddIcon />*/}
            {/*</IconButton>*/}
            <IconButton href="/newperson" color="inherit" size="large">
              <PersonAddIcon />
            </IconButton>
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

export default Header;
