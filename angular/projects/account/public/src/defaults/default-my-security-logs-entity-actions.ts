import { IdentitySecurityLogDto } from '@volo/abp.commercial.ng.ui/config';
import { EntityAction } from '@abp/ng.theme.shared/extensions';

export const DEFAULT_MY_SECURITY_LOGS_ENTITY_ACTIONS = EntityAction.createMany<IdentitySecurityLogDto>(
  [],
);
