import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <header>
      <nav className="mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {!session && (
            <div className="flex justify-end w-full">
              <Link
                href="/api/auth/signin"
                className="text-gray-800 hover:text-gray-600"
              >
                Log In
              </Link>
            </div>
          )}
          {session && session.user && (
            <div className="flex items-center justify-between w-full">
              <span className="text-gray-500 sm:hidden">
                {session.user.name}
              </span>
              <span className="text-gray-500 hidden sm:block">
                {session.user.name} ({session.user.email})
              </span>
              <button
                onClick={() => signOut()}
                className="text-gray-800 hover:text-gray-600"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
