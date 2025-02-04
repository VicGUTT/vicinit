<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark no-js">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="color-scheme" content="light dark">
        {{-- <meta name="theme-color" media="(prefers-color-scheme: light)" content="..." /> --}}
        {{-- <meta name="theme-color" media="(prefers-color-scheme: dark)" content="..." /> --}}
        <meta name="csrf-token" content="{{ csrf_token() }}">

        @if (!app()->isProduction())
            <meta name="robots" content="noindex, nofollow">
        @endif

        <title>{{ Str::title(config('app.name')) }}</title>

        @vite(['resources/css/app.css', 'resources/ts/app.ts'])

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
        <main id="app" class="h-dvh grid place-items-center">
            <article class="bg-surface-1 p-16 border border-gray-200/70 rounded-xl dark:border-gray-900/70">
                <header>
                    <h1 class="text-5xl font-bold">{{ Str::title(config('app.name')) }}</h1>
                </header>

                <footer class="mt-6 text-muted">
                    Laravel v{{ Illuminate\Foundation\Application::VERSION }} (PHP v{{ PHP_VERSION }})
                </footer>
            </article>
        </main>
    </body>
</html>
