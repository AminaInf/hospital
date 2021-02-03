import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VaccinationsComponentsPage, VaccinationsDeleteDialog, VaccinationsUpdatePage } from './vaccinations.page-object';

const expect = chai.expect;

describe('Vaccinations e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vaccinationsComponentsPage: VaccinationsComponentsPage;
  let vaccinationsUpdatePage: VaccinationsUpdatePage;
  let vaccinationsDeleteDialog: VaccinationsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Vaccinations', async () => {
    await navBarPage.goToEntity('vaccinations');
    vaccinationsComponentsPage = new VaccinationsComponentsPage();
    await browser.wait(ec.visibilityOf(vaccinationsComponentsPage.title), 5000);
    expect(await vaccinationsComponentsPage.getTitle()).to.eq('hospitalApp.vaccinations.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(vaccinationsComponentsPage.entities), ec.visibilityOf(vaccinationsComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Vaccinations page', async () => {
    await vaccinationsComponentsPage.clickOnCreateButton();
    vaccinationsUpdatePage = new VaccinationsUpdatePage();
    expect(await vaccinationsUpdatePage.getPageTitle()).to.eq('hospitalApp.vaccinations.home.createOrEditLabel');
    await vaccinationsUpdatePage.cancel();
  });

  it('should create and save Vaccinations', async () => {
    const nbButtonsBeforeCreate = await vaccinationsComponentsPage.countDeleteButtons();

    await vaccinationsComponentsPage.clickOnCreateButton();

    await promise.all([
      vaccinationsUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      vaccinationsUpdatePage.setVaccinInput('vaccin'),
      vaccinationsUpdatePage.setInjectionInput('injection'),
      vaccinationsUpdatePage.setMethodeInput('methode'),
      vaccinationsUpdatePage.setLotInput('lot'),
      vaccinationsUpdatePage.setResultatInput('resultat'),
      vaccinationsUpdatePage.setRappelInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      vaccinationsUpdatePage.userSelectLastOption(),
    ]);

    expect(await vaccinationsUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
    expect(await vaccinationsUpdatePage.getVaccinInput()).to.eq('vaccin', 'Expected Vaccin value to be equals to vaccin');
    expect(await vaccinationsUpdatePage.getInjectionInput()).to.eq('injection', 'Expected Injection value to be equals to injection');
    expect(await vaccinationsUpdatePage.getMethodeInput()).to.eq('methode', 'Expected Methode value to be equals to methode');
    expect(await vaccinationsUpdatePage.getLotInput()).to.eq('lot', 'Expected Lot value to be equals to lot');
    expect(await vaccinationsUpdatePage.getResultatInput()).to.eq('resultat', 'Expected Resultat value to be equals to resultat');
    expect(await vaccinationsUpdatePage.getRappelInput()).to.contain(
      '2001-01-01T02:30',
      'Expected rappel value to be equals to 2000-12-31'
    );

    await vaccinationsUpdatePage.save();
    expect(await vaccinationsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await vaccinationsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Vaccinations', async () => {
    const nbButtonsBeforeDelete = await vaccinationsComponentsPage.countDeleteButtons();
    await vaccinationsComponentsPage.clickOnLastDeleteButton();

    vaccinationsDeleteDialog = new VaccinationsDeleteDialog();
    expect(await vaccinationsDeleteDialog.getDialogTitle()).to.eq('hospitalApp.vaccinations.delete.question');
    await vaccinationsDeleteDialog.clickOnConfirmButton();

    expect(await vaccinationsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
