// /components/Layout.tsx
import React, { ReactNode } from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="page min-h-screen bg-white md:bg-neutral-200">
    <Header />
    <div className="container mx-auto md:px-4 px-2 py-8 page relative max-w-2xl">
      {props.children}
    </div>
    <BottomNav />
  </div>
);

export default Layout;
