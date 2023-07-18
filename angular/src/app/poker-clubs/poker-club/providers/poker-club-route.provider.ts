import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const POKER_CLUBS_POKER_CLUB_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      {
        path: '/poker-clubs',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:PokerClubs',
        layout: eLayoutType.application,
        requiredPolicy: 'PokerVN.PokerClubs',
      },
    ]);
  };
}
