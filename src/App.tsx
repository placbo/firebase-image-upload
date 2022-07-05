import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { MainPage } from './pages/MainPage';
import { useEffect, useState } from 'react';
import { mockPerson, Person } from 'types/person';
import { NewUser } from 'pages/NewUser';
import { AddImage } from 'AddImage';
import { Container } from '@mui/material';
import Header from './components/Header';
import { getDocs, query } from 'firebase/firestore';
import { personsRef } from './firebaseHelper';
import styled from '@emotion/styled';
import { USE_MOCK_DATA } from './constants';

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

function App() {
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    const getAllPersons = async () => {
      console.log('Fetching all users');
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
      setPersons([mockPerson, mockPerson, mockPerson, mockPerson, mockPerson, mockPerson]);
    };
    !USE_MOCK_DATA ? getAllPersons() : getMockPersons();
  }, []);

  return (
    <Router>
      <StyledApp>
        <Header />
        <StyledContent>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<MainPage persons={persons} />} />
            <Route path="/newperson" element={<NewUser />} />
            <Route path="/addimage" element={<AddImage />} />
          </Routes>
        </StyledContent>
      </StyledApp>
    </Router>
  );
}

export default App;
