import type { Page } from "@playwright/test";
import { step } from "helpers/test-decorator.helper";

export abstract class PageHolder { 
    constructor(protected page: Page) { }
}

export abstract class Component extends PageHolder {
    abstract expectLoaded(message?: string): Promise<void>;

    @step()
    async isLoaded(): Promise<boolean> {
        try { 
            await this.expectLoaded()
            return true
        } catch {
            return false
        }
    }
}

export abstract class AppPage extends Component {
    public abstract pagePath: string;

    @step()
    async open(path?: string) {
        await this.page.goto(path ?? this.pagePath);
        await this.expectLoaded();
    }
}
