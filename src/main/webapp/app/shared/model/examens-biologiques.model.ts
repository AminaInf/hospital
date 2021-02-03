import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IExamensBiologiques {
  id?: number;
  date?: Moment;
  texte?: string;
  user?: IUser;
}

export class ExamensBiologiques implements IExamensBiologiques {
  constructor(public id?: number, public date?: Moment, public texte?: string, public user?: IUser) {}
}
