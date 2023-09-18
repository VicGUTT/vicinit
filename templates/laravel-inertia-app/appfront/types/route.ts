import type { RouteParamsWithQueryOverload, RouteParam, Config, Router, Route } from 'ziggy-js';

declare function route(
    name?: undefined,
    params?: RouteParamsWithQueryOverload | RouteParam,
    absolute?: boolean,
    config?: Config
): Router;

declare function route<R = Record<string, Route>>(
    name: keyof R,
    params?: RouteParamsWithQueryOverload | RouteParam,
    absolute?: boolean,
    config?: Config
): string;

export default route;
