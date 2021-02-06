import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  HistoriqueConsultationsComponentsPage,
  HistoriqueConsultationsDeleteDialog,
  HistoriqueConsultationsUpdatePage,
} from './historique-consultations.page-object';

const expect = chai.expect;

describe('HistoriqueConsultations e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let historiqueConsultationsComponentsPage: HistoriqueConsultationsComponentsPage;
  let historiqueConsultationsUpdatePage: HistoriqueConsultationsUpdatePage;
  let historiqueConsultationsDeleteDialog: HistoriqueConsultationsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load HistoriqueConsultations', async () => {
    await navBarPage.goToEntity('historique-consultations');
    historiqueConsultationsComponentsPage = new HistoriqueConsultationsComponentsPage();
    await browser.wait(ec.visibilityOf(historiqueConsultationsComponentsPage.title), 5000);
    expect(await historiqueConsultationsComponentsPage.getTitle()).to.eq('hospitalApp.historiqueConsultations.home.title');
    await browser.wait(
      ec.or(
        ec.visibilityOf(historiqueConsultationsComponentsPage.entities),
        ec.visibilityOf(historiqueConsultationsComponentsPage.noResult)
      ),
      1000
    );
  });

  it('should load create HistoriqueConsultations page', async () => {
    await historiqueConsultationsComponentsPage.clickOnCreateButton();
    historiqueConsultationsUpdatePage = new HistoriqueConsultationsUpdatePage();
    expect(await historiqueConsultationsUpdatePage.getPageTitle()).to.eq('hospitalApp.historiqueConsultations.home.createOrEditLabel');
    await historiqueConsultationsUpdatePage.cancel();
  });

  it('should create and save HistoriqueConsultations', async () => {
    const nbButtonsBeforeCreate = await historiqueConsultationsComponentsPage.countDeleteButtons();

    await historiqueConsultationsComponentsPage.clickOnCreateButton();

    await promise.all([
      historiqueConsultationsUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      historiqueConsultationsUpdatePage.setActeInput('acte'),
      historiqueConsultationsUpdatePage.setMotifInput('motif'),
      historiqueConsultationsUpdatePage.setTailleInput('5'),
      historiqueConsultationsUpdatePage.setPoidsInput('5'),
      historiqueConsultationsUpdatePage.setTaInput('5'),
      historiqueConsultationsUpdatePage.setPoulsInput('5'),
      historiqueConsultationsUpdatePage.setObservationInput('observation'),
      historiqueConsultationsUpdatePage.setAtInput('at'),
      historiqueConsultationsUpdatePage.userSelectLastOption(),
    ]);

    expect(await historiqueConsultationsUpdatePage.getDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected date value to be equals to 2000-12-31'
    );
    expect(await historiqueConsultationsUpdatePage.getActeInput()).to.eq('acte', 'Expected Acte value to be equals to acte');
    expect(await historiqueConsultationsUpdatePage.getMotifInput()).to.eq('motif', 'Expected Motif value to be equals to motif');
    expect(await historiqueConsultationsUpdatePage.getTailleInput()).to.eq('5', 'Expected taille value to be equals to 5');
    expect(await historiqueConsultationsUpdatePage.getPoidsInput()).to.eq('5', 'Expected poids value to be equals to 5');
    expect(await historiqueConsultationsUpdatePage.getTaInput()).to.eq('5', 'Expected ta value to be equals to 5');
    expect(await historiqueConsultationsUpdatePage.getPoulsInput()).to.eq('5', 'Expected pouls value to be equals to 5');
    expect(await historiqueConsultationsUpdatePage.getObservationInput()).to.eq(
      'observation',
      'Expected Observation value to be equals to observation'
    );
    expect(await historiqueConsultationsUpdatePage.getAtInput()).to.eq('at', 'Expected At value to be equals to at');

    await historiqueConsultationsUpdatePage.save();
    expect(await historiqueConsultationsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await historiqueConsultationsComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last HistoriqueConsultations', async () => {
    const nbButtonsBeforeDelete = await historiqueConsultationsComponentsPage.countDeleteButtons();
    await historiqueConsultationsComponentsPage.clickOnLastDeleteButton();

    historiqueConsultationsDeleteDialog = new HistoriqueConsultationsDeleteDialog();
    expect(await historiqueConsultationsDeleteDialog.getDialogTitle()).to.eq('hospitalApp.historiqueConsultations.delete.question');
    await historiqueConsultationsDeleteDialog.clickOnConfirmButton();

    expect(await historiqueConsultationsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
