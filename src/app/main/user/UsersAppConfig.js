import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const UsersAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  // auth: authRoles.admin,
  routes: [
    {
      path: '/user/profile/:id',
      component: lazy(() => import('./UsersApp')),
    },
    {
      path: '/user/profile',
      component: () => <Redirect to="/user/profile/all" />,
    },
  ],
};

export default UsersAppConfig;
