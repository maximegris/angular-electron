import { browser, element, by } from 'protractor';

export class AngularElectronPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return browser.getTitle();
  }

  getParagraphText() {
    return element(by.css('app-home h1')).getText();
  }
}
