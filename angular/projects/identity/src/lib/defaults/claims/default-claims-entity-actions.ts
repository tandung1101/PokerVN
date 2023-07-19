import { EntityAction } from '@abp/ng.theme.shared/extensions';
import { ClaimTypeDto } from '@volo/abp.ng.identity/proxy';
import { ClaimsComponent } from '../../components/claims/claims.component';

export const DEFAULT_CLAIMS_ENTITY_ACTIONS = EntityAction.createMany<ClaimTypeDto>([
  {
    text: 'AbpIdentity::Edit',
    action: data => {
      const component = data.getInjected(ClaimsComponent);
      component.onEdit(data.record.id);
    },
    permission: 'AbpIdentity.ClaimTypes.Update',
    visible: data => !data.record.isStatic,
  },
  {
    text: 'AbpIdentity::Delete',
    action: data => {
      const component = data.getInjected(ClaimsComponent);
      component.delete(data.record.id, data.record.name);
    },
    permission: 'AbpIdentity.ClaimTypes.Delete',
  },
]);
