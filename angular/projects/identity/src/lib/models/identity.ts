import { PagedResultDto } from '@abp/ng.core';
import {
  ClaimTypeDto,
  IdentityRoleDto,
  IdentityUserDto,
  OrganizationUnitWithDetailsDto,
} from '@volo/abp.ng.identity/proxy';

export namespace Identity {
  export interface State {
    roles: PagedResultDto<IdentityRoleDto>;
    users: PagedResultDto<IdentityUserDto>;
    selectedUserRoles: IdentityRoleDto[];
    claimTypes: ClaimTypeDto[];
    claims: PagedResultDto<ClaimTypeDto>;
    selectedClaim: ClaimTypeDto;
    organizationUnits: PagedResultDto<OrganizationUnitWithDetailsDto>;
  }
}
