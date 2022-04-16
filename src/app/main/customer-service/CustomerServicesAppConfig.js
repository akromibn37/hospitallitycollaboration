import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// import { authRoles } from 'app/auth';

const CustomerServicesAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  // auth: authRoles.user,
  routes: [
    {
      path: '/customer-service/:id',
      component: lazy(() => import('./CustomerServicesApp')),
    },
    {
      path: '/customer-service',
      component: () => <Redirect to="/customer-service/all" />,
    },
  ],
};

export default CustomerServicesAppConfig;
