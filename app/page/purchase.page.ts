import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from "helpers/test-decorator.helper";
import { LeftMenu } from "app/component/left-menu.component";

export class PurchasePage extends AppPage {
    public pagePath = "/systimaas7/bookkeeping/purchase";
    public leftMenu = new LeftMenu(this.page);
    "/systimaas7/contacts"

    private contactDropdown = this.page.getByRole("button", { name: "Kontakt (valgfri ved kvittering)" });
    private totalInput = this.page.getByLabel("Totalt beløp inkl. mva. *");
    private invoiceDateInput = this.page.getByLabel("Fakturadato *");
    private dueDateInput = this.page.getByLabel("Forfallsdato");
    private invoiceInput = this.page.getByLabel("Fakturanr.");
    private accountDropdown = this.page.getByRole("button", { name: "Konto *" });
    private toast = this.page.locator("div.success");
    private alert = this.page.getByRole("alert");

    @step()
    async expectLoaded() {
        await expect(this.page.getByText("Fakturadetaljer")).toBeVisible({ timeout: 10000 });
    }

    @step()
    async fillPurchaseForm(options: {
        contact: string;
        amount: string;
        invoiceDate: string;
        dueDate: string;
        account: string;
        invoiceNumber?: string;
    }) {
        await this.expectLoaded();

        await this.contactDropdown.click();
        await this.page.getByRole("option", { name: options.contact }).click();

        await this.totalInput.fill(options.amount);
        await this.invoiceDateInput.fill(options.invoiceDate);
        await this.dueDateInput.fill(options.dueDate);

        await this.accountDropdown.click();
        await this.page.getByRole("option", { name: options.account }).click();

        if (options?.invoiceNumber) {
            await this.invoiceInput.fill(options.invoiceNumber);
        }
    }

    @step()
    async clickOnBookBtn() {
        await this.page.getByRole("button", { name: "Bokfør", exact: true }).click();
    }

    @step()
    async verifySuccessMessage(message: string) {
        await expect(this.toast).toBeVisible();
        await expect(this.toast).toContainText(message);
    }

    @step()
    async verifyValidationMessage(message: string) {
        await expect(this.alert.filter({ hasText: message })).toBeVisible();
    }

    @step()
    async validateInputs(
        visible: boolean,
        options?: { contact: string; amount: string; invoiceDate: string; dueDate: string; account: string; invoiceNumber?: string }
    ) {
        if (visible) {
            expect(await this.totalInput.inputValue()).toContain(options.amount);
            expect(await this.invoiceDateInput.inputValue()).toContain(options.invoiceDate);
            expect(await this.dueDateInput.inputValue()).toContain(options.dueDate);
            expect(await this.invoiceInput.inputValue()).toContain(options.invoiceNumber);
            expect(await this.accountDropdown.innerText()).toContain(options.account);
            expect(await this.contactDropdown.innerText()).toContain(options.contact);
        } else {
            expect(await this.totalInput.inputValue()).not.toContain(options.amount);
            expect(await this.invoiceDateInput.inputValue()).not.toContain(options.invoiceDate);
            expect(await this.dueDateInput.inputValue()).not.toContain(options.dueDate);
            expect(await this.contactDropdown.innerText()).not.toContain(options.contact);
            expect(await this.accountDropdown.innerText()).not.toContain(options.account);
        }
    }
}
