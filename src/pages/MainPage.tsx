import { FC, useContext } from 'react';
import { StyleWidths } from '../theme';
import PersonResultGrid from '../components/PersonResultGrid';
import styled from '@emotion/styled';
import HeadingWithLine from '../components/HeadingWithLine';
import { PersonsContext } from '../App';

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${StyleWidths.content};
  flex-grow: 1;
  width: 100%;
  margin-top: 1rem;
`;

export const MainPage: FC = () => {
  const { persons } = useContext(PersonsContext);

  return (
    <StyledLayout>
      {/*<pre style={{ maxWidth: '90%' }}>{JSON.stringify(persons, null, 2)}</pre>*/}

      <HeadingWithLine text="Sist registrerte"></HeadingWithLine>
      {persons && <PersonResultGrid persons={persons} />}
    </StyledLayout>
  );
};
