import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ExamensBiologiquesComponentsPage,
  ExamensBiologiquesDeleteDialog,
  ExamensBiologiquesUpdatePage,
} from './examens-biologiques.page-object';

const expect = chai.expect;

describe('ExamensBiologiques e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let examensBiologiquesComponentsPage: ExamensBiologiquesComponentsPage;
  let examensBiologiquesUpdatePage: ExamensBiologiquesUpdatePage;
  let examensBiologiquesDeleteDialog: ExamensBiologiquesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ExamensBiologiques', async () => {
    await navBarPage.goToEntity('examens-biologiques');
    examensBiologiquesComponentsPage = new ExamensBiologiquesComponentsPage();
    await browser.wait(ec.visibilityOf(examensBiologiquesComponentsPage.title), 5000);
    expect(await examensBiologiquesComponentsPage.getTitle()).to.eq('hospitalApp.examensBiologiques.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(examensBiologiquesComponentsPage.entities), ec.visibilityOf(examensBiologiquesComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ExamensBiologiques page', async () => {
    await examensBiologiquesComponentsPage.clickOnCreateButton();
    examensBiologiquesUpdatePage = new ExamensBiologiquesUpdatePage();
    expect(await examensBiologiquesUpdatePage.getPageTitle()).to.eq('hospitalApp.examensBiologiques.home.createOrEditLabel');
    await examensBiologiquesUpdatePage.cancel();
  });

  it('should create and save ExamensBiologiques', async () => {
    const nbButtonsBeforeCreate = await examensBiologiquesComponentsPage.countDeleteButtons();

    await examensBiologiquesComponentsPage.clickOnCreateButton();

    await promise.all([
      examensBiologiquesUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      examensBiologiquesUpdatePage.setTexteInput('texte'),
      examensBiologiquesUpdatePage.userSelectLastOption(),
    ]);

    expect(await examensBiologiquesUpdatePage.getDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected date value to be equals to 2000-12-31'
    );
    expect(await examensBiologiquesUpdatePage.getTexteInput()).to.eq('texte', 'Expected Texte value to be equals to texte');

    await examensBiologiquesUpdatePage.save();
    expect(await examensBiologiquesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await examensBiologiquesComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ExamensBiologiques', async () => {
    const nbButtonsBeforeDelete = await examensBiologiquesComponentsPage.countDeleteButtons();
    await examensBiologiquesComponentsPage.clickOnLastDeleteButton();

    examensBiologiquesDeleteDialog = new ExamensBiologiquesDeleteDialog();
    expect(await examensBiologiquesDeleteDialog.getDialogTitle()).to.eq('hospitalApp.examensBiologiques.delete.question');
    await examensBiologiquesDeleteDialog.clickOnConfirmButton();

    expect(await examensBiologiquesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
