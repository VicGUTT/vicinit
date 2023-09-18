<?php

declare(strict_types=1);

namespace App\Support\Ziggy;

use Tightenco\Ziggy\Output\File;

final class ZiggyConfigToJson extends File
{
    public function __toString(): string
    {
        return $this->ziggy->toJson(JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }
}
