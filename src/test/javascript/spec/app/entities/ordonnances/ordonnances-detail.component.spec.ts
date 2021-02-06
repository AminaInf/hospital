import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HospitalTestModule } from '../../../test.module';
import { OrdonnancesDetailComponent } from 'app/entities/ordonnances/ordonnances-detail.component';
import { Ordonnances } from 'app/shared/model/ordonnances.model';

describe('Component Tests', () => {
  describe('Ordonnances Management Detail Component', () => {
    let comp: OrdonnancesDetailComponent;
    let fixture: ComponentFixture<OrdonnancesDetailComponent>;
    const route = ({ data: of({ ordonnances: new Ordonnances(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalTestModule],
        declarations: [OrdonnancesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(OrdonnancesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrdonnancesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ordonnances on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ordonnances).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
