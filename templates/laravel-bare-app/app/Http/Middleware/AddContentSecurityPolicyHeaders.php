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

        $nonce = Vite::cspNonce();

        /**
         * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
         * @see https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html#nonce-based
         * @see https://laravel.com/docs/11.x/vite#content-security-policy-csp-nonce
         *
         * Example: `Content-Security-Policy: default-src 'self'; img-src 'self' example.com`.
         */
        return $response->withHeaders([
            'Content-Security-Policy' => implode(';', [
                "script-src 'nonce-{$nonce}' 'strict-dynamic'",
            ]),
        ]);
    }
}
