import { ToolbarAction, ToolbarComponent } from '@abp/ng.theme.shared/extensions';
import { IdentityUserDto } from '@volo/abp.ng.identity/proxy';
import { UsersComponent } from '../../components/users/users.component';
import { UserDropdownMenuComponent } from '../../components/external-login/user-dropdown-menu/user-dropdown-menu.component';

export const DEFAULT_USERS_TOOLBAR_COMPONENTS = ToolbarComponent.createMany<IdentityUserDto[]>([
  {
    permission: 'AbpIdentity.Users.Create',
    component: UserDropdownMenuComponent,
  },
]);

export const DEFAULT_USERS_TOOLBAR_ACTIONS = ToolbarAction.createMany<IdentityUserDto[]>([
  {
    text: 'AbpIdentity::NewUser',
    action: data => {
      const component = data.getInjected(UsersComponent);
      component.onAdd();
    },
    permission: 'AbpIdentity.Users.Create',
    icon: 'fa fa-plus',
  },
]);

export const DEFAULT_USERS_TOOLBAR_ALL = [
  ...DEFAULT_USERS_TOOLBAR_COMPONENTS,
  ...DEFAULT_USERS_TOOLBAR_ACTIONS,
];
