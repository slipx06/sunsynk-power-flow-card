import {html} from 'lit';
import {icons} from '../../../helpers/icons';

export interface LoadIconConfig {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    displayCondition: boolean;
    opacityCondition: boolean;
    iconType: 'boiler' | 'aircon' | 'pump' | 'oven' | 'nonEss'; 
    prefix: string;
    viewBoxSize?: number;
    dynamicColor?: string; 
}

/**
 * Renders a static load icon (boiler, aircon, pump, or oven) with the specified configuration
 */
export const renderStaticGridIcon = (config: LoadIconConfig) => {
    
    const iconPath = icons[config.iconType];

    return html`
        <svg xmlns="http://www.w3.org/2000/svg" 
            id="${config.prefix}_${config.id}"
            x="${config.x}"
            y="${config.y}"
            width="${config.width}"
            height="${config.height}"
            viewBox="0 0 ${config.viewBoxSize || 24} ${config.viewBoxSize || 24}"
            opacity="${config.opacityCondition ? '1' : '0'}">
            <path 
                display="${config.displayCondition ? 'none' : ''}"
                fill="${config.dynamicColor}"
                d="${iconPath}"/>
        </svg>
    `;
};