export type Environment = 'testing' | 'local' | 'staging' | 'production';
export type App = {
    name: string;
    env?: Environment | null;
    debug?: boolean | null;
    // url?: string | null;
    // asset_url?: string | null;
    // timezone?: string | null;
    // locale?: string | null;
    // fallback_locale?: string | null;
};
