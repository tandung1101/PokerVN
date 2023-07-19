import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdentityExternalLoginService {
  apiName = 'AbpIdentity';
  

  createOrUpdate = () =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/identity/external-login',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
