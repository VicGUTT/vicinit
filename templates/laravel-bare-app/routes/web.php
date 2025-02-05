<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Pages\HomeController;

Route::get('/', HomeController::class)->name('home');
