<?php

declare(strict_types=1);

namespace Tests\Feature\Bootstrap;

use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

final class HelpersTest extends TestCase
{
    #[Test]
    public function it_can_determine_the_front_app_path(): void
    {
        $_ = DIRECTORY_SEPARATOR;
        $__ = DIRECTORY_SEPARATOR === '/' ? '\\' : '/';
        $basePath = dirname(__DIR__, 4);

        $path = 'folder1/folder2/file.php';

        $this->assertSame(base_path('appfront'), front_path());
        $this->assertSame(base_path('appfront'), front_path(''));
        $this->assertSame(base_path("appfront{$_}"), front_path($_));
        $this->assertSame(base_path("appfront{$_}{$__}"), front_path($__));
        $this->assertSame(base_path("appfront{$_}{$path}"), front_path($path));
        $this->assertSame(base_path("appfront{$_}{$path}"), front_path("{$_}{$path}"));
        $this->assertSame(base_path("appfront{$_}{$__}{$path}"), front_path("{$__}{$path}"));
        $this->assertSame(base_path("appfront{$_}{$path}{$_}"), front_path("{$_}{$path}{$_}"));
        $this->assertSame(base_path("appfront{$_}{$path}{$__}"), front_path("{$_}{$path}{$__}"));
        $this->assertSame(base_path("appfront{$_}{$__}{$path}{$_}"), front_path("{$__}{$path}{$_}"));
        $this->assertSame(base_path("appfront{$_}{$__}{$path}{$__}"), front_path("{$__}{$path}{$__}"));

        $this->assertSame("{$basePath}{$_}appfront", front_path());
        $this->assertSame("{$basePath}{$_}appfront", front_path(''));
        $this->assertSame("{$basePath}{$_}appfront{$_}", front_path($_));
        $this->assertSame("{$basePath}{$_}appfront{$_}{$__}", front_path($__));
        $this->assertSame("{$basePath}{$_}appfront{$_}{$path}", front_path($path));
        $this->assertSame("{$basePath}{$_}appfront{$_}{$path}", front_path("{$_}{$path}"));
        $this->assertSame("{$basePath}{$_}appfront{$_}{$__}{$path}", front_path("{$__}{$path}"));
        $this->assertSame("{$basePath}{$_}appfront{$_}{$path}{$_}", front_path("{$_}{$path}{$_}"));
        $this->assertSame("{$basePath}{$_}appfront{$_}{$path}{$__}", front_path("{$_}{$path}{$__}"));
        $this->assertSame("{$basePath}{$_}appfront{$_}{$__}{$path}{$_}", front_path("{$__}{$path}{$_}"));
        $this->assertSame("{$basePath}{$_}appfront{$_}{$__}{$path}{$__}", front_path("{$__}{$path}{$__}"));
    }
}
