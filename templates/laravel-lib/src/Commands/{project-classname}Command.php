<?php

declare(strict_types=1);

namespace {vendor-namespace}\{project-classname}\Commands;

use Illuminate\Console\Command;

class {project-classname}Command extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = '{project-slug}:example';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'My example command';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->comment('The `{project-slug}:example` command ran successfully.');

        return self::SUCCESS;
    }
}
