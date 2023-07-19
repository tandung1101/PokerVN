import type {
  ConfirmEmailInput,
  ConfirmPhoneNumberInput,
  GetTwoFactorProvidersInput,
  IdentityUserConfirmationStateDto,
  ProfilePictureInput,
  ProfilePictureSourceDto,
  RegisterDto,
  ResetPasswordDto,
  SendEmailConfirmationTokenDto,
  SendPasswordResetCodeDto,
  SendPhoneNumberConfirmationTokenDto,
  SendTwoFactorCodeInput,
  VerifyEmailConfirmationTokenInput,
  VerifyPasswordResetTokenInput,
} from './models';
import type {
  GetIdentitySecurityLogListInput,
  IdentitySecurityLogDto,
  IdentityUserDto,
} from './volo/abp/identity/models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  apiName = 'AbpAccountPublic';

  confirmEmail = (input: ConfirmEmailInput) =>
    this.restService.request<any, void>(
      {
        method: 'POST',
        url: '/api/account/confirm-email',
        body: input,
      },
      { apiName: this.apiName },
    );

  confirmPhoneNumber = (input: ConfirmPhoneNumberInput) =>
    this.restService.request<any, void>(
      {
        method: 'POST',
        url: '/api/account/confirm-phone-number',
        body: input,
      },
      { apiName: this.apiName },
    );

  getConfirmationState = (id: string) =>
    this.restService.request<any, IdentityUserConfirmationStateDto>(
      {
        method: 'GET',
        url: '/api/account/confirmation-state',
        params: { id },
      },
      { apiName: this.apiName },
    );

  getProfilePicture = (id: string) =>
    this.restService.request<any, ProfilePictureSourceDto>(
      {
        method: 'GET',
        url: `/api/account/profile-picture/${id}`,
      },
      { apiName: this.apiName },
    );

  getProfilePictureFile = (id: string) =>
    this.restService.request<any, Blob>(
      {
        method: 'GET',
        responseType: 'blob',
        url: `/api/account/profile-picture-file/${id}`,
      },
      { apiName: this.apiName },
    );

  getSecurityLogList = (input: GetIdentitySecurityLogListInput) =>
    this.restService.request<any, PagedResultDto<IdentitySecurityLogDto>>(
      {
        method: 'GET',
        url: '/api/account/security-logs',
        params: {
          startTime: input.startTime,
          endTime: input.endTime,
          applicationName: input.applicationName,
          identity: input.identity,
          action: input.action,
          userName: input.userName,
          clientId: input.clientId,
          correlationId: input.correlationId,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      { apiName: this.apiName },
    );

  getTwoFactorProviders = (input: GetTwoFactorProvidersInput) =>
    this.restService.request<any, string[]>(
      {
        method: 'GET',
        url: '/api/account/two-factor-providers',
        params: { userId: input.userId, token: input.token },
      },
      { apiName: this.apiName },
    );

  recaptchaByCaptchaResponse = (captchaResponse: string) =>
    this.restService.request<any, void>(
      {
        method: 'GET',
        url: '/api/account/recaptcha-validate',
        params: { captchaResponse },
      },
      { apiName: this.apiName },
    );

  register = (input: RegisterDto) =>
    this.restService.request<any, IdentityUserDto>(
      {
        method: 'POST',
        url: '/api/account/register',
        body: input,
      },
      { apiName: this.apiName },
    );

  resetPassword = (input: ResetPasswordDto) =>
    this.restService.request<any, void>(
      {
        method: 'POST',
        url: '/api/account/reset-password',
        body: input,
      },
      { apiName: this.apiName },
    );

  sendEmailConfirmationToken = (input: SendEmailConfirmationTokenDto) =>
    this.restService.request<any, void>(
      {
        method: 'POST',
        url: '/api/account/send-email-confirmation-token',
        body: input,
      },
      { apiName: this.apiName },
    );

  sendPasswordResetCode = (input: SendPasswordResetCodeDto) =>
    this.restService.request<any, void>(
      {
        method: 'POST',
        url: '/api/account/send-password-reset-code',
        body: input,
      },
      { apiName: this.apiName },
    );

  sendPhoneNumberConfirmationToken = (input: SendPhoneNumberConfirmationTokenDto) =>
    this.restService.request<any, void>(
      {
        method: 'POST',
        url: '/api/account/send-phone-number-confirmation-token',
        body: input,
      },
      { apiName: this.apiName },
    );

  sendTwoFactorCode = (input: SendTwoFactorCodeInput) =>
    this.restService.request<any, void>(
      {
        method: 'POST',
        url: '/api/account/send-two-factor-code',
        body: input,
      },
      { apiName: this.apiName },
    );

  setProfilePicture = (input: ProfilePictureInput) =>
    this.restService.request<any, void>(
      {
        method: 'POST',
        url: '/api/account/profile-picture',
        params: { type: input.type },
      },
      { apiName: this.apiName },
    );

  verifyEmailConfirmationToken = (input: VerifyEmailConfirmationTokenInput) =>
    this.restService.request<any, boolean>(
      {
        method: 'POST',
        url: '/api/account/verify-email-confirmation-token',
        body: input,
      },
      { apiName: this.apiName },
    );

  verifyPasswordResetToken = (input: VerifyPasswordResetTokenInput) =>
    this.restService.request<any, boolean>(
      {
        method: 'POST',
        url: '/api/account/verify-password-reset-token',
        body: input,
      },
      { apiName: this.apiName },
    );

  constructor(private restService: RestService) {}
}
