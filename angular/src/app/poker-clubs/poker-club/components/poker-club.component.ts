import { ABP, downloadBlob, ListService, PagedResultDto, TrackByService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import type { GetPokerClubsInput, PokerClubDto } from '../../../proxy/poker-clubs/models';
import { PokerClubService } from '../../../proxy/poker-clubs/poker-club.service';
@Component({
  selector: 'app-poker-club',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [ListService, { provide: NgbDateAdapter, useClass: DateAdapter }],
  templateUrl: './poker-club.component.html',
  styles: [],
})
export class PokerClubComponent implements OnInit {
  data: PagedResultDto<PokerClubDto> = {
    items: [],
    totalCount: 0,
  };

  filters = {} as GetPokerClubsInput;

  form: FormGroup;

  isFiltersHidden = true;

  isModalBusy = false;

  isModalOpen = false;

  isExportToExcelBusy = false;

  selected?: PokerClubDto;

  constructor(
    public readonly list: ListService,
    public readonly track: TrackByService,
    public readonly service: PokerClubService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const getData = (query: ABP.PageQueryParams) =>
      this.service.getList({
        ...query,
        ...this.filters,
        filterText: query.filter,
      });

    const setData = (list: PagedResultDto<PokerClubDto>) => (this.data = list);

    this.list.hookToQuery(getData).subscribe(setData);
  }

  clearFilters() {
    this.filters = {} as GetPokerClubsInput;
  }

  buildForm() {
    const {
      clubCode,
      clubName,
      aliasName,
      releaseDate,
      clubAddress,
      clubAddress1,
      clubAddress2,
      clubAddress3,
      phoneNumber,
      email,
      refFb,
      description,
      statusCode,
    } = this.selected || {};

    this.form = this.fb.group({
      clubCode: [clubCode ?? null, []],
      clubName: [clubName ?? null, []],
      aliasName: [aliasName ?? null, []],
      releaseDate: [releaseDate ?? null, []],
      clubAddress: [clubAddress ?? null, []],
      clubAddress1: [clubAddress1 ?? null, []],
      clubAddress2: [clubAddress2 ?? null, []],
      clubAddress3: [clubAddress3 ?? null, []],
      phoneNumber: [phoneNumber ?? null, []],
      email: [email ?? null, []],
      refFb: [refFb ?? null, []],
      description: [description ?? null, []],
      statusCode: [statusCode ?? null, []],
    });
  }

  hideForm() {
    this.isModalOpen = false;
    this.form.reset();
  }

  showForm() {
    this.buildForm();
    this.isModalOpen = true;
  }

  submitForm() {
    if (this.form.invalid) return;

    const request = this.selected
      ? this.service.update(this.selected.id, {
          ...this.form.value,
          concurrencyStamp: this.selected.concurrencyStamp,
        })
      : this.service.create(this.form.value);

    this.isModalBusy = true;

    request
      .pipe(
        finalize(() => (this.isModalBusy = false)),
        tap(() => this.hideForm())
      )
      .subscribe(this.list.get);
  }

  create() {
    this.selected = undefined;
    this.showForm();
  }

  update(record: PokerClubDto) {
    this.selected = record;
    this.showForm();
  }

  delete(record: PokerClubDto) {
    this.confirmation
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.service.delete(record.id))
      )
      .subscribe(this.list.get);
  }

  exportToExcel() {
    this.isExportToExcelBusy = true;
    this.service
      .getDownloadToken()
      .pipe(
        switchMap(({ token }) =>
          this.service.getListAsExcelFile({ downloadToken: token, filterText: this.list.filter })
        ),
        finalize(() => (this.isExportToExcelBusy = false))
      )
      .subscribe(result => {
        downloadBlob(result, 'PokerClub.xlsx');
      });
  }
}
