import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IExamensBiologiques, ExamensBiologiques } from 'app/shared/model/examens-biologiques.model';
import { ExamensBiologiquesService } from './examens-biologiques.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-examens-biologiques-update',
  templateUrl: './examens-biologiques-update.component.html',
})
export class ExamensBiologiquesUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    texte: [],
    user: [],
  });

  constructor(
    protected examensBiologiquesService: ExamensBiologiquesService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ examensBiologiques }) => {
      if (!examensBiologiques.id) {
        const today = moment().startOf('day');
        examensBiologiques.date = today;
      }

      this.updateForm(examensBiologiques);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(examensBiologiques: IExamensBiologiques): void {
    this.editForm.patchValue({
      id: examensBiologiques.id,
      date: examensBiologiques.date ? examensBiologiques.date.format(DATE_TIME_FORMAT) : null,
      texte: examensBiologiques.texte,
      user: examensBiologiques.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const examensBiologiques = this.createFromForm();
    if (examensBiologiques.id !== undefined) {
      this.subscribeToSaveResponse(this.examensBiologiquesService.update(examensBiologiques));
    } else {
      this.subscribeToSaveResponse(this.examensBiologiquesService.create(examensBiologiques));
    }
  }

  private createFromForm(): IExamensBiologiques {
    return {
      ...new ExamensBiologiques(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      texte: this.editForm.get(['texte'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExamensBiologiques>>): void {
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
