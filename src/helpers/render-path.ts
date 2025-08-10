import { svg } from "lit";

/**
 * Renders an SVG path element with display and stroke attributes.
 * @param id - The ID of the path.
 * @param d - The path data (e.g., "M 409 143 L 409 135").
 * @param display - Whether the path should be displayed (true = visible, false = 'none').
 * @param color - The stroke color of the path.
 * @param lineWidth - The stroke width of the path.
 * @returns A Lit SVG template for the path element.
 */
export const renderPath = (
	id: string,
	d: string,
	display: boolean,
	color: string,
	lineWidth: number,
) => {
	return svg`
        <path id="${id}" d="${d}" fill="none" display="${display ? "" : "none"}"
            stroke="${color}" stroke-width="${lineWidth}"
            stroke-miterlimit="10" pointer-events="stroke"/>
    `;
};
