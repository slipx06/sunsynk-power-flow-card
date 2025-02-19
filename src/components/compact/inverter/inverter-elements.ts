// inverter-elements.ts
import {svg, html} from 'lit';
import {localize} from '../../../localize/localize';
import {Utils} from '../../../helpers/utils';
import {AutarkyType, DataDto, sunsynkPowerFlowCardConfig} from '../../../types';
import {icons} from '../../../helpers/icons';
import {UnitOfElectricalCurrent, UnitOfElectricPotential} from '../../../const';


export const renderInverterElements = (data: DataDto, inverterImg: string, config: sunsynkPowerFlowCardConfig) => {
    return html`
        <!-- Inverter Elements -->
        <svg id="Inverter" style="overflow: visible" x="${config.wide ? '10%' : '0%'}">
            <text id="autarkye_value" x="127" y="260"
                display="${data.enableAutarky === AutarkyType.No ? 'none' : ''}"
                class="${data.enableAutarky === AutarkyType.Energy ? 'st4 st8 left-align' : 'st12'}"
                fill="${data.inverterColour}">${data.autarkyEnergy}%
            </text>
            <text id="ratioe_value" x="173" y="260"
                display="${data.enableAutarky === AutarkyType.No ? 'none' : ''}"
                class="${data.enableAutarky === AutarkyType.Energy ? 'st4 st8 left-align' : 'st12'}"
                fill="${data.inverterColour}">${data.ratioEnergy}%
            </text>
            <text id="autarkyp_value" x="127" y="260"
                display="${data.enableAutarky === AutarkyType.No ? 'none' : ''}"
                class="${data.enableAutarky === AutarkyType.Power ? 'st4 st8 left-align' : 'st12'}"
                fill="${data.inverterColour}">${data.autarkyPower}%
            </text>
            <text id="ratiop_value" x="173" y="260"
                display="${data.enableAutarky === AutarkyType.No ? 'none' : ''}"
                class="${data.enableAutarky === AutarkyType.Power ? 'st4 st8 left-align' : 'st12'}"
                fill="${data.inverterColour}">${data.ratioPower}%
            </text>
            <text id="autarky" x="127" y="273" display="${data.enableAutarky === AutarkyType.No ? 'none' : ''}"
                class="st3 left-align" fill="${data.inverterColour}">${localize('common.autarky')}
            </text>
            <text id="ratio" x="173" y="273" display="${data.enableAutarky === AutarkyType.No ? 'none' : ''}"
                class="st3 left-align" fill="${data.inverterColour}">${localize('common.ratio')}
            </text>
            <circle id="standby" cx="220" cy="260" r="3.5" fill="${data.inverterStateColour}"/>                             
            ${config.inverter?.navigate
                    ? svg`
                        <a href="#" @click=${(e) => Utils.handleNavigation(e, config.inverter.navigate)}>
                            <svg x="213.5" y="179.5" width="54"
                                height="79" viewBox="0 0 74 91" preserveAspectRatio="xMidYMid meet"
                                opacity="${!data.genericInverterImage ? 0 : 1}">
                                <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)"
                                fill="${data.inverterColour}" stroke="none">
                                    <path d="${icons.inverter}"/>
                                </g>
                            </svg>
                        </a>`
                    : svg`
                        <svg x="213.5" y="179.5" width="54"
                            height="79" viewBox="0 0 74 91" preserveAspectRatio="xMidYMid meet"
                            opacity="${!data.genericInverterImage ? 0 : 1}">
                            <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)"
                            fill="${data.inverterColour}" stroke="none">
                                <path d="${icons.inverter}"/>
                            </g>
                        </svg>`
            }         
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.use_timer_248)}>
                <svg id="timer" x="267.7" y="243.3" width="18"
                    height="18" viewBox="0 0 24 24">
                    <path display="${data.stateUseTimer.state == 'on' && data.enableTimer !== 'no' ? '' : 'none'}"
                        fill="${data.inverterColour}"
                        d="${icons.timerOn}"/>
                </svg>
                <svg id="timer_off" x="267.7" y="243.3" width="18"
                    height="18" viewBox="0 0 24 24">
                    <path display="${data.stateUseTimer.state == 'off' && data.enableTimer !== 'no' ? '' : 'none'}"
                        fill="${data.inverterColour}"
                        d="${icons.timerOff}"/>
                </svg>
                <text id="timer_text_off" x="287" y="254.7" class="st3 left-align"
                    display="${data.stateUseTimer.state == 'off' && data.enableTimer !== 'no' ? '' : 'none'}"
                    fill="${data.inverterColour}">${localize('common.timer_off')}
                </text>
                <text id="timer_text_on" x="287" y="254.7" class="st3 left-align"
                    display="${data.stateUseTimer.state == 'on' && data.enableTimer !== 'no' ? '' : 'none'}"
                    fill="${data.inverterColour}">${localize('common.timer_on')}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.priority_load_243)}>
                <svg id="pbat" x="267.7" y="262.5" width="18"
                    height="18" viewBox="0 0 24 24">
                    <path display="${data.priorityLoad === 'off' && (data.priorityLoad !== 'no' || !data.priorityLoad) ? '' : 'none'}"
                        fill="${data.inverterColour}"
                        d="${icons.priorityLoadOff}"/>
                </svg>
                <svg id="pload" x="267.7" y="262.5" width="18"
                    height="18" viewBox="0 0 24 24">
                    <path display="${data.priorityLoad === 'on' && (data.priorityLoad !== 'no' || !data.priorityLoad) ? '' : 'none'}"
                        fill="${data.inverterColour}"
                        d="${icons.priorityLoadOn}"/>
                </svg>
                <text id="priority_text_batt" x="287" y="273" class="st3 left-align"
                    display="${data.priorityLoad === 'off' && (data.priorityLoad !== 'no' || !data.priorityLoad) ? '' : 'none'}"
                    fill="${data.inverterColour}">${localize('common.priority_batt')}
                </text>
                <text id="priority_text_load" x="287" y="273" class="st3 left-align"
                    display="${data.priorityLoad === 'on' && (data.priorityLoad !== 'no' || !data.priorityLoad) ? '' : 'none'}"
                    fill="${data.inverterColour}">${localize('common.priority_load')}
                </text>
            </a>          
            ${config.inverter?.navigate
                    ? svg`
                        <a href="#" @click=${(e) => Utils.handleNavigation(e, config.inverter.navigate)}>
                            <image x="212" y="180" width="54" height="72"
                            class="${!data.genericInverterImage ? '' : 'st12'}"
                            href="${inverterImg}"
                            preserveAspectRatio="none"/>
                        </a>`
                    : svg`
                        <image x="212" y="180" width="54" height="72"
                        class="${!data.genericInverterImage ? '' : 'st12'}"
                        href="${inverterImg}"
                        preserveAspectRatio="none"/>`
            }
            <a href="#" @click=${(e) => Utils.handlePopup(e, data.inverterProg.entityID)}>
                <svg id="prog_grid_on" x="323" y="243" width="20"
                    height="18" viewBox="0 0 24 24">
                    <path display="${data.inverterProg.show === false || data.enableTimer === 'no' ? 'none' : ''}"
                        class="${data.inverterProg.charge === 'none' || (data.stateUseTimer.state != 'off' && data.stateUseTimer.state != 'on') ? 'st12' : ''}"
                        fill="${data.inverterColour}"
                        d="${icons.progGridOn}"/>
                </svg>
                <svg id="prog_grid_off" x="323" y="243" width="20"
                    height="18" viewBox="0 0 24 24">
                    <path display="${data.inverterProg.show === false || data.enableTimer === 'no' ? 'none' : ''}"
                        class="${data.inverterProg.charge === 'none' && (data.stateUseTimer.state === 'off' || data.stateUseTimer.state === 'on') ? '' : 'st12'}"
                        fill="${data.inverterColour}"
                        d="${icons.progGridOff}"/>
                </svg>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.inverter_voltage_154)}>
                <text id="inverter_voltage_154" x="270.2" y="168.2"
                    display="${config.entities.inverter_voltage_154 === 'none' || !config.entities.inverter_voltage_154 ? 'none' : ''}"
                    class="st3 left-align" fill="${data.inverterColour}">${data.inverterVoltage}
                    ${config.inverter.three_phase && config.entities?.inverter_voltage_L2 ? '| ' + data.inverterVoltageL2 : ''}
                    ${config.inverter.three_phase && config.entities?.inverter_voltage_L3 ? '| ' + data.inverterVoltageL3 : ''}
                    ${UnitOfElectricPotential.VOLT}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.load_frequency_192)}>
                <text id="load_frequency_192" x="270.2" y="192.6"
                    display="${config.entities.load_frequency_192 === 'none' || !config.entities.load_frequency_192 ? 'none' : ''}"
                    class="st3 left-align" fill="${data.inverterColour}">${data.loadFrequency} Hz
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.inverter_current_164)}>
                <text id="inverter_current_164" x="270.2" y="180.4"
                    display="${config.entities.inverter_current_164 === 'none' || !config.entities.inverter_current_164 ? 'none' : ''}"
                    class="st3 left-align" fill="${data.inverterColour}">${data.inverterCurrent}
                    ${config.inverter.three_phase && config.entities?.inverter_current_L2 ? '| ' + data.inverterCurrentL2 : ''}
                    ${config.inverter.three_phase && config.entities?.inverter_current_L3 ? '| ' + data.inverterCurrentL3 : ''}
                    ${UnitOfElectricalCurrent.AMPERE}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.radiator_temp_91)}>
                <text id="ac_temp" x="173" y="168.2" class="st3 left-align" fill="${data.inverterColour}"
                    display="${config.entities?.radiator_temp_91 && data.stateRadiatorTemp.isValid() ? '' : 'none'}">
                    AC:
                    ${data.stateRadiatorTemp.toNum(1)}°
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.dc_transformer_temp_90)}>
                <text id="dc_temp" x="173" y="180.4" class="st3 left-align" fill="${data.inverterColour}"
                    display="${config.entities?.dc_transformer_temp_90 && data.stateDCTransformerTemp.isValid() ? '' : 'none'}">
                    DC:
                    ${data.stateDCTransformerTemp.toNum(1)}°
                </text>
            </a>
        </svg>
    `;
}