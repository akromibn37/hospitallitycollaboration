import i18next from 'i18next';
import { authRoles } from 'app/auth';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      // {
      //   id: 'example-component',
      //   title: 'Example',
      //   translate: 'EXAMPLE',
      //   type: 'item',
      //   icon: 'whatshot',
      //   url: '/example',
      // },
      {
        id: 'permission',
        title: 'Permission',
        translate: 'PERMISSION',
        type: 'item',
        auth: authRoles.admin,
        icon: 'person',
        url: '/user/permission',
      },
      {
        id: 'users',
        title: 'Users',
        translate: 'USERS',
        type: 'item',
        auth: authRoles.user,
        icon: 'person',
        url: '/user/profile',
      },
      {
        id: 'customerProfile',
        title: 'CustomerProfile',
        translate: 'CUSTOMER-PROFILE',
        auth: authRoles.user,
        type: 'item',
        icon: 'person',
        url: '/customer-profile',
      },
      {
        id: 'customerService',
        title: 'CustomerService',
        translate: 'CUSTOMER-SERVICE',
        auth: authRoles.user,
        type: 'item',
        icon: 'person',
        url: '/customer-service',
      },
      {
        id: 'hospitality',
        title: 'Hospitality',
        translate: 'HOSPITALITY',
        auth: authRoles.user,
        type: 'item',
        icon: 'person',
        url: '/hospitality',
      },
      {
        id: 'service',
        title: 'Service',
        translate: 'SERVICE',
        auth: authRoles.user,
        type: 'item',
        icon: 'person',
        url: '/service',
      },
    ],
  },
];

export default navigationConfig;
