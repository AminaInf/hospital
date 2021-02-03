import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HospitalTestModule } from '../../../test.module';
import { AntecedentsDetailComponent } from 'app/entities/antecedents/antecedents-detail.component';
import { Antecedents } from 'app/shared/model/antecedents.model';

describe('Component Tests', () => {
  describe('Antecedents Management Detail Component', () => {
    let comp: AntecedentsDetailComponent;
    let fixture: ComponentFixture<AntecedentsDetailComponent>;
    const route = ({ data: of({ antecedents: new Antecedents(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalTestModule],
        declarations: [AntecedentsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AntecedentsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AntecedentsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load antecedents on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.antecedents).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
