import { NAVIGATE_TO_MANAGE_PROFILE } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { NAVIGATE_TO_MY_SECURITY_LOGS } from '@volo/abp.commercial.ng.ui/config';
import { ACCOUNT_MANAGE_PROFILE_TAB_PROVIDERS } from './providers/manage-profile-tab.provider';
import { ACCOUNT_ROUTE_PROVIDERS } from './providers/route.provider';
import { ManageProfileTabsService } from './services/manage-profile-tabs.service';
import { navigateToManageProfileFactory, navigateToMySecurityLogsFactory } from './utils/factories';

@NgModule({
  imports: [CommonModule],
  exports: [],
  declarations: [],
})
export class AccountPublicConfigModule {
  static forRoot(): ModuleWithProviders<AccountPublicConfigModule> {
    return {
      ngModule: AccountPublicConfigModule,
      providers: [
        ACCOUNT_ROUTE_PROVIDERS,
        ManageProfileTabsService,
        ACCOUNT_MANAGE_PROFILE_TAB_PROVIDERS,
        {
          provide: NAVIGATE_TO_MANAGE_PROFILE,
          useFactory: navigateToManageProfileFactory,
          deps: [Injector],
        },
        {
          provide: NAVIGATE_TO_MY_SECURITY_LOGS,
          useFactory: navigateToMySecurityLogsFactory,
          deps: [Injector],
        },
      ],
    };
  }
}
