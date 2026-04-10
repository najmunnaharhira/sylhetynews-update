import { ReactNode } from "react";
import TopBar from "./TopBar";
import Logo from "./Logo";
import Navigation from "./Navigation";
import BreakingNews from "./BreakingNews";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Logo />
      <Navigation />
      <BreakingNews />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
