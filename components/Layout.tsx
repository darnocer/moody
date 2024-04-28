// /components/Layout.tsx
import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="min-h-screen bg-base-200">
    <Header />
    <div className="container mx-auto px-4 py-8">{props.children}</div>
  </div>
);

export default Layout;
