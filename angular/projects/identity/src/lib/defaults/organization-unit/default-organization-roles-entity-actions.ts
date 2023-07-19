/* tslint:disable:max-line-length */
import { EntityAction } from '@abp/ng.theme.shared/extensions';
import { IdentityRoleDto } from '@volo/abp.ng.identity/proxy';
import { OrganizationRolesComponent } from '../../components/organization-units/organization-roles/organization-roles.component';

export const DEFAULT_ORGANIZATION_ROLES_ENTITY_ACTIONS = EntityAction.createMany<IdentityRoleDto>([
  {
    text: 'AbpIdentity::Delete',
    action: data => {
      const component = data.getInjected(OrganizationRolesComponent);
      component.delete(data.record.id, data.record.name);
    },
    permission: 'AbpIdentity.OrganizationUnits.ManageRoles',
  },
]);
