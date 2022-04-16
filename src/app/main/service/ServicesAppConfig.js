import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// import { authRoles } from 'app/auth';

const ServicesAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  // auth: authRoles.user,
  routes: [
    {
      path: '/service/:id',
      component: lazy(() => import('./ServicesApp')),
    },
    {
      path: '/service',
      component: () => <Redirect to="/service/all" />,
    },
  ],
};

export default ServicesAppConfig;
