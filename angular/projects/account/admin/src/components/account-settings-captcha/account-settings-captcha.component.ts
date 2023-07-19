import { Component, ChangeDetectionStrategy, Injector, OnInit } from '@angular/core';
import { AbstractAccountSettingsService } from '../../abstracts/abstract-account-config.service';
import { AccountCaptchaService } from '../../services/account-captcha.service';
import { AbstractAccountSettingsComponent } from '../../abstracts/abstract-account-settings.component';
import { AccountCaptchaSettings } from '../../models/account-settings';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SubscriptionService } from '@abp/ng.core';

@Component({
  selector: 'abp-account-settings-captcha',
  templateUrl: './account-settings-captcha.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AbstractAccountSettingsService,
      useClass: AccountCaptchaService,
    },
    SubscriptionService,
  ],
})
export class AccountSettingsCaptchaComponent
  extends AbstractAccountSettingsComponent<AccountCaptchaSettings>
  implements OnInit {
  form: UntypedFormGroup;

  constructor(
    protected injector: Injector,
    private fb: UntypedFormBuilder,
    private subscription: SubscriptionService,
  ) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscription.addOne(this.settings$, settings => this.buildForm(settings));
  }

  protected buildForm(settings: AccountCaptchaSettings) {
    this.form = this.fb.group({
      useCaptchaOnLogin: [settings.useCaptchaOnLogin],
      useCaptchaOnRegistration: [settings.useCaptchaOnRegistration],
      verifyBaseUrl: [settings.verifyBaseUrl, [Validators.required]],
      siteKey: [settings.siteKey],
      siteSecret: [settings.siteSecret],
      version: [settings.version, [Validators.required]],
      score: [settings.score, [Validators.required, Validators.min(0), Validators.max(1)]],
    });
    this.cdr.detectChanges();
  }

  mapTenantSettingsForSubmit(newSettings: Partial<AccountCaptchaSettings>) {
    return {
      version: newSettings.version,
      siteKey: newSettings.siteKey,
      siteSecret: newSettings.siteSecret,
    };
  }

  submit() {
    if (this.form.invalid) return;

    super.submit(this.form.value);
  }
}
