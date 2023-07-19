import { BaseNode, TreeAdapter } from '@abp/ng.components/tree';
import {
  ConfigStateService,
  generatePassword,
  ListService,
  PagedResultDto,
  SubscriptionService,
} from '@abp/ng.core';
import {
  Confirmation,
  ConfirmationService,
  getPasswordValidators,
  ToasterService,
} from '@abp/ng.theme.shared';
import {
  ePropType,
  EXTENSIONS_IDENTIFIER,
  FormProp,
  FormPropData,
  generateFormFromProps,
} from '@abp/ng.theme.shared/extensions';
import {
  Component,
  Injector,
  OnInit,
  TemplateRef,
  TrackByFunction,
  ViewChild,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  GetIdentityUsersInput,
  IdentityRoleDto,
  IdentityRoleService,
  IdentityUserDto,
  IdentityUserService,
  OrganizationUnitDto,
  OrganizationUnitService,
  OrganizationUnitWithDetailsDto,
} from '@volo/abp.ng.identity/proxy';
import { finalize, switchMap, take, tap } from 'rxjs/operators';
import { eIdentityComponents } from '../../enums/components';
import { identityTwoFactorBehaviourOptions } from '../../enums/two-factor-behaviour';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'abp-users',
  templateUrl: './users.component.html',
  providers: [
    ListService,
    {
      provide: EXTENSIONS_IDENTIFIER,
      useValue: eIdentityComponents.Users,
    },
  ],
})
export class UsersComponent implements OnInit {
  protected readonly subscription = inject(SubscriptionService);
  readonly #roleCount = new BehaviorSubject<number>(0);

  protected userRoles: IdentityRoleDto[];

  data: PagedResultDto<IdentityUserDto> = { items: [], totalCount: 0 };

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  form: UntypedFormGroup;

  setPasswordForm: UntypedFormGroup;

  selected: IdentityUserDto;

  roles: IdentityRoleDto[];

  selectedOrganizationUnits: OrganizationUnitDto[];

  visiblePermissions = false;

  providerKey: string;

  isModalVisible: boolean;

  isSetPasswordModalVisible: boolean;

  modalBusy = false;

  visibleClaims = false;

  fieldTextType: boolean;

  claimSubject = {} as { id: string; type: 'roles' | 'users' };

  filters = {} as GetIdentityUsersInput;

  organization = {
    response: {} as PagedResultDto<OrganizationUnitWithDetailsDto>,
    nodes: [],
    checkedKeys: [],
    expandedKeys: [],
    selectFn: () => false,
  };

  isLockModalVisible: boolean;

  twoFactor = {
    isModalVisible: false,
    checkboxValue: false,
    isOptional: false,
  };

  lockForm = this.fb.group({
    lockoutEnd: [new Date().toISOString(), [Validators.required]],
  });

  dateTimePickerProps = FormProp.create({
    displayName: 'AbpIdentity::DisplayName:LockoutEnd',
    validators: () => [Validators.required],
    name: 'lockoutEnd',
    id: 'lockout-end',
    type: ePropType.DateTime,
  });

  entityDisplayName: string | undefined;

  trackByFn: TrackByFunction<AbstractControl> = (index, item) => Object.keys(item)[0] || index;

