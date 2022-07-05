export interface Person {
  id?: number;
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
