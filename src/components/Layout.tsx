
import { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className = '' }: LayoutProps) => {
  // Force dark mode on layout mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-navy text-gray-100">
      <Header />
      <main className={`flex-1 pt-16 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
