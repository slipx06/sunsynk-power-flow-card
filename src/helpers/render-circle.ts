import { svg } from 'lit';
import { Utils } from './utils';

/**
 * Renders an animated circle element.
 * @param id - The ID of the circle.
 * @param radius - The radius of the circle.
 * @param fill - The fill color of the circle.
 * @param duration - The duration of the animation in seconds.
 * @param keyPoints - The key points for the animation (e.g., "1;0" or "0;1").
 * @param mpathHref - The ID of the path to follow (e.g., "#bat-line").
 * @param invertFlow - Whether to invert the animation flow (optional, default: false).
 * @returns A Lit SVG template for the animated circle element.
 */
export const renderCircle = (
	id: string,
	radius: number,
	fill: string,
	duration: number,
	keyPoints: string,
	mpathHref: string,
	invertFlow: boolean = false,
) => {
	// If fill is transparent, skip rendering the animated dot entirely to avoid
	// running animations and triggering paints when power is zero or the flow is hidden.
	if (fill === 'transparent') {
		return svg``;
	}

	return svg`
        <circle id="${id}" cx="0" cy="0" r="${radius}" fill="${fill}">
            <animateMotion dur="${duration}s" repeatCount="indefinite"
                keyPoints="${invertFlow ? Utils.invertKeyPoints(keyPoints) : keyPoints}"
                keyTimes="0;1" calcMode="linear">
                <mpath href="${mpathHref}"/>
            </animateMotion>
        </circle>
    `;
};
