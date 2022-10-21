import { UserLoggedResponse } from '@/application/contracts/core/users/UserLoggedResponse';
import { UserDto } from '@/application/dtos/core/users/UserDto';
import { UserType } from '@/application/enums/core/users/UserType';
import i18n from '@/locale/i18n';
import store from '@/store';
import { resetAccountState, setLogged, setRole } from '@/store/modules/accountReducer';
import { resetAppState } from '@/store/modules/appReducer';
import { login, logout } from '@/store/modules/authReducer';
import { resetPricingState } from '@/store/modules/pricingReducer';
import { setMyTenants, setCurrent, resetTenantState } from '@/store/modules/tenantReducer';
import { NavigateFunction } from 'react-router';

const avatarText = (user: UserDto | null): string => {
  if (user) {
    if (user.first_name && user.last_name) {
      if (user.first_name.length > 0 && user.last_name.length > 0) {
        return (user.first_name[0] + user.last_name[0]).toUpperCase();
      } else if (user.first_name.length > 1) {
        return user.first_name.substring(0, 2).toUpperCase();
      } else if (user.email.length > 1) {
        return user.email.substring(0, 2).toUpperCase();
      }
    } else if (user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
  }
  return '--';
};

const profileName = (user: UserDto | null): string => {
  if (user) {
    if (user.first_name && user.last_name) {
      return user.first_name + ' ' + user.last_name;
    } else {
      return user.email;
    }
  }
  return '--';
};

const logged = (response: UserLoggedResponse, navigate: NavigateFunction) => {
  console.log('logged', response);
  store.dispatch(login(response));
  const role = response.user.role.includes('admin') ? UserType.Admin : UserType.User;
  const currentTenant = response.user.currentTenant;
  store.dispatch(setLogged(response.user));
  store.dispatch(setRole(role));
  store.dispatch(setCurrent(currentTenant));
  if (response.user.locale) {
    localStorage.setItem('locale', response.user.locale);
    i18n.changeLanguage(response.user.locale ?? 'en');
  }

  const redirect = new URLSearchParams(location.search).get('redirect');
  if (redirect) {
    navigate(redirect);
  } else {
    if ((response.user as UserDto).type === UserType.Admin && import.meta.env.VITE_REACT_APP_SERVICE !== 'sandbox') {
      navigate('/admin');
    } else {
      navigate('/app/dashboard');
    }
  }
};

const loggedOut = (navigate: NavigateFunction) => {
  store.dispatch(logout());
  store.dispatch(resetAccountState());
  store.dispatch(resetPricingState());
  store.dispatch(resetTenantState());
  store.dispatch(resetAppState());
  localStorage.clear();
  navigate('/');
};

export default {
  avatarText,
  profileName,
  logged,
  loggedOut,
};
