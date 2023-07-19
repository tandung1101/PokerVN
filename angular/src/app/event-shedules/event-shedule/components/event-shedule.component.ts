import { ABP, downloadBlob, ListService, PagedResultDto, TrackByService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import type { GetEventShedulesInput, EventSheduleDto } from '../../../proxy/event-shedules/models';
import { EventSheduleService } from '../../../proxy/event-shedules/event-shedule.service';
@Component({
  selector: 'app-event-shedule',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [ListService, { provide: NgbDateAdapter, useClass: DateAdapter }],
  templateUrl: './event-shedule.component.html',
  styles: [],
})
export class EventSheduleComponent implements OnInit {
  data: PagedResultDto<EventSheduleDto> = {
    items: [],
    totalCount: 0,
  };

  filters = {} as GetEventShedulesInput;

  form: FormGroup;

  isFiltersHidden = true;

  isModalBusy = false;

  isModalOpen = false;

  isExportToExcelBusy = false;

  selected?: EventSheduleDto;

  constructor(
    public readonly list: ListService,
    public readonly track: TrackByService,
    public readonly service: EventSheduleService,
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

    const setData = (list: PagedResultDto<EventSheduleDto>) => (this.data = list);

    this.list.hookToQuery(getData).subscribe(setData);
  }

  clearFilters() {
    this.filters = {} as GetEventShedulesInput;
  }

  buildForm() {
    const {
      eventCode,
      eventName,
      clubCode,
      matchDay,
      timeDay,
      fullMatchDay,
      descEvent,
      days,
      entryCostVND,
      descEntryCostVND,
      entryCostUSD,
      descEntryCostUSD,
      guaranteeVND,
      guaranteeUSD,
      stackBegin,
      blinds,
      regCloseStartOfLevel,
      regCloseStartOfTime,
      liveFinal,
      isHighRoller,
      isDeepStack,
    } = this.selected || {};

    this.form = this.fb.group({
      eventCode: [eventCode ?? null, []],
      eventName: [eventName ?? null, []],
      clubCode: [clubCode ?? null, []],
      matchDay: [matchDay ?? null, []],
      timeDay: [timeDay ?? null, []],
      fullMatchDay: [fullMatchDay ? new Date(fullMatchDay) : null, []],
      descEvent: [descEvent ?? null, []],
      days: [days ?? null, []],
      entryCostVND: [entryCostVND ?? null, []],
      descEntryCostVND: [descEntryCostVND ?? null, []],
      entryCostUSD: [entryCostUSD ?? null, []],
      descEntryCostUSD: [descEntryCostUSD ?? null, []],
      guaranteeVND: [guaranteeVND ?? null, []],
      guaranteeUSD: [guaranteeUSD ?? null, []],
      stackBegin: [stackBegin ?? null, []],
      blinds: [blinds ?? null, []],
      regCloseStartOfLevel: [regCloseStartOfLevel ?? null, []],
      regCloseStartOfTime: [regCloseStartOfTime ?? null, []],
      liveFinal: [liveFinal ?? null, []],
      isHighRoller: [isHighRoller ?? null, []],
      isDeepStack: [isDeepStack ?? null, []],
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

  update(record: EventSheduleDto) {
    this.selected = record;
    this.showForm();
  }

  delete(record: EventSheduleDto) {
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
        downloadBlob(result, 'EventShedule.xlsx');
      });
  }
}
