import { describe, it, expect } from 'vitest';
import { sum } from '../../src/index.js';

describe('index', () => {
    it('works', () => {
        expect(sum(1, 1)).toEqual(2);
    });
});
