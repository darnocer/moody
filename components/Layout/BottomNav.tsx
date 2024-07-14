import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useToast } from "../Context/ToastContext";

const BottomNav: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { showToast } = useToast();

  const handleEntriesClick = (e: React.MouseEvent) => {
    if (status !== "authenticated") {
      e.preventDefault();
      showToast("Please log in to access entries.");
    }
  };

  return (
    <div className="btm-nav flex justify-center items-center py-2 space-x-4 border-t border-gray-300">
      <Link href="/">
        <button
          className={`flex flex-col items-center ${
            router.pathname === "/" ? "text-black" : "text-gray-400"
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

      {/* <div className="border-l border-gray-300 h-6"></div> */}

      <Link href="/entries">
        <button
          onClick={handleEntriesClick}
          className={`flex flex-col items-center ${
            router.pathname === "/entries" ? "text-black" : "text-gray-400"
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
    </div>
  );
};

export default BottomNav;
