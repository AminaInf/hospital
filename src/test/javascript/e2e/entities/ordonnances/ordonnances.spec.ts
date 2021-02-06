import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrdonnancesComponentsPage, OrdonnancesDeleteDialog, OrdonnancesUpdatePage } from './ordonnances.page-object';

const expect = chai.expect;

describe('Ordonnances e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ordonnancesComponentsPage: OrdonnancesComponentsPage;
  let ordonnancesUpdatePage: OrdonnancesUpdatePage;
  let ordonnancesDeleteDialog: OrdonnancesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Ordonnances', async () => {
    await navBarPage.goToEntity('ordonnances');
    ordonnancesComponentsPage = new OrdonnancesComponentsPage();
    await browser.wait(ec.visibilityOf(ordonnancesComponentsPage.title), 5000);
    expect(await ordonnancesComponentsPage.getTitle()).to.eq('hospitalApp.ordonnances.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(ordonnancesComponentsPage.entities), ec.visibilityOf(ordonnancesComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Ordonnances page', async () => {
    await ordonnancesComponentsPage.clickOnCreateButton();
    ordonnancesUpdatePage = new OrdonnancesUpdatePage();
    expect(await ordonnancesUpdatePage.getPageTitle()).to.eq('hospitalApp.ordonnances.home.createOrEditLabel');
    await ordonnancesUpdatePage.cancel();
  });

  it('should create and save Ordonnances', async () => {
    const nbButtonsBeforeCreate = await ordonnancesComponentsPage.countDeleteButtons();

    await ordonnancesComponentsPage.clickOnCreateButton();

    await promise.all([
      ordonnancesUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      ordonnancesUpdatePage.setCategorieInput('categorie'),
      ordonnancesUpdatePage.setPrescriptionInput('prescription'),
      ordonnancesUpdatePage.userSelectLastOption(),
    ]);

    expect(await ordonnancesUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
    expect(await ordonnancesUpdatePage.getCategorieInput()).to.eq('categorie', 'Expected Categorie value to be equals to categorie');
    expect(await ordonnancesUpdatePage.getPrescriptionInput()).to.eq(
      'prescription',
      'Expected Prescription value to be equals to prescription'
    );

    await ordonnancesUpdatePage.save();
    expect(await ordonnancesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ordonnancesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Ordonnances', async () => {
    const nbButtonsBeforeDelete = await ordonnancesComponentsPage.countDeleteButtons();
    await ordonnancesComponentsPage.clickOnLastDeleteButton();

    ordonnancesDeleteDialog = new OrdonnancesDeleteDialog();
    expect(await ordonnancesDeleteDialog.getDialogTitle()).to.eq('hospitalApp.ordonnances.delete.question');
    await ordonnancesDeleteDialog.clickOnConfirmButton();

    expect(await ordonnancesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
