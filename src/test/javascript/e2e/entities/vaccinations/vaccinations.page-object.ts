import { element, by, ElementFinder } from 'protractor';

export class VaccinationsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-vaccinations div table .btn-danger'));
  title = element.all(by.css('jhi-vaccinations div h2#page-heading span')).first();
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

export class VaccinationsUpdatePage {
  pageTitle = element(by.id('jhi-vaccinations-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dateInput = element(by.id('field_date'));
  vaccinInput = element(by.id('field_vaccin'));
  injectionInput = element(by.id('field_injection'));
  methodeInput = element(by.id('field_methode'));
  lotInput = element(by.id('field_lot'));
  resultatInput = element(by.id('field_resultat'));
  rappelInput = element(by.id('field_rappel'));

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

  async setVaccinInput(vaccin: string): Promise<void> {
    await this.vaccinInput.sendKeys(vaccin);
  }

  async getVaccinInput(): Promise<string> {
    return await this.vaccinInput.getAttribute('value');
  }

  async setInjectionInput(injection: string): Promise<void> {
    await this.injectionInput.sendKeys(injection);
  }

  async getInjectionInput(): Promise<string> {
    return await this.injectionInput.getAttribute('value');
  }

  async setMethodeInput(methode: string): Promise<void> {
    await this.methodeInput.sendKeys(methode);
  }

  async getMethodeInput(): Promise<string> {
    return await this.methodeInput.getAttribute('value');
  }

  async setLotInput(lot: string): Promise<void> {
    await this.lotInput.sendKeys(lot);
  }

  async getLotInput(): Promise<string> {
    return await this.lotInput.getAttribute('value');
  }

  async setResultatInput(resultat: string): Promise<void> {
    await this.resultatInput.sendKeys(resultat);
  }

  async getResultatInput(): Promise<string> {
    return await this.resultatInput.getAttribute('value');
  }

  async setRappelInput(rappel: string): Promise<void> {
    await this.rappelInput.sendKeys(rappel);
  }

  async getRappelInput(): Promise<string> {
    return await this.rappelInput.getAttribute('value');
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

export class VaccinationsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-vaccinations-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-vaccinations'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
