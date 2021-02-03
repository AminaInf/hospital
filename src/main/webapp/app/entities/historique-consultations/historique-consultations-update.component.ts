import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IHistoriqueConsultations, HistoriqueConsultations } from 'app/shared/model/historique-consultations.model';
import { HistoriqueConsultationsService } from './historique-consultations.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-historique-consultations-update',
  templateUrl: './historique-consultations-update.component.html',
})
export class HistoriqueConsultationsUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    acte: [],
    motif: [],
    taille: [],
    poids: [],
    ta: [],
    pouls: [],
    observation: [],
    at: [],
    user: [],
  });

  constructor(
    protected historiqueConsultationsService: HistoriqueConsultationsService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historiqueConsultations }) => {
      if (!historiqueConsultations.id) {
        const today = moment().startOf('day');
        historiqueConsultations.date = today;
      }

      this.updateForm(historiqueConsultations);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(historiqueConsultations: IHistoriqueConsultations): void {
    this.editForm.patchValue({
      id: historiqueConsultations.id,
      date: historiqueConsultations.date ? historiqueConsultations.date.format(DATE_TIME_FORMAT) : null,
      acte: historiqueConsultations.acte,
      motif: historiqueConsultations.motif,
      taille: historiqueConsultations.taille,
      poids: historiqueConsultations.poids,
      ta: historiqueConsultations.ta,
      pouls: historiqueConsultations.pouls,
      observation: historiqueConsultations.observation,
      at: historiqueConsultations.at,
      user: historiqueConsultations.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const historiqueConsultations = this.createFromForm();
    if (historiqueConsultations.id !== undefined) {
      this.subscribeToSaveResponse(this.historiqueConsultationsService.update(historiqueConsultations));
    } else {
      this.subscribeToSaveResponse(this.historiqueConsultationsService.create(historiqueConsultations));
    }
  }

  private createFromForm(): IHistoriqueConsultations {
    return {
      ...new HistoriqueConsultations(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      acte: this.editForm.get(['acte'])!.value,
      motif: this.editForm.get(['motif'])!.value,
      taille: this.editForm.get(['taille'])!.value,
      poids: this.editForm.get(['poids'])!.value,
      ta: this.editForm.get(['ta'])!.value,
      pouls: this.editForm.get(['pouls'])!.value,
      observation: this.editForm.get(['observation'])!.value,
      at: this.editForm.get(['at'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistoriqueConsultations>>): void {
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
