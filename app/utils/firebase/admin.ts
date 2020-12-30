import * as admin from 'firebase-admin';
import serviceAccount from './serviceaccount.json';

const getFirebaseAdmin = async () => {
  if (!serviceAccount) {
    throw new Error('Must include serviceaccount.json file in the utils/firebase directory.');
  }
  const params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
  };

  if (!admin.apps.length) {
    await admin.initializeApp({
      credential: admin.credential.cert(params),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    });
  }

  return admin;
};

export default getFirebaseAdmin;
