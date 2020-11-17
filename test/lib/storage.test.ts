import stream from 'stream';
import { Storage } from '../../src/lib/storage';

describe('Storage', () => {
    it('can be created with the default configuration', () => {
        expect(new Storage()).toBeDefined();
    });

    it('can be created with a custom configuration', () => {
        const mockClient = {
            async getObject() {
                return stream.Readable.from('');
            },
            async putObject() {
                return '';
            },
        };
        const bucket = 'bucket';

        expect(new Storage(mockClient, bucket)).toBeDefined();
    });

    it('retrieves an object', async () => {
        expect.assertions(1);

        const mockClient = {
            async getObject() {
                return stream.Readable.from('{"x":1}');
            },
            async putObject() {
                return '';
            },
        };
        const bucket = 'bucket';

        const storage = new Storage(mockClient, bucket);
        const obj = await storage.getObject({ name: 'foo' });
        expect(obj).toStrictEqual({ x: 1 });
    });

    it('returns undefined if an object cannot be retrieved', async () => {
        expect.assertions(1);

        const mockClient = {
            async getObject() {
                throw new Error();
            },
            async putObject() {
                return '';
            },
        };
        const bucket = 'bucket';

        const storage = new Storage(mockClient, bucket);
        const obj = await storage.getObject({ name: 'foo' });
        expect(obj).toBeUndefined();
    });

    it('returns undefined if a retrieved object cannot be parsed', async () => {
        expect.assertions(1);

        const mockClient = {
            async getObject() {
                return stream.Readable.from('{');
            },
            async putObject() {
                return '';
            },
        };
        const bucket = 'bucket';

        const storage = new Storage(mockClient, bucket);
        const obj = await storage.getObject({ name: 'foo' });
        expect(obj).toBeUndefined();
    });

    it('uploads an object', async () => {
        expect.assertions(1);

        const mockClient = {
            async getObject() {
                return stream.Readable.from('');
            },
            async putObject() {
                return '';
            },
        };
        const bucket = 'bucket';

        const storage = new Storage(mockClient, bucket);

        try {
            await storage.putObject({ name: 'foo', obj: {} });
            expect(true).toBeTruthy();
        } catch {}
    });

    it('tries to upload an object', async () => {
        expect.assertions(1);

        const mockClient = {
            async getObject() {
                return stream.Readable.from('');
            },
            async putObject() {
                throw new Error();
            },
        };
        const bucket = 'bucket';

        const storage = new Storage(mockClient, bucket);

        try {
            await storage.putObject({ name: 'foo', obj: {} });
            expect(true).toBeTruthy();
        } catch {}
    });
});
