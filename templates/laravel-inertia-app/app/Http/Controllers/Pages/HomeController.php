<?php

declare(strict_types=1);

namespace App\Http\Controllers\Pages;

use App\Support\Pages\HomePage;

final class HomeController
{
    public function __invoke(): HomePage
    {
        return HomePage::new([
            'random' => str()->random(),
        ]);
    }
}
