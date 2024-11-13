import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { step } from "helpers/test-decorator.helper";

export class LoginPage extends AppPage {
    public pagePath = "/login";

    private emailInput = this.page.getByLabel("E-post");
    private passwordInput = this.page.getByLabel("Passord");
    private loginBtn = this.page.getByRole("button", { name: "Logg inn" });
    private alert = this.page.getByRole("alert");

    @step()
    async expectLoaded() {
        await expect(this.emailInput).toBeVisible({ timeout: 10000 });
        await expect(this.passwordInput).toBeVisible({ timeout: 10000 });
        await expect(this.loginBtn).toBeVisible({ timeout: 10000 });
    }

    @step()
    async signIn(user: { email: string; password: string }) {
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.loginBtn.click();
    }

    @step()
    async verifyErrorMessage(message: string) {
        await expect(this.alert).toBeVisible({ timeout: 10000 });
        await expect(this.alert).toContainText(message);
    }
}
