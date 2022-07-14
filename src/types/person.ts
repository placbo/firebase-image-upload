import { faker } from '@faker-js/faker';

export interface Person {
  id?: string;
  old_id?: string;
  firstName?: string;
  lastName?: string;
  note?: string;
  profileImageUrl?: string;
  born?: string;
  deceased?: string;
  facebookLink?: string;
  //groups
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
