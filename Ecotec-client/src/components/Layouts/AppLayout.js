import useAuth from 'hooks/useAuth';
import Navigation from './Navigation';
import { Sidebar } from './Sidebar';

const AppLayout = ({ children }) => {
  const { auth } = useAuth();

  return (
    <div className="bg-gray-900 h-screen overflow-hidden relative ">
      <Sidebar />

      <div className="flex flex-col h-screen pl-0 w-full lg:pl-20 lg:space-y-4">
        <Navigation />
        {/* Sidebar */}

        {/* Page Content */}
        <main className="h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 md:pt-4 lg:pt-0 lg:px-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
