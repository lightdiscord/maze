export function randomItem(list) {
    const idx = Math.floor(Math.random() * list.length);
    return list[idx];
}

export function* enumerate(generator) {
    let idx = 0;

    for (const item of generator) {
        yield { item, idx };
        idx += 1;
    }
}

export function division(a, b) {
    const quotient = Math.floor(a / b);
    const remainder = a % b;

    return { quotient, remainder };
}

export function filterMap(fn, array) {
    const elements = [];

    for (const element of array) {
        const value = fn(element);
        if (value !== undefined && value !== null) {
            elements.push(value);
        }
    }

    return elements;
}