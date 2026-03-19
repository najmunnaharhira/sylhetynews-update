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
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar />
      <Logo />
      <Navigation />
      <BreakingNews />
      <main className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(185,28,28,0.09),transparent_58%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-32 h-64 bg-[radial-gradient(circle_at_right,rgba(15,23,42,0.08),transparent_55%)]" />
        <div className="relative">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
