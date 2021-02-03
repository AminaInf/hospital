import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAntecedents } from 'app/shared/model/antecedents.model';

@Component({
  selector: 'jhi-antecedents-detail',
  templateUrl: './antecedents-detail.component.html',
})
export class AntecedentsDetailComponent implements OnInit {
  antecedents: IAntecedents | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ antecedents }) => (this.antecedents = antecedents));
  }

  previousState(): void {
    window.history.back();
  }
}
