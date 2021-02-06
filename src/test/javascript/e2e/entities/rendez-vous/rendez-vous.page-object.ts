import { element, by, ElementFinder } from 'protractor';

export class RendezVousComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-rendez-vous div table .btn-danger'));
  title = element.all(by.css('jhi-rendez-vous div h2#page-heading span')).first();
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

export class RendezVousUpdatePage {
  pageTitle = element(by.id('jhi-rendez-vous-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomInput = element(by.id('field_nom'));
  prenomInput = element(by.id('field_prenom'));
  ageInput = element(by.id('field_age'));
  cniInput = element(by.id('field_cni'));
  telephoneInput = element(by.id('field_telephone'));
  dateInput = element(by.id('field_date'));
  heureInput = element(by.id('field_heure'));

  userSelect = element(by.id('field_user'));
  departementSelect = element(by.id('field_departement'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setPrenomInput(prenom: string): Promise<void> {
    await this.prenomInput.sendKeys(prenom);
  }

  async getPrenomInput(): Promise<string> {
    return await this.prenomInput.getAttribute('value');
  }

  async setAgeInput(age: string): Promise<void> {
    await this.ageInput.sendKeys(age);
  }

  async getAgeInput(): Promise<string> {
    return await this.ageInput.getAttribute('value');
  }

  async setCniInput(cni: string): Promise<void> {
    await this.cniInput.sendKeys(cni);
  }

  async getCniInput(): Promise<string> {
    return await this.cniInput.getAttribute('value');
  }

  async setTelephoneInput(telephone: string): Promise<void> {
    await this.telephoneInput.sendKeys(telephone);
  }

  async getTelephoneInput(): Promise<string> {
    return await this.telephoneInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async setHeureInput(heure: string): Promise<void> {
    await this.heureInput.sendKeys(heure);
  }

  async getHeureInput(): Promise<string> {
    return await this.heureInput.getAttribute('value');
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

  async departementSelectLastOption(): Promise<void> {
    await this.departementSelect.all(by.tagName('option')).last().click();
  }

  async departementSelectOption(option: string): Promise<void> {
    await this.departementSelect.sendKeys(option);
  }

  getDepartementSelect(): ElementFinder {
    return this.departementSelect;
  }

  async getDepartementSelectedOption(): Promise<string> {
    return await this.departementSelect.element(by.css('option:checked')).getText();
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

export class RendezVousDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-rendezVous-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-rendezVous'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
