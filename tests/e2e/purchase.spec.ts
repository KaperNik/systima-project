import { test } from "fixture";

test.use({ storageState: "playwright/.auth/user.json" });
test.describe("Purchase", () => {
    test("Create Purchase", async ({ app }) => {
        const inputData = {
            contact: "Systima AS",
            amount: "100",
            invoiceDate: "01.01.2024",
            dueDate: "15.01.2024",
            account: "1000 Utvikling, ervervet",
        };
        await app.dashboard.open();
        await app.dashboard.leftMenu.clickOnBookkeepingOption("Bokfør andre filer");
        await app.purchase.fillPurchaseForm(inputData);
        await app.purchase.clickOnBookBtn();
        await app.purchase.verifySuccessMessage("Bilag opprettet med bilagsnr.");
        await app.purchase.validateInputs(false, inputData);
    });

    test("Duplicate Invoice Number Handling", async ({ app }) => {
        const inputData = {
            contact: "Systima AS",
            amount: "100",
            invoiceDate: "01.01.2024",
            dueDate: "15.01.2024",
            account: "1000 Utvikling, ervervet",
            invoiceNumber: "1",
        };
        await app.dashboard.open();
        await app.dashboard.leftMenu.clickOnBookkeepingOption("Bokfør andre filer");
        await app.purchase.fillPurchaseForm(inputData);
        await app.purchase.clickOnBookBtn();
        await app.purchase.verifyValidationMessage("Fakturanr. er allerede bokført");
        await app.purchase.validateInputs(true, inputData);
    });
});
