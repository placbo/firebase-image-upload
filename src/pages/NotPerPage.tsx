import React, { FC } from 'react';
import { Button } from '@mui/material';
import { auth } from '../firebaseHelper';
import { useNavigate } from 'react-router-dom';

export const NotPerPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>You are not Per, go home!</h1>
      <Button
        onClick={() => {
          auth.signOut().then(() => navigate('/login'));
        }}>
        Logg ut
      </Button>
    </div>
  );
};
