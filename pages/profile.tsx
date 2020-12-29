import fire from '../services/firebase';
// import nookies from 'nookies';

// export const getServerSideProps = async (ctx) => {
//   try {
//     const cookies = nookies.get(ctx);
//     console.log(fire);
//     const token = await fire.auth.verifyIdToken(cookies.token);
//     const { uid, email } = token;

//     return {
//       props: { message: `Your email is ${email} and your UID is ${uid}.` }
//     };
//   } catch (err) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/login'
//       },
//       props: {}
//     };
//   }
// };

const ProfilePage: React.FC = () => (
  <div>
    <p>You are soooooo authenticated.</p>
    <button
      onClick={async () => {
        await fire.user.logout();
        window.location.href = '/';
      }}>
      Sign out
    </button>
  </div>
);

export default ProfilePage;
