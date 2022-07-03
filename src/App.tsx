import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import { Dashboard } from './Dashboard';
import { useState } from 'react';
import { Person } from 'types';
import NewUser from 'NewUser';
import { AddImage } from 'AddImage';

function App() {
  const [persons, setPersons] = useState<Person[]>([]);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard persons={persons} setPersons={setPersons} />} />
          <Route path="/newperson" element={<NewUser />} />
          <Route path="/addimage" element={<AddImage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
