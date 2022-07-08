import { FC } from 'react';
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
  return (
    <StyledLayout>
      <HeadingWithLine text="Sist registrerte"></HeadingWithLine>
      {persons && <PersonResultGrid persons={persons} />}
    </StyledLayout>
  );
};
