import {html, svg} from 'lit';
import {localize} from '../localize/localize';
import {Utils} from '../helpers/utils';
import {AutarkyType, DataDto, InverterModel, sunsynkPowerFlowCardConfig} from '../types';
import {UnitOfElectricalCurrent, UnitOfElectricPotential, UnitOfEnergy, UnitOfPower} from '../const';

export const compactCard = (config: sunsynkPowerFlowCardConfig, inverterImg: string, data: DataDto) => {
    return html`
        <ha-card>
            <style>
                .essload-icon {
                    color: ${data.loadColour} !important;
                    --mdc-icon-size: 32px;
                }

                .essload_small-icon {
                    color: ${data.loadColour} !important;
                    --mdc-icon-size: 20px;
                }
            </style>
            <div class="container card">
                ${config.title ? html`<h1
                        style="text-align: center; color: ${config.title_colour || 'inherit'}; data.largeFont-size: ${config.title_size || '32px'};">
                    ${config.title}</h1>` : ''}
                <svg viewBox="-0.5 ${!config.show_solar ? (data.additionalLoad !== 0 || !config.show_battery ? 80 : 145.33) : -0.5} 483 ${!config.show_solar ? (config.show_battery ? (data.additionalLoad !== 0 ? 350 : 270.67) : 270.67) : (!config.show_battery ? (data.additionalLoad === 2 ? 350 : 300) : 406)}"
                     preserveAspectRatio="xMidYMid meet"
                     height="${data.panelMode === false ? `${!config.show_solar && !config.show_battery ? '270px' : !config.show_solar ? (data.additionalLoad !== 0 ? '330px' : '246px') : config.show_solar && !config.show_battery ? (data.additionalLoad === 2 ? '350px' : '300px') : `${data.cardHeight}`}` : `${!config.show_solar ? '75%' : '100%'}`}"
                     width="${data.panelMode === true ? `${data.cardWidth}` : '100%'}"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect x="304" y="203.5" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.loadColour}" pointer-events="all"/>
                    <rect x="205" y="116.5" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.solarColour}" pointer-events="all"
                          display="${config.solar.mppts === 1 ? 'none' : ''}"
                          class="${!config.show_solar ? 'st12' : ''}"/>
                    <rect x="205" y="290" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.batteryColour}" pointer-events="all"
                          display="${!config.show_battery ? 'none' : ''}"
                          class="${data.compactMode ? '' : 'st12'}"/>
                    <rect x="159" y="${data.compactMode ? '348' : '329.75'}" width="70"
                          height="${data.compactMode ? '50' : '70'}"
                          rx="${data.compactMode ? '7.5' : '10.5'}" ry="${data.compactMode ? '7.5' : '10.5'}"
                          fill="none"
                          stroke="${data.batteryColour}" pointer-events="all"
                          display="${!config.show_battery ? 'none' : ''}"
                          class="${data.compactMode ? 'st12' : ''}"/>
                    <rect x="103" y="203.5" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.gridColour}" pointer-events="all"
                          display="${!config.show_grid ? 'none' : ''}"/>
                    <rect id="pv1" x="${config.solar.mppts === 1 ? '205' : '154'}" y="54.5" width="70"
                          height="30" rx="4.5" ry="4.5" fill="none" stroke="${data.solarColour}"
                          pointer-events="all" class="${!config.show_solar ? 'st12' : ''}"/>
                    <rect id="pv2" x="254" y="54.5" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.solarColour}" pointer-events="all"
                          class="${!config.show_solar || config.solar.mppts === 1 ? 'st12' : ''}"/>
                    <rect id="pv3" x="78" y="54.5" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.solarColour}" pointer-events="all"
                          class="${!config.show_solar || [1, 2].includes(config.solar.mppts) ? 'st12' : ''}"/>
                    <rect id="pv4" x="330" y="54.5" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.solarColour}" pointer-events="all"
                          class="${!config.show_solar || [1, 2, 3].includes(config.solar.mppts) ? 'st12' : ''}"/>
                    <rect id="es-load1" x="406" y="116.5" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.loadColour}" pointer-events="all"
                          display="${data.additionalLoad === 1 ? '' : 'none'}"/>
                    <rect id="es-load1" x="406" y="116.5" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.loadColour}" pointer-events="all"
                          display="${data.additionalLoad === 2 ? '' : 'none'}"/>
                    <rect id="es-load2" x="406" y="290" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.loadColour}" pointer-events="all"
                          display="${data.additionalLoad === 2 ? '' : 'none'}"/>
                    <rect id="es-load4" x="405" y="127" width="35" height="20" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.loadColour}" pointer-events="all"
                          display="${data.additionalLoad === 4 ? '' : 'none'}"/>
                    <rect id="es-load4" x="441" y="127" width="35" height="20" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.loadColour}" pointer-events="all"
                          display="${data.additionalLoad === 4 ? '' : 'none'}"/>
                    <rect id="es-load4" x="405" y="290" width="35" height="20" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.loadColour}" pointer-events="all"
                          display="${data.additionalLoad === 4 ? '' : 'none'}"/>
                    <rect id="es-load4" x="441" y="290" width="35" height="20" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.loadColour}" pointer-events="all"
                          display="${data.additionalLoad === 4 ? '' : 'none'}"/>

                    <text id="duration" x="${data.compactMode ? '270' : '290'}" y="377.5"
                          class="${data.largeFont !== true ? 'st14' : 'st4'} left-align"
                          display="${!config.show_battery ? 'none' : ''}"
                          fill="${data.batteryEnergy === 0 || data.isFloating || data.batteryPower === 0 ? 'transparent' : `${data.batteryColour}`}">
                        ${data.batteryDuration}
                    </text>
                    <text id="duration_text" x="${data.compactMode ? '270' : '290'}" y="393.7" class="st3 left-align"
                          display="${!config.show_battery ? 'none' : ''}"
                          fill="${data.batteryEnergy === 0 || data.batteryPower <= 0 || data.isFloating ? 'transparent' : `${data.batteryColour}`}">
                        ${localize('common.runtime_to')} ${data.batteryCapacity}% @${data.formattedResultTime}
                    </text>
                    <text id="duration_text_charging" x="${data.compactMode ? '270' : '290'}" y="393.7"
                          class="st3 left-align"
                          display="${!config.show_battery ? 'none' : ''}"
                          fill="${data.batteryEnergy === 0 || data.batteryPower >= 0 || data.isFloating ? 'transparent' : `${data.batteryColour}`}">
                        ${localize('common.to')} ${data.batteryCapacity}% ${localize('common.charge')}
                            @${data.formattedResultTime}
                    </text>
                    <text id="floating" x="${data.compactMode ? '270' : '290'}" y="393.7" class="st3 left-align"
                          display="${!config.show_battery ? 'none' : ''}"
                          fill="${data.batteryEnergy === 0 || !data.isFloating ? 'transparent' : `${data.batteryColour}`}">
                        ${localize('common.battery_floating')}
                    </text>
                    <text id="daily_bat_charge" x="${data.compactMode ? '132' : '77.2'}" y="357.2"
                          class="st3 left-align"
                          fill="${data.batteryShowDaily !== true || !config.show_battery ? 'transparent' : `${data.batteryColour}`}">
                        ${localize('common.daily_charge')}
                    </text>
                    <text id="daily_bat_dischcharge" x="${data.compactMode ? '132' : '77.2'}" y="393.7"
                          class="st3 left-align"
                          fill="${data.batteryShowDaily !== true || !config.show_battery ? 'transparent' : `${data.batteryColour}`}">
                        ${localize('common.daily_discharge')}
                    </text>
                    <text id="daily_load" x="${[2, 4].includes(data.additionalLoad) ? '365' : '412'}"
                          y="${[2, 4].includes(data.additionalLoad) ? '189' : '282.1'}"
                          class="st3 left-align"
                          fill="${!data.loadShowDaily ? 'transparent' : `${data.loadColour}`}">
                        ${localize('common.daily_load')}
                    </text>
                    <text id="daily_grid_buy" x="5" y="282.1" class="st3 left-align"
                          fill="${data.gridShowDailyBuy !== true ? 'transparent' : `${data.gridColour}`}"
                          display="${!config.show_grid ? 'none' : ''}">
                        ${localize('common.daily_grid_buy')}
                    </text>
                    <text id="daily_grid_sell" x="5" y="179" class="st3 left-align"
                          fill="${data.gridShowDailySell !== true ? 'transparent' : `${data.gridColour}`}"
                          display="${!config.show_grid ? 'none' : ''}">
                        ${localize('common.daily_grid_sell')}
                    </text>
                    <text id="daily_solar" x="200" y="40" class="st3 left-align"
                          display="${config.solar.display_mode === 1 ? '' : 'none'}"
                          fill="${!data.solarShowDaily || !config.show_solar ? 'transparent' : `${data.solarColour}`}">
                        ${localize('common.daily_solar')}
                    </text>
                    <text id="remaining_solar" x="200" y="40" class="st3 left-align"
                          display="${config.solar.display_mode === 2 ? '' : 'none'}"
                          fill="${!data.solarShowDaily || !config.show_solar ? 'transparent' : `${data.solarColour}`}">
                        ${localize('common.daily_solar_left')}
                    </text>
                    <text id="total_solar_generation" x="200" y="40" class="st3 left-align"
                          display="${config.solar.display_mode === 3 ? '' : 'none'}"
                          fill="${!data.solarShowDaily || !config.show_solar ? 'transparent' : `${data.solarColour}`}">
                        ${localize('common.total_solar_generation')}
                    </text>
                    <text x="${config.solar.mppts === 1 ? '212.7' : '162'}" y="94" class="st3 st8"
                          display="${!config.show_solar ? 'none' : ''}" fill="${data.solarColour}">
                        ${config.solar.pv1_name}
                    </text>
                    <text x="264" y="94" class="st3 st8"
                          display="${!config.show_solar || config.solar.mppts === 1 ? 'none' : ''}"
                          fill="${data.solarColour}">${config.solar.pv2_name}
                    </text>
                    <text x="88" y="94" class="st3 st8"
                          display="${!config.show_solar || [1, 2].includes(config.solar.mppts) ? 'none' : ''}"
                          fill="${data.solarColour}">${config.solar.pv3_name}
                    </text>
                    <text x="340" y="94" class="st3 st8"
                          display="${!config.show_solar || [1, 2, 3].includes(config.solar.mppts) ? 'none' : ''}"
                          fill="${data.solarColour}">${config.solar.pv4_name}
                    </text>
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
                    <text id="es-load1" x="441" y="108" class="st3"
                          display="${[1, 2].includes(data.additionalLoad) ? '' : 'none'}"
                          fill="${data.loadColour}">${config.load?.load1_name ? `${config.load.load1_name}` : ''}
                    </text>
                    <text id="es-load2" x="441" y="330.5" class="st3"
                          display="${data.additionalLoad === 2 ? '' : 'none'}" fill="${data.loadColour}">
                        ${config.load?.load2_name ? `${config.load.load2_name}` : ''}
                    </text>
                    <text id="es-load4" x="423" y="156" class="st3 st8"
                          display="${data.additionalLoad === 4 ? '' : 'none'}" fill="${data.loadColour}">
                        ${config.load?.load1_name ? `${config.load.load1_name}` : ''}
                    </text>
                    <text id="es-load4" x="459" y="156" class="st3 st8"
                          display="${data.additionalLoad === 4 ? '' : 'none'}" fill="${data.loadColour}">
                        ${config.load?.load2_name ? `${config.load.load2_name}` : ''}
                    </text>
                    <text id="es-load4" x="423" y="320" class="st3 st8"
                          display="${data.additionalLoad === 4 ? '' : 'none'}" fill="${data.loadColour}">
                        ${config.load?.load3_name ? `${config.load.load3_name}` : ''}
                    </text>
                    <text id="es-load4" x="459" y="320" class="st3 st8"
                          display="${data.additionalLoad === 4 ? '' : 'none'}" fill="${data.loadColour}">
                        ${config.load?.load4_name ? `${config.load.load4_name}` : ''}
                    </text>
                    <text id="load-power-L1" x="375" y="241"
                          display="${config.inverter.three_phase && config.entities?.load_power_L1 ? '' : 'none'}"
                          class="st3 left-align" fill="${data.loadColour}">
                        ${config.load.auto_scale ? `${Utils.convertValue(data.loadPowerL1, data.decimalPlaces) || 0}` : `${data.loadPowerL1 || 0} ${UnitOfPower.WATT}`}
                    </text>
                    <text id="load-power-L2" x="375" y="254"
                          display="${config.inverter.three_phase && config.entities?.load_power_L2 ? '' : 'none'}"
                          class="st3 left-align" fill="${data.loadColour}">
                        ${config.load.auto_scale ? `${Utils.convertValue(data.loadPowerL2, data.decimalPlaces) || 0}` : `${data.loadPowerL2 || 0} ${UnitOfPower.WATT}`}
                    </text>
                    <text id="load-power-L3" x="375" y="267"
                          display="${config.inverter.three_phase && config.entities?.load_power_L3 ? '' : 'none'}"
                          class="st3 left-align" fill="${data.loadColour}">
                        ${config.load.auto_scale ? `${Utils.convertValue(data.loadPowerL3, data.decimalPlaces) || 0}` : `${data.loadPowerL3 || 0} ${UnitOfPower.WATT}`}
                    </text>
                    <text id="grid-power-L1" x="80" y="241"
                          display="${config.inverter.three_phase ? '' : 'none'}"
                          class="${!config.show_grid ? 'st12' : 'st3 left-align'}"
                          fill="${data.gridColour}">
                        ${config.load.auto_scale ? `${Utils.convertValue(data.gridPower, data.decimalPlaces) || 0}` : `${data.gridPower || 0} ${UnitOfPower.WATT}`}
                    </text>
                    <text id="grid-power-L2" x="80" y="254"
                          display="${config.inverter.three_phase && config.entities?.grid_ct_power_L2 ? '' : 'none'}"
                          class="${!config.show_grid ? 'st12' : 'st3 left-align'}"
                          fill="${data.gridColour}">
                        ${config.load.auto_scale ? `${Utils.convertValue(data.gridPowerL2, data.decimalPlaces) || 0}` : `${data.gridPowerL2 || 0} ${UnitOfPower.WATT}`}
                    </text>
                    <text id="grid-power-L3" x="80" y="267"
                          display="${config.inverter.three_phase && config.entities?.grid_ct_power_L3 ? '' : 'none'}"
                          class="${!config.show_grid ? 'st12' : 'st3 left-align'}"
                          fill="${data.gridColour}">
                        ${config.load.auto_scale ? `${Utils.convertValue(data.gridPowerL3, data.decimalPlaces) || 0}` : `${data.gridPowerL3 || 0} ${UnitOfPower.WATT}`}
                    </text>
                    <text x="169" y="${!config.battery.show_remaining_energy ? '320' : '311'}" class="st3 left-align"
                          display="${!config.show_battery || data.compactMode ? 'none' : ''}"
                          fill="${data.batteryColour}">
                        ${data.batteryStateMsg}
                    </text>
                    <text x="${data.compactMode ? '270' : !config.entities?.battery_status ? '193' : '169'}"
                          y="${data.compactMode ? '338' : '323'}"
                          class="${!config.entities?.battery_status && !data.compactMode ? 'st3' : 'st3 left-align'}"
                          display="${!config.show_battery || !config.battery.show_remaining_energy ? 'none' : ''}"
                          fill="${data.batteryColour}">
                        ${Utils.toNum((data.batteryEnergy * (data.stateBatterySoc.toNum(2) / 100) / 1000), 2)}
                        ${UnitOfEnergy.KILO_WATT_HOUR}
                    </text>
                    <text id="battery_soc_184" x="${data.compactMode ? '348.5' : '368.5'}" y="351"
                          fill=${data.batteryColour}
                          class="${config.battery.hide_soc || !config.show_battery ? 'st12' : 'st14 left-align'}"
                          display="${[InverterModel.GoodweGridMode, InverterModel.Goodwe, InverterModel.Huawei].includes(data.inverterModel) && config.battery?.shutdown_soc_offgrid ? '' : 'none'}">
                        ${data.batteryShutdown} %
                    </text>
                    <text id="battery_soc_184" x="${data.compactMode ? '348.5' : '368.5'}" y="364"
                          fill=${data.batteryColour}
                          class="${config.battery.hide_soc || !config.show_battery ? 'st12' : 'st14 left-align'}"
                          display="${[InverterModel.GoodweGridMode, InverterModel.Goodwe, InverterModel.Huawei].includes(data.inverterModel) && config.battery?.shutdown_soc_offgrid ? '' : 'none'}">
                        ${data.shutdownOffGrid} %
                    </text>

                    <circle id="standby" cx="220" cy="260" r="3.5" fill="${data.inverterStateColour}"/>
                    <circle id="bat" cx="${data.compactMode ? '238.5' : '162'}"
                            cy="${data.compactMode
                                    ? '326'
                                    : !config.battery.show_remaining_energy
                                            ? '319'
                                            : '310'
                            }"
                            r="3.5"
                            display="${config.entities?.battery_status === 'none' || !config.entities?.battery_status || !config.show_battery ? 'none' : ''}"
                            fill="${data.batteryStateColour}"/>

                    <svg id="pv1-flow">
                        <path id="pv1-line"
                              d="${config.solar.mppts === 1 ? 'M 239.23 84 L 239 190' : 'M 187 84 L 187 122 Q 187 132 195 132 L 205 132.03'}"
                              class="${!config.show_solar ? 'st12' : ''}" fill="none"
                              stroke="${data.solarColour}" stroke-width="${data.pv1LineWidth}" stroke-miterlimit="10"
                              pointer-events="stroke"/>
                        <circle id="pv1-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.pv1LineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                class="${!config.show_solar ? 'st12' : ''}"
                                fill="${Math.round(data.pv1PowerWatts) <= 0 ? 'transparent' : `${data.solarColour}`}">
                            <animateMotion dur="${data.durationCur['pv1']}s" repeatCount="indefinite"
                                           keyPoints="0;1"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#pv1-line"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <svg id="pv2-flow">
                        <path id="pv2-line" d="M 289 84.5 L 289 125 Q 289 132 282 132 L 275 132"
                              class="${!config.show_solar || config.solar.mppts === 1 ? 'st12' : ''}"
                              fill="none" stroke="${data.solarColour}" stroke-width="${data.pv2LineWidth}"
                              stroke-miterlimit="10"
                              pointer-events="stroke"/>
                        <circle id="pv2-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.pv2LineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                class="${!config.show_solar || config.solar.mppts === 1 ? 'st12' : ''}"
                                fill="${Math.round(data.pv2PowerWatts) <= 0 ? 'transparent' : `${data.solarColour}`}">
                            <animateMotion dur="${data.durationCur['pv2']}s" repeatCount="indefinite"
                                           keyPoints="0;1"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#pv2-line"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <svg id="pv3-flow">
                        <path id="pv3-line" d="M 113 84 L 113 125 Q 113 132 120 132 L 205 132.03"
                              class="${!config.show_solar || [1, 2].includes(config.solar.mppts) ? 'st12' : ''}"
                              fill="none" stroke="${data.solarColour}" stroke-width="${data.pv3LineWidth}"
                              stroke-miterlimit="10"
                              pointer-events="stroke"/>
                        <circle id="pv3-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.pv3LineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                class="${!config.show_solar || [1, 2].includes(config.solar.mppts) ? 'st12' : ''}"
                                fill="${Math.round(data.pv3PowerWatts) <= 0 ? 'transparent' : `${data.solarColour}`}">
                            <animateMotion dur="${data.durationCur['pv3']}s" repeatCount="indefinite"
                                           keyPoints="0;1"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#pv3-line"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <svg id="pv4-flow">
                        <path id="pv4-line" d="M 365 85 L 365 125 Q 365 132 358 132 L 275 132"
                              class="${!config.show_solar || [1, 2, 3].includes(config.solar.mppts) ? 'st12' : ''}"
                              fill="none" stroke="${data.solarColour}" stroke-width="${data.pv4LineWidth}"
                              stroke-miterlimit="10"
                              pointer-events="stroke"/>
                        <circle id="pv4-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.pv4LineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                class="${!config.show_solar || [1, 2, 3].includes(config.solar.mppts) ? 'st12' : ''}"
                                fill="${Math.round(data.pv4PowerWatts) <= 0 ? 'transparent' : `${data.solarColour}`}">
                            <animateMotion dur="${data.durationCur['pv4']}s" repeatCount="indefinite"
                                           keyPoints="0;1"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#pv4-line"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <svg id="battery-flow">
                        <path id="bat-line"
                              d="${data.compactMode ? 'M 239 250 L 239 290' : 'M 239 250 L 239 324'}"
                              class="${!config.show_battery ? 'st12' : ''}" fill="none"
                              stroke="${data.batteryColour}" stroke-width="${data.batLineWidth}" stroke-miterlimit="10"
                              pointer-events="stroke"/>
                        <circle id="power-dot-charge" cx="0" cy="0"
                                r="${Math.min(2 + data.batLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                class="${!config.show_battery ? 'st12' : ''}"
                                fill="${data.batteryPower < 0 || data.batteryPower === 0 ? 'transparent' : `${data.batteryColour}`}">
                            <animateMotion dur="${data.durationCur['battery']}s" repeatCount="indefinite"
                                           keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#bat-line"/>
                            </animateMotion>
                        </circle>
                        <circle id="power-dot-discharge" cx="0" cy="0"
                                r="${Math.min(2 + data.batLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                class="${!config.show_battery ? 'st12' : ''}"
                                fill="${data.batteryPower > 0 || data.batteryPower === 0 ? 'transparent' : `${data.batteryColour}`}">
                            <animateMotion dur="${data.durationCur['battery']}s" repeatCount="indefinite"
                                           keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#bat-line"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <svg id="solar-flow">
                        <path id="so-line" d="M 239 190 L 239 147"
                              class="${!config.show_solar || config.solar.mppts === 1 ? 'st12' : ''}"
                              fill="none" stroke="${data.solarColour}" stroke-width="${data.solarLineWidth}"
                              stroke-miterlimit="10"
                              pointer-events="stroke"/>
                        <circle id="so-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.solarLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                class="${!config.show_solar || config.solar.mppts === 1 ? 'st12' : ''}"
                                fill="${data.totalPV === 0 ? 'transparent' : `${data.solarColour}`}">
                            <animateMotion dur="${data.durationCur['solar']}s" repeatCount="indefinite"
                                           keyPoints="1;0"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#so-line"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <svg id="grid-flow">
                        <path id="grid-line" d="M 173 218 L 214 218" fill="none" stroke="${data.gridColour}"
                              stroke-width="${data.gridLineWidth}" stroke-miterlimit="10" pointer-events="stroke"
                              display="${!config.show_grid ? 'none' : ''}"/>
                        <circle id="grid-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                fill="${data.totalGridPower < 0 || data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}"
                                display="${!config.show_grid ? 'none' : ''}">
                            <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                           keyPoints="0;1"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#grid-line"/>
                            </animateMotion>
                        </circle>
                        <circle id="grid-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                fill="${data.totalGridPower > 0 || data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}"
                                display="${!config.show_grid ? 'none' : ''}">
                            <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                           keyPoints="1;0"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#grid-line"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <svg id="grid1-flow">
                        <path id="grid-line1" d="M 103 218 L 64.5 218" fill="none" stroke="${data.gridColour}"
                              stroke-width="${data.gridLineWidth}" stroke-miterlimit="10" pointer-events="stroke"
                              display="${!config.show_grid ? 'none' : ''}"/>
                        <circle id="grid-dot1" cx="0" cy="0"
                                r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                fill="${data.totalGridPower < 0 || data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}"
                                display="${!config.show_grid ? 'none' : ''}">
                            <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                           keyPoints="1;0"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#grid-line1"/>
                            </animateMotion>
                        </circle>
                        <circle id="grid-dot1" cx="0" cy="0"
                                r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                fill="${data.totalGridPower > 0 || data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}"
                                display="${!config.show_grid ? 'none' : ''}">
                            <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                           keyPoints="0;1"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#grid-line1"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <svg id="load-flow">
                        <path id="es-line" d="M 304 218.5 L 264.7 218.5" fill="none" stroke="${data.loadColour}"
                              stroke-width="${data.loadLineWidth}" stroke-miterlimit="10" pointer-events="stroke"/>
                        <circle id="es-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.loadLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                fill="${data.essentialPower === 0 ? 'transparent' : `${data.loadColour}`}">
                            <animateMotion dur="${data.durationCur['load']}s" repeatCount="indefinite"
                                           keyPoints="1;0"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#es-line"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <svg id="load-flow1">
                        <path id="es-line1" d="M 374 218.5 L 402.38 218.5" fill="none" stroke="${data.loadColour}"
                              stroke-width="${data.loadLineWidth}" stroke-miterlimit="10" pointer-events="stroke"/>
                        <circle id="es-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.loadLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                fill="${data.essentialPower === 0 ? 'transparent' : `${data.loadColour}`}">
                            <animateMotion dur="${data.durationCur['load']}s" repeatCount="indefinite"
                                           keyPoints="0;1"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#es-line1"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <path id="es-load1" d="M 441 180 L 441 147" class="${data.additionalLoad === 1 ? '' : 'st12'}"
                          fill="none" stroke="${data.loadColour}" stroke-width="1" stroke-miterlimit="10"
                          pointer-events="stroke"/>
                    <path id="es-load1" d="M 441 180 L 441 147"
                          class="${[2, 4].includes(data.additionalLoad) ? '' : 'st12'}" fill="none"
                          stroke="${data.loadColour}" stroke-width="1" stroke-miterlimit="10"
                          pointer-events="stroke"/>
                    <path id="es-load2" d="M 441 290 L 441 257"
                          class="${[2, 4].includes(data.additionalLoad) ? '' : 'st12'}" fill="none"
                          stroke="${data.loadColour}" stroke-width="1" stroke-miterlimit="10"
                          pointer-events="stroke"/>

                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_oven_top" x="368" y="113" width="36"
                         height="36" viewBox="0 0 32 32"
                         opacity="${data.iconEssentialLoad1 === 'oven' && [1, 2].includes(data.additionalLoad) ? '1' : '0'}">
                        <path display="${data.additionalLoad === 0 ? 'none' : ''}" fill="${data.loadColour}"
                              d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17Zm24 0A2.5 2.5 0 0 0 24.5 5h-17A2.5 2.5 0 0 0 5 7.5V11h22V7.5Zm0 17V13H5v11.5A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5Zm-17-15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM23.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM9 23v-6h14v6H9Zm-.5-8A1.5 1.5 0 0 0 7 16.5v7A1.5 1.5 0 0 0 8.5 25h15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-15Z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_oven_bottom" x="368" y="287" width="36"
                         height="36" viewBox="0 0 32 32"
                         opacity="${data.iconEssentialLoad2 === 'oven' && data.additionalLoad === 2 ? '1' : '0'}">
                        <path display="${data.additionalLoad === 0 ? 'none' : ''}" fill="${data.loadColour}"
                              d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17Zm24 0A2.5 2.5 0 0 0 24.5 5h-17A2.5 2.5 0 0 0 5 7.5V11h22V7.5Zm0 17V13H5v11.5A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5Zm-17-15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM23.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM9 23v-6h14v6H9Zm-.5-8A1.5 1.5 0 0 0 7 16.5v7A1.5 1.5 0 0 0 8.5 25h15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-15Z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_pump_top" x="368" y="113" width="36"
                         height="36" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad1 === 'pump' && [1, 2].includes(data.additionalLoad) ? '1' : '0'}">
                        <path display="${data.additionalLoad === 0 ? 'none' : ''}" fill="${data.loadColour}"
                              d="M3 17h4.1q-.425-.425-.787-.925T5.675 15H3v2Zm9 0q2.075 0 3.538-1.463T17 12q0-2.075-1.463-3.538T12 7Q9.925 7 8.462 8.463T7 12q0 2.075 1.463 3.538T12 17Zm6.325-8H21V7h-4.1q.425.425.788.925T18.325 9ZM1 20v-8h2v1h2.075q-.05-.25-.063-.488T5 12q0-2.925 2.038-4.963T12 5h9V4h2v8h-2v-1h-2.075q.05.25.063.488T19 12q0 2.925-2.038 4.963T12 19H3v1H1Zm2-3v-2v2Zm18-8V7v2Zm-9 3Zm0 3q-.825 0-1.413-.588T10 13q0-.575.238-1.137t.912-1.613L12 9l.85 1.25q.675 1.05.913 1.613T14 13q0 .825-.588 1.413T12 15Z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_pump_bottom" x="368" y="287" width="36"
                         height="36" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad2 === 'pump' && data.additionalLoad === 2 ? '1' : '0'}">
                        <path display="${data.additionalLoad === 0 ? 'none' : ''}" fill="${data.loadColour}"
                              d="M3 17h4.1q-.425-.425-.787-.925T5.675 15H3v2Zm9 0q2.075 0 3.538-1.463T17 12q0-2.075-1.463-3.538T12 7Q9.925 7 8.462 8.463T7 12q0 2.075 1.463 3.538T12 17Zm6.325-8H21V7h-4.1q.425.425.788.925T18.325 9ZM1 20v-8h2v1h2.075q-.05-.25-.063-.488T5 12q0-2.925 2.038-4.963T12 5h9V4h2v8h-2v-1h-2.075q.05.25.063.488T19 12q0 2.925-2.038 4.963T12 19H3v1H1Zm2-3v-2v2Zm18-8V7v2Zm-9 3Zm0 3q-.825 0-1.413-.588T10 13q0-.575.238-1.137t.912-1.613L12 9l.85 1.25q.675 1.05.913 1.613T14 13q0 .825-.588 1.413T12 15Z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_ac_top" x="374" y="116" width="30"
                         height="30" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad1 === 'aircon' && [1, 2].includes(data.additionalLoad) ? '1' : '0'}">
                        <path display="${data.additionalLoad === 0 ? 'none' : ''}" fill="${data.loadColour}"
                              d="M6.59.66c2.34-1.81 4.88.4 5.45 3.84c.43 0 .85.12 1.23.34c.52-.6.98-1.42.8-2.34c-.42-2.15 1.99-3.89 4.28-.92c1.81 2.34-.4 4.88-3.85 5.45c0 .43-.11.86-.34 1.24c.6.51 1.42.97 2.34.79c2.13-.42 3.88 1.98.91 4.28c-2.34 1.81-4.88-.4-5.45-3.84c-.43 0-.85-.13-1.22-.35c-.52.6-.99 1.43-.81 2.35c.42 2.14-1.99 3.89-4.28.92c-1.82-2.35.4-4.89 3.85-5.45c0-.43.13-.85.35-1.23c-.6-.51-1.42-.98-2.35-.8c-2.13.42-3.88-1.98-.91-4.28M5 16h2a2 2 0 0 1 2 2v6H7v-2H5v2H3v-6a2 2 0 0 1 2-2m0 2v2h2v-2H5m7.93-2H15l-2.93 8H10l2.93-8M18 16h3v2h-3v4h3v2h-3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_ac_bottom" x="374" y="289" width="30"
                         height="30" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad2 === 'aircon' && data.additionalLoad === 2 ? '1' : '0'}">
                        <path display="${data.additionalLoad === 0 ? 'none' : ''}" fill="${data.loadColour}"
                              d="M6.59.66c2.34-1.81 4.88.4 5.45 3.84c.43 0 .85.12 1.23.34c.52-.6.98-1.42.8-2.34c-.42-2.15 1.99-3.89 4.28-.92c1.81 2.34-.4 4.88-3.85 5.45c0 .43-.11.86-.34 1.24c.6.51 1.42.97 2.34.79c2.13-.42 3.88 1.98.91 4.28c-2.34 1.81-4.88-.4-5.45-3.84c-.43 0-.85-.13-1.22-.35c-.52.6-.99 1.43-.81 2.35c.42 2.14-1.99 3.89-4.28.92c-1.82-2.35.4-4.89 3.85-5.45c0-.43.13-.85.35-1.23c-.6-.51-1.42-.98-2.35-.8c-2.13.42-3.88-1.98-.91-4.28M5 16h2a2 2 0 0 1 2 2v6H7v-2H5v2H3v-6a2 2 0 0 1 2-2m0 2v2h2v-2H5m7.93-2H15l-2.93 8H10l2.93-8M18 16h3v2h-3v4h3v2h-3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_boiler_top" x="371" y="113" width="36"
                         height="36" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad1 === 'boiler' && [1, 2].includes(data.additionalLoad) ? '1' : '0'}">
                        <path display="${data.additionalLoad === 0 ? 'none' : ''}" fill="${data.loadColour}"
                              d="M9.3 10.775q0 .475.163.925t.462.825q.05-.3.2-.588t.375-.487L12 10l1.475 1.475q.225.2.375.475t.2.575q.275-.375.487-.8t.213-.9q0-.475-.15-.913t-.45-.812q-.275.125-.563.2T13 9.375q-.75 0-1.375-.425t-.95-1.125q-.3.3-.55.637t-.438.713Q9.5 9.55 9.4 9.95t-.1.825ZM12 12.1l-.425.425q-.1.1-.138.2t-.037.225q0 .25.175.4t.425.15q.25 0 .425-.15t.175-.4q0-.125-.037-.225t-.138-.2L12 12.1ZM12 5v1.9q0 .425.3.713t.725.287q.275 0 .5-.162t.4-.388l.175-.25q1.025.575 1.588 1.563t.562 2.162q0 1.75-1.25 2.963T12 15q-1.75 0-2.975-1.225T7.8 10.8q0-1.925 1.225-3.425T12 5ZM6 22q-.825 0-1.413-.588T4 20V6q0-1.65 1.175-2.825T8 2h8q1.65 0 2.825 1.175T20 6v14q0 .825-.588 1.413T18 22H6Zm0-4v2h12v-2q-.75 0-1.2.5T15 19q-1.35 0-1.763-.5T12 18q-.825 0-1.238.5T9 19q-1.35 0-1.763-.5T6 18Zm3-1q.825 0 1.238-.5T12 16q1.35 0 1.8.5t1.2.5q.75 0 1.2-.5T18 16V6q0-.825-.588-1.413T16 4H8q-.825 0-1.413.588T6 6v10q1.35 0 1.763.5T9 17Z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_boiler_bottom" x="371" y="287" width="36"
                         height="36" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad2 === 'boiler' && data.additionalLoad === 2 ? '1' : '0'}">
                        <path display="${data.additionalLoad === 0 ? 'none' : ''}" fill="${data.loadColour}"
                              d="M9.3 10.775q0 .475.163.925t.462.825q.05-.3.2-.588t.375-.487L12 10l1.475 1.475q.225.2.375.475t.2.575q.275-.375.487-.8t.213-.9q0-.475-.15-.913t-.45-.812q-.275.125-.563.2T13 9.375q-.75 0-1.375-.425t-.95-1.125q-.3.3-.55.637t-.438.713Q9.5 9.55 9.4 9.95t-.1.825ZM12 12.1l-.425.425q-.1.1-.138.2t-.037.225q0 .25.175.4t.425.15q.25 0 .425-.15t.175-.4q0-.125-.037-.225t-.138-.2L12 12.1ZM12 5v1.9q0 .425.3.713t.725.287q.275 0 .5-.162t.4-.388l.175-.25q1.025.575 1.588 1.563t.562 2.162q0 1.75-1.25 2.963T12 15q-1.75 0-2.975-1.225T7.8 10.8q0-1.925 1.225-3.425T12 5ZM6 22q-.825 0-1.413-.588T4 20V6q0-1.65 1.175-2.825T8 2h8q1.65 0 2.825 1.175T20 6v14q0 .825-.588 1.413T18 22H6Zm0-4v2h12v-2q-.75 0-1.2.5T15 19q-1.35 0-1.763-.5T12 18q-.825 0-1.238.5T9 19q-1.35 0-1.763-.5T6 18Zm3-1q.825 0 1.238-.5T12 16q1.35 0 1.8.5t1.2.5q.75 0 1.2-.5T18 16V6q0-.825-.588-1.413T16 4H8q-.825 0-1.413.588T6 6v10q1.35 0 1.763.5T9 17Z"/>
                    </svg>

                    <g display="${[0, 4].includes(data.additionalLoad) ? 'none' : ''}">
                        <foreignObject x="371" y="114" width="36" height="36" style="position: fixed; ">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed; ">
                                <ha-icon icon="${data.iconEssentialLoad1}" class="essload-icon"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>

                    <g display="${[0, 1, 4].includes(data.additionalLoad) ? 'none' : ''}">
                        <foreignObject x="371" y="288" width="36" height="36" style="position:fixed; ">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed; ">
                                <ha-icon icon="${data.iconEssentialLoad2}" class="essload-icon"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>

                    <g display="${data.additionalLoad === 4 ? '' : 'none'}">
                        <foreignObject x="412" y="101" width="30" height="30" style="position: fixed; ">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed; ">
                                <ha-icon icon="${data.iconEssentialLoad1}" class="essload_small-icon"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>

                    <g display="${data.additionalLoad === 4 ? '' : 'none'}">
                        <foreignObject x="449" y="101" width="30" height="30" style="position: fixed; ">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed; ">
                                <ha-icon icon="${data.iconEssentialLoad2}" class="essload_small-icon"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>

                    <g display="${data.additionalLoad === 4 ? '' : 'none'}">
                        <foreignObject x="412" y="264" width="30" height="30" style="position: fixed; ">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed; ">
                                <ha-icon icon="${data.iconEssentialLoad3}" class="essload_small-icon"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>

                    <g display="${data.additionalLoad === 4 ? '' : 'none'}">
                        <foreignObject x="449" y="264" width="30" height="30" style="position: fixed; ">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed; ">
                                <ha-icon icon="${data.iconEssentialLoad4}" class="essload_small-icon"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>

                    <svg xmlns="http://www.w3.org/2000/svg" id="sun" x="154" y="10" width="40" height="40"
                         viewBox="0 0 24 24">
                        <path class="${!config.show_solar ? 'st12' : ''}" fill="${data.solarColour}"
                              d="M11.45 2v3.55L15 3.77L11.45 2m-1 6L8 10.46l3.75 1.25L10.45 8M2 11.45L3.77 15l1.78-3.55H2M10 2H2v8c.57.17 1.17.25 1.77.25c3.58.01 6.49-2.9 6.5-6.5c-.01-.59-.1-1.18-.27-1.75m7 20v-6h-3l5-9v6h3l-5 9Z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="bat" x="${data.compactMode ? '212.5' : '232.5'}"
                         y="325.5" width="78.75"
                         height="78.75" preserveAspectRatio="none"
                         viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="bLg" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                      stop-color="${Number(data.pvPercentageBat) > 0 ? data.solarColour : (Number(data.gridPercentageBat) > 0 ? data.gridColour : data.batteryColour)}"/>
                                <stop offset="${data.pvPercentageBat < 2 ? 0 : data.pvPercentageBat}%"
                                      stop-color="${Number(data.pvPercentageBat) > 0 ? data.solarColour : (Number(data.gridPercentageBat) > 0 ? data.gridColour : data.batteryColour)}"/>
                                <stop offset="${data.pvPercentageBat < 2 ? 0 : data.pvPercentageBat}%"
                                      stop-color="${Number(data.gridPercentageBat) > 0 ? data.gridColour : data.batteryColour}"/>
                                <stop offset="${(Number(data.pvPercentageBat < 2 ? 0 : data.pvPercentageBat) + Number(data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat))}%"
                                      stop-color="${Number(data.gridPercentageBat) > 0 ? `${data.gridColour}` : `${data.batteryColour}`}"/>
                                <stop offset="${(Number(data.pvPercentageBat < 2 ? 0 : data.pvPercentageBat) + Number(data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat))}%"
                                      stop-color="${Number(data.pvPercentageBat) === 100 ? data.solarColour : (Number(data.gridPercentageBat) === 100 ? data.gridColour : data.batteryColour)}"/>
                                <stop offset="100%"
                                      stop-color="${Number(data.pvPercentageBat) === 100 ? data.solarColour : (Number(data.gridPercentageBat) === 100 ? data.gridColour : data.batteryColour)}"/>
                            </linearGradient>
                        </defs>
                        <path class="${!config.show_battery ? 'st12' : ''}"
                              fill="${config.battery.dynamic_colour ? 'url(#bLg)' : data.batteryColour}"
                              d="${config.battery.linear_gradient ? data.battery0 : data.batteryIcon}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="bat" x="${data.compactMode ? '212.5' : '232.5'}"
                         y="325.5" width="78.75"
                         height="78.75" preserveAspectRatio="none"
                         viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="sLg" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                      stop-color="red"/>
                                <stop offset="100%"
                                      stop-color="${data.stopColour}"/>
                            </linearGradient>
                        </defs>
                        <path class="${!config.show_battery ? 'st12' : ''}"
                              fill="${config.battery.linear_gradient ? 'url(#sLg)' : data.batteryColour}"
                              display="${!config.battery.linear_gradient ? 'none' : ''}"
                              d="${data.batteryCharge}"/>
                    </svg>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_connected_status_194)}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="transmission_on" x="-0.5" y="187.5"
                             width="64.5" height="64.5" viewBox="0 0 24 24">
                            <path class="${['off', '0', 'off-grid', 'off grid', 'offgrid'].includes(data.gridStatus.toLowerCase()) ? 'st12' : ''}"
                                  fill="${data.gridColour}"
                                  display="${!config.show_grid || data.totalGridPower < 0 ? 'none' : ''}"
                                  d="m8.28 5.45l-1.78-.9L7.76 2h8.47l1.27 2.55l-1.78.89L15 4H9l-.72 1.45M18.62 8h-4.53l-.79-3h-2.6l-.79 3H5.38L4.1 10.55l1.79.89l.73-1.44h10.76l.72 1.45l1.79-.89L18.62 8m-.85 14H15.7l-.24-.9L12 15.9l-3.47 5.2l-.23.9H6.23l2.89-11h2.07l-.36 1.35L12 14.1l1.16-1.75l-.35-1.35h2.07l2.89 11m-6.37-7l-.9-1.35l-1.18 4.48L11.4 15m3.28 3.12l-1.18-4.48l-.9 1.36l2.08 3.12Z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" id="transmission_off" x="-0.5" y="187.5"
                             width="64.5" height="64.5" viewBox="0 0 24 24">
                            <path class="${['on', '1', 'on-grid', 'on grid', 'ongrid'].includes(data.gridStatus.toLowerCase()) ? 'st12' : ''}"
                                  fill="${data.gridOffColour}" display="${!config.show_grid ? 'none' : ''}"
                                  d="M22.1 21.5L2.4 1.7L1.1 3l5 5h-.7l-1.3 2.5l1.8.9l.7-1.4h1.5l1 1l-2.9 11h2.1l.2-.9l3.5-5.2l3.5 5.2l.2.9h2.1l-.8-3.2l3.9 3.9l1.2-1.2M9.3 18.1l1.2-4.5l.9 1.3l-2.1 3.2m5.4 0L12.6 15l.2-.3l1.3 1.3l.6 2.1m-.5-7.1h.7l.2.9l-.9-.9m-.1-3h4.5l1.3 2.6l-1.8.9l-.7-1.5h-4.2l-3-3l.5-2h2.6l.8 3M8.4 5.2L6.9 3.7L7.8 2h8.5l1.3 2.5l-1.8.9L15 4H9l-.6 1.2Z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" id="grid_export" x="-0.5" y="187.5"
                             width="64.5" height="64.5" viewBox="0 0 24 24">
                            <path class="${['off', '0', 'off-grid', 'off grid'].includes(data.gridStatus.toLowerCase()) ? 'st12' : ''}"
                                  fill="${data.gridColour}"
                                  display="${!config.show_grid || data.totalGridPower >= 0 ? 'none' : ''}"
                                  d="m5.39 5.45-1.78-.9L4.87 2h8.47l1.27 2.55-1.78.89L12.11 4h-6zM15.73 8H11.2l-.79-3h-2.6L7 8H2.5l-1.29 2.55 1.79.89.73-1.44H14.5l.71 1.45 1.79-.89zm-.85 14h-2.07l-.24-.9-3.46-5.2-3.47 5.2-.23.9H3.34l2.89-11h2.07l-.36 1.35 1.17 1.75 1.16-1.75-.35-1.35H12zm-6.38-7-.89-1.35-1.18 4.48zm3.29 3.12-1.18-4.48-.9 1.36zM15 16l4-4v3H23v2h-4v3z"/>
                        </svg>
                    </a>
                    <svg xmlns="http://www.w3.org/2000/svg" id="essen" x="${data.essIconSize === 1 ? "405" : "402"}"
                         y="${data.essIconSize === 1 ? "186" : "177.5"}" width="${data.essIconSize === 1 ? "75" : "79"}"
                         height="${data.essIconSize === 1 ? "75" : "79"}"
                         viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="Lg" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                      stop-color="${Number(data.batteryPercentage) > 0 ? data.batteryColour : (Number(data.pvPercentage) > 0 ? data.solarColour : data.gridColour)}"/>
                                <stop offset="${data.batteryPercentage < 2 ? 0 : data.batteryPercentage}%"
                                      stop-color="${Number(data.batteryPercentage) > 0 ? data.batteryColour : (Number(data.pvPercentage) > 0 ? data.solarColour : data.gridColour)}"/>
                                <stop offset="${data.batteryPercentage < 2 ? 0 : data.batteryPercentage}%"
                                      stop-color="${Number(data.pvPercentage) > 0 ? data.solarColour : data.gridColour}"/>
                                <stop offset="${(Number(data.batteryPercentage < 2 ? 0 : data.batteryPercentage) + Number(data.pvPercentage < 2 ? 0 : data.pvPercentage))}%"
                                      stop-color="${Number(data.pvPercentage) > 0 ? `${data.solarColour}` : `${data.gridColour}`}"/>
                                <stop offset="${(Number(data.batteryPercentage < 2 ? 0 : data.batteryPercentage) + Number(data.pvPercentage < 2 ? 0 : data.pvPercentage))}%"
                                      stop-color="${Number(data.batteryPercentage) === 100 ? data.batteryColour : (Number(data.pvPercentage) === 100 ? data.solarColour : data.gridColour)}"/>
                                <stop offset="100%"
                                      stop-color="${Number(data.batteryPercentage) === 100 ? data.batteryColour : (Number(data.pvPercentage) === 100 ? data.solarColour : data.gridColour)}"/>
                            </linearGradient>
                        </defs>
                        <path fill="${config.load.dynamic_colour ? 'url(#Lg)' : data.loadColour}"
                              d="${data.essIcon}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" x="213.5" y="179.5" width="54"
                         height="79" viewBox="0 0 74 91" preserveAspectRatio="xMidYMid meet"
                         opacity="${!data.genericInverterImage ? 0 : 1}">
                        <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)"
                           fill="${data.inverterColour}" stroke="none">
                            <path d="M35 887 l-27 -23 0 -404 0 -404 27 -23 c26 -23 28 -23 329 -23 284 0 305 1 327 19 l24 19 0 412 0 412 -24 19 c-22 18 -43 19 -327 19 -301 0 -303 0 -329 -23z m585 -157 l0 -80 -255 0 -255 0 0 80 0 80 255 0 255 0 0 -80z m-242 -229 c44 -34 40 -46 -14 -46 -60 0 -97 -38 -93 -94 5 -64 -23 -80 -35 -20 -9 44 24 113 63 134 35 18 34 15 21 50 -11 29 -14 30 58 -24z m110 -129 c4 -51 -19 -97 -59 -117 -27 -14 -30 -20 -23 -48 l6 -31 -51 43 c-29 24 -49 46 -46 49 3 4 23 5 44 3 58 -4 95 32 97 95 3 60 1 57 17 52 6 -3 13 -23 15 -46z"/>
                        </g>
                    </svg>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.use_timer_248)}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="timer" x="267.7" y="243.3" width="18"
                             height="18" viewBox="0 0 24 24">
                            <path display="${data.stateUseTimer.state == 'on' && data.enableTimer !== false ? '' : 'none'}"
                                  fill="${data.inverterColour}"
                                  d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" id="timer_off" x="267.7" y="243.3" width="18"
                             height="18" viewBox="0 0 24 24">
                            <path display="${data.stateUseTimer.state == 'off' && data.enableTimer !== false ? '' : 'none'}"
                                  fill="${data.inverterColour}"
                                  d="m19.95 17.15l-1.5-1.5q.275-.675.413-1.337T19 13q0-2.9-2.05-4.95T12 6q-.6 0-1.275.125t-1.4.4l-1.5-1.5q.95-.5 2.012-.763T12 4q1.5 0 2.938.5t2.712 1.45l1.4-1.4l1.4 1.4l-1.4 1.4q.95 1.275 1.45 2.713T21 13q0 1.05-.263 2.087t-.787 2.063ZM13 10.2V8h-2v.2l2 2Zm6.8 12.4l-2.4-2.4q-1.2.875-2.588 1.338T12 22q-1.85 0-3.488-.713T5.65 19.35q-1.225-1.225-1.938-2.863T3 13q0-1.5.463-2.888T4.8 7.6L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4ZM12 20q1.05 0 2.05-.325t1.875-.925L6.2 9.025q-.6.875-.9 1.875T5 13q0 2.9 2.05 4.95T12 20ZM9 3V1h6v2H9Zm2.075 10.875Zm2.825-2.8Z"/>
                        </svg>
                        <text id="timer_text_off" x="287" y="254.7" class="st3 left-align"
                              display="${data.stateUseTimer.state == 'off' && data.enableTimer !== false ? '' : 'none'}"
                              fill="${data.inverterColour}">${localize('common.timer_off')}
                        </text>
                        <text id="timer_text_on" x="287" y="254.7" class="st3 left-align"
                              display="${data.stateUseTimer.state == 'on' && data.enableTimer !== false ? '' : 'none'}"
                              fill="${data.inverterColour}">${localize('common.timer_on')}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.priority_load_243)}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="pbat" x="267.7" y="262.5" width="18"
                             height="18" viewBox="0 0 24 24">
                            <path display="${data.priorityLoad === 'off' && (data.priorityLoad !== 'no' || !data.priorityLoad) ? '' : 'none'}"
                                  fill="${data.inverterColour}"
                                  d="M15.95 21.175L13.1 18.35l1.425-1.4l1.425 1.4l3.525-3.525l1.425 1.4l-4.95 4.95ZM8 22q-.425 0-.713-.288T7 21V5q0-.425.288-.713T8 4h2V2h4v2h2q.425 0 .713.288T17 5v7q-.525 0-1.025.088T15 12.35V6H9v14h2.35q.2.575.488 1.075t.687.925H8Zm1-2h2.35H11h.35H9Z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" id="pload" x="267.7" y="262.5" width="18"
                             height="18" viewBox="0 0 24 24">
                            <path display="${data.priorityLoad === 'on' && (data.priorityLoad !== 'no' || !data.priorityLoad) ? '' : 'none'}"
                                  fill="${data.inverterColour}"
                                  d="m15 13l-4 4v-3H2v-2h9V9l4 4M5 20v-4h2v2h10v-7.81l-5-4.5L7.21 10H4.22L12 3l10 9h-3v8H5Z"/>
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
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.solar_sell_247)}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="solar_sell_on" x="245" y="150" width="18"
                             height="18" viewBox="0 0 30 30">
                            <path display="${!config.entities.solar_sell_247 || data.stateSolarSell.state === 'off' || data.stateSolarSell.state === '0' || !config.show_solar || !['1', 'on'].includes(data.stateSolarSell.state) ? 'none' : ''}"
                                  fill="${data.solarColour}"
                                  d="m5.18 5.45l-1.78-.9L4.66 2h8.47l1.27 2.55l-1.78.89L11.9 4h-6l-.72 1.45M15.5 8H11l-.8-3H7.6l-.79 3H2.28L1 10.55l1.79.89L3.5 10h10.78l.72 1.45l1.79-.89L15.5 8m-.83 14H12.6l-.24-.9l-3.46-5.2l-3.47 5.2l-.23.9H3.13L6 11h2.09l-.36 1.35L8.9 14.1l1.16-1.75L9.71 11h2.07l2.89 11M8.3 15l-.9-1.35l-1.18 4.48L8.3 15m3.28 3.12l-1.18-4.48L9.5 15l2.08 3.12M23 16l-4-4v3h-4v2h4v3l4-4Z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" id="solar_sell_off" x="245" y="150" width="18"
                             height="18" viewBox="0 0 30 30">
                            <path display="${!config.entities.solar_sell_247 || data.stateSolarSell.state === 'on' || data.stateSolarSell.state === '1' || !config.show_solar || !['0', 'off'].includes(data.stateSolarSell.state) ? 'none' : ''}"
                                  fill="${data.solarColour}"
                                  d="M 26 16 L 22 12 L 22 15 L 18 15 L 18 17 L 22 17 L 22 20 L 26 16 Z M 22.1 21.5 L 2.4 1.7 L 1.1 3 L 6.1 8 L 5.4 8 L 4.1 10.5 L 5.9 11.4 L 6.6 10 L 8.1 10 L 9.1 11 L 6.2 22 L 8.3 22 L 8.5 21.1 L 12 15.9 L 15.5 21.1 L 15.7 22 L 17.8 22 L 17 18.8 L 20.9 22.7 L 22.1 21.5 M 9.3 18.1 L 10.5 13.6 L 11.4 14.9 L 9.3 18.1 M 14.7 18.1 L 12.6 15 L 12.8 14.7 L 14.1 16 L 14.7 18.1 M 14.2 11 L 14.9 11 L 15.1 11.9 L 14.2 11 M 14.1 8 L 18.6 8 L 19.9 10.6 L 18.1 11.5 L 17.4 10 L 13.2 10 L 10.2 7 L 10.7 5 L 13.3 5 L 14.1 8 M 8.4 5.2 L 6.9 3.7 L 7.8 2 L 16.3 2 L 17.6 4.5 L 15.8 5.4 L 15 4 L 9 4 L 8.4 5.2 Z"/>
                        </svg>
                    </a>
                    <image x="212" y="180" width="54" height="72"
                           class="${!data.genericInverterImage ? '' : 'st12'}"
                           href="${inverterImg}"
                           preserveAspectRatio="none"/>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, data.inverterProg.entityID)}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="prog_grid_on" x="323" y="243" width="20"
                             height="18" viewBox="0 0 24 24">
                            <path display="${data.inverterProg.show === false || config.entities.use_timer_248 === 'none' ? 'none' : ''}"
                                  class="${data.inverterProg.charge === 'none' ? 'st12' : ''}"
                                  fill="${data.inverterColour}"
                                  d="M11.5 19h1v-1.85l3.5-3.5V9H8v4.65l3.5 3.5V19Zm-2 2v-3L6 14.5V9q0-.825.588-1.413T8 7h1L8 8V3h2v4h4V3h2v5l-1-1h1q.825 0 1.413.588T18 9v5.5L14.5 18v3h-5Zm2.5-7Z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" id="prog_grid_off" x="323" y="243" width="20"
                             height="18" viewBox="0 0 24 24">
                            <path display="${data.inverterProg.show === false || config.entities.use_timer_248 === 'none' ? 'none' : ''}"
                                  class="${data.inverterProg.charge === 'none' ? '' : 'st12'}"
                                  fill="${data.inverterColour}"
                                  d="M10 3H8v1.88l2 2zm6 6v3.88l1.8 1.8l.2-.2V9c0-1.1-.9-2-2-2V3h-2v4h-3.88l2 2H16zM4.12 3.84L2.71 5.25L6 8.54v5.96L9.5 18v3h5v-3l.48-.48l4.47 4.47l1.41-1.41L4.12 3.84zm8.38 13.33V19h-1v-1.83L8 13.65v-3.11l5.57 5.57l-1.07 1.06z"/>
                        </svg>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_battery_charge_70)}>
                        <text id="daily_bat_charge_value" x="${data.compactMode ? '132' : '77.2'}" y="343"
                              class="st10 left-align"
                              display="${data.batteryShowDaily !== true || !config.show_battery || !data.stateDayBatteryCharge.isValid() ? 'none' : ''}"
                              fill="${data.batteryColour}">
                            ${data.stateDayBatteryCharge?.toPowerString(true, 1)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_pv_energy_108)}>
                        <text id="daily_solar_value" x="200" y="26" class="st10 left-align"
                              display="${config.solar.display_mode === 1 && data.stateDayPVEnergy.isValid() ? '' : 'none'}"
                              fill="${!data.solarShowDaily || !config.show_solar ? 'transparent' : `${data.solarColour}`}">
                            ${data.stateDayPVEnergy?.toPowerString(true, 1)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_pv_energy_108)}>
                        <text id="remaining_solar_value" x="200" y="26" class="st10 left-align"
                              display="${config.solar.display_mode === 2 && data.stateDayPVEnergy.isValid() ? '' : 'none'}"
                              fill="${!data.solarShowDaily || !config.show_solar ? 'transparent' : `${data.solarColour}`}">
                            ${data.stateDayPVEnergy?.toPowerString(true, 1) + ' / ' + data.remainingSolar}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_pv_energy_108)}>
                        <text id="total_solar_value" x="200" y="26" class="st10 left-align"
                              display="${config.solar.display_mode === 3 && data.stateDayPVEnergy.isValid() ? '' : 'none'}"
                              fill="${!data.solarShowDaily || !config.show_solar ? 'transparent' : `${data.solarColour}`}">
                            ${data.stateDayPVEnergy?.toPowerString(true, 1) + ' / ' + data.totalSolarGeneration}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_battery_discharge_71)}>
                        <text id="daily_bat_discharge_value" x="${data.compactMode ? '132' : '77.2'}" y="380.1"
                              class="st10 left-align"
                              display="${data.batteryShowDaily !== true || !config.show_battery || !data.stateDayBatteryDischarge.isValid() ? 'none' : ''}"
                              fill="${data.batteryColour}">
                            ${data.stateDayBatteryDischarge?.toPowerString(true, 1)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_load_energy_84)}>
                        <text id="daily_load_value"
                              x="${[2, 4].includes(data.additionalLoad) ? '365' : '412'}"
                              y="${[2, 4].includes(data.additionalLoad) ? '175' : '267.9'}"
                              class="st10 left-align" display="${!data.loadShowDaily || !data.stateDayLoadEnergy.isValid() ? 'none' : ''}"
                              fill="${data.loadColour}">
                            ${data.stateDayLoadEnergy?.toPowerString(true, 1)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_grid_import_76)}>
                        <text id="daily_grid_buy_value" x="5" y="267.9" class="st10 left-align"
                              display="${!config.show_grid || data.gridShowDailyBuy !== true || !data.stateDayGridImport.isValid() ? 'none' : ''}"
                              fill="${data.gridColour}">
                            ${data.stateDayGridImport?.toPowerString(true, 1)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_grid_export_77)}>
                        <text id="daily_grid_sell_value" x="5" y="165" class="st10 left-align"
                              display="${!config.show_grid || data.gridShowDailySell !== true || !data.stateDayGridExport.isValid() ? 'none' : ''}"
                              fill="${data.gridColour}">
                            ${data.stateDayGridExport?.toPowerString(true, 1)}
                        </text>
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
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_voltage_183)}>
                        <text id="battery_voltage_183" x="193" y="346"
                              display="${config.entities.battery_voltage_183 === 'none'
                              || !config.entities.battery_voltage_183 || !config.show_battery || data.compactMode ? 'none' : ''}"
                              fill=${data.batteryColour} class="${data.largeFont !== true ? 'st14' : 'st4'} st8">
                            ${data.batteryVoltage} ${UnitOfElectricPotential.VOLT}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_voltage_183)}>
                        <text id="battery_voltage_183" x="281" y="299"
                              display="${config.entities.battery_voltage_183 === 'none'
                              || !config.entities.battery_voltage_183 || !config.show_battery || !data.compactMode ? 'none' : ''}"
                              fill=${data.batteryColour} class="${data.compactMode ? 'st3 left-align' : 'st12'}">
                            ${data.batteryVoltage} ${UnitOfElectricPotential.VOLT}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="${data.compactMode ? '270' : '290'}" y="358"
                              display="${config.entities.battery_soc_184 === 'none' || !config.show_battery || !data.stateBatterySoc.isValid() ? 'none' : ''}"
                              fill=${data.batteryColour} class="st13 st8 left-align">
                            ${data.stateBatterySoc.toNum(0)} %
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="${data.compactMode ? '335' : '355'}" y="358"
                              fill=${data.batteryColour}
                              class="st13 st8 left-align"
                              display="${data.inverterProg.show === false
                              || config.entities.battery_soc_184 === 'none'
                              || !config.show_battery
                              || [InverterModel.GoodweGridMode, InverterModel.Goodwe, InverterModel.Huawei].includes(data.inverterModel)
                              || config.battery.hide_soc ? 'none' : ''}">
                            | ${data.inverterProg.capacity || 0} %
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="${data.compactMode ? '335' : '355'}" y="358"
                              fill=${data.batteryColour}
                              class="${config.battery.hide_soc || !config.show_battery ? 'st12' : 'st13 st8 left-align'}"
                              display="${[InverterModel.GoodweGridMode, InverterModel.Goodwe, InverterModel.Huawei].includes(data.inverterModel) && config.battery?.shutdown_soc && !config.battery?.shutdown_soc_offgrid
                                      ? '' : 'none'}">
                            | ${data.batteryShutdown || 0} %
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="${data.compactMode ? '335' : '355'}" y="358"
                              fill=${data.batteryColour}
                              class="${config.battery.hide_soc || !config.show_battery ? 'st12' : 'st13 st8 left-align'}"
                              display="${[InverterModel.GoodweGridMode, InverterModel.Goodwe, InverterModel.Huawei].includes(data.inverterModel) && config.battery.shutdown_soc_offgrid ? '' : 'none'}">
                            |
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_power_190)}>
                        <text id="data.batteryPower_190" x="${data.compactMode ? '239' : '193'}"
                              y="${data.compactMode ? '307' : '386'}"
                              display="${config.entities.battery_power_190 === 'none' || !config.show_battery ? 'none' : ''}"
                              fill=${data.batteryColour} class="${data.largeFont !== true ? 'st14' : 'st4'} st8">
                            ${config.battery.auto_scale
                                    ? `${config.battery.show_absolute
                                            ? `${Math.abs(parseFloat(Utils.convertValue(data.batteryPower, data.decimalPlaces)))} ${Utils.convertValue(data.batteryPower, data.decimalPlaces).split(' ')[1]}`
                                            : Utils.convertValue(data.batteryPower, data.decimalPlaces) || '0'}`
                                    : `${config.battery.show_absolute
                                            ? `${Math.abs(data.batteryPower)} ${UnitOfPower.WATT}`
                                            : `${data.batteryPower || 0} ${UnitOfPower.WATT}`
                                    }`
                            }
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_current_191)}>
                        <text id="battery_current_191" x="193" y="365.3"
                              display="${!config.entities.battery_current_191 || config.entities.battery_current_191 === 'none' || !config.show_battery || data.compactMode || !data.stateBatteryCurrent.isValid() ? 'none' : ''}"
                              fill=${data.batteryColour} class="${data.largeFont !== true ? 'st14' : 'st4'} st8">
                            ${config.battery.show_absolute ? Math.abs(data.stateBatteryCurrent.toNum(1)) : data.stateBatteryCurrent.toNum(1)}
                            ${UnitOfElectricalCurrent.AMPERE}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_current_191)}>
                        <text id="battery_current_191" x="281" y="312"
                              display="${!config.entities.battery_current_191 || config.entities.battery_current_191 === 'none' || !config.show_battery || !data.compactMode || !data.stateBatteryCurrent.isValid() ? 'none' : ''}"
                              fill=${data.batteryColour} class="${data.compactMode ? 'st3 left-align' : 'st12'}">
                            ${config.battery.show_absolute ? Math.abs(data.stateBatteryCurrent.toNum(1)) : data.stateBatteryCurrent.toNum(1)}
                            ${UnitOfElectricalCurrent.AMPERE}
                        </text>
                    </a>
                    ${config.inverter.three_phase
                            ? config.entities?.grid_ct_power_total
                                    ? svg`
                                        <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_ct_power_total)}>
                                        <text id="data.totalGridPower" x="135" y="219.2"
                                              display="${!config.show_grid || config.entities.grid_ct_power_172 === 'none' ? 'none' : ''}"
                                              class="${data.largeFont !== true ? 'st14' : 'st4'} st8" fill="${data.gridColour}">
                                            ${config.grid.auto_scale
                                            ? `${config.grid.show_absolute
                                                    ? `${Math.abs(parseFloat(Utils.convertValue(data.totalGridPower, data.decimalPlaces)))} ${Utils.convertValue(data.totalGridPower, data.decimalPlaces).split(' ')[1]}`
                                                    : Utils.convertValue(data.totalGridPower, data.decimalPlaces) || 0}`
                                            : `${config.grid.show_absolute
                                                    ? `${Math.abs(data.totalGridPower)} ${UnitOfPower.WATT}`
                                                    : `${data.totalGridPower || 0} ${UnitOfPower.WATT}`
                                            }`
                                    }
                                        </text>
                                    </a>`
                                    : svg`
                                        <text id="grid_total_power" x="135" y="219.2"
                                              display="${!config.show_grid || config.entities.grid_ct_power_172 === 'none' ? 'none' : ''}"
                                              class="${data.largeFont !== true ? 'st14' : 'st4'} st8" fill="${data.gridColour}">
                                              ${config.grid.auto_scale
                                            ? `${config.grid.show_absolute
                                                    ? `${Math.abs(parseFloat(Utils.convertValue(data.totalGridPower, data.decimalPlaces)))} ${Utils.convertValue(data.totalGridPower, data.decimalPlaces).split(' ')[1]}`
                                                    : Utils.convertValue(data.totalGridPower, data.decimalPlaces) || 0}`
                                            : `${config.grid.show_absolute
                                                    ? `${Math.abs(data.totalGridPower)} ${UnitOfPower.WATT}`
                                                    : `${data.totalGridPower || 0} ${UnitOfPower.WATT}`
                                            }`
                                    }
                                        </text>`
                            : svg`
                                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_ct_power_172)}>
                                        <text id="grid_total_power" x="135" y="219.2"
                                              display="${!config.show_grid || config.entities.grid_ct_power_172 === 'none' ? 'none' : ''}"
                                              class="${data.largeFont !== true ? 'st14' : 'st4'} st8" fill="${data.gridColour}">
                                            ${config.grid.auto_scale
                                    ? `${config.grid.show_absolute
                                            ? `${Math.abs(parseFloat(Utils.convertValue(data.totalGridPower, data.decimalPlaces)))} ${Utils.convertValue(data.totalGridPower, data.decimalPlaces).split(' ')[1]}`
                                            : Utils.convertValue(data.totalGridPower, data.decimalPlaces) || 0}`
                                    : `${config.grid.show_absolute
                                            ? `${Math.abs(data.totalGridPower)} ${UnitOfPower.WATT}`
                                            : `${data.totalGridPower || 0} ${UnitOfPower.WATT}`
                                    }`
                            }
                                        </text>
                                    </a>`
                    }
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv1_voltage_109)}>
                        <text id="pv1_voltage" x="${config.solar.mppts === 1 ? '244.7' : '194'}" y="106"
                              class="st3 left-align"
                              display="${!config.show_solar || !config.entities.pv1_voltage_109 || config.entities.pv1_voltage_109 === 'none' || !data.statePV1Voltage.isValid() ? 'none' : ''}"
                              fill="${data.solarColour}">${data.statePV1Voltage.toNum(1)} V
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv1_current_110)}>
                        <text id="pv1_current" x="${config.solar.mppts === 1 ? '244.7' : '194'}" y="94"
                              class="st3 left-align"
                              display="${!config.show_solar || !config.entities.pv1_current_110 || config.entities.pv1_current_110 === 'none' || !data.statePV1Current.isValid() ? 'none' : ''}"
                              fill="${data.solarColour}">${data.statePV1Current.toNum(1)} A
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv2_voltage_111)}>
                        <text id="data.pv2_voltage" x="296" y="106" class="st3 left-align"
                              display="${!config.show_solar || !config.entities.pv2_voltage_111 || config.entities.pv2_voltage_111 === 'none' || config.solar.mppts === 1 || !data.statePV2Voltage.isValid() ? 'none' : ''}"
                              fill="${data.solarColour}">${data.statePV2Voltage.toNum(1)}
                            ${UnitOfElectricPotential.VOLT}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv2_current_112)}>
                        <text id="data.pv2_current" x="296" y="94" class="st3 left-align"
                              display="${!config.show_solar || !config.entities.pv2_current_112 || config.entities.pv2_current_112 === 'none' || config.solar.mppts === 1 || !data.statePV2Current.isValid() ? 'none' : ''}"
                              fill="${data.solarColour}">${data.statePV2Current.toNum(1)}
                            ${UnitOfElectricalCurrent.AMPERE}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv3_voltage_113)}>
                        <text id="pv3_voltage" x="120" y="106" class="st3 left-align"
                              display="${!config.show_solar || !config.entities.pv3_voltage_113 || config.entities.pv3_voltage_113 === 'none' || [1, 2].includes(config.solar.mppts) || !data.statePV3Voltage.isValid() ? 'none' : ''}"
                              fill="${data.solarColour}">${data.statePV3Voltage.toNum(1)}
                            ${UnitOfElectricPotential.VOLT}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv3_current_114)}>
                        <text id="pv3_current" x="120" y="94" class="st3 left-align"
                              display="${!config.show_solar || !config.entities.pv3_current_114 || config.entities.pv3_current_114 === 'none' || [1, 2].includes(config.solar.mppts) || !data.statePV3Current.isValid() ? 'none' : ''}"
                              fill="${data.solarColour}">${data.statePV3Current.toNum(1)}
                            ${UnitOfElectricalCurrent.AMPERE}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv4_voltage_115)}>
                        <text id="pv4_voltage" x="372" y="106" class="st3 left-align"
                              display="${!config.show_solar || !config.entities.pv4_voltage_115 || config.entities.pv4_voltage_115 === 'none' || [1, 2, 3].includes(config.solar.mppts) || !data.statePV4Voltage.isValid() ? 'none' : ''}"
                              fill="${data.solarColour}">${data.statePV4Voltage.toNum(1)}
                            ${UnitOfElectricPotential.VOLT}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv4_current_116)}>
                        <text id="pv4_current" x="372" y="94" class="st3 left-align"
                              display="${!config.show_solar || !config.entities.pv4_current_116 || config.entities.pv4_current_116 === 'none' || [1, 2, 3].includes(config.solar.mppts) || !data.statePV4Current.isValid() ? 'none' : ''}"
                              fill="${data.solarColour}">${data.statePV4Current.toNum(1)}
                            ${UnitOfElectricalCurrent.AMPERE}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_temp_182)}>
                        <text id="battery_temp_182" x="${data.compactMode ? '205' : '250'}"
                              y="${data.compactMode ? '332' : '324.5'}"
                              class="${config.entities?.battery_temp_182 ? 'st3 left-align' : 'st12'}"
                              fill="${data.batteryColour}"
                              display="${!config.show_battery || !data.stateBatteryTemp.isValid() ? 'none' : ''}">
                            ${data.stateBatteryTemp.toNum(1)}°
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
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.environment_temp)}>
                        <text id="environ_temp" x="154" y="45"
                              class="${config.entities?.environment_temp ? 'st3 left-align' : 'st12'}"
                              fill="${data.solarColour}"
                              display="${!config.show_solar || !data.stateEnvironmentTemp.isValid() ? 'none' : ''}">
                            ${data.stateEnvironmentTemp.toNum(1)}°
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load1_extra)}>
                        <text id="ess_load1_extra" x="465" y="157"
                              display="${(config.entities?.essential_load1_extra && [1, 2].includes(data.additionalLoad)) && data.stateEssentialLoad1Extra.isValid() ? '' : 'none'}"
                              class="st3 .right-align" fill="${data.loadColour}">
                            ${data.stateEssentialLoad1Extra.toNum(1)}
                            ${data.stateEssentialLoad1Extra.getUOM()}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load2_extra)}>
                        <text id="ess_load2_extra" x="465" y="282"
                              display="${(config.entities?.essential_load2_extra && data.additionalLoad === 2) && data.stateEssentialLoad2Extra.isValid() ? '' : 'none'}"
                              class="st3 .right-align" fill="${data.loadColour}">
                            ${data.stateEssentialLoad2Extra.toNum(1)}
                            ${data.stateEssentialLoad2Extra.getUOM()}
                        </text>
                    </a>
                    ${data.totalGridPower >= 0
                            ? svg`
                                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.energy_cost_buy)}>
                                        <text id="energy_cost" x="105" y="195" class="${!config.show_grid ? 'st12' : 'st3 left-align'}" 
                                              fill="${data.gridColour}" 
                                              display="${config.entities?.energy_cost_buy && data.stateEnergyCostBuy.isValid() ? '' : 'none'}" >
                                            ${data.energyCost} ${data.stateEnergyCostBuy.getUOM()}
                                        </text>
                                    </a>`
                            : svg`
                                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.energy_cost_sell)}>
                                        <text id="energy_cost" x="105" y="195"  class="${!config.show_grid ? 'st12' : 'st3 left-align'}" 
                                              fill="${data.gridColour}" 
                                              display="${config.entities?.energy_cost_sell && data.stateEnergyCostSell.isValid() ? '' : 'none'}" >
                                            ${data.energyCost} ${data.stateEnergyCostSell.getUOM()}
                                        </text>
                                    </a>`}

                    ${config.entities?.pv_total
                            ? svg`
                                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv_total)}>
                                        <text id="pvtotal_power" x="238.8" y="133.9" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                                              display="${!config.show_solar || config.solar.mppts === 1 || !data.statePVTotal.isValid() ? 'none' : ''}" 
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
                                          display="${!config.show_solar || config.solar.mppts === 1 || !data.statePVTotal.isValid() ? 'none' : ''}" 
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
                              display="${!config.show_solar || !data.statePV1Power.isValid() ? 'none' : ''}" 
                              fill="${data.solarColour}">
                            ${data.statePV1Power?.toPowerString(config.solar.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv2_power_187)}>
                        <text id="pv2_power_187" x="289.5" y="71" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                              display="${!config.show_solar || config.solar.mppts === 1 || !data.statePV2Power.isValid() ? 'none' : ''}" 
                              fill="${data.solarColour}">
                            ${data.statePV2Power?.toPowerString(config.solar.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv3_power_188)}>
                        <text id="pv3_power_188" x="113" y="71" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                              display="${!config.show_solar || [1, 2].includes(config.solar.mppts) || !data.statePV3Power.isValid() ? 'none' : ''}" 
                              fill="${data.solarColour}">
                            ${data.statePV3Power?.toPowerString(config.solar.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv4_power_189)}>
                        <text id="pv4_power_189" x="366" y="71" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                              display="${!config.show_solar || [1, 2, 3].includes(config.solar.mppts) || !data.statePV4Power.isValid() ? 'none' : ''}" 
                              fill="${data.solarColour}">
                            ${data.statePV4Power?.toPowerString(config.solar.auto_scale, data.decimalPlaces)}
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
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load1)}>
                        <text id="ess_load1" x="440" y="133" display="${[1, 2].includes(data.additionalLoad) && data.stateEssentialLoad1.isValid() ? '' : 'none'}" 
                              class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                              fill="${data.loadColour}">
                            ${data.stateEssentialLoad1?.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load2)}>
                        <text id="ess_load2" x="440" y="306.5" display="${data.additionalLoad === 2 && data.stateEssentialLoad2.isValid() ? '' : 'none'}" 
                              class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                              fill="${data.loadColour}">
                            ${data.stateEssentialLoad2?.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load1)}>
                        <text id="ess_load4" x="423" y="138" display="${data.additionalLoad === 4 && data.stateEssentialLoad1.isValid() ? '' : 'none'}" 
                              class="st3" 
                              fill="${data.loadColour}">
                            ${data.stateEssentialLoad1?.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load2)}>
                        <text id="ess_load4" x="459" y="138" display="${data.additionalLoad === 4 && data.stateEssentialLoad2.isValid() ? '' : 'none'}" 
                              class="st3" 
                              fill="${data.loadColour}">
                            ${data.stateEssentialLoad2?.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load3)}>
                        <text id="ess_load4" x="423" y="301" display="${data.additionalLoad === 4 && data.stateEssentialLoad3.isValid() ? '' : 'none'}" 
                              class="st3" 
                              fill="${data.loadColour}">
                            ${data.stateEssentialLoad3?.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load4)}>
                        <text id="ess_load4" x="459" y="301" display="${data.additionalLoad === 4 && data.stateEssentialLoad4.isValid() ? '' : 'none'}" 
                              class="st3" 
                              fill="${data.loadColour}">
                            ${data.stateEssentialLoad4?.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.prepaid_units)}>
                        <text id="prepaid" x="31.5" y="253"
                              class="${config.entities?.prepaid_units ? 'st3' : 'st12'}"
                              fill="${data.gridColour}" display="${!config.show_grid || !data.statePrepaidUnits.isValid() ? 'none' : ''}">
                            ${data.statePrepaidUnits.toNum(1)}
                        </text>
                    </a>
                </svg>
            </div>
        </ha-card>
    `
}
