import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAntecedents, Antecedents } from 'app/shared/model/antecedents.model';
import { AntecedentsService } from './antecedents.service';
import { AntecedentsComponent } from './antecedents.component';
import { AntecedentsDetailComponent } from './antecedents-detail.component';
import { AntecedentsUpdateComponent } from './antecedents-update.component';

@Injectable({ providedIn: 'root' })
export class AntecedentsResolve implements Resolve<IAntecedents> {
  constructor(private service: AntecedentsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAntecedents> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((antecedents: HttpResponse<Antecedents>) => {
          if (antecedents.body) {
            return of(antecedents.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Antecedents());
  }
}

export const antecedentsRoute: Routes = [
  {
    path: '',
    component: AntecedentsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.antecedents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AntecedentsDetailComponent,
    resolve: {
      antecedents: AntecedentsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.antecedents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AntecedentsUpdateComponent,
    resolve: {
      antecedents: AntecedentsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.antecedents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AntecedentsUpdateComponent,
    resolve: {
      antecedents: AntecedentsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.antecedents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
