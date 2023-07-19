import { Component, inject, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { ChangePasswordService } from '../../services/change-password.service';
import { SubscriptionService } from '@abp/ng.core';

@Component({
  selector: 'abp-change-password-form',
  templateUrl: './change-password.component.html',
  exportAs: 'abpChangePasswordForm',
  providers: [SubscriptionService],
})
export class ChangePasswordComponent implements OnInit {
  form: UntypedFormGroup;
  inProgress: boolean;
  private readonly service: ChangePasswordService = inject(ChangePasswordService);
  protected readonly subscription = inject(SubscriptionService);
  public hideCurrentPassword = false;

  mapErrorsFn = this.service.MapErrorsFnFactory();

  ngOnInit(): void {
    this.hideCurrentPassword = !this.service.hasPassword;
    this.form = this.service.buildForm(this.hideCurrentPassword);
  }

  onSuccess() {
    this.service.showSuccessMessage();
    this.hideCurrentPassword = false;
    this.form = this.service.buildForm(this.hideCurrentPassword);
  }

  onSubmit() {
    if (this.form.invalid) return;

    const sub = this.service.changePassword(this.form.value);
    this.subscription.addOne(sub, this.onSuccess, this.service.showErrorMessage);
  }
}
