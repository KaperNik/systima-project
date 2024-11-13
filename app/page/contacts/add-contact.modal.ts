import { expect } from "@playwright/test";
import { Component } from "app/abstractClasses";
import { step } from "helpers/test-decorator.helper";

export class AddContactModal extends Component {
    private modal = this.page.getByRole("dialog");
    private createContactBtn = this.page.getByRole("button", { name: "Opprett kontakt" });
    private alert = this.page.getByRole("alert").last();
    private nameInput = this.page.getByLabel("Navn *");

    @step()
    private async modalWindowIsVisible(): Promise<boolean> {
        return this.modal.isVisible();
    }

    @step()
    async expectLoaded() {
        await expect(this.modal).toBeVisible();
        await expect(this.createContactBtn).toBeVisible();
        await expect(this.nameInput).toBeVisible();
    }

    @step()
    async clickOnCreateContactBtn(isModalVisible: boolean = true) {
        await this.createContactBtn.click({ timeout: 500 });
        if (!isModalVisible) {
            const isVisible = await this.modalWindowIsVisible();
            if (isVisible) {
                await this.createContactBtn.click();
            }
        }
    }

    @step()
    async validateErrorMessage(message: string) {
        expect(await this.alert.innerText()).toEqual(message);
    }

    @step()
    async fillNameInput(name: string) {
        await this.nameInput.fill(name);
        await expect(this.nameInput).toHaveValue(name);
    }
}
