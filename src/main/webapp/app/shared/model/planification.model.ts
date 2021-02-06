import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IPlanification {
  id?: number;
  prevuLe?: Moment;
  objet?: string;
  faitLe?: Moment;
  periodicite?: string;
  resultat?: string;
  user?: IUser;
}

export class Planification implements IPlanification {
  constructor(
    public id?: number,
    public prevuLe?: Moment,
    public objet?: string,
    public faitLe?: Moment,
    public periodicite?: string,
    public resultat?: string,
    public user?: IUser
  ) {}
}
