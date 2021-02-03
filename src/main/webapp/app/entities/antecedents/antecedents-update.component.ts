import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAntecedents, Antecedents } from 'app/shared/model/antecedents.model';
import { AntecedentsService } from './antecedents.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-antecedents-update',
  templateUrl: './antecedents-update.component.html',
})
export class AntecedentsUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    medicaux: [null, [Validators.minLength(2)]],
    chirurgicaux: [null, [Validators.minLength(2)]],
    familiaux: [null, [Validators.minLength(2)]],
    alergieIntolerance: [null, [Validators.minLength(2)]],
    user: [],
  });

  constructor(
    protected antecedentsService: AntecedentsService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ antecedents }) => {
      this.updateForm(antecedents);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(antecedents: IAntecedents): void {
    this.editForm.patchValue({
      id: antecedents.id,
      medicaux: antecedents.medicaux,
      chirurgicaux: antecedents.chirurgicaux,
      familiaux: antecedents.familiaux,
      alergieIntolerance: antecedents.alergieIntolerance,
      user: antecedents.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const antecedents = this.createFromForm();
    if (antecedents.id !== undefined) {
      this.subscribeToSaveResponse(this.antecedentsService.update(antecedents));
    } else {
      this.subscribeToSaveResponse(this.antecedentsService.create(antecedents));
    }
  }

  private createFromForm(): IAntecedents {
    return {
      ...new Antecedents(),
      id: this.editForm.get(['id'])!.value,
      medicaux: this.editForm.get(['medicaux'])!.value,
      chirurgicaux: this.editForm.get(['chirurgicaux'])!.value,
      familiaux: this.editForm.get(['familiaux'])!.value,
      alergieIntolerance: this.editForm.get(['alergieIntolerance'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAntecedents>>): void {
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
