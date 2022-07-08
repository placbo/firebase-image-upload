import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './Home';
import { NotPerPage } from './pages/NotPerPage';
import { createContext, useEffect, useState, Dispatch } from 'react';
import { generateMockPersonArray, Person } from './types/person';

export const MyPersonsContext = createContext<Person[] | null>(null);

export const LanguageContext = createContext<any>({} as any); //jukser (https://stackoverflow.com/questions/61333188/react-typescript-avoid-context-default-value)

const persons = generateMockPersonArray();

function App() {
  const [language, setLanguage] = useState('en');
  const value = { language, setLanguage };

  console.log(language);

  return (
    <MyPersonsContext.Provider value={persons}>
      <LanguageContext.Provider value={value}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/notper" element={<NotPerPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </LanguageContext.Provider>
    </MyPersonsContext.Provider>
  );
}

export default App;
