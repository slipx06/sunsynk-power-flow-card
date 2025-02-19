// load-elements.ts
import {svg, html} from 'lit';
import {localize} from '../../../localize/localize';
import {Utils} from '../../../helpers/utils';
import {DataDto, sunsynkPowerFlowCardConfig} from '../../../types';
import {UnitOfPower} from '../../../const';
import {renderLoadIcon} from '../../shared/load/render-load-icon';
import {getFullLayoutIconConfigs} from '../../shared/load/icon-configs';
import {renderStaticLoadIcon} from '../../shared/load/render-static-load-icon';

export const renderLoadElements = (data: DataDto, config: sunsynkPowerFlowCardConfig) => {
    return html`
        <!-- Load Elements -->
        <svg id="Load" style="overflow: visible" x="${config.wide ? '30%' : '3%'}" y="2.5%">
            <svg id="es-load5" 
                    style="overflow: visible" 
                    viewBox="${config.wide && [5, 6].includes(data.additionalLoad) ? "0 0 720 405" : "0 0 0 0"}" 
                    x="5%">
                <rect id="es-load5" x="413"
                    y="30" width="35" height="20" rx="4.5" ry="4.5"
                    fill="none" stroke="${data.dynamicColourEssentialLoad5}" pointer-events="all"
                    display="${[5, 6].includes(data.additionalLoad) ? '' : 'none'}"/>
                <text id="ess-load5" x="418"
                    y="59" class="st3 st8 left-align"
                    display="${[5, 6].includes(data.additionalLoad) ? '' : 'none'}" fill="${data.dynamicColourEssentialLoad5}">
                    ${config.load.load5_name}
                </text>
                <g display="${[5, 6].includes(data.additionalLoad) ? '' : 'none'}">
                    ${renderLoadIcon(config.load.load5_switch, data.iconEssentialLoad5, 'essload5-small-icon', 421, 5)}
                </g>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load5_extra)}>
                    <text id="ess_load5_value_extra" x="418" y="70"
                        display="${config.entities?.essential_load5_extra && [5, 6].includes(data.additionalLoad) && !data.showAux && data.stateEssentialLoad5Extra.isValid() ? '' : 'none'}"
                        class="st3 left-align" fill="${data.dynamicColourEssentialLoad5}">
                        ${data.stateEssentialLoad5Extra.toNum(1)}
                        ${data.stateEssentialLoad5Extra?.getUOM()}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load5)}>
                    <text id="ess_load5_value" x="430" y="41" 
                        display="${[5, 6].includes(data.additionalLoad) && data.stateEssentialLoad5.isValid() ? '' : 'none'}" class="st3" 
                        fill="${data.dynamicColourEssentialLoad5}">
                        ${data.stateEssentialLoad5.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                    </text>
                </a>
            </svg>
            <svg id="es-load6" 
                    style="overflow: visible" 
                    viewBox="${config.wide && [6].includes(data.additionalLoad) ? "0 0 720 405" : "0 0 0 0"}" 
                    x="5%">
                <rect id="es-load5" x="413"
                    y="149" width="35" height="20" rx="4.5" ry="4.5"
                    fill="none" stroke="${data.dynamicColourEssentialLoad6}" pointer-events="all"
                    display="${[5, 6].includes(data.additionalLoad) ? '' : 'none'}"/>
                <text id="ess-load5" x="418"
                    y="178" class="st3 st8 left-align"
                    display="${[5, 6].includes(data.additionalLoad) ? '' : 'none'}" fill="${data.dynamicColourEssentialLoad6}">
                    ${config.load.load6_name}
                </text>
                <g display="${[5, 6].includes(data.additionalLoad) ? '' : 'none'}">
                    ${renderLoadIcon(config.load.load6_switch, data.iconEssentialLoad6, 'essload6-small-icon', 421, 123)}
                </g>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load6_extra)}>
                    <text id="ess_load6_value_extra" x="418" y="190"
                        display="${config.entities?.essential_load6_extra && [5, 6].includes(data.additionalLoad) && !data.showAux && data.stateEssentialLoad6Extra.isValid() ? '' : 'none'}"
                        class="st3 left-align" fill="${data.dynamicColourEssentialLoad6}">
                        ${data.stateEssentialLoad6Extra.toNum(1)}
                        ${data.stateEssentialLoad6Extra?.getUOM()}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load6)}>
                    <text id="ess_load6_value" x="430" y="160" 
                        display="${[5, 6].includes(data.additionalLoad) && data.stateEssentialLoad6.isValid() ? '' : 'none'}" class="st3" 
                        fill="${data.dynamicColourEssentialLoad6}">
                        ${data.stateEssentialLoad6.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                    </text>
                </a>
            </svg>
            <rect x="236" y="103" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                stroke="${data.loadColour}" pointer-events="all"/>
            <rect id="es-load1" x="374" y="${!data.showAux ? '30' : '143'}" width="70" height="30"
                rx="4.5" ry="4.5" fill="none" stroke="${data.dynamicColourEssentialLoad1}" pointer-events="all"
                display="${data.additionalLoad === 1 ? '' : 'none'}"/>
            <rect id="es-load2" x="${!data.showAux ? '376' : '373'}"
                y="${!data.showAux ? '30' : '149'}" width="35" height="20" rx="4.5" ry="4.5"
                fill="none" stroke="${data.dynamicColourEssentialLoad1}" pointer-events="all"
                display="${[2, 4, 5, 6].includes(data.additionalLoad) ? '' : 'none'}"/>
            <rect id="es-load2" x="${!data.showAux ? '413' : '410'}"
                y="${!data.showAux ? '30' : '149'}" width="35" height="20" rx="4.5" ry="4.5"
                fill="none" stroke="${data.dynamicColourEssentialLoad2}" pointer-events="all"
                display="${[2, 4, 5, 6].includes(data.additionalLoad) ? '' : 'none'}"/>
            <rect id="es-load4" x="376"
                y="149" width="35" height="20" rx="4.5" ry="4.5"
                fill="none" stroke="${data.dynamicColourEssentialLoad3}" pointer-events="all"
                display="${!data.showAux && [3, 4, 5, 6].includes(data.additionalLoad) ? '' : 'none'}"/>
            <rect id="es-load4" x="413"
                y="149" width="35" height="20" rx="4.5" ry="4.5"
                fill="none" stroke="${data.dynamicColourEssentialLoad4}" pointer-events="all"
                display="${!data.showAux && [3, 4, 5, 6].includes(data.additionalLoad) ? '' : 'none'}"/>
            <text x="411" y="157" class="st3 st8"
                display="${[0].includes(data.additionalLoad) || (!data.showAux && [1, 2].includes(data.additionalLoad)) ? '' : 'none'}"
                fill="${data.loadColour}">
                ${config.load.essential_name || localize('common.essential')}
            </text>
            <text id="ess_load" x="411" y="130" class="st3 st8"
                display="${([1,2].includes(data.additionalLoad) && data.showAux) || (!data.showAux && [4, 5, 6].includes(data.additionalLoad)) ? '' : 'none'}"
                fill="${data.loadColour}">
                ${config.load.essential_name || localize('common.essential')}
            </text>
            <text id="ess-load1" x="416" y="${!data.showAux ? 70 : 181}" class="st3 left-align"
                display="${data.additionalLoad === 1 ? '' : 'none'}" fill="${data.dynamicColourEssentialLoad1}">
                ${config.load.load1_name}
            </text>
            <text id="ess-load2" x="${!data.showAux ? 405 : 402}"
                y="${!data.showAux ? 59 : 178}" class="st3 st8 right-align"
                display="${[2, 4, 5, 6].includes(data.additionalLoad) ? '' : 'none'}" fill="${data.dynamicColourEssentialLoad1}">
                ${config.load.load1_name}
            </text>
            <text id="ess-load2" x="${!data.showAux ? 418 : 415}"
                y="${!data.showAux ? 59 : 178}" class="st3 st8 left-align"
                display="${[2, 4, 5, 6].includes(data.additionalLoad) ? '' : 'none'}" fill="${data.dynamicColourEssentialLoad2}">
                ${config.load.load2_name}
            </text>
            <text id="ess-load4" x="405"
                y="178" class="st3 st8 right-align"
                display="${[4, 5, 6].includes(data.additionalLoad) ? '' : 'none'}" fill="${data.dynamicColourEssentialLoad3}">
                ${config.load.load3_name}
            </text>
            <text id="ess-load4" x="418"
                y="178" class="st3 st8 left-align"
                display="${[4, 5, 6].includes(data.additionalLoad) ? '' : 'none'}" fill="${data.dynamicColourEssentialLoad4}">
                ${config.load.load4_name}
            </text>
            <text id="daily_load" x="${data.additionalLoad === 0 ? '377' : '238'}"
                y="${data.additionalLoad === 0 ? 71 : 93}" class="st3 left-align"
                fill="${!data.loadShowDaily || data.showAux ? 'transparent' : `${data.loadColour}`}">
                ${config.load.label_daily_load || localize('common.daily_load')}
            </text>
            <text id="load-power-3P" x="237" y="142"
                display="${config.inverter.three_phase && config.entities?.load_power_L1 ? '' : 'none'}"
                class="st3 left-align" fill="${data.loadColour}">
                ${config.inverter.three_phase && config.entities?.load_power_L1 ? data.loadPowerL1 : '0'}
                ${config.inverter.three_phase && config.entities?.load_power_L2 ? '| ' + data.loadPowerL2 : ''}
                ${config.inverter.three_phase && config.entities?.load_power_L3 ? '| ' + data.loadPowerL3 : ''}
                ${UnitOfPower.WATT}
            </text>
            <path id="es-load1" d="M 409 143 L 409 135" display="${data.showAux ? '' : 'none'}"
                class="${[1, 2].includes(data.additionalLoad) ? '' : 'st12'}" fill="none"
                stroke="${data.load1Colour}" stroke-width="1" stroke-miterlimit="10"
                pointer-events="stroke"/>
            <path id="es-load1" d="M 412 143 L 412 135" display="${!data.showAux ? '' : 'none'}"
                class="${[4, 5, 6].includes(data.additionalLoad) ? '' : 'st12'}" fill="none"
                stroke="${data.load2Colour}" stroke-width="1" stroke-miterlimit="10"
                pointer-events="stroke"/>
            <path id="es-load1" d="M 412 80 L 412 60" display="${!data.showAux ? '' : 'none'}"
                class="${data.additionalLoad === 1 ? '' : 'st12'}" fill="none" stroke="${data.load1Colour}"
                stroke-width="1" stroke-miterlimit="10" pointer-events="stroke"/>
            <path id="es-load2" d="M 412 80 L 412 53" display="${!data.showAux ? '' : 'none'}"
                class="${[2, 4, 5, 6].includes(data.additionalLoad) ? '' : 'st12'}" fill="none" stroke="${data.load1Colour}"
                stroke-width="1" stroke-miterlimit="10" pointer-events="stroke"/>
            <svg id="load-flow">
                <circle id="es-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.loadLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.essentialPower === 0 || data.essentialPower < 0 ? 'transparent' : `${config.load.dynamic_colour ? data.flowColour : data.loadColour}`}">
                    <animateMotion dur="${data.durationCur['load']}s" repeatCount="indefinite"
                                keyPoints=${config.load.invert_flow === true ? Utils.invertKeyPoints("0;1") : "0;1"}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#es-line2"/>
                    </animateMotion>
                </circle>
                <circle id="es-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.loadLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.essentialPower === 0 || data.essentialPower > 0 ? 'transparent' : `${config.load.dynamic_colour ? data.flowColour : data.loadColour}`}">
                    <animateMotion dur="${data.durationCur['load']}s" repeatCount="indefinite"
                                keyPoints=${config.load.invert_flow === true ? Utils.invertKeyPoints("1;0") : "1;0"}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#es-line2"/>
                    </animateMotion>
                </circle>
                <path id="es-line2" d="M 306 118 L 371 118" fill="none" stroke="${config.load.dynamic_colour ? data.flowColour : data.loadColour}"
                stroke-width="${data.loadLineWidth}" stroke-miterlimit="10" pointer-events="stroke"/>
            </svg>
            <svg id="load1-flow">
                <circle id="es-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.loadLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.essentialPower === 0 || data.essentialPower < 0 ? 'transparent' : `${config.load.dynamic_colour ? data.flowColour : data.loadColour}`}">
                    <animateMotion dur="${data.durationCur['load']}s" repeatCount="indefinite"
                                keyPoints=${config.load.invert_flow === true ? Utils.invertKeyPoints("1;0") : "1;0"}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#es-line"/>
                    </animateMotion>
                </circle>
                <circle id="es-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.loadLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.essentialPower === 0 || data.essentialPower > 0 ? 'transparent' : `${config.load.dynamic_colour ? data.flowColour : data.loadColour}`}">
                    <animateMotion dur="${data.durationCur['load']}s" repeatCount="indefinite"
                                keyPoints=${config.load.invert_flow === true ? Utils.invertKeyPoints("0;1") : "0;1"}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#es-line"/>
                    </animateMotion>
                </circle>
                <path id="es-line" d="${config.wide ? 'M 236 118 L 118 118 Q 108 118 108 128 L 108 162': 'M 236 118 L 190 118 Q 180 118 180 128 L 180 162'}" fill="none"
                    stroke="${config.load.dynamic_colour ? data.flowColour : data.loadColour}" stroke-width="${data.loadLineWidth}" stroke-miterlimit="10"
                    pointer-events="stroke"/>
            </svg>
            <!-- Essential Icon -->
            
                    <a href="#" @click=${(e) => config.load.navigate ? Utils.handleNavigation(e, config.load.navigate) : null}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="essen_aux" x="373.5"
                                y="${data.essIconSize === 1 ? "82.5" : "78.5"}" width="77"
                                height="77" viewBox="0 0 24 24">
                                <defs>
                                    <linearGradient id="Lg-${data.timestamp_id}" x1="0%" x2="0%" y1="100%" y2="0%">
                                        <stop offset="0%"
                                            stop-color="${data.gridPercentage > 0 ? data.gridColour : (data.batteryPercentage > 0 ? data.batteryColour : data.solarColour)}"/>
                                        <stop offset="${data.gridPercentage}%"
                                            stop-color="${data.gridPercentage > 0 ? data.gridColour : (data.batteryPercentage > 0 ? data.batteryColour : data.solarColour)}"/>
                                        <stop offset="${data.gridPercentage}%"
                                            stop-color="${data.batteryPercentage > 0 ? data.batteryColour : data.solarColour}"/>
                                        <stop offset="${(data.gridPercentage + data.batteryPercentage)}%"
                                            stop-color="${data.batteryPercentage > 0 ? data.batteryColour : data.solarColour}"/>
                                        <stop offset="${(data.gridPercentage + data.batteryPercentage)}%"
                                            stop-color="${data.solarColour}"/>
                                        <stop offset="100%"
                                            stop-color="${data.solarColour}"/>
                                    </linearGradient>
                                </defs>
                                <path display="${[1, 2].includes(data.additionalLoad) && !data.showAux ? '' : 'none'}"
                                    fill="${config.load.dynamic_colour ? `url(#Lg-${data.timestamp_id})` : data.loadColour}"
                                    d="${data.essIcon}"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" id="essen_noaux" x="390" y="89" width="38"
                                height="38" viewBox="0 0 24 24">
                                <defs>
                                    <linearGradient id="Lg-${data.timestamp_id}" x1="0%" x2="0%" y1="100%" y2="0%">
                                        <stop offset="0%"
                                            stop-color="${data.gridPercentage > 0 ? data.gridColour : (data.batteryPercentage > 0 ? data.batteryColour : data.solarColour)}"/>
                                        <stop offset="${data.gridPercentage}%"
                                            stop-color="${data.gridPercentage > 0 ? data.gridColour : (data.batteryPercentage > 0 ? data.batteryColour : data.solarColour)}"/>
                                        <stop offset="${data.gridPercentage}%"
                                            stop-color="${data.batteryPercentage > 0 ? data.batteryColour : data.solarColour}"/>
                                        <stop offset="${(data.gridPercentage + data.batteryPercentage)}%"
                                            stop-color="${data.batteryPercentage > 0 ? data.batteryColour : data.solarColour}"/>
                                        <stop offset="${(data.gridPercentage + data.batteryPercentage)}%"
                                            stop-color="${data.solarColour}"/>
                                        <stop offset="100%"
                                            stop-color="${data.solarColour}"/>
                                    </linearGradient>
                                </defs>
                                <path display="${([1, 2].includes(data.additionalLoad) && data.showAux) ? '' : 'none'}"
                                    fill="${config.load.dynamic_colour ? `url(#Lg-${data.timestamp_id})` : data.loadColour}"
                                    d="${data.essIcon}"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" id="essen_noaux_four" x="387" y="77" width="50"
                                height="50" viewBox="0 0 24 24">
                                <defs>
                                    <linearGradient id="Lg-${data.timestamp_id}" x1="0%" x2="0%" y1="100%" y2="0%">
                                        <stop offset="0%"
                                            stop-color="${data.gridPercentage > 0 ? data.gridColour : (data.batteryPercentage > 0 ? data.batteryColour : data.solarColour)}"/>
                                        <stop offset="${data.gridPercentage}%"
                                            stop-color="${data.gridPercentage > 0 ? data.gridColour : (data.batteryPercentage > 0 ? data.batteryColour : data.solarColour)}"/>
                                        <stop offset="${data.gridPercentage}%"
                                            stop-color="${data.batteryPercentage > 0 ? data.batteryColour : data.solarColour}"/>
                                        <stop offset="${(data.gridPercentage + data.batteryPercentage)}%"
                                            stop-color="${data.batteryPercentage > 0 ? data.batteryColour : data.solarColour}"/>
                                        <stop offset="${(data.gridPercentage + data.batteryPercentage)}%"
                                            stop-color="${data.solarColour}"/>
                                        <stop offset="100%"
                                            stop-color="${data.solarColour}"/>
                                    </linearGradient>
                                </defs>
                                <path display="${[4, 5, 6].includes(data.additionalLoad) && !data.showAux ? '' : 'none'}"
                                    fill="${config.load.dynamic_colour ? `url(#Lg-${data.timestamp_id})` : data.loadColour}"
                                    d="${data.essIcon}"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" id="essen_default" x="373.5"
                                y="${data.essIconSize === 1 ? "82.5" : "78.5"}" width="77"
                                height="77" viewBox="0 0 24 24">
                                <defs>
                                    <linearGradient id="Lg-${data.timestamp_id}" x1="0%" x2="0%" y1="100%" y2="0%">
                                        <stop offset="0%"
                                            stop-color="${data.gridPercentage > 0 ? data.gridColour : (data.batteryPercentage > 0 ? data.batteryColour : data.solarColour)}"/>
                                        <stop offset="${data.gridPercentage}%"
                                            stop-color="${data.gridPercentage > 0 ? data.gridColour : (data.batteryPercentage > 0 ? data.batteryColour : data.solarColour)}"/>
                                        <stop offset="${data.gridPercentage}%"
                                            stop-color="${data.batteryPercentage > 0 ? data.batteryColour : data.solarColour}"/>
                                        <stop offset="${(data.gridPercentage + data.batteryPercentage)}%"
                                            stop-color="${data.batteryPercentage > 0 ? data.batteryColour : data.solarColour}"/>
                                        <stop offset="${(data.gridPercentage + data.batteryPercentage)}%"
                                            stop-color="${data.solarColour}"/>
                                        <stop offset="100%"
                                            stop-color="${data.solarColour}"/>
                                    </linearGradient>
                                </defs>
                                <path display="${[1, 2, 3, 4, 5, 6].includes(data.additionalLoad) ? 'none' : ''}"
                                    fill="${config.load.dynamic_colour ? `url(#Lg-${data.timestamp_id})` : data.loadColour}"
                                    d="${data.essIcon}"/>
                            </svg>
                    </a>
            }
            <!-- Render Static Icons e.g. Boiler, Aircon, Oven and Pump etc -->
            ${getFullLayoutIconConfigs(data).map(iconConfig => renderStaticLoadIcon(data, iconConfig))}

            <g display="${[2, 4, 5, 6].includes(data.additionalLoad) ? '' : 'none'}">
                ${renderLoadIcon(config.load.load1_switch, data.iconEssentialLoad1, 'essload1-small-icon', data.showAux ? 371 : 384, data.showAux ? 123 : 5)}
            </g>
            <g display="${[2, 4, 5, 6].includes(data.additionalLoad) ? '' : 'none'}">
                ${renderLoadIcon(config.load.load2_switch, data.iconEssentialLoad2, 'essload2-small-icon', data.showAux ? 429 : 421, data.showAux ? 123 : 5)}              
            </g>
            <g display="${[4, 5, 6].includes(data.additionalLoad) ? '' : 'none'}">
                ${renderLoadIcon(config.load.load3_switch, data.iconEssentialLoad3, 'essload3-small-icon', 371, 123)}
            </g>
            <g display="${[4, 5, 6].includes(data.additionalLoad) ? '' : 'none'}">
                ${renderLoadIcon(config.load.load4_switch, data.iconEssentialLoad4, 'essload4-small-icon', 429, 123)}
            </g>
            <g display="${data.additionalLoad === 1 ? '' : 'none'}">
                ${renderLoadIcon(config.load.load1_switch, data.iconEssentialLoad1, 'essload1-icon-full', 336, data.showAux ? 140 : 27)}
            </g>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_load_energy_84)}>
                <text id="daily_load_value_aux" x="${data.additionalAuxLoad === 2 ? '238' : '238'}" y="80"
                    class="st10 left-align"
                    display="${!data.loadShowDaily || !data.showAux || !data.stateDayLoadEnergy.isValid() ? 'none' : ''}"
                    fill="${data.loadColour}">
                    ${data.stateDayLoadEnergy.toPowerString(true, data.decimalPlacesEnergy)}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_load_energy_84)}>
                <text id="daily_load_value" x="${data.additionalLoad === 0 ? '377' : '238'}"
                    y="${data.additionalLoad === 0 ? '57' : '80'}" class="st10 left-align"
                    display="${!data.loadShowDaily || data.showAux || !data.stateDayLoadEnergy.isValid() ? 'none' : ''}"
                    fill="${data.loadColour}">
                    ${data.stateDayLoadEnergy.toPowerString(true, data.decimalPlacesEnergy)}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load1_extra)}>
                <text id="ess_load1_value_extra" x="430" y="23"
                    display="${config.entities?.essential_load1_extra && data.additionalLoad === 1 && !data.showAux && data.stateEssentialLoad1Extra.isValid() ? '' : 'none'}"
                    class="st3 right-align" fill="${data.dynamicColourEssentialLoad1}">
                    ${data.stateEssentialLoad1Extra.toNum(1)}
                    ${data.stateEssentialLoad1Extra?.getUOM()}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load1_extra)}>
                <text id="ess_load1_value_extra" x="360" y="136"
                    display="${config.entities?.essential_load1_extra && data.additionalLoad === 1 && data.showAux && data.stateEssentialLoad1Extra.isValid() ? '' : 'none'}"
                    class="st3 st8" fill="${data.dynamicColourEssentialLoad1}">
                    ${data.stateEssentialLoad1Extra.toNum(1)}
                    ${data.stateEssentialLoad1Extra?.getUOM()}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load1_extra)}>
                <text id="ess_load2_value_extra" x="405" y="70"
                    display="${config.entities?.essential_load1_extra && [2, 4, 5, 6].includes(data.additionalLoad) && !data.showAux && data.stateEssentialLoad1Extra.isValid() ? '' : 'none'}"
                    class="st3 right-align" fill="${data.dynamicColourEssentialLoad1}">
                    ${data.stateEssentialLoad1Extra.toNum(1)}
                    ${data.stateEssentialLoad1Extra?.getUOM()}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load2_extra)}>
                <text id="ess_load2_value_extra" x="418" y="70"
                    display="${config.entities?.essential_load2_extra && [2, 4, 5, 6].includes(data.additionalLoad) && !data.showAux && data.stateEssentialLoad2Extra.isValid() ? '' : 'none'}"
                    class="st3 left-align" fill="${data.dynamicColourEssentialLoad2}">
                    ${data.stateEssentialLoad2Extra.toNum(1)}
                    ${data.stateEssentialLoad2Extra?.getUOM()}
                </text>
            </a>
            ${config.entities?.essential_power && config.entities.essential_power !== 'none'
                ? svg`
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_power)}>
                        <text id="ess_power" x="270" y="119" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                                fill="${data.loadColour}">
                            ${config.load.auto_scale ? `${Utils.convertValue(data.essentialPower, data.decimalPlaces) || 0}` : `${data.essentialPower || 0} ${UnitOfPower.WATT}`}
                        </text>
                    </a>`
                : svg`
                    <text id="ess_power" x="270" y="119" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                            fill="${data.loadColour}">
                        ${config.load.auto_scale ? `${Utils.convertValue(data.essentialPower, data.decimalPlaces) || 0}` : `${data.essentialPower || 0} ${UnitOfPower.WATT}`}
                    </text>`
            }
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load1)}>
                <text id="ess_load1_value" x="409" y="${!data.showAux ? '47' : '158'}" 
                    display="${data.additionalLoad === 1 && data.stateEssentialLoad1.isValid() ? '' : 'none'}" 
                    class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                    fill="${data.dynamicColourEssentialLoad1}">
                    ${data.stateEssentialLoad1.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load1)}>
                <text id="ess_load2_value" x="${!data.showAux ? '394' : '391'}" y="${!data.showAux ? '41' : '160'}" 
                    display="${[2, 4, 5, 6].includes(data.additionalLoad) && data.stateEssentialLoad2.isValid() ? '' : 'none'}" class="st3" 
                    fill="${data.dynamicColourEssentialLoad1}">
                    ${data.stateEssentialLoad1.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load2)}>
                <text id="ess_load2_value" x="${!data.showAux ? '430' : '427'}" y="${!data.showAux ? '41' : '160'}" 
                    display="${[2, 4, 5, 6].includes(data.additionalLoad) && data.stateEssentialLoad2.isValid() ? '' : 'none'}" class="st3" 
                    fill="${data.dynamicColourEssentialLoad2}">
                    ${data.stateEssentialLoad2.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load3)}>
                <text id="ess_load4_value" x="392" y="160" 
                    display="${[4, 5, 6].includes(data.additionalLoad) && data.stateEssentialLoad3.isValid() ? '' : 'none'}" class="st3" 
                    fill="${data.dynamicColourEssentialLoad3}">
                    ${data.stateEssentialLoad3.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load4)}>
                <text id="ess_load4_value" x="430" y="160" 
                    display="${[4, 5, 6].includes(data.additionalLoad) && data.stateEssentialLoad4.isValid() ? '' : 'none'}" class="st3" 
                    fill="${data.dynamicColourEssentialLoad4}">
                    ${data.stateEssentialLoad4.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                </text>
            </a>
        </svg>
    `;
}