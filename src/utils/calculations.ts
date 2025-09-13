
export function oscillateValue(
	baseValue: number,
	amplitude: number,
	frequency: number,
	offset: number = 0): number {
	const t = (performance.now() / 1000) + offset; // seconds
	return baseValue + amplitude * Math.sin(2 * Math.PI * frequency * t);
}
