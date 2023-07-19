import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  DelegateNewUserInput,
  GetUserLookupInput,
  IdentityUserDelegationService,
  UserLookupDto,
} from '@volo/abp.ng.account/public/proxy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DateTimeAdapter } from '@abp/ng.theme.shared/extensions';
import { ListResultDto } from '@abp/ng.core';

@Component({
  selector: 'abp-create-user-delegate',
  templateUrl: './create-user-delegate.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: DateTimeAdapter }],
})
export class CreateUserDelegateComponent {
  private identityUserDelegationService = inject(IdentityUserDelegationService);
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    userNameId: ['', [Validators.required]],
    times: {
      startTime: ['', []],
      endTime: ['', []],
    },
  });

  @Output()
  save = new EventEmitter();

  getFn = (input: unknown) => {
    return this.identityUserDelegationService.getUserLookup(input as GetUserLookupInput).pipe(
      map((usersLookup: ListResultDto<UserLookupDto>) => {
        return {
          items: usersLookup.items,
          totalCount: usersLookup.items.length,
        };
      }),
    );
  };

  ngSubmit() {
    if (this.form.invalid) {
      return;
    }

    const { userNameId, times } = this.form.value;
    const newUser: DelegateNewUserInput = {
      targetUserId: userNameId,
      startTime: times.startTime,
      endTime: times.endTime,
    };
    this.identityUserDelegationService.delegateNewUser(newUser).subscribe(() => this.save.emit());
  }
}
