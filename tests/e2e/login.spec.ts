import { test } from "fixture";
import { faker } from "@faker-js/faker";

test.describe("Login", () => {
    test("Successful Login", async ({ app }) => {
        await app.login.open();
        await app.login.signIn({ email: process.env.EMAIL, password: process.env.PASSWORD });
        await app.dashboard.expectLoaded();
    });

    test("Failed Login", async ({ app }) => {
        await app.login.open();
        await app.login.signIn({ email: faker.internet.email({ provider: "example.fakerjs.dev" }), password: "invalidPassword" });
        await app.login.verifyErrorMessage("Feil brukernavn / passord");
    });
});
