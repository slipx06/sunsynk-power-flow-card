// load-elements.ts
import {svg, html} from 'lit';
import {localize} from '../../../localize/localize';
import {Utils} from '../../../helpers/utils';
import {DataDto, sunsynkPowerFlowCardConfig} from '../../../types';
import {UnitOfPower} from '../../../const';
import {renderLoadIcon} from '../../shared/load/render-load-icon';
import {renderStaticLoadIcon} from '../../shared/load/render-static-load-icon';
import {getCompactLayoutIconConfigs} from '../../shared/load/icon-configs';


export const renderLoadElements = (data: DataDto, config: sunsynkPowerFlowCardConfig) => {
    return html`
        <!-- Load Elements -->
        <svg id="Load" style="overflow: visible" x="${config.wide ? '30%' : '0%'}">
            <rect x="304" y="203.5" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                stroke="${data.loadColour}" pointer-events="all"/>                                                      
            <svg id="Esential-Load1" style="overflow: visible">
                <rect id="es-load1" x="406" y="116.5" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                    stroke="${data.dynamicColourEssentialLoad1}" pointer-events="all"
                    display="${[1, 2, 3].includes(data.additionalLoad) ? '' : 'none'}"/>
                <text id="es-load1" x="441" y="108" class="st3"
                    display="${[1, 2, 3].includes(data.additionalLoad) ? '' : 'none'}"
                    fill="${data.dynamicColourEssentialLoad1}">${config.load.load1_name}
                </text>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load1)}>
                    <text id="ess_load1" x="440" y="133" display="${[1, 2, 3].includes(data.additionalLoad) && data.stateEssentialLoad1.isValid() ? '' : 'none'}" 
                        class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                        fill="${data.dynamicColourEssentialLoad1}">
                        ${data.stateEssentialLoad1?.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load1_extra)}>
                    <text id="ess_load1_extra" x="448" y="157"
                        display="${(config.entities?.essential_load1_extra && [1, 2, 3].includes(data.additionalLoad)) && data.stateEssentialLoad1Extra.isValid() ? '' : 'none'}"
                        class="st3 left-align" fill="${data.dynamicColourEssentialLoad1}">
                        ${data.stateEssentialLoad1Extra.toNum(1)}
                        ${data.stateEssentialLoad1Extra.getUOM()}
                    </text>
                </a>
                <g display="${[0, 4, 5, 6].includes(data.additionalLoad) ? 'none' : ''}">
                    ${renderLoadIcon(config.load.load1_switch, data.iconEssentialLoad1, 'essload1-icon', 371, 114)}
                </g>
            </svg>
            <svg id="Esential-Load2" style="overflow: visible">
                <rect id="es-load2" x="406" y="290" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                    stroke="${data.dynamicColourEssentialLoad2}" pointer-events="all"
                    display="${data.additionalLoad === 2 ? '' : 'none'}"/>
                <text id="es-load2" x="441" y="330.5" class="st3"
                    display="${data.additionalLoad === 2 ? '' : 'none'}" fill="${data.dynamicColourEssentialLoad2}">
                    ${config.load.load2_name}
                </text>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load2)}>
                    <text id="ess_load2" x="440" y="306.5" display="${data.additionalLoad === 2 && data.stateEssentialLoad2.isValid() ? '' : 'none'}" 
                        class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                        fill="${data.dynamicColourEssentialLoad2}">
                        ${data.stateEssentialLoad2?.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load2_extra)}>
                    <text id="ess_load2_extra" x="448" y="282"
                        display="${(config.entities?.essential_load2_extra && data.additionalLoad === 2) && data.stateEssentialLoad2Extra.isValid() ? '' : 'none'}"
                        class="st3 left-align" fill="${data.dynamicColourEssentialLoad2}">
                        ${data.stateEssentialLoad2Extra.toNum(1)}
                        ${data.stateEssentialLoad2Extra.getUOM()}
                    </text>
                </a>
                <g display="${data.additionalLoad === 2 ? '' : 'none'}">
                    ${renderLoadIcon(config.load.load2_switch, data.iconEssentialLoad2, 'essload2-icon', 371, 288)}
                </g>
            </svg>
            <svg id="Esential-Load3" style="overflow: visible">
                <rect id="es-load2" x="405" y="290" width="35" height="20" rx="4.5" ry="4.5" fill="none"
                    stroke="${data.dynamicColourEssentialLoad2}" pointer-events="all"
                    display="${data.additionalLoad === 3 ? '' : 'none'}"/>
                <rect id="es-load3" x="441" y="290" width="35" height="20" rx="4.5" ry="4.5" fill="none"
                    stroke="${data.dynamicColourEssentialLoad3}" pointer-events="all"
                    display="${data.additionalLoad === 3 ? '' : 'none'}"/>
                <text id="es-load2" x="433" y="320" class="st3 st8 right-align"
                    display="${data.additionalLoad === 3 ? '' : 'none'}" fill="${data.dynamicColourEssentialLoad2}">
                    ${config.load.load2_name}
                </text>
                <text id="es-load3" x="448" y="320" class="st3 st8 left-align"
                    display="${data.additionalLoad === 3 ? '' : 'none'}" fill="${data.dynamicColourEssentialLoad3}">
                    ${config.load.load3_name}
                </text>
                <g display="${data.additionalLoad === 3 ? '' : 'none'}">
                    ${renderLoadIcon(config.load.load2_switch, data.iconEssentialLoad2, 'essload2-small-icon', 412, 264)}
                </g>
                <g display="${data.additionalLoad === 3 ? '' : 'none'}">
                    ${renderLoadIcon(config.load.load3_switch, data.iconEssentialLoad3, 'essload3-small-icon', 449, 264)}
                </g>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load2_extra)}>
                    <text id="ess_load2_extra" x="435" y="332"
                        display="${(config.entities?.essential_load2_extra && data.additionalLoad === 3) && data.stateEssentialLoad2Extra.isValid() ? '' : 'none'}"
                        class="st3 right-align" fill="${data.dynamicColourEssentialLoad2}">
                        ${data.stateEssentialLoad2Extra.toNum(1)}
                        ${data.stateEssentialLoad2Extra.getUOM()}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load3_extra)}>
                    <text id="ess_load3_extra" x="448" y="332"
                        display="${(config.entities?.essential_load3_extra && data.additionalLoad === 3) && data.stateEssentialLoad3Extra.isValid() ? '' : 'none'}"
                        class="st3 left-align" fill="${data.dynamicColourEssentialLoad3}">
                        ${data.stateEssentialLoad3Extra.toNum(1)}
                        ${data.stateEssentialLoad3Extra.getUOM()}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load2)}>
                <text id="ess_load4" x="423" y="301" display="${data.additionalLoad === 3 && data.stateEssentialLoad2.isValid() ? '' : 'none'}" 
                    class="st3" 
                    fill="${data.dynamicColourEssentialLoad2}">
                    ${data.stateEssentialLoad2?.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load3)}>
                    <text id="ess_load4" x="459" y="301" display="${data.additionalLoad === 3 && data.stateEssentialLoad3.isValid() ? '' : 'none'}" 
                        class="st3" 
                        fill="${data.dynamicColourEssentialLoad3}">
                        ${data.stateEssentialLoad3?.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                    </text>
                </a>
            </svg>
            <svg id="Esential-Load4" style="overflow: visible">
                <rect id="es-load3" x="405" y="290" width="35" height="20" rx="4.5" ry="4.5" fill="none"
                    stroke="${data.dynamicColourEssentialLoad3}" pointer-events="all"
                    display="${data.additionalLoad >= 4 ? '' : 'none'}"/>
                <rect id="es-load1" x="405" y="107" width="35" height="20" rx="4.5" ry="4.5" fill="none"
                    stroke="${data.dynamicColourEssentialLoad1}" pointer-events="all"
                    display="${data.additionalLoad >= 4 ? '' : 'none'}"/>
                <rect id="es-load2" x="441" y="107" width="35" height="20" rx="4.5" ry="4.5" fill="none"
                    stroke="${data.dynamicColourEssentialLoad2}" pointer-events="all"
                    display="${data.additionalLoad >= 4 ? '' : 'none'}"/>
                <rect id="es-load4" x="441" y="290" width="35" height="20" rx="4.5" ry="4.5" fill="none"
                    stroke="${data.dynamicColourEssentialLoad4}" pointer-events="all"
                    display="${data.additionalLoad >= 4 ? '' : 'none'}"/>
                <text id="es-load1" x="435" y="136" class="st3 st8 right-align"
                    display="${data.additionalLoad >= 4 ? '' : 'none'}" fill="${data.dynamicColourEssentialLoad1}">
                    ${config.load.load1_name}
                </text>
                <text id="es-load2" x="448" y="136" class="st3 st8 left-align"
                    display="${data.additionalLoad >= 4 ? '' : 'none'}" fill="${data.dynamicColourEssentialLoad2}">
                    ${config.load.load2_name}
                </text>
                <text id="es-load3" x="435" y="320" class="st3 st8 right-align"
                    display="${data.additionalLoad >= 4 ? '' : 'none'}" fill="${data.dynamicColourEssentialLoad3}">
                    ${config.load.load3_name}
                </text>
                <text id="es-load4" x="448" y="320" class="st3 st8 left-align"
                    display="${data.additionalLoad >= 4 ? '' : 'none'}" fill="${data.dynamicColourEssentialLoad4}">
                    ${config.load.load4_name}
                </text>
                <g display="${data.additionalLoad >= 4 ? '' : 'none'}">
                    ${renderLoadIcon(config.load.load1_switch, data.iconEssentialLoad1, 'essload1-small-icon', 412, 81)}
                </g>
                <g display="${data.additionalLoad >= 4 ? '' : 'none'}">
                    ${renderLoadIcon(config.load.load2_switch, data.iconEssentialLoad2, 'essload2-small-icon', 449, 81)}
                </g>
                <g display="${data.additionalLoad >= 4 ? '' : 'none'}">
                    ${renderLoadIcon(config.load.load3_switch, data.iconEssentialLoad3, 'essload3-small-icon', 412, 264)}
                </g>
                <g display="${data.additionalLoad >= 4 ? '' : 'none'}">
                    ${renderLoadIcon(config.load.load4_switch, data.iconEssentialLoad4, 'essload4-small-icon', 449, 264)}
                </g>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load1_extra)}>
                    <text id="ess_load1_extra" x="435" y="147"
                    display="${(config.entities?.essential_load1_extra && data.additionalLoad >= 4) && data.stateEssentialLoad1Extra.isValid() ? '' : 'none'}"
                        class="st3 right-align" fill="${data.dynamicColourEssentialLoad1}">
                        ${data.stateEssentialLoad1Extra.toNum(1)}
                        ${data.stateEssentialLoad1Extra.getUOM()}
                    </text>
                </a>                    
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load2_extra)}>
                    <text id="ess_load2_extra" x="448" y="147"
                        display="${(config.entities?.essential_load2_extra && data.additionalLoad >= 4) && data.stateEssentialLoad2Extra.isValid() ? '' : 'none'}"
                        class="st3 left-align" fill="${data.dynamicColourEssentialLoad2}">
                        ${data.stateEssentialLoad2Extra.toNum(1)}
                        ${data.stateEssentialLoad2Extra.getUOM()}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load3_extra)}>
                    <text id="ess_load3_extra" x="435" y="332"
                        display="${(config.entities?.essential_load3_extra && data.additionalLoad >= 4) && data.stateEssentialLoad3Extra.isValid() ? '' : 'none'}"
                        class="st3 right-align" fill="${data.dynamicColourEssentialLoad3}">
                        ${data.stateEssentialLoad3Extra.toNum(1)}
                        ${data.stateEssentialLoad3Extra.getUOM()}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load4_extra)}>
                    <text id="ess_load4_extra" x="448" y="332"
                        display="${(config.entities?.essential_load4_extra && data.additionalLoad >= 4) && data.stateEssentialLoad4Extra.isValid() ? '' : 'none'}"
                        class="st3 left-align" fill="${data.dynamicColourEssentialLoad4}">
                        ${data.stateEssentialLoad4Extra.toNum(1)}
                        ${data.stateEssentialLoad4Extra.getUOM()}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load1)}>
                    <text id="ess_load4" x="423" y="118" display="${data.additionalLoad >= 4 && data.stateEssentialLoad1.isValid() ? '' : 'none'}" 
                        class="st3" 
                        fill="${data.dynamicColourEssentialLoad1}">
                        ${data.stateEssentialLoad1?.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load2)}>
                    <text id="ess_load4" x="459" y="118" display="${data.additionalLoad >= 4 && data.stateEssentialLoad2.isValid() ? '' : 'none'}" 
                        class="st3" 
                        fill="${data.dynamicColourEssentialLoad2}">
                        ${data.stateEssentialLoad2?.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load3)}>
                    <text id="ess_load4" x="423" y="301" display="${data.additionalLoad >= 4 && data.stateEssentialLoad3.isValid() ? '' : 'none'}" 
                        class="st3" 
                        fill="${data.dynamicColourEssentialLoad3}">
                        ${data.stateEssentialLoad3?.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load4)}>
                    <text id="ess_load4" x="459" y="301" display="${data.additionalLoad >= 4 && data.stateEssentialLoad4.isValid() ? '' : 'none'}" 
                        class="st3" 
                        fill="${data.dynamicColourEssentialLoad4}">
                        ${data.stateEssentialLoad4?.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                    </text>
                </a>
            </svg>
            <svg id="Esential-Load5" 
                    viewBox="${config.wide && [5, 6].includes(data.additionalLoad) ? "0 0 720 405" : "0 0 0 0"}" 
                    style="overflow: visible" x="-5%">
                <rect id="es-load5" x="405" y="107" width="35" height="20" rx="4.5" ry="4.5" fill="none"
                    stroke="${data.dynamicColourEssentialLoad5}" pointer-events="all"
                    display="${[5, 6].includes(data.additionalLoad) ? '' : 'none'}"/>
                <text id="es-load5" x="435" y="136" class="st3 st8 right-align"
                    display="${[5, 6].includes(data.additionalLoad) ? '' : 'none'}" fill="${data.dynamicColourEssentialLoad5}">
                    ${config.load.load5_name}
                </text>
                <g display="${[5, 6].includes(data.additionalLoad) ? '' : 'none'}">
                    ${renderLoadIcon(config.load.load5_switch, data.iconEssentialLoad5, 'essload5-small-icon', 412, 81)}
                </g>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load5_extra)}>
                    <text id="ess_load5_extra" x="435" y="147"
                    display="${(config.entities?.essential_load5_extra && [5, 6].includes(data.additionalLoad)) && data.stateEssentialLoad5Extra.isValid() ? '' : 'none'}"
                        class="st3 right-align" fill="${data.dynamicColourEssentialLoad1}">
                        ${data.stateEssentialLoad5Extra.toNum(1)}
                        ${data.stateEssentialLoad5Extra.getUOM()}
                    </text>
                </a>                    
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load5)}>
                    <text id="ess_load5" x="423" y="118" display="${[5, 6].includes(data.additionalLoad) && data.stateEssentialLoad5.isValid() ? '' : 'none'}" 
                        class="st3" 
                        fill="${data.dynamicColourEssentialLoad5}">
                        ${data.stateEssentialLoad5?.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                    </text>
                </a>
            </svg>
            <svg id="Esential-Load6" viewBox="${config.wide && data.additionalLoad === 6  ? '0 0 720 405' : '0 0 0 0'}" style="overflow: visible" x="-5%">
                <rect id="es-load6" x="405" y="290" width="35" height="20" rx="4.5" ry="4.5" fill="none"
                    stroke="${data.dynamicColourEssentialLoad6}" pointer-events="all"
                    display="${data.additionalLoad === 6 ? '' : 'none'}"/>
                <text id="es-load6" x="435" y="320" class="st3 st8 right-align"
                    display="${data.additionalLoad === 6 ? '' : 'none'}" fill="${data.dynamicColourEssentialLoad6}">
                    ${config.load.load6_name}
                </text>
                <g display="${data.additionalLoad === 6 ? '' : 'none'}">
                    ${renderLoadIcon(config.load.load6_switch, data.iconEssentialLoad6, 'essload6-small-icon', 412, 264)}
                </g>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load6_extra)}>
                    <text id="ess_load6_extra" x="435" y="332"
                        display="${(config.entities?.essential_load6_extra && data.additionalLoad === 6) && data.stateEssentialLoad6Extra.isValid() ? '' : 'none'}"
                        class="st3 right-align" fill="${data.dynamicColourEssentialLoad6}">
                        ${data.stateEssentialLoad6Extra.toNum(1)}
                        ${data.stateEssentialLoad6Extra.getUOM()}
                    </text>
                </a>                    
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load6)}>
                    <text id="ess_load6" x="423" y="301" display="${data.additionalLoad === 6 && data.stateEssentialLoad6.isValid() ? '' : 'none'}" 
                        class="st3" 
                        fill="${data.dynamicColourEssentialLoad6}">
                        ${data.stateEssentialLoad6?.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                    </text>
                </a>
            </svg>      
            <text id="daily_load" x="${[2, 3, 4, 5, 6].includes(data.additionalLoad) ? '365' : '412'}"
                y="${[2, 3, 4 , 5, 6].includes(data.additionalLoad) ? '189' : '282.1'}"
                class="st3 left-align"
                fill="${!data.loadShowDaily ? 'transparent' : `${data.loadColour}`}">
                ${config.load.label_daily_load || localize('common.daily_load')}
            </text>
            <text id="load-power-L1" x="${config.wide ? '304' : '375'}" y="241"
                display="${config.inverter.three_phase && config.entities?.load_power_L1 ? '' : 'none'}"
                class="st3 left-align" fill="${data.loadColour}">
                ${config.load.auto_scale ? `${Utils.convertValue(data.loadPowerL1, data.decimalPlaces) || 0}` : `${data.loadPowerL1 || 0} ${UnitOfPower.WATT}`}
            </text>
            <text id="load-power-L2" x="${config.wide ? '304' : '375'}" y="254"
                display="${config.inverter.three_phase && config.entities?.load_power_L2 ? '' : 'none'}"
                class="st3 left-align" fill="${data.loadColour}">
                ${config.load.auto_scale ? `${Utils.convertValue(data.loadPowerL2, data.decimalPlaces) || 0}` : `${data.loadPowerL2 || 0} ${UnitOfPower.WATT}`}
            </text>
            <text id="load-power-L3" x="${config.wide ? '304' : '375'}" y="267"
                display="${config.inverter.three_phase && config.entities?.load_power_L3 ? '' : 'none'}"
                class="st3 left-align" fill="${data.loadColour}">
                ${config.load.auto_scale ? `${Utils.convertValue(data.loadPowerL3, data.decimalPlaces) || 0}` : `${data.loadPowerL3 || 0} ${UnitOfPower.WATT}`}
            </text>
            <svg id="load-flow">
                <path id="es-line" d="${config.wide ? 'M 304 218.5 L 117 218.5': 'M 304 218.5 L 264.7 218.5'}" fill="none" stroke="${config.load.dynamic_colour ? data.flowColour : data.loadColour}"
                    stroke-width="${data.loadLineWidth}" stroke-miterlimit="10" pointer-events="stroke"/>
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
            </svg>
            <svg id="load-flow1">
                <path id="es-line1" d="M 374 218.5 L 402.38 218.5" fill="none" stroke="${config.load.dynamic_colour ? data.flowColour : data.loadColour}"
                    stroke-width="${data.loadLineWidth}" stroke-miterlimit="10" pointer-events="stroke"/>
                <circle id="es-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.loadLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.essentialPower === 0 || data.essentialPower < 0 ? 'transparent' : `${config.load.dynamic_colour ? data.flowColour : data.loadColour}`}">
                    <animateMotion dur="${data.durationCur['load']}s" repeatCount="indefinite"
                                keyPoints=${config.load.invert_flow === true ? Utils.invertKeyPoints("0;1") : "0;1"}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#es-line1"/>
                    </animateMotion>
                </circle>
                <circle id="es-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.loadLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.essentialPower === 0 || data.essentialPower > 0 ? 'transparent' : `${config.load.dynamic_colour ? data.flowColour : data.loadColour}`}">
                    <animateMotion dur="${data.durationCur['load']}s" repeatCount="indefinite"
                                keyPoints=${config.load.invert_flow === true ? Utils.invertKeyPoints("1;0") : "1;0"}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#es-line1"/>
                    </animateMotion>
                </circle>
            </svg>
            <path id="es-load1" d="M 441 180 L 441 147" class="${data.additionalLoad === 1 ? '' : 'st12'}"
                fill="none" stroke="${data.load1Colour}" stroke-width="1" stroke-miterlimit="10"
                pointer-events="stroke"/>
            <path id="es-load1" d="M 441 180 L 441 147"
                class="${[2, 3, 4, 5, 6].includes(data.additionalLoad) ? '' : 'st12'}" fill="none"
                stroke="${data.load1Colour}" stroke-width="1" stroke-miterlimit="10"
                pointer-events="stroke"/>
            <path id="es-load2" d="M 441 290 L 441 257"
                class="${[2, 3, 4, 5, 6].includes(data.additionalLoad) ? '' : 'st12'}" fill="none"
                stroke="${data.load2Colour}" stroke-width="1" stroke-miterlimit="10"
                pointer-events="stroke"/>
                    <a href="#" @click=${config.load?.navigate ? (e) => Utils.handleNavigation(e, config.load.navigate) : null}>
                        <svg id="essen" x="${data.essIconSize === 1 ? "405" : "402"}"
                            y="${data.essIconSize === 1 ? "186" : "177.5"}" width="${data.essIconSize === 1 ? "75" : "79"}"
                            height="${data.essIconSize === 1 ? "75" : "79"}"
                            viewBox="0 0 24 24">
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
                            <path fill="${config.load.dynamic_colour ? `url(#Lg-${data.timestamp_id})` : data.loadColour}"
                                d="${data.essIcon}"/>
                        </svg>
                    </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_load_energy_84)}>
                <text id="daily_load_value"
                    x="${[2, 3, 4, 5, 6].includes(data.additionalLoad) ? '365' : '412'}"
                    y="${[2, 3, 4, 5, 6].includes(data.additionalLoad) ? '175' : '267.9'}"
                    class="st10 left-align" display="${!data.loadShowDaily || !data.stateDayLoadEnergy.isValid() ? 'none' : ''}"
                    fill="${data.loadColour}">
                    ${data.stateDayLoadEnergy?.toPowerString(true, data.decimalPlacesEnergy)}
                </text>
            </a>
            ${config.entities?.essential_power && config.entities.essential_power !== 'none'
                ? svg`
                        <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_power)}>
                            <text id="ess_power" x="340.1" y="219.2" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                                    fill="${data.loadColour}">
                                ${config.load.auto_scale ? `${Utils.convertValue(data.essentialPower, data.decimalPlaces) || 0}` : `${data.essentialPower || 0} ${UnitOfPower.WATT}`}
                            </text>
                        </a>`
                : svg`
                        <text id="ess_power" x="340.1" y="219.2" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                                fill="${data.loadColour}">
                            ${config.load.auto_scale ? `${Utils.convertValue(data.essentialPower, data.decimalPlaces) || 0}` : `${data.essentialPower || 0} ${UnitOfPower.WATT}`}
                        </text>`
            }
            <!-- Render Static Icons e.g. Boiler, Aircon, Oven and Pump etc -->
            ${getCompactLayoutIconConfigs(data).map(iconConfig => renderStaticLoadIcon(data, iconConfig))}
        </svg>
    `;
}