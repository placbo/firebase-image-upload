export interface Person {
  id?: number;
  firstName?: string;
  lastName?: string;
  note?: string;
  profileImageUrl?: string;
  born?: Date;
  deceased?: Date;
  facebookLink?: string;
  //parents:  list of ids
  //children: list of ids
  //images: list of urls
}
