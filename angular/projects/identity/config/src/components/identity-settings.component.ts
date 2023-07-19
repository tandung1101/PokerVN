import { ConfigStateService, SubscriptionService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'abp-identity-settings',
  templateUrl: './identity-settings.component.html',
  providers: [SubscriptionService],
})
export class IdentitySettingsComponent {
  externalLoginKey = 'Identity.EnableOAuthLogin';
  ldapLoginKey = 'Account.EnableLdapLogin';

  features$ = this.configState
    .getFeatures$([this.ldapLoginKey, this.externalLoginKey])
    .pipe(
      map(val =>
        Object.entries(val).reduce(
          (acc, [key, value]) => (value === 'true' ? [...acc, key] : acc),
          [],
        ),
      ),
    );

  constructor(private configState: ConfigStateService) {}

  submit() {}
}
