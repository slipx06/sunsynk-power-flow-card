// inverter-elements.ts
import {svg, html} from 'lit';
import {localize} from '../../../localize/localize';
import {Utils} from '../../../helpers/utils';
import {AutarkyType, DataDto, sunsynkPowerFlowCardConfig} from '../../../types';
import {icons} from '../../../helpers/icons';
import {UnitOfElectricalCurrent, UnitOfElectricPotential} from '../../../const';
import {createTextWithPopup, renderText} from '../../../helpers/text-utils';

export const renderInverterElements = (data: DataDto, inverterImg: string, config: sunsynkPowerFlowCardConfig) => {
    const {
        inverterColour,
        enableAutarky,
        enableTimer,
        priorityLoad
    } = data;

    const {
        three_phase
    } = config.inverter;

    return html`
        <!-- Inverter Elements -->
        <svg id="Inverter" style="overflow: visible" x="${config.wide ? '10%' : '0%'}">
            ${renderText(
                'autarkye_value',
                127,
                260,
                enableAutarky === AutarkyType.No,
                enableAutarky === AutarkyType.Energy ? 'st4 st8 left-align' : 'st12',
                inverterColour,
                `${data.autarkyEnergy}%`,
                true
            )}    
            ${renderText(
                'ratioe_value',
                173,
                260,
                enableAutarky === AutarkyType.No,
                enableAutarky === AutarkyType.Energy ? 'st4 st8 left-align' : 'st12',
                inverterColour,
                `${data.ratioEnergy}%`,
                true
            )}
            ${renderText(
                'autarkyp_value',
                127,
                260,
                enableAutarky === AutarkyType.No,
                enableAutarky === AutarkyType.Power ? 'st4 st8 left-align' : 'st12',
                inverterColour,
                `${data.autarkyPower}%`,
                true
            )}
            ${renderText(
                'ratiop_value',
                173,
                260,
                enableAutarky === AutarkyType.No,
                enableAutarky === AutarkyType.Power ? 'st4 st8 left-align' : 'st12',
                inverterColour,
                `${data.ratioPower}%`,
                true
            )}
            ${renderText(
                'autarky',
                127,
                273,
                enableAutarky === AutarkyType.No,
                'st3 left-align',
                inverterColour,
                localize('common.autarky'),
                true
            )}
            ${renderText(
                'ratio',
                173,
                273,
                enableAutarky === AutarkyType.No,
                'st3 left-align',
                inverterColour,
                localize('common.ratio'),
                true
            )}
            <circle id="standby" cx="220" cy="260" r="3.5" fill="${data.inverterStateColour}"/>                             
            ${config.inverter?.navigate
                    ? svg`
                        <a href="#" @click=${(e) => Utils.handleNavigation(e, config.inverter.navigate)}>
                            <svg x="213.5" y="179.5" width="54"
                                height="79" viewBox="0 0 74 91" preserveAspectRatio="xMidYMid meet"
                                opacity="${!data.genericInverterImage ? 0 : 1}">
                                <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)"
                                fill="${inverterColour}" stroke="none">
                                    <path d="${icons.inverter}"/>
                                </g>
                            </svg>
                        </a>`
                    : svg`
                        <svg x="213.5" y="179.5" width="54"
                            height="79" viewBox="0 0 74 91" preserveAspectRatio="xMidYMid meet"
                            opacity="${!data.genericInverterImage ? 0 : 1}">
                            <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)"
                            fill="${inverterColour}" stroke="none">
                                <path d="${icons.inverter}"/>
                            </g>
                        </svg>`
            }         
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.use_timer_248)}>
                <svg id="timer" x="267.7" y="243.3" width="18"
                    height="18" viewBox="0 0 24 24">
                    <path display="${data.stateUseTimer.state == 'on' && enableTimer !== 'no' ? '' : 'none'}"
                        fill="${inverterColour}"
                        d="${icons.timerOn}"/>
                </svg>
                <svg id="timer_off" x="267.7" y="243.3" width="18"
                    height="18" viewBox="0 0 24 24">
                    <path display="${data.stateUseTimer.state == 'off' && enableTimer !== 'no' ? '' : 'none'}"
                        fill="${inverterColour}"
                        d="${icons.timerOff}"/>
                </svg>
                ${renderText(
                    'timer_text_off',
                    287,
                    254.7,
                    !!(data.stateUseTimer.state == 'off' && enableTimer !== 'no'),
                    'st3 left-align',
                    inverterColour,
                    localize('common.timer_off'),
                )}
                ${renderText(
                    'timer_text_on',
                    287,
                    254.7,
                    !!(data.stateUseTimer.state == 'on' && enableTimer !== 'no'),
                    'st3 left-align',
                    inverterColour,
                    localize('common.timer_on'),
                )}
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.priority_load_243)}>
                <svg id="pbat" x="267.7" y="262.5" width="18"
                    height="18" viewBox="0 0 24 24">
                    <path display="${priorityLoad === 'off' && (priorityLoad !== 'no' || !priorityLoad) ? '' : 'none'}"
                        fill="${inverterColour}"
                        d="${icons.priorityLoadOff}"/>
                </svg>
                <svg id="pload" x="267.7" y="262.5" width="18"
                    height="18" viewBox="0 0 24 24">
                    <path display="${priorityLoad === 'on' && (priorityLoad !== 'no' || !priorityLoad) ? '' : 'none'}"
                        fill="${inverterColour}"
                        d="${icons.priorityLoadOn}"/>
                </svg>
                <text id="priority_text_batt" x="287" y="273" class="st3 left-align"
                    display="${priorityLoad === 'off' && (priorityLoad !== 'no' || !priorityLoad) ? '' : 'none'}"
                    fill="${inverterColour}">${localize('common.priority_batt')}
                </text>
                <text id="priority_text_load" x="287" y="273" class="st3 left-align"
                    display="${priorityLoad === 'on' && (priorityLoad !== 'no' || !priorityLoad) ? '' : 'none'}"
                    fill="${inverterColour}">${localize('common.priority_load')}
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
                    <path display="${data.inverterProg.show === false || enableTimer === 'no' ? 'none' : ''}"
                        class="${data.inverterProg.charge === 'none' || (data.stateUseTimer.state != 'off' && data.stateUseTimer.state != 'on') ? 'st12' : ''}"
                        fill="${inverterColour}"
                        d="${icons.progGridOn}"/>
                </svg>
                <svg id="prog_grid_off" x="323" y="243" width="20"
                    height="18" viewBox="0 0 24 24">
                    <path display="${data.inverterProg.show === false || enableTimer === 'no' ? 'none' : ''}"
                        class="${data.inverterProg.charge === 'none' && (data.stateUseTimer.state === 'off' || data.stateUseTimer.state === 'on') ? '' : 'st12'}"
                        fill="${inverterColour}"
                        d="${icons.progGridOff}"/>
                </svg>
            </a>
            ${createTextWithPopup(
                'inverter_voltage_154',
                270.2,
                168.2,
                config.entities.inverter_voltage_154 === 'none' || !config.entities.inverter_voltage_154,
                'st3 left-align',
                inverterColour,
                `${data.inverterVoltage}`
                + `${three_phase && config.entities?.inverter_voltage_L2 ? ' | ' + data.inverterVoltageL2 : ''}`
                + `${three_phase && config.entities?.inverter_voltage_L3 ? ' | ' + data.inverterVoltageL3 : ''}`
                + ` ${UnitOfElectricPotential.VOLT}`,
                (e) => Utils.handlePopup(e, config.entities.inverter_voltage_154),
                true
            )}
            ${createTextWithPopup(
                'load_frequency_192',
                270.2,
                192.6,
                config.entities.load_frequency_192 === 'none' || !config.entities.load_frequency_192,
                'st3 left-align',
                inverterColour,
                `${data.loadFrequency} Hz`,
                (e) => Utils.handlePopup(e, config.entities.load_frequency_192),
                true
            )}
            ${createTextWithPopup(
                'inverter_current_164',
                270.2,
                180.4,
                config.entities.inverter_current_164 === 'none' || !config.entities.inverter_current_164,
                'st3 left-align',
                inverterColour,
                `${data.inverterCurrent}`
                + `${three_phase && config.entities?.inverter_current_L2 ? ' | ' + data.inverterCurrentL2 : ''}`
                + `${three_phase && config.entities?.inverter_current_L3 ? ' | ' + data.inverterCurrentL3 : ''}`
                + ` ${UnitOfElectricalCurrent.AMPERE}`,
                (e) => Utils.handlePopup(e, config.entities.inverter_current_164),
                true
            )}
            ${createTextWithPopup(
                'ac_temp',
                173,
                168.2,
                !!(config.entities?.radiator_temp_91 && data.stateRadiatorTemp.isValid()),
                'st3 left-align',
                inverterColour,
                `AC: ${data.stateRadiatorTemp.toNum(1)}°`,
                (e) => Utils.handlePopup(e, config.entities.radiator_temp_91),
            )}
            ${createTextWithPopup(
                'dc_temp',
                173,
                180.4,
                !!(config.entities?.dc_transformer_temp_90 && data.stateDCTransformerTemp.isValid()),
                'st3 left-align',
                inverterColour,
                `DC: ${data.stateDCTransformerTemp.toNum(1)}°`,
                (e) => Utils.handlePopup(e, config.entities.dc_transformer_temp_90),
                false
            )}
        </svg>
    `;
}