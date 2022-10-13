import type { Result, Content, Grammar } from "./types";

// https://stackoverflow.com/a/4550514
function choose<T>(array: Array<T>): T {
    return array[Math.floor(Math.random() * array.length)];
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
function getRandomInt(min: number, max: number) {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);
    // The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (maxFloor - minCeil + 1) + minCeil);
}

// https://stackoverflow.com/a/46700791
function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

function extract(c: Content): Result {
    if (c.kind == "constant") {
        return c.constant;
    } else if (c.kind == "branch") {
        return extract(choose(c.branches));
    } else if (c.kind == "randomNumber") {
        return getRandomInt(c.min, c.max).toString();
    } else if (c.kind == "nothing") {
        return null;
    } else if (c.kind == "concatenation") {
        const generated: Result[] = c.content.map(extract);
        const filtered: string[] = generated.filter(notEmpty);
        return filtered.join(c.separator);
    } else {
        throw new Error(`Unexpected c ${c}`);
    }
}

// https://stackoverflow.com/a/1026087
function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function generate(grammar: Grammar): string {
    const e = extract(grammar.sentence) || "";
    if (grammar.capitalize) {
        return capitalize(e);
    } else {
        return e;
    }
}
