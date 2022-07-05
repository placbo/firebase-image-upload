import { FC, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, logout } from '../firebaseHelper';
import { Person } from 'types/person';
import { StyleWidths } from '../theme';
import PersonResultGrid from '../components/PersonResultGrid';
import styled from '@emotion/styled';
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
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    error && console.log(error);
    if (loading) return;
    if (!user) return navigate('/');
  }, [user, loading, error, navigate]);

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
