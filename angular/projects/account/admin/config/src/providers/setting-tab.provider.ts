import { SettingTabsService } from '@abp/ng.setting-management/config';
import { APP_INITIALIZER } from '@angular/core';
import { AccountSettingsComponent } from '@volo/abp.ng.account/admin';
import { eAccountSettingTabNames } from '../enums/setting-tab-names';

export const ACCOUNT_SETTING_TAB_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: configureSettingTabs,
    deps: [SettingTabsService],
    multi: true,
  },
];

export function configureSettingTabs(settingtabs: SettingTabsService) {
  return () => {
    settingtabs.add([
      {
        name: eAccountSettingTabNames.Account,
        order: 103,
        requiredPolicy: 'AbpAccount.SettingManagement',
        component: AccountSettingsComponent,
      },
    ]);
  };
}
