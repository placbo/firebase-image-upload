export interface Community {
  id: string;
  name: string;
  note: string;
  imageUrl: string;
}

export const emptyCommunity: Community = {
  id: '',
  name: '',
  note: '',
  imageUrl: '',
};
