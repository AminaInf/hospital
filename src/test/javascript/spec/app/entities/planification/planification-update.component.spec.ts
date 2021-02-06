import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalTestModule } from '../../../test.module';
import { PlanificationUpdateComponent } from 'app/entities/planification/planification-update.component';
import { PlanificationService } from 'app/entities/planification/planification.service';
import { Planification } from 'app/shared/model/planification.model';

describe('Component Tests', () => {
  describe('Planification Management Update Component', () => {
    let comp: PlanificationUpdateComponent;
    let fixture: ComponentFixture<PlanificationUpdateComponent>;
    let service: PlanificationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalTestModule],
        declarations: [PlanificationUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PlanificationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlanificationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlanificationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Planification(123);
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
        const entity = new Planification();
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
