import type { AbpLoginResult, LinkUserLoginInfo, UserLoginInfo } from './models/models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  apiName = 'AbpAccountPublic';
  

  checkPasswordByLogin = (login: UserLoginInfo) =>
    this.restService.request<any, AbpLoginResult>({
      method: 'POST',
      url: '/api/account/checkPassword',
      body: login,
    },
    { apiName: this.apiName });
  

  linkLoginByLogin = (login: LinkUserLoginInfo) =>
    this.restService.request<any, AbpLoginResult>({
      method: 'POST',
      url: '/api/account/linkLogin',
      body: login,
    },
    { apiName: this.apiName });
  

  loginByLogin = (login: UserLoginInfo) =>
    this.restService.request<any, AbpLoginResult>({
      method: 'POST',
      url: '/api/account/login',
      body: login,
    },
    { apiName: this.apiName });
  

  logout = () =>
    this.restService.request<any, void>({
      method: 'GET',
      url: '/api/account/logout',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
