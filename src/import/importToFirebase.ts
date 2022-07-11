import { sampleData } from './sampleData';
import { Person } from '../types/person';
import { addDoc } from 'firebase/firestore';
import { personsRef } from '../firebaseHelper';

export const importSampleData = () => {
  try {
    const dataToImport = sampleData;
    dataToImport.forEach((personData: any) => {
      const person: Person = {
        id: personData[0],
        firstName: personData[1],
        lastName: personData[2],
        note: personData[3],
        facebookLink: personData[4],
        born: personData[5],
      };
      addDoc(personsRef, person).then();
    });
  } catch (error) {
    return console.error('Failed to save person');
  }
};
