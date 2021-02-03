import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HospitalTestModule } from '../../../test.module';
import { VaccinationsDetailComponent } from 'app/entities/vaccinations/vaccinations-detail.component';
import { Vaccinations } from 'app/shared/model/vaccinations.model';

describe('Component Tests', () => {
  describe('Vaccinations Management Detail Component', () => {
    let comp: VaccinationsDetailComponent;
    let fixture: ComponentFixture<VaccinationsDetailComponent>;
    const route = ({ data: of({ vaccinations: new Vaccinations(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalTestModule],
        declarations: [VaccinationsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(VaccinationsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VaccinationsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load vaccinations on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.vaccinations).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
