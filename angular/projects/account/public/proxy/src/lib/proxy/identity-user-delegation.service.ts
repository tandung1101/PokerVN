import type {
  DelegateNewUserInput,
  GetUserLookupInput,
  UserDelegationDto,
  UserLookupDto,
} from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdentityUserDelegationService {
  apiName = 'AbpAccountPublic';

  delegateNewUser = (input: DelegateNewUserInput) =>
    this.restService.request<any, void>(
      {
        method: 'POST',
        url: '/api/account/user-delegation/delegate-new-user',
        body: input,
      },
      { apiName: this.apiName },
    );

  deleteDelegation = (id: string) =>
    this.restService.request<any, void>(
      {
        method: 'POST',
        url: '/api/account/user-delegation/delete-delegation',
        params: { id },
      },
      { apiName: this.apiName },
    );

  getActiveDelegations = () =>
    this.restService.request<any, ListResultDto<UserDelegationDto>>(
      {
        method: 'GET',
        url: '/api/account/user-delegation/active-delegations',
      },
      { apiName: this.apiName },
    );

  getDelegatedUsers = () =>
    this.restService.request<any, ListResultDto<UserDelegationDto>>(
      {
        method: 'GET',
        url: '/api/account/user-delegation/delegated-users',
      },
      { apiName: this.apiName },
    );

  getMyDelegatedUsers = () =>
    this.restService.request<any, ListResultDto<UserDelegationDto>>(
      {
        method: 'GET',
        url: '/api/account/user-delegation/my-delegated-users',
      },
      { apiName: this.apiName },
    );

  getUserLookup = (input: GetUserLookupInput) =>
    this.restService.request<any, ListResultDto<UserLookupDto>>(
      {
        method: 'GET',
        url: '/api/account/user-delegation/user-lookup',
        params: { filter: input.filter },
      },
      { apiName: this.apiName },
    );

  constructor(private restService: RestService) {}
}
