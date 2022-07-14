import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import Navigation from './Navigation';
import { Sidebar } from './Sidebar';

const AppLayout = ({ children }) => {
  const { auth } = useAuth();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openDropdownMenu, setOpenDropDownMenu] = useState(false);

  return (
    <>
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      <Navigation
        setOpenDropDownMenu={setOpenDropDownMenu}
        openDropdownMenu={openDropdownMenu}
      />
      {/* Sidebar */}

      {/* Page Content */}
      <section
        onClick={() => setOpenDropDownMenu(false)}
        className="px-0 py-20 md:px-6 xl:max-w-7xl xl:ml-20 lg:ml-24"
      >
        {children}
      </section>

      {openSidebar && (
        <div
          onClick={() => {
            setOpenSidebar(false);
          }}
          class="flex items-center flex-col justify-center overflow-hidden fixed inset-0 z-40"
        >
          <div class="absolute inset-0 bg-gradient-to-tr opacity-90 dark:from-gray-700 dark:via-gray-900 dark:to-gray-700 from-blue-50 via-blue-200 to-blue-50"></div>
        </div>
      )}
    </>
  );
};

export default AppLayout;
