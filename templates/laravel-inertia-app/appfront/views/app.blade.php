<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="no-js">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="color-scheme" content="light dark">
        {{-- <meta name="theme-color" media="(prefers-color-scheme: light)" content="..." /> --}}
        {{-- <meta name="theme-color" media="(prefers-color-scheme: dark)" content="..." /> --}}

        @if (!app()->isProduction())
            <meta name="robots" content="noindex, nofollow">
        @endif

        @if (!config('inertia.ssr.enabled'))
            <title inertia>{{ Str::title(config('app.name')) }}</title>
        @endif

        @vite(['appfront/app.ts', "appfront/views/pages/{$page['component']}.vue"])
        @inertiaHead

        <script type="module" nonce="{{ Vite::cspNonce() }}">
            try {
                document.documentElement.classList.remove('no-js');
            } catch (error) {
                console.error(error);
            }
        </script>
        <script type="module" nonce="{{ Vite::cspNonce() }}">
            try {
                const HTMLClassList = document.documentElement.classList;

                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    HTMLClassList.add('dark');

                    localStorage.theme = 'dark';
                } else {
                    HTMLClassList.remove('dark');
                }
            } catch (error) {
                console.error(error);
            }
        </script>
    </head>
    <body>
        @inertia
    </body>
</html>
