import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IExamensBiologiques, ExamensBiologiques } from 'app/shared/model/examens-biologiques.model';
import { ExamensBiologiquesService } from './examens-biologiques.service';
import { ExamensBiologiquesComponent } from './examens-biologiques.component';
import { ExamensBiologiquesDetailComponent } from './examens-biologiques-detail.component';
import { ExamensBiologiquesUpdateComponent } from './examens-biologiques-update.component';

@Injectable({ providedIn: 'root' })
export class ExamensBiologiquesResolve implements Resolve<IExamensBiologiques> {
  constructor(private service: ExamensBiologiquesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExamensBiologiques> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((examensBiologiques: HttpResponse<ExamensBiologiques>) => {
          if (examensBiologiques.body) {
            return of(examensBiologiques.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ExamensBiologiques());
  }
}

export const examensBiologiquesRoute: Routes = [
  {
    path: '',
    component: ExamensBiologiquesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.examensBiologiques.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ExamensBiologiquesDetailComponent,
    resolve: {
      examensBiologiques: ExamensBiologiquesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.examensBiologiques.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ExamensBiologiquesUpdateComponent,
    resolve: {
      examensBiologiques: ExamensBiologiquesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.examensBiologiques.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ExamensBiologiquesUpdateComponent,
    resolve: {
      examensBiologiques: ExamensBiologiquesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.examensBiologiques.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
