import { expect } from "@playwright/test";
import { Component } from "../abstractClasses";
import { step } from "helpers/test-decorator.helper";

export class LeftMenu extends Component {
    private bookkeepingBtn = this.page.getByRole("button", { name: "Bokføring" });
    private contactsLink = this.page.getByRole("link", { name: "Kontakter" });

    @step()
    async expectLoaded() {
        await expect(this.bookkeepingBtn).toBeVisible();
        await expect(this.contactsLink).toBeVisible();
    }
    
    @step()
    async clickOnBookkeepingOption(optionName: string) {
        await this.bookkeepingBtn.click();
        await this.page.getByRole("link", { name: optionName }).click();
    }

    @step()
    async clickOnContactsLink() {
        await this.contactsLink.click();
    }
}