import escapeRegExp from './escapeRegExp.js';

/**
 * Generate a URL friendly "slug" from a given string.
 *
 * @see https://gist.github.com/eek/9c4887e80b3ede05c0e39fee4dce3747
 * @see https://gist.github.com/mathewbyrne/1280286
 *
 * TODO: Add ASCII/language support ?
 * A good & simple introduction to locale/language support : https://github.com/createvibe/slugify.js
 */
export default function strSlug(value: string, separator = '-'): string {
    return (
        value
            .toString()
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u00C0-\u017F]/g, '') // remove all separated accents (or : [\u0300-\u036f])
            .replace(/\s+/g, separator) // replace spaces with `separator`
            .replace(/_/g, separator) // replace _ with `separator`
            .replace(/-/g, separator) // replace - with `separator`
            // .replace(/@/g, `${separator}at${separator}`) // replace @ with 'at'
            // .replace(/&/g, `${separator}and${separator}`) // replace & with 'and'
            .replace(new RegExp(`[^\\w${_(separator)}]+`, 'g'), '') // remove all non-word chars
            .replace(new RegExp(`${_(separator, ' ')}${_(separator, ' ')}+`, 'g'), separator) // replace multiple `separator` with single `separator`
            .replace(new RegExp(`^${_(separator)}`, 'g'), '') // Remove leading `separator`
            .replace(new RegExp(`${_(separator)}$`, 'g'), '') // Remove trailing `separator`
    );
}

/**
 * Actual name : escapeSeparator
 */
function _(separator: string, fallback = ''): string {
    return separator.length ? escapeRegExp(separator) : fallback;
}
