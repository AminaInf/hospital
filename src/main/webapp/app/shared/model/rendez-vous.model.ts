import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IDepartement } from 'app/shared/model/departement.model';

export interface IRendezVous {
  id?: number;
  nom?: string;
  prenom?: string;
  age?: number;
  cni?: string;
  telephone?: string;
  date?: Moment;
  heure?: string;
  user?: IUser;
  departement?: IDepartement;
}

export class RendezVous implements IRendezVous {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public age?: number,
    public cni?: string,
    public telephone?: string,
    public date?: Moment,
    public heure?: string,
    public user?: IUser,
    public departement?: IDepartement
  ) {}
}
