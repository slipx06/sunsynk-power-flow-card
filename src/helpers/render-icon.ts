import { svg } from 'lit';
import { Utils } from './utils';

/**
 * Renders a load icon with optional popup functionality.
 * @param entity - The entity to trigger the popup (optional).
 * @param icon - The icon name (e.g., "mdi:home").
 * @param className - The CSS class to apply to the icon.
 * @param x - The x-coordinate of the icon.
 * @param y - The y-coordinate of the icon.
 * @param width - The width of the icon container (default: 30).
 * @param height - The height of the icon container (default: 30).
 * @param show - Whether the icon should be visible (default: true).
 * @returns A Lit SVG template or an empty string if no icon is provided.
 */
export function renderIcon(
	entity: string | undefined,
	icon: string | undefined,
	className: string,
	x: number | string,
	y: number | string,
	width: number = 30,
	height: number = 30,
	show: boolean = true,
) {
	if (icon && entity) {
		return svg`
            <a href="#" @click=${(e) => Utils.handlePopup(e, entity)}>
                <foreignObject x="${x}" y="${y}" width="${width}" height="${height}" display="${show ? '' : 'none'}">
                    <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                        <ha-icon icon="${icon}" class="${className}" style="--mdc-icon-size: 100%; width: 100%; height: 100%;"></ha-icon>
                    </div>
                </foreignObject>
            </a>`;
	} else if (icon) {
		return svg`
            <foreignObject x="${x}" y="${y}" width="${width}" height="${height}" display="${show ? '' : 'none'}">
                <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                    <ha-icon icon="${icon}" class="${className}" style="--mdc-icon-size: 100%; width: 100%; height: 100%;"></ha-icon>
                </div>
            </foreignObject>`;
	}
	return '';
}
