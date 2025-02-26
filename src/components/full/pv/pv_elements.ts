// solar-elements.ts
import {html, svg} from 'lit';
import {localize} from '../../../localize/localize';
import {Utils} from '../../../helpers/utils';
import {DataDto, sunsynkPowerFlowCardConfig} from '../../../types';
import {UnitOfElectricalCurrent, UnitOfElectricPotential, UnitOfPower,} from '../../../const';
import {icons} from '../../../helpers/icons';
import {renderPV} from '../../shared/pv/render-pv';
import {renderPVFlow} from '../../shared/pv/render-pv-flow';
import {createTextWithPopup, renderText} from '../../shared/text-utils';

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
            ${renderText(
                'pv1_name',
                0,
                78.5,
                !config.show_solar,
                'st3 st8 left-align',
                data.solarColour,
                config.solar.pv1_name || localize('common.pv1_name'),
                true
            )}                 
            ${renderText(
                'pv1_efficiency',
                0,
                90,
                [0, 1].includes(config.solar.efficiency),
                [2, 3].includes(config.solar.efficiency) ? 'st3 st8 left-align' : 'st12',
                data.solarColour,
                `${data.PV1Efficiency}%`,
                true
            )}
            ${renderText(
                'pv2_name',
                99,
                78.5,
                config.solar.mppts === 1,
                'st3 st8 left-align',
                data.solarColour,
                config.solar.pv2_name || localize('common.pv2_name'),
                true
            )}
            ${renderText(
                'pv2_efficiency',
                99,
                90,
                config.solar.mppts === 1 || [0, 1].includes(config.solar.efficiency),
                [2, 3].includes(config.solar.efficiency) ? 'st3 st8 left-align' : 'st12',
                data.solarColour,
                `${data.PV2Efficiency}%`,
                true
            )}
            ${renderText(
                'pv3_name',
                0,
                139,
                [1, 2].includes(config.solar.mppts),
                'st3 st8 left-align',
                data.solarColour,
                config.solar.pv3_name || localize('common.pv3_name'),
                true
            )}
            ${renderText(
                'pv3_efficiency',
                0,
                150,
                [1, 2].includes(config.solar.mppts) || [0, 1].includes(config.solar.efficiency),
                [2, 3].includes(config.solar.efficiency) ? 'st3 st8 left-align' : 'st12',
                data.solarColour,
                `${data.PV3Efficiency}%`,
                true
            )}
            ${renderText(
                'pv4_name',
                99,
                139,
                [1, 2, 3].includes(config.solar.mppts),
                'st3 st8 left-align',
                data.solarColour,
                config.solar.pv4_name || localize('common.pv4_name'),
                true
            )}
            ${renderText(
                'pv4_efficiency',
                99,
                150,
                [1, 2, 3].includes(config.solar.mppts) || [0, 1].includes(config.solar.efficiency),
                [2, 3].includes(config.solar.efficiency) ? 'st3 st8 left-align' : 'st12',
                data.solarColour,
                `${data.PV4Efficiency}%`,
                true
            )}
            ${renderText(
                'total_pv_efficiency',
                51,
                202,
                [0, 1].includes(config.solar.efficiency) || config.solar.mppts === 1,
                [2, 3].includes(config.solar.efficiency) ? 'st3 st8 left-align' : 'st12',
                data.solarColour,
                `${data.totalPVEfficiency}%`,
                true
            )}
            ${renderText(
                'daily_solar',
                43.5,
                29,
                config.solar.display_mode === 1,
                'st3 left-align',
                !data.solarShowDaily ? 'transparent' : data.solarColour,
                config.solar.custom_label || localize('common.daily_solar'),
                false
            )}
            ${renderText(
                'remaining_solar',
                43.5,
                29,
                config.solar.display_mode === 2,
                'st3 left-align',
                !data.solarShowDaily ? 'transparent' : data.solarColour,
                config.solar.custom_label || localize('common.daily_solar_left'),
                false
            )}
            ${renderText(
                'total_solar_generation',
                43.5,
                29,
                config.solar.display_mode === 3,
                'st3 left-align',
                !data.solarShowDaily ? 'transparent' : data.solarColour,
                config.solar.custom_label || localize('common.total_solar_generation'),
                false
            )}
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
            ${createTextWithPopup(
                'daily_solar_value',
                43.5,
                15,
                config.solar.display_mode === 1 && data.stateDayPVEnergy.isValid(),
                'st10 left-align',
                !data.solarShowDaily ? 'transparent' : data.solarColour,
                data.stateDayPVEnergy.toPowerString(true, data.decimalPlacesEnergy),
                (e) => Utils.handlePopup(e, config.entities.day_pv_energy_108),
            )}
            ${createTextWithPopup(
                'remaining_solar_value',
                43.5,
                15,
                config.solar.display_mode === 2 && data.stateDayPVEnergy.isValid(),
                'st10 left-align',
                !data.solarShowDaily ? 'transparent' : data.solarColour,
                `${data.stateDayPVEnergy.toPowerString(true, data.decimalPlacesEnergy)} / ${data.remainingSolar}`,
                (e) => Utils.handlePopup(e, config.entities.day_pv_energy_108),
            )}
            ${createTextWithPopup(
                'total_solar_value',
                43.5,
                15,
                config.solar.display_mode === 3 && data.stateDayPVEnergy.isValid(),
                'st10 left-align',
                !data.solarShowDaily ? 'transparent' : data.solarColour,
                `${data.stateDayPVEnergy.toPowerString(true, data.decimalPlacesEnergy)} / ${data.totalSolarGeneration}`,
                (e) => Utils.handlePopup(e, config.entities.day_pv_energy_108),
            )}
            ${config.entities?.pv_total
                ? svg`
                    ${createTextWithPopup(
                        'pvtotal_power',
                        87,
                        178,
                        config.solar.mppts === 1 || !data.statePVTotal.isValid(),
                        `${data.largeFont !== true ? 'st14' : 'st4'} st8`,
                        data.solarColour,
                        config.solar.auto_scale
                            ? config.entities?.pv_total
                                ? `${Utils.convertValueNew(data.totalPV, data.statePVTotal?.getUOM(), data.decimalPlaces)}`
                                : `${Utils.convertValue(data.totalPV, data.decimalPlaces) || 0}`
                            : `${Utils.toNum(data.totalPV || 0, 0)} ${UnitOfPower.WATT}`,
                        (e) => Utils.handlePopup(e, config.entities.pv_total),
                        true
                    )}`
                : svg`
                    ${renderText(
                        'pvtotal_power',
                        87,
                        178,
                        config.solar.mppts === 1 || !data.statePVTotal.isValid(),
                        `${data.largeFont !== true ? 'st14' : 'st4'} st8`,
                        data.solarColour,
                        config.solar.auto_scale
                            ? config.entities?.pv_total
                                ? `${Utils.convertValueNew(data.totalPV, data.statePVTotal?.getUOM(), data.decimalPlaces)}`
                                : `${Utils.convertValue(data.totalPV, data.decimalPlaces) || 0}`
                            : `${Utils.toNum(data.totalPV || 0, 0)} ${UnitOfPower.WATT}`,
                        true
                    )}`
            }
            ${createTextWithPopup(
                'pv1_power_186',
                36.5,
                56.5,
                !data.statePV1Power.isValid(),
                `${data.largeFont !== true ? 'st14' : 'st4'} st8`,
                data.solarColour,
                config.solar.auto_scale 
                    ? `${Utils.convertValue(data.pv1PowerWatts, data.decimalPlaces) || 0}` 
                    : `${Utils.toNum(data.pv1PowerWatts || 0, 0)} ${UnitOfPower.WATT}`,
                (e) => Utils.handlePopup(e, config.entities.pv1_power_186),
                true
            )}
            ${createTextWithPopup(
                'pv2_power_187',
                137,
                56.5,
                config.solar.mppts === 1 || !data.statePV2Power.isValid(),
                `${data.largeFont !== true ? 'st14' : 'st4'} st8`,
                data.solarColour,
                config.solar.auto_scale 
                    ? `${Utils.convertValue(data.pv2PowerWatts, data.decimalPlaces) || 0}` 
                    : `${Utils.toNum(data.pv2PowerWatts || 0, 0)} ${UnitOfPower.WATT}`,
                (e) => Utils.handlePopup(e, config.entities.pv2_power_187),
                true
            )}
            ${createTextWithPopup(
                'pv3_power_188',
                36.5,
                117,
                [1, 2].includes(config.solar.mppts) || !data.statePV3Power.isValid(),
                `${data.largeFont !== true ? 'st14' : 'st4'} st8`,
                data.solarColour,
                config.solar.auto_scale 
                    ? `${Utils.convertValue(data.pv3PowerWatts, data.decimalPlaces) || 0}` 
                    : `${Utils.toNum(data.pv3PowerWatts || 0, 0)} ${UnitOfPower.WATT}`,
                (e) => Utils.handlePopup(e, config.entities.pv3_power_188),
                true
            )}
            ${createTextWithPopup(
                'pv4_power_189',
                137,
                117,
                [1, 2, 3].includes(config.solar.mppts) || !data.statePV3Power.isValid(),
                `${data.largeFont !== true ? 'st14' : 'st4'} st8`,
                data.solarColour,
                config.solar.auto_scale 
                    ? `${Utils.convertValue(data.pv4PowerWatts, data.decimalPlaces) || 0}` 
                    : `${Utils.toNum(data.pv4PowerWatts || 0, 0)} ${UnitOfPower.WATT}`,
                (e) => Utils.handlePopup(e, config.entities.pv4_power_189),
                true
            )}          
            ${createTextWithPopup(
                'pv1_voltage',
                41,
                78.5,
                !config.entities.pv1_voltage_109 || config.entities.pv1_voltage_109 === 'none' || !data.statePV1Voltage.isValid(),
                'st3 left-align',
                data.solarColour,
                `${data.statePV1Voltage.toNum(1)} ${UnitOfElectricPotential.VOLT}`,
                (e) => Utils.handlePopup(e, config.entities.pv1_voltage_109),
                true
            )}
            ${createTextWithPopup(
                'pv1_current',
                41,
                90,
                !config.entities.pv1_current_110 || config.entities.pv1_current_110 === 'none' || !data.statePV1Current.isValid(),
                'st3 left-align',
                data.solarColour,
                `${data.statePV1Current.toNum(1)} ${UnitOfElectricalCurrent.AMPERE}`,
                (e) => Utils.handlePopup(e, config.entities.pv1_current_110),
                true
            )}
            ${createTextWithPopup(
                'pv2_voltage',
                142,
                78.5,
                !config.entities.pv2_voltage_111 || config.entities.pv2_voltage_111 === 'none' || config.solar.mppts === 1 || !data.statePV2Voltage.isValid(),
                'st3 left-align',
                data.solarColour,
                `${data.statePV2Voltage.toNum(1)} ${UnitOfElectricPotential.VOLT}`,
                (e) => Utils.handlePopup(e, config.entities.pv2_voltage_111),
                true
            )}
            ${createTextWithPopup(
                'pv2_current',
                142,
                90,
                !config.entities.pv2_current_112 || config.entities.pv2_current_112 === 'none' || config.solar.mppts === 1 || !data.statePV2Current.isValid(),
                'st3 left-align',
                data.solarColour,
                `${data.statePV2Current.toNum(1)} ${UnitOfElectricalCurrent.AMPERE}`,
                (e) => Utils.handlePopup(e, config.entities.pv2_current_112),
                true
            )}
            ${createTextWithPopup(
                'pv3_voltage',
                41,
                139,
                !config.entities.pv3_voltage_113 || config.entities.pv3_voltage_113 === 'none' || [1, 2].includes(config.solar.mppts) || !data.statePV3Voltage.isValid(),
                'st3 left-align',
                data.solarColour,
                `${data.statePV3Voltage.toNum(1)} ${UnitOfElectricPotential.VOLT}`,
                (e) => Utils.handlePopup(e, config.entities.pv3_voltage_113),
                true
            )}
            ${createTextWithPopup(
                'pv3_current',
                41,
                150,
                !config.entities.pv3_current_114 || config.entities.pv3_current_114 === 'none' || [1, 2].includes(config.solar.mppts) || !data.statePV3Current.isValid(),
                'st3 left-align',
                data.solarColour,
                `${data.statePV3Current.toNum(1)} ${UnitOfElectricalCurrent.AMPERE}`,
                (e) => Utils.handlePopup(e, config.entities.pv3_current_114),
                true
            )}
            ${createTextWithPopup(
                'pv4_voltage',
                142,
                139,
                !config.entities.pv4_voltage_115 || config.entities.pv4_voltage_115 === 'none' || [1, 2, 3].includes(config.solar.mppts) || !data.statePV4Voltage.isValid(),
                'st3 left-align',
                data.solarColour,
                `${data.statePV4Voltage.toNum(1)} ${UnitOfElectricPotential.VOLT}`,
                (e) => Utils.handlePopup(e, config.entities.pv4_voltage_115),
                true
            )}
            ${createTextWithPopup(
                'pv4_current',
                142,
                150,
                !config.entities.pv4_current_116 || config.entities.pv4_current_116 === 'none' || [1, 2, 3].includes(config.solar.mppts) || !data.statePV4Current.isValid(),
                'st3 left-align',
                data.solarColour,
                `${data.statePV4Current.toNum(1)} ${UnitOfElectricalCurrent.AMPERE}`,
                (e) => Utils.handlePopup(e, config.entities.pv4_current_116),
                true
            )}
            ${createTextWithPopup(
                'environ_temp',
                1,
                32,
                !data.stateEnvironmentTemp.isValid(),
                config.entities?.environment_temp ? 'st3 left-align' : 'st12',
                data.solarColour,
                `${data.stateEnvironmentTemp.toNum(1)}°`,
                (e) => Utils.handlePopup(e, config.entities.environment_temp),
                true
            )}
        </svg>
    `;
}