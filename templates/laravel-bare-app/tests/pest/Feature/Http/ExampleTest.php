<?php

declare(strict_types=1);

use Tests\FeatureTestCase;
use Illuminate\Foundation\Testing\LazilyRefreshDatabase;

// uses(
//     LazilyRefreshDatabase::class,
// );

describe('Example feature http test', function (): void {
    it('asserts the application returns a successful response', function (): void {
        /** @var FeatureTestCase $this */

        // $this->withoutExceptionHandling();

        $response = $this->get('/');

        $response->assertStatus(200);
    });
});
