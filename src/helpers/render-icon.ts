import {svg} from 'lit';
import {Utils} from './utils';

/**
 * Renders a load icon with optional popup functionality.
 * @param entity - The entity to trigger the popup (optional).
 * @param icon - The icon name (e.g., "mdi:home").
 * @param className - The CSS class to apply to the icon.
 * @param x - The x-coordinate of the icon.
 * @param y - The y-coordinate of the icon.
 * @param width - The width of the icon container (default: 30).
 * @param height - The height of the icon container (default: 30).
 * @returns A Lit SVG template or an empty string if no icon is provided.
 */
export function renderIcon(
    entity: string | undefined, 
    icon: string | undefined, 
    className: string, 
    x: number | string, 
    y: number | string, 
    width: number = 30, 
    height: number = 30
) {
    if (icon && entity) {
        return svg`
            <a href="#" @click=${(e) => Utils.handlePopup(e, entity)}>
                <foreignObject x="${x}" y="${y}" width="${width}" height="${height}">
                    <div xmlns="http://www.w3.org/1999/xhtml" style="position: fixed; width: ${width}px; height: ${height}px;">
                        <ha-icon icon="${icon}" class="${className}"></ha-icon>
                    </div>
                </foreignObject>
            </a>`;
    } else if (icon) {
        return svg`
            <foreignObject x="${x}" y="${y}" width="${width}" height="${height}">
                <div xmlns="http://www.w3.org/1999/xhtml" style="position: fixed; width: ${width}px; height: ${height}px;">
                    <ha-icon icon="${icon}" class="${className}"></ha-icon>
                </div>
            </foreignObject>`;
    }
    return '';
}