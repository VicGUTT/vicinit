<?php

declare(strict_types=1);

use Tests\FeatureTestCase;
use Illuminate\Database\Eloquent\Model;

describe('Example feature integration test', function (): void {
    it('enables model strict mode', function (): void {
        /** @var FeatureTestCase $this */

        expect(Model::preventsLazyLoading())->toEqual(true);
        expect(Model::preventsSilentlyDiscardingAttributes())->toEqual(true);
        expect(Model::preventsAccessingMissingAttributes())->toEqual(true);
    });
});
