import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPlanification, Planification } from 'app/shared/model/planification.model';
import { PlanificationService } from './planification.service';
import { PlanificationComponent } from './planification.component';
import { PlanificationDetailComponent } from './planification-detail.component';
import { PlanificationUpdateComponent } from './planification-update.component';

@Injectable({ providedIn: 'root' })
export class PlanificationResolve implements Resolve<IPlanification> {
  constructor(private service: PlanificationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlanification> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((planification: HttpResponse<Planification>) => {
          if (planification.body) {
            return of(planification.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Planification());
  }
}

export const planificationRoute: Routes = [
  {
    path: '',
    component: PlanificationComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.planification.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PlanificationDetailComponent,
    resolve: {
      planification: PlanificationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.planification.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PlanificationUpdateComponent,
    resolve: {
      planification: PlanificationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.planification.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PlanificationUpdateComponent,
    resolve: {
      planification: PlanificationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.planification.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
