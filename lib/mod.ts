export function mod(a: number, b: number): number {
	if (b === 0) return 0;
	return ((a % b) + b) % b;
}
