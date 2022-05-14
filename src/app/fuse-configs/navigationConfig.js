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
    id: 'usersData',
    title: 'UsersData',
    translate: 'USERDATA',
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
    ],
  },
  // {
  //   type: 'divider',
  //   id: 'divider-1',
  // },
  {
    id: 'customers',
    title: 'Customers',
    translate: 'CUSTOMERS',
    type: 'group',
    icon: 'apps',
    children: [
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
        id: 'customerBooking',
        title: 'CustomerBooking',
        translate: 'CUSTOMER-BOOKING',
        auth: authRoles.user,
        type: 'item',
        icon: 'person',
        url: '/customer-booking',
      },
    ],
  },
  {
    id: 'hospitalitys',
    title: 'Hospitalitys',
    translate: 'HOSPITALITYS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'hospitality',
        title: 'Hospitality',
        translate: 'HOSPITALITY',
        auth: authRoles.user,
        type: 'item',
        icon: 'person',
        url: '/hospitality',
      },
    ],
  },
  {
    id: 'selecterManagement',
    title: 'SelecterManagement',
    translate: 'SELECTER-MANAGEMENT',
    type: 'group',
    icon: 'apps',
    auth: authRoles.admin,
    children: [
      {
        id: 'service',
        title: 'Service',
        translate: 'SERVICE',
        auth: authRoles.admin,
        type: 'item',
        icon: 'person',
        url: '/service',
      },
      {
        id: 'hospitalityType',
        title: 'HospitalityType',
        translate: 'HOSPITALITY-TYPE',
        auth: authRoles.admin,
        type: 'item',
        icon: 'person',
        url: '/hospitalitytype',
      },
    ],
  },
];

export default navigationConfig;
