export type Environment = 'testing' | 'local' | 'staging' | 'production';
export type App = {
    name: string;
    locale: string;
    env?: Environment | null;
    debug?: boolean | null;
};
