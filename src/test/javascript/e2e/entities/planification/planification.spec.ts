import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PlanificationComponentsPage, PlanificationDeleteDialog, PlanificationUpdatePage } from './planification.page-object';

const expect = chai.expect;

describe('Planification e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let planificationComponentsPage: PlanificationComponentsPage;
  let planificationUpdatePage: PlanificationUpdatePage;
  let planificationDeleteDialog: PlanificationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Planifications', async () => {
    await navBarPage.goToEntity('planification');
    planificationComponentsPage = new PlanificationComponentsPage();
    await browser.wait(ec.visibilityOf(planificationComponentsPage.title), 5000);
    expect(await planificationComponentsPage.getTitle()).to.eq('hospitalApp.planification.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(planificationComponentsPage.entities), ec.visibilityOf(planificationComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Planification page', async () => {
    await planificationComponentsPage.clickOnCreateButton();
    planificationUpdatePage = new PlanificationUpdatePage();
    expect(await planificationUpdatePage.getPageTitle()).to.eq('hospitalApp.planification.home.createOrEditLabel');
    await planificationUpdatePage.cancel();
  });

  it('should create and save Planifications', async () => {
    const nbButtonsBeforeCreate = await planificationComponentsPage.countDeleteButtons();

    await planificationComponentsPage.clickOnCreateButton();

    await promise.all([
      planificationUpdatePage.setPrevuLeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      planificationUpdatePage.setObjetInput('objet'),
      planificationUpdatePage.setFaitLeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      planificationUpdatePage.setPeriodiciteInput('periodicite'),
      planificationUpdatePage.setResultatInput('resultat'),
      planificationUpdatePage.userSelectLastOption(),
    ]);

    expect(await planificationUpdatePage.getPrevuLeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected prevuLe value to be equals to 2000-12-31'
    );
    expect(await planificationUpdatePage.getObjetInput()).to.eq('objet', 'Expected Objet value to be equals to objet');
    expect(await planificationUpdatePage.getFaitLeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected faitLe value to be equals to 2000-12-31'
    );
    expect(await planificationUpdatePage.getPeriodiciteInput()).to.eq(
      'periodicite',
      'Expected Periodicite value to be equals to periodicite'
    );
    expect(await planificationUpdatePage.getResultatInput()).to.eq('resultat', 'Expected Resultat value to be equals to resultat');

    await planificationUpdatePage.save();
    expect(await planificationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await planificationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Planification', async () => {
    const nbButtonsBeforeDelete = await planificationComponentsPage.countDeleteButtons();
    await planificationComponentsPage.clickOnLastDeleteButton();

    planificationDeleteDialog = new PlanificationDeleteDialog();
    expect(await planificationDeleteDialog.getDialogTitle()).to.eq('hospitalApp.planification.delete.question');
    await planificationDeleteDialog.clickOnConfirmButton();

    expect(await planificationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
