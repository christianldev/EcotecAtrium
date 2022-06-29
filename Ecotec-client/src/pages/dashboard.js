import AppLayout from 'components/Layouts/AppLayout';
import Navigation from 'components/Layouts/Navigation';
import MainDashboard from 'components/MainDashboard';
import SwitcherDarkMode from 'components/SwitcherDarkMode';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal,
        });

        if (response.status === 200) {
          if (isMounted) {
            setUsers(response.data);
          }
        }
      } catch (err) {
        console.error(err);
        navigate('/', { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AppLayout>
      <SwitcherDarkMode />
      {/* <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              Usuarios
            </div>
            {users?.length ? (
              <ul className="p-4">
                {users.map((user, i) => (
                  <li key={i}>
                    {user?.first_name} {user?.last_name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users to display</p>
            )}
          </div>
        </div>
      </div> */}
      <MainDashboard users={users} />
    </AppLayout>
  );
};

export default Dashboard;
