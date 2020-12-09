import { AngularSelector, waitForAngular } from "testcafe-angular-selectors";
import { ClientFunction, Selector } from "testcafe";

const getPageTitle = ClientFunction(() => document.title);
const getPageUrl = ClientFunction(() => window.location.href);

fixture(`Home Page`)
  .page("../dist/index.html")
  .beforeEach(async (t) => {
    await waitForAngular();
  });

test("e2e", async (t) => {
  await t.expect(getPageTitle()).eql("Angular Electron");
});

test("Home", async (t) => {
  await t.expect(AngularSelector("app-home")).ok();
});

test("should navigate to /detail", async (t) => {
  const homeComponent = AngularSelector("app-home");
  const goToDetailButton = homeComponent.find(".container").child("a");

  await t.click(goToDetailButton).expect(getPageUrl()).contains("/detail");
});

fixture("Detail Page")
  .page("../dist/index.html")
  .beforeEach(async (t) => {
    const homeComponent = AngularSelector("app-home");
    const goToDetailButton = homeComponent.find(".container").child("a");

    await t.click(goToDetailButton);
  });

test("should go to home", async (t) => {
  const detailComponent = AngularSelector("app-detail");
  const goToHomeButton = detailComponent.find(".container").child("a");

  await t.click(goToHomeButton).expect(AngularSelector("app-home")).ok();
});
