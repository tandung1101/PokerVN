import type { ExternalProviderDto, ExternalProviderItemWithSecretDto, GetByNameInput } from './external-providers/models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountExternalProviderService {
  apiName = 'AbpAccountPublic';
  

  getAll = () =>
    this.restService.request<any, ExternalProviderDto>({
      method: 'GET',
      url: '/api/account/external-provider',
    },
    { apiName: this.apiName });
  

  getByName = (input: GetByNameInput) =>
    this.restService.request<any, ExternalProviderItemWithSecretDto>({
      method: 'GET',
      url: '/api/account/external-provider/by-name',
      params: { tenantId: input.tenantId, name: input.name },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
