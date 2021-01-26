// import { ApiError } from 'next/dist/next-server/server/api-utils';

// export interface ApiRequest<T> {
//   body: T;
//   method: 'POST' | 'GET' | 'PATCH' | 'DELETE';
// }

// const apiRequest: ApiRequest<T> = async <U>(body, method): U => {
//   const response = await fetch(`/api/users/getProfiles`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(body) //
//   });

//   return response;
// };
// export default apiRequest;
