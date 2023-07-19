import { BaseNode, DropEvent, TreeAdapter } from '@abp/ng.components/tree';
import { ListResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import {
  EXTENSIONS_IDENTIFIER,
  FormPropData,
  generateFormFromProps,
} from '@abp/ng.theme.shared/extensions';
import { Component, Injector, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {
  OrganizationUnitService,
  OrganizationUnitUpdateDto,
  OrganizationUnitWithDetailsDto,
} from '@volo/abp.ng.identity/proxy';
import { finalize, tap } from 'rxjs/operators';
import { eIdentityComponents } from '../../enums/components';
import { OrganizationUnitsStateService } from '../../services/organization-units-state.service';

@Component({
  selector: 'abp-organization-units',
  templateUrl: './organization-units.component.html',
  providers: [
    {
      provide: EXTENSIONS_IDENTIFIER,
      useValue: eIdentityComponents.OrganizationUnits,
    },
  ],
  styles: [
    `
      .fs-15px {
        font-size: 15px;
      }
    `,
  ],
})
export class OrganizationUnitsComponent implements OnInit {
  organizationUnits: OrganizationUnitWithDetailsDto[] = [];

  nodes = [];
  treeAdapter: TreeAdapter;
  expandedKeys: string[] = [];
  isNodeModalVisible: boolean;
  isModalBusy: boolean;
  organizationMembersKey = eIdentityComponents.OrganizationMembers;
  organizationRolesKey = eIdentityComponents.OrganizationRoles;
  loading: boolean;

  nodeForm: UntypedFormGroup;

  get selectedUnit() {
    return this.organizationUnitsStateService.getSelectedNode();
  }

  get nodeId() {
    return this.nodeForm.get('id')?.value;
  }

  constructor(
    protected injector: Injector,
    protected service: OrganizationUnitService,
    protected fb: UntypedFormBuilder,
    protected confirmation: ConfirmationService,
    public organizationUnitsStateService: OrganizationUnitsStateService,
    private toaster: ToasterService,
  ) {}

  ngOnInit() {
    this.get();
  }

  get = () => {
    this.loading = true;
    this.service
      .getListAll()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res: ListResultDto<OrganizationUnitWithDetailsDto>) => {
        this.organizationUnits = res.items;
        this.treeAdapter = new TreeAdapter(
          res.items as OrganizationUnitWithDetailsDto[] as BaseNode[],
        );
        this.nodes = this.treeAdapter.getTree();
        this.expandedKeys = [...this.expandedKeys];
      });
  };

  buildForm(selected = {} as OrganizationUnitWithDetailsDto) {
    const data = new FormPropData(this.injector, selected);
    this.nodeForm = generateFormFromProps(data);
    this.nodeForm.addControl('parentId', new UntypedFormControl(undefined));
    this.nodeForm.addControl('id', new UntypedFormControl(undefined));
  }

  add() {
    this.buildForm();
    this.isNodeModalVisible = true;
  }

  edit(selected: OrganizationUnitWithDetailsDto) {
    this.buildForm(selected);
    this.nodeForm.patchValue({
      parentId: '',
      displayName: selected.displayName,
      id: selected.id,
    });
    this.isNodeModalVisible = true;
  }

  addSubUnit({ id }: OrganizationUnitWithDetailsDto) {
    this.buildForm();
    this.nodeForm.patchValue({ parentId: id, displayName: '', id: undefined });
    this.isNodeModalVisible = true;
    this.expandedKeys = this.expandedKeys.concat(id);
  }

  save() {
    if (this.nodeForm.invalid) return;

    const { id, ...form } = this.nodeForm.value;
    const request = id
      ? this.service.update(id, form as OrganizationUnitUpdateDto)
      : this.service.create(form);

    const message = 'AbpIdentity::SavedSuccessfully';

    this.isModalBusy = true;
    request.pipe(finalize(() => (this.isModalBusy = false))).subscribe(() => {
      this.get();
      this.isNodeModalVisible = false;
      this.toaster.success(message);
    });
  }

  delete({ id, displayName }: OrganizationUnitWithDetailsDto) {
    this.confirmation
      .warn('AbpIdentity::OrganizationUnitDeletionConfirmationMessage', 'AbpIdentity::AreYouSure', {
        messageLocalizationParams: [displayName],
      })
      .subscribe((status: Confirmation.Status) => {
        if (status === Confirmation.Status.confirm) {
          this.service
            .delete(id)
            .pipe(
              tap(() => {
                if (id === this.selectedUnit?.id) {
                  this.setSelectedUnit(null);
                }
              }),
            )
            .subscribe(() => {
              this.toaster.success('AbpIdentity::SuccessfullyDeleted');
              this.get();
            });
        }
      });
  }

  getParentName(parentId: string) {
    const parent = this.organizationUnits.find(unit => unit.id === parentId);

    if (!parent) return '';

    return parent.displayName;
  }

  onDrop(event: DropEvent) {
    if (!event.node) return;

    let parentId = event.node.key;
    if (!event.node.origin.parentId && event.pos === -1) {
      parentId = null;
    }

    this.move(event.dragNode.key, parentId);
  }

  move(id: string, newParentId: string) {
    this.service.move(id, { newParentId }).subscribe(this.get);
  }

  setSelectedUnit(value: OrganizationUnitWithDetailsDto | undefined) {
    this.organizationUnitsStateService.setSelectedUnit(value);
  }
}
