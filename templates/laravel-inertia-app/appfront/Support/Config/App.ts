import type { App as Config, Environment } from '@/types/configs/app.js';
import config from '@/configs/app.json';

export default class App {
    private static _instance: App | null = null;

    public static instance(): App {
        if (!App._instance) {
            App._instance = new App();
        }

        return App._instance;
    }

    public get name(): string {
        return this.#config.name ?? location.hostname;
    }

    // public get url(): string {
    //     return this.#config.url ?? location.origin;
    // }

    // public get assetUrl(): string {
    //     return this.#config.asset_url ?? this.url;
    // }

    // public get timezone(): string {
    //     return this.#config.timezone ?? 'UTC';
    // }

    // public get locale(): string {
    //     return this.#config.locale ?? 'en';
    // }

    // public get fallbackLocale(): string {
    //     return this.#config.fallback_locale ?? 'en';
    // }

    get #config(): Config {
        return config as Config;
    }

    get #env(): Environment {
        return this.#config.env || 'production';
    }

    /**
     * Determine if the application is in the local environment.
     */
    public isLocal(): boolean {
        return this.#env === 'local';
    }

    /**
     * Determine if the application is in the production environment.
     */
    public isProduction(): boolean {
        return this.#env === 'production';
    }

    /**
     * Determine if the application is running with debug mode enabled.
     */
    public hasDebugModeEnabled(): boolean {
        return this.#config.debug || false;
    }
}
