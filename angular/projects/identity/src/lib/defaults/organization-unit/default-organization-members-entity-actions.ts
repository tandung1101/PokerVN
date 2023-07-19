/* tslint:disable:max-line-length */
import { EntityAction } from '@abp/ng.theme.shared/extensions';
import { IdentityUserDto } from '@volo/abp.ng.identity/proxy';
import { OrganizationMembersComponent } from '../../components/organization-units/organization-members/organization-members.component';

export const DEFAULT_ORGANIZATION_MEMBERS_ENTITY_ACTIONS = EntityAction.createMany<IdentityUserDto>(
  [
    {
      text: 'AbpIdentity::Delete',
      action: data => {
        const component = data.getInjected(OrganizationMembersComponent);
        component.delete(data.record.id, data.record.userName);
      },
      permission: 'AbpIdentity.OrganizationUnits.ManageMembers',
    },
  ],
);
