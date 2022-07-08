import { faker } from '@faker-js/faker';

export interface Person {
  id?: string;
  firstName?: string;
  lastName?: string;
  note?: string;
  profileImageUrl?: string;
  born?: string;
  deceased?: string;
  facebookLink?: string;
  //parents:  list of ids
  //children: list of ids
  //images: list of urls
  // parents?: Person[];
  // children?: Person[];
  // siblings?: Person[];
  // partners?: Person[];
}

export const emptyPerson: Person = {
  lastName: '',
  firstName: '',
  note: '',
  facebookLink: '',
  born: '',
  deceased: '',
  profileImageUrl: '',
};

export const mockPerson: Person = {
  lastName: 'Bjelke',
  firstName: 'Per Christian',
  note: 'Kul kar!',
  facebookLink: '12345678',
  born: 'ja',
  deceased: 'nei',
  profileImageUrl: '',
  id: '1',
};

const generateMockPerson = (): Person => {
  return {
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName(),
    note: faker.lorem.sentence(),
    born: '',
    deceased: '',
    facebookLink: '' + faker.datatype.number(),
    id: faker.datatype.uuid(),
    //profileImageUrl: faker.image.people(100, 100, true),
  };
};

export const generateMockPersonArray = () => {
  const persons = new Array<Person>();
  for (let i = 0; i < 10; i++) {
    persons.push(generateMockPerson());
  }
  return persons;
};
