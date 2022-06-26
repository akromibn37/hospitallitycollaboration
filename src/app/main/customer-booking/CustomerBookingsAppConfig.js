import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { authRoles } from 'app/auth';

const CustomerBookingsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.staff,
  // auth: authRoles.user,
  routes: [
    {
      path: '/customer-booking/:id',
      component: lazy(() => import('./CustomerBookingsApp')),
    },
    {
      path: '/customer-booking',
      component: () => <Redirect to="/customer-booking/all" />,
    },
  ],
};

export default CustomerBookingsAppConfig;
