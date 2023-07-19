import { Component, Inject } from '@angular/core';
import { ActionData, EXTENSIONS_ACTION_DATA } from '@abp/ng.theme.shared/extensions';
import { UsersComponent } from '../../users/users.component';

@Component({
  selector: 'abp-user-dropdown-menu',
  templateUrl: './user-dropdown-menu.component.html',
})
export class UserDropdownMenuComponent {
  component: UsersComponent;
  constructor(@Inject(EXTENSIONS_ACTION_DATA) public data: ActionData) {
    this.component = data.getInjected(UsersComponent);
  }

  options = ['AbpIdentity::ExternalUser'];

  isExternalModalVisible = false;

  onAddExternalLogin() {
    this.isExternalModalVisible = true;
  }

  getList() {
    this.component.list.get();
  }
}
