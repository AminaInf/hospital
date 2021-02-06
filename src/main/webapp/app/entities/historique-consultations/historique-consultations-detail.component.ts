import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHistoriqueConsultations } from 'app/shared/model/historique-consultations.model';

@Component({
  selector: 'jhi-historique-consultations-detail',
  templateUrl: './historique-consultations-detail.component.html',
})
export class HistoriqueConsultationsDetailComponent implements OnInit {
  historiqueConsultations: IHistoriqueConsultations | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historiqueConsultations }) => (this.historiqueConsultations = historiqueConsultations));
  }

  previousState(): void {
    window.history.back();
  }
}
