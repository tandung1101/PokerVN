import { ConfigStateService } from '@abp/ng.core';
import {
  ExtensionsService,
  getObjectExtensionEntitiesFromStore,
  mapEntitiesToContributors,
  mergeWithDefaultActions,
  mergeWithDefaultProps,
} from '@abp/ng.theme.shared/extensions';
import { Injectable, Injector } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';
import { eAccountComponents } from '../enums/components';
import {
  AccountEditFormPropContributors,
  AccountEntityActionContributors,
  AccountEntityPropContributors,
  AccountToolbarActionContributors,
} from '../models/config-options';
import {
  ACCOUNT_EDIT_FORM_PROP_CONTRIBUTORS,
  ACCOUNT_ENTITY_ACTION_CONTRIBUTORS,
  ACCOUNT_ENTITY_PROP_CONTRIBUTORS,
  ACCOUNT_TOOLBAR_ACTION_CONTRIBUTORS,
  DEFAULT_ACCOUNT_ENTITY_ACTIONS,
  DEFAULT_ACCOUNT_ENTITY_PROPS,
  DEFAULT_ACCOUNT_FORM_PROPS,
  DEFAULT_ACCOUNT_TOOLBAR_ACTIONS,
} from '../tokens/extensions.token';

@Injectable()
export class AccountExtensionsGuard implements CanActivate {
  constructor(private injector: Injector) {}

  canActivate(): Observable<boolean> {
    const extensions: ExtensionsService = this.injector.get(ExtensionsService);
    const actionContributors: AccountEntityActionContributors =
      this.injector.get(ACCOUNT_ENTITY_ACTION_CONTRIBUTORS, null) || {};
    const toolbarContributors: AccountToolbarActionContributors =
      this.injector.get(ACCOUNT_TOOLBAR_ACTION_CONTRIBUTORS, null) || {};
    const propContributors: AccountEntityPropContributors =
      this.injector.get(ACCOUNT_ENTITY_PROP_CONTRIBUTORS, null) || {};
    const formContributors: AccountEditFormPropContributors =
      this.injector.get(ACCOUNT_EDIT_FORM_PROP_CONTRIBUTORS, null) || {};

    const configState = this.injector.get(ConfigStateService);
    const profileSettingsObserve = getObjectExtensionEntitiesFromStore(
      configState,
      'Identity',
    ).pipe(
      map(entities => {
        return {
          [eAccountComponents.PersonalSettings]: entities.User,
        };
      }),
      mapEntitiesToContributors(configState, 'AbpIdentity'),
      tap(objectExtensionContributors => {
        mergeWithDefaultProps(
          extensions.editFormProps,
          DEFAULT_ACCOUNT_FORM_PROPS,
          objectExtensionContributors.editForm,
          formContributors,
        );
      }),
    );

    const accountObserve = getObjectExtensionEntitiesFromStore(configState, 'Account').pipe(
      map(entities => ({
        [eAccountComponents.MySecurityLogs]: entities.SecurityLogs,
      })),
      mapEntitiesToContributors(configState, 'AbpAccount'),
      tap(objectExtensionContributors => {
        mergeWithDefaultActions(
          extensions.entityActions,
          DEFAULT_ACCOUNT_ENTITY_ACTIONS,
          actionContributors,
        );
        mergeWithDefaultActions(
          extensions.toolbarActions,
          DEFAULT_ACCOUNT_TOOLBAR_ACTIONS,
          toolbarContributors,
        );
        mergeWithDefaultProps(
          extensions.entityProps,
          DEFAULT_ACCOUNT_ENTITY_PROPS,
          objectExtensionContributors.prop,
          propContributors,
        );
      }),
    );

    return zip(accountObserve, profileSettingsObserve).pipe(mapTo(true));
  }
}
