/* tslint:disable:max-line-length */
import { PageModule } from '@abp/ng.components/page';
import { TreeModule } from '@abp/ng.components/tree';
import { CoreModule, LazyModuleFactory } from '@abp/ng.core';
import { PermissionManagementModule } from '@abp/ng.permission-management';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { UiExtensionsModule } from '@abp/ng.theme.shared/extensions';
import { ModuleWithProviders, NgModule, NgModuleFactory } from '@angular/core';
import { NgbDatepickerModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { AdvancedEntityFiltersModule, CommercialUiModule } from '@volo/abp.commercial.ng.ui';
import { ClaimModalComponent } from './components/claim-modal/claim-modal.component';
import { ClaimsComponent } from './components/claims/claims.component';
import { AbstractOrganizationUnitComponent } from './components/organization-units/abstract-organization-unit/abstract-organization-unit.component';
import { OrganizationMembersModalBodyComponent } from './components/organization-units/organization-members/organization-members-modal-body.component';
import { OrganizationMembersComponent } from './components/organization-units/organization-members/organization-members.component';
import { OrganizationRolesModalBodyComponent } from './components/organization-units/organization-roles/organization-roles-modal-body.component';
import { OrganizationRolesComponent } from './components/organization-units/organization-roles/organization-roles.component';
import { OrganizationUnitsComponent } from './components/organization-units/organization-units.component';
import { RolesComponent } from './components/roles/roles.component';
import { SecurityLogsComponent } from './components/security-logs/security-logs.component';
import { UsersComponent } from './components/users/users.component';
import { IdentityExtensionsGuard } from './guards/extensions.guard';
import { IdentityRoutingModule } from './identity-routing.module';
import { IdentityConfigOptions } from './models/config-options';
import {
  IDENTITY_CREATE_FORM_PROP_CONTRIBUTORS,
  IDENTITY_EDIT_FORM_PROP_CONTRIBUTORS,
  IDENTITY_ENTITY_ACTION_CONTRIBUTORS,
  IDENTITY_ENTITY_PROP_CONTRIBUTORS,
  IDENTITY_TOOLBAR_ACTION_CONTRIBUTORS,
} from './tokens/extensions.token';
import { SelectedOrganizationUnitComponent } from './components/organization-units/selected-organization-unit/selected-organization-unit.component';
import { ExternalLoginComponent } from './components/external-login/external-login.component';
import { UserDropdownMenuComponent } from './components/external-login/user-dropdown-menu/user-dropdown-menu.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    RolesComponent,
    UsersComponent,
    ClaimModalComponent,
    ClaimsComponent,
    OrganizationUnitsComponent,
    OrganizationMembersComponent,
    OrganizationMembersModalBodyComponent,
    OrganizationRolesComponent,
    OrganizationRolesModalBodyComponent,
    AbstractOrganizationUnitComponent,
    SecurityLogsComponent,
    SelectedOrganizationUnitComponent,
    ExternalLoginComponent,
    UserDropdownMenuComponent,
  ],
  exports: [
    RolesComponent,
    UsersComponent,
    ClaimModalComponent,
    ClaimsComponent,
    OrganizationUnitsComponent,
    OrganizationMembersComponent,
    OrganizationMembersModalBodyComponent,
    OrganizationRolesComponent,
    OrganizationRolesModalBodyComponent,
    AbstractOrganizationUnitComponent,
    SecurityLogsComponent,
    SelectedOrganizationUnitComponent,
    ExternalLoginComponent,
    UserDropdownMenuComponent,
  ],
  imports: [
    CoreModule,
    CommercialUiModule,
    IdentityRoutingModule,
    NgbNavModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbDatepickerModule,
    PermissionManagementModule,
    NgxValidateCoreModule,
    TreeModule,
    PageModule,
    AdvancedEntityFiltersModule,
    UiExtensionsModule,
  ],
})
export class IdentityModule {
  static forChild(options: IdentityConfigOptions = {}): ModuleWithProviders<IdentityModule> {
    return {
      ngModule: IdentityModule,
      providers: [
        {
          provide: IDENTITY_ENTITY_ACTION_CONTRIBUTORS,
          useValue: options.entityActionContributors,
        },
        {
          provide: IDENTITY_TOOLBAR_ACTION_CONTRIBUTORS,
          useValue: options.toolbarActionContributors,
        },
        {
          provide: IDENTITY_ENTITY_PROP_CONTRIBUTORS,
          useValue: options.entityPropContributors,
        },
        {
          provide: IDENTITY_CREATE_FORM_PROP_CONTRIBUTORS,
          useValue: options.createFormPropContributors,
        },
        {
          provide: IDENTITY_EDIT_FORM_PROP_CONTRIBUTORS,
          useValue: options.editFormPropContributors,
        },
        IdentityExtensionsGuard,
      ],
    };
  }

  static forLazy(options: IdentityConfigOptions = {}): NgModuleFactory<IdentityModule> {
    return new LazyModuleFactory(IdentityModule.forChild(options));
  }
}
