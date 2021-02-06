import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRendezVous, RendezVous } from 'app/shared/model/rendez-vous.model';
import { RendezVousService } from './rendez-vous.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IDepartement } from 'app/shared/model/departement.model';
import { DepartementService } from 'app/entities/departement/departement.service';

type SelectableEntity = IUser | IDepartement;

@Component({
  selector: 'jhi-rendez-vous-update',
  templateUrl: './rendez-vous-update.component.html',
})
export class RendezVousUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  departements: IDepartement[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required, Validators.minLength(2)]],
    prenom: [null, [Validators.required, Validators.minLength(2)]],
    age: [null, [Validators.required]],
    cni: [null, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    telephone: [],
    date: [null, [Validators.required]],
    heure: [null, [Validators.required]],
    user: [],
    departement: [],
  });

  constructor(
    protected rendezVousService: RendezVousService,
    protected userService: UserService,
    protected departementService: DepartementService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rendezVous }) => {
      if (!rendezVous.id) {
        const today = moment().startOf('day');
        rendezVous.date = today;
      }

      this.updateForm(rendezVous);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.departementService.query().subscribe((res: HttpResponse<IDepartement[]>) => (this.departements = res.body || []));
    });
  }

  updateForm(rendezVous: IRendezVous): void {
    this.editForm.patchValue({
      id: rendezVous.id,
      nom: rendezVous.nom,
      prenom: rendezVous.prenom,
      age: rendezVous.age,
      cni: rendezVous.cni,
      telephone: rendezVous.telephone,
      date: rendezVous.date ? rendezVous.date.format(DATE_TIME_FORMAT) : null,
      heure: rendezVous.heure,
      user: rendezVous.user,
      departement: rendezVous.departement,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rendezVous = this.createFromForm();
    if (rendezVous.id !== undefined) {
      this.subscribeToSaveResponse(this.rendezVousService.update(rendezVous));
    } else {
      this.subscribeToSaveResponse(this.rendezVousService.create(rendezVous));
    }
  }

  private createFromForm(): IRendezVous {
    return {
      ...new RendezVous(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      age: this.editForm.get(['age'])!.value,
      cni: this.editForm.get(['cni'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      heure: this.editForm.get(['heure'])!.value,
      user: this.editForm.get(['user'])!.value,
      departement: this.editForm.get(['departement'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRendezVous>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
