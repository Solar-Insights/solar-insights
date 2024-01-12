/**
 * Colors
 */
export function colorToRGB(color: string): { r: number; g: number; b: number } {
	const hex = color.startsWith('#') ? color.slice(1) : color;
	return {
		r: parseInt(hex.substring(0, 2), 16),
		g: parseInt(hex.substring(2, 4), 16),
		b: parseInt(hex.substring(4, 6), 16),
	};
}

export function rgbToColor({ r, g, b }: { r: number; g: number; b: number }): string {
	const f = (x: number) => {
		const hex = Math.round(x).toString(16);
		return hex.length == 1 ? `0${hex}` : hex;
	};
	return `#${f(r)}${f(g)}${f(b)}`;
}


/**
 * Math
 */
export function lerp(x: number, y: number, t: number) {
	return x + t * (y - x);
}

export function normalize(x: number, max: number = 1, min: number = 0) {
	const y = (x - min) / (max - min);
	return clamp(y, 0, 1);
}

export function clamp(x: number, min: number, max: number) {
	return Math.min(Math.max(x, min), max);
}


/**
 * Geospatial data
 */
