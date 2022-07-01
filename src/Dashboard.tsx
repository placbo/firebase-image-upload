import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { addPerson, auth, db, get3PersonsSorted, logout, storage } from './firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const [imageToUpload, setImageToUpload] = useState<File | null>(null);
  const [personName, setPersonName] = useState('');
  const handleSubmit = () => {
    if (!imageToUpload) return;
    console.log(imageToUpload.name);
    //todo - scale images
    //todo: save thumbs as well
    const storageRef = ref(storage, `images/${v4()}`);
    uploadBytes(storageRef, imageToUpload);

    //todo
  };

  const savePerson = () => {
    addPerson({ firstName: personName });
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();

        setName(data.name);
      } catch (err) {
        console.error(err);
        alert('An error occured while fetching user data');
      }
    };
    if (loading) return;
    if (!user) return navigate('/');
    fetchUserName().then();
    get3PersonsSorted().then();
  }, [user, loading, navigate]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <h2>User profile</h2>
        {user && (
          <>
            Logged in as
            <div>{name}</div>
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
        <h2>Add person</h2>
        <input
          type="file"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setImageToUpload(event.target.files && event.target.files[0]);
          }}
          id="myFile"
          name="filename"
        />
        <button className="dashboard__btn" onClick={handleSubmit} disabled={!imageToUpload}>
          Last opp
        </button>
      </div>

      <div className="dashboard__container">
        <h2>Last 10 persons</h2>
      </div>

      <div className="dashboard__container">
        <h2>Add person</h2>
        <label>Fornavn</label>
        <input type="text" onChange={(event) => setPersonName(event.target.value)} />
        <button className="dashboard__btn" onClick={savePerson} disabled={!personName}>
          Lagre Person
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
