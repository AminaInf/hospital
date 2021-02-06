import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AntecedentsComponentsPage, AntecedentsDeleteDialog, AntecedentsUpdatePage } from './antecedents.page-object';

const expect = chai.expect;

describe('Antecedents e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let antecedentsComponentsPage: AntecedentsComponentsPage;
  let antecedentsUpdatePage: AntecedentsUpdatePage;
  let antecedentsDeleteDialog: AntecedentsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Antecedents', async () => {
    await navBarPage.goToEntity('antecedents');
    antecedentsComponentsPage = new AntecedentsComponentsPage();
    await browser.wait(ec.visibilityOf(antecedentsComponentsPage.title), 5000);
    expect(await antecedentsComponentsPage.getTitle()).to.eq('hospitalApp.antecedents.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(antecedentsComponentsPage.entities), ec.visibilityOf(antecedentsComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Antecedents page', async () => {
    await antecedentsComponentsPage.clickOnCreateButton();
    antecedentsUpdatePage = new AntecedentsUpdatePage();
    expect(await antecedentsUpdatePage.getPageTitle()).to.eq('hospitalApp.antecedents.home.createOrEditLabel');
    await antecedentsUpdatePage.cancel();
  });

  it('should create and save Antecedents', async () => {
    const nbButtonsBeforeCreate = await antecedentsComponentsPage.countDeleteButtons();

    await antecedentsComponentsPage.clickOnCreateButton();

    await promise.all([
      antecedentsUpdatePage.setMedicauxInput('medicaux'),
      antecedentsUpdatePage.setChirurgicauxInput('chirurgicaux'),
      antecedentsUpdatePage.setFamiliauxInput('familiaux'),
      antecedentsUpdatePage.setAlergieIntoleranceInput('alergieIntolerance'),
      antecedentsUpdatePage.userSelectLastOption(),
    ]);

    expect(await antecedentsUpdatePage.getMedicauxInput()).to.eq('medicaux', 'Expected Medicaux value to be equals to medicaux');
    expect(await antecedentsUpdatePage.getChirurgicauxInput()).to.eq(
      'chirurgicaux',
      'Expected Chirurgicaux value to be equals to chirurgicaux'
    );
    expect(await antecedentsUpdatePage.getFamiliauxInput()).to.eq('familiaux', 'Expected Familiaux value to be equals to familiaux');
    expect(await antecedentsUpdatePage.getAlergieIntoleranceInput()).to.eq(
      'alergieIntolerance',
      'Expected AlergieIntolerance value to be equals to alergieIntolerance'
    );

    await antecedentsUpdatePage.save();
    expect(await antecedentsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await antecedentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Antecedents', async () => {
    const nbButtonsBeforeDelete = await antecedentsComponentsPage.countDeleteButtons();
    await antecedentsComponentsPage.clickOnLastDeleteButton();

    antecedentsDeleteDialog = new AntecedentsDeleteDialog();
    expect(await antecedentsDeleteDialog.getDialogTitle()).to.eq('hospitalApp.antecedents.delete.question');
    await antecedentsDeleteDialog.clickOnConfirmButton();

    expect(await antecedentsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
