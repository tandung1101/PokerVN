import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44312/',
  redirectUri: baseUrl,
  clientId: 'PokerVN_App',
  responseType: 'code',
  scope: 'offline_access PokerVN',
  requireHttps: true,
};

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'PokerVN',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44312',
      rootNamespace: 'PokerVN',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
  remoteEnv: {
    url: '/getEnvConfig',
    mergeStrategy: 'deepmerge'
  }
} as Environment;
