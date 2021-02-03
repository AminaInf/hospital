import { element, by, ElementFinder } from 'protractor';

export class AntecedentsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-antecedents div table .btn-danger'));
  title = element.all(by.css('jhi-antecedents div h2#page-heading span')).first();
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

export class AntecedentsUpdatePage {
  pageTitle = element(by.id('jhi-antecedents-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  medicauxInput = element(by.id('field_medicaux'));
  chirurgicauxInput = element(by.id('field_chirurgicaux'));
  familiauxInput = element(by.id('field_familiaux'));
  alergieIntoleranceInput = element(by.id('field_alergieIntolerance'));

  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setMedicauxInput(medicaux: string): Promise<void> {
    await this.medicauxInput.sendKeys(medicaux);
  }

  async getMedicauxInput(): Promise<string> {
    return await this.medicauxInput.getAttribute('value');
  }

  async setChirurgicauxInput(chirurgicaux: string): Promise<void> {
    await this.chirurgicauxInput.sendKeys(chirurgicaux);
  }

  async getChirurgicauxInput(): Promise<string> {
    return await this.chirurgicauxInput.getAttribute('value');
  }

  async setFamiliauxInput(familiaux: string): Promise<void> {
    await this.familiauxInput.sendKeys(familiaux);
  }

  async getFamiliauxInput(): Promise<string> {
    return await this.familiauxInput.getAttribute('value');
  }

  async setAlergieIntoleranceInput(alergieIntolerance: string): Promise<void> {
    await this.alergieIntoleranceInput.sendKeys(alergieIntolerance);
  }

  async getAlergieIntoleranceInput(): Promise<string> {
    return await this.alergieIntoleranceInput.getAttribute('value');
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

export class AntecedentsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-antecedents-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-antecedents'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
