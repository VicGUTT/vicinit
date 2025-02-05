<?php

declare(strict_types=1);

namespace App\Support\InertiaPage;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;
use Illuminate\Contracts\Support\Responsable;
use Symfony\Component\HttpFoundation\Response;
use App\Support\InertiaPage\Contracts\InertiaPageable;
use App\Support\InertiaPage\Concerns\AsInertiaPageable;

abstract class InertiaPage implements InertiaPageable, Responsable
{
    use AsInertiaPageable;

    /**
     * Create an HTTP response that represents the object.
     *
     * @param Request $request
     */
    public function toResponse($request): Response
    {
        $response = $this->toInertiaResponse($request);
        $response = $this->transformInertiaResponse($request, $response);

        if ($response instanceof InertiaResponse) {
            $response = $response->toResponse($request);
        }

        return $response;
    }

    protected function toInertiaResponse(Request $request): InertiaResponse
    {
        return Inertia::render($this->pageComponentPath(), $this->pageProps());
    }

    protected function transformInertiaResponse(Request $request, InertiaResponse $response): InertiaResponse|Response
    {
        return $response;
    }
}
