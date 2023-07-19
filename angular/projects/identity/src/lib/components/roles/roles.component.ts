import { ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import {
  EXTENSIONS_IDENTIFIER,
  FormPropData,
  generateFormFromProps,
} from '@abp/ng.theme.shared/extensions';
import { Component, Injector, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import {
  GetIdentityRoleListInput,
  IdentityRoleDto,
  IdentityRoleService,
} from '@volo/abp.ng.identity/proxy';
import { finalize, take } from 'rxjs/operators';
import { eIdentityComponents } from '../../enums/components';

@Component({
  selector: 'abp-roles',
  templateUrl: './roles.component.html',
  providers: [
    ListService,
    {
      provide: EXTENSIONS_IDENTIFIER,
      useValue: eIdentityComponents.Roles,
    },
  ],
})
export class RolesComponent implements OnInit {
  data: PagedResultDto<IdentityRoleDto> = { items: [], totalCount: 0 };

  form: UntypedFormGroup;

  selected: IdentityRoleDto;

  isModalVisible: boolean;

  visiblePermissions = false;

  providerKey: string;

  modalBusy = false;

  visibleClaims = false;

  claimSubject = {} as { id: string; type: 'roles' | 'users' };

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  onVisiblePermissionChange = (value: boolean) => {
    this.visiblePermissions = value;
  };

  constructor(
    public readonly list: ListService<GetIdentityRoleListInput>,
    protected confirmationService: ConfirmationService,
    protected service: IdentityRoleService,
    protected injector: Injector,
  ) {}

  private createForm() {
    const data = new FormPropData(this.injector, this.selected);
    this.form = generateFormFromProps(data);
  }

  private hookToQuery() {
    this.list.hookToQuery(query => this.service.getList(query)).subscribe(res => (this.data = res));
  }

  ngOnInit() {
    this.hookToQuery();
  }

  openModal() {
    this.createForm();
    this.isModalVisible = true;
  }

  onAdd() {
    this.selected = {} as IdentityRoleDto;
    this.openModal();
  }

  onEdit(id: string) {
    this.service
      .get(id)
      .pipe(take(1))
      .subscribe(selectedRole => {
        this.selected = selectedRole;
        this.openModal();
      });
  }

  save() {
    if (!this.form.valid) return;
    this.modalBusy = true;

    const { id } = this.selected;

    (id
      ? this.service.update(id, {
          ...this.selected,
          ...this.form.value,
          id: this.selected.id,
          concurrencyStamp: this.selected.concurrencyStamp,
        })
      : this.service.create(this.form.value)
    )
      .pipe(finalize(() => (this.modalBusy = false)))
      .subscribe(() => {
        this.list.get();
        this.isModalVisible = false;
      });
  }

  delete(id: string, name: string) {
    this.confirmationService
      .warn('AbpIdentity::RoleDeletionConfirmationMessage', 'AbpIdentity::AreYouSure', {
        messageLocalizationParams: [name],
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
      type: 'roles',
    };

    this.visibleClaims = true;
  }

  openPermissionsModal(providerKey: string) {
    this.providerKey = providerKey;
    setTimeout(() => {
      this.visiblePermissions = true;
    }, 0);
  }
}
