/**
 * Gets the type of a plain object that has the same properties
 * as an instance of the given class.
 */
export type Properties<Klass> = Pick<Klass, keyof Klass>;

/**
 * Applies an appropriate ordinal suffix to the given number
 * (i.e. "-st", "-nd", "-rd", or "-th").
 * @param n The number to format.
 * @returns The formatted string.
 */
export function formatOrdinal(n: number): string {
    let result = `${n}`;
    /* Check if number's second-to-last digit is 1.
    (OK to possibly index out of bounds
    because undefined will not test equal to '1'.) */
    switch (result[result.length - 2]) {
        // A number whose second-to-last digit is 1 will always end in -th.
        case '1': result += "th"; break;
        // Other numbers have more varied suffices.
        default: switch (result[result.length - 1]) {
            case '1': result += "st"; break;
            case '2': result += "nd"; break;
            case '3': result += "rd"; break;
            default: result += "th"; break;
        } break;
    }
    return result;
}

/**
 * Recursively calls requestAnimationFrame on an indefinite basis.
 * lastFrameTimestamp is for internal use in recursive calls;
 * an external caller should only specify what.
 * @param what The callback to invoke each frame.
 * @param lastFrameTimestamp Start of the frame that elapsed before this call.
 */
export function animateForever(
    what: (interval: number) => void,
    lastFrameTimestamp: DOMHighResTimeStamp = performance.now()
): void {
    requestAnimationFrame(function (now: DOMHighResTimeStamp): void {
        what(now - lastFrameTimestamp);
        animateForever(what, now);
    });
}