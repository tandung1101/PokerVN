import { ABP, ConfigStateService, TrackByService } from '@abp/ng.core';
import { fadeIn } from '@abp/ng.theme.shared';
import { transition, trigger, useAnimation } from '@angular/animations';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { twoFactorBehaviourOptions } from '@volo/abp.ng.account/admin';
import {
  eAccountManageProfileTabNames,
  ManageProfileTabsService,
} from '@volo/abp.ng.account/public/config';
import { ProfileDto, ProfileService } from '@volo/abp.ng.account/public/proxy';
import { Subscription } from 'rxjs';
import { ManageProfileStateService } from '../../services/manage-profile-state.service';

@Component({
  selector: 'abp-manage-profile',
  templateUrl: './manage-profile.component.html',
  animations: [trigger('fadeIn', [transition(':enter', useAnimation(fadeIn))])],
})
export class ManageProfileComponent implements OnInit, OnDestroy {
  tabs: ABP.Tab[] = [];

  selected: ABP.Tab;

  isProfileLoaded: boolean;

  subscription: Subscription;

  get isTwoFactorEnabled(): boolean {
    const { key } = twoFactorBehaviourOptions[0];
    return (
      this.configState.getFeature('Identity.TwoFactor') === key &&
      this.configState.getSetting('Abp.Identity.TwoFactor.Behaviour') === key &&
      (
        (this.configState.getSetting('Abp.Identity.TwoFactor.UsersCanChange') as string) || ''
      ).toLowerCase() === 'true'
    );
  }

  constructor(
    public readonly track: TrackByService,
    private tabsService: ManageProfileTabsService,
    private cdRef: ChangeDetectorRef,
    private configState: ConfigStateService,
    protected profileService: ProfileService,
    protected manageProfileState: ManageProfileStateService,
  ) {}

  ngOnInit() {
    this.subscription = this.tabsService.visible$.subscribe(tabs => {
      this.tabs = tabs;
      setTimeout(() => this.cdRef.detectChanges(), 0);

      if (!this.selected && this.tabs[0].component) this.selected = this.tabs[0];
    });

    this.profileService.get().subscribe(profile => {
      this.manageProfileState.setProfile(profile as ProfileDto);
      this.isProfileLoaded = true;
      if (profile.isExternal) {
        this.tabsService.patch(eAccountManageProfileTabNames.ChangePassword, { invisible: true });
        this.selected = this.tabs[0];
      }

      this.tabsService.patch(eAccountManageProfileTabNames.TwoFactor, {
        invisible: !this.isTwoFactorEnabled,
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
