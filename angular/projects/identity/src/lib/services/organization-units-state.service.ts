import { Injectable } from '@angular/core';
import { InternalStore } from '@abp/ng.core';
import { OrganizationUnitWithDetailsDto } from '@volo/abp.ng.identity/proxy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationUnitsStateService {
  private store = new InternalStore({} as OrganizationUnitsState);
  state$ = this.store.sliceState(state => state);

  getSelectedNode$(): Observable<OrganizationUnitWithDetailsDto | undefined> {
    return this.store.sliceState(state => state.selectedUnit);
  }

  getSelectedNode(): OrganizationUnitWithDetailsDto | undefined {
    return this.store.state.selectedUnit;
  }
  setSelectedUnit(selectedUnit: OrganizationUnitWithDetailsDto | undefined) {
    this.store.patch({ selectedUnit });
  }
}

export interface OrganizationUnitsState {
  selectedUnit: OrganizationUnitWithDetailsDto | undefined;
}
