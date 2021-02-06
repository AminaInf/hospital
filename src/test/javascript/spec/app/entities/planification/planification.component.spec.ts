import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HospitalTestModule } from '../../../test.module';
import { PlanificationComponent } from 'app/entities/planification/planification.component';
import { PlanificationService } from 'app/entities/planification/planification.service';
import { Planification } from 'app/shared/model/planification.model';

describe('Component Tests', () => {
  describe('Planification Management Component', () => {
    let comp: PlanificationComponent;
    let fixture: ComponentFixture<PlanificationComponent>;
    let service: PlanificationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalTestModule],
        declarations: [PlanificationComponent],
      })
        .overrideTemplate(PlanificationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlanificationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlanificationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Planification(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.planifications && comp.planifications[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
