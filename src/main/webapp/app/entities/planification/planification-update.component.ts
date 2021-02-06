import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPlanification, Planification } from 'app/shared/model/planification.model';
import { PlanificationService } from './planification.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-planification-update',
  templateUrl: './planification-update.component.html',
})
export class PlanificationUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    prevuLe: [],
    objet: [],
    faitLe: [],
    periodicite: [],
    resultat: [],
    user: [],
  });

  constructor(
    protected planificationService: PlanificationService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ planification }) => {
      if (!planification.id) {
        const today = moment().startOf('day');
        planification.prevuLe = today;
        planification.faitLe = today;
      }

      this.updateForm(planification);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(planification: IPlanification): void {
    this.editForm.patchValue({
      id: planification.id,
      prevuLe: planification.prevuLe ? planification.prevuLe.format(DATE_TIME_FORMAT) : null,
      objet: planification.objet,
      faitLe: planification.faitLe ? planification.faitLe.format(DATE_TIME_FORMAT) : null,
      periodicite: planification.periodicite,
      resultat: planification.resultat,
      user: planification.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const planification = this.createFromForm();
    if (planification.id !== undefined) {
      this.subscribeToSaveResponse(this.planificationService.update(planification));
    } else {
      this.subscribeToSaveResponse(this.planificationService.create(planification));
    }
  }

  private createFromForm(): IPlanification {
    return {
      ...new Planification(),
      id: this.editForm.get(['id'])!.value,
      prevuLe: this.editForm.get(['prevuLe'])!.value ? moment(this.editForm.get(['prevuLe'])!.value, DATE_TIME_FORMAT) : undefined,
      objet: this.editForm.get(['objet'])!.value,
      faitLe: this.editForm.get(['faitLe'])!.value ? moment(this.editForm.get(['faitLe'])!.value, DATE_TIME_FORMAT) : undefined,
      periodicite: this.editForm.get(['periodicite'])!.value,
      resultat: this.editForm.get(['resultat'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlanification>>): void {
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
