import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IVaccinations, Vaccinations } from 'app/shared/model/vaccinations.model';
import { VaccinationsService } from './vaccinations.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-vaccinations-update',
  templateUrl: './vaccinations-update.component.html',
})
export class VaccinationsUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    vaccin: [],
    injection: [],
    methode: [],
    lot: [],
    resultat: [],
    rappel: [],
    user: [],
  });

  constructor(
    protected vaccinationsService: VaccinationsService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vaccinations }) => {
      if (!vaccinations.id) {
        const today = moment().startOf('day');
        vaccinations.date = today;
        vaccinations.rappel = today;
      }

      this.updateForm(vaccinations);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(vaccinations: IVaccinations): void {
    this.editForm.patchValue({
      id: vaccinations.id,
      date: vaccinations.date ? vaccinations.date.format(DATE_TIME_FORMAT) : null,
      vaccin: vaccinations.vaccin,
      injection: vaccinations.injection,
      methode: vaccinations.methode,
      lot: vaccinations.lot,
      resultat: vaccinations.resultat,
      rappel: vaccinations.rappel ? vaccinations.rappel.format(DATE_TIME_FORMAT) : null,
      user: vaccinations.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const vaccinations = this.createFromForm();
    if (vaccinations.id !== undefined) {
      this.subscribeToSaveResponse(this.vaccinationsService.update(vaccinations));
    } else {
      this.subscribeToSaveResponse(this.vaccinationsService.create(vaccinations));
    }
  }

  private createFromForm(): IVaccinations {
    return {
      ...new Vaccinations(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      vaccin: this.editForm.get(['vaccin'])!.value,
      injection: this.editForm.get(['injection'])!.value,
      methode: this.editForm.get(['methode'])!.value,
      lot: this.editForm.get(['lot'])!.value,
      resultat: this.editForm.get(['resultat'])!.value,
      rappel: this.editForm.get(['rappel'])!.value ? moment(this.editForm.get(['rappel'])!.value, DATE_TIME_FORMAT) : undefined,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVaccinations>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
