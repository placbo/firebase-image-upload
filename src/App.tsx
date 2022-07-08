import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './Home';
import { NotPerPage } from './pages/NotPerPage';
import { createContext } from 'react';
import { generateMockPersonArray, Person } from './types/person';
export const MyPersonsContext = createContext<Person[] | null>(null);

const persons = generateMockPersonArray();

function App() {
  console.log('rendrer app!');

  return (
    <MyPersonsContext.Provider value={persons}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/notper" element={<NotPerPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </MyPersonsContext.Provider>
  );
}

export default App;
