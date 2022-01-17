import {
    loadRegistryPackageInfo,
    storeRegistryPackageInfo,
} from '../../src/lib/registry-package-info-storage';
import { loadObject, storeObject } from '../../src/lib/storage';

jest.mock('../../src/lib/storage', () => ({
    loadObject: jest.fn(),
    storeObject: jest.fn(),
}));
const mockedLoadObject = jest.mocked(loadObject, true);
const mockedStoreObject = jest.mocked(storeObject, true);

describe('loadRegistryPackageInfo', () => {
    it('returns undefined if an object cannot be retrieved', async () => {
        expect.assertions(1);

        mockedLoadObject.mockImplementation(async () => {
            return undefined;
        });

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

        mockedStoreObject.mockImplementation(async () => {
            return;
        });

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
