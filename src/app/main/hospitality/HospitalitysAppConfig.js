import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { authRoles } from 'app/auth';

const HospitalitysAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  routes: [
    {
      path: '/hospitality/:id',
      component: lazy(() => import('./HospitalitysApp')),
    },
    {
      path: '/hospitality',
      component: () => <Redirect to="/hospitality/all" />,
    },
  ],
};

export default HospitalitysAppConfig;
