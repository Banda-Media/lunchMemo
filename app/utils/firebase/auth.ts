import getFirebase from './firebase';

export const { auth } = getFirebase();
auth.useDeviceLanguage();

export const emailRegex = /^(?=[A-Z0-9][A-Z0-9@._%+-]{5,253}$)[A-Z0-9._%+-]{1,64}@(?:(?=[A-Z0-9-]{1,63}\.)[A-Z0-9]+(?:-[A-Z0-9]+)*\.){1,8}[A-Z]{2,63}$/gim;

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
