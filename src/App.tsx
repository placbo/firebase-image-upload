import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './Home';
import { NotPerPage } from './pages/NotPerPage';
import { createContext, useState } from 'react';
import { importSampleData } from './import/importToFirebase';

export const PersonsContext = createContext<any>({} as any); //jukser (https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value)

//const persons = generateMockPersonArray();

//importSampleData();

function App() {
  const [persons, setPersons] = useState([]);
  const personsContextValue = { persons, setPersons };

  return (
    <PersonsContext.Provider value={personsContextValue}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/notper" element={<NotPerPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </PersonsContext.Provider>
  );
}

export default App;
