import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVaccinations } from 'app/shared/model/vaccinations.model';

@Component({
  selector: 'jhi-vaccinations-detail',
  templateUrl: './vaccinations-detail.component.html',
})
export class VaccinationsDetailComponent implements OnInit {
  vaccinations: IVaccinations | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vaccinations }) => (this.vaccinations = vaccinations));
  }

  previousState(): void {
    window.history.back();
  }
}
