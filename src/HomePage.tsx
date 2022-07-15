import { Route, Routes, useNavigate } from 'react-router-dom';
import { LastRegisteredPersonsPage } from './pages/LastRegisteredPersonsPage';
import React, { FC, useContext, useEffect } from 'react';
import { generateMockPersonArray, Person } from 'types/person';
import { NewUser } from 'pages/NewUser';
import { AddImage } from 'AddImage';
import { Container } from '@mui/material';
import { getDocs, query } from 'firebase/firestore';
import { auth, communityRef, personsRef } from './firebase/firebaseHelper';
import styled from '@emotion/styled';
import { USE_MOCK_DATA } from './constants';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NotFoundPage } from './pages/NotFoundPage';
import { Header } from './components/Header';
import { PersonPage } from './pages/PersonPage';
import { CommunitiesContext, PersonsContext } from './App';
import { CommunitiesPage } from './pages/Communities';
import { Community, generateMockCommunityArray } from './types/community';

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

export const HomePage: FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { persons, setPersons } = useContext(PersonsContext);
  const { communities, setCommunities } = useContext(CommunitiesContext);

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
        tempPersons.push({ ...doc.data(), id: doc.id });
      });
      setPersons(tempPersons);
    };
    const getMockPersons = () => {
      console.log('generating mock users');
      setPersons(generateMockPersonArray());
    };
    if (persons.length === 0) {
      !USE_MOCK_DATA ? getAllPersons() : getMockPersons();
    }
    //test
  }, [persons.length, setPersons]);

  useEffect(() => {
    const getAllCommunities = async () => {
      console.log('Fetching all communities from firebase');
      const q = query(communityRef);
      const querySnapshot = await getDocs(q);
      const tempCommunities: Community[] = [];
      querySnapshot.forEach((doc) => {
        tempCommunities.push({ ...doc.data(), id: doc.id });
      });
      setCommunities(tempCommunities);
    };
    const getMockCommunities = () => {
      console.log('generating mock communities');
      setCommunities(generateMockCommunityArray());
    };
    if (communities.length === 0) {
      !USE_MOCK_DATA ? getAllCommunities() : getMockCommunities();
    }
    //test
  }, [communities.length, setCommunities]);

  useEffect(() => {
    if (!USE_MOCK_DATA) {
      error && console.log(error);
      if (loading) return;
      if (!user) return navigate('/login');
      if (user.email !== 'perbjester@gmail.com') return navigate('/notper');
    }
  }, [user, loading, error, navigate]);

  return (
    <StyledApp>
      <Header />
      <StyledContent>
        <Routes>
          <Route path="/" element={<LastRegisteredPersonsPage />} />
          <Route path="/person/:identifier" element={<PersonPage />} />
          <Route path="/newperson" element={<NewUser />} />
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/addimage" element={<AddImage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </StyledContent>
    </StyledApp>
  );
};
