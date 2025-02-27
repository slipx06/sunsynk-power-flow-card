// aux-elements.ts
import {svg, html} from 'lit';
import {localize} from '../../../localize/localize';
import {Utils} from '../../../helpers/utils';
import {DataDto, sunsynkPowerFlowCardConfig} from '../../../types';
import {icons} from '../../../helpers/icons';
import {UnitOfPower} from '../../../const';
import {createTextWithPopup, renderText} from '../../shared/text-utils';
import {getAuxIconConfigs} from './icon-configs';
import {renderStaticAuxIcon} from './render-static-aux-icons';
import {renderIcon} from '../../shared/render-icon';

export const renderAuxLoadElements = (data: DataDto, config: sunsynkPowerFlowCardConfig) => {
    const {
        showAux,
        additionalAuxLoad,
        largeFont,
        auxDynamicColour,
        auxStatus,
        auxPower,
        decimalPlaces
    } = data;

    const {
        auto_scale,
    } = config.load;

    return html`
        <!-- Aux Load Elements -->
        <svg id="Aux Load" style="overflow: visible" x="${config.wide ? '30%' : '3%'}" y="2.5%">
            <rect x="237" y="32" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                stroke="${auxDynamicColour}" pointer-events="all"
                class="${!showAux ? 'st12' : ''}"/>
            <rect id="aux-load1" x="374" y="20" width="70" height="25" rx="4.5" ry="4.5" fill="none"
                stroke="${data.auxDynamicColourLoad1}" pointer-events="all"
                display="${showAux ? '' : 'none'}"
                class="${[1, 2].includes(additionalAuxLoad) ? '' : 'st12'}"/>
            <rect id="aux-load2" x="374" y="50" width="70" height="25" rx="4.5" ry="4.5" fill="none"
                stroke="${data.auxDynamicColourLoad2}" pointer-events="all"
                display="${!showAux ? 'none' : ''}"
                class="${additionalAuxLoad === 2 ? '' : 'st12'}"/>
            ${renderText(
                'daily_load_aux',
                238,
                93,
                !data.loadShowDaily || !showAux,
                'st3 left-align',
                data.loadColour,
                config.load.label_daily_load || localize('common.daily_load'),
                true
            )}
            ${renderText(
                'aux_one',
                411,
                82,
                !showAux || [1, 2].includes(additionalAuxLoad),
                'st3 st8',
                auxStatus === 'on' || auxStatus === '1' ? auxDynamicColour : data.auxOffColour,
                config.load.aux_name || localize('common.aux_name'),
                true
            )}
            ${renderText(
            'aux_load1',
                411,
                additionalAuxLoad === 1 ? 53 : 14,
                !showAux || additionalAuxLoad === 0,
                'st3 st8',
                data.auxDynamicColourLoad1,
                config.load.aux_load1_name,
                true
            )}
            ${renderText(
                'aux_load2',
                411,
                83,
                !showAux || [0, 1].includes(additionalAuxLoad),
                'st3 st8',
                data.auxDynamicColourLoad2,
                config.load.aux_load2_name,
                true
            )}
            ${renderText(
                'aux_daily_text',
                238,
                24,
                !showAux || data.showDailyAux !== true,
                'st3 left-align',
                auxDynamicColour,
                config.load.aux_daily_name || localize('common.daily_aux'),
                true
            )}
            <svg id="aux-flow">
                <path id="aux-line" d="M 307 47 L 371 47" fill="none"
                    class="${!showAux ? 'st12' : ''}" stroke="${auxDynamicColour}"
                    stroke-width="${data.auxLineWidth}"
                    stroke-miterlimit="10" pointer-events="stroke"/>
                <circle id="aux-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.auxLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        class="${!showAux || auxPower === 0 ? 'st12' : ''}"
                        fill="${auxPower < 0 ? 'transparent' : `${auxDynamicColour}`}">
                    <animateMotion dur="${data.durationCur['aux']}s" repeatCount="indefinite"
                                keyPoints="0;1"
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#aux-line"/>
                    </animateMotion>
                </circle>
                <circle id="aux-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.auxLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        class="${!showAux || auxPower === 0 ? 'st12' : ''}"
                        fill="${auxPower > 0 ? 'transparent' : `${auxDynamicColour}`}">
                    <animateMotion dur="${data.durationCur['aux']}s" repeatCount="indefinite"
                                keyPoints="1;0"
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#aux-line"/>
                    </animateMotion>
                </circle>
            </svg>
            <svg id="aux1-flow">
                <path id="aux-line2" d="${config.wide ? 'M 108 162 L 108 57 Q 108 47 118 47 L 237 47': 'M 180 162 L 180 57 Q 180 47 190 47 L 237 47'}" fill="none"
                    class="${!showAux ? 'st12' : ''}" stroke="${auxDynamicColour}"
                    stroke-width="${data.auxLineWidth}"
                    stroke-miterlimit="10" pointer-events="stroke"/>
                <circle id="aux-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.auxLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        class="${!showAux || auxPower === 0 ? 'st12' : ''}"
                        fill="${auxPower < 0 ? 'transparent' : `${auxDynamicColour}`}">
                    <animateMotion dur="${data.durationCur['aux']}s" repeatCount="indefinite"
                                keyPoints="0;1"
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#aux-line2"/>
                    </animateMotion>
                </circle>
                <circle id="aux-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.auxLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        class="${!showAux || auxPower === 0 ? 'st12' : ''}"
                        fill="${auxPower > 0 ? 'transparent' : `${auxDynamicColour}`}">
                    <animateMotion dur="${data.durationCur['aux']}s" repeatCount="indefinite"
                                keyPoints="1;0"
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#aux-line2"/>
                    </animateMotion>
                </circle>
            </svg>
            <!-- Aux Icon -->
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.aux_connected_status)}>
                ${getAuxIconConfigs(data).map(iconConfig => renderStaticAuxIcon(iconConfig))}
                <svg xmlns="http://www.w3.org/2000/svg" id="aux_inverter" x="388" y="8" width="44"
                        height="69" viewBox="0 0 74 91" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)"
                        class="${data.auxType === 'inverter' ? '' : 'st12'}"
                        display="${!showAux || [1, 2].includes(additionalAuxLoad) ? 'none' : ''}"
                        fill="${auxStatus === 'on' || auxStatus === '1' ? `${auxDynamicColour}` : `${data.auxOffColour}`}"
                        stroke="none">
                            <path d="${icons.inverter}"/>
                        </g>
                    </svg>
                <g display="${!showAux || [1, 2].includes(additionalAuxLoad) ? 'none' : ''}">
                    ${renderIcon(undefined, data.auxType, `${auxStatus === 'on' || auxStatus === '1' ? 'aux-icon' : 'aux-off-icon'}`, 375, 8, 70, 70)}
                </g>
            </a>    
            <g display="${!showAux || additionalAuxLoad === 0 ? 'none' : ''}">
                ${renderIcon(undefined, data.iconAuxLoad1, 'aux-small-icon-1', 345, 18, 40, 40)}
            </g>
            <g display="${!showAux || [0, 1].includes(additionalAuxLoad) ? 'none' : ''}">
                ${renderIcon(undefined, data.iconAuxLoad2, 'aux-small-icon-2', 345, 52, 40, 40)}   
            </g>
            ${createTextWithPopup(
                'aux_daily_value',
                238,
                12,
                !showAux || data.showDailyAux !== true || !data.stateDayAuxEnergy.isValid(),
                'st10 left-align',
                auxDynamicColour,
                data.stateDayAuxEnergy.toPowerString(true, data.decimalPlacesEnergy),
                (e) => Utils.handlePopup(e, config.entities.day_aux_energy),
                true
            )}
            ${config.entities?.aux_power_166
                ? svg`
                    ${createTextWithPopup(
                        'aux_power_166',
                        270,
                        48,
                        !showAux,
                        `${largeFont !== true ? 'st14' : 'st4'} st8`,
                        auxDynamicColour,
                        auto_scale
                            ? `${config.load.show_absolute_aux
                                    ? `${Math.abs(parseFloat(Utils.convertValue(auxPower, decimalPlaces)))} ${Utils.convertValue(auxPower, decimalPlaces).split(' ')[1]}`
                                    : Utils.convertValue(auxPower, decimalPlaces) || '0'}`
                            : `${config.load.show_absolute_aux
                                    ? `${Math.abs(auxPower)}`
                                    : auxPower || 0} ${UnitOfPower.WATT}`,
                        (e) => Utils.handlePopup(e, config.entities.aux_power_166),
                        true
                    )}`
                : svg`
                    ${renderText(
                        'aux_power_166',
                        270,
                        48,
                        !showAux,
                        `${largeFont !== true ? 'st14' : 'st4'} st8`,
                        auxDynamicColour,
                        auto_scale
                            ? `${config.load.show_absolute_aux
                                    ? `${Math.abs(parseFloat(Utils.convertValue(auxPower, decimalPlaces)))} ${Utils.convertValue(auxPower, decimalPlaces).split(' ')[1]}`
                                    : Utils.convertValue(auxPower, decimalPlaces) || '0'}`
                            : `${config.load.show_absolute_aux
                                    ? `${Math.abs(auxPower)}`
                                    : auxPower || 0} ${UnitOfPower.WATT}`,
                        true
                    )}`
            }
            ${createTextWithPopup(
                'aux_load1_value',
                411,
                34,
                !showAux || additionalAuxLoad === 0 || !data.stateAuxLoad1.isValid(),
                `${largeFont !== true ? 'st14' : 'st4'} st8`,
                data.auxDynamicColourLoad1,
                data.stateAuxLoad1.toPowerString(auto_scale, decimalPlaces),
                (e) => Utils.handlePopup(e, config.entities.aux_load1),
                true
            )}
            ${createTextWithPopup(
                'aux_load2_value',
                411,
                64,
                !showAux || [0, 1].includes(additionalAuxLoad) || !data.stateAuxLoad2.isValid(),
                `${largeFont !== true ? 'st14' : 'st4'} st8`,
                data.auxDynamicColourLoad2,
                data.stateAuxLoad2.toPowerString(auto_scale, decimalPlaces),
                (e) => Utils.handlePopup(e, config.entities.aux_load2),
                true
            )}
            ${createTextWithPopup(
                'aux_load1_extra',
                411,
                8,
                !showAux || [1, 2].includes(additionalAuxLoad) || !config.entities.aux_load1_extra,
                'st3 st8',
                auxStatus === 'on' || auxStatus === '1' ? auxDynamicColour : data.auxOffColour,
                `${data.stateAuxLoad1Extra.toNum(1)} ${data.stateAuxLoad1Extra?.getUOM()}`,
                (e) => Utils.handlePopup(e, config.entities.aux_load1_extra),
                true
            )}
            ${createTextWithPopup(
                'aux_load1_extra',
                360,
                14,
                showAux && [1, 2].includes(additionalAuxLoad) && config.entities.aux_load1_extra,
                'st3 st8',
                data.auxDynamicColourLoad1,
                `${data.stateAuxLoad1Extra.toNum(1)} ${data.stateAuxLoad1Extra?.getUOM()}`,
                (e) => Utils.handlePopup(e, config.entities.aux_load1_extra),
            )}   
            ${createTextWithPopup(
                'aux_load2_extra',
                360,
                83,
                !showAux || [0, 1].includes(additionalAuxLoad) || !config.entities.aux_load2_extra,
                'st3 st8',
                data.auxDynamicColourLoad2,
                `${data.stateAuxLoad2Extra.toNum(1)} ${data.stateAuxLoad2Extra?.getUOM()}`,
                (e) => Utils.handlePopup(e, config.entities.aux_load2_extra),
                true
            )}
        </svg>
    `;
}