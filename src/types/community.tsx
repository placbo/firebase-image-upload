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
