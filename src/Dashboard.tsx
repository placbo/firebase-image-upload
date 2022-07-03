import { FC, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
//import './Dashboard.css';
import { auth, logout, personsRef } from './firebase';
import { query, getDocs } from 'firebase/firestore';
import { Person } from 'types';

interface DashboardProps {
  persons: Person[];
  setPersons: any;
}

export const Dashboard: FC<DashboardProps> = ({ persons, setPersons }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllPersons = async () => {
      console.log('Fetching alll users');
      const q = query(personsRef);
      const querySnapshot = await getDocs(q);
      const tempPersons: Person[] = [];
      querySnapshot.forEach((doc) => {
        tempPersons.push(doc.data());
        console.log(doc.data());
      });
      setPersons(tempPersons);
    };
    if (loading) return;
    if (!user) return navigate('/');
    // persons.length === 0 &&
    getAllPersons();
  }, [user, loading, navigate, setPersons]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <h2>User profile</h2>
        {user && (
          <>
            Logged in as:
            <div>{user.email}</div>
            <h6>
              <img src={user.photoURL ?? ''} alt="Avatar" referrerPolicy="no-referrer" height="50" />
              {user.displayName}
            </h6>
          </>
        )}
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="dashboard__container">
        <h2>Last 10 persons</h2>
        antall personer funnet: {persons.length}
        {persons.map((person, index) => (
          <div key={index}>
            {person.firstName ?? ''} {person.lastName ?? ''} : {person.facebookLink ?? ''}
          </div>
        ))}
      </div>

      <div>
        <Link to="/newperson">Legg til ny ...</Link>
      </div>
      <div>
        <Link to="/addimage">Legg til bilde ...</Link>
      </div>
    </div>
  );
};
