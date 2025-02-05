<?php

declare(strict_types=1);

namespace App\Support\Pages;

use App\Support\InertiaPage\InertiaPage;

class HomePage extends InertiaPage
{
    public function __construct(private array $data = [])
    {
    }

    public static function new(array $data = []): static
    {
        return new static($data);
    }

    public function pageComponentPath(): string
    {
        return 'home';
    }

    public function headTitle(): string
    {
        return 'Hello!';
    }

    public function headDescription(): string
    {
        return 'This is a description :)';
    }

    public function data(): array
    {
        return $this->data;
    }
}
