import {
    day,
    hour,
    minute,
    second,
    week,
} from '../../src/lib/revalidate-times';

describe('Revalidation times', () => {
    it('should be correctly defined', () => {
        expect(second).toEqual(1);
        expect(minute).toEqual(60);
        expect(hour).toEqual(3600);
        expect(day).toEqual(86400);
        expect(week).toEqual(604800);
    });
});
