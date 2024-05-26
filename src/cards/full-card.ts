import {html, svg} from 'lit';
import {localize} from '../localize/localize';
import {AutarkyType, DataDto, InverterModel, sunsynkPowerFlowCardConfig} from '../types';
import {Utils} from '../helpers/utils';
import {UnitOfElectricalCurrent, UnitOfElectricPotential, UnitOfEnergy, UnitOfPower, validGridConnected, validGridDisconnected} from '../const';
import {icons} from '../helpers/icons';

export const fullCard = (config: sunsynkPowerFlowCardConfig, inverterImg: string, data: DataDto) => {
    return html`
        <ha-card>
            <style>
                .essload-icon {
                    color: ${data.loadColour} !important;
                    --mdc-icon-size: 20px;
                }

                .essload1-icon {
                    color: ${data.loadColour} !important;
                    --mdc-icon-size: 36px;
                }

                .aux-icon {
                    color: ${data.auxDynamicColour} !important;
                    --mdc-icon-size: 70px;
                }

                .aux-small-icon-1 {
                    color: ${data.auxDynamicColourLoad1} !important;
                    --mdc-icon-size: 24px;
                }

                .aux-small-icon-2 {
                    color: ${data.auxDynamicColourLoad2} !important;
                    --mdc-icon-size: 24px;
                }

                .aux-off-icon {
                    color: ${data.auxOffColour} !important;
                    --mdc-icon-size: 70px;
                }

                .nonessload-icon {
                    color: ${data.gridColour} !important;
                    --mdc-icon-size: 32px;
                }

                .noness-icon {
                    color: ${data.gridColour} !important;
                    --mdc-icon-size: 70px;
                }
            </style>
            <div class="container card">
                ${config.title ? html`<h1
                        style="text-align: center; color: ${config.title_colour || 'inherit'}; font-size: ${config.title_size || '32px'};">
                    ${config.title}</h1>` : ''}
                <svg viewBox="0 -2 457 387" preserveAspectRatio="xMidYMid meet"
                     height="${data.panelMode !== true ? `${data.cardHeight}` : '100%'}"
                     width="${data.panelMode === true ? `${data.cardWidth}` : '100%'}"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                     <svg xmlns="http://www.w3.org/2000/svg" id="pvtotal" x="51" y="162" width="70" height="30"
                         viewBox="0 0 70 30" overflow="visible">
                        <rect width="70" height="30" rx="4.5" ry="4.5" fill="none"
                            stroke="${[1, 3].includes(config.solar.efficiency) ? 'url(#SlG)' : data.solarColour}" pointer-events="all"
                            display="${config.solar.mppts === 1 ? 'none' : ''}"
                            class="${!config.show_solar ? 'st12' : ''}"/>
                            <defs>
                            <linearGradient id="SlG" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                      stop-color="${data.totalPVEfficiency === 0 ? 'grey' : data.solarColour}"/>
                                <stop offset="${data.totalPVEfficiency}%"
                                      stop-color="${data.totalPVEfficiency === 0 ? 'grey' : data.solarColour}"/>
                                <stop offset="${data.totalPVEfficiency}%"
                                      stop-color="${data.totalPVEfficiency < 100 ? 'grey' : data.solarColour}"/>
                                <stop offset="100%"
                                      stop-color="${data.totalPVEfficiency < 100 ? 'grey' : data.solarColour}"/>
                            </linearGradient>
                          </defs>
                    </svg>
                    <rect x="6" y="300.75" width="70" height="70" rx="10.5" ry="10.5" fill="none"
                          stroke="${data.batteryColour}" pointer-events="all"
                          display="${!config.show_battery ? 'none' : ''}"/>
                    <rect x="234" y="153" width="70" height="70" rx="10.5" ry="10.5" fill="none"
                          stroke="${data.gridColour}" pointer-events="all"
                          display="${!config.show_grid ? 'none' : ''}"/>
                    <rect x="386" y="265" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.gridColour}" pointer-events="all"
                          display="${!config.show_grid ? 'none' : ''}"/>
                    <rect x="237" y="32" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.auxDynamicColour}" pointer-events="all"
                          class="${!data.showAux ? 'st12' : ''}"/>
                    <rect x="236" y="103" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.loadColour}" pointer-events="all"/>
                    <rect x="145.15" y="162" width="70"
                          height="${config.inverter.three_phase ? 60 : 50}" rx="7.5" ry="7.5"
                          fill="none" stroke="${data.inverterColour}" pointer-events="all"/>
                    <svg xmlns="http://www.w3.org/2000/svg" id="pv1" x="0" y="40" 
                         width="70" height="30" viewBox="0 0 70 30" overflow="visible">
                          <rect id="pv1" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${[1, 3].includes(config.solar.efficiency) ? 'url(#PV1LG)' : data.solarColour}" pointer-events="all"
                          class="${!config.show_solar ? 'st12' : ''}"/>
                          <defs>
                            <linearGradient id="PV1LG" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                      stop-color="${data.PV1Efficiency === 0 ? 'grey' : data.solarColour}"/>
                                <stop offset="${data.PV1Efficiency}%"
                                      stop-color="${data.PV1Efficiency === 0 ? 'grey' : data.solarColour}"/>
                                <stop offset="${data.PV1Efficiency}%"
                                      stop-color="${data.PV1Efficiency < 100 ? 'grey' : data.solarColour}"/>
                                <stop offset="100%"
                                      stop-color="${data.PV1Efficiency < 100 ? 'grey' : data.solarColour}"/>
                            </linearGradient>
                          </defs>
                    </svg>                     
                    <svg xmlns="http://www.w3.org/2000/svg" id="pv2" x="101" y="40" width="70" height="30"
                         viewBox="0 0 70 30" overflow="visible">                    
                          <rect id="pv2" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${[1, 3].includes(config.solar.efficiency) ? 'url(#PV2LG)' : data.solarColour}" pointer-events="all"
                          class="${!config.show_solar || config.solar.mppts === 1 ? 'st12' : ''}"/>
                          <defs>
                            <linearGradient id="PV2LG" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                      stop-color="${data.PV2Efficiency === 0 ? 'grey' : data.solarColour}"/>
                                <stop offset="${data.PV2Efficiency}%"
                                      stop-color="${data.PV2Efficiency === 0 ? 'grey' : data.solarColour}"/>
                                <stop offset="${data.PV2Efficiency}%"
                                      stop-color="${data.PV2Efficiency < 100 ? 'grey' : data.solarColour}"/>
                                <stop offset="100%"
                                      stop-color="${data.PV2Efficiency < 100 ? 'grey' : data.solarColour}"/>
                            </linearGradient>
                          </defs>
                    </svg>                   
                    <svg xmlns="http://www.w3.org/2000/svg" id="pv3" x="0" y="100" width="70" height="30"
                         viewBox="0 0 70 30" overflow="visible">                    
                          <rect id="pv3" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${[1, 3].includes(config.solar.efficiency) ? 'url(#PV3LG)' : data.solarColour}" pointer-events="all"
                          class="${!config.show_solar || [1, 2].includes(config.solar.mppts) ? 'st12' : ''}"/>
                          <defs>
                            <linearGradient id="PV3LG" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                      stop-color="${data.PV3Efficiency === 0 ? 'grey' : data.solarColour}"/>
                                <stop offset="${data.PV3Efficiency}%"
                                      stop-color="${data.PV3Efficiency === 0 ? 'grey' : data.solarColour}"/>
                                <stop offset="${data.PV3Efficiency}%"
                                      stop-color="${data.PV3Efficiency < 100 ? 'grey' : data.solarColour}"/>
                                <stop offset="100%"
                                      stop-color="${data.PV3Efficiency < 100 ? 'grey' : data.solarColour}"/>
                            </linearGradient>
                          </defs>
                    </svg>                    
                    <svg xmlns="http://www.w3.org/2000/svg" id="pv4" x="101" y="100" width="70" height="30"
                         viewBox="0 0 70 30" overflow="visible">                    
                          <rect id="pv4" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${[1, 3].includes(config.solar.efficiency) ? 'url(#PV4LG)' : data.solarColour}" pointer-events="all"
                          class="${!config.show_solar || [1, 2, 3].includes(config.solar.mppts) ? 'st12' : ''}"/>
                          <defs>
                            <linearGradient id="PV4LG" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                      stop-color="${data.PV4Efficiency === 0 ? 'grey' : data.solarColour}"/>
                                <stop offset="${data.PV4Efficiency}%"
                                      stop-color="${data.PV4Efficiency === 0 ? 'grey' : data.solarColour}"/>
                                <stop offset="${data.PV4Efficiency}%"
                                      stop-color="${data.PV4Efficiency < 100 ? 'grey' : data.solarColour}"/>
                                <stop offset="100%"
                                      stop-color="${data.PV4Efficiency < 100 ? 'grey' : data.solarColour}"/>
                            </linearGradient>
                          </defs>
                    </svg>                    
                    <rect id="nonesstotal" x="304" y="265" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.gridColour}" pointer-events="all"
                          class="${!data.showNonessential ? 'st12' : ''}"
                          display="${!config.show_grid ? 'none' : ''}"/>
                    <rect id="noness1" x="304" y="310" width="70" height="20" rx="4.5" ry="4.5"
                          display="${data.nonessentialLoads === 1 ? '' : 'none'}" fill="none"
                          stroke="${data.gridColour}"
                          pointer-events="all"
                          class="${!config.show_grid || !data.showNonessential ? 'st12' : ''}"/>
                    <rect id="noness2" x="303" y="310" width="35" height="20" rx="4.5" ry="4.5"
                          display="${[2, 3].includes(data.nonessentialLoads) ? '' : 'none'}"
                          fill="none" stroke="${data.gridColour}"
                          pointer-events="all"
                          class="${!config.show_grid || !data.showNonessential || data.nonessentialLoads === 1 ? 'st12' : ''}"/>
                    <rect id="noness2" x="340" y="310" width="35" height="20" rx="4.5" ry="4.5"
                          display="${[2, 3].includes(data.nonessentialLoads) ? '' : 'none'}"
                          fill="none" stroke="${data.gridColour}"
                          pointer-events="all"
                          class="${!config.show_grid || !data.showNonessential || data.nonessentialLoads === 1 ? 'st12' : ''}"/>
                    <rect id="noness3" x="266" y="310" width="35" height="20" rx="4.5" ry="4.5"
                          display="${data.nonessentialLoads === 3 && config.battery.hide_soc ? '' : 'none'}"
                          fill="none" stroke="${data.gridColour}"
                          pointer-events="all"
                          class="${!config.show_grid || !data.showNonessential || data.nonessentialLoads === 1 ? 'st12' : ''}"/>
                    <rect id="es-load1" x="374" y="${!data.showAux ? '30' : '143'}" width="70" height="30"
                          rx="4.5" ry="4.5" fill="none" stroke="${data.loadColour}" pointer-events="all"
                          display="${data.additionalLoad === 1 ? '' : 'none'}"/>
                    <rect id="es-load2" x="${!data.showAux ? '376' : '373'}"
                          y="${!data.showAux ? '30' : '149'}" width="35" height="20" rx="4.5" ry="4.5"
                          fill="none" stroke="${data.loadColour}" pointer-events="all"
                          display="${[2, 4].includes(data.additionalLoad) ? '' : 'none'}"/>
                    <rect id="es-load2" x="${!data.showAux ? '413' : '410'}"
                          y="${!data.showAux ? '30' : '149'}" width="35" height="20" rx="4.5" ry="4.5"
                          fill="none" stroke="${data.loadColour}" pointer-events="all"
                          display="${[2, 4].includes(data.additionalLoad) ? '' : 'none'}"/>
                    <rect id="es-load4" x="376"
                          y="149" width="35" height="20" rx="4.5" ry="4.5"
                          fill="none" stroke="${data.loadColour}" pointer-events="all"
                          display="${!data.showAux && [3, 4].includes(data.additionalLoad) ? '' : 'none'}"/>
                    <rect id="es-load4" x="413"
                          y="149" width="35" height="20" rx="4.5" ry="4.5"
                          fill="none" stroke="${data.loadColour}" pointer-events="all"
                          display="${!data.showAux && [3, 4].includes(data.additionalLoad) ? '' : 'none'}"/>
                    <rect id="es-load3" x="376" y="20" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.loadColour}" pointer-events="all"
                          display="${!data.showAux && [3].includes(data.additionalLoad) ? '' : 'none'}"/>
                    <rect id="aux-load1" x="374" y="20" width="70" height="25" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.auxDynamicColourLoad1}" pointer-events="all"
                          display="${data.showAux ? '' : 'none'}"
                          class="${[1, 2].includes(data.additionalAuxLoad) ? '' : 'st12'}"/>
                    <rect id="aux-load2" x="374" y="50" width="70" height="25" rx="4.5" ry="4.5" fill="none"
                          stroke="${data.auxDynamicColourLoad2}" pointer-events="all"
                          display="${!data.showAux ? 'none' : ''}"
                          class="${data.additionalAuxLoad === 2 ? '' : 'st12'}"/>
                    <text id="duration" x="132" y="352" class="${data.largeFont !== true ? 'st14' : 'st4'} left-align"
                          display="${!config.show_battery ? 'none' : ''}"
                          fill="${data.batteryEnergy === 0 || data.isFloating || data.batteryPower === 0 ? 'transparent' : `${data.batteryColour}`}">
                        ${data.batteryDuration}
                    </text>
                    <text id="duration_text" x="132" y="368" class="st3 left-align"
                          display="${!config.show_battery ? 'none' : ''}"
                          fill="${data.batteryEnergy === 0 || data.batteryPower <= 0 || data.isFloating ? 'transparent' : `${data.batteryColour}`}">
                        ${localize('common.runtime_to')} ${data.batteryCapacity}% @${data.formattedResultTime}
                    </text>
                    <text id="duration_text_charging" x="132" y="368" class="st3 left-align"
                          display="${!config.show_battery ? 'none' : ''}"
                          fill="${data.batteryEnergy === 0 || data.batteryPower >= 0 || data.isFloating ? 'transparent' : `${data.batteryColour}`}">
                        ${localize('common.to')} ${data.batteryCapacity}% ${localize('common.charge')}
                            @${data.formattedResultTime}
                    </text>
                    <text id="floating" x="132" y="368" class="st3 left-align"
                          display="${!config.show_battery ? 'none' : ''}"
                          fill="${data.batteryEnergy === 0 || !data.isFloating ? 'transparent' : `${data.batteryColour}`}">
                        ${localize('common.battery_floating')}
                    </text>
                    <text x="0" y="78.5" class="st3 st8 left-align"
                          display="${!config.show_solar ? 'none' : ''}" fill="${data.solarColour}">
                        ${config.solar.pv1_name}
                    </text>
                    <text x="0" y="90" class="${[2, 3].includes(config.solar.efficiency) ? 'st3 st8 left-align' : 'st12'}"
                          display="${!config.show_solar || [0, 1].includes(config.solar.efficiency) ? 'none' : ''}" fill="${data.solarColour}">
                        ${data.PV1Efficiency}%
                    </text>
                    <text x="99" y="78.5" class="st3 st8 left-align"
                          display="${!config.show_solar || config.solar.mppts === 1 ? 'none' : ''}"
                          fill="${data.solarColour}">${config.solar.pv2_name}
                    </text>
                    <text x="99" y="90" class="${[2, 3].includes(config.solar.efficiency) ? 'st3 st8 left-align' : 'st12'}"
                          display="${!config.show_solar || config.solar.mppts === 1 || [0, 1].includes(config.solar.efficiency) ? 'none' : ''}"
                          fill="${data.solarColour}">${data.PV2Efficiency}%
                    </text>
                    <text x="0" y="139" class="st3 st8 left-align"
                          display="${!config.show_solar || [1, 2].includes(config.solar.mppts) ? 'none' : ''}"
                          fill="${data.solarColour}">${config.solar.pv3_name}
                    </text>
                    <text x="0" y="150" class="${[2, 3].includes(config.solar.efficiency) ? 'st3 st8 left-align' : 'st12'}"
                          display="${!config.show_solar || [1, 2].includes(config.solar.mppts) || [0, 1].includes(config.solar.efficiency) ? 'none' : ''}"
                          fill="${data.solarColour}">${data.PV3Efficiency}%
                    </text>
                    <text x="99" y="139" class="st3 st8 left-align"
                          display="${!config.show_solar || [1, 2, 3].includes(config.solar.mppts) ? 'none' : ''}"
                          fill="${data.solarColour}">${config.solar.pv4_name}
                    </text>
                    <text x="99" y="150" class="${[2, 3].includes(config.solar.efficiency) ? 'st3 st8 left-align' : 'st12'}"
                          display="${!config.show_solar || [1, 2, 3].includes(config.solar.mppts) || [0, 1].includes(config.solar.efficiency) ? 'none' : ''}"
                          fill="${data.solarColour}">${data.PV4Efficiency}%
                    </text>
                    <text x="51" y="202" class="${[2, 3].includes(config.solar.efficiency) ? 'st3 st8 left-align' : 'st12'}"
                          display="${!config.show_solar || [0, 1].includes(config.solar.efficiency) ? 'none' : ''}"
                          fill="${data.solarColour}">${data.totalPVEfficiency}%
                    </text>
                    <text x="421" y="377" class="st3 st8" fill="${data.gridColour}"
                          display="${!config.show_grid ? 'none' : ''}">${config.grid.grid_name}
                    </text>
                    <text x="167" y="306" class="st3 left-align" fill="${data.inverterColour}">${data.inverterStateMsg}
                    </text>
                    <text x="${!config.battery.show_remaining_energy ? '80' : '15'}" y="378" class="st3 left-align"
                          display="${!config.show_battery ? 'none' : ''}"
                          fill="${data.batteryColour}">${data.batteryStateMsg}
                    </text>
                    <text x="101" y="378" class="st3"
                          display="${!config.show_battery || !config.battery.show_remaining_energy ? 'none' : ''}"
                          fill="${data.batteryColour}">
                        ${Utils.toNum((data.batteryEnergy * (data.stateBatterySoc?.toNum() / 100) / 1000), 2)}
                        ${UnitOfEnergy.KILO_WATT_HOUR}
                    </text>
                    <text x="411" y="157" class="st3 st8"
                          display="${[0].includes(data.additionalLoad) || (!data.showAux && [1, 2].includes(data.additionalLoad)) ? '' : 'none'}"
                          fill="${data.loadColour}">${config.load.essential_name}
                    </text>
                    <text id="ess_load" x="411" y="130" class="st3 st8"
                          display="${([1,2].includes(data.additionalLoad) && data.showAux) || (!data.showAux && [4].includes(data.additionalLoad)) ? '' : 'none'}"
                          fill="${data.loadColour}">${config.load.essential_name}
                    </text>
                    <text id="ess-load1" x="416" y="${!data.showAux ? 70 : 181}" class="st3 left-align"
                          display="${data.additionalLoad === 1 ? '' : 'none'}" fill="${data.loadColour}">
                        ${config.load.load1_name}
                    </text>
                    <text id="ess-load2" x="${!data.showAux ? 405 : 402}"
                          y="${!data.showAux ? 59 : 178}" class="st3 st8 right-align"
                          display="${[2, 4].includes(data.additionalLoad) ? '' : 'none'}" fill="${data.loadColour}">
                        ${config.load.load1_name}
                    </text>
                    <text id="ess-load2" x="${!data.showAux ? 418 : 415}"
                          y="${!data.showAux ? 59 : 178}" class="st3 st8 left-align"
                          display="${[2, 4].includes(data.additionalLoad) ? '' : 'none'}" fill="${data.loadColour}">
                        ${config.load.load2_name}
                    </text>
                    <text id="ess-load4" x="405"
                          y="178" class="st3 st8 right-align"
                          display="${[4].includes(data.additionalLoad) ? '' : 'none'}" fill="${data.loadColour}">
                        ${config.load.load3_name}
                    </text>
                    <text id="ess-load4" x="418"
                          y="178" class="st3 st8 left-align"
                          display="${[4].includes(data.additionalLoad) ? '' : 'none'}" fill="${data.loadColour}">
                        ${config.load.load4_name}
                    </text>
                    <text id="daily_load_aux" x="${data.additionalAuxLoad === 2 ? '238' : '238'}" y="93"
                          class="st3 left-align"
                          fill="${!data.loadShowDaily || !data.showAux ? 'transparent' : `${data.loadColour}`}">
                        ${localize('common.daily_load')}
                    </text>
                    <text id="daily_load" x="${data.additionalLoad === 0 ? '377' : '238'}"
                          y="${data.additionalLoad === 0 ? 71 : 93}" class="st3 left-align"
                          fill="${!data.loadShowDaily || data.showAux ? 'transparent' : `${data.loadColour}`}">
                        ${localize('common.daily_load')}
                    </text>
                    <text id="daily_solar" x="43.5" y="29" class="st3 left-align"
                          display="${config.solar.display_mode === 1 ? '' : 'none'}"
                          fill="${!data.solarShowDaily || !config.show_solar ? 'transparent' : `${data.solarColour}`}">
                        ${localize('common.daily_solar')}
                    </text>
                    <text id="remaining_solar" x="43.5" y="29" class="st3 left-align"
                          display="${config.solar.display_mode === 2 ? '' : 'none'}"
                          fill="${!data.solarShowDaily || !config.show_solar ? 'transparent' : `${data.solarColour}`}">
                        ${localize('common.daily_solar_left')}
                    </text>
                    <text id="total_solar_generation" x="43.5" y="29" class="st3 left-align"
                          display="${config.solar.display_mode === 3 ? '' : 'none'}"
                          fill="${!data.solarShowDaily || !config.show_solar ? 'transparent' : `${data.solarColour}`}">
                        ${localize('common.total_solar_generation')}
                    </text>
                    <text id="daily_bat_charge" x="4.5" y="251" class="st3 left-align"
                          fill="${data.batteryShowDaily !== true || !config.show_battery ? 'transparent' : `${data.batteryColour}`}">
                        ${localize('common.daily_charge')}
                    </text>
                    <text id="daily_bat_discharge" x="4.5" y="285" class="st3 left-align"
                          fill="${data.batteryShowDaily !== true || !config.show_battery ? 'transparent' : `${data.batteryColour}`}">
                        ${localize('common.daily_discharge')}
                    </text>
                    <text id="daily_grid_buy" 
                          x="${!data.showNonessential ? '311' : '347'}"                
                          y="${!data.showNonessential
                                   ? '368' 
                                   : config.entities?.max_sell_power ? '256' : '253'}"                           
                          class="st3 left-align"
                          fill="${data.gridShowDailyBuy !== true ? 'transparent' : `${data.gridColour}`}"
                          display="${!config.show_grid ? 'none' : ''}">
                        ${localize('common.daily_grid_buy')}
                    </text>
                    <text id="daily_grid_sell" 
                          x="${!data.showNonessential ? '311' : '347'}"
                          y="${!data.showNonessential 
                                   ? '337' 
                                   : config.entities?.max_sell_power ? '225' : '222'}" 
                          class="st3 left-align"
                          fill="${data.gridShowDailySell !== true ? 'transparent' : `${data.gridColour}`}"
                          display="${!config.show_grid ? 'none' : ''}">
                        ${localize('common.daily_grid_sell')}
                    </text>
                    <text id="aux_one" x="411" y="82" class="st3 st8"
                          display="${!data.showAux || [1, 2].includes(data.additionalAuxLoad) ? 'none' : ''}"
                          fill="${data.auxStatus === 'on' || data.auxStatus === '1' ? `${data.auxDynamicColour}` : `${data.auxOffColour}`}">
                        ${config.load.aux_name}
                    </text>
                    <text id="noness" x="340" y="377" class="st3 st8"
                          display="${!config.show_grid || !data.showNonessential ? 'none' : ''}"
                          fill="${data.gridColour}">
                        ${config.grid.nonessential_name}
                    </text>
                    <text id="noness1" x="340" y="338" class="st3 st8"
                          display="${!config.show_grid || !data.showNonessential || [0, 2, 3].includes(data.nonessentialLoads) ? 'none' : ''}"
                          fill="${data.gridColour}">${config.grid.load1_name}
                    </text>
                    <text id="noness2" x="321" y="338" class="st3 st8"
                          display="${!config.show_grid || !data.showNonessential || [0, 1].includes(data.nonessentialLoads) ? 'none' : ''}"
                          fill="${data.gridColour}">${config.grid.load1_name}
                    </text>
                    <text id="noness2" x="358" y="338" class="st3 st8"
                          display="${!config.show_grid || !data.showNonessential || [0, 1].includes(data.nonessentialLoads) ? 'none' : ''}"
                          fill="${data.gridColour}">${config.grid.load2_name}
                    </text>
                    <text id="noness3" x="284" y="338" class="${config.battery.hide_soc ? 'st3 st8' : 'st12'}"
                          display="${!config.show_grid || !data.showNonessential || [0, 1, 2].includes(data.nonessentialLoads) ? 'none' : ''}"
                          fill="${data.gridColour}">${config.grid.load3_name}
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
                          fill="${data.auxDynamicColour}">${config.load.aux_daily_name}
                    </text>
                    <text id="load-power-3P" x="237" y="142"
                          display="${config.inverter.three_phase && config.entities?.load_power_L1 ? '' : 'none'}"
                          class="st3 left-align" fill="${data.loadColour}">
                        ${config.inverter.three_phase && config.entities?.load_power_L1 ? data.loadPowerL1 : '0'}
                        ${config.inverter.three_phase && config.entities?.load_power_L2 ? '| ' + data.loadPowerL2 : ''}
                        ${config.inverter.three_phase && config.entities?.load_power_L3 ? '| ' + data.loadPowerL3 : ''}
                        ${UnitOfPower.WATT}
                    </text>
                    <text id="battery_soc_184" x="205" y="327" fill=${data.batteryColour}
                          class="${config.battery.hide_soc || !config.show_battery ? 'st12' : 'st14 left-align'}"
                          display="${[InverterModel.GoodweGridMode, InverterModel.Goodwe, InverterModel.Huawei].includes(data.inverterModel) && config.battery?.shutdown_soc_offgrid ? '' : 'none'}">
                        ${data.batteryShutdown}%
                    </text>
                    <text id="battery_soc_184" x="205" y="340" fill=${data.batteryColour}
                          class="${config.battery.hide_soc || !config.show_battery ? 'st12' : 'st14 left-align'}"
                          display="${[InverterModel.GoodweGridMode, InverterModel.Goodwe, InverterModel.Huawei].includes(data.inverterModel) && config.battery?.shutdown_soc_offgrid ? '' : 'none'}">
                        ${data.shutdownOffGrid}%
                    </text>

                    <circle id="standby" cx="160" cy="304" r="3.5" fill="${data.inverterStateColour}"/>
                    <circle id="bat" cx="${!config.battery.show_remaining_energy ? '73' : '8'}" cy="377" r="3"
                            display="${config.entities?.battery_status === 'none' || !config.entities?.battery_status || !config.show_battery ? 'none' : ''}"
                            fill="${data.batteryStateColour}"/>

                    <path id="es-load1" d="M 409 143 L 409 135" display="${data.showAux ? '' : 'none'}"
                          class="${[1, 2].includes(data.additionalLoad) ? '' : 'st12'}" fill="none"
                          stroke="${data.loadColour}" stroke-width="1" stroke-miterlimit="10"
                          pointer-events="stroke"/>
                    <path id="es-load1" d="M 412 143 L 412 135" display="${!data.showAux ? '' : 'none'}"
                          class="${[4].includes(data.additionalLoad) ? '' : 'st12'}" fill="none"
                          stroke="${data.loadColour}" stroke-width="1" stroke-miterlimit="10"
                          pointer-events="stroke"/>
                    <path id="es-load1" d="M 412 80 L 412 60" display="${!data.showAux ? '' : 'none'}"
                          class="${data.additionalLoad === 1 ? '' : 'st12'}" fill="none" stroke="${data.loadColour}"
                          stroke-width="1" stroke-miterlimit="10" pointer-events="stroke"/>
                    <path id="es-load2" d="M 412 80 L 412 53" display="${!data.showAux ? '' : 'none'}"
                          class="${[2, 4].includes(data.additionalLoad) ? '' : 'st12'}" fill="none" stroke="${data.loadColour}"
                          stroke-width="1" stroke-miterlimit="10" pointer-events="stroke"/>
                    <svg id="pv1-flow">
                        <path id="pv1-line"
                              d="${config.solar.mppts === 1 ? 'M 86 175 M 155 250 L 96 250 Q 86 250 86 240 L 86 56 H 70' : 'M 86 162 L 86 56 Q 86 56 86 56 L 70 56'}"
                              class="${!config.show_solar ? 'st12' : ''}" fill="none"
                              stroke="${data.solarColour}" stroke-width="${data.pv1LineWidth}" stroke-miterlimit="10"
                              pointer-events="stroke"/>
                        <circle id="pv1-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.pv1LineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                class="${!config.show_solar ? 'st12' : ''}"
                                fill="${Math.round(data.pv1PowerWatts) <= 0 ? 'transparent' : `${data.solarColour}`}">
                            <animateMotion dur="${data.durationCur['pv1']}s" repeatCount="indefinite"
                                           keyPoints="1;0"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#pv1-line"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <svg id="pv2-flow">
                        <path id="pv2-line" d="M 86 162 L 86 56 Q 86 56 86 56 L 101 56"
                              class="${!config.show_solar || config.solar.mppts === 1 ? 'st12' : ''}"
                              fill="none" stroke="${data.solarColour}" stroke-width="${data.pv2LineWidth}"
                              stroke-miterlimit="10"
                              pointer-events="stroke"/>
                        <circle id="pv2-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.pv2LineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                class="${!config.show_solar || config.solar.mppts === 1 ? 'st12' : ''}"
                                fill="${Math.round(data.pv2PowerWatts) <= 0 ? 'transparent' : `${data.solarColour}`}">
                            <animateMotion dur="${data.durationCur['pv2']}s" repeatCount="indefinite"
                                           keyPoints="1;0"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#pv2-line"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <svg id="pv3-flow">
                        <path id="pv3-line" d="M 86 162 L 86 115 Q 86 115 86 115 L 70 115"
                              class="${!config.show_solar || [1, 2].includes(config.solar.mppts) ? 'st12' : ''}"
                              fill="none" stroke="${data.solarColour}" stroke-width="${data.pv3LineWidth}"
                              stroke-miterlimit="10"
                              pointer-events="stroke"/>
                        <circle id="pv3-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.pv3LineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                class="${!config.show_solar || [1, 2].includes(config.solar.mppts) ? 'st12' : ''}"
                                fill="${Math.round(data.pv3PowerWatts) <= 0 ? 'transparent' : `${data.solarColour}`}">
                            <animateMotion dur="${data.durationCur['pv3']}s" repeatCount="indefinite"
                                           keyPoints="1;0"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#pv3-line"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <svg id="pv4-flow">
                        <path id="pv4-line" d="M 86 162 L 86 115 Q 86 115 86 115 L 101 115"
                              class="${!config.show_solar || [1, 2, 3].includes(config.solar.mppts) ? 'st12' : ''}"
                              fill="none" stroke="${data.solarColour}" stroke-width="${data.pv4LineWidth}"
                              stroke-miterlimit="10"
                              pointer-events="stroke"/>
                        <circle id="pv4-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.pv4LineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                class="${!config.show_solar || [1, 2, 3].includes(config.solar.mppts) ? 'st12' : ''}"
                                fill="${Math.round(data.pv4PowerWatts) <= 0 ? 'transparent' : `${data.solarColour}`}">
                            <animateMotion dur="${data.durationCur['pv4']}s" repeatCount="indefinite"
                                           keyPoints="1;0"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#pv4-line"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <svg id="solar-flow">
                        <path id="so-line" d="M 155 250 L 96 250 Q 86 250 86 240 L 86 192"
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
                    <svg id="battery-flow">
                        <path id="bat-line" d="M 155 280 L 91 280 Q 85 280 86 286 L 86 297"
                              class="${!config.show_battery ? 'st12' : ''}" fill="none"
                              stroke="${config.battery.dynamic_colour ? data.flowBatColour : data.batteryColour}" stroke-width="${data.batLineWidth}" stroke-miterlimit="10"
                              pointer-events="stroke"/>
                        <circle id="power-dot-discharge" cx="0" cy="0"
                                r="${Math.min(2 + data.batLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                class="${!config.show_battery ? 'st12' : ''}"
                                fill="${data.batteryPower < 0 || data.batteryPower === 0 ? 'transparent' : `${data.batteryColour}`}">
                            <animateMotion dur="${data.durationCur['battery']}s" repeatCount="indefinite"
                                           keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#bat-line"/>
                            </animateMotion>
                        </circle>
                        <circle id="power-dot-charge" cx="0" cy="0"
                                r="${Math.min(2 + data.batLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                class="${!config.show_battery ? 'st12' : ''}"
                                fill="${data.batteryPower > 0 || data.batteryPower === 0 ? 'transparent' : `${config.battery.dynamic_colour ? data.flowBatColour : data.batteryColour}`}">
                            <animateMotion dur="${data.durationCur['battery']}s" repeatCount="indefinite"
                                           keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#bat-line"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <svg id="grid-flow">
                        <path id="grid-line" d="M 304 188 L 411 188 Q 421 188 421 198 L421 265" fill="none"
                              stroke="${data.gridColour}" stroke-width="${data.gridLineWidth}" stroke-miterlimit="10"
                              pointer-events="stroke" display="${!config.show_grid ? 'none' : ''}"/>
                        <circle id="grid-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                fill="${data.totalGridPower < 0 || data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}"
                                display="${!config.show_grid ? 'none' : ''}">
                            <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                           keyPoints="1;0"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#grid-line"/>
                            </animateMotion>
                        </circle>
                        <circle id="grid-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                fill="${data.totalGridPower > 0 || data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}"
                                display="${!config.show_grid ? 'none' : ''}">
                            <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                           keyPoints="0;1"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#grid-line"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <svg id="grid1-flow">
                        <path id="grid-line1"
                              d="${config.inverter.three_phase ? 'M 421 295 L 421 337' : 'M 421 295 L 421 310.5'}"
                              fill="none" stroke="${data.gridColour}" stroke-width="${data.gridLineWidth}"
                              stroke-miterlimit="10"
                              pointer-events="stroke" display="${!config.show_grid ? 'none' : ''}"/>
                        <circle id="grid-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                fill="${data.totalGridPower < 0 || data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}"
                                display="${!config.show_grid ? 'none' : ''}">
                            <animateMotion dur="${data.durationCur['grid'] / 1.5}s" repeatCount="indefinite"
                                           keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#grid-line1"/>
                            </animateMotion>
                        </circle>
                        <circle id="grid-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                fill="${data.totalGridPower > 0 || data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}"
                                display="${!config.show_grid ? 'none' : ''}">
                            <animateMotion dur="${data.durationCur['grid'] / 1.5}s" repeatCount="indefinite"
                                           keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#grid-line1"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <svg id="ne1-flow">
                        <path id="ne-line1" d="M 339 295 L 339 310" fill="none" stroke="${data.gridColour}"
                              stroke-width="${data.nonessLineWidth}" stroke-miterlimit="10"
                              display="${!config.show_grid ? 'none' : ''}"
                              class="${!data.showNonessential ? 'st12' : ''}" pointer-events="stroke"/>
                        <circle id="ne-dot1" cx="0" cy="0"
                                r="${Math.min(2 + data.nonessLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                class="${!data.showNonessential ? 'st12' : ''}"
                                fill="${data.nonessentialPower <= 0 ? 'transparent' : `${data.gridColour}`}"
                                display="${!config.show_grid ? 'none' : ''}">
                            <animateMotion dur="${data.durationCur['ne'] / 1.5}s" repeatCount="indefinite"
                                           keyPoints="0;1"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#ne-line1"/>
                            </animateMotion>
                        </circle>
                    </svg>
                    <svg id="ne-flow">
                        <path id="ne-line" d="M 339 265 L 339 188" fill="none" stroke="${data.gridColour}"
                              stroke-width="${data.nonessLineWidth}" stroke-miterlimit="10"
                              display="${!config.show_grid ? 'none' : ''}"
                              class="${!data.showNonessential ? 'st12' : ''}" pointer-events="stroke"/>
                        <circle id="ne-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.nonessLineWidth + Math.max(data.minLineWidth - 2, 0), 5)}"
                                class="${!data.showNonessential ? 'st12' : ''}"
                                fill="${data.nonessentialPower <= 0 ? 'transparent' : `${data.gridColour}`}"
                                display="${!config.show_grid ? 'none' : ''}">
                            <animateMotion dur="${data.durationCur['ne']}s" repeatCount="indefinite"
                                           keyPoints="1;0"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#ne-line"/>
                            </animateMotion>
                        </circle>
                    </svg>
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
                        <path id="aux-line2" d="M 180 162 L 180 57 Q 180 47 190 47 L 237 47" fill="none"
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
                    <svg id="grid2-flow">
                        <path id="grid2-line" d="M215 187 234 187" fill="none"
                              stroke="${data.gridColour}" stroke-width="${data.grid169LineWidth}" stroke-miterlimit="10"
                              pointer-events="stroke" display="${!config.show_grid ? 'none' : ''}"/>
                        <circle id="grid-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                fill="${data.autoScaledGridPower < 0 || data.autoScaledGridPower === 0 ? 'transparent' : `${data.gridColour}`}"
                                display="${!config.show_grid ? 'none' : ''}">
                            <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                           keyPoints="1;0"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#grid2-line"/>
                            </animateMotion>
                        </circle>
                        <circle id="grid-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                fill="${data.autoScaledGridPower > 0 || data.autoScaledGridPower === 0 ? 'transparent' : `${data.gridColour}`}"
                                display="${!config.show_grid ? 'none' : ''}">
                            <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                           keyPoints="0;1"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#grid2-line"/>
                            </animateMotion>
                        </circle>
                    </svg>

                    <path d="${config.inverter.three_phase ? 'M 180 223 L 180 235' : 'M 180 212 L 180 235'}"
                          fill="none" stroke="${data.inverterColour}" stroke-width="${data.minLineWidth}" stroke-miterlimit="10"
                          pointer-events="stroke"/>
                    
                    <svg id="load-flow">
                        <circle id="es-dot" cx="0" cy="0"
                                r="${Math.min(2 + data.loadLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                                fill="${data.essentialPower === 0 ? 'transparent' : `${config.load.dynamic_colour ? data.flowColour : data.loadColour}`}">
                            <animateMotion dur="${data.durationCur['load']}s" repeatCount="indefinite"
                                           keyPoints="0;1"
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
                                fill="${data.essentialPower === 0 ? 'transparent' : `${config.load.dynamic_colour ? data.flowColour : data.loadColour}`}">
                            <animateMotion dur="${data.durationCur['load']}s" repeatCount="indefinite"
                                           keyPoints="1;0"
                                           keyTimes="0;1" calcMode="linear">
                                <mpath xlink:href="#es-line"/>
                            </animateMotion>
                        </circle>
                        <path id="es-line" d="M 236 118 L 190 118 Q 180 118 180 128 L 180 162" fill="none"
                              stroke="${config.load.dynamic_colour ? data.flowColour : data.loadColour}" stroke-width="${data.loadLineWidth}" stroke-miterlimit="10"
                              pointer-events="stroke"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" x="154.5" y="224.75" width="54"
                         height="79" viewBox="0 0 74 91" preserveAspectRatio="xMidYMid meet"
                         opacity="${!data.genericInverterImage ? 0 : 1}">
                        <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)"
                           fill="${data.inverterColour}" stroke="none">
                            <path d="${icons.inverter}"/>
                        </g>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="bat" x="74.5"
                         y="${config.battery?.show_remaining_energy ? "294" : "296.25"}" width="82"
                         height="82" preserveAspectRatio="none"
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
                                      stop-color="${data.batteryColour}"/>
                                <stop offset="100%"
                                      stop-color="${data.batteryColour}"/>
                            </linearGradient>
                        </defs>
                        <path class="${!config.show_battery ? 'st12' : ''}"
                              fill="${config.battery.dynamic_colour ? 'url(#bLg)' : data.batteryColour}"
                              d="${config.battery.linear_gradient ? data.battery0 : data.batteryIcon}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="bat" x="74.5"
                         y="${config.battery?.show_remaining_energy ? "294" : "296.25"}" width="82"
                         height="82" preserveAspectRatio="none"
                         viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="sLg" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                      stop-color="red"/>
                                <stop offset="100%"
                                      stop-color="${data.stopColour}"/>
                                <animate attributeName="${config.battery.animate ? 'y2' : 'none'}" dur="6s" values="100%; 0%" repeatCount="indefinite" />
                            </linearGradient>
                        </defs>
                        <path class="${!config.show_battery ? 'st12' : ''}"
                              fill="${config.battery.linear_gradient ? 'url(#sLg)' : data.batteryColour}"
                              display="${!config.battery.linear_gradient ? 'none' : ''}"
                              d="${data.batteryCharge}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="sun" x="0" y="-0.5" width="40" height="40"
                         viewBox="0 0 24 24">
                        <path class="${!config.show_solar ? 'st12' : ''}" fill="${data.solarColour}"
                              d="${icons.sun}"/>
                    </svg>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_connected_status_194)}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="transmission_on"
                             x="${config.inverter.three_phase ? '404' : '389'}"
                             y="${config.inverter.three_phase ? '339' : '308'}"
                             width="${config.inverter.three_phase ? '34' : '65'}"
                             height="${config.inverter.three_phase ? '34' : '65'}" viewBox="0 0 24 24">
                            <path class="${validGridDisconnected.includes(data.gridStatus.toLowerCase()) ? 'st12' : ''}"
                                  fill="${data.gridColour}"
                                  display="${!config.show_grid || data.totalGridPower < 0 ? 'none' : ''}"
                                  d="${icons.gridOn}"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" id="transmission_off"
                             x="${config.inverter.three_phase ? '404' : '389'}"
                             y="${config.inverter.three_phase ? '339' : '308'}"
                             width="${config.inverter.three_phase ? '34' : '65'}"
                             height="${config.inverter.three_phase ? '34' : '65'}" viewBox="0 0 24 24">
                            <path class="${validGridConnected.includes(data.gridStatus.toLowerCase()) ? 'st12' : ''}"
                                  fill="${data.gridOffColour}" display="${!config.show_grid ? 'none' : ''}"
                                  d="${icons.gridOff}"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" id="grid_export"
                             x="${config.inverter.three_phase ? '404' : '389'}"
                             y="${config.inverter.three_phase ? '339' : '308'}"
                             width="${config.inverter.three_phase ? '34' : '65'}"
                             height="${config.inverter.three_phase ? '34' : '65'}" viewBox="0 0 24 24">
                            <path class="${validGridDisconnected.includes(data.gridStatus.toLowerCase()) ? 'st12' : ''}"
                                  fill="${data.gridColour}"
                                  display="${!config.show_grid || data.totalGridPower >= 0 ? 'none' : ''}"
                                  d="${icons.gridExport}"/>
                        </svg>
                    </a>

                    <!-- Nonessential Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness_default" x="303.5" y="305.5" width="70"
                         height="70" viewBox="0 0 24 24"
                         opacity="${data.nonessentialIcon === 'default' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [1, 2, 3].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.nonEss}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness_oven" x="303.5" y="305.5" width="70"
                         height="70" viewBox="0 0 32 32" opacity="${data.nonessentialIcon === 'oven' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [1, 2, 3].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.oven}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness_boiler" x="303.5" y="305.5" width="70"
                         height="70" viewBox="0 0 24 24"
                         opacity="${data.nonessentialIcon === 'boiler' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [1, 2, 3].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.boiler}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness_pump" x="303.5" y="305.5" width="70"
                         height="70" viewBox="0 0 24 24" opacity="${data.nonessentialIcon === 'pump' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [1, 2, 3].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.pump}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness_ac" x="311" y="312" width="55"
                         height="55" viewBox="0 0 24 24"
                         opacity="${data.nonessentialIcon === 'aircon' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [1, 2, 3].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.aircon}"/>
                    </svg>

                    <g display="${!config.show_grid || !data.showNonessential || [1, 2, 3].includes(data.nonessentialLoads) ? 'none' : ''}">
                        <foreignObject x="303.5" y="303.5" width="85" height="85" style="position: fixed; ">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed; ">
                                <ha-icon icon="${data.nonessentialIcon}" class="noness-icon"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>

                    <!-- Nonessential Load Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness_default" x="320" y="339" width="38"
                         height="38" viewBox="0 0 24 24"
                         opacity="${data.iconNonessentialLoad1 === 'default' && data.iconNonessentialLoad2 === 'default' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [0, 1].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.nonEss}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness_default_left" x="306" y="341" width="32"
                         height="32" viewBox="0 0 24 24"
                         opacity="${data.iconNonessentialLoad1 === 'default' && data.iconNonessentialLoad2 != 'default' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [0, 1].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.nonEss}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness_default_right" x="343" y="341" width="32"
                         height="32" viewBox="0 0 24 24"
                         opacity="${data.iconNonessentialLoad1 != 'default' && data.iconNonessentialLoad2 === 'default' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [0, 1].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.nonEss}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness_boiler_left" x="306" y="341" width="32"
                         height="32" viewBox="0 0 24 24"
                         opacity="${data.iconNonessentialLoad1 === 'boiler' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [0, 1].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.boiler}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness_boiler_right" x="343" y="341" width="32"
                         height="32" viewBox="0 0 24 24"
                         opacity="${data.iconNonessentialLoad2 === 'boiler' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [0, 1].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.boiler}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness_pump_left" x="306" y="341" width="32"
                         height="32" viewBox="0 0 24 24" opacity="${data.iconNonessentialLoad1 === 'pump' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [0, 1].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.pump}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness_pump_right" x="343" y="341" width="32"
                         height="32" viewBox="0 0 24 24" opacity="${data.iconNonessentialLoad2 === 'pump' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [0, 1].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.pump}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness_oven_left" x="306" y="341" width="32"
                         height="32" viewBox="0 0 32 32" opacity="${data.iconNonessentialLoad1 === 'oven' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [0, 1].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.oven}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness_oven_right" x="343" y="341" width="32"
                         height="32" viewBox="0 0 32 32" opacity="${data.iconNonessentialLoad2 === 'oven' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [0, 1].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.oven}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness_ac_left" x="308" y="345" width="25"
                         height="25" viewBox="0 0 24 24"
                         opacity="${data.iconNonessentialLoad1 === 'aircon' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [0, 1].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.aircon}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness_ac_right" x="345" y="345" width="25"
                         height="25" viewBox="0 0 24 24"
                         opacity="${data.iconNonessentialLoad2 === 'aircon' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [0, 1].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.aircon}"/>
                    </svg>

                    <g display="${!config.show_grid || !data.showNonessential || [0, 1].includes(data.nonessentialLoads) ? 'none' : ''}">
                        <foreignObject x="306" y="341" width="30" height="30" style="position: fixed; ">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed; ">
                                <ha-icon icon="${data.iconNonessentialLoad1}" class="nonessload-icon"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>

                    <g display="${!config.show_grid || !data.showNonessential || [0, 1].includes(data.nonessentialLoads) ? 'none' : ''}">
                        <foreignObject x="343" y="341" width="30" height="30" style="position: fixed; ">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed; ">
                                <ha-icon icon="${data.iconNonessentialLoad2}" class="nonessload-icon"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>

                    <g display="${!config.show_grid || !data.showNonessential || [0, 1, 2].includes(data.nonessentialLoads) || !config.battery.hide_soc ? 'none' : ''}"
                       opacity="${config.battery.hide_soc ? 1 : 0}">
                        <foreignObject x="269" y="341" width="30" height="30" style="position: fixed; ">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed; ">
                                <ha-icon icon="${data.iconNonessentialLoad3}" class="nonessload-icon"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>

                    <svg xmlns="http://www.w3.org/2000/svg" id="noness1_default" x="324.5" y="341" width="32"
                         height="32" viewBox="0 0 24 24"
                         opacity="${data.iconNonessentialLoad1 === 'default' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [0, 2, 3].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.nonEss}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness1_boiler" x="324.5" y="341" width="32"
                         height="32" viewBox="0 0 24 24"
                         opacity="${data.iconNonessentialLoad1 === 'boiler' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [0, 2, 3].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.boiler}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness1_pump" x="324.5" y="341" width="32"
                         height="32" viewBox="0 0 24 24" opacity="${data.iconNonessentialLoad1 === 'pump' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [0, 2, 3].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.pump}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness1_oven" x="324.5" y="341" width="32"
                         height="32" viewBox="0 0 32 32" opacity="${data.iconNonessentialLoad1 === 'oven' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [0, 2, 3].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.oven}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="noness1_ac" x="326.5" y="345" width="25"
                         height="25" viewBox="0 0 24 24"
                         opacity="${data.iconNonessentialLoad1 === 'aircon' ? '1' : '0'}">
                        <path display="${!config.show_grid || !data.showNonessential || [0, 2, 3].includes(data.nonessentialLoads) ? 'none' : ''}"
                              fill="${data.gridColour}"
                              d="${icons.aircon}"/>
                    </svg>

                    <g display="${!config.show_grid || !data.showNonessential || [0, 2, 3].includes(data.nonessentialLoads) ? 'none' : ''}">
                        <foreignObject x="324.5" y="341" width="30" height="30" style="position: fixed; ">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed; ">
                                <ha-icon icon="${data.iconNonessentialLoad1}" class="nonessload-icon"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>

                    <!-- Essential Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" id="essen_aux" x="373.5"
                         y="${data.essIconSize === 1 ? "82.5" : "78.5"}" width="77"
                         height="77" viewBox="0 0 24 24">
                         <defs>
                            <linearGradient id="Lg" x1="0%" x2="0%" y1="100%" y2="0%">
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
                              fill="${config.load.dynamic_colour ? 'url(#Lg)' : data.loadColour}"
                              d="${data.essIcon}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="essen_noaux" x="390" y="89" width="38"
                         height="38" viewBox="0 0 24 24">
                         <defs>
                            <linearGradient id="Lg" x1="0%" x2="0%" y1="100%" y2="0%">
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
                              fill="${config.load.dynamic_colour ? 'url(#Lg)' : data.loadColour}"
                              d="${data.essIcon}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="essen_noaux_four" x="387" y="77" width="50"
                         height="50" viewBox="0 0 24 24">
                         <defs>
                            <linearGradient id="Lg" x1="0%" x2="0%" y1="100%" y2="0%">
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
                        <path display="${[4].includes(data.additionalLoad) && !data.showAux ? '' : 'none'}"
                              fill="${config.load.dynamic_colour ? 'url(#Lg)' : data.loadColour}"
                              d="${data.essIcon}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="essen_default" x="373.5"
                         y="${data.essIconSize === 1 ? "82.5" : "78.5"}" width="77"
                         height="77" viewBox="0 0 24 24">
                         <defs>
                            <linearGradient id="Lg" x1="0%" x2="0%" y1="100%" y2="0%">
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
                        <path display="${[1, 2, 3, 4].includes(data.additionalLoad) ? 'none' : ''}"
                              fill="${config.load.dynamic_colour ? 'url(#Lg)' : data.loadColour}"
                              d="${data.essIcon}"/>
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
                            <foreignObject x="375" y="8" width="70" height="70" style="position: fixed; ">
                                <body xmlns="http://www.w3.org/1999/xhtml">
                                <div style="position: fixed; ">
                                    <ha-icon icon="${data.auxType}"
                                             class="${data.auxStatus === 'on' || data.auxStatus === '1' ? 'aux-icon' : 'aux-off-icon'}"></ha-icon>
                                </div>
                                </body>
                            </foreignObject>
                        </g>
                    </a>

                    <g display="${!data.showAux || data.additionalAuxLoad === 0 ? 'none' : ''}">
                        <foreignObject x="345" y="18" width="40" height="40" style="position: fixed; ">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed; ">
                                <ha-icon icon="${data.iconAuxLoad1}" class="aux-small-icon-1"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>

                    <g display="${!data.showAux || [0, 1].includes(data.additionalAuxLoad) ? 'none' : ''}">
                        <foreignObject x="345" y="52" width="40" height="40" style="position: fixed; ">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed; ">
                                <ha-icon icon="${data.iconAuxLoad2}" class="aux-small-icon-2"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>

                    <!-- Essential Boiler Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_boiler_left_bottom" x="369" y="123"
                         width="24" height="24" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad1 === 'boiler' && [2].includes(data.additionalLoad) ? '1' : '0'}">
                        <path display="${data.showAux && [2].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.boiler}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_boiler_right_bottom" x="427" y="123"
                         width="24" height="24" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad2 === 'boiler' && [2].includes(data.additionalLoad) ? '1' : '0'}">
                        <path display="${data.showAux && [2].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.boiler}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_boiler_left_top" x="382" y="5" width="24"
                         height="24" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad1 === 'boiler' && [2, 4].includes(data.additionalLoad) && !data.showAux ? '1' : '0'}">
                        <path display="${[2, 4].includes(data.additionalLoad)  ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.boiler}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_boiler_right_top" x="419" y="5" width="24"
                         height="24" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad2 === 'boiler' && [2, 4].includes(data.additionalLoad) && !data.showAux ? '1' : '0'}">
                        <path display="${[2, 4].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.boiler}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_boiler_aux" x="340" y="140" width="36"
                         height="36" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad1 === 'boiler' && data.additionalLoad === 1 ? '1' : '0'}">
                        <path display="${data.showAux && [1].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.boiler}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_boiler_noaux" x="340" y="27" width="36"
                         height="36" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad1 === 'boiler' && data.additionalLoad === 1 && !data.showAux ? '1' : '0'}">
                        <path display="${[1].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.boiler}"/>
                    </svg>

                    <!-- Essential Aircon Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_ac_left_bottom" x="371" y="124" width="20"
                         height="20" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad1 === 'aircon' && [2].includes(data.additionalLoad) ? '1' : '0'}">
                        <path display="${data.showAux && [2].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.aircon}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_ac_right_bottom" x="429" y="124" width="20"
                         height="20" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad2 === 'aircon' && [2, 3, 4].includes(data.additionalLoad) ? '1' : '0'}">
                        <path display="${data.showAux && [2].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.aircon}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_ac_left_top" x="382" y="6" width="20"
                         height="20" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad1 === 'aircon' && [2, 4].includes(data.additionalLoad) && !data.showAux ? '1' : '0'}">
                        <path display="${[2, 4].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.aircon}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_ac_right_top" x="419" y="6" width="20"
                         height="20" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad2 === 'aircon' && [2, 4].includes(data.additionalLoad) && !data.showAux ? '1' : '0'}">
                        <path display="${[2, 4].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.aircon}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_ac_aux" x="342" y="143" width="30"
                         height="30" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad1 === 'aircon' && data.additionalLoad === 1 ? '1' : '0'}">
                        <path display="${data.showAux && [1].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.aircon}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_ac_noaux" x="342" y="30" width="30"
                         height="30" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad1 === 'aircon' && data.additionalLoad === 1 && !data.showAux ? '1' : '0'}">
                        <path display="${[1].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.aircon}"/>
                    </svg>

                    <!-- Essential Pump Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_pump_left_bottom" x="371" y="125" width="20"
                         height="25" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad1 === 'pump' && [2].includes(data.additionalLoad) ? '1' : '0'}">
                        <path display="${data.showAux && [2].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.pump}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_pump_right_bottom" x="429" y="125"
                         width="20" height="25" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad2 === 'pump' && [2].includes(data.additionalLoad) ? '1' : '0'}">
                        <path display="${data.showAux && [2].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.pump}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_pump_left_top" x="383" y="7" width="20"
                         height="25" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad1 === 'pump' && [2, 4].includes(data.additionalLoad) && !data.showAux ? '1' : '0'}">
                        <path display="${[2, 4].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.pump}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_pump_right_top" x="421" y="7" width="20"
                         height="25" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad2 === 'pump' && [2, 4].includes(data.additionalLoad) && !data.showAux ? '1' : '0'}">
                        <path display="${[2, 4].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.pump}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_pump_aux" x="336" y="140" width="36"
                         height="36" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad1 === 'pump' && data.additionalLoad === 1 ? '1' : '0'}">
                        <path display="${data.showAux && [1].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.pump}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_pump_noaux" x="336" y="27" width="36"
                         height="36" viewBox="0 0 24 24"
                         opacity="${data.iconEssentialLoad1 === 'pump' && data.additionalLoad === 1 && !data.showAux ? '1' : '0'}">
                        <path display="${[1].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.pump}"/>
                    </svg>

                    <!-- Essential Oven Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_oven_left_bottom" x="371" y="126" width="20"
                         height="20" viewBox="0 0 32 32"
                         opacity="${data.iconEssentialLoad1 === 'oven' && [2].includes(data.additionalLoad) ? '1' : '0'}">
                        <path display="${data.showAux && [2].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.oven}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_oven_right_bottom" x="429" y="126"
                         width="20" height="20" viewBox="0 0 32 32"
                         opacity="${data.iconEssentialLoad2 === 'oven' && [2].includes(data.additionalLoad) ? '1' : '0'}">
                        <path display="${data.showAux && [2].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.oven}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_oven_left_top" x="382" y="5" width="24"
                         height="24" viewBox="0 0 32 32"
                         opacity="${data.iconEssentialLoad1 === 'oven' && [2, 4].includes(data.additionalLoad) && !data.showAux ? '1' : '0'}">
                        <path display="${[2, 4].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.oven}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_oven_right_top" x="419" y="5" width="24"
                         height="24" viewBox="0 0 32 32"
                         opacity="${data.iconEssentialLoad2 === 'oven' && [2, 4].includes(data.additionalLoad) && !data.showAux ? '1' : '0'}">
                        <path display="${[2, 4].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.oven}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_oven_noaux" x="336" y="27" width="36"
                         height="36" viewBox="0 0 32 32"
                         opacity="${data.iconEssentialLoad1 === 'oven' && data.additionalLoad === 1 && !data.showAux ? '1' : '0'}">
                        <path display="${[1].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.oven}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="ess_oven_aux" x="336" y="140" width="36"
                         height="36" viewBox="0 0 32 32"
                         opacity="${data.iconEssentialLoad1 === 'oven' && data.additionalLoad === 1 ? '1' : '0'}">
                        <path display="${data.showAux && [1].includes(data.additionalLoad) ? '' : 'none'}"
                              fill="${data.loadColour}"
                              d="${icons.oven}"/>
                    </svg>

                    <g display="${[2, 4].includes(data.additionalLoad) ? '' : 'none'}">
                        <foreignObject x="${data.showAux ? '371' : '384'}"
                                       y="${data.showAux ? '123' : '5'}" width="30" height="30"
                                       style="position: fixed; ">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed; ">
                                <ha-icon icon="${data.iconEssentialLoad1}" class="essload-icon"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>

                    <g display="${[2, 4].includes(data.additionalLoad) ? '' : 'none'}">
                        <foreignObject x="${data.showAux ? '429' : '421'}"
                                       y="${data.showAux ? '123' : '5'}" width="30" height="30"
                                       style="position: fixed;">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed;">
                                <ha-icon icon="${data.iconEssentialLoad2}" class="essload-icon"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>

                    <g display="${[4].includes(data.additionalLoad) ? '' : 'none'}">
                        <foreignObject x="371" y="123" width="30" height="30"
                                       style="position: fixed; ">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed; ">
                                <ha-icon icon="${data.iconEssentialLoad3}" class="essload-icon"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>

                    <g display="${[4].includes(data.additionalLoad) ? '' : 'none'}">
                        <foreignObject x="429"
                                       y="123" width="30" height="30"
                                       style="position: fixed;">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed;">
                                <ha-icon icon="${data.iconEssentialLoad4}" class="essload-icon"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>
                    <g display="${[1].includes(data.additionalLoad) ? '' : 'none'}">
                        <foreignObject x="${data.showAux ? '336' : '336'}"
                                       y="${data.showAux ? '140' : '27'}" width="40" height="40"
                                       style="position: fixed; ">
                            <body xmlns="http://www.w3.org/1999/xhtml">
                            <div style="position: fixed; ">
                                <ha-icon icon="${data.iconEssentialLoad1}" class="essload1-icon"></ha-icon>
                            </div>
                            </body>
                        </foreignObject>
                    </g>

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
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.solar_sell_247)}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="solar_sell_on" x="96" y="197" width="18"
                             height="18" viewBox="0 0 30 30">
                            <path display="${!config.entities.solar_sell_247 || config.entities.solar_sell_247 === 'none' || data.stateSolarSell.state === 'off' || data.stateSolarSell.state === '0' || !config.show_solar || !['1', 'on'].includes(data.stateSolarSell.state) ? 'none' : ''}"
                                  fill="${data.solarColour}"
                                  d="${icons.solarSellOn}"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" id="solar_sell_off" x="96" y="197" width="18"
                             height="18" viewBox="0 0 30 30">
                            <path display="${!config.entities.solar_sell_247 || config.entities.solar_sell_247 === 'none' || data.stateSolarSell.state === 'on' || data.stateSolarSell.state === '1' || !config.show_solar || !['0', 'off'].includes(data.stateSolarSell.state) ? 'none' : ''}"
                                  fill="${data.solarColour}"
                                  d="${icons.solarSellOff}"/>
                        </svg>
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
                    <image x="155" y="224.75" width="53" height="72"
                           class="${!data.genericInverterImage ? '' : 'st12'}"
                           href="${inverterImg}"
                           preserveAspectRatio="none"/>

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
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_pv_energy_108)}>
                        <text id="daily_solar_value" x="43.5" y="15" class="st10 left-align"
                              display="${config.solar.display_mode === 1 && data.stateDayPVEnergy.isValid() ? '' : 'none'}"
                              fill="${!data.solarShowDaily || !config.show_solar ? 'transparent' : `${data.solarColour}`}">
                            ${data.stateDayPVEnergy.toPowerString(true, data.decimalPlacesEnergy)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_pv_energy_108)}>
                        <text id="remaining_solar_value" x="43.5" y="15" class="st10 left-align"
                              display="${config.solar.display_mode === 2 && data.stateDayPVEnergy.isValid() ? '' : 'none'}"
                              fill="${!data.solarShowDaily || !config.show_solar ? 'transparent' : `${data.solarColour}`}">
                            ${data.stateDayPVEnergy.toPowerString(true, data.decimalPlacesEnergy)} / ${data.remainingSolar}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_pv_energy_108)}>
                        <text id="total_solar_value" x="43.5" y="15" class="st10 left-align"
                              display="${config.solar.display_mode === 3 && data.stateDayPVEnergy.isValid() ? '' : 'none'}"
                              fill="${!data.solarShowDaily || !config.show_solar ? 'transparent' : `${data.solarColour}`}">
                            ${data.stateDayPVEnergy.toPowerString(true, data.decimalPlacesEnergy)} /
                            ${data.totalSolarGeneration}
                        </text>
                    </a>
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
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_battery_charge_70)}>
                        <text id="daily_bat_charge_value" x="4.5" y="237" class="st10 left-align"
                              display="${data.batteryShowDaily !== true || !config.show_battery || !data.stateDayBatteryCharge.isValid() ? 'none' : ''}"
                              fill="${data.batteryColour}">
                            ${data.stateDayBatteryCharge.toPowerString(true, data.decimalPlacesEnergy)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_battery_discharge_71)}>
                        <text id="daily_bat_discharge_value" x="4.5" y="271" class="st10 left-align"
                              display="${data.batteryShowDaily !== true || !config.show_battery || !data.stateDayBatteryDischarge.isValid()? 'none' : ''}"
                              fill="${data.batteryColour}">
                            ${data.stateDayBatteryDischarge.toPowerString(true, data.decimalPlacesEnergy)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_grid_import_76)}>
                        <text id="daily_grid_buy_value" 
                              x="${!data.showNonessential ? '311' : '347'}"                   
                              y="${!data.showNonessential
                                   ? '354' 
                                   : config.entities?.max_sell_power ? '242' : '239'}"   
                              class="st10 left-align"
                              display="${!config.show_grid || data.gridShowDailyBuy !== true || !data.stateDayGridImport.isValid() ? 'none' : ''}"
                              fill="${data.gridColour}">
                            ${data.stateDayGridImport.toPowerString(true, data.decimalPlacesEnergy)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_grid_export_77)}>
                        <text id="daily_grid_sell_value" 
                              x="${!data.showNonessential ? '311' : '347'}"
                              y="${!data.showNonessential 
                                   ? '323' 
                                   : config.entities?.max_sell_power ? '212' : '209'}" 
                              class="st10 left-align"
                              display="${!config.show_grid || data.gridShowDailySell !== true || !data.stateDayGridExport.isValid() ? 'none' : ''}"
                              fill="${data.gridColour}">
                            ${data.stateDayGridExport.toPowerString(true, data.decimalPlacesEnergy)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.max_sell_power)}>
                        <text id="max_sell_power" x="${!data.showNonessential ? '311' : '347'}"
                            y="${!data.showNonessential ? '309' : '198'}" class="st3 left-align"
                            fill="${['off', '0'].includes(data.stateSolarSell.state) ? 'grey' : data.gridColour}"
                            display="${!config.show_grid || !data.stateMaxSellPower.isValid || !config.entities?.max_sell_power ? 'none' : ''}">
                            ${localize('common.limit')}: ${data.stateMaxSellPower.toPowerString(config.grid.auto_scale, data.decimalPlaces)}
                    </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_aux_energy)}>
                        <text id="aux_daily_value"
                              x="${[1, 2].includes(data.additionalAuxLoad) ? '238' : '238'}"
                              y="12" class="st10 left-align"
                              display="${!data.showAux || data.showDailyAux !== true || !data.stateDayAuxEnergy.isValid() ? 'none' : ''}"
                              fill="${data.auxDynamicColour}">
                            ${data.stateDayAuxEnergy.toPowerString(true, data.decimalPlacesEnergy)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load1_extra)}>
                        <text id="ess_load1_value_extra" x="430" y="23"
                              display="${config.entities?.essential_load1_extra && data.additionalLoad === 1 && !data.showAux && data.stateEssentialLoad1Extra.isValid() ? '' : 'none'}"
                              class="st3 right-align" fill="${data.loadColour}">
                            ${data.stateEssentialLoad1Extra.toNum(1)}
                            ${data.stateEssentialLoad1Extra?.getUOM()}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load1_extra)}>
                        <text id="ess_load1_value_extra" x="360" y="136"
                              display="${config.entities?.essential_load1_extra && data.additionalLoad === 1 && data.showAux && data.stateEssentialLoad1Extra.isValid() ? '' : 'none'}"
                              class="st3 st8" fill="${data.loadColour}">
                            ${data.stateEssentialLoad1Extra.toNum(1)}
                            ${data.stateEssentialLoad1Extra?.getUOM()}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load1_extra)}>
                        <text id="ess_load2_value_extra" x="405" y="70"
                              display="${config.entities?.essential_load1_extra && [2, 4].includes(data.additionalLoad) && !data.showAux && data.stateEssentialLoad1Extra.isValid() ? '' : 'none'}"
                              class="st3 right-align" fill="${data.loadColour}">
                            ${data.stateEssentialLoad1Extra.toNum(1)}
                            ${data.stateEssentialLoad1Extra?.getUOM()}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load2_extra)}>
                        <text id="ess_load2_value_extra" x="418" y="70"
                              display="${config.entities?.essential_load2_extra && [2, 4].includes(data.additionalLoad) && !data.showAux && data.stateEssentialLoad2Extra.isValid() ? '' : 'none'}"
                              class="st3 left-align" fill="${data.loadColour}">
                            ${data.stateEssentialLoad2Extra.toNum(1)}
                            ${data.stateEssentialLoad2Extra?.getUOM()}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.non_essential_load1_extra)}>
                        <text id="non_ess_load1_value_extra" x="330" y="305"
                              display="${config.entities?.non_essential_load1_extra && [1, 2].includes(data.nonessentialLoads) && data.stateNonEssentialLoad1Extra.isValid() && config.show_grid ? '' : 'none'}"
                              class="st3 right-align" fill="${data.gridColour}">
                            ${data.stateNonEssentialLoad1Extra.toNum(1)}
                            ${data.stateNonEssentialLoad1Extra?.getUOM()}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.non_essential_load2_extra)}>
                        <text id="non_ess_load2_value_extra" x="348" y="305"
                              display="${config.entities?.non_essential_load2_extra && data.nonessentialLoads === 2 &&  data.stateNonEssentialLoad2Extra.isValid() && config.show_grid ? '' : 'none'}"
                              class="st3 left-align" fill="${data.gridColour}">
                            ${data.stateNonEssentialLoad2Extra.toNum(1)}
                            ${data.stateNonEssentialLoad2Extra?.getUOM()}
                        </text>
                    </a>
                    ${config.inverter.three_phase
                            ? config.entities?.grid_ct_power_total
                                    ? svg`
                                        <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_ct_power_total)}>
                                        <text id="grid_total_power" x="420" y="281.5"
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
                                        <text id="grid_total_power" x="420" y="281.5"
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
                                        <text id="grid_total_power" x="420" y="281.5"
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
                    ${config.entities?.pv_total
                            ? svg`
                                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv_total)}>
                                        <text id="pvtotal_power" x="87" y="178" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                                              display="${!config.show_solar || config.solar.mppts === 1 || !data.statePVTotal.isValid() ? 'none' : ''}" 
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
                                          display="${!config.show_solar || config.solar.mppts === 1 || !data.statePVTotal.isValid() ? 'none' : ''}" 
                                          fill="${data.solarColour}">
                                        ${config.solar.auto_scale
                                    ? config.entities?.pv_total
                                            ? Utils.convertValueNew(data.totalPV, data.statePVTotal?.getUOM(), data.decimalPlaces)
                                            : Utils.convertValue(data.totalPV, data.decimalPlaces) || 0
                                    : `${Utils.toNum(data.totalPV || 0, 0)} ${UnitOfPower.WATT}`
                            }
                                    </text>`
                    }
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
                    ${config.entities?.nonessential_power && config.entities.nonessential_power !== 'none'
                            ? svg`
                                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.nonessential_power)}>
                                        <text id="non_ess_power" x="338" y="281.5" display="${!config.show_grid || !data.showNonessential ? 'none' : ''}" 
                                              class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                                              fill="${data.gridColour}">
                                            ${config.grid.auto_scale ? `${Utils.convertValue(data.nonessentialPower, data.decimalPlaces) || 0}` : `${data.nonessentialPower || 0} ${UnitOfPower.WATT}`}
                                        </text>
                                    </a>`
                            : svg`
                                    <text id="non_ess_power" x="338" y="281.5"
                                          display="${!config.show_grid || !data.showNonessential ? 'none' : ''}" 
                                          class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                                          fill="${data.gridColour}">
                                        ${config.grid.auto_scale ? `${Utils.convertValue(data.nonessentialPower, data.decimalPlaces) || 0}` : `${data.nonessentialPower || 0} ${UnitOfPower.WATT}`}
                                    </text>`
                    }
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
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv1_power_186)}>
                        <text id="pv1_power_186" x="36.5" y="56.5" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                              display="${!config.show_solar || !data.statePV1Power.isValid() ? 'none' : ''}" 
                              fill="${data.solarColour}" >
                              ${config.solar.auto_scale 
                                   ? Utils.convertValue(data.pv1PowerWatts, data.decimalPlaces) || 0 
                                   : `${Utils.toNum(data.pv1PowerWatts || 0, 0)} ${UnitOfPower.WATT}`}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv2_power_187)}>
                        <text id="pv2_power_187" x="137" y="56.5" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                              display="${!config.show_solar || config.solar.mppts === 1 || !data.statePV2Power.isValid() ? 'none' : ''}" 
                              fill="${data.solarColour}">
                              ${config.solar.auto_scale 
                                   ? Utils.convertValue(data.pv2PowerWatts, data.decimalPlaces) || 0 
                                   : `${Utils.toNum(data.pv2PowerWatts || 0, 0)} ${UnitOfPower.WATT}`}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv3_power_188)}>
                        <text id="pv3_power_188" x="36.5" y="117" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                              display="${!config.show_solar || [1, 2].includes(config.solar.mppts) || !data.statePV3Power.isValid() ? 'none' : ''}" 
                              fill="${data.solarColour}">
                              ${config.solar.auto_scale 
                                   ? Utils.convertValue(data.pv3PowerWatts, data.decimalPlaces) || 0 
                                   : `${Utils.toNum(data.pv3PowerWatts || 0, 0)} ${UnitOfPower.WATT}`}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv4_power_189)}>
                        <text id="pv4_power_189" x="137" y="117" class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                              display="${!config.show_solar || [1, 2, 3].includes(config.solar.mppts) || !data.statePV3Power.isValid() ? 'none' : ''}" 
                              fill="${data.solarColour}">
                              ${config.solar.auto_scale 
                                   ? Utils.convertValue(data.pv4PowerWatts, data.decimalPlaces) || 0 
                                   : `${Utils.toNum(data.pv4PowerWatts || 0, 0)} ${UnitOfPower.WATT}`}
                        </text>
                    </a>
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
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.non_essential_load1)}>
                        <text id="noness1_value" x="340" y="321" class="st3" 
                              display="${!config.show_grid || !data.showNonessential || [0, 2, 3].includes(data.nonessentialLoads) || !data.stateNonessentialLoad1.isValid() ? 'none' : ''}" 
                              fill="${data.gridColour}">
                            ${data.stateNonessentialLoad1.toPowerString(config.grid.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.non_essential_load1)}>
                        <text id="noness2_value" x="320" y="321" class="st3" 
                              display="${!config.show_grid || !data.showNonessential || [0, 1].includes(data.nonessentialLoads) || !data.stateNonessentialLoad1.isValid() ? 'none' : ''}" 
                              fill="${data.gridColour}">
                            ${data.stateNonessentialLoad1.toPowerString(config.grid.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.non_essential_load2)}>
                        <text id="noness2_value" x="357" y="321" class="st3" 
                              display="${!config.show_grid || !data.showNonessential || [0, 1].includes(data.nonessentialLoads) || !data.stateNonessentialLoad2.isValid() ? 'none' : ''}" 
                              fill="${data.gridColour}">
                            ${data.stateNonessentialLoad2.toPowerString(config.grid.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.non_essential_load3)}>
                        <text id="noness3_value" x="283" y="321" class="${config.battery.hide_soc ? 'st3' : 'st12'}" 
                              display="${!config.show_grid || !data.showNonessential || [0, 1, 2].includes(data.nonessentialLoads) || !data.stateNonessentialLoad3.isValid() ? 'none' : ''}" 
                              fill="${data.gridColour}">
                            ${data.stateNonessentialLoad3.toPowerString(config.grid.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load1)}>
                        <text id="ess_load1_value" x="409" y="${!data.showAux ? '47' : '158'}" 
                              display="${data.additionalLoad === 1 && data.stateEssentialLoad1.isValid() ? '' : 'none'}" 
                              class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                              fill="${data.loadColour}">
                            ${data.stateEssentialLoad1.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load1)}>
                        <text id="ess_load2_value" x="${!data.showAux ? '394' : '391'}" y="${!data.showAux ? '41' : '160'}" 
                              display="${[2, 4].includes(data.additionalLoad) && data.stateEssentialLoad2.isValid() ? '' : 'none'}" class="st3" 
                              fill="${data.loadColour}">
                            ${data.stateEssentialLoad1.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load2)}>
                        <text id="ess_load2_value" x="${!data.showAux ? '430' : '427'}" y="${!data.showAux ? '41' : '160'}" 
                              display="${[2, 4].includes(data.additionalLoad) && data.stateEssentialLoad2.isValid() ? '' : 'none'}" class="st3" 
                              fill="${data.loadColour}">
                            ${data.stateEssentialLoad2.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load3)}>
                        <text id="ess_load4_value" x="392" y="160" 
                              display="${[4].includes(data.additionalLoad) && data.stateEssentialLoad3.isValid() ? '' : 'none'}" class="st3" 
                              fill="${data.loadColour}">
                            ${data.stateEssentialLoad3.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.essential_load4)}>
                        <text id="ess_load4_value" x="430" y="160" 
                              display="${[4].includes(data.additionalLoad) && data.stateEssentialLoad4.isValid() ? '' : 'none'}" class="st3" 
                              fill="${data.loadColour}">
                            ${data.stateEssentialLoad4.toPowerString(config.load.auto_scale, data.decimalPlaces)}
                        </text>
                    </a>
                    ${data.totalGridPower >= 0
                            ? svg`
                                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.energy_cost_buy)}>
                                        <text id="energy_cost" x="414" y="305" class="${!config.show_grid ? 'st12' : 'st3 right-align'}" 
                                              fill="${data.gridColour}" 
                                              display="${config.entities?.energy_cost_buy && data.stateEnergyCostBuy.isValid() ? '' : 'none'}" >
                                            ${data.energyCost}
                                        </text>
                                        <text id="energy_cost" x="414" y="318" class="${!config.show_grid ? 'st12' : 'st3 right-align'}" 
                                              fill="${data.gridColour}" 
                                              display="${config.entities?.energy_cost_buy && data.stateEnergyCostBuy.isValid() ? '' : 'none'}" >
                                            ${data.stateEnergyCostBuy?.getUOM()}
                                        </text>
                                    </a>`
                            : svg`
                                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.energy_cost_sell)}>
                                        <text id="energy_cost" x="414" y="305"  class="${!config.show_grid ? 'st12' : 'st3 right-align'}" 
                                              fill="${data.gridColour}" 
                                              display="${config.entities?.energy_cost_sell && data.stateEnergyCostSell.isValid() ? '' : 'none'}" >
                                            ${data.energyCost}}
                                        </text>
                                        <text id="energy_cost" x="414" y="318"  class="${!config.show_grid ? 'st12' : 'st3 right-align'}" 
                                              fill="${data.gridColour}" 
                                              display="${config.entities?.energy_cost_sell && data.stateEnergyCostSell.isValid() ? '' : 'none'}" >
                                            ${data.stateEnergyCostSell?.getUOM()}
                                        </text>
                                    </a>`
                    }
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.inverter_voltage_154)}>
                        <text id="inverter_voltage_154" x="270"
                              y="${config.inverter.three_phase ? '164' : '170.4'}"
                              display="${!config.show_grid || config.entities.inverter_voltage_154 === 'none' || !config.entities.inverter_voltage_154 ? 'none' : ''}"
                              class="${data.largeFont !== true ? 'st14' : 'st4'} st8" fill="${data.gridColour}">
                            ${data.inverterVoltage} ${UnitOfElectricPotential.VOLT}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.inverter_voltage_L2)}>
                        <text id="inverter_voltage_L2" x="270" y="177"
                              display="${config.inverter.three_phase && config.entities?.inverter_voltage_L2 ? '' : 'none'}"
                              class="${!config.show_grid ? 'st12' : `${data.largeFont !== true ? 'st14 st8' : 'st4 st8'}`}"
                              fill="${data.gridColour}">
                            ${data.inverterVoltageL2} ${UnitOfElectricPotential.VOLT}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.inverter_voltage_L3)}>
                        <text id="inverter_voltage_L3" x="270" y="190"
                              display="${config.inverter.three_phase && config.entities?.inverter_voltage_L3 ? '' : 'none'}"
                              class="${!config.show_grid ? 'st12' : `${data.largeFont !== true ? 'st14 st8' : 'st4 st8'}`}"
                              fill="${data.gridColour}">
                            ${data.inverterVoltageL3} ${UnitOfElectricPotential.VOLT}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.load_frequency_192)}>
                        <text id="load_frequency_192" x="270"
                              y="${config.inverter.three_phase ? '203' : '189.5'}"
                              display="${!config.show_grid || config.entities.load_frequency_192 === 'none' || !config.entities.load_frequency_192 ? 'none' : ''}"
                              class="${data.largeFont !== true ? 'st14' : 'st4'} st8" fill="${data.gridColour}">
                            ${data.loadFrequency} Hz
                        </text>
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
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_voltage_183)}>
                        <text id="battery_voltage_183" x="41" y="317"
                              display="${config.entities.battery_voltage_183 === 'none' || !config.entities.battery_voltage_183 || !config.show_battery ? 'none' : ''}"
                              fill=${data.batteryColour} class="${data.largeFont !== true ? 'st14' : 'st4'} st8">
                            ${data.batteryVoltage} ${UnitOfElectricPotential.VOLT}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="132.5" y="333"
                              display="${config.entities.battery_soc_184 === 'none' || !config.show_battery || !data.stateBatterySoc.isValid() ? 'none' : ''}"
                              fill=${data.batteryColour} class="st13 st8 left-align">
                            ${data.stateBatterySoc.toNum(0)}%
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="191.5" y="333" fill=${data.batteryColour}
                              class="st13 st8 left-align"
                              display="${data.inverterProg.show === false
                              || config.entities.battery_soc_184 === 'none'
                              || !config.show_battery
                              || [InverterModel.GoodweGridMode, InverterModel.Goodwe, InverterModel.Huawei].includes(data.inverterModel)
                              || config.battery.hide_soc ? 'none' : ''}">
                            | ${data.inverterProg.capacity || 0}%
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="191.5" y="333" fill=${data.batteryColour}
                              class="${config.battery.hide_soc || !config.show_battery ? 'st12' : 'st13 st8 left-align'}"
                              display="${[InverterModel.GoodweGridMode, InverterModel.Goodwe, InverterModel.Huawei].includes(data.inverterModel) && config.battery?.shutdown_soc && !config.battery?.shutdown_soc_offgrid
                                      ? '' : 'none'}">
                            | ${data.batteryShutdown || 0}%
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="191.5" y="333" fill=${data.batteryColour}
                              class="${config.battery.hide_soc || !config.show_battery ? 'st12' : 'st13 st8 left-align'}"
                              display="${[InverterModel.GoodweGridMode, InverterModel.Goodwe, InverterModel.Huawei].includes(data.inverterModel) && config.battery?.shutdown_soc_offgrid ? '' : 'none'}">
                            |
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_power_190)}>
                        <text id="battery_power_190" x="41" y="356"
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
                        <text id="battery_current_191" x="41" y="336"
                              display="${config.entities.battery_current_191 === 'none' || !config.show_battery || !data.stateBatteryCurrent.isValid() ? 'none' : ''}"
                              fill=${data.batteryColour} class="${data.largeFont !== true ? 'st14' : 'st4'} st8">
                            ${config.battery.show_absolute
                                    ? Math.abs(Utils.toNum(data.stateBatteryCurrent.state, 1))
                                    : Utils.toNum(data.stateBatteryCurrent.state, 1)
                            }
                            ${UnitOfElectricalCurrent.AMPERE}
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
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_power_169)}>
                        <text id="grid_power_169" x="270"
                              y="${config.inverter.three_phase ? '216' : '209'}"
                              display="${!config.show_grid || config.entities.grid_power_169 === 'none' ? 'none' : ''}"
                              class="${data.largeFont !== true ? 'st14' : 'st4'} st8" fill="${data.gridColour}">
                            ${config.grid.auto_scale
                                    ? `${config.grid.show_absolute
                                            ? `${Math.abs(parseFloat(Utils.convertValue(data.autoScaledGridPower, data.decimalPlaces)))} ${Utils.convertValue(data.autoScaledGridPower, data.decimalPlaces).split(' ')[1]}`
                                            : Utils.convertValue(data.autoScaledGridPower, data.decimalPlaces) || 0}`
                                    : `${config.grid.show_absolute
                                            ? `${Math.abs(data.autoScaledGridPower)} ${UnitOfPower.WATT}`
                                            : `${data.autoScaledGridPower || 0} ${UnitOfPower.WATT}`
                                    }`
                            }
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv1_voltage_109)}>
                        <text id="pv1_voltage" x="41" y="78.5" class="st3 left-align"
                              display="${!config.show_solar || !config.entities.pv1_voltage_109 || config.entities.pv1_voltage_109  === 'none' || !data.statePV1Voltage.isValid() ? 'none' : ''}"
                              fill="${data.solarColour}">${data.statePV1Voltage.toNum(1)}
                            ${UnitOfElectricPotential.VOLT}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv1_current_110)}>
                        <text id="pv1_current" x="41" y="90" class="st3 left-align"
                              display="${!config.show_solar || !config.entities.pv1_current_110 || config.entities.pv1_current_110 === 'none' || !data.statePV1Current.isValid() ? 'none' : ''}"
                              fill="${data.solarColour}">${data.statePV1Current.toNum(1)}
                            ${UnitOfElectricalCurrent.AMPERE}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv2_voltage_111)}>
                        <text id="pv2_voltage" x="142" y="78.5" class="st3 left-align"
                              display="${!config.show_solar || !config.entities.pv2_voltage_111 || config.entities.pv2_voltage_111 === 'none' || config.solar.mppts === 1 || !data.statePV2Voltage.isValid() ? 'none' : ''}"
                              fill="${data.solarColour}">${data.statePV2Voltage.toNum(1)}
                            ${UnitOfElectricPotential.VOLT}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv2_current_112)}>
                        <text id="pv2_current" x="142" y="90" class="st3 left-align"
                              display="${!config.show_solar || !config.entities.pv2_current_112 || config.entities.pv2_current_112 === 'none' || config.solar.mppts === 1 || !data.statePV2Current.isValid() ? 'none' : ''}"
                              fill="${data.solarColour}">${data.statePV2Current.toNum(1)}
                            ${UnitOfElectricalCurrent.AMPERE}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv3_voltage_113)}>
                        <text id="pv3_voltage" x="41" y="139" class="st3 left-align"
                              display="${!config.show_solar || !config.entities.pv3_voltage_113 || config.entities.pv3_voltage_113 === 'none' || [1, 2].includes(config.solar.mppts) || !data.statePV3Voltage.isValid() ? 'none' : ''}"
                              fill="${data.solarColour}">${data.statePV3Voltage.toNum(1)}
                            ${UnitOfElectricPotential.VOLT}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv3_current_114)}>
                        <text id="pv3_current" x="41" y="150" class="st3 left-align"
                              display="${!config.show_solar || !config.entities.pv3_current_114 || config.entities.pv3_current_114 === 'none' || [1, 2].includes(config.solar.mppts) || !data.statePV3Current.isValid() ? 'none' : ''}"
                              fill="${data.solarColour}">${data.statePV3Current.toNum(1)}
                            ${UnitOfElectricalCurrent.AMPERE}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv4_voltage_115)}>
                        <text id="pv4_voltage" x="142" y="139" class="st3 left-align"
                              display="${!config.show_solar || !config.entities.pv4_voltage_115 || config.entities.pv4_voltage_115 === 'none' || [1, 2, 3].includes(config.solar.mppts) || !data.statePV4Voltage.isValid() ? 'none' : ''}"
                              fill="${data.solarColour}">${data.statePV4Voltage.toNum(1)}
                            ${UnitOfElectricPotential.VOLT}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.pv4_current_116)}>
                        <text id="pv4_current" x="142" y="150" class="st3 left-align"
                              display="${!config.show_solar || !config.entities.pv4_current_116 || config.entities.pv4_current_116 === 'none' || [1, 2, 3].includes(config.solar.mppts) || !data.statePV4Current.isValid() ? 'none' : ''}"
                              fill="${data.solarColour}">${data.statePV4Current.toNum(1)}
                            ${UnitOfElectricalCurrent.AMPERE}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_temp_182)}>
                        <text id="battery_temp_182" x="93.7" y="295"
                              class="${config.entities?.battery_temp_182 ? 'st3 left-align' : 'st12'}"
                              fill="${data.batteryColour}" display="${!config.show_battery || !data.stateBatteryTemp.isValid() ? 'none' : ''}">
                            ${data.stateBatteryTemp.toNum(1)}°
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.radiator_temp_91)}>
                        <text id="ac_temp" x="${config.solar?.mppts === 4 ? '110' : '134'}"
                              y="${config.solar?.mppts === 4 ? '237' : '153'}" class="st3 left-align"
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
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.environment_temp)}>
                        <text id="environ_temp" x="1" y="32"
                              class="${config.entities?.environment_temp ? 'st3 left-align' : 'st12'}"
                              fill="${data.solarColour}" display="${!config.show_solar || !data.stateEnvironmentTemp.isValid() ? 'none' : ''}">
                            ${data.stateEnvironmentTemp.toNum(1)}°
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.prepaid_units)}>
                        <text id="prepaid" x="428" y="258"
                              class="${config.entities?.prepaid_units ? 'st3 left-align' : 'st12'}"
                              fill="${data.gridColour}" display="${!config.show_grid || !data.statePrepaidUnits.isValid() ? 'none' : ''}">
                            ${data.statePrepaidUnits.toNum(1)}
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
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_ct_power_172)}>
                        <text id="grid-power-L1" x="428" y="305"
                            display="${config.inverter.three_phase ? '' : 'none'}"
                            class="${!config.show_grid ? 'st12' : 'st3 left-align'}"
                            fill="${data.gridColour}">
                            ${config.load.auto_scale ? `${Utils.convertValue(data.gridPower, data.decimalPlaces) || 0}` : `${data.gridPower || 0} ${UnitOfPower.WATT}`}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_ct_power_L2)}>
                        <text id="grid-power-L2" x="428" y="318"
                            display="${config.inverter.three_phase && config.entities?.grid_ct_power_L2 ? '' : 'none'}"
                            class="${!config.show_grid ? 'st12' : 'st3 left-align'}"
                            fill="${data.gridColour}">
                            ${config.load.auto_scale ? `${Utils.convertValue(data.gridPowerL2, data.decimalPlaces) || 0}` : `${data.gridPowerL2 || 0} ${UnitOfPower.WATT}`}
                        </text>
                    </a>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_ct_power_L3)}>
                        <text id="grid-power-L3" x="428" y="331"
                            display="${config.inverter.three_phase && config.entities?.grid_ct_power_L3 ? '' : 'none'}"
                            class="${!config.show_grid ? 'st12' : 'st3 left-align'}"
                            fill="${data.gridColour}">
                            ${config.load.auto_scale ? `${Utils.convertValue(data.gridPowerL3, data.decimalPlaces) || 0}` : `${data.gridPowerL3 || 0} ${UnitOfPower.WATT}`}
                        </text>
                    </a>
                </svg>
            </div>
        </ha-card>
    `;
}
