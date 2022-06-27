import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/404/Error404Page';
import RegisterConfig from 'app/main/register/RegisterConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import UsersAppConfig from 'app/main/user/UsersAppConfig';
import ShowImagePageConfig from 'app/main/showimage/ShowImagePageConfig';
import UsersPermissionConfig from 'app/main/user-permission/UsersPermissionConfig';
import SubmitConfig from 'app/main/customer-submit/SubmitConfig';
import ServicesAppConfig from 'app/main/service/ServicesAppConfig';
import HospitalitysAppConfig from 'app/main/hospitality/HospitalitysAppConfig';
import HospitalityTypesAppConfig from 'app/main/hospitality-type/HospitalitytypesAppConfig';
import CustomerProfilesApp from 'app/main/customer-profile/CustomerProfilesAppConfig';
import CustomerServicesApp from 'app/main/customer-service/CustomerServicesAppConfig';
import CustomerBookingsApp from 'app/main/customer-booking/CustomerBookingsAppConfig';

const routeConfigs = [
  ExampleConfig,
  RegisterConfig,
  LoginConfig,
  UsersAppConfig,
  ShowImagePageConfig,
  UsersPermissionConfig,
  SubmitConfig,
  ServicesAppConfig,
  HospitalitysAppConfig,
  CustomerProfilesApp,
  CustomerServicesApp,
  HospitalityTypesAppConfig,
  CustomerBookingsApp,
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/submit" />,
  },
  {
    path: '/loading',
    exact: true,
    component: () => <FuseLoading />,
  },
  {
    path: '/404',
    component: () => <Error404Page />,
  },
  {
    component: () => <Redirect to="/404" />,
  },
];

export default routes;
