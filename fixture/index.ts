import { test as base } from "@playwright/test";
import { Application } from "app";

export const test = base.extend<{
    app: Application;
    loggedIn: any;
}>({
    app: async ({ page }, use) => {
        const app = new Application(page);
        await use(app);
        await page.close();
    },

    loggedIn: async ({ app }, use) => {
        await app.login.open();
        await app.login.signIn({ email: process.env.EMAIL, password: process.env.PASSWORD });
        await app.dashboard.expectLoaded();
        await use();
    },
});

export { expect } from "@playwright/test";
