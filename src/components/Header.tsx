import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import React, { useState } from 'react';
import styled from 'styled-components';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { DeviceWidths } from '../theme';

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

const Header = () => {
  const [isAddPersonDialogOpen, setIsAddPersonDialogOpen] = useState(false);
  const [isAddCommunityDialogOpen, setIsAddCommunityDialogOpen] = useState(false);

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
          <IconButton href="/" color="inherit">
            <HomeIcon />
          </IconButton>
          <IconButton href="/communities" color="inherit">
            <GroupIcon />
          </IconButton>
          <StyledExtraButtons>
            <IconButton href="/person/1" color="inherit">
              <AccessibilityNewIcon />
            </IconButton>
            <IconButton onClick={toggleAddPersonDialog} color="inherit">
              <PersonAddIcon />
            </IconButton>
            <IconButton onClick={toggleAddCommunityDialog} color="inherit">
              <GroupAddIcon />
            </IconButton>
          </StyledExtraButtons>

          <StyledSeparator />
          {/*<PersonSearch />*/}
        </StyledToolbar>
      </AppBar>
      {/*<EditPersonDialog isEditDialogOpen={isAddPersonDialogOpen} handleToggleDialog={toggleAddPersonDialog} />*/}
      {/*<EditCommunityDialog isEditDialogOpen={isAddCommunityDialogOpen} handleToggleDialog={toggleAddCommunityDialog} />*/}
    </>
  );
};

export default Header;
