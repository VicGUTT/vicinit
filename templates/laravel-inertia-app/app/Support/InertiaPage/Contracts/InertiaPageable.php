<?php

declare(strict_types=1);

namespace App\Support\InertiaPage\Contracts;

interface InertiaPageable
{
    public function pageComponentPath(): string;
    public function pageProps(): array;

    public function headTitle(): string|callable|null;
    public function headDescription(): ?string;
    public function headMeta(): ?array;
    public function head(): array;

    public function data(): array;
    // public function auth(): ?array;

    // public function metaRedirect(): ?array;
    // public function metaAuthorizations(): ?array;
    // public function metaFlashCollection(): ?array;
    public function meta(): array;
}
