import {
  EditFormPropContributorCallback,
  EntityActionContributorCallback,
  EntityPropContributorCallback,
  ToolbarActionContributorCallback,
} from '@abp/ng.theme.shared/extensions';
import { eAccountComponents } from '../enums/components';
import { IdentitySecurityLogDto } from '@volo/abp.commercial.ng.ui/config';
import { ProfileDto } from '@volo/abp.ng.account/public/proxy';

export type AccountEntityActionContributors = Partial<{
  [eAccountComponents.MySecurityLogs]: EntityActionContributorCallback<IdentitySecurityLogDto>[];
}>;

export type AccountToolbarActionContributors = Partial<{
  [eAccountComponents.MySecurityLogs]: ToolbarActionContributorCallback<IdentitySecurityLogDto[]>[];
}>;

export type AccountEntityPropContributors = Partial<{
  [eAccountComponents.MySecurityLogs]: EntityPropContributorCallback<IdentitySecurityLogDto>[];
}>;
export type AccountEditFormPropContributors = Partial<{
  [eAccountComponents.PersonalSettings]: EditFormPropContributorCallback<ProfileDto>[];
}>;

export interface AccountConfigOptions {
  redirectUrl?: string;
  entityActionContributors?: AccountEntityActionContributors;
  toolbarActionContributors?: AccountToolbarActionContributors;
  entityPropContributors?: AccountEntityPropContributors;
  isPersonalSettingsChangedConfirmationActive?: boolean;
}
