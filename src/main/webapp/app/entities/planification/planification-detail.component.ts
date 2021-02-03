import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlanification } from 'app/shared/model/planification.model';

@Component({
  selector: 'jhi-planification-detail',
  templateUrl: './planification-detail.component.html',
})
export class PlanificationDetailComponent implements OnInit {
  planification: IPlanification | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planification }) => (this.planification = planification));
  }

  previousState(): void {
    window.history.back();
  }
}
