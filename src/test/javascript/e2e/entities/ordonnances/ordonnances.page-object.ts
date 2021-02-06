import { element, by, ElementFinder } from 'protractor';

export class OrdonnancesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ordonnances div table .btn-danger'));
  title = element.all(by.css('jhi-ordonnances div h2#page-heading span')).first();
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

export class OrdonnancesUpdatePage {
  pageTitle = element(by.id('jhi-ordonnances-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dateInput = element(by.id('field_date'));
  categorieInput = element(by.id('field_categorie'));
  prescriptionInput = element(by.id('field_prescription'));

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

  async setCategorieInput(categorie: string): Promise<void> {
    await this.categorieInput.sendKeys(categorie);
  }

  async getCategorieInput(): Promise<string> {
    return await this.categorieInput.getAttribute('value');
  }

  async setPrescriptionInput(prescription: string): Promise<void> {
    await this.prescriptionInput.sendKeys(prescription);
  }

  async getPrescriptionInput(): Promise<string> {
    return await this.prescriptionInput.getAttribute('value');
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

export class OrdonnancesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ordonnances-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ordonnances'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
