export const getProfiles = async (uids: string) => {
  const response = await fetch(`/api/users/getProfiles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uids }) //
  });
  return response.json();
};
