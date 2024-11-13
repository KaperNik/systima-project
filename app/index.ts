import { PageHolder } from "./abstractClasses";
import { LoginPage } from "./page/login.page";
import { DashboardPage } from "./page/dashboard.page";
import { PurchasePage } from "./page/purchase.page";
import { ContactsPage } from "./page/contacts/contacts.page";

export class Application extends PageHolder {
    public readonly login = new LoginPage(this.page);
    public readonly dashboard = new DashboardPage(this.page);
    public readonly purchase = new PurchasePage(this.page);
    public readonly contacts = new ContactsPage(this.page);
}
