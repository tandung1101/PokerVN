import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'abp-personal-settings-verify-button',
  templateUrl: './personal-settings-verify-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalSettingsVerifyButtonComponent {

  @Input() buttonLabel: string;
  @Input() verifiedLabel: string;
  @Input() verified: boolean;
  @Input() edited: boolean;
  @Input() editedLabel: string;
  @Input() editedTooltip: string;

  @Output() btnClick = new EventEmitter();

  onBtnClick() {
    this.btnClick.emit();
  }
}
