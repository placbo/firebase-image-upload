import { useNavigate, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { generateMockPersonArray, Person } from 'types/person';
import { NewUser } from 'pages/NewUser';
import { AddImage } from 'AddImage';
import { Container } from '@mui/material';
import { getDocs, query } from 'firebase/firestore';
import { auth, personsRef } from './firebaseHelper';
import styled from '@emotion/styled';
import { USE_MOCK_DATA } from './constants';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NotFoundPage } from './pages/NotFoundPage';
import { Header } from './components/Header';
import { PersonPage } from './pages/PersonPage';
import { PersonsContext } from './App';

const StyledApp = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-flow: column nowrap;
  align-items: stretch;
`;

const StyledContent = styled(Container)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Home: FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { persons, setPersons } = useContext(PersonsContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllPersons = async () => {
      console.log('Fetching all users from firebase');
      //TODO: add isLoading
      //TODO: add error handling (try catch)
      const q = query(personsRef);
      const querySnapshot = await getDocs(q);
      const tempPersons: Person[] = [];
      querySnapshot.forEach((doc) => {
        tempPersons.push(doc.data());
        console.log(doc.data());
      });
      setPersons(tempPersons);
    };
    const getMockPersons = () => {
      console.log('generating mock users');
      setPersons(generateMockPersonArray());
    };
    !USE_MOCK_DATA && persons.length === 0 ? getAllPersons() : getMockPersons();
  }, []);

  useEffect(() => {
    error && console.log(error);
    if (loading) return;
    if (!user) return navigate('/login');
    if (user.email !== 'perbjester@gmail.com') return navigate('/notper');
  }, [user, loading, error, navigate]);

  return (
    <StyledApp>
      <Header />
      <StyledContent>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/person/:identifier" element={<PersonPage />} />
          <Route path="/newperson" element={<NewUser />} />
          <Route path="/addimage" element={<AddImage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </StyledContent>
    </StyledApp>
  );
};
