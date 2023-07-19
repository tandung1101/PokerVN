import { CoreModule, noop } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { APP_INITIALIZER, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import {
  OPEN_AUTHORITY_DELEGATION_MODAL,
  OPEN_MY_LINK_USERS_MODAL,
} from '@volo/abp.commercial.ng.ui/config';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { IdentitySettingsComponent } from './components/identity-settings.component';
import { MyLinkUsersModalComponent } from './components/my-link-users-modal.component';
import { IDENTITY_ROUTE_PROVIDERS } from './providers/route.provider';
import { IDENTITY_SETTING_TAB_PROVIDERS } from './providers/setting-tab.provider';
import { openAuthorityDelegationFactory, openMyLinkUsersFactory } from './utils/factories';
import { LinkLoginHandler } from './handlers/link-login.handler';
import { IdentitySettingComponent } from './components/identity-setting-tabs/identity-setting.component';
import { IdentityExternalLoginSettingsComponent } from './components/identity-setting-tabs/identity-external-login-settings.component';
import { IdentityLdapSettingsComponent } from './components/identity-setting-tabs/identity-ldap-settings.component';
import { AuthorityDelegationModule } from './components/authority-delegation/authority-delegation.module';

const declarationsWithExports = [
  IdentitySettingsComponent,
  IdentitySettingComponent,
  IdentityExternalLoginSettingsComponent,
  IdentityLdapSettingsComponent,
  MyLinkUsersModalComponent,
];

@NgModule({
  imports: [
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgbNavModule,
    NgxValidateCoreModule,
    AuthorityDelegationModule,
  ],
  declarations: [...declarationsWithExports],
  exports: [...declarationsWithExports],
})
export class IdentityConfigModule {
  static forRoot(): ModuleWithProviders<IdentityConfigModule> {
    return {
      ngModule: IdentityConfigModule,
      providers: [
        IDENTITY_ROUTE_PROVIDERS,
        IDENTITY_SETTING_TAB_PROVIDERS,
        { provide: OPEN_MY_LINK_USERS_MODAL, useFactory: openMyLinkUsersFactory, deps: [Injector] },
        {
          provide: OPEN_AUTHORITY_DELEGATION_MODAL,
          useFactory: openAuthorityDelegationFactory,
          deps: [Injector],
        },
        { provide: APP_INITIALIZER, multi: true, useFactory: noop, deps: [LinkLoginHandler] },
      ],
    };
  }
}
