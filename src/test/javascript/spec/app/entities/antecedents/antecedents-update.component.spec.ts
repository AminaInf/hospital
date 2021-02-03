import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalTestModule } from '../../../test.module';
import { AntecedentsUpdateComponent } from 'app/entities/antecedents/antecedents-update.component';
import { AntecedentsService } from 'app/entities/antecedents/antecedents.service';
import { Antecedents } from 'app/shared/model/antecedents.model';

describe('Component Tests', () => {
  describe('Antecedents Management Update Component', () => {
    let comp: AntecedentsUpdateComponent;
    let fixture: ComponentFixture<AntecedentsUpdateComponent>;
    let service: AntecedentsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalTestModule],
        declarations: [AntecedentsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AntecedentsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AntecedentsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AntecedentsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Antecedents(123);
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
        const entity = new Antecedents();
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
