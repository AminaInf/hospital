import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HospitalTestModule } from '../../../test.module';
import { PlanificationDetailComponent } from 'app/entities/planification/planification-detail.component';
import { Planification } from 'app/shared/model/planification.model';

describe('Component Tests', () => {
  describe('Planification Management Detail Component', () => {
    let comp: PlanificationDetailComponent;
    let fixture: ComponentFixture<PlanificationDetailComponent>;
    const route = ({ data: of({ planification: new Planification(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalTestModule],
        declarations: [PlanificationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PlanificationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlanificationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load planification on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.planification).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
