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