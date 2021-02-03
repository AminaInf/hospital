import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalTestModule } from '../../../test.module';
import { OrdonnancesUpdateComponent } from 'app/entities/ordonnances/ordonnances-update.component';
import { OrdonnancesService } from 'app/entities/ordonnances/ordonnances.service';
import { Ordonnances } from 'app/shared/model/ordonnances.model';

describe('Component Tests', () => {
  describe('Ordonnances Management Update Component', () => {
    let comp: OrdonnancesUpdateComponent;
    let fixture: ComponentFixture<OrdonnancesUpdateComponent>;
    let service: OrdonnancesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalTestModule],
        declarations: [OrdonnancesUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(OrdonnancesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrdonnancesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrdonnancesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ordonnances(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ordonnances();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
