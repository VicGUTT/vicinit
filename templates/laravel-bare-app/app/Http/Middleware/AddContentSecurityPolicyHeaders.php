<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Vite;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

final class AddContentSecurityPolicyHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (SymfonyResponse)  $next
     */
    public function handle(Request $request, Closure $next): SymfonyResponse
    {
        Vite::useCspNonce();

        /** @var Response $response */
        $response = $next($request);

        return $response->withHeaders([
            'Content-Security-Policy' => "script-src 'nonce-" . Vite::cspNonce() . "'",
        ]);
    }
}
