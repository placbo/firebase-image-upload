import { personsRef } from 'firebase';
import { addDoc } from 'firebase/firestore';
import { emptyPerson, Person } from 'types';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

function NewUser() {
  const navigate = useNavigate();

  const addPerson = async (person: Person) => {
    try {
      await addDoc(personsRef, person);
    } catch (error) {
      return console.error('Failed to save person');
    }
    return navigate('/');
  };

  return (
    <div className="dashboard">
      <div className="dashboard__container">
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
              <button type="submit" className="dashboard__btn">
                Legg til
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default NewUser;
