import getFirebase from './firebase';
import { ApiTokenResponse, ApiTokenVerificationResponse } from '@typing/types';

export const { auth } = getFirebase();
auth.useDeviceLanguage();

export const createSessionToken = async (
  baseApiUrl: string,
  token: string
): Promise<ApiTokenResponse> => {
  const response = await fetch(`${baseApiUrl}/auth/createSessionToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }) //
  });
  return response.json();
};

export const verifySessionToken = async (
  baseApiUrl: string,
  token: string
): Promise<ApiTokenVerificationResponse> => {
  const response = await fetch(`${baseApiUrl}/auth/verifySessionToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }) //
  });
  return response.json();
};
