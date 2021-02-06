import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalTestModule } from '../../../test.module';
import { HistoriqueConsultationsUpdateComponent } from 'app/entities/historique-consultations/historique-consultations-update.component';
import { HistoriqueConsultationsService } from 'app/entities/historique-consultations/historique-consultations.service';
import { HistoriqueConsultations } from 'app/shared/model/historique-consultations.model';

describe('Component Tests', () => {
  describe('HistoriqueConsultations Management Update Component', () => {
    let comp: HistoriqueConsultationsUpdateComponent;
    let fixture: ComponentFixture<HistoriqueConsultationsUpdateComponent>;
    let service: HistoriqueConsultationsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalTestModule],
        declarations: [HistoriqueConsultationsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(HistoriqueConsultationsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistoriqueConsultationsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistoriqueConsultationsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new HistoriqueConsultations(123);
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
        const entity = new HistoriqueConsultations();
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
