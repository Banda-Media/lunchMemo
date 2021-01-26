import { GetUserProfilesResponse } from '@typing/api';

export const getProfiles = async (uids: string[]): Promise<GetUserProfilesResponse> => {
  const response = await fetch(`/api/users/profiles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uids }) //
  });
  return response.json();
};
