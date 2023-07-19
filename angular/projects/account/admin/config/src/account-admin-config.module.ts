import { CoreModule } from '@abp/ng.core';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AccountSettingsModule } from '@volo/abp.ng.account/admin';
import { ACCOUNT_SETTING_TAB_PROVIDERS } from './providers/setting-tab.provider';

@NgModule({
  imports: [CoreModule, AccountSettingsModule],
  exports: [AccountSettingsModule],
  declarations: [],
})
export class AccountAdminConfigModule {
  static forRoot(): ModuleWithProviders<AccountAdminConfigModule> {
    return {
      ngModule: AccountAdminConfigModule,
      providers: [ACCOUNT_SETTING_TAB_PROVIDERS],
    };
  }
}
