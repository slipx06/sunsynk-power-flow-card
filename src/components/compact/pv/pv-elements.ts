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
            x="${config.wide ? '10%' : '0%'}">
            ${renderPV('pvtotal', '205', '116.5', data, config)}
            ${renderPV('pv1', config.solar.mppts === 1 ? '205' : '154', '54.5', data, config)}
            ${renderPV('pv2', '254', '54.5', data, config)}
            ${renderPV('pv3', '78', '54.5', data, config)}
            ${renderPV('pv4', '330', '54.5', data, config)}
            <svg id="PV5" 
                style="overflow: visible; display: ${config.show_solar && config.wide && [5, 6].includes(config.solar.mppts)  ? 'inline' : 'none'};" x="-10.5%">
                ${renderPV('pv5', '78', '54.5', data, config)}
                <text x="105" y="94" class="st3 st8 right-align"
                    fill="${data.solarColour}">
                    ${config.solar.pv5_name || localize('common.pv5_name')}
                </text>
                <text x="105" y="106" class="${[2, 3].includes(config.solar.efficiency) ? 'st3 st8 right-align' : 'st12'}"
                    ?hidden=${[0, 1].includes(config.solar.efficiency)}
                    fill="${data.solarColour}">${data.PV5Efficiency}%
                </text>
                ${renderPVFlow(
                    'pv5',
                    'M 113 84 L 113 125 Q 113 132 120 132 L 280 132',
                    data.solarColour,
                    data.pv5LineWidth,
                    data.pv5PowerWatts,
                    data.durationCur['pv5'],
                    config.solar.invert_flow,
                    data.minLineWidth,
                )}
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv5_voltage)}>
                    <text id="pv5_voltage" x="120" y="106" class="st3 left-align"
                        ?hidden=${!config.entities.pv5_voltage || config.entities.pv5_voltage === 'none' || !data.statePV5Voltage.isValid()}
                        fill="${data.solarColour}">${data.statePV5Voltage.toNum(1)}
                        ${UnitOfElectricPotential.VOLT}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv5_current)}>
                    <text id="pv5_current" x="120" y="94" class="st3 left-align"
                        ?hidden=${!config.entities.pv5_current || config.entities.pv5_current === 'none' || !data.statePV5Current.isValid()}
                        fill="${data.solarColour}">${data.statePV5Current.toNum(1)}
                        ${UnitOfElectricalCurrent.AMPERE}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv5_power)}>
                    <text id="pv5_power" x="113" y="71" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                        ?hidden=${!data.statePV5Power.isValid()} 
                        fill="${data.solarColour}">
                        ${config.solar.auto_scale 
                            ? Utils.convertValue(data.pv5PowerWatts, data.decimalPlaces) || 0 
                            : `${Utils.toNum(data.pv5PowerWatts || 0, 0)} ${UnitOfPower.WATT}`}
                    </text>
                </a>
            </svg>
            <svg id="PV6" 
                style="overflow: visible; display: ${config.show_solar && config.wide && config.solar.mppts === 6  ? 'inline' : 'none'};" x="10.5%">
                ${renderPV('pv6', '330', '54.5', data, config)}
                <text x="357" y="94" class="st3 st8 right-align"
                    fill="${data.solarColour}">
                    ${config.solar.pv6_name || localize('common.pv6_name')}
                </text>
                <text x="357" y="106" class="${[2, 3].includes(config.solar.efficiency) ? 'st3 st8 right-align' : 'st12'}"
                    ?hidden=${[0, 1].includes(config.solar.efficiency)}
                    fill="${data.solarColour}">${data.PV6Efficiency}%
                </text>
                ${renderPVFlow(
                    'pv6',
                    'M 365 85 L 365 125 Q 365 132 358 132 L 200 132',
                    data.solarColour,
                    data.pv6LineWidth,
                    data.pv6PowerWatts,
                    data.durationCur['pv6'],
                    config.solar.invert_flow,
                    data.minLineWidth,
                )}
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv6_voltage)}>
                    <text id="pv6_voltage" x="372" y="106" class="st3 left-align"
                        ?hidden=${!config.entities.pv6_voltage || config.entities.pv6_voltage === 'none' || !data.statePV6Voltage.isValid()}
                        fill="${data.solarColour}">${data.statePV6Voltage.toNum(1)}
                        ${UnitOfElectricPotential.VOLT}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv6_current)}>
                    <text id="pv6_current" x="372" y="94" class="st3 left-align"
                        ?hidden=${!config.entities.pv6_current || config.entities.pv6_current === 'none' || !data.statePV6Current.isValid()}
                        fill="${data.solarColour}">${data.statePV6Current.toNum(1)}
                        ${UnitOfElectricalCurrent.AMPERE}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv6_power)}>
                    <text id="pv6_power" x="366" y="71" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                        ?hidden=${!data.statePV6Power.isValid()} 
                        fill="${data.solarColour}">
                        ${config.solar.auto_scale 
                            ? Utils.convertValue(data.pv6PowerWatts, data.decimalPlaces) || 0 
                            : `${Utils.toNum(data.pv6PowerWatts || 0, 0)} ${UnitOfPower.WATT}`}
                    </text>
                </a>
            </svg>
            <text id="daily_solar" x="200" y="40" class="st3 left-align"
                display="${config.solar.display_mode === 1 ? '' : 'none'}"
                fill="${!data.solarShowDaily || !config.show_solar ? 'transparent' : `${data.solarColour}`}">
                ${config.solar.custom_label || localize('common.daily_solar')}
            </text>
            <text id="remaining_solar" x="200" y="40" class="st3 left-align"
                display="${config.solar.display_mode === 2 ? '' : 'none'}"
                fill="${!data.solarShowDaily || !config.show_solar ? 'transparent' : `${data.solarColour}`}">
                ${config.solar.custom_label || localize('common.daily_solar_left')}
            </text>
            <text id="total_solar_generation" x="200" y="40" class="st3 left-align"
                display="${config.solar.display_mode === 3 ? '' : 'none'}"
                fill="${!data.solarShowDaily || !config.show_solar ? 'transparent' : `${data.solarColour}`}">
                ${config.solar.custom_label || localize('common.total_solar_generation')}
            </text>
            <text x="${config.solar.mppts === 1 ? '230' : '179'}" y="94" class="st3 st8 right-align"
                fill="${data.solarColour}">
                ${config.solar.pv1_name || localize('common.pv1_name')}
            </text>
            <text x="${config.solar.mppts === 1 ? '230' : '179'}" y="106" class="${[2, 3].includes(config.solar.efficiency) ? 'st3 st8 right-align' : 'st12'}"
                ?hidden=${[0, 1].includes(config.solar.efficiency)} fill="${data.solarColour}">
                ${data.PV1Efficiency}%
            </text>
            <text x="281" y="94" class="st3 st8 right-align"
                display="${config.solar.mppts === 1 ? 'none' : ''}"
                fill="${data.solarColour}">
                ${config.solar.pv2_name || localize('common.pv2_name')}
            </text>
            <text x="281" y="106" class="${[2, 3].includes(config.solar.efficiency) ? 'st3 st8 right-align' : 'st12'}"
                display="${config.solar.mppts === 1 || [0, 1].includes(config.solar.efficiency) ? 'none' : ''}"
                fill="${data.solarColour}">${data.PV2Efficiency}%
            </text>
            <text x="105" y="94" class="st3 st8 right-align"
                display="${[1, 2].includes(config.solar.mppts) ? 'none' : ''}"
                fill="${data.solarColour}">
                ${config.solar.pv3_name || localize('common.pv3_name')}
            </text>
            <text x="105" y="106" class="${[2, 3].includes(config.solar.efficiency) ? 'st3 st8 right-align' : 'st12'}"
                display="${[1, 2].includes(config.solar.mppts) || [0, 1].includes(config.solar.efficiency) ? 'none' : ''}"
                fill="${data.solarColour}">${data.PV3Efficiency}%
            </text>
            <text x="357" y="94" class="st3 st8 right-align"
                display="${[1, 2, 3].includes(config.solar.mppts) ? 'none' : ''}"
                fill="${data.solarColour}">
                ${config.solar.pv4_name || localize('common.pv4_name')}
            </text>
            <text x="357" y="106" class="${[2, 3].includes(config.solar.efficiency) ? 'st3 st8 right-align' : 'st12'}"
                display="${[1, 2, 3].includes(config.solar.mppts) || [0, 1].includes(config.solar.efficiency) ? 'none' : ''}"
                fill="${data.solarColour}">${data.PV4Efficiency}%
            </text>
            <text x="215" y="156" class="${[2, 3].includes(config.solar.efficiency) ? 'st3 st8' : 'st12'}"
                display="${config.solar.mppts === 1 ? 'none' : ''}"
                fill="${data.solarColour}">${data.totalPVEfficiency}%
            </text>
            ${renderPVFlow(
                'pv1',
                config.solar.mppts === 1 ? 'M 239.23 84 L 239 190' : 'M 187 84 L 187 122 Q 187 132 195 132 L 205 132.03',
                data.solarColour,
                data.pv1LineWidth,
                data.pv1PowerWatts,
                data.durationCur['pv1'],
                config.solar.invert_flow,
                data.minLineWidth
            )} 
            ${renderPVFlow(
                'pv2',
                'M 289 84.5 L 289 125 Q 289 132 282 132 L 275 132',
                data.solarColour,
                data.pv2LineWidth,
                data.pv2PowerWatts,
                data.durationCur['pv2'],
                config.solar.invert_flow,
                data.minLineWidth,
                config.solar.mppts === 1 ? 'st12' : ''
            )}
            ${renderPVFlow(
                'pv3',
                'M 113 84 L 113 125 Q 113 132 120 132 L 205 132.03',
                data.solarColour,
                data.pv3LineWidth,
                data.pv3PowerWatts,
                data.durationCur['pv3'],
                config.solar.invert_flow,
                data.minLineWidth,
                [1, 2].includes(config.solar.mppts) ? 'st12' : ''
            )}
            ${renderPVFlow(
                'pv4',
                'M 365 85 L 365 125 Q 365 132 358 132 L 275 132',
                data.solarColour,
                data.pv4LineWidth,
                data.pv4PowerWatts,
                data.durationCur['pv4'],
                config.solar.invert_flow,
                data.minLineWidth,
                [1, 2, 3].includes(config.solar.mppts) ? 'st12' : ''
            )}
            ${renderPVFlow(
                'solar',
                'M 239 190 L 239 147',
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
                        <svg id="sun" x="154" y="10" width="40" height="40"
                            viewBox="0 0 24 24">
                            <path fill="${data.solarColour}"
                                d="${icons.sun}"/>
                        </svg>
                    </a>`
                : svg`
                    <svg id="sun" x="154" y="10" width="40" height="40"
                        viewBox="0 0 24 24">
                        <path fill="${data.solarColour}"
                            d="${icons.sun}"/>
                    </svg>`
            }
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.solar_sell_247)}>
                <svg id="solar_sell_on" x="245" y="150" width="18"
                    height="18" viewBox="0 0 30 30">
                    <path display="${!config.entities.solar_sell_247 || data.stateSolarSell.state === 'off' || data.stateSolarSell.state === '0' || !config.show_solar || !['1', 'on'].includes(data.stateSolarSell.state) ? 'none' : ''}"
                        fill="${data.solarColour}"
                        d="${icons.solarSellOn}"/>
                </svg>
                <svg id="solar_sell_off" x="245" y="150" width="18"
                    height="18" viewBox="0 0 30 30">
                    <path display="${!config.entities.solar_sell_247 || data.stateSolarSell.state === 'on' || data.stateSolarSell.state === '1' || !config.show_solar || !['0', 'off'].includes(data.stateSolarSell.state) ? 'none' : ''}"
                        fill="${data.solarColour}"
                        d="${icons.solarSellOff}"/>
                </svg>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_pv_energy_108)}>
                <text id="daily_solar_value" x="200" y="26" class="st10 left-align"
                    display="${config.solar.display_mode === 1 && data.stateDayPVEnergy.isValid() ? '' : 'none'}"
                    fill="${!data.solarShowDaily ? 'transparent' : `${data.solarColour}`}">
                    ${data.stateDayPVEnergy?.toPowerString(true, data.decimalPlacesEnergy)}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_pv_energy_108)}>
                <text id="remaining_solar_value" x="200" y="26" class="st10 left-align"
                    display="${config.solar.display_mode === 2 && data.stateDayPVEnergy.isValid() ? '' : 'none'}"
                    fill="${!data.solarShowDaily ? 'transparent' : `${data.solarColour}`}">
                    ${data.stateDayPVEnergy?.toPowerString(true, data.decimalPlacesEnergy) + ' / ' + data.remainingSolar}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_pv_energy_108)}>
                <text id="total_solar_value" x="200" y="26" class="st10 left-align"
                    display="${config.solar.display_mode === 3 && data.stateDayPVEnergy.isValid() ? '' : 'none'}"
                    fill="${!data.solarShowDaily ? 'transparent' : `${data.solarColour}`}">
                    ${data.stateDayPVEnergy?.toPowerString(true, data.decimalPlacesEnergy) + ' / ' + data.totalSolarGeneration}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv1_voltage_109)}>
                <text id="pv1_voltage" x="${config.solar.mppts === 1 ? '244.7' : '194'}" y="106"
                    class="st3 left-align"
                    display="${!config.entities.pv1_voltage_109 || config.entities.pv1_voltage_109 === 'none' || !data.statePV1Voltage.isValid() ? 'none' : ''}"
                    fill="${data.solarColour}">${data.statePV1Voltage.toNum(1)} ${UnitOfElectricPotential.VOLT}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv1_current_110)}>
                <text id="pv1_current" x="${config.solar.mppts === 1 ? '244.7' : '194'}" y="94"
                    class="st3 left-align"
                    display="${!config.entities.pv1_current_110 || config.entities.pv1_current_110 === 'none' || !data.statePV1Current.isValid() ? 'none' : ''}"
                    fill="${data.solarColour}">${data.statePV1Current.toNum(1)} ${UnitOfElectricalCurrent.AMPERE}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv2_voltage_111)}>
                <text id="data.pv2_voltage" x="296" y="106" class="st3 left-align"
                    display="${!config.entities.pv2_voltage_111 || config.entities.pv2_voltage_111 === 'none' || config.solar.mppts === 1 || !data.statePV2Voltage.isValid() ? 'none' : ''}"
                    fill="${data.solarColour}">${data.statePV2Voltage.toNum(1)}
                    ${UnitOfElectricPotential.VOLT}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv2_current_112)}>
                <text id="data.pv2_current" x="296" y="94" class="st3 left-align"
                    display="${!config.entities.pv2_current_112 || config.entities.pv2_current_112 === 'none' || config.solar.mppts === 1 || !data.statePV2Current.isValid() ? 'none' : ''}"
                    fill="${data.solarColour}">${data.statePV2Current.toNum(1)}
                    ${UnitOfElectricalCurrent.AMPERE}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv3_voltage_113)}>
                <text id="pv3_voltage" x="120" y="106" class="st3 left-align"
                    display="${!config.entities.pv3_voltage_113 || config.entities.pv3_voltage_113 === 'none' || [1, 2].includes(config.solar.mppts) || !data.statePV3Voltage.isValid() ? 'none' : ''}"
                    fill="${data.solarColour}">${data.statePV3Voltage.toNum(1)}
                    ${UnitOfElectricPotential.VOLT}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv3_current_114)}>
                <text id="pv3_current" x="120" y="94" class="st3 left-align"
                    display="${!config.entities.pv3_current_114 || config.entities.pv3_current_114 === 'none' || [1, 2].includes(config.solar.mppts) || !data.statePV3Current.isValid() ? 'none' : ''}"
                    fill="${data.solarColour}">${data.statePV3Current.toNum(1)}
                    ${UnitOfElectricalCurrent.AMPERE}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv4_voltage_115)}>
                <text id="pv4_voltage" x="372" y="106" class="st3 left-align"
                    display="${!config.entities.pv4_voltage_115 || config.entities.pv4_voltage_115 === 'none' || [1, 2, 3].includes(config.solar.mppts) || !data.statePV4Voltage.isValid() ? 'none' : ''}"
                    fill="${data.solarColour}">${data.statePV4Voltage.toNum(1)}
                    ${UnitOfElectricPotential.VOLT}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv4_current_116)}>
                <text id="pv4_current" x="372" y="94" class="st3 left-align"
                    display="${!config.entities.pv4_current_116 || config.entities.pv4_current_116 === 'none' || [1, 2, 3].includes(config.solar.mppts) || !data.statePV4Current.isValid() ? 'none' : ''}"
                    fill="${data.solarColour}">${data.statePV4Current.toNum(1)}
                    ${UnitOfElectricalCurrent.AMPERE}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.environment_temp)}>
                <text id="environ_temp" x="154" y="45"
                    class="${config.entities?.environment_temp ? 'st3 left-align' : 'st12'}"
                    fill="${data.solarColour}"
                    display="${!data.stateEnvironmentTemp.isValid() ? 'none' : ''}">
                    ${data.stateEnvironmentTemp.toNum(1)}°
                </text>
            </a>
            ${config.entities?.pv_total
                ? svg`
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv_total)}>
                        <text id="pvtotal_power" x="238.8" y="133.9" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                                display="${config.solar.mppts === 1 || !data.statePVTotal.isValid() ? 'none' : ''}" 
                                fill="${data.solarColour}">
                            ${config.solar.auto_scale
                                ? config.entities?.pv_total
                                        ? Utils.convertValueNew(data.totalPV, data.statePVTotal.getUOM(), data.decimalPlaces)
                                        : Utils.convertValue(data.totalPV, data.decimalPlaces) || 0
                                : `${Utils.toNum(data.totalPV || 0, 0)} ${UnitOfPower.WATT}`
                            }
                        </text>
                    </a>`
                : svg`
                    <text id="pvtotal_power" x="238.8" y="133.9" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                        display="${config.solar.mppts === 1 || !data.statePVTotal.isValid() ? 'none' : ''}" 
                        fill="${data.solarColour}">
                        ${config.solar.auto_scale
                            ? config.entities?.pv_total
                                    ? Utils.convertValueNew(data.totalPV, data.statePVTotal.getUOM(), data.decimalPlaces)
                                    : Utils.convertValue(data.totalPV, data.decimalPlaces) || 0
                            : `${Utils.toNum(data.totalPV || 0, 0)} ${UnitOfPower.WATT}`
                        }
                    </text>`          
            }
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv1_power_186)}>
                <text id="pv1_power_186" x="${config.solar.mppts === 1 ? '238.8' : '188.1'}" y="71" 
                    class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                    display="${!data.statePV1Power.isValid() ? 'none' : ''}" 
                    fill="${data.solarColour}">
                    ${config.solar.auto_scale 
                        ? Utils.convertValue(data.pv1PowerWatts, data.decimalPlaces) || 0 
                        : `${Utils.toNum(data.pv1PowerWatts || 0, 0)} ${UnitOfPower.WATT}`}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv2_power_187)}>
                <text id="pv2_power_187" x="289.5" y="71" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                    display="${config.solar.mppts === 1 || !data.statePV2Power.isValid() ? 'none' : ''}" 
                    fill="${data.solarColour}">
                    ${config.solar.auto_scale 
                        ? Utils.convertValue(data.pv2PowerWatts, data.decimalPlaces) || 0 
                        : `${Utils.toNum(data.pv2PowerWatts || 0, 0)} ${UnitOfPower.WATT}`}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv3_power_188)}>
                <text id="pv3_power_188" x="113" y="71" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                    display="${[1, 2].includes(config.solar.mppts) || !data.statePV3Power.isValid() ? 'none' : ''}" 
                    fill="${data.solarColour}">
                    ${config.solar.auto_scale 
                        ? Utils.convertValue(data.pv3PowerWatts, data.decimalPlaces) || 0 
                        : `${Utils.toNum(data.pv3PowerWatts || 0, 0)} ${UnitOfPower.WATT}`}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv4_power_189)}>
                <text id="pv4_power_189" x="366" y="71" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                    display="${[1, 2, 3].includes(config.solar.mppts) || !data.statePV4Power.isValid() ? 'none' : ''}" 
                    fill="${data.solarColour}">
                    ${config.solar.auto_scale 
                        ? Utils.convertValue(data.pv4PowerWatts, data.decimalPlaces) || 0 
                        : `${Utils.toNum(data.pv4PowerWatts || 0, 0)} ${UnitOfPower.WATT}`}
                </text>
            </a>
        </svg>
    `;
}

