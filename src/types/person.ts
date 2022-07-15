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

export const mockPerson: Person = {
  lastName: 'Bjelke',
  firstName: 'Per Christian',
  note: 'Kul kar!',
  facebookLink: '12345678',
  born: 'ja',
  deceased: 'nei',
  profileImageUrl: '',
};
