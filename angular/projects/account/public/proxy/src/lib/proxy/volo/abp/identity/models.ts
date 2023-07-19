import type { EntityDto, ExtensibleEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetIdentitySecurityLogListInput extends PagedAndSortedResultRequestDto {
  startTime?: string;
  endTime?: string;
  applicationName?: string;
  identity?: string;
  action?: string;
  userName?: string;
  clientId?: string;
  correlationId?: string;
}

export interface IdentitySecurityLogDto extends EntityDto<string> {
  tenantId?: string;
  applicationName?: string;
  identity?: string;
  action?: string;
  userId?: string;
  userName?: string;
  tenantName?: string;
  clientId?: string;
  correlationId?: string;
  clientIpAddress?: string;
  browserInfo?: string;
  creationTime?: string;
  extraProperties: Record<string, object>;
}

export interface IdentityUserDto extends ExtensibleEntityDto<string> {
  tenantId?: string;
  userName?: string;
  email?: string;
  name?: string;
  surname?: string;
  emailConfirmed: boolean;
  phoneNumber?: string;
  phoneNumberConfirmed: boolean;
  supportTwoFactor: boolean;
  twoFactorEnabled: boolean;
  isActive: boolean;
  lockoutEnabled: boolean;
  isLockedOut: boolean;
  lockoutEnd?: string;
  shouldChangePasswordOnNextLogin: boolean;
  concurrencyStamp?: string;
  roleNames: string[];
  accessFailedCount: number;
  lastPasswordChangeTime?: string;
}
