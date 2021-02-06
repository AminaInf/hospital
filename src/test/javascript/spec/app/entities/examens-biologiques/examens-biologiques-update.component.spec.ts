import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { HospitalTestModule } from '../../../test.module';
import { ExamensBiologiquesUpdateComponent } from 'app/entities/examens-biologiques/examens-biologiques-update.component';
import { ExamensBiologiquesService } from 'app/entities/examens-biologiques/examens-biologiques.service';
import { ExamensBiologiques } from 'app/shared/model/examens-biologiques.model';

describe('Component Tests', () => {
  describe('ExamensBiologiques Management Update Component', () => {
    let comp: ExamensBiologiquesUpdateComponent;
    let fixture: ComponentFixture<ExamensBiologiquesUpdateComponent>;
    let service: ExamensBiologiquesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalTestModule],
        declarations: [ExamensBiologiquesUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ExamensBiologiquesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExamensBiologiquesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExamensBiologiquesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ExamensBiologiques(123);
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
        const entity = new ExamensBiologiques();
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
