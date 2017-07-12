import { AngularElectronPage } from './app.po';

describe('angular-electron App', () => {
  let page: AngularElectronPage;

  beforeEach(() => {
    page = new AngularElectronPage();
  });
/*
  it('should display message saying App works !', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('App works !');
  });
*/
  it('should display title of page saying AngularElectron', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('AngularElectron');
  });
});

