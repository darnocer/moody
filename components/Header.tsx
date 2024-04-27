import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            {session && (
              <div className="space-x-4">
                <Link
                  href="/"
                  className={`text-gray-800 hover:text-gray-600 ${
                    isActive("/") ? "font-bold" : ""
                  }`}
                >
                  New Entry
                </Link>
                <Link
                  href="/factors"
                  className={`text-gray-800 hover:text-gray-600 ${
                    isActive("/factors") ? "font-bold" : ""
                  }`}
                >
                  Additional Factors
                </Link>
                <Link
                  href="/entries"
                  className={`text-gray-800 hover:text-gray-600 ${
                    isActive("/entries") ? "font-bold" : ""
                  }`}
                >
                  Mood Entries
                </Link>
              </div>
            )}
          </div>
          <div>
            {!session && (
              <Link
                href="/api/auth/signin"
                className="text-gray-800 hover:text-gray-600"
              >
                Log In
              </Link>
            )}
            {session && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
