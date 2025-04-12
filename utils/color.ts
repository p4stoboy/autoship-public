export type RGBColor = {
	r: number;
	g: number;
	b: number;
};

export function parseColor(color: string): RGBColor | null {
	if (color.startsWith('#')) {
		// Parse hex color
		const hex = color.replace('#', '');
		return {
			r: parseInt(hex.substring(0, 2), 16),
			g: parseInt(hex.substring(2, 4), 16),
			b: parseInt(hex.substring(4, 6), 16),
		};
	} else if (color.startsWith('rgb')) {
		// Parse rgb/rgba color
		const match = color.match(/\d+/g);
		if (match && match.length >= 3) {
			return {
				r: parseInt(match[0]),
				g: parseInt(match[1]),
				b: parseInt(match[2]),
			};
		}
	}
	return null;
}

export function darkenColor(color: string, amount: number): string {
	const rgb = parseColor(color);
	if (!rgb) return color;

	const newR = Math.max(0, Math.floor(rgb.r * (1 - amount)));
	const newG = Math.max(0, Math.floor(rgb.g * (1 - amount)));
	const newB = Math.max(0, Math.floor(rgb.b * (1 - amount)));

	return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

export function hexToRgba(hexColor: string, alpha: number): string {
	const rgb = parseColor(hexColor);
	if (!rgb) return `rgba(255, 255, 255, ${alpha})`;
	return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

export function toRgba(color: string, alpha: number): string {
	const rgb = parseColor(color);
	if (rgb) return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
	return `rgba(255, 255, 255, ${alpha})`;
}
