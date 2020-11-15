import * as path from 'path';
import { getOSSLibraries } from '../../src/lib/get-oss-libraries';

describe('getOSSLibraries', () => {
    it('rejects when the licenses file is not found', async () => {
        expect.assertions(1);

        try {
            await getOSSLibraries({ licensesFile: '' });
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    it('resolves when the licenses file is found', async () => {
        expect.assertions(1);

        const licenses = await getOSSLibraries({
            licensesFile: path.join(
                __dirname,
                '../../test-data/sample-oss-licenses.json'
            ),
        });

        expect(licenses.length).toEqual(23);
    });
});
