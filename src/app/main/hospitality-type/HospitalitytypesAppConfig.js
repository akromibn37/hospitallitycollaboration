import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// import { authRoles } from 'app/auth';

const HospitalitytypesAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  // auth: authRoles.user,
  routes: [
    {
      path: '/hospitalitytype/:id',
      component: lazy(() => import('./HospitalitytypesApp')),
    },
    {
      path: '/hospitalitytype',
      component: () => <Redirect to="/hospitalitytype/all" />,
    },
  ],
};

export default HospitalitytypesAppConfig;
