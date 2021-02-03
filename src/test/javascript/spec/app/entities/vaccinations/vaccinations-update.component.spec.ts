import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalTestModule } from '../../../test.module';
import { VaccinationsUpdateComponent } from 'app/entities/vaccinations/vaccinations-update.component';
import { VaccinationsService } from 'app/entities/vaccinations/vaccinations.service';
import { Vaccinations } from 'app/shared/model/vaccinations.model';

describe('Component Tests', () => {
  describe('Vaccinations Management Update Component', () => {
    let comp: VaccinationsUpdateComponent;
    let fixture: ComponentFixture<VaccinationsUpdateComponent>;
    let service: VaccinationsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalTestModule],
        declarations: [VaccinationsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(VaccinationsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VaccinationsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VaccinationsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Vaccinations(123);
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
        const entity = new Vaccinations();
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
