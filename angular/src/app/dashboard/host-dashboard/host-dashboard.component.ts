import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  AverageExecutionDurationWidgetComponent,
  ErrorRateWidgetComponent,
} from '@volo/abp.ng.audit-logging';
import { EditionsUsageWidgetComponent, LatestTenantsWidgetComponent } from '@volo/abp.ng.saas';
import { UntypedFormBuilder } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const now = new Date();
const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.scss'],
})
export class HostDashboardComponent implements AfterViewInit {
  @ViewChild('errorRateWidget', { static: false })
  errorRateWidget: ErrorRateWidgetComponent;

  @ViewChild('averageExecutionDurationWidget', { static: false })
  averageExecutionDurationWidget: AverageExecutionDurationWidgetComponent;

  @ViewChild('editionsUsageWidget', { static: false })
  editionsUsageWidget: EditionsUsageWidgetComponent;

  @ViewChild('latestTenantsWidget', { static: false })
  latestTenantsWidget: LatestTenantsWidgetComponent;

  toDate = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  } as NgbDateStruct;

  fromDate = {
    year: oneMonthAgo.getFullYear(),
    month: oneMonthAgo.getMonth() + 1,
    day: oneMonthAgo.getDate(),
  } as NgbDateStruct;

  formFilters = this.fb.group({
    times: [
      {
        fromDate: this.fromDate,
        toDate: this.toDate,
      },
    ],
  });

  constructor(private fb: UntypedFormBuilder) {}

  ngAfterViewInit() {
    this.refresh();
  }

  refresh() {
    const value = {
      ...this.formFilters.value.times,
    };

    const startDate = new Date(
      value.fromDate.year,
      value.fromDate.month - 1,
      value.fromDate.day
    ).toLocalISOString();
    const endDate = new Date(
      value.toDate.year,
      value.toDate.month - 1,
      value.toDate.day
    ).toLocalISOString();

    this.errorRateWidget?.draw({ startDate, endDate });
    this.averageExecutionDurationWidget?.draw({ startDate, endDate });
    this.editionsUsageWidget?.draw();
    this.latestTenantsWidget?.draw();
  }
}
