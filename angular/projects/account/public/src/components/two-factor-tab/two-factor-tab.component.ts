import { ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '@volo/abp.ng.account/public/proxy';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'abp-two-factor-tab',
  templateUrl: './two-factor-tab.component.html',
  styleUrls: ['./two-factor-tab.component.scss'],
})
export class TwoFactorTabComponent implements OnInit {
  isLoaded: boolean;
  isTwoFactorEnabled: boolean;
  inProgress: boolean;

  constructor(private profileService: ProfileService, private toaster: ToasterService) {}

  ngOnInit(): void {
    this.getTwoFactorEnabled();
  }

  getTwoFactorEnabled() {
    this.profileService.getTwoFactorEnabled().subscribe(res => {
      this.isTwoFactorEnabled = res;
      this.isLoaded = true;
    });
  }

  setTwoFactorEnabled() {
    this.inProgress = true;
    this.profileService
      .setTwoFactorEnabled(this.isTwoFactorEnabled)
      .pipe(finalize(() => (this.inProgress = false)))
      .subscribe(() => this.toaster.success('AbpUi::Success'));
  }
}
