import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyBlc-9cBQVLLXdLxYfVpgh8I3iFALoQ7E0',
  authDomain: 'todo-2ac34.firebaseapp.com',
  databaseURL: 'https://todo-2ac34.firebaseio.com',
  projectId: 'todo-2ac34',
  storageBucket: 'todo-2ac34.appspot.com',
  messagingSenderId: '144767486267',
  appId: '1:144767486267:web:53c6a77d36c83e42db4f1e',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();




const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signInWithGoogle, logout , storage};
