import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HospitalTestModule } from '../../../test.module';
import { HistoriqueConsultationsDetailComponent } from 'app/entities/historique-consultations/historique-consultations-detail.component';
import { HistoriqueConsultations } from 'app/shared/model/historique-consultations.model';

describe('Component Tests', () => {
  describe('HistoriqueConsultations Management Detail Component', () => {
    let comp: HistoriqueConsultationsDetailComponent;
    let fixture: ComponentFixture<HistoriqueConsultationsDetailComponent>;
    const route = ({ data: of({ historiqueConsultations: new HistoriqueConsultations(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalTestModule],
        declarations: [HistoriqueConsultationsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(HistoriqueConsultationsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HistoriqueConsultationsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load historiqueConsultations on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.historiqueConsultations).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
