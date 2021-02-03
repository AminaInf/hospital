import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'rendez-vous',
        loadChildren: () => import('./rendez-vous/rendez-vous.module').then(m => m.HospitalRendezVousModule),
      },
      {
        path: 'departement',
        loadChildren: () => import('./departement/departement.module').then(m => m.HospitalDepartementModule),
      },
      {
        path: 'antecedents',
        loadChildren: () => import('./antecedents/antecedents.module').then(m => m.HospitalAntecedentsModule),
      },
      {
        path: 'historique-consultations',
        loadChildren: () =>
          import('./historique-consultations/historique-consultations.module').then(m => m.HospitalHistoriqueConsultationsModule),
      },
      {
        path: 'ordonnances',
        loadChildren: () => import('./ordonnances/ordonnances.module').then(m => m.HospitalOrdonnancesModule),
      },
      {
        path: 'vaccinations',
        loadChildren: () => import('./vaccinations/vaccinations.module').then(m => m.HospitalVaccinationsModule),
      },
      {
        path: 'examens-biologiques',
        loadChildren: () => import('./examens-biologiques/examens-biologiques.module').then(m => m.HospitalExamensBiologiquesModule),
      },
      {
        path: 'planification',
        loadChildren: () => import('./planification/planification.module').then(m => m.HospitalPlanificationModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class HospitalEntityModule {}
