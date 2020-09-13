import { Registry } from 'query-registry';
import { getCache } from './get-cache';

const minute = 60 * 1000;

export const registry = new Registry({
    cache: getCache({ namespace: 'registry', ttl: 10 * minute }),
});
