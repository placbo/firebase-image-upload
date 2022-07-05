import { FC, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, logout } from '../firebase';
import { Person } from 'types/person';
import { StyleWidths } from '../theme';
import PersonResultGrid from '../components/PersonResultGrid';
import styled from 'styled-components';
import HeadingWithLine from '../components/HeadingWithLine';

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${StyleWidths.content};
  flex-grow: 1;
  width: 100%;
  margin-top: 1rem;
`;

interface MainPageProps {
  persons: Person[];
}

export const MainPage: FC<MainPageProps> = ({ persons }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
  }, [user, loading, navigate]);

  return (
    <div className="dashboard">
      <StyledLayout>
        <HeadingWithLine text="Sist registrerte"></HeadingWithLine>
        {persons && <PersonResultGrid persons={persons} />}
      </StyledLayout>

      {user ? (
        <span>{`Logged in as:${user.email}`}</span>
      ) : (
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      )}

      <div>
        <Link to="/newperson">Legg til ny ...</Link>
      </div>
      <div>
        <Link to="/addimage">Legg til bilde ...</Link>
      </div>
    </div>
  );
};
