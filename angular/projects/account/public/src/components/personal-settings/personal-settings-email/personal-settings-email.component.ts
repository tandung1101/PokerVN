import { Component, Inject } from '@angular/core';
import {
  EXTENSIBLE_FORM_VIEW_PROVIDER,
  EXTENSIONS_FORM_PROP,
  EXTENSIONS_FORM_PROP_DATA,
  FormProp,
} from '@abp/ng.theme.shared/extensions';
import { AbstractControl, FormGroupDirective, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileDto } from '@volo/abp.ng.account/public/proxy';
import { ConfigStateService, EnvironmentService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { AccountService, ManageProfileStateService } from '../../../services';

@Component({
  selector: 'abp-personal-settings-email',
  templateUrl: './personal-settings-email.component.html',
  viewProviders: [EXTENSIBLE_FORM_VIEW_PROVIDER],
})
export class PersonalSettingsEmailComponent {
  public displayName: string;
  public name: string;
  public id: string;

  public initialValue: string;
  public isValueChanged$: Observable<boolean>;
  public isVerified: boolean;
  public isReadonly$: Observable<boolean>;
  public showEmailVerificationBtn$: Observable<boolean>;
  private formGroup: UntypedFormGroup;
  private formControl: AbstractControl;

  constructor(
    @Inject(EXTENSIONS_FORM_PROP) private formProp: FormProp,
    @Inject(EXTENSIONS_FORM_PROP_DATA) private propData: ProfileDto,
    private formGroupDirective: FormGroupDirective,
    private manageProfileState: ManageProfileStateService,
    private toasterService: ToasterService,
    private accountService: AccountService,
    private configState: ConfigStateService,
    private environmentService: EnvironmentService,
  ) {
    this.displayName = formProp.displayName;
    this.name = formProp.name;
    this.id = formProp.id;
    this.formGroup = this.formGroupDirective.control;
    this.formControl = this.formGroup.controls[this.name];
    this.initialValue = propData.email;

    this.isValueChanged$ = this.formControl.valueChanges.pipe(
      map(value => value !== this.initialValue),
    );
    this.isReadonly$ = configState
      .getSetting$('Abp.Identity.User.IsEmailUpdateEnabled')
      .pipe(map(x => x.toLowerCase() !== 'true'));

    this.isVerified = propData.emailConfirmed;

    this.showEmailVerificationBtn$ = this.manageProfileState.createStateStream(
      data => !data.hideEmailVerificationBtn,
    );
  }

  get userId(): string {
    return this.configState.getDeep('currentUser.id');
  }

  sendEmailVerificationToken() {
    if (this.formControl.invalid) {
      return;
    }
    const email = this.formControl.value;
    const userId = this.userId;
    const appName =
      this.environmentService.getEnvironment().oAuthConfig.responseType === 'code'
        ? 'MVC'
        : 'Angular';
    this.accountService
      .sendEmailConfirmationToken({
        appName,
        email,
        userId,
      })
      .subscribe(() => {
        this.toasterService.success('AbpAccount::EmailConfirmationSentMessage', '', {
          messageLocalizationParams: [email],
        });

        this.manageProfileState.setHideEmailVerificationBtn(true);
      });
  }
}
