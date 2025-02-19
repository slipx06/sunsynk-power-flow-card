// solar-elements.ts
import {html, svg} from 'lit';
import {localize} from '../../../localize/localize';
import {Utils} from '../../../helpers/utils';
import {DataDto, sunsynkPowerFlowCardConfig} from '../../../types';
import {UnitOfElectricalCurrent, UnitOfElectricPotential, UnitOfPower,} from '../../../const';
import {icons} from '../../../helpers/icons';
import { renderPV } from '../../shared/pv/render-pv';
import { renderPVFlow } from '../../shared/pv/render-pv-flow';

export const renderSolarElements = (data: DataDto, config: sunsynkPowerFlowCardConfig) => {
    return html`
        <!-- Solar Elements -->
        <svg id="Solar" 
        style="overflow: visible; display: ${!config.show_solar ? 'none' : 'inline'};"
        x="3%" y="2.5%">
            ${renderPV('pvtotal', '51', '162', data, config)}
            ${renderPV('pv1', '0', '40', data, config)}
            ${renderPV('pv2', '101', '40', data, config)}
            ${renderPV('pv3', '0', '100', data, config)}
            ${renderPV('pv4', '101', '100', data, config)}
            <text x="0" y="78.5" class="st3 st8 left-align"
                display="${!config.show_solar ? 'none' : ''}" fill="${data.solarColour}">
                ${config.solar.pv1_name || localize('common.pv1_name')}
            </text>
            <text x="0" y="90" class="${[2, 3].includes(config.solar.efficiency) ? 'st3 st8 left-align' : 'st12'}"
                display="${[0, 1].includes(config.solar.efficiency) ? 'none' : ''}" fill="${data.solarColour}">
                ${data.PV1Efficiency}%
            </text>
            <text x="99" y="78.5" class="st3 st8 left-align"
                display="${config.solar.mppts === 1 ? 'none' : ''}"
                fill="${data.solarColour}">
                ${config.solar.pv2_name || localize('common.pv2_name')}
            </text>
            <text x="99" y="90" class="${[2, 3].includes(config.solar.efficiency) ? 'st3 st8 left-align' : 'st12'}"
                display="${config.solar.mppts === 1 || [0, 1].includes(config.solar.efficiency) ? 'none' : ''}"
                fill="${data.solarColour}">${data.PV2Efficiency}%
            </text>
            <text x="0" y="139" class="st3 st8 left-align"
                display="${[1, 2].includes(config.solar.mppts) ? 'none' : ''}"
                fill="${data.solarColour}">
                ${config.solar.pv3_name || localize('common.pv3_name')}
            </text>
            <text x="0" y="150" class="${[2, 3].includes(config.solar.efficiency) ? 'st3 st8 left-align' : 'st12'}"
                display="${[1, 2].includes(config.solar.mppts) || [0, 1].includes(config.solar.efficiency) ? 'none' : ''}"
                fill="${data.solarColour}">${data.PV3Efficiency}%
            </text>
            <text x="99" y="139" class="st3 st8 left-align"
                display="${[1, 2, 3].includes(config.solar.mppts) ? 'none' : ''}"
                fill="${data.solarColour}">
                ${config.solar.pv4_name || localize('common.pv4_name')}
            </text>
            <text x="99" y="150" class="${[2, 3].includes(config.solar.efficiency) ? 'st3 st8 left-align' : 'st12'}"
                display="${[1, 2, 3].includes(config.solar.mppts) || [0, 1].includes(config.solar.efficiency) ? 'none' : ''}"
                fill="${data.solarColour}">${data.PV4Efficiency}%
            </text>
            <text x="51" y="202" class="${[2, 3].includes(config.solar.efficiency) ? 'st3 st8 left-align' : 'st12'}"
                display="${[0, 1].includes(config.solar.efficiency) || config.solar.mppts === 1 ? 'none' : ''}"
                fill="${data.solarColour}">${data.totalPVEfficiency}%
            </text>
            <text id="daily_solar" x="43.5" y="29" class="st3 left-align"
                display="${config.solar.display_mode === 1 ? '' : 'none'}"
                fill="${!data.solarShowDaily ? 'transparent' : `${data.solarColour}`}">
                ${config.solar.custom_label || localize('common.daily_solar')}
            </text>
            <text id="remaining_solar" x="43.5" y="29" class="st3 left-align"
                display="${config.solar.display_mode === 2 ? '' : 'none'}"
                fill="${!data.solarShowDaily  ? 'transparent' : `${data.solarColour}`}">
                ${config.solar.custom_label || localize('common.daily_solar_left')}
            </text>
            <text id="total_solar_generation" x="43.5" y="29" class="st3 left-align"
                display="${config.solar.display_mode === 3 ? '' : 'none'}"
                fill="${!data.solarShowDaily ? 'transparent' : `${data.solarColour}`}">
                ${config.solar.custom_label || localize('common.total_solar_generation')}
            </text>
            ${renderPVFlow(
                'pv1',
                config.solar.mppts === 1 
                    ? config.wide 
                        ? 'M 86 175 M 278 250 L 96 250 Q 86 250 86 240 L 86 56 H 70' 
                        : 'M 86 175 M 155 250 L 96 250 Q 86 250 86 240 L 86 56 H 70'
                    : 'M 86 162 L 86 56 Q 86 56 86 56 L 70 56',
                data.solarColour,
                data.pv1LineWidth,
                data.pv1PowerWatts,
                data.durationCur['pv1'],
                config.solar.invert_flow,
                data.minLineWidth,
                "",
                "1;0"
            )}
            ${renderPVFlow(
                'pv2',
                'M 86 162 L 86 56 Q 86 56 86 56 L 101 56',
                data.solarColour,
                data.pv2LineWidth,
                data.pv2PowerWatts,
                data.durationCur['pv2'],
                config.solar.invert_flow,
                data.minLineWidth,
                config.solar.mppts === 1 ? 'st12' : '',
                "1;0"
            )}
            ${renderPVFlow(
                'pv3',
                'M 86 162 L 86 115 Q 86 115 86 115 L 70 115',
                data.solarColour,
                data.pv3LineWidth,
                data.pv3PowerWatts,
                data.durationCur['pv3'],
                config.solar.invert_flow,
                data.minLineWidth,
                [1, 2].includes(config.solar.mppts) ? 'st12' : '',
                "1;0"
            )}
            ${renderPVFlow(
                'pv4',
                'M 86 162 L 86 115 Q 86 115 86 115 L 101 115',
                data.solarColour,
                data.pv4LineWidth,
                data.pv4PowerWatts,
                data.durationCur['pv4'],
                config.solar.invert_flow,
                data.minLineWidth,
                [1, 2, 3].includes(config.solar.mppts) ? 'st12' : '',
                "1;0"
            )}
            ${renderPVFlow(
                'solar',
                config.wide 
                    ? 'M 278 250 L 96 250 Q 86 250 86 240 L 86 192'
                    : 'M 155 250 L 96 250 Q 86 250 86 240 L 86 192',
                data.solarColour,
                data.solarLineWidth,
                data.totalPV,
                data.durationCur['solar'],
                config.solar.invert_flow,
                data.minLineWidth,
                config.solar.mppts === 1 ? 'st12' : '',
                "1;0"
            )}
            
            ${config.solar?.navigate
                ? svg`
                    <a href="#" @click=${(e) => Utils.handleNavigation(e, config.solar.navigate)}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="sun" x="0" y="-0.5" width="40" height="40"
                            viewBox="0 0 24 24">
                            <path fill="${data.solarColour}"
                                d="${icons.sun}"/>
                        </svg>
                    </a>`
                : svg`
                    <svg xmlns="http://www.w3.org/2000/svg" id="sun" x="0" y="-0.5" width="40" height="40"
                        viewBox="0 0 24 24">
                        <path fill="${data.solarColour}"
                            d="${icons.sun}"/>
                    </svg>`
            }
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.solar_sell_247)}>
                <svg xmlns="http://www.w3.org/2000/svg" id="solar_sell_on" x="96" y="197" width="18"
                    height="18" viewBox="0 0 30 30">
                    <path display="${!config.entities.solar_sell_247 || config.entities.solar_sell_247 === 'none' || data.stateSolarSell.state === 'off' || data.stateSolarSell.state === '0' || !['1', 'on'].includes(data.stateSolarSell.state) ? 'none' : ''}"
                        fill="${data.solarColour}"
                        d="${icons.solarSellOn}"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" id="solar_sell_off" x="96" y="197" width="18"
                    height="18" viewBox="0 0 30 30">
                    <path display="${!config.entities.solar_sell_247 || config.entities.solar_sell_247 === 'none' || data.stateSolarSell.state === 'on' || data.stateSolarSell.state === '1' || !['0', 'off'].includes(data.stateSolarSell.state) ? 'none' : ''}"
                        fill="${data.solarColour}"
                        d="${icons.solarSellOff}"/>
                </svg>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_pv_energy_108)}>
                <text id="daily_solar_value" x="43.5" y="15" class="st10 left-align"
                    display="${config.solar.display_mode === 1 && data.stateDayPVEnergy.isValid() ? '' : 'none'}"
                    fill="${!data.solarShowDaily ? 'transparent' : `${data.solarColour}`}">
                    ${data.stateDayPVEnergy.toPowerString(true, data.decimalPlacesEnergy)}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_pv_energy_108)}>
                <text id="remaining_solar_value" x="43.5" y="15" class="st10 left-align"
                    display="${config.solar.display_mode === 2 && data.stateDayPVEnergy.isValid() ? '' : 'none'}"
                    fill="${!data.solarShowDaily ? 'transparent' : `${data.solarColour}`}">
                    ${data.stateDayPVEnergy.toPowerString(true, data.decimalPlacesEnergy)} / ${data.remainingSolar}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_pv_energy_108)}>
                <text id="total_solar_value" x="43.5" y="15" class="st10 left-align"
                    display="${config.solar.display_mode === 3 && data.stateDayPVEnergy.isValid() ? '' : 'none'}"
                    fill="${!data.solarShowDaily ? 'transparent' : `${data.solarColour}`}">
                    ${data.stateDayPVEnergy.toPowerString(true, data.decimalPlacesEnergy)} /
                    ${data.totalSolarGeneration}
                </text>
            </a>
            ${config.entities?.pv_total
                ? svg`
                        <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv_total)}>
                            <text id="pvtotal_power" x="87" y="178" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                                    display="${config.solar.mppts === 1 || !data.statePVTotal.isValid() ? 'none' : ''}" 
                                    fill="${data.solarColour}">
                                ${config.solar.auto_scale
                        ? config.entities?.pv_total
                                ? Utils.convertValueNew(data.totalPV, data.statePVTotal?.getUOM(), data.decimalPlaces)
                                : Utils.convertValue(data.totalPV, data.decimalPlaces) || 0
                        : `${Utils.toNum(data.totalPV || 0, 0)} ${UnitOfPower.WATT}`
                }
                            </text>
                        </a>`
                : svg`
                        <text id="pvtotal_power" x="87" y="178" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                                display="${config.solar.mppts === 1 || !data.statePVTotal.isValid() ? 'none' : ''}" 
                                fill="${data.solarColour}">
                            ${config.solar.auto_scale
                        ? config.entities?.pv_total
                                ? Utils.convertValueNew(data.totalPV, data.statePVTotal?.getUOM(), data.decimalPlaces)
                                : Utils.convertValue(data.totalPV, data.decimalPlaces) || 0
                        : `${Utils.toNum(data.totalPV || 0, 0)} ${UnitOfPower.WATT}`
                }
                        </text>`
            }
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv1_power_186)}>
                <text id="pv1_power_186" x="36.5" y="56.5" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                    display="${!data.statePV1Power.isValid() ? 'none' : ''}" 
                    fill="${data.solarColour}" >
                    ${config.solar.auto_scale 
                        ? Utils.convertValue(data.pv1PowerWatts, data.decimalPlaces) || 0 
                        : `${Utils.toNum(data.pv1PowerWatts || 0, 0)} ${UnitOfPower.WATT}`}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv2_power_187)}>
                <text id="pv2_power_187" x="137" y="56.5" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                    display="${config.solar.mppts === 1 || !data.statePV2Power.isValid() ? 'none' : ''}" 
                    fill="${data.solarColour}">
                    ${config.solar.auto_scale 
                        ? Utils.convertValue(data.pv2PowerWatts, data.decimalPlaces) || 0 
                        : `${Utils.toNum(data.pv2PowerWatts || 0, 0)} ${UnitOfPower.WATT}`}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv3_power_188)}>
                <text id="pv3_power_188" x="36.5" y="117" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                    display="${[1, 2].includes(config.solar.mppts) || !data.statePV3Power.isValid() ? 'none' : ''}" 
                    fill="${data.solarColour}">
                    ${config.solar.auto_scale 
                        ? Utils.convertValue(data.pv3PowerWatts, data.decimalPlaces) || 0 
                        : `${Utils.toNum(data.pv3PowerWatts || 0, 0)} ${UnitOfPower.WATT}`}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv4_power_189)}>
                <text id="pv4_power_189" x="137" y="117" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                    display="${[1, 2, 3].includes(config.solar.mppts) || !data.statePV3Power.isValid() ? 'none' : ''}" 
                    fill="${data.solarColour}">
                    ${config.solar.auto_scale 
                        ? Utils.convertValue(data.pv4PowerWatts, data.decimalPlaces) || 0 
                        : `${Utils.toNum(data.pv4PowerWatts || 0, 0)} ${UnitOfPower.WATT}`}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv1_voltage_109)}>
                <text id="pv1_voltage" x="41" y="78.5" class="st3 left-align"
                    display="${!config.entities.pv1_voltage_109 || config.entities.pv1_voltage_109  === 'none' || !data.statePV1Voltage.isValid() ? 'none' : ''}"
                    fill="${data.solarColour}">${data.statePV1Voltage.toNum(1)}
                    ${UnitOfElectricPotential.VOLT}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv1_current_110)}>
                <text id="pv1_current" x="41" y="90" class="st3 left-align"
                    display="${!config.entities.pv1_current_110 || config.entities.pv1_current_110 === 'none' || !data.statePV1Current.isValid() ? 'none' : ''}"
                    fill="${data.solarColour}">${data.statePV1Current.toNum(1)}
                    ${UnitOfElectricalCurrent.AMPERE}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv2_voltage_111)}>
                <text id="pv2_voltage" x="142" y="78.5" class="st3 left-align"
                    display="${!config.entities.pv2_voltage_111 || config.entities.pv2_voltage_111 === 'none' || config.solar.mppts === 1 || !data.statePV2Voltage.isValid() ? 'none' : ''}"
                    fill="${data.solarColour}">${data.statePV2Voltage.toNum(1)}
                    ${UnitOfElectricPotential.VOLT}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv2_current_112)}>
                <text id="pv2_current" x="142" y="90" class="st3 left-align"
                    display="${!config.entities.pv2_current_112 || config.entities.pv2_current_112 === 'none' || config.solar.mppts === 1 || !data.statePV2Current.isValid() ? 'none' : ''}"
                    fill="${data.solarColour}">${data.statePV2Current.toNum(1)}
                    ${UnitOfElectricalCurrent.AMPERE}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv3_voltage_113)}>
                <text id="pv3_voltage" x="41" y="139" class="st3 left-align"
                    display="${!config.entities.pv3_voltage_113 || config.entities.pv3_voltage_113 === 'none' || [1, 2].includes(config.solar.mppts) || !data.statePV3Voltage.isValid() ? 'none' : ''}"
                    fill="${data.solarColour}">${data.statePV3Voltage.toNum(1)}
                    ${UnitOfElectricPotential.VOLT}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv3_current_114)}>
                <text id="pv3_current" x="41" y="150" class="st3 left-align"
                    display="${!config.entities.pv3_current_114 || config.entities.pv3_current_114 === 'none' || [1, 2].includes(config.solar.mppts) || !data.statePV3Current.isValid() ? 'none' : ''}"
                    fill="${data.solarColour}">${data.statePV3Current.toNum(1)}
                    ${UnitOfElectricalCurrent.AMPERE}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv4_voltage_115)}>
                <text id="pv4_voltage" x="142" y="139" class="st3 left-align"
                    display="${!config.entities.pv4_voltage_115 || config.entities.pv4_voltage_115 === 'none' || [1, 2, 3].includes(config.solar.mppts) || !data.statePV4Voltage.isValid() ? 'none' : ''}"
                    fill="${data.solarColour}">${data.statePV4Voltage.toNum(1)}
                    ${UnitOfElectricPotential.VOLT}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv4_current_116)}>
                <text id="pv4_current" x="142" y="150" class="st3 left-align"
                    display="${!config.entities.pv4_current_116 || config.entities.pv4_current_116 === 'none' || [1, 2, 3].includes(config.solar.mppts) || !data.statePV4Current.isValid() ? 'none' : ''}"
                    fill="${data.solarColour}">${data.statePV4Current.toNum(1)}
                    ${UnitOfElectricalCurrent.AMPERE}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.environment_temp)}>
                <text id="environ_temp" x="1" y="32"
                    class="${config.entities?.environment_temp ? 'st3 left-align' : 'st12'}"
                    fill="${data.solarColour}" display="${!data.stateEnvironmentTemp.isValid() ? 'none' : ''}">
                    ${data.stateEnvironmentTemp.toNum(1)}°
                </text>
            </a>
        </svg>
    `;
}