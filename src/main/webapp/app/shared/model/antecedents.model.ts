import { IUser } from 'app/core/user/user.model';

export interface IAntecedents {
  id?: number;
  medicaux?: string;
  chirurgicaux?: string;
  familiaux?: string;
  alergieIntolerance?: string;
  user?: IUser;
}

export class Antecedents implements IAntecedents {
  constructor(
    public id?: number,
    public medicaux?: string,
    public chirurgicaux?: string,
    public familiaux?: string,
    public alergieIntolerance?: string,
    public user?: IUser
  ) {}
}
