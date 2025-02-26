// aux-elements.ts
import {svg, html} from 'lit';
import {localize} from '../../../localize/localize';
import {Utils} from '../../../helpers/utils';
import {DataDto, sunsynkPowerFlowCardConfig} from '../../../types';
import {icons} from '../../../helpers/icons';
import {UnitOfPower} from '../../../const';

export const renderAuxLoadElements = (data: DataDto, config: sunsynkPowerFlowCardConfig) => {
    return html`
        <!-- Aux Load Elements -->
        <svg id="Aux Load" style="overflow: visible" x="${config.wide ? '30%' : '3%'}" y="2.5%">
            <rect x="237" y="32" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                stroke="${data.auxDynamicColour}" pointer-events="all"
                class="${!data.showAux ? 'st12' : ''}"/>
            <rect id="aux-load1" x="374" y="20" width="70" height="25" rx="4.5" ry="4.5" fill="none"
                stroke="${data.auxDynamicColourLoad1}" pointer-events="all"
                display="${data.showAux ? '' : 'none'}"
                class="${[1, 2].includes(data.additionalAuxLoad) ? '' : 'st12'}"/>
            <rect id="aux-load2" x="374" y="50" width="70" height="25" rx="4.5" ry="4.5" fill="none"
                stroke="${data.auxDynamicColourLoad2}" pointer-events="all"
                display="${!data.showAux ? 'none' : ''}"
                class="${data.additionalAuxLoad === 2 ? '' : 'st12'}"/>
            <text id="daily_load_aux" x="${data.additionalAuxLoad === 2 ? '238' : '238'}" y="93"
                class="st3 left-align"
                fill="${!data.loadShowDaily || !data.showAux ? 'transparent' : `${data.loadColour}`}">
                ${config.load.label_daily_load || localize('common.daily_load')}
            </text>
            <text id="aux_one" x="411" y="82" class="st3 st8"
                display="${!data.showAux || [1, 2].includes(data.additionalAuxLoad) ? 'none' : ''}"
                fill="${data.auxStatus === 'on' || data.auxStatus === '1' ? `${data.auxDynamicColour}` : `${data.auxOffColour}`}">
                ${config.load.aux_name || localize('common.aux_name')}
            </text>
            <text id="aux_load1" x="411" y="${data.additionalAuxLoad === 1 ? 53 : 14}" class="st3 st8"
                display="${!data.showAux || data.additionalAuxLoad === 0 ? 'none' : ''}"
                fill="${data.auxDynamicColourLoad1}">${config.load.aux_load1_name}
            </text>
            <text id="aux_load2" x="411" y="83" class="st3 st8"
                display="${!data.showAux || [0, 1].includes(data.additionalAuxLoad) ? 'none' : ''}"
                fill="${data.auxDynamicColourLoad2}">${config.load.aux_load2_name}
            </text>
            <text id="aux_daily_text"
                x="${[1, 2].includes(data.additionalAuxLoad) ? '238' : '238'}" y="24"
                class="st3 left-align"
                display="${!data.showAux || data.showDailyAux !== true ? 'none' : ''}"
                fill="${data.auxDynamicColour}">
                ${config.load.aux_daily_name || localize('common.daily_aux')}
            </text>
            <svg id="aux-flow">
                <path id="aux-line" d="M 307 47 L 371 47" fill="none"
                    class="${!data.showAux ? 'st12' : ''}" stroke="${data.auxDynamicColour}"
                    stroke-width="${data.auxLineWidth}"
                    stroke-miterlimit="10" pointer-events="stroke"/>
                <circle id="aux-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.auxLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        class="${!data.showAux || data.auxPower === 0 ? 'st12' : ''}"
                        fill="${data.auxPower < 0 ? 'transparent' : `${data.auxDynamicColour}`}">
                    <animateMotion dur="${data.durationCur['aux']}s" repeatCount="indefinite"
                                keyPoints="0;1"
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#aux-line"/>
                    </animateMotion>
                </circle>
                <circle id="aux-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.auxLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        class="${!data.showAux || data.auxPower === 0 ? 'st12' : ''}"
                        fill="${data.auxPower > 0 ? 'transparent' : `${data.auxDynamicColour}`}">
                    <animateMotion dur="${data.durationCur['aux']}s" repeatCount="indefinite"
                                keyPoints="1;0"
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#aux-line"/>
                    </animateMotion>
                </circle>
            </svg>
            <svg id="aux1-flow">
                <path id="aux-line2" d="${config.wide ? 'M 108 162 L 108 57 Q 108 47 118 47 L 237 47': 'M 180 162 L 180 57 Q 180 47 190 47 L 237 47'}" fill="none"
                    class="${!data.showAux ? 'st12' : ''}" stroke="${data.auxDynamicColour}"
                    stroke-width="${data.auxLineWidth}"
                    stroke-miterlimit="10" pointer-events="stroke"/>
                <circle id="aux-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.auxLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        class="${!data.showAux || data.auxPower === 0 ? 'st12' : ''}"
                        fill="${data.auxPower < 0 ? 'transparent' : `${data.auxDynamicColour}`}">
                    <animateMotion dur="${data.durationCur['aux']}s" repeatCount="indefinite"
                                keyPoints="0;1"
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#aux-line2"/>
                    </animateMotion>
                </circle>
                <circle id="aux-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.auxLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        class="${!data.showAux || data.auxPower === 0 ? 'st12' : ''}"
                        fill="${data.auxPower > 0 ? 'transparent' : `${data.auxDynamicColour}`}">
                    <animateMotion dur="${data.durationCur['aux']}s" repeatCount="indefinite"
                                keyPoints="1;0"
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#aux-line2"/>
                    </animateMotion>
                </circle>
            </svg>
            <!-- Aux Icon -->
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.aux_connected_status)}>
                <svg xmlns="http://www.w3.org/2000/svg" id="aux_default" x="371" y="5" width="83"
                    height="83" viewBox="0 0 24 24">
                    <path class="${data.auxType === 'default' ? '' : 'st12'}"
                        display="${!data.showAux || [1, 2].includes(data.additionalAuxLoad) ? 'none' : ''}"
                        fill="${data.auxStatus === 'on' || data.auxStatus === '1' ? `${data.auxDynamicColour}` : `${data.auxOffColour}`}"
                        d="${icons.aux}"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" id="aux_generator" x="374" y="5" width="74"
                    height="74" viewBox="0 0 24 24">
                    <path class="${data.auxType === 'gen' ? '' : 'st12'}"
                        display="${!data.showAux || [1, 2].includes(data.additionalAuxLoad) ? 'none' : ''}"
                        fill="${data.auxStatus === 'on' || data.auxStatus === '1' ? `${data.auxDynamicColour}` : `${data.auxOffColour}`}"
                        d="${icons.generator}"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" id="aux_inverter" x="388" y="8" width="44"
                    height="69" viewBox="0 0 74 91" preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)"
                    class="${data.auxType === 'inverter' ? '' : 'st12'}"
                    display="${!data.showAux || [1, 2].includes(data.additionalAuxLoad) ? 'none' : ''}"
                    fill="${data.auxStatus === 'on' || data.auxStatus === '1' ? `${data.auxDynamicColour}` : `${data.auxOffColour}`}"
                    stroke="none">
                        <path d="${icons.inverter}"/>
                    </g>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" id="aux_oven" x="375" y="8" width="70"
                    height="70" viewBox="0 0 32 32">
                    <path class="${data.auxType === 'oven' ? '' : 'st12'}"
                        display="${!data.showAux || [1, 2].includes(data.additionalAuxLoad) ? 'none' : ''}"
                        fill="${data.auxStatus === 'on' || data.auxStatus === '1' ? `${data.auxDynamicColour}` : `${data.auxOffColour}`}"
                        d="${icons.oven}"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" id="aux_boiler" x="375" y="8" width="70"
                    height="70" viewBox="0 0 24 24">
                    <path class="${data.auxType === 'boiler' ? '' : 'st12'}"
                        display="${!data.showAux || [1, 2].includes(data.additionalAuxLoad) ? 'none' : ''}"
                        fill="${data.auxStatus === 'on' || data.auxStatus === '1' ? `${data.auxDynamicColour}` : `${data.auxOffColour}`}"
                        d="${icons.boiler}"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" id="aux_ac" x="380" y="12" width="60"
                    height="60" viewBox="0 0 24 24">
                    <path class="${data.auxType === 'aircon' ? '' : 'st12'}"
                        display="${!data.showAux || [1, 2].includes(data.additionalAuxLoad) ? 'none' : ''}"
                        fill="${data.auxStatus === 'on' || data.auxStatus === '1' ? `${data.auxDynamicColour}` : `${data.auxOffColour}`}"
                        d="${icons.aircon}"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" id="aux_pump" x="380" y="15" width="60"
                    height="70" viewBox="0 0 24 24">
                    <path class="${data.auxType === 'pump' ? '' : 'st12'}"
                        display="${!data.showAux || [1, 2].includes(data.additionalAuxLoad) ? 'none' : ''}"
                        fill="${data.auxStatus === 'on' || data.auxStatus === '1' ? `${data.auxDynamicColour}` : `${data.auxOffColour}`}"
                        d="${icons.pump}"/>
                </svg>
                <g display="${!data.showAux || [1, 2].includes(data.additionalAuxLoad) ? 'none' : ''}">
                    <foreignObject x="375" y="8" width="70" height="70">
                        <div xmlns="http://www.w3.org/1999/xhtml" style="position: fixed; width: 70px; height: 70px;">
                            <ha-icon icon="${data.auxType}"
                                class="${data.auxStatus === 'on' || data.auxStatus === '1' ? 'aux-icon' : 'aux-off-icon'}"></ha-icon>
                        </div>
                    </foreignObject>
                </g>
            </a>
            <g display="${!data.showAux || data.additionalAuxLoad === 0 ? 'none' : ''}">
                <foreignObject x="345" y="18" width="40" height="40">
                    <div xmlns="http://www.w3.org/1999/xhtml" style="position: fixed; width: 40px; height: 40px;">
                        <ha-icon icon="${data.iconAuxLoad1}" class="aux-small-icon-1"></ha-icon>
                    </div>
                </foreignObject>
            </g>
            <g display="${!data.showAux || [0, 1].includes(data.additionalAuxLoad) ? 'none' : ''}">
                <foreignObject x="345" y="52" width="40" height="40">
                    <div xmlns="http://www.w3.org/1999/xhtml" style="position: fixed; width: 40px; height: 40px;">
                        <ha-icon icon="${data.iconAuxLoad2}" class="aux-small-icon-2"></ha-icon>
                    </div>
                </foreignObject>
            </g>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_aux_energy)}>
                <text id="aux_daily_value"
                    x="${[1, 2].includes(data.additionalAuxLoad) ? '238' : '238'}"
                    y="12" class="st10 left-align"
                    display="${!data.showAux || data.showDailyAux !== true || !data.stateDayAuxEnergy.isValid() ? 'none' : ''}"
                    fill="${data.auxDynamicColour}">
                    ${data.stateDayAuxEnergy.toPowerString(true, data.decimalPlacesEnergy)}
                </text>
            </a>
            ${config.entities?.aux_power_166
                ? svg`
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.aux_power_166)}>
                        <text id="aux_power_166" x="270" y="48" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                                display="${!data.showAux ? 'none' : ''}" 
                                fill="${data.auxDynamicColour}">
                            ${config.load.auto_scale
                                ? `${config.load.show_absolute_aux
                                        ? `${Math.abs(parseFloat(Utils.convertValue(data.auxPower, data.decimalPlaces)))} ${Utils.convertValue(data.auxPower, data.decimalPlaces).split(' ')[1]}`
                                        : Utils.convertValue(data.auxPower, data.decimalPlaces) || '0'}`
                                : `${config.load.show_absolute_aux
                                        ? `${Math.abs(data.auxPower)}`
                                        : data.auxPower || 0} ${UnitOfPower.WATT}`
                            }
                        </text>
                    </a>`
                : svg`
                    <text id="aux_power_166" x="270" y="48" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                            display="${!data.showAux ? 'none' : ''}" 
                            fill="${data.auxDynamicColour}">
                        ${config.load.auto_scale
                            ? `${config.load.show_absolute_aux
                                    ? `${Math.abs(parseFloat(Utils.convertValue(data.auxPower, data.decimalPlaces)))} ${Utils.convertValue(data.auxPower, data.decimalPlaces).split(' ')[1]}`
                                    : Utils.convertValue(data.auxPower, data.decimalPlaces) || '0'}`
                            : `${config.load.show_absolute_aux
                                    ? `${Math.abs(data.auxPower)}`
                                    : data.auxPower || 0} ${UnitOfPower.WATT}`
                        }
                    </text>`
            }
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.aux_load1)}>
                <text id="aux_load1_value" x="411" y="34" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                    display="${!data.showAux || data.additionalAuxLoad === 0 || !data.stateAuxLoad1.isValid() ? 'none' : ''}" 
                    fill="${data.auxDynamicColourLoad1}">
                    ${data.stateAuxLoad1.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.aux_load2)}>
                <text id="aux_load2_value" x="411" y="64" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                    display="${!data.showAux || [0, 1].includes(data.additionalAuxLoad) || !data.stateAuxLoad2.isValid() ? 'none' : ''}" 
                    fill="${data.auxDynamicColourLoad2}">
                    ${data.stateAuxLoad2.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.aux_load1_extra)}>
                <text id="aux_load1_extra" x="411" y="8" class="st3 st8"
                    display="${!data.showAux || [1, 2].includes(data.additionalAuxLoad) || !config.entities.aux_load1_extra ? 'none' : ''}"
                    fill="${data.auxStatus === 'on' || data.auxStatus === '1' ? `${data.auxDynamicColour}` : `${data.auxOffColour}`}">
                    ${data.stateAuxLoad1Extra.toNum(1)}
                    ${data.stateAuxLoad1Extra?.getUOM()}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.aux_load1_extra)}>                    
                <text id="aux_load1_extra" x="360" y="14" class="st3 st8"
                    display="${data.showAux && [1, 2].includes(data.additionalAuxLoad) && config.entities.aux_load1_extra ? '' : 'none'}"
                    fill="${data.auxDynamicColourLoad1}">
                    ${data.stateAuxLoad1Extra.toNum(1)}
                    ${data.stateAuxLoad1Extra?.getUOM()}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.aux_load2_extra)}>
                <text id="aux_load2_extra" x="360" y="83" class="st3 st8"
                    display="${!data.showAux || [0, 1].includes(data.additionalAuxLoad) || !config.entities.aux_load2_extra ? 'none' : ''}"
                    fill="${data.auxDynamicColourLoad2}">
                    ${data.stateAuxLoad2Extra.toNum(1)}
                    ${data.stateAuxLoad2Extra?.getUOM()}
                </text>
            </a>
        </svg>
    `;
}