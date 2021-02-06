import { element, by, ElementFinder } from 'protractor';

export class HistoriqueConsultationsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-historique-consultations div table .btn-danger'));
  title = element.all(by.css('jhi-historique-consultations div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class HistoriqueConsultationsUpdatePage {
  pageTitle = element(by.id('jhi-historique-consultations-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dateInput = element(by.id('field_date'));
  acteInput = element(by.id('field_acte'));
  motifInput = element(by.id('field_motif'));
  tailleInput = element(by.id('field_taille'));
  poidsInput = element(by.id('field_poids'));
  taInput = element(by.id('field_ta'));
  poulsInput = element(by.id('field_pouls'));
  observationInput = element(by.id('field_observation'));
  atInput = element(by.id('field_at'));

  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async setActeInput(acte: string): Promise<void> {
    await this.acteInput.sendKeys(acte);
  }

  async getActeInput(): Promise<string> {
    return await this.acteInput.getAttribute('value');
  }

  async setMotifInput(motif: string): Promise<void> {
    await this.motifInput.sendKeys(motif);
  }

  async getMotifInput(): Promise<string> {
    return await this.motifInput.getAttribute('value');
  }

  async setTailleInput(taille: string): Promise<void> {
    await this.tailleInput.sendKeys(taille);
  }

  async getTailleInput(): Promise<string> {
    return await this.tailleInput.getAttribute('value');
  }

  async setPoidsInput(poids: string): Promise<void> {
    await this.poidsInput.sendKeys(poids);
  }

  async getPoidsInput(): Promise<string> {
    return await this.poidsInput.getAttribute('value');
  }

  async setTaInput(ta: string): Promise<void> {
    await this.taInput.sendKeys(ta);
  }

  async getTaInput(): Promise<string> {
    return await this.taInput.getAttribute('value');
  }

  async setPoulsInput(pouls: string): Promise<void> {
    await this.poulsInput.sendKeys(pouls);
  }

  async getPoulsInput(): Promise<string> {
    return await this.poulsInput.getAttribute('value');
  }

  async setObservationInput(observation: string): Promise<void> {
    await this.observationInput.sendKeys(observation);
  }

  async getObservationInput(): Promise<string> {
    return await this.observationInput.getAttribute('value');
  }

  async setAtInput(at: string): Promise<void> {
    await this.atInput.sendKeys(at);
  }

  async getAtInput(): Promise<string> {
    return await this.atInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class HistoriqueConsultationsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-historiqueConsultations-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-historiqueConsultations'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
