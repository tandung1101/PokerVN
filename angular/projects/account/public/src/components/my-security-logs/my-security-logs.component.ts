import { ListService, PagedResultDto } from '@abp/ng.core';
import { DateAdapter, EXTENSIONS_IDENTIFIER } from '@abp/ng.theme.shared/extensions';
import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, Volo } from '@volo/abp.ng.account/public/proxy';
import { eAccountComponents } from '../../enums/components';

@Component({
  selector: 'abp-my-security-logs',
  templateUrl: './my-security-logs.component.html',
  providers: [
    ListService,
    {
      provide: EXTENSIONS_IDENTIFIER,
      useValue: eAccountComponents.MySecurityLogs,
    },
    { provide: NgbDateAdapter, useClass: DateAdapter },
  ],
})
export class MySecurityLogsComponent implements OnInit {
  data: PagedResultDto<Volo.Abp.Identity.IdentitySecurityLogDto> = { items: [], totalCount: 0 };

  filter = {} as Partial<Volo.Abp.Identity.GetIdentitySecurityLogListInput>;

  constructor(public readonly list: ListService, private service: AccountService) {}

  ngOnInit(): void {
    this.hookToQuery();
  }

  private hookToQuery() {
    this.list
      .hookToQuery(query =>
        this.service.getSecurityLogList({
          ...query,
          ...this.filter,
        }),
      )
      .subscribe(res => (this.data = res));
  }
}
