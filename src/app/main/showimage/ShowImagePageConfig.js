import { lazy } from 'react';

const ShowImagePageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/image/transaction/:transId',
      component: lazy(() => import('./ShowImageTransactionPage')),
    },
    {
      path: '/image/document/:docId',
      component: lazy(() => import('./ShowImageDocumentPage')),
    },
  ],
};

export default ShowImagePageConfig;
