// inverter-elements.ts
import {svg, html} from 'lit';
import {localize} from '../../../localize/localize';
import {Utils} from '../../../helpers/utils';
import {AutarkyType, DataDto, sunsynkPowerFlowCardConfig} from '../../../types';
import {icons} from '../../../helpers/icons';
import {UnitOfElectricalCurrent, UnitOfPower} from '../../../const';


export const renderInverterElements = (data: DataDto, inverterImg: string, config: sunsynkPowerFlowCardConfig) => {
    return html`
        <!-- Inverter Elements -->
        <svg id="Inverter" style="overflow: visible" x="${config.wide ? '20%' : '3%'}" y="2.5%">
            <rect x="145.15" y="162" width="70"
                height="${config.inverter.three_phase ? 60 : 50}" rx="7.5" ry="7.5"
                fill="none" stroke="${data.inverterColour}" pointer-events="all"/>
            <text x="167" y="306" class="st3 left-align" fill="${data.inverterColour}">${data.inverterStateMsg}
            </text>
            <text id="autarkye_value" x="212" y="283"
                display="${data.enableAutarky === AutarkyType.No ? 'none' : ''}"
                class="${data.enableAutarky === AutarkyType.Energy ? 'st4 st8 left-align' : 'st12'}"
                fill="${data.inverterColour}">${data.autarkyEnergy}%
            </text>
            <text id="ratioe_value" x="256" y="283"
                display="${data.enableAutarky === AutarkyType.No ? 'none' : ''}"
                class="${data.enableAutarky === AutarkyType.Energy ? 'st4 st8 left-align' : 'st12'}"
                fill="${data.inverterColour}">${data.ratioEnergy}%
            </text>
            <text id="autarkyp_value" x="212" y="283"
                display="${data.enableAutarky === AutarkyType.No ? 'none' : ''}"
                class="${data.enableAutarky === AutarkyType.Power ? 'st4 st8 left-align' : 'st12'}"
                fill="${data.inverterColour}">${data.autarkyPower}%
            </text>
            <text id="ratiop_value" x="256" y="283"
                display="${data.enableAutarky === AutarkyType.No ? 'none' : ''}"
                class="${data.enableAutarky === AutarkyType.Power ? 'st4 st8 left-align' : 'st12'}"
                fill="${data.inverterColour}">${data.ratioPower}%
            </text>
            <text id="autarky" x="212" y="295" display="${data.enableAutarky === AutarkyType.No ? 'none' : ''}"
                class="st3 left-align" fill="${data.inverterColour}">${localize('common.autarky')}
            </text>
            <text id="ratio" x="256" y="295" display="${data.enableAutarky === AutarkyType.No ? 'none' : ''}"
                class="st3 left-align" fill="${data.inverterColour}">${localize('common.ratio')}
            </text>
            <circle id="standby" cx="160" cy="304" r="3.5" fill="${data.inverterStateColour}"/>
            <path d="${config.inverter.three_phase ? 'M 180 223 L 180 235' : 'M 180 212 L 180 235'}"
                fill="none" stroke="${config.battery.dynamic_colour && config.load.dynamic_colour ? data.flowInvColour : data.inverterColour}" stroke-width="${data.minLineWidth}" stroke-miterlimit="10"
                pointer-events="stroke"/>
            ${config.inverter?.navigate
                ? svg`
                    <a href="#" @click=${(e) => Utils.handleNavigation(e, config.inverter.navigate)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="154.5" y="224.75" width="54"
                            height="79" viewBox="0 0 74 91" preserveAspectRatio="xMidYMid meet"
                            opacity="${!data.genericInverterImage ? 0 : 1}">
                            <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)"
                            fill="${data.inverterColour}" stroke="none">
                                <path d="${icons.inverter}"/>
                            </g>
                        </svg>
                    </a>`
                : svg`
                    <svg xmlns="http://www.w3.org/2000/svg" x="154.5" y="224.75" width="54"
                        height="79" viewBox="0 0 74 91" preserveAspectRatio="xMidYMid meet"
                        opacity="${!data.genericInverterImage ? 0 : 1}">
                        <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)"
                        fill="${data.inverterColour}" stroke="none">
                            <path d="${icons.inverter}"/>
                        </g>
                    </svg>`
            }
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.use_timer_248)}>
                <svg xmlns="http://www.w3.org/2000/svg" id="timer" x="210"
                    y="${data.enableAutarky != AutarkyType.No ? "232" : "249"}" width="18" height="18"
                    viewBox="0 0 24 24">
                    <path display="${data.stateUseTimer.state == 'on' && data.enableTimer !== 'no' ? '' : 'none'}"
                        fill="${data.inverterColour}"
                        d="${icons.timerOn}"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" id="timer_off" x="210"
                    y="${data.enableAutarky != AutarkyType.No ? "232" : "249"}" width="18" height="18"
                    viewBox="0 0 24 24">
                    <path display="${data.stateUseTimer.state == 'off' && data.enableTimer !== 'no' ? '' : 'none'}"
                        fill="${data.inverterColour}"
                        d="${icons.timerOff}"/>
                </svg>
                <text id="timer_text_on" x="228.5" y="${data.enableAutarky != AutarkyType.No ? "243" : "260"}"
                    class="st3 left-align"
                    display="${data.stateUseTimer.state == 'on' && data.enableTimer !== 'no' ? '' : 'none'}"
                    fill="${data.inverterColour}">${localize('common.timer_on')}
                </text>
                <text id="timer_text_off" x="228.5" y="${data.enableAutarky != AutarkyType.No ? "243" : "260"}"
                    class="st3 left-align"
                    display="${data.stateUseTimer.state == 'off' && data.enableTimer !== 'no' ? '' : 'none'}"
                    fill="${data.inverterColour}">${localize('common.timer_off')}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.priority_load_243)}>
                <svg xmlns="http://www.w3.org/2000/svg" id="pbat" x="210"
                    y="${data.enableAutarky != 'no' ? "251" : "268"}" width="18" height="18"
                    viewBox="0 0 24 24">
                    <path display="${data.priorityLoad === 'off' && (data.priorityLoad !== 'no' || !data.priorityLoad) ? '' : 'none'}"
                        fill="${data.inverterColour}"
                        d="${icons.priorityLoadOff}"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" id="pload" x="210"
                    y="${data.enableAutarky != 'no' ? "251" : "268"}" width="18" height="18"
                    viewBox="0 0 24 24">
                    <path display="${data.priorityLoad === 'on' && (data.priorityLoad !== 'no' || !data.priorityLoad) ? '' : 'none'}"
                        fill="${data.inverterColour}"
                        d="${icons.priorityLoadOn}"/>
                </svg>
                <text id="priority_text_load" x="228.5"
                    y="${data.enableAutarky != AutarkyType.No ? "262" : "280"}"
                    class="st3 left-align"
                    display="${data.priorityLoad === 'on' && (data.priorityLoad !== 'no' || !data.priorityLoad) ? '' : 'none'}"
                    fill="${data.inverterColour}">${localize('common.priority_load')}
                </text>
                <text id="priority_text_batt" x="228.5"
                    y="${data.enableAutarky != AutarkyType.No ? "262" : "280"}"
                    class="st3 left-align"
                    display="${data.priorityLoad === 'off' && (data.priorityLoad !== 'no' || !data.priorityLoad) ? '' : 'none'}"
                    fill="${data.inverterColour}">${localize('common.priority_batt')}
                </text>
            </a>
            ${config.inverter?.navigate
                ? svg`
                    <a href="#" @click=${(e) => Utils.handleNavigation(e, config.inverter.navigate)}>
                        <image x="155" y="224.75" width="53" height="72"
                            class="${!data.genericInverterImage ? '' : 'st12'}"
                            href="${inverterImg}"
                            preserveAspectRatio="none"/>
                    </a>`
                : svg`
                    <image x="155" y="224.75" width="53" height="72"
                        class="${!data.genericInverterImage ? '' : 'st12'}"
                        href="${inverterImg}"
                        preserveAspectRatio="none"/>`
            }
            <a href="#" @click=${(e) => Utils.handlePopup(e, data.inverterProg.entityID)}>
                <svg xmlns="http://www.w3.org/2000/svg" id="prog_grid_on" x="265"
                    y="${data.enableAutarky != AutarkyType.No ? "232" : "249"}" width="20" height="18"
                    viewBox="0 0 24 24">
                    <path display="${data.inverterProg.show === false || data.enableTimer === 'no' ? 'none' : ''}"
                        class="${data.inverterProg.charge === 'none' || (data.stateUseTimer.state != 'off' && data.stateUseTimer.state != 'on') ? 'st12' : ''}"
                        fill="${data.inverterColour}"
                        d="${icons.progGridOn}"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" id="prog_grid_off" x="265"
                    y="${data.enableAutarky != AutarkyType.No ? "232" : "249"}" width="20" height="18"
                    viewBox="0 0 24 24">
                    <path display="${data.inverterProg.show === false || data.enableTimer === 'no' ? 'none' : ''}"
                        class="${data.inverterProg.charge === 'none' && (data.stateUseTimer.state === 'off' || data.stateUseTimer.state === 'on') ? '' : 'st12'}"
                        fill="${data.inverterColour}"
                        d="${icons.progGridOff}"/>
                </svg>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.inverter_current_164)}>
                <text id="inverter_current_164" x="180.5"
                    y="${config.inverter.three_phase ? '188' : '199'}"
                    display="${config.entities.inverter_current_164 === 'none' || !config.entities.inverter_current_164 ? 'none' : ''}"
                    class="${data.largeFont !== true ? 'st14' : 'st4'} st8" fill="${data.inverterColour}">
                    ${data.inverterCurrent} ${UnitOfElectricalCurrent.AMPERE}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.inverter_current_L2)}>
                <text id="inverter_current_L2" x="180.5" y="201"
                    display="${config.inverter.three_phase && config.entities?.inverter_current_L2 ? '' : 'none'}"
                    class="${data.largeFont !== true ? 'st14' : 'st4'} st8" fill="${data.inverterColour}">
                    ${data.inverterCurrentL2} ${UnitOfElectricalCurrent.AMPERE}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.inverter_current_L3)}>
                <text id="inverter_current_L3" x="180.5" y="214"
                    display="${config.inverter.three_phase && config.entities?.inverter_current_L3 ? '' : 'none'}"
                    class="${data.largeFont !== true ? 'st14' : 'st4'} st8" fill="${data.inverterColour}">
                    ${data.inverterCurrentL3} ${UnitOfElectricalCurrent.AMPERE}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.inverter_power_175)}>
                <text id="inverter_power_175" x="180.5"
                    y="${config.inverter.three_phase ? '174' : '178'}"
                    display="${config.entities.inverter_power_175 === 'none' ? 'none' : ''}"
                    class="${data.largeFont !== true ? 'st14' : 'st4'} st8" fill="${data.inverterColour}">
                    ${config.inverter.auto_scale
                            ? `${Utils.convertValue(data.autoScaledInverterPower, data.decimalPlaces) || 0}`
                            : `${data.autoScaledInverterPower} ${UnitOfPower.WATT}`}
                </text>
            </a>   
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.radiator_temp_91)}>
                <text id="ac_temp" x="${[4, 5, 6].includes(config.solar?.mppts) && !config.wide ? '110' : '134'}"
                    y="${[4, 5, 6].includes(config.solar?.mppts) && !config.wide ? '237' : '153'}" class="st3 left-align"
                    fill="${data.inverterColour}"
                    display="${config.entities?.radiator_temp_91 && data.stateRadiatorTemp.isValid() ? '' : 'none'}">AC:
                    ${data.stateRadiatorTemp.toNum(1)}°
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.dc_transformer_temp_90)}>
                <text id="dc_temp" x="110" y="266" class="st3 left-align" fill="${data.inverterColour}"
                    display="${config.entities?.dc_transformer_temp_90 && data.stateDCTransformerTemp.isValid() ? '' : 'none'}">DC:
                    ${data.stateDCTransformerTemp.toNum(1)}°
                </text>
            </a>
        </svg>
    `;
}