import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const EVENT_SHEDULES_EVENT_SHEDULE_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      {
        path: '/event-shedules',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:EventShedules',
        layout: eLayoutType.application,
        requiredPolicy: 'PokerVN.EventShedules',
      },
    ]);
  };
}
