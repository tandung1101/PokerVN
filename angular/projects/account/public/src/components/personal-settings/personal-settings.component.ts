import { AuthService, ConfigStateService, SubscriptionService } from '@abp/ng.core';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import {
  ChangeDetectorRef,
  Component,
  EmbeddedViewRef,
  Inject,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ProfileDto, ProfileService } from '@volo/abp.ng.account/public/proxy';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';
import { ManageProfileStateService } from '../../services/manage-profile-state.service';
import {
  EXTENSIONS_IDENTIFIER,
  FormPropData,
  generateFormFromProps,
} from '@abp/ng.theme.shared/extensions';
import { eAccountComponents } from '../../enums';
import { RE_LOGIN_CONFIRMATION_TOKEN } from '../../tokens';

@Component({
  selector: 'abp-personal-settings-form',
  templateUrl: './personal-settings.component.html',
  providers: [
    SubscriptionService,
    {
      provide: EXTENSIONS_IDENTIFIER,
      useValue: eAccountComponents.PersonalSettings,
    },
  ],
})
export class PersonalSettingsComponent implements OnDestroy, OnInit {
  storedProfile: ProfileDto;

  profile$: Observable<ProfileDto> = this.manageProfileState.getProfile$();

  modalVisible = false;

  modalBusy = false;

  modalRef: EmbeddedViewRef<any>;

  form: UntypedFormGroup;

  token = '';

  isEmailUpdateEnabled = true;

  isUserNameUpdateEnabled = true;

  buildForm = (profile: ProfileDto) => {
    const data = new FormPropData(this.injector, profile);
    this.form = generateFormFromProps(data);
  };

  loadData() {
    this.storedProfile = this.manageProfileState.getProfile();
    this.buildForm(this.storedProfile);
  }

  removeModal = () => {
    this.modalVisible = false;
  };

  constructor(
    private fb: UntypedFormBuilder,
    private accountService: AccountService,
    private toasterService: ToasterService,
    private confirmationService: ConfirmationService,
    private configState: ConfigStateService,
    private subscription: SubscriptionService,
    private manageProfileState: ManageProfileStateService,
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef,
    private injector: Injector,
    private authService: AuthService,
    @Inject(RE_LOGIN_CONFIRMATION_TOKEN)
    private isPersonalSettingsChangedConfirmationActive: boolean,
  ) {}

  ngOnDestroy() {
    this.removeModal();
  }

  ngOnInit() {
    this.subscription.addOne(
      this.profile$.pipe(
        filter<ProfileDto>(Boolean),
        tap(profile => (this.storedProfile = profile)),
      ),
      this.buildForm,
    );
  }

  submit() {
    if (this.form.invalid) return;

    const isLogOutConfirmMessageVisible = this.isLogoutConfirmMessageActive();

    const { phoneNumberConfirmed, ...profile } = this.form.value;

    this.profileService.update(profile).subscribe(res => {
      this.manageProfileState.setProfile(res);
      this.cdr.detectChanges();
      this.toasterService.success('AbpAccount::PersonalSettingsSaved', '', { life: 5000 });
      if (isLogOutConfirmMessageVisible) {
        this.showLogoutConfirmMessage();
      }
    });
  }

  isDataSame(oldValue, newValue) {
    return Object.entries(oldValue).some(([key, value]) => {
      if (key in newValue) {
        return value !== newValue[key];
      }
      return false;
    });
  }

  logoutConfirmation = () => {
    this.authService.logout().subscribe();
  };

  private isLogoutConfirmMessageActive() {
    if (!this.isPersonalSettingsChangedConfirmationActive) {
      return false;
    }
    return this.isDataSame(this.storedProfile, this.form.value);
  }

  private showLogoutConfirmMessage() {
    this.confirmationService
      .info(
        'AbpAccount::PersonalSettingsChangedConfirmationModalDescription',
        'AbpAccount::PersonalSettingsChangedConfirmationModalTitle',
      )
      .pipe(filter(status => status === Confirmation.Status.confirm))
      .subscribe(this.logoutConfirmation);
  }
}
