<?php

declare(strict_types=1);

namespace {vendor-namespace}\{project-classname}\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \{vendor-namespace}\{project-classname}\{project-classname}
 */
class {project-classname} extends Facade
{
    /**
     * Get the registered name of the component.
     */
    protected static function getFacadeAccessor(): string
    {
        return \{vendor-namespace}\{project-classname}\{project-classname}::class;
    }
}
