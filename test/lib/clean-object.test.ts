import { cleanObject } from '../../src/lib/clean-object';

describe('cleanObject', () => {
    it('should remove null and undefined values from objects', () => {
        expect(
            cleanObject({
                zero: 0,
                one: 'one',
                two: undefined,
                three: {
                    four: 'four',
                    five: undefined,
                    six: [{ seven: 'seven', eight: undefined }],
                },
                nine: ['nine'],
                ten: {},
                eleven: [],
                twelve: '',
                thirteen: null,
            })
        ).toStrictEqual({
            zero: 0,
            one: 'one',
            three: {
                four: 'four',
                six: [{ seven: 'seven' }],
            },
            nine: ['nine'],
            ten: {},
            eleven: [],
            twelve: '',
        });
    });
});
