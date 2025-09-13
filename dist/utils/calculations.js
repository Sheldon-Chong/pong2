export function oscillateValue(baseValue, amplitude, frequency, offset = 0) {
    const t = (performance.now() / 1000) + offset; // seconds
    return baseValue + amplitude * Math.sin(2 * Math.PI * frequency * t);
}
//# sourceMappingURL=calculations.js.map