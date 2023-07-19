import {
  AuthGuard,
  ReplaceableComponents,
  ReplaceableRouteContainerComponent,
  RouterOutletComponent,
} from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LinkLoggedComponent } from './components/link-logged/link-logged.component';
import { LoginComponent } from './components/login/login.component';
import { ManageProfileComponent } from './components/manage-profile/manage-profile.component';
import { MySecurityLogsComponent } from './components/my-security-logs/my-security-logs.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SendSecurityCodeComponent } from './components/send-securiy-code/send-security-code.component';
import { eAccountComponents } from './enums/components';
import { AuthenticationFlowGuard } from './guards/authentication-flow.guard';
import { AccountExtensionsGuard } from './guards/extensions.guard';
import { SecurityCodeGuard } from './guards/security-code.guard';
import { ManageProfileResolver } from './resolvers/manage-profile.resolver';
import { RefreshPasswordComponent } from './components/refresh-password/refresh-password.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: '',
    component: RouterOutletComponent,
    canActivate: [AccountExtensionsGuard],
    children: [
      {
        path: 'login',
        component: ReplaceableRouteContainerComponent,
        canActivate: [AuthenticationFlowGuard],
        data: {
          replaceableComponent: {
            key: eAccountComponents.Login,
            defaultComponent: LoginComponent,
          } as ReplaceableComponents.RouteData<LoginComponent>,
        },
      },
      {
        path: 'register',
        component: ReplaceableRouteContainerComponent,
        canActivate: [AuthenticationFlowGuard],
        data: {
          replaceableComponent: {
            key: eAccountComponents.Register,
            defaultComponent: RegisterComponent,
          } as ReplaceableComponents.RouteData<RegisterComponent>,
        },
      },
      {
        path: 'forgot-password',
        component: ReplaceableRouteContainerComponent,
        canActivate: [AuthenticationFlowGuard],
        data: {
          replaceableComponent: {
            key: eAccountComponents.ForgotPassword,
            defaultComponent: ForgotPasswordComponent,
          } as ReplaceableComponents.RouteData<ForgotPasswordComponent>,
        },
      },
      {
        path: 'reset-password',
        component: ReplaceableRouteContainerComponent,
        canActivate: [AuthenticationFlowGuard],
        data: {
          tenantBoxVisible: false,
          replaceableComponent: {
            key: eAccountComponents.ResetPassword,
            defaultComponent: ResetPasswordComponent,
          } as ReplaceableComponents.RouteData<ResetPasswordComponent>,
        },
      },
      {
        path: 'email-confirmation',
        component: ReplaceableRouteContainerComponent,
        data: {
          tenantBoxVisible: false,
          replaceableComponent: {
            key: eAccountComponents.EmailConfirmation,
            defaultComponent: EmailConfirmationComponent,
          } as ReplaceableComponents.RouteData<EmailConfirmationComponent>,
        },
      },
      {
        path: 'link-logged',
        component: ReplaceableRouteContainerComponent,
        data: {
          tenantBoxVisible: false,
          replaceableComponent: {
            key: eAccountComponents.LinkLogged,
            defaultComponent: LinkLoggedComponent,
          } as ReplaceableComponents.RouteData<LinkLoggedComponent>,
        },
      },
      {
        path: 'send-security-code',
        component: ReplaceableRouteContainerComponent,
        canActivate: [SecurityCodeGuard],
        data: {
          tenantBoxVisible: false,
          replaceableComponent: {
            key: eAccountComponents.SendSecurityCode,
            defaultComponent: SendSecurityCodeComponent,
          } as ReplaceableComponents.RouteData<SendSecurityCodeComponent>,
        },
      },
      {
        path: 'manage',
        component: ReplaceableRouteContainerComponent,
        canActivate: [AuthGuard],
        resolve: {
          manageProfile: ManageProfileResolver,
        },
        data: {
          replaceableComponent: {
            key: eAccountComponents.ManageProfile,
            defaultComponent: ManageProfileComponent,
          } as ReplaceableComponents.RouteData<ManageProfileComponent>,
        },
      },
      {
        path: 'security-logs',
        component: ReplaceableRouteContainerComponent,
        canActivate: [AuthGuard],
        data: {
          replaceableComponent: {
            key: eAccountComponents.MySecurityLogs,
            defaultComponent: MySecurityLogsComponent,
          } as ReplaceableComponents.RouteData<MySecurityLogsComponent>,
        },
      },
      {
        path: 'change-password',
        component: ReplaceableRouteContainerComponent,
        data: {
          replaceableComponent: {
            key: eAccountComponents.RefreshPassword,
            defaultComponent: RefreshPasswordComponent,
          } as ReplaceableComponents.RouteData<RefreshPasswordComponent>,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPublicRoutingModule {}
