import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HospitalTestModule } from '../../../test.module';
import { ExamensBiologiquesDetailComponent } from 'app/entities/examens-biologiques/examens-biologiques-detail.component';
import { ExamensBiologiques } from 'app/shared/model/examens-biologiques.model';

describe('Component Tests', () => {
  describe('ExamensBiologiques Management Detail Component', () => {
    let comp: ExamensBiologiquesDetailComponent;
    let fixture: ComponentFixture<ExamensBiologiquesDetailComponent>;
    const route = ({ data: of({ examensBiologiques: new ExamensBiologiques(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalTestModule],
        declarations: [ExamensBiologiquesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ExamensBiologiquesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExamensBiologiquesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load examensBiologiques on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.examensBiologiques).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
