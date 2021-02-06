import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { HospitalTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { HistoriqueConsultationsDeleteDialogComponent } from 'app/entities/historique-consultations/historique-consultations-delete-dialog.component';
import { HistoriqueConsultationsService } from 'app/entities/historique-consultations/historique-consultations.service';

describe('Component Tests', () => {
  describe('HistoriqueConsultations Management Delete Component', () => {
    let comp: HistoriqueConsultationsDeleteDialogComponent;
    let fixture: ComponentFixture<HistoriqueConsultationsDeleteDialogComponent>;
    let service: HistoriqueConsultationsService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HospitalTestModule],
        declarations: [HistoriqueConsultationsDeleteDialogComponent],
      })
        .overrideTemplate(HistoriqueConsultationsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HistoriqueConsultationsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistoriqueConsultationsService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
