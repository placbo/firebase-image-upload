import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { HomePage } from './HomePage';
import { NotPerPage } from './pages/NotPerPage';
import { createContext, useState } from 'react';

export const PersonsContext = createContext<any>({} as any); //jukser (https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value)
export const CommunitiesContext = createContext<any>({} as any); //jukser (https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value)

function App() {
  const [persons, setPersons] = useState([]);
  const personsContextValue = { persons, setPersons };

  const [communities, setCommunities] = useState([]);
  const communitiesContextValue = { communities, setCommunities };

  return (
    <PersonsContext.Provider value={personsContextValue}>
      <CommunitiesContext.Provider value={communitiesContextValue}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/notper" element={<NotPerPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Router>
      </CommunitiesContext.Provider>
    </PersonsContext.Provider>
  );
}

export default App;
