import { ConfigStateService } from '@abp/ng.core';
import { EntityAction } from '@abp/ng.theme.shared/extensions';
import { SHOW_ENTITY_HISTORY } from '@volo/abp.commercial.ng.ui';
import { IdentityUserDto } from '@volo/abp.ng.identity/proxy';
import { ImpersonationService } from '@volo/abp.commercial.ng.ui/config';
import { UsersComponent } from '../../components/users/users.component';

export const DEFAULT_USERS_ENTITY_ACTIONS = EntityAction.createMany<IdentityUserDto>([
  {
    text: 'AbpIdentity::Edit',
    action: data => {
      const component = data.getInjected(UsersComponent);
      component.onEdit(data.record.id);
    },
    permission: 'AbpIdentity.Users.Update',
  },
  {
    text: 'AbpIdentity::Claims',
    action: data => {
      const component = data.getInjected(UsersComponent);
      component.onManageClaims(data.record.id);
    },
    permission: 'AbpIdentity.Users.Update',
  },
  {
    text: 'AbpIdentity::Lock',
    action: data => {
      const component = data.getInjected(UsersComponent);
      component.selected = data.record;
      component.isLockModalVisible = true;
    },
    permission: 'AbpIdentity.Users.Update',
    visible: data => !data.record.isLockedOut && data.record.lockoutEnabled,
  },
  {
    text: 'AbpIdentity::Unlock',
    action: data => {
      const component = data.getInjected(UsersComponent);
      component.unlock(data.record.id);
    },
    permission: 'AbpIdentity.Users.Update',
    visible: data => data.record.isLockedOut,
  },
  {
    text: 'AbpIdentity::Permissions',
    action: data => {
      const component = data.getInjected(UsersComponent);
      component.openPermissionsModal(data.record.id, data.record.userName);
    },
    permission: 'AbpIdentity.Users.ManagePermissions',
  },
  {
    text: 'AbpIdentity::ChangeHistory',
    action: data => {
      const showHistory = data.getInjected(SHOW_ENTITY_HISTORY);
      showHistory(data.record.id, 'Volo.Abp.Identity.IdentityUser');
    },
    permission: 'AuditLogging.ViewChangeHistory:Volo.Abp.Identity.IdentityUser',
    visible: data => Boolean(data.getInjected(SHOW_ENTITY_HISTORY, null)),
  },
  {
    text: 'AbpIdentity::SetPassword',
    action: data => {
      const component = data.getInjected(UsersComponent);
      component.selected = data.record;
      component.isSetPasswordModalVisible = true;
    },
    permission: 'AbpIdentity.Users.Update',
  },
  {
    text: 'AbpIdentity::TwoFactor',
    action: data => {
      const component = data.getInjected(UsersComponent);
      component.selected = data.record;
      component.service.getTwoFactorEnabled(data.record.id).subscribe(res => {
        component.twoFactor.checkboxValue = res;
        component.twoFactor.isModalVisible = true;
      });
    },
    permission: 'AbpIdentity.Users.Update',
    visible: data => data.getInjected(UsersComponent).twoFactor.isOptional,
  },
  {
    text: 'AbpIdentity::LoginWithThisUser',
    permission: 'AbpIdentity.Users.Impersonation',
    action: data => {
      const impersonation = data.getInjected(ImpersonationService);
      impersonation.impersonateUser(data.record.id).subscribe();
    },
    visible: data => {
      const configState = data.getInjected(ConfigStateService);
      const currentUserId = configState.getDeep('currentUser.id');
      const currentImpersonatorUserId = configState.getDeep('currentUser.impersonatorUserId');
      return data.record.id !== currentUserId && currentImpersonatorUserId === null;
    },
  },
  {
    text: 'AbpIdentity::Delete',
    action: data => {
      const component = data.getInjected(UsersComponent);
      component.delete(data.record.id, data.record.name || data.record.userName);
    },
    permission: 'AbpIdentity.Users.Delete',
  },
]);
