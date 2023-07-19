import { PageModule } from '@abp/ng.components/page';
import { CoreModule, LazyModuleFactory } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { ModuleWithProviders, NgModule, NgModuleFactory } from '@angular/core';
import {
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbPopoverModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';
import { AccountPublicRoutingModule } from './account-public-routing.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LinkLoggedComponent } from './components/link-logged/link-logged.component';
import { LoginComponent } from './components/login/login.component';
import { ManageProfileComponent } from './components/manage-profile/manage-profile.component';
import { MySecurityLogsComponent } from './components/my-security-logs/my-security-logs.component';
import { PersonalSettingsVerifyButtonComponent } from './components/personal-settings/personal-settings-verify-button/personal-settings-verify-button.component';
import { PersonalSettingsComponent } from './components/personal-settings/personal-settings.component';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SendSecurityCodeComponent } from './components/send-securiy-code/send-security-code.component';
import { TwoFactorTabComponent } from './components/two-factor-tab/two-factor-tab.component';
import { AuthenticationFlowGuard } from './guards/authentication-flow.guard';
import { AccountExtensionsGuard } from './guards/extensions.guard';
import { SecurityCodeGuard } from './guards/security-code.guard';
import { AccountConfigOptions } from './models/config-options';
import { ManageProfileResolver } from './resolvers/manage-profile.resolver';
import { SecurityCodeService } from './services/security-code.service';
import { ACCOUNT_CONFIG_OPTIONS } from './tokens/config-options.token';
import {
  ACCOUNT_ENTITY_ACTION_CONTRIBUTORS,
  ACCOUNT_ENTITY_PROP_CONTRIBUTORS,
  ACCOUNT_TOOLBAR_ACTION_CONTRIBUTORS,
} from './tokens/extensions.token';
import { accountOptionsFactory } from './utils/factory-utils';
import { PersonalSettingsHalfRowComponent } from './components/personal-settings/personal-settings-half-row/personal-settings-half-row.component';
import { PersonalSettingsEmailComponent } from './components/personal-settings/personal-settings-email/personal-settings-email.component';
import { PersonalSettingsPhoneNumberComponent } from './components/personal-settings/personal-settings-phone-number/personal-settings-phone-number.component';
import { RE_LOGIN_CONFIRMATION_TOKEN } from './tokens';
import { RefreshPasswordComponent } from './components/refresh-password/refresh-password.component';

const declarations = [
  ChangePasswordComponent,
  RefreshPasswordComponent,
  EmailConfirmationComponent,
  ForgotPasswordComponent,
  LinkLoggedComponent,
  LoginComponent,
  ManageProfileComponent,
  MySecurityLogsComponent,
  PersonalSettingsComponent,
  PersonalSettingsVerifyButtonComponent,
  ProfilePictureComponent,
  RegisterComponent,
  ResetPasswordComponent,
  SendSecurityCodeComponent,
  TwoFactorTabComponent,
  PersonalSettingsHalfRowComponent,
  PersonalSettingsEmailComponent,
  PersonalSettingsPhoneNumberComponent,
];

@NgModule({
  declarations: [...declarations],
  exports: [...declarations],
  imports: [
    CoreModule,
    CommercialUiModule,
    AccountPublicRoutingModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    NgbPopoverModule,
    NgbDatepickerModule,
    NgbTooltipModule,
    PageModule,
  ],
})
export class AccountPublicModule {
  static forChild(options: AccountConfigOptions): ModuleWithProviders<AccountPublicModule> {
    return {
      ngModule: AccountPublicModule,
      providers: [
        { provide: ACCOUNT_CONFIG_OPTIONS, useValue: options },
        {
          provide: 'ACCOUNT_OPTIONS',
          useFactory: accountOptionsFactory,
          deps: [ACCOUNT_CONFIG_OPTIONS],
        },
        {
          provide: ACCOUNT_ENTITY_ACTION_CONTRIBUTORS,
          useValue: options.entityActionContributors,
        },
        {
          provide: ACCOUNT_TOOLBAR_ACTION_CONTRIBUTORS,
          useValue: options.toolbarActionContributors,
        },
        {
          provide: ACCOUNT_ENTITY_PROP_CONTRIBUTORS,
          useValue: options.entityPropContributors,
        },
        AccountExtensionsGuard,
        AuthenticationFlowGuard,
        ManageProfileResolver,
        SecurityCodeService,
        SecurityCodeGuard,
        {
          provide: RE_LOGIN_CONFIRMATION_TOKEN,
          useValue: options.isPersonalSettingsChangedConfirmationActive ?? true,
        },
      ],
    };
  }

  static forLazy(options: AccountConfigOptions = {}): NgModuleFactory<AccountPublicModule> {
    return new LazyModuleFactory(AccountPublicModule.forChild(options));
  }
}
