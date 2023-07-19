import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';
import { eAccountRouteNames } from '../enums/route-names';

export const ACCOUNT_ROUTE_PROVIDERS = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

export function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      {
        path: '/account',
        name: eAccountRouteNames.Account,
        invisible: true,
        layout: eLayoutType.account,
      },
      {
        path: '/account/login',
        name: eAccountRouteNames.Login,
        parentName: eAccountRouteNames.Account,
      },
      {
        path: '/account/register',
        name: eAccountRouteNames.Register,
        parentName: eAccountRouteNames.Account,
      },
      {
        path: '/account/forgot-password',
        name: eAccountRouteNames.ForgotPassword,
        parentName: eAccountRouteNames.Account,
      },
      {
        path: '/account/reset-password',
        name: eAccountRouteNames.ResetPassword,
        parentName: eAccountRouteNames.Account,
      },
      {
        path: '/account/email-confirmation',
        name: eAccountRouteNames.EmailConfirmation,
        parentName: eAccountRouteNames.Account,
      },
      {
        path: '/account/link-logged',
        name: eAccountRouteNames.LinkLogged,
        parentName: eAccountRouteNames.Account,
      },
      {
        path: '/account/send-security-code',
        name: eAccountRouteNames.SendSecurityCode,
        parentName: eAccountRouteNames.Account,
      },
      {
        path: '/account/manage',
        name: eAccountRouteNames.ManageProfile,
        parentName: eAccountRouteNames.Account,
        layout: eLayoutType.application,
      },
      {
        path: '/account/security-logs',
        name: eAccountRouteNames.MySecurityLogs,
        parentName: eAccountRouteNames.Account,
        layout: eLayoutType.application,
      },
    ]);
  };
}
