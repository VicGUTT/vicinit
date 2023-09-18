<?php

declare(strict_types=1);

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\Test;

final class ExampleTest extends TestCase
{
    #[Test]
    public function it_asserts_that_true_is_true(): void
    {
        $this->assertTrue(true);
    }
}
