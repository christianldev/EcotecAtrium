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
      {/* <SwitcherDarkMode /> */}

      <MainDashboard users={users} />
    </AppLayout>
  );
};

export default Dashboard;
