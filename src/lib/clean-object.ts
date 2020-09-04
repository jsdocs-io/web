import cleanDeep from 'clean-deep';

/**
 * cleanObject returns a new object corresponding to the given one
 * without null and undefined values.
 *
 * @param obj - the object to clean
 */
export function cleanObject<T extends Record<string, any>>(obj: T): T {
    return cleanDeep(obj, {
        emptyArrays: false,
        emptyObjects: false,
        emptyStrings: false,
    }) as T;
}
