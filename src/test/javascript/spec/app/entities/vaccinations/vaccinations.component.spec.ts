import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HospitalTestModule } from '../../../test.module';
import { VaccinationsComponent } from 'app/entities/vaccinations/vaccinations.component';
import { VaccinationsService } from 'app/entities/vaccinations/vaccinations.service';
import { Vaccinations } from 'app/shared/model/vaccinations.model';

describe('Component Tests', () => {
  describe('Vaccinations Management Component', () => {
    let comp: VaccinationsComponent;
    let fixture: ComponentFixture<VaccinationsComponent>;
    let service: VaccinationsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalTestModule],
        declarations: [VaccinationsComponent],
      })
        .overrideTemplate(VaccinationsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VaccinationsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VaccinationsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Vaccinations(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.vaccinations && comp.vaccinations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
