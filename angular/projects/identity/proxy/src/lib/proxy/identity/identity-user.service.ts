import type { ClaimTypeDto, ExternalLoginProviderDto, GetIdentityUsersInput, IdentityRoleDto, IdentityRoleLookupDto, IdentityUserClaimDto, IdentityUserCreateDto, IdentityUserDto, IdentityUserUpdateDto, IdentityUserUpdatePasswordInput, IdentityUserUpdateRolesDto, ImportExternalUserInput, OrganizationUnitDto, OrganizationUnitLookupDto, OrganizationUnitWithDetailsDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdentityUserService {
  apiName = 'AbpIdentity';
  

  create = (input: IdentityUserCreateDto) =>
    this.restService.request<any, IdentityUserDto>({
      method: 'POST',
      url: '/api/identity/users',
      body: input,
    },
    { apiName: this.apiName });
  

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/identity/users/${id}`,
    },
    { apiName: this.apiName });
  

  findByEmail = (email: string) =>
    this.restService.request<any, IdentityUserDto>({
      method: 'GET',
      url: `/api/identity/users/by-email/${email}`,
    },
    { apiName: this.apiName });
  

  findByUsername = (username: string) =>
    this.restService.request<any, IdentityUserDto>({
      method: 'GET',
      url: `/api/identity/users/by-username/${username}`,
    },
    { apiName: this.apiName });
  

  get = (id: string) =>
    this.restService.request<any, IdentityUserDto>({
      method: 'GET',
      url: `/api/identity/users/${id}`,
    },
    { apiName: this.apiName });
  

  getAllClaimTypes = () =>
    this.restService.request<any, ClaimTypeDto[]>({
      method: 'GET',
      url: '/api/identity/users/all-claim-types',
    },
    { apiName: this.apiName });
  

  getAssignableRoles = () =>
    this.restService.request<any, ListResultDto<IdentityRoleDto>>({
      method: 'GET',
      url: '/api/identity/users/assignable-roles',
    },
    { apiName: this.apiName });
  

  getAvailableOrganizationUnits = () =>
    this.restService.request<any, ListResultDto<OrganizationUnitWithDetailsDto>>({
      method: 'GET',
      url: '/api/identity/users/available-organization-units',
    },
    { apiName: this.apiName });
  

  getClaims = (id: string) =>
    this.restService.request<any, IdentityUserClaimDto[]>({
      method: 'GET',
      url: `/api/identity/users/${id}/claims`,
    },
    { apiName: this.apiName });
  

  getExternalLoginProviders = () =>
    this.restService.request<any, ExternalLoginProviderDto[]>({
      method: 'GET',
      url: '/api/identity/users/external-login-Providers',
    },
    { apiName: this.apiName });
  

  getList = (input: GetIdentityUsersInput) =>
    this.restService.request<any, PagedResultDto<IdentityUserDto>>({
      method: 'GET',
      url: '/api/identity/users',
      params: { filter: input.filter, roleId: input.roleId, organizationUnitId: input.organizationUnitId, userName: input.userName, phoneNumber: input.phoneNumber, emailAddress: input.emailAddress, name: input.name, surname: input.surname, isLockedOut: input.isLockedOut, notActive: input.notActive, emailConfirmed: input.emailConfirmed, isExternal: input.isExternal, maxCreationTime: input.maxCreationTime, minCreationTime: input.minCreationTime, maxModifitionTime: input.maxModifitionTime, minModifitionTime: input.minModifitionTime, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });
  

  getOrganizationUnitLookup = () =>
    this.restService.request<any, OrganizationUnitLookupDto[]>({
      method: 'GET',
      url: '/api/identity/users/lookup/organization-units',
    },
    { apiName: this.apiName });
  

  getOrganizationUnits = (id: string) =>
    this.restService.request<any, OrganizationUnitDto[]>({
      method: 'GET',
      url: `/api/identity/users/${id}/organization-units`,
    },
    { apiName: this.apiName });
  

  getRoleLookup = () =>
    this.restService.request<any, IdentityRoleLookupDto[]>({
      method: 'GET',
      url: '/api/identity/users/lookup/roles',
    },
    { apiName: this.apiName });
  

  getRoles = (id: string) =>
    this.restService.request<any, ListResultDto<IdentityRoleDto>>({
      method: 'GET',
      url: `/api/identity/users/${id}/roles`,
    },
    { apiName: this.apiName });
  

  getTwoFactorEnabled = (id: string) =>
    this.restService.request<any, boolean>({
      method: 'GET',
      url: `/api/identity/users/${id}/two-factor-enabled`,
    },
    { apiName: this.apiName });
  

  importExternalUser = (input: ImportExternalUserInput) =>
    this.restService.request<any, IdentityUserDto>({
      method: 'POST',
      url: '/api/identity/users/import-external-user',
      body: input,
    },
    { apiName: this.apiName });
  

  lock = (id: string, lockoutEnd: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/users/${id}/lock/${lockoutEnd}`,
    },
    { apiName: this.apiName });
  

  setTwoFactorEnabled = (id: string, enabled: boolean) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/users/${id}/two-factor/${enabled}`,
    },
    { apiName: this.apiName });
  

  unlock = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/users/${id}/unlock`,
    },
    { apiName: this.apiName });
  

  update = (id: string, input: IdentityUserUpdateDto) =>
    this.restService.request<any, IdentityUserDto>({
      method: 'PUT',
      url: `/api/identity/users/${id}`,
      body: input,
    },
    { apiName: this.apiName });
  

  updateClaims = (id: string, input: IdentityUserClaimDto[]) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/users/${id}/claims`,
      body: input,
    },
    { apiName: this.apiName });
  

  updatePassword = (id: string, input: IdentityUserUpdatePasswordInput) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/users/${id}/change-password`,
      body: input,
    },
    { apiName: this.apiName });
  

  updateRoles = (id: string, input: IdentityUserUpdateRolesDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/users/${id}/roles`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
