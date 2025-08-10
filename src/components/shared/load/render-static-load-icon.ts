import {html} from 'lit';
import {DataDto} from '../../../types';
import {icons} from '../../../helpers/icons';

export interface LoadIconConfig {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	loadNumber: 1 | 2;
	displayCondition: boolean;
	opacityCondition: boolean;
	iconType: 'boiler' | 'aircon' | 'pump' | 'oven';
	prefix: string;
	viewBoxSize?: number; // Optional parameter, defaults to 24 if not specified
}

/**
 * Renders a static load icon (boiler, aircon, pump, or oven) with the specified configuration
 * @param data The data object containing dynamic colors and state
 * @param config The configuration object for the icon
 * @returns A lit-html template for the SVG icon
 */
export const renderStaticLoadIcon = (data: DataDto, config: LoadIconConfig) => {
	const dynamicColor = config.loadNumber === 1 ? data.dynamicColourEssentialLoad1 : data.dynamicColourEssentialLoad2;

	const iconPath = icons[config.iconType];
	const viewBoxSize = config.viewBoxSize || 24; // Default to 24 if not specified

	return html`
		<svg
			xmlns="http://www.w3.org/2000/svg"
			id="${config.prefix}_${config.id}"
			x="${config.x}"
			y="${config.y}"
			width="${config.width}"
			height="${config.height}"
			viewBox="0 0 ${viewBoxSize} ${viewBoxSize}"
			opacity="${config.opacityCondition ? '1' : '0'}"
		>
			<path display="${config.displayCondition ? '' : 'none'}" fill="${dynamicColor}" d="${iconPath}" />
		</svg>
	`;
};
