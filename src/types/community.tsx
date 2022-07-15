import { faker } from '@faker-js/faker';

export interface Community {
  id?: string;
  old_id?: string;
  name?: string;
  note?: string;
  imageUrl?: string;
}

export const emptyCommunity: Community = {
  id: '',
  old_id: '',
  name: '',
  note: '',
  imageUrl: '',
};

const generateMockCommunity = (): Community => {
  return {
    id: faker.datatype.uuid(),
    old_id: faker.datatype.uuid(),
    name: faker.company.companyName(),
    note: faker.lorem.sentence(),
    imageUrl: faker.image.people(100, 100, true),
  };
};

export const generateMockCommunityArray = () => {
  const community = new Array<Community>();
  for (let i = 0; i < 10; i++) {
    community.push(generateMockCommunity());
  }
  return community;
};
