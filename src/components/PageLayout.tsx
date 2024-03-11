import * as React from "react";
import Footer from "./Footer";
import { Header } from "./common/Header";

export interface PageLayoutProps {
  children?: React.ReactNode;
  _site?: any;
}

const PageLayout = ({ children, _site }: PageLayoutProps) => {
  return (
    <div className="min-h-screen">
      {children}
      <Footer _site={_site} />
    </div>
  );
};

export default PageLayout;
