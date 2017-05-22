import { browser, element, by } from 'protractor';

export class AngularElectronPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-home h1')).getText();
  }
}
