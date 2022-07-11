import { emptyPerson, Person } from 'types/person';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { FC, useContext } from 'react';
import { PersonsContext } from '../App';
import { faker } from '@faker-js/faker';
// import {addDoc} from "firebase/firestore";
// import {personsRef} from "../firebaseHelper";

export const NewUser: FC = () => {
  const { setPersons } = useContext(PersonsContext);
  const navigate = useNavigate();

  const addPerson = async (person: Person) => {
    // try {
    //   await addDoc(personsRef, person);
    // } catch (error) {
    //   return console.error('Failed to save person');
    // }
    const newId = faker.datatype.uuid();
    setPersons((currentState: Person[]) => [...currentState, { ...person, id: newId }]);

    return navigate('/');
  };

  return (
    <div>
      <div>
        <h2>Legg til ny person</h2>
        <Formik
          initialValues={emptyPerson}
          onSubmit={(values) => {
            addPerson(values);
          }}>
          <Form>
            <div>
              <label htmlFor="firstName">First Name</label>
              <Field id="firstName" name="firstName" />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <Field id="lastName" name="lastName" />
            </div>

            <div>
              <label htmlFor="note">Note</label>
              <Field id="note" name="note" />
            </div>

            <div>
              <label htmlFor="facebookLink">Facebook</label>
              <Field id="facebookLink" name="facebookLink" />
            </div>

            <div>
              <button type="submit">Legg til</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