  private patchRoleCount(): void {
    this.#roleCount.next(
      this.rawRoleNames.filter(obj => Object.values(obj).includes(true)).length,
    );
  }

  private get rawRoleNames() {
    return this.form.controls.roleNames?.getRawValue();
  }

  get roleGroups(): UntypedFormGroup[] {
    return ((this.form.get('roleNames') as UntypedFormArray)?.controls as UntypedFormGroup[]) || [];
  }

  get roleCount$(): Observable<number> {
    return this.#roleCount.asObservable();
  }

  constructor(
    public readonly list: ListService<GetIdentityUsersInput>,
    public confirmationService: ConfirmationService,
    public service: IdentityUserService,
    public fb: UntypedFormBuilder,
    public toasterService: ToasterService,
    public injector: Injector,
    public configState: ConfigStateService,
    public roleService: IdentityRoleService,
    public organizationUnitService: OrganizationUnitService,
  ) {}

  ngOnInit() {
    this.setPasswordForm = this.fb.group({
      newPassword: [
        '',
        {
          validators: [Validators.required, ...getPasswordValidators(this.injector)],
        },
      ],
    });
    const { key } = identityTwoFactorBehaviourOptions[0];
    this.twoFactor.isOptional =
      this.configState.getFeature('Identity.TwoFactor') === key &&
      this.configState.getSetting('Abp.Identity.TwoFactor.Behaviour') === key;

    this.hookToQuery();
  }

  isFromOrgUnit = (roleId: string) =>
    this.selectedOrganizationUnits.some(org => org.roles.some(f => f.roleId === roleId));

  onVisiblePermissionChange = (value: boolean) => {
    this.visiblePermissions = value;
  };

  clearFilters() {
    this.filters = {} as GetIdentityUsersInput;
  }

  private hookToQuery() {
    this.list
      .hookToQuery(query => {
        const { isLockedOut, notActive, ...params } = this.filters;
        return this.service.getList({
          ...query,
          ...params,
          ...(isLockedOut && { isLockedOut }),
          ...(notActive && { notActive }),
        });
      })
      .subscribe(res => (this.data = res));
  }
  buildForm() {
    const data = new FormPropData(this.injector, this.selected);
    this.form = generateFormFromProps(data);

    this.service.getAssignableRoles().subscribe(({ items }) => {
      this.roles = items;
      this.form.addControl(
        'roleNames',
        this.fb.array(
          this.roles.map(role =>
            this.fb.group({
              [role.name]: [
                this.selected.id
                  ? !!this.userRoles?.find(userRole => userRole.id === role.id)
                  : role.isDefault,
              ],
            }),
          ),
        ),
      );

      this.patchRoleCount();
      this.subscription.addOne(this.form.controls['roleNames'].valueChanges, () =>
        this.patchRoleCount(),
      );
    });

    this.service.getAvailableOrganizationUnits().subscribe(res => {
      this.organization.response = res;
      this.organization.nodes = new TreeAdapter(res.items as BaseNode[]).getTree();
      this.organization.expandedKeys = res.items.map(item => item.id);
      this.organization.checkedKeys = this.selectedOrganizationUnits.map(unit => unit.id);
    });
  }
  openModal() {
    this.buildForm();
    this.isModalVisible = true;
  }

  onAdd() {
    this.selected = {} as IdentityUserDto;
    this.userRoles = [];
    this.selectedOrganizationUnits = [];
    this.openModal();
  }

  onEdit(id: string) {
    this.service
      .get(id)
      .pipe(
        tap(selectedUser => (this.selected = selectedUser)),
        switchMap(() => this.service.getRoles(id)),
        tap(res => (this.userRoles = res.items || [])),
        switchMap(() => this.service.getOrganizationUnits(id)),
        tap(res => (this.selectedOrganizationUnits = res)),
        take(1),
      )
      .subscribe(() => this.openModal());
  }

  save() {
    if (!this.form.valid) return;
    this.modalBusy = true;
    const { roleNames } = this.form.value;
    const mappedRoleNames =
      roleNames?.filter(role => !!role[Object.keys(role)[0]])?.map(role => Object.keys(role)[0]) ||
      [];

    const { id } = this.selected;

    (id
      ? this.service.update(id, {
          ...this.selected,
          ...this.form.value,
          roleNames: mappedRoleNames,
          organizationUnitIds: this.organization.checkedKeys,
        })
      : this.service.create({
          ...this.form.value,
          roleNames: mappedRoleNames,
          organizationUnitIds: this.organization.checkedKeys,
        })
    )
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.list.get();
        this.isModalVisible = false;
      });
  }

  delete(id: string, userName: string) {
    this.confirmationService
      .warn('AbpIdentity::UserDeletionConfirmationMessage', 'AbpIdentity::AreYouSure', {
        messageLocalizationParams: [userName],
      })
      .subscribe((status: Confirmation.Status) => {
        if (status === Confirmation.Status.confirm) {
          this.service.delete(id).subscribe(() => this.list.get());
        }
      });
  }

  onManageClaims(id: string) {
    this.claimSubject = {
      id,
      type: 'users',
    };

    this.visibleClaims = true;
  }

  unlock(id: string) {
    this.service.unlock(id).subscribe(() => {
      this.toasterService.success('AbpIdentity::UserUnlocked');
      this.list.get();
    });
  }

  openPermissionsModal(providerKey: string, userName?: string) {
    this.providerKey = providerKey;
    this.entityDisplayName = userName;
    setTimeout(() => {
      this.visiblePermissions = true;
    }, 0);
  }

  setPassword() {
    if (this.setPasswordForm.invalid) return;

    this.modalBusy = true;
    this.service
      .updatePassword(this.selected.id, this.setPasswordForm.value)
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isSetPasswordModalVisible = false;
        this.selected = {} as IdentityUserDto;
        this.setPasswordForm.reset();
      });
  }

  generatePassword() {
    this.setPasswordForm.get('newPassword').setValue(generatePassword());
  }

  lock() {
    const { lockoutEnd } = this.lockForm.value;

    this.modalBusy = true;
    this.service
      .lock(this.selected.id, lockoutEnd)
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.isLockModalVisible = false;
        this.lockForm.reset({
          lockoutEnd: new Date().toISOString(),
        });
        this.list.get();
      });
  }

  setTwoFactor() {
    this.modalBusy = true;
    this.service
      .setTwoFactorEnabled(this.selected.id, this.twoFactor.checkboxValue)
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.twoFactor.isModalVisible = false;
        this.list.get();
      });
  }
}
