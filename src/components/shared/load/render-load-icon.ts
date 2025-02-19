import {svg} from 'lit';
import {Utils} from '../../../helpers/utils';

export function renderLoadIcon(entity: string | undefined, icon: string | undefined, className: string, x: number, y: number) {
    if (icon && entity) {
        return svg`
            <a href="#" @click=${(e) => Utils.handlePopup(e, entity)}>
                <foreignObject x="${x}" y="${y}" width="30" height="30">
                    <div xmlns="http://www.w3.org/1999/xhtml" style="position: fixed; width: 30px; height: 30px;">
                        <ha-icon icon="${icon}" class="${className}"></ha-icon>
                    </div>
                </foreignObject>
            </a>`;
    } else if (icon) {
        return svg`
            <foreignObject x="${x}" y="${y}" width="30" height="30">
                <div xmlns="http://www.w3.org/1999/xhtml" style="position: fixed; width: 30px; height: 30px;">
                    <ha-icon icon="${icon}" class="${className}"></ha-icon>
                </div>
            </foreignObject>`;
    }
    return '';
}