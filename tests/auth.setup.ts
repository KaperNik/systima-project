import { test as setup } from "fixture/index";
import fs from "fs";

const userPath = "playwright/.auth/user.json";

setup("authenticate as user", async ({ app, page }) => {
    fs.access(userPath, fs.constants.F_OK, (err) => {
        if (err) {
            fs.writeFile(userPath, "{}", (err) => {
                if (err) {
                    console.error("Error creating the file: ", err);
                } else {
                    console.log("Empty JSON file for user created successfully");
                }
            });
        } else {
            console.log("File User already exists");
        }
    });

    await app.login.open();
    await app.login.signIn({ email: process.env.EMAIL, password: process.env.PASSWORD });
    await app.dashboard.expectLoaded();
    await page.context().storageState({ path: userPath });
});
