<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Inertia\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

final class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'views.app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     */
    public function share(Request $request): array
    {
        return array_filter([
            ...parent::share($request),
            // 'auth' => $this->whenAuthenticated(fn () => $this->shareAuth($request)),
            // 'meta' => fn () => $this->shareMeta($request),
            // 'redirect' => fn () => $this->shareRedirect($request),
            // 'authorizations' => $this->whenAuthenticated(fn () => $this->shareAuthorizations($request)),
        ]);
    }

    // private function shareAuth(Request $request): array
    // {
    //     return array_filter([
    //         'user' => UserData::from($request->user()),
    //         'organization' => OrganizationData::from($request->user()->organization),
    //     ]);
    // }

    // private function shareMeta(Request $request): array
    // {
    //     return array_filter([
    //         'head' => array_filter([
    //             'title' => null,
    //             'description' => null,
    //         ]),
    //         'csrf' => $request->inertia() ? null : csrf_token(),
    //     ]);
    // }

    // private function shareRedirect(Request $request): array
    // {
    //     return array_filter([
    //         'data' => $request->session()->get('redirect.data'),
    //     ]);
    // }

    // private function shareAuthorizations(Request $request): array
    // {
    //     return array_filter([
    //         //
    //     ]);
    // }

    // private function whenAuthenticated(mixed $value): mixed
    // {
    //     if (!Auth::check()) {
    //         return null;
    //     }

    //     return $value;
    // }
}
