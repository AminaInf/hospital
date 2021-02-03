import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PlanificationService } from 'app/entities/planification/planification.service';
import { IPlanification, Planification } from 'app/shared/model/planification.model';

describe('Service Tests', () => {
  describe('Planification Service', () => {
    let injector: TestBed;
    let service: PlanificationService;
    let httpMock: HttpTestingController;
    let elemDefault: IPlanification;
    let expectedResult: IPlanification | IPlanification[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PlanificationService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Planification(0, currentDate, 'AAAAAAA', currentDate, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            prevuLe: currentDate.format(DATE_TIME_FORMAT),
            faitLe: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Planification', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            prevuLe: currentDate.format(DATE_TIME_FORMAT),
            faitLe: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            prevuLe: currentDate,
            faitLe: currentDate,
          },
          returnedFromService
        );

        service.create(new Planification()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Planification', () => {
        const returnedFromService = Object.assign(
          {
            prevuLe: currentDate.format(DATE_TIME_FORMAT),
            objet: 'BBBBBB',
            faitLe: currentDate.format(DATE_TIME_FORMAT),
            periodicite: 'BBBBBB',
            resultat: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            prevuLe: currentDate,
            faitLe: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Planification', () => {
        const returnedFromService = Object.assign(
          {
            prevuLe: currentDate.format(DATE_TIME_FORMAT),
            objet: 'BBBBBB',
            faitLe: currentDate.format(DATE_TIME_FORMAT),
            periodicite: 'BBBBBB',
            resultat: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            prevuLe: currentDate,
            faitLe: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Planification', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
