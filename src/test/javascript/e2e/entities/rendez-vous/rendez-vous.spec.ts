import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RendezVousComponentsPage, RendezVousDeleteDialog, RendezVousUpdatePage } from './rendez-vous.page-object';

const expect = chai.expect;

describe('RendezVous e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rendezVousComponentsPage: RendezVousComponentsPage;
  let rendezVousUpdatePage: RendezVousUpdatePage;
  let rendezVousDeleteDialog: RendezVousDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RendezVous', async () => {
    await navBarPage.goToEntity('rendez-vous');
    rendezVousComponentsPage = new RendezVousComponentsPage();
    await browser.wait(ec.visibilityOf(rendezVousComponentsPage.title), 5000);
    expect(await rendezVousComponentsPage.getTitle()).to.eq('hospitalApp.rendezVous.home.title');
    await browser.wait(ec.or(ec.visibilityOf(rendezVousComponentsPage.entities), ec.visibilityOf(rendezVousComponentsPage.noResult)), 1000);
  });

  it('should load create RendezVous page', async () => {
    await rendezVousComponentsPage.clickOnCreateButton();
    rendezVousUpdatePage = new RendezVousUpdatePage();
    expect(await rendezVousUpdatePage.getPageTitle()).to.eq('hospitalApp.rendezVous.home.createOrEditLabel');
    await rendezVousUpdatePage.cancel();
  });

  it('should create and save RendezVous', async () => {
    const nbButtonsBeforeCreate = await rendezVousComponentsPage.countDeleteButtons();

    await rendezVousComponentsPage.clickOnCreateButton();

    await promise.all([
      rendezVousUpdatePage.setNomInput('nom'),
      rendezVousUpdatePage.setPrenomInput('prenom'),
      rendezVousUpdatePage.setAgeInput('5'),
      rendezVousUpdatePage.setCniInput('cni'),
      rendezVousUpdatePage.setTelephoneInput('telephone'),
      rendezVousUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      rendezVousUpdatePage.setHeureInput('heure'),
      rendezVousUpdatePage.userSelectLastOption(),
      rendezVousUpdatePage.departementSelectLastOption(),
    ]);

    expect(await rendezVousUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await rendezVousUpdatePage.getPrenomInput()).to.eq('prenom', 'Expected Prenom value to be equals to prenom');
    expect(await rendezVousUpdatePage.getAgeInput()).to.eq('5', 'Expected age value to be equals to 5');
    expect(await rendezVousUpdatePage.getCniInput()).to.eq('cni', 'Expected Cni value to be equals to cni');
    expect(await rendezVousUpdatePage.getTelephoneInput()).to.eq('telephone', 'Expected Telephone value to be equals to telephone');
    expect(await rendezVousUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
    expect(await rendezVousUpdatePage.getHeureInput()).to.eq('heure', 'Expected Heure value to be equals to heure');

    await rendezVousUpdatePage.save();
    expect(await rendezVousUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await rendezVousComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RendezVous', async () => {
    const nbButtonsBeforeDelete = await rendezVousComponentsPage.countDeleteButtons();
    await rendezVousComponentsPage.clickOnLastDeleteButton();

    rendezVousDeleteDialog = new RendezVousDeleteDialog();
    expect(await rendezVousDeleteDialog.getDialogTitle()).to.eq('hospitalApp.rendezVous.delete.question');
    await rendezVousDeleteDialog.clickOnConfirmButton();

    expect(await rendezVousComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
