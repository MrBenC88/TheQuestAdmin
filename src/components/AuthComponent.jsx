import { signIn, signOut, useSession } from "next-auth/react";

const AuthComponent = () => {
  const { data: session, status } = useSession();
  console.log(session);
  console.log(session?.user?.email);

  return (
    <div>
      {!session && (
        <>
          Not signed in. <br />
          <button onClick={() => signIn("google")}>Sign in with Google</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email}. <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default AuthComponent;
