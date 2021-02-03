import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HospitalTestModule } from '../../../test.module';
import { ExamensBiologiquesComponent } from 'app/entities/examens-biologiques/examens-biologiques.component';
import { ExamensBiologiquesService } from 'app/entities/examens-biologiques/examens-biologiques.service';
import { ExamensBiologiques } from 'app/shared/model/examens-biologiques.model';

describe('Component Tests', () => {
  describe('ExamensBiologiques Management Component', () => {
    let comp: ExamensBiologiquesComponent;
    let fixture: ComponentFixture<ExamensBiologiquesComponent>;
    let service: ExamensBiologiquesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalTestModule],
        declarations: [ExamensBiologiquesComponent],
      })
        .overrideTemplate(ExamensBiologiquesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ExamensBiologiquesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ExamensBiologiquesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ExamensBiologiques(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.examensBiologiques && comp.examensBiologiques[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
