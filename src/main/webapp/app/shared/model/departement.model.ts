export interface IDepartement {
  id?: number;
  libelle?: string;
}

export class Departement implements IDepartement {
  constructor(public id?: number, public libelle?: string) {}
}
