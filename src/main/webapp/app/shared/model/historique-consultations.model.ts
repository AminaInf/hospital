import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IHistoriqueConsultations {
  id?: number;
  date?: Moment;
  acte?: string;
  motif?: string;
  taille?: number;
  poids?: number;
  ta?: number;
  pouls?: number;
  observation?: string;
  at?: string;
  user?: IUser;
}

export class HistoriqueConsultations implements IHistoriqueConsultations {
  constructor(
    public id?: number,
    public date?: Moment,
    public acte?: string,
    public motif?: string,
    public taille?: number,
    public poids?: number,
    public ta?: number,
    public pouls?: number,
    public observation?: string,
    public at?: string,
    public user?: IUser
  ) {}
}
