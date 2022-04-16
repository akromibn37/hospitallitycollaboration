import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// import { authRoles } from 'app/auth';

const CustomerProfilesAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  // auth: authRoles.user,
  routes: [
    {
      path: '/customer-profile/:id',
      component: lazy(() => import('./CustomerProfilesApp')),
    },
    {
      path: '/customer-profile',
      component: () => <Redirect to="/customer-profile/all" />,
    },
  ],
};

export default CustomerProfilesAppConfig;
