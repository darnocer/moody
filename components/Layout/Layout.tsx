// components/Layout/Layout.tsx
import React, { ReactNode } from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";
import { ToastProvider } from "../Context/ToastContext";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <ToastProvider>
    <div className="page min-h-screen bg-white md:bg-neutral-200">
      <Header />
      <div className="container mx-auto md:px-4 px-2 py-8 page relative max-w-2xl">
        {props.children}
      </div>
      <BottomNav />
    </div>
  </ToastProvider>
);

export default Layout;
