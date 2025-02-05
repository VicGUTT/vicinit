<?php

declare(strict_types=1);

it('can determine the front app path', function (): void {
    $_ = DIRECTORY_SEPARATOR;
    $__ = DIRECTORY_SEPARATOR === '/' ? '\\' : '/';
    $basePath = dirname(__DIR__, 5);

    $path = 'folder1/folder2/file.php';

    expect(base_path('appfront'))->toEqual(front_path());
    expect(base_path('appfront'))->toEqual(front_path(''));
    expect(base_path("appfront{$_}"))->toEqual(front_path($_));
    expect(base_path("appfront{$_}{$__}"))->toEqual(front_path($__));
    expect(base_path("appfront{$_}{$path}"))->toEqual(front_path($path));
    expect(base_path("appfront{$_}{$path}"))->toEqual(front_path("{$_}{$path}"));
    expect(base_path("appfront{$_}{$__}{$path}"))->toEqual(front_path("{$__}{$path}"));
    expect(base_path("appfront{$_}{$path}{$_}"))->toEqual(front_path("{$_}{$path}{$_}"));
    expect(base_path("appfront{$_}{$path}{$__}"))->toEqual(front_path("{$_}{$path}{$__}"));
    expect(base_path("appfront{$_}{$__}{$path}{$_}"))->toEqual(front_path("{$__}{$path}{$_}"));
    expect(base_path("appfront{$_}{$__}{$path}{$__}"))->toEqual(front_path("{$__}{$path}{$__}"));

    expect("{$basePath}{$_}appfront")->toEqual(front_path());
    expect("{$basePath}{$_}appfront")->toEqual(front_path(''));
    expect("{$basePath}{$_}appfront{$_}")->toEqual(front_path($_));
    expect("{$basePath}{$_}appfront{$_}{$__}")->toEqual(front_path($__));
    expect("{$basePath}{$_}appfront{$_}{$path}")->toEqual(front_path($path));
    expect("{$basePath}{$_}appfront{$_}{$path}")->toEqual(front_path("{$_}{$path}"));
    expect("{$basePath}{$_}appfront{$_}{$__}{$path}")->toEqual(front_path("{$__}{$path}"));
    expect("{$basePath}{$_}appfront{$_}{$path}{$_}")->toEqual(front_path("{$_}{$path}{$_}"));
    expect("{$basePath}{$_}appfront{$_}{$path}{$__}")->toEqual(front_path("{$_}{$path}{$__}"));
    expect("{$basePath}{$_}appfront{$_}{$__}{$path}{$_}")->toEqual(front_path("{$__}{$path}{$_}"));
    expect("{$basePath}{$_}appfront{$_}{$__}{$path}{$__}")->toEqual(front_path("{$__}{$path}{$__}"));
});
