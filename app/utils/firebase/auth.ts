import getFirebase from './firebase';

export const { auth } = getFirebase();
auth.useDeviceLanguage();

export const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const clientPostUserToken = async (token: string) => {
  const response = await fetch(`/api/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token }) //
  });
  return response.json();
};

export const backendVerifyUserToken = async (baseApiUrl: string, token: string) => {
  const response = await fetch(`${baseApiUrl}/auth/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token }) //
  });
  return response.json();
};
