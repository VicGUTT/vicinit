<?php

declare(strict_types=1);

namespace App\Support\InertiaPage\Concerns;

use Inertia\Inertia;

trait AsInertiaPageable
{
    // private ?string $title = null;
    // private ?string $description = null;
    // private array $data = [];

    // public function headTitle(): ?string
    // {
    //     return $this->title;
    // }

    public function headDescription(): ?string
    {
        // return $this->description;
        return null;
    }

    public function headMeta(): ?array
    {
        return null;
    }

    public function head(): array
    {
        return array_filter([
            ...($this->headMeta() ?: []),
            'title' => $this->headTitle(),
            'description' => $this->headDescription(),
        ]);
    }

    public function meta(): array
    {
        return [];
    }

    // public function data(): array
    // {
    //     return $this->data;
    // }

    public function pageProps(): array
    {
        return [
            'data' => $this->data(),
            // 'auth' => $this->auth(),
            'head' => $this->head(),
            'meta' => function (): array {
                $shared = Inertia::getShared()['meta'] ?? null;

                if (is_callable($shared)) {
                    $shared = app()->call($shared);
                }

                if (empty($shared)) {
                    $shared = [];
                }

                return [
                    ...$shared,
                    ...$this->meta(),
                ];
            },
        ];
    }

    // public function withTitle(string $value): static
    // {
    //     $this->title = $value;

    //     return $this;
    // }

    // public function withDescription(string $value): static
    // {
    //     $this->description = $value;

    //     return $this;
    // }

    // protected function withData(array $value): static
    // {
    //     $this->data = $value;

    //     return $this;
    // }
}
