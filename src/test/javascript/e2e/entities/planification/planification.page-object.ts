import { element, by, ElementFinder } from 'protractor';

export class PlanificationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-planification div table .btn-danger'));
  title = element.all(by.css('jhi-planification div h2#page-heading span')).first();
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

export class PlanificationUpdatePage {
  pageTitle = element(by.id('jhi-planification-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  prevuLeInput = element(by.id('field_prevuLe'));
  objetInput = element(by.id('field_objet'));
  faitLeInput = element(by.id('field_faitLe'));
  periodiciteInput = element(by.id('field_periodicite'));
  resultatInput = element(by.id('field_resultat'));

  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPrevuLeInput(prevuLe: string): Promise<void> {
    await this.prevuLeInput.sendKeys(prevuLe);
  }

  async getPrevuLeInput(): Promise<string> {
    return await this.prevuLeInput.getAttribute('value');
  }

  async setObjetInput(objet: string): Promise<void> {
    await this.objetInput.sendKeys(objet);
  }

  async getObjetInput(): Promise<string> {
    return await this.objetInput.getAttribute('value');
  }

  async setFaitLeInput(faitLe: string): Promise<void> {
    await this.faitLeInput.sendKeys(faitLe);
  }

  async getFaitLeInput(): Promise<string> {
    return await this.faitLeInput.getAttribute('value');
  }

  async setPeriodiciteInput(periodicite: string): Promise<void> {
    await this.periodiciteInput.sendKeys(periodicite);
  }

  async getPeriodiciteInput(): Promise<string> {
    return await this.periodiciteInput.getAttribute('value');
  }

  async setResultatInput(resultat: string): Promise<void> {
    await this.resultatInput.sendKeys(resultat);
  }

  async getResultatInput(): Promise<string> {
    return await this.resultatInput.getAttribute('value');
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

export class PlanificationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-planification-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-planification'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
