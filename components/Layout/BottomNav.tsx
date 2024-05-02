import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const BottomNav: React.FC = () => {
  const router = useRouter();

  return (
    <div className="btm-nav">
      <Link href="/">
        <button
          className={`flex flex-col items-center ${
            router.pathname === "/" ? "" : "text-gray-400 pointer-events-none"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span className="btm-nav-label">New</span>
        </button>
      </Link>
      <Link href="/entries">
        <button
          className={`flex flex-col items-center ${
            router.pathname === "/entries"
              ? ""
              : "text-gray-400 pointer-events-none"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <span className="btm-nav-label">Entries</span>
        </button>
      </Link>
      <Link href="/factors">
        <button
          className={`flex flex-col items-center ${
            router.pathname === "/factors"
              ? ""
              : "text-gray-400 pointer-events-none"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="btm-nav-label">Habits</span>
        </button>
      </Link>
      <Link href="/profile">
        <button
          className={`flex flex-col items-center ${
            router.pathname === "/profile"
              ? ""
              : "text-gray-400 pointer-events-none"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="btm-nav-label">Profile</span>
        </button>
      </Link>
    </div>
  );
};

export default BottomNav;
