import { samplePersonData } from './samplePersonData';
import { communityData } from './communityData';
import { Person } from '../types/person';
import { addDoc } from 'firebase/firestore';
import { communityRef, personsRef } from '../firebase/firebaseHelper';
import { Community } from '../types/community';

export const importPersonData = () => {
  try {
    const dataToImport = samplePersonData;
    dataToImport.forEach((personData: any) => {
      const person: Person = {
        old_id: personData[0],
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

export const importCommunityData = () => {
  try {
    const dataToImport = communityData;
    dataToImport.forEach((communityData: any) => {
      const community: Community = {
        old_id: communityData[0],
        name: communityData[1],
        note: '',
        imageUrl: '',
      };
      addDoc(communityRef, community).then();
    });
  } catch (error) {
    return console.error('Failed to save person');
  }
};
