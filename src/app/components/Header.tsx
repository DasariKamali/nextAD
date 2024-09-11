//src/app/components/Header.tsx

"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();
  const handleLogOutClick = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <header>
      {session ? (
        <>
          <p>Welcome, {session.user?.email || "User"}</p>
          <button onClick={handleLogOutClick}>Logout</button>
        </>
      ) : (
        <p>You are not logged in</p>
      )}
    </header>
  );
};
export default Header;
