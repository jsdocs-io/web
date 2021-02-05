import stream from 'stream';
import { loadObject, storeObject } from '../../src/lib/storage';

describe('loadObject', () => {
    it('returns the object found in storage and parsed from JSON', async () => {
        expect.assertions(1);

        const mockClient = {
            async getObject() {
                return stream.Readable.from(['{"x":1}']);
            },
            async putObject() {
                throw new Error('not implemented');
            },
        };

        const obj = await loadObject({ name: 'foo', client: mockClient });
        expect(obj).toStrictEqual({ x: 1 });
    });

    it('returns undefined if an object cannot be parsed from JSON', async () => {
        expect.assertions(1);

        const mockClient = {
            async getObject() {
                return stream.Readable.from(['{']);
            },
            async putObject() {
                throw new Error('not implemented');
            },
        };

        const obj = await loadObject({ name: 'foo', client: mockClient });
        expect(obj).toBeUndefined();
    });

    it('returns undefined if an object cannot be retrieved', async () => {
        expect.assertions(1);
        const obj = await loadObject({ name: 'foo' });
        expect(obj).toBeUndefined();
    });
});

describe('storeObject', () => {
    it('tries to store an object', async () => {
        expect.assertions(1);

        try {
            await storeObject({ name: 'foo', obj: {} });
            expect(true).toBeTruthy();
        } catch {}
    });
});
