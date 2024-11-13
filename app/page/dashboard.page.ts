import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from "helpers/test-decorator.helper";
import { LeftMenu } from "app/component/left-menu.component";

export class DashboardPage extends AppPage {
    public pagePath = "/systimaas7/dashboard";
    public leftMenu = new LeftMenu(this.page);
    
    private oversikt = this.page.getByRole("banner").getByText("Oversikt");

    @step()
    async expectLoaded() {
        await expect(this.oversikt).toBeVisible({ timeout: 15000 });
    }
}
