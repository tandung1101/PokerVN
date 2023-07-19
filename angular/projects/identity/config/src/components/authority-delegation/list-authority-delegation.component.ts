import { Component, inject, OnInit } from '@angular/core';
import {
  IdentityUserDelegationService,
  UserDelegationDto,
} from '@volo/abp.ng.account/public/proxy';
import { ListService } from '@abp/ng.core';
import { of, switchMap } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { AbpAuthorityDelegationService } from '../../services';

@Component({
  selector: 'abp-list-authority-delegation',
  templateUrl: './list-authority-delegation.component.html',
  providers: [ListService],
})
export class ListAuthorityDelegationComponent implements OnInit {
  public readonly identityUserDelegationService = inject(IdentityUserDelegationService);
  private readonly confirmation = inject(ConfirmationService);
  public readonly service = inject(AbpAuthorityDelegationService);
  public readonly list = inject(ListService);

  filterText = '';
  filteredData: UserDelegationDto[];
  resultCount: number;
  isNewUserDelegateModalOpen = false;
  data: UserDelegationDto[];

  get pageStartIndex() {
    return this.list.page * this.list.maxResultCount;
  }

  get pageEndIndex() {
    return this.pageStartIndex + this.list.maxResultCount;
  }

  ngOnInit(): void {
    this.list.maxResultCount = 5;
    this.getAllList();
  }

  filterByText() {
    this.filteredData = this.getPageData(this.pageStartIndex, this.pageEndIndex);
  }

  getFilteredData() {
    const list = this.data.filter(user =>
      user.userName.toLowerCase().includes(this.filterText.toLowerCase()),
    );
    this.resultCount = list.length;
    return list;
  }

  getPageData(start: number, end: number) {
    return this.getFilteredData().slice(start, end);
  }

  getAllList() {
    this.identityUserDelegationService.getDelegatedUsers().subscribe(res => {
      this.data = res.items;
      this.filteredData = this.getPageData(this.pageStartIndex, this.pageEndIndex);
    });
    this.list
      .hookToQuery(query =>
        of({ items: this.getPageData(query.skipCount, query.skipCount + query.maxResultCount) }),
      )
      .subscribe(res => (this.filteredData = res.items));
  }

  create() {
    this.isNewUserDelegateModalOpen = true;
  }

  refreshData() {
    this.getAllList();
    this.isNewUserDelegateModalOpen = false;
  }

  delete(row: UserDelegationDto) {
    const id = row.id;
    this.confirmation
      .warn(`AbpAccount::DeleteUserDelegationConfirmationMessage`, 'AbpAccount::AreYouSure', {
        messageLocalizationParams: [row.userName],
      })
      .pipe(
        filter(res => res === Confirmation.Status.confirm),
        switchMap(() => this.identityUserDelegationService.deleteDelegation(id)),
      )
      .subscribe(() => {
        this.refreshData();
      });
  }
}
