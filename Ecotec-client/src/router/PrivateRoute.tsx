import { TenantUserRole } from '@/application/enums/core/tenants/TenantUserRole';
import { UserType } from '@/application/enums/core/users/UserType';
import store, { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { logout } from '@/store/modules/authReducer';
import UserUtils from '@/utils/store/UserUtils';

interface Props {
  children: JSX.Element;
  userTypes?: UserType[];
  roles?: TenantUserRole[];
}

const PrivateRoute = ({ children, userTypes, roles }: Props) => {
  const location = useLocation();

  const authenticated = useSelector((state: RootState) => state.auth.authenticated);
  const currentType = useSelector((state: RootState) => state.account.user?.role);
  const currentRole = useSelector((state: RootState) => state.tenant.current?.currentUser.role);

  const token: any = useSelector<RootState>((state) => state.auth.access_token);

  const navigate = useNavigate();

  const decodeToken: any = jwt_decode(token);

  // console.log(userTypes);
  // console.log(currentType);

  useEffect(() => {
    if (decodeToken.exp < Date.now() / 1000) {
      store.dispatch(logout());
      UserUtils.loggedOut(navigate);
    }
  }, [decodeToken]);

  if (!authenticated) {
    const redirect = '/login?redirect=' + location.pathname;
    return <Navigate to={redirect} />;
  }

  if (userTypes && !userTypes.some((f) => f === currentType)) {
    return <Navigate to="/app/unauthorized" />;
  }

  // if (userTypes && userTypes.some((f) => f === currentType)) {
  //   return <Navigate to="/app/unauthorized" />;
  // }

  // if (roles && !roles.some((f) => f === currentRole)) {
  //   return <Navigate to="/app/unauthorized" />;
  // }

  return children;
};

export default PrivateRoute;
