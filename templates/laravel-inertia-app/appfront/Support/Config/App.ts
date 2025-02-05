import type { App as Config, Environment } from '@/types/configs/app.js';

export default class App {
    static #instance: App | null = null;

    #config: Config;

    constructor(config?: Config) {
        if (!config) {
            config = {
                name: import.meta.env.VITE_APP_NAME,
                locale: 'en',
            };
        }

        this.#config = config;
    }

    public static instance(config?: Config): App {
        if (!App.#instance) {
            App.#instance = new App(config);
        }

        return App.#instance;
    }

    public get name(): string {
        return this.#config.name;
    }

    /**
     * Retrieve the environment.
     */
    public environment(): Environment {
        return this.#config.env || 'production';
    }

    /**
     * Determine if the application is in the local environment.
     */
    public isLocal(): boolean {
        return this.environment() === 'local';
    }

    /**
     * Determine if the application is in the production environment.
     */
    public isProduction(): boolean {
        return this.environment() === 'production';
    }

    /**
     * Determine if the application is running with debug mode enabled.
     */
    public hasDebugModeEnabled(): boolean {
        return this.#config.debug || false;
    }

    // /**
    //  * Set the application's locale.
    //  */
    // public setLocale(locale: string): void {
    //     this.#config.locale = locale;
    // }

    /**
     * Get the application's locale.
     */
    public getLocale(): string {
        return this.#config.locale;
    }

    /**
     * Set the application's config.
     */
    public refreshConfig(config: Config): void {
        this.#config = {
            name: config.name,
            locale: config.locale,
            env: config.env,
            debug: config.debug,
        };
    }
}
