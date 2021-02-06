import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExamensBiologiques } from 'app/shared/model/examens-biologiques.model';

@Component({
  selector: 'jhi-examens-biologiques-detail',
  templateUrl: './examens-biologiques-detail.component.html',
})
export class ExamensBiologiquesDetailComponent implements OnInit {
  examensBiologiques: IExamensBiologiques | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ examensBiologiques }) => (this.examensBiologiques = examensBiologiques));
  }

  previousState(): void {
    window.history.back();
  }
}
