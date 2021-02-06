import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IOrdonnances {
  id?: number;
  date?: Moment;
  categorie?: string;
  prescription?: string;
  user?: IUser;
}

export class Ordonnances implements IOrdonnances {
  constructor(public id?: number, public date?: Moment, public categorie?: string, public prescription?: string, public user?: IUser) {}
}
