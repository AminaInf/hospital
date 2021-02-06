import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOrdonnances, Ordonnances } from 'app/shared/model/ordonnances.model';
import { OrdonnancesService } from './ordonnances.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-ordonnances-update',
  templateUrl: './ordonnances-update.component.html',
})
export class OrdonnancesUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    categorie: [],
    prescription: [],
    user: [],
  });

  constructor(
    protected ordonnancesService: OrdonnancesService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ordonnances }) => {
      if (!ordonnances.id) {
        const today = moment().startOf('day');
        ordonnances.date = today;
      }

      this.updateForm(ordonnances);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(ordonnances: IOrdonnances): void {
    this.editForm.patchValue({
      id: ordonnances.id,
      date: ordonnances.date ? ordonnances.date.format(DATE_TIME_FORMAT) : null,
      categorie: ordonnances.categorie,
      prescription: ordonnances.prescription,
      user: ordonnances.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ordonnances = this.createFromForm();
    if (ordonnances.id !== undefined) {
      this.subscribeToSaveResponse(this.ordonnancesService.update(ordonnances));
    } else {
      this.subscribeToSaveResponse(this.ordonnancesService.create(ordonnances));
    }
  }

  private createFromForm(): IOrdonnances {
    return {
      ...new Ordonnances(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      categorie: this.editForm.get(['categorie'])!.value,
      prescription: this.editForm.get(['prescription'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrdonnances>>): void {
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
