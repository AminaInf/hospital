import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IVaccinations {
  id?: number;
  date?: Moment;
  vaccin?: string;
  injection?: string;
  methode?: string;
  lot?: string;
  resultat?: string;
  rappel?: Moment;
  user?: IUser;
}

export class Vaccinations implements IVaccinations {
  constructor(
    public id?: number,
    public date?: Moment,
    public vaccin?: string,
    public injection?: string,
    public methode?: string,
    public lot?: string,
    public resultat?: string,
    public rappel?: Moment,
    public user?: IUser
  ) {}
}
