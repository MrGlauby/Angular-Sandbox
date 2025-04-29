import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },

  {
    path: 'homepage', loadComponent: () => import('@angular-concepts-sandbox/homepage').then((m) => m.HomepageComponent),
  },
];
