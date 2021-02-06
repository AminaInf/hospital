import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IVaccinations, Vaccinations } from 'app/shared/model/vaccinations.model';
import { VaccinationsService } from './vaccinations.service';
import { VaccinationsComponent } from './vaccinations.component';
import { VaccinationsDetailComponent } from './vaccinations-detail.component';
import { VaccinationsUpdateComponent } from './vaccinations-update.component';

@Injectable({ providedIn: 'root' })
export class VaccinationsResolve implements Resolve<IVaccinations> {
  constructor(private service: VaccinationsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVaccinations> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((vaccinations: HttpResponse<Vaccinations>) => {
          if (vaccinations.body) {
            return of(vaccinations.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Vaccinations());
  }
}

export const vaccinationsRoute: Routes = [
  {
    path: '',
    component: VaccinationsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.vaccinations.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VaccinationsDetailComponent,
    resolve: {
      vaccinations: VaccinationsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.vaccinations.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VaccinationsUpdateComponent,
    resolve: {
      vaccinations: VaccinationsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.vaccinations.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VaccinationsUpdateComponent,
    resolve: {
      vaccinations: VaccinationsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'hospitalApp.vaccinations.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
