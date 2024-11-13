import { test } from "fixture";
import { faker } from "@faker-js/faker";

test.use({ storageState: "playwright/.auth/user.json" });
test.describe("Contact Creation", () => {
    test("Validation", async ({ app }) => {
        await app.dashboard.open();
        await app.dashboard.leftMenu.clickOnContactsLink();
        await app.contacts.clickOnAddContactBtn();
        await app.contacts.addContactModal.expectLoaded();
        await app.contacts.addContactModal.clickOnCreateContactBtn();
        await app.contacts.addContactModal.validateErrorMessage("Vennligst skriv inn navn");
    });

    test("Success", async ({ app }) => {
        await app.dashboard.open();
        await app.dashboard.leftMenu.clickOnContactsLink();
        await app.contacts.clickOnAddContactBtn();
        await app.contacts.addContactModal.fillNameInput("Test");
        await app.contacts.addContactModal.clickOnCreateContactBtn(false);
        await app.contacts.verifySuccessMessage("Ny kontakt lagret.");
    });
});
