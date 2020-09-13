import Keyv from 'keyv';

export function getCache<TValue = any>({
    namespace,
    ttl,
}: {
    namespace: string;
    ttl?: number;
}): Keyv<TValue> {
    const redisURL = process.env.REDIS_URL;
    return new Keyv({ uri: redisURL, namespace, ttl });
}
