import {
    loadRegistryPackageInfo,
    storeRegistryPackageInfo,
} from '../../src/lib/registry-package-info-storage';

describe('loadRegistryPackageInfo', () => {
    it('returns undefined if an object cannot be retrieved', async () => {
        expect.assertions(1);
        const obj = await loadRegistryPackageInfo({
            name: 'foo',
            version: '99.0.0',
        });
        expect(obj).toBeUndefined();
    });
});

describe('storeRegistryPackageInfo', () => {
    it('tries to store an object', async () => {
        expect.assertions(1);

        try {
            await storeRegistryPackageInfo({
                name: 'foo',
                version: '99.0.0',
                info: {} as any,
            });
            expect(true).toBeTruthy();
        } catch {}
    });
});
