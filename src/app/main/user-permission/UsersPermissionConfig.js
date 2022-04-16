import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { authRoles } from 'app/auth';

const UsersPermissionConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: '/user/permission/:id',
      component: lazy(() => import('./UsersPermission')),
    },
    {
      path: '/user/permission',
      component: () => <Redirect to="/user/permission/all" />,
    },
  ],
};

export default UsersPermissionConfig;
