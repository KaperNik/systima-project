import { expect } from "@playwright/test";
import { AppPage } from "../../abstractClasses";
import { step } from "helpers/test-decorator.helper";
import { LeftMenu } from "app/component/left-menu.component";
import { AddContactModal } from "app/page/contacts/add-contact.modal";

export class ContactsPage extends AppPage {
    public pagePath = "/systimaas7/contacts";
    public leftMenu = new LeftMenu(this.page);
    public addContactModal = new AddContactModal(this.page);

    private addContactBtn = this.page.getByRole("button", { name: "Ny kontakt" });
    private toast = this.page.locator("div.success");

    @step()
    async expectLoaded() {
        await expect(this.addContactBtn).toBeVisible({ timeout: 10000 });
    }

    @step()
    async clickOnAddContactBtn() {
        await this.addContactBtn.click();
    }

    @step()
    async verifySuccessMessage(message: string) {
        await expect(this.toast).toBeVisible();
        await expect(this.toast).toContainText(message);
    }
}
