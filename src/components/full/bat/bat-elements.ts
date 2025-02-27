// bat-elements.ts
import {html} from 'lit';
import {localize} from '../../../localize/localize';
import {Utils} from '../../../helpers/utils';
import {DataDto, sunsynkPowerFlowCardConfig} from '../../../types';
import {UnitOfElectricalCurrent, UnitOfElectricPotential, UnitOfPower, UnitOfEnergy} from '../../../const';


export const renderBatteryElements = (data: DataDto, config: sunsynkPowerFlowCardConfig) => {
    return html`
        <!-- Battery Elements -->
        <svg id="Battery" 
            style="overflow: visible; display: ${!config.show_battery  ? 'none' : 'inline'};"
            x="${config.wide ? '3%' : '3%'}" y="2.5%">
            <svg id="battery_total_power" 
                style="display: ${config.wide && data.batteryCount === 2 ? 'inline' : 'none'};">
                <rect x="86" y="265" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                    stroke="${data.batteryColour}" pointer-events="all"
                    class="${data.compactMode ? '' : ''}"/>
                <text x="120" y="282" class="${data.largeFont !== true ? 'st14' : 'st4'} st8"
                    fill="${data.batteryColour}">
                ${config.battery.auto_scale
                    ? Utils.convertValue(data.batteryPowerTotal, data.decimalPlaces) || 0
                    : `${Utils.toNum(data.batteryPowerTotal || 0, 0)} ${UnitOfPower.WATT}`
                }
                </text>
            </svg>
            <svg id="battery1_icon" 
                x="${data.batteryCount === 2 ? '12.25%' : '0%'}">
                <a href="#" @click=${(e) => config.battery.navigate ? Utils.handleNavigation(e, config.battery.navigate) : null}>
                    <svg xmlns="http://www.w3.org/2000/svg" id="bat" x="74.5"
                        y="${config.battery?.show_remaining_energy ? "294" : "296.25"}" width="82"
                        height="82" preserveAspectRatio="none"
                        viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="bLg-${data.timestamp_id}" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                    stop-color="${data.gridPercentageBat > 0 ? data.gridColour : data.pvPercentageBat > 0 ? data.solarColour : data.batteryColour}"/>
                                <stop offset="${data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat}%"
                                    stop-color="${data.gridPercentageBat > 0 ? data.gridColour : data.pvPercentageBat > 0 ? data.solarColour : data.batteryColour}"/>
                                <stop offset="${data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat}%"
                                    stop-color="${data.pvPercentageBat > 0 ? data.solarColour : data.batteryColour}"/>
                                <stop offset="${(data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat) + (data.pvPercentageBat < 2 ? 0 : data.pvPercentageBat)}%"
                                    stop-color="${data.pvPercentageBat > 0 ? data.solarColour : data.batteryColour}"/>
                                <stop offset="${(data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat) + (data.pvPercentageBat < 2 ? 0 : data.pvPercentageBat)}%"
                                    stop-color="${data.batteryColour}"/>
                                <stop offset="100%"
                                    stop-color="${data.batteryColour}"/>
                            </linearGradient>
                        </defs>
                        <path fill="${config.battery.dynamic_colour ? `url(#bLg-${data.timestamp_id})` : data.batteryColour}"
                            d="${config.battery.linear_gradient ? data.battery0 : data.batteryIcon}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="bat" x="74.5"
                        y="${config.battery?.show_remaining_energy ? "294" : "296.25"}" width="82"
                        height="82" preserveAspectRatio="none"
                        viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="sLg-${data.timestamp_id}" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                    stop-color="red"/>
                                <stop offset="100%"
                                    stop-color="${data.stopColour}"/>
                                <animate attributeName="${config.battery.animate ? 'y2' : 'none'}" dur="6s" values="100%; 0%" repeatCount="indefinite" />
                            </linearGradient>
                        </defs>
                        <path fill="${config.battery.linear_gradient ? `url(#sLg-${data.timestamp_id})` : data.batteryColour}"
                            display="${!config.battery.linear_gradient ? 'none' : ''}"
                            d="${data.batteryCharge}"/>
                    </svg>
                </a>
                }
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_temp_182)}>
                    <text id="battery_temp_182" x="93.7" y="295"
                        class="${config.entities?.battery_temp_182 ? 'st3 left-align' : 'st12'}"
                        fill="${data.batteryColour}" display="${!data.stateBatteryTemp.isValid() ? 'none' : ''}">
                        ${data.stateBatteryTemp.toNum(1)}°
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soh)}>
                    <text id="battery_soh" x="93.7" y="295"
                        class="${config.entities?.battery_soh ? 'st3 left-align' : 'st12'}"
                        fill="${data.batteryColour}" display="${!data.stateBatterySOH.isValid() || config.entities?.battery_temp_182 ? 'none' : ''}">
                        ${data.stateBatterySOH.toNum(0)}%
                    </text>
                </a>
                <text x="101" y="378" class="st3"
                    display="${!config.battery.show_remaining_energy ? 'none' : ''}"
                    fill="${data.batteryColour}">
                    ${!config.battery.remaining_energy_to_shutdown
                        ? `${Utils.toNum((data.batteryEnergy * (data.stateBatterySoc.toNum() / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
                        : `${Utils.toNum((data.batteryEnergy * ((data.stateBatterySoc?.toNum() - data.batteryOneShutdown) / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
                    }
                </text>
            </svg>
            <svg id="battery2_icon" 
                style="overflow: visible; display: ${data.batteryCount === 2  ? 'inline' : 'none'};"
                x="${data.batteryCount === 2 ? '19%' : '0%'}">       
                <a href="#" @click=${(e) => config.battery2.navigate ? Utils.handleNavigation(e, config.battery2.navigate) : null}>
                    <svg xmlns="http://www.w3.org/2000/svg" id="bat" x="74.5"
                        y="${config.battery2?.show_remaining_energy ? "294" : "296.25"}" width="82"
                        height="82" preserveAspectRatio="none"
                        viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="b2Lg-${data.timestamp_id}" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                    stop-color="${data.gridPercentageBat > 0 ? data.gridColour : data.pvPercentageBat > 0 ? data.solarColour : data.battery2Colour}"/>
                                <stop offset="${data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat}%"
                                    stop-color="${data.gridPercentageBat > 0 ? data.gridColour : data.pvPercentageBat > 0 ? data.solarColour : data.battery2Colour}"/>
                                <stop offset="${data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat}%"
                                    stop-color="${data.pvPercentageBat > 0 ? data.solarColour : data.battery2Colour}"/>
                                <stop offset="${(data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat) + (data.pvPercentageBat < 2 ? 0 : data.pvPercentageBat)}%"
                                    stop-color="${data.pvPercentageBat > 0 ? data.solarColour : data.battery2Colour}"/>
                                <stop offset="${(data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat) + (data.pvPercentageBat < 2 ? 0 : data.pvPercentageBat)}%"
                                    stop-color="${data.battery2Colour}"/>
                                <stop offset="100%"
                                    stop-color="${data.battery2Colour}"/>
                            </linearGradient>
                        </defs>
                        <path fill="${config.battery2.dynamic_colour ? `url(#b2Lg-${data.timestamp_id})` : data.battery2Colour}"
                            d="${config.battery2.linear_gradient ? data.battery20 : data.battery2Icon}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="bat" x="74.5"
                        y="${config.battery2?.show_remaining_energy ? "294" : "296.25"}" width="82"
                        height="82" preserveAspectRatio="none"
                        viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="s2Lg-${data.timestamp_id}" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                    stop-color="red"/>
                                <stop offset="100%"
                                    stop-color="${data.stop2Colour}"/>
                                <animate attributeName="${config.battery2.animate ? 'y2' : 'none'}" dur="6s" values="100%; 0%" repeatCount="indefinite" />
                            </linearGradient>
                        </defs>
                        <path fill="${config.battery2.linear_gradient ? `url(#s2Lg-${data.timestamp_id})` : data.battery2Colour}"
                            display="${!config.battery2.linear_gradient ? 'none' : ''}"
                            d="${data.battery2Charge}"/>
                    </svg>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_temp_182)}>
                    <text id="battery2_temp_182" x="93.7" y="295"
                        class="${config.entities?.battery2_temp_182 ? 'st3 left-align' : 'st12'}"
                        fill="${data.battery2Colour}" display="${!data.stateBattery2Temp.isValid() ? 'none' : ''}">
                        ${data.stateBattery2Temp.toNum(1)}°
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_soh)}>
                    <text id="battery2_soh" x="93.7" y="295"
                        class="${config.entities?.battery2_soh ? 'st3 left-align' : 'st12'}"
                        fill="${data.battery2Colour}" display="${!data.stateBattery2SOH.isValid() || config.entities?.battery2_temp_182 ? 'none' : ''}">
                        ${data.stateBattery2SOH.toNum(0)}%
                    </text>
                </a>
                <text x="101" y="378" class="st3"
                    display="${!config.battery2.show_remaining_energy ? 'none' : ''}"
                    fill="${data.battery2Colour}">
                    ${!config.battery2.remaining_energy_to_shutdown
                        ? `${Utils.toNum((data.battery2Energy * (data.stateBattery2Soc.toNum() / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
                        : `${Utils.toNum((data.battery2Energy * ((data.stateBattery2Soc?.toNum() - data.batteryTwoShutdown) / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
                    }
                </text>
            </svg>
            <svg id="battery1_remaining" 
                style="overflow: visible; display: ${data.batteryCount === 1  ? 'inline' : 'none'};">
                <text id="duration_text" x="132" y="368" class="st3 left-align"
                    fill="${data.batteryEnergy === 0 || (config.battery.invert_flow === true ? data.batteryPower >= 0 : data.batteryPower <= 0) || data.isFloating ? 'transparent' : data.batteryColour}">
                    ${localize('common.runtime_to')} ${data.batteryCapacity}% @${data.formattedResultTime}
                </text>
                <text id="duration_text_charging" x="132" y="368" class="st3 left-align"
                    fill="${data.batteryEnergy === 0 || (config.battery.invert_flow === true ? data.batteryPower <= 0 : data.batteryPower >= 0) || data.isFloating ? 'transparent' : data.batteryColour}">
                    ${localize('common.to')} ${data.batteryCapacity}% ${localize('common.charge')}
                        @${data.formattedResultTime}
                </text>
                <text id="floating" x="132" y="368" class="st3 left-align"
                    fill="${data.batteryEnergy === 0 || !data.isFloating ? 'transparent' : data.batteryColour}">
                    ${localize('common.battery_floating')}
                </text>
                <text id="battery_soc_184" x="202" y="327" fill=${data.batteryColour}
                    class="${config.battery.hide_soc ? 'st12' : 'st14 left-align'}"
                    display="${!data.inverterProg.show && config.battery?.shutdown_soc_offgrid ? '' : 'none'}">
                    ${data.batteryShutdown}%
                </text>
                <text id="battery_soc_184" x="202" y="340" fill=${data.batteryColour}
                    class="${config.battery.hide_soc ? 'st12' : 'st14 left-align'}"
                    display="${!data.inverterProg.show && config.battery?.shutdown_soc_offgrid ? '' : 'none'}">
                    ${data.shutdownOffGrid}%
                </text>
                <svg id="Battery1_SOC" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() ? 'none' : 'inline'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="132.5" y="333"
                            display="${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() ? 'none' : ''}"
                            fill=${data.batteryColour} class="st13 st8 left-align">
                            ${!data.inverterProg.show && config.battery.shutdown_soc_offgrid 
                                ? (config.battery.hide_soc ? data.stateBatterySoc.toDisplay() : `${data.stateBatterySoc.toNum(0)}% | `)
                                : (config.battery.hide_soc ? data.stateBatterySoc.toDisplay() : `${data.stateBatterySoc.toNum(0)}%`)}
                        </text>
                    </a>
                </svg>     
                <svg id="Battery1_SOC_Program_Capacity" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() || config.battery.hide_soc || !data.inverterProg.show ? 'none' : 'inline'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="132.5" y="333"
                            fill=${data.batteryColour} class="st13 st8 left-align">
                            ${data.stateBatterySoc.toNum(0)}% | ${data.inverterProg.capacity || 0}%
                        </text>
                    </a>
                </svg>
                <svg id="Battery1_SOC_Shutdown" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 !== 'none' && data.stateBatterySoc.isValid() && !config.battery.hide_soc && !data.inverterProg.show && config.battery?.shutdown_soc && !config.battery?.shutdown_soc_offgrid ? 'inline' : 'none'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="132.5" y="333"
                            fill=${data.batteryColour} class="st13 st8 left-align">
                            ${data.stateBatterySoc.toNum(0)}% | ${data.batteryShutdown || 0}%
                        </text>
                    </a>
                </svg>
                <text id="duration" x="132" y="352" class="${data.largeFont !== true ? 'st14' : 'st4'} left-align"
                    fill="${data.batteryEnergy === 0 || data.isFloating || data.batteryPower === 0 ? 'transparent' : data.batteryColour}">
                    ${data.batteryDuration}
                </text>
            </svg>

            <svg id="two_batteries_battery1_remaining" 
                style="overflow: visible; display: ${data.batteryCount === 2  ? 'inline' : 'none'};"
                x="-20%">
                <text id="duration_text" x="258" y="368" class="st3 right-align"
                    fill="${data.batteryEnergy === 0 || (config.battery.invert_flow === true ? data.batteryPower >= 0 : data.batteryPower <= 0) || data.isFloating ? 'transparent' : `${data.batteryColour}`}">
                    ${localize('common.runtime_to')} ${data.batteryCapacity}% @${data.formattedResultTime}
                </text>
                <text id="duration_text_charging" x="258" y="368" class="st3 right-align"
                    fill="${data.batteryEnergy === 0 || (config.battery.invert_flow === true ? data.batteryPower <= 0 : data.batteryPower >= 0) || data.isFloating ? 'transparent' : `${data.batteryColour}`}">
                    ${localize('common.to')} ${data.batteryCapacity}% ${localize('common.charge')}
                        @${data.formattedResultTime}
                </text>
                <text id="floating" x="258" y="368" class="st3 right-align"
                    fill="${data.batteryEnergy === 0 || !data.isFloating ? 'transparent' : `${data.batteryColour}`}">
                    ${localize('common.battery_floating')}
                </text>
                <text id="battery_soc_184" x="187" y="327" fill=${data.batteryColour}
                    class="${config.battery.hide_soc ? 'st12' : 'st14 right-align'}"
                    display="${!data.inverterProg.show && config.battery?.shutdown_soc_offgrid ? '' : 'none'}">
                    ${data.batteryShutdown}%
                </text>
                <text id="battery_soc_184" x="187" y="340" fill=${data.batteryColour}
                    class="${config.battery.hide_soc ? 'st12' : 'st14 right-align'}"
                    display="${!data.inverterProg.show && config.battery?.shutdown_soc_offgrid ? '' : 'none'}">
                    ${data.shutdownOffGrid}%
                </text>
                <svg id="Battery1_SOC" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() ? 'none' : 'inline'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="258" y="333"
                            display="${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() ? 'none' : ''}"
                            fill=${data.batteryColour} class="st13 st8 right-align">
                            ${!data.inverterProg.show && config.battery.shutdown_soc_offgrid 
                                ? (config.battery.hide_soc ? data.stateBatterySoc.toDisplay() : `| ${data.stateBatterySoc.toNum(0)}%`)
                                : (config.battery.hide_soc ? data.stateBatterySoc.toDisplay() : `${data.stateBatterySoc.toNum(0)}%`)}
                        </text>
                    </a>
                </svg>     
                <svg id="Battery1_SOC_Program_Capacity" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() || config.battery.hide_soc || !data.inverterProg.show ? 'none' : 'inline'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="258" y="333"
                            fill=${data.batteryColour} class="st13 st8 right-align">
                            ${data.inverterProg.capacity || 0}% | ${data.stateBatterySoc.toNum(0)}%
                        </text>
                    </a>
                </svg>
                <svg id="Battery1_SOC_Shutdown" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 !== 'none' && data.stateBatterySoc.isValid() && !config.battery.hide_soc && !data.inverterProg.show && config.battery?.shutdown_soc && !config.battery?.shutdown_soc_offgrid ? 'inline' : 'none'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="258" y="333"
                            fill=${data.batteryColour} class="st13 st8 right-align">
                            ${data.batteryShutdown || 0}% | ${data.stateBatterySoc.toNum(0)}%
                        </text>
                    </a>
                </svg>
                <text id="duration" x="258" y="352" class="${data.largeFont !== true ? 'st14' : 'st4'} right-align"
                    fill="${data.batteryEnergy === 0 || data.isFloating || data.batteryPower === 0 ? 'transparent' : data.batteryColour}">
                    ${data.batteryDuration}
                </text>
            </svg>
            <svg id="battery2_remaining"
                style="overflow: visible; display: ${data.batteryCount === 2  ? 'inline' : 'none'};"
                x="${data.batteryCount === 2 ? '25%' : '0%'}">
                <text id="duration_text" x="132" y="368" class="st3 left-align"
                    fill="${data.battery2Energy === 0 || (config.battery2.invert_flow === true ? data.battery2Power >= 0 : data.battery2Power <= 0) || data.isFloating2 ? 'transparent' : data.battery2Colour}">
                    ${localize('common.runtime_to')} ${data.battery2Capacity}% @${data.formattedResultTime2}
                </text>
                <text id="duration_text_charging" x="132" y="368" class="st3 left-align"
                    fill="${data.battery2Energy === 0 || (config.battery2.invert_flow === true ? data.battery2Power <= 0 : data.battery2Power >= 0) || data.isFloating2 ? 'transparent' : data.battery2Colour}">
                    ${localize('common.to')} ${data.battery2Capacity}% ${localize('common.charge')}
                        @${data.formattedResultTime2}
                </text>
                <text id="floating" x="132" y="368" class="st3 left-align"
                    fill="${data.battery2Energy === 0 || !data.isFloating2 ? 'transparent' : data.battery2Colour}">
                    ${localize('common.battery_floating')}
                </text>
                <text id="battery_soc_184" x="202" y="327" fill=${data.battery2Colour}
                    class="${config.battery2.hide_soc ? 'st12' : 'st14 left-align'}"
                    display="${!data.inverterProg.show && config.battery2?.shutdown_soc_offgrid ? '' : 'none'}">
                    ${data.batteryShutdown2}%
                </text>
                <text id="battery_soc_184" x="202" y="340" fill=${data.battery2Colour}
                    class="${config.battery2.hide_soc ? 'st12' : 'st14 left-align'}"
                    display="${!data.inverterProg.show && config.battery2?.shutdown_soc_offgrid ? '' : 'none'}">
                    ${data.shutdownOffGrid2}%
                </text>
                <svg id="Battery2_SOC" 
                    style="overflow: visible; 
                        display: ${config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid() ? 'none' : 'inline'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_soc_184)}>
                        <text id="battery_soc_184" x="132" y="333"
                            display="${config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid() ? 'none' : ''}"
                            fill=${data.battery2Colour} class="st13 st8 left-align">
                            ${!data.inverterProg.show && config.battery2.shutdown_soc_offgrid 
                                ? (config.battery2.hide_soc ? data.stateBattery2Soc.toDisplay() : `${data.stateBattery2Soc.toNum(0)}% |`)
                                : (config.battery2.hide_soc ? data.stateBattery2Soc.toDisplay() : `${data.stateBattery2Soc.toNum(0)}%`)}
                        </text>
                    </a>
                </svg>
                <svg id="Battery2_SOC_Program_Capacity" 
                    style="overflow: visible; 
                        display: ${config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid() || config.battery2.hide_soc || !data.inverterProg.show ? 'none' : 'inline'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_soc_184)}>
                        <text id="battery_soc_184" x="132" y="333"
                            display="${config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid() ? 'none' : ''}"
                            fill=${data.battery2Colour} class="st13 st8 left-align">
                            ${data.stateBattery2Soc.toNum(0)}% | ${data.inverterProg.capacity || 0}%
                        </text>
                    </a>
                </svg>
                <svg id="Battery2_SOC_Shutdown" 
                    style="overflow: visible; 
                        display: ${config.entities.battery2_soc_184 !== 'none' && data.stateBattery2Soc.isValid() && !config.battery2.hide_soc && !data.inverterProg.show && config.battery2?.shutdown_soc && !config.battery2?.shutdown_soc_offgrid ? 'inline' : 'none'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_soc_184)}>
                        <text id="battery_soc_184" x="132" y="333"
                            display="${config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid() ? 'none' : ''}"
                            fill=${data.battery2Colour} class="st13 st8 left-align">
                            ${data.stateBattery2Soc.toNum(0)}% | ${data.batteryShutdown2 || 0}%
                        </text>
                    </a>
                </svg>
                <text id="duration" x="132" y="352" class="${data.largeFont !== true ? 'st14' : 'st4'} left-align"
                    fill="${data.battery2Energy === 0 || data.isFloating2 || data.battery2Power === 0 ? 'transparent' : data.battery2Colour}">
                    ${data.batteryDuration2}
                </text>
                <circle id="bat2" 
                    cx="136"
                    cy="377" r="3"
                    display="${config.entities?.battery2_status === 'none' || !config.entities?.battery2_status ? 'none' : ''}"
                    fill="${data.battery2StateColour}"/>
                <text x="144"
                    y="378" class="st3 left-align"
                    fill="${data.battery2Colour}">${data.battery2StateMsg}
                </text>
            </svg>
            <svg id="battery1_data" 
                x="${data.batteryCount === 2 ? '16.25%' : '0%'}">
                <rect x="6" y="${data.batteryCount === 2 ? '320.75' : '300.75'}" width="${data.batteryCount === 2 ? 40 : 70}" height="${data.batteryCount === 2 ? 50 : 70}" 
                    rx="${data.batteryCount === 2 ? 4.5 : 10.5}" ry="${data.batteryCount === 2 ? 4.5 : 10.5}" fill="none"
                    stroke="${data.batteryColour}" pointer-events="all"/>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_voltage_183)}>
                    <text id="battery_voltage_183" x="${data.batteryCount === 2 ? '25' : '41' }" y="${data.batteryCount === 2 ? '329.5' : '317'}"
                        display="${config.entities.battery_voltage_183 === 'none' || !config.entities.battery_voltage_183 ? 'none' : ''}"
                        fill=${data.batteryColour} 
                        class="${data.batteryCount === 2 
                            ? 'st3 st8' 
                            : data.largeFont !== true 
                                ? 'st14 st8' 
                                : 'st4 st8'}">
                        ${data.batteryVoltage} ${UnitOfElectricPotential.VOLT}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_power_190)}>
                    <text id="battery_power_190" x="${data.batteryCount === 2 ? '25' : '41' }" y="${data.batteryCount === 2 ? '362' : '356'}"
                        display="${config.entities.battery_power_190 === 'none' ? 'none' : ''}"
                        fill=${data.batteryColour} 
                        class="${data.batteryCount === 2 
                            ? 'st3 st8' 
                            : data.largeFont !== true 
                                ? 'st14 st8' 
                                : 'st4 st8'}">
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
                    <text id="battery_current_191" x="${data.batteryCount === 2 ? '25' : '41' }" y="${data.batteryCount === 2 ? '345.75' : '336'}"
                        display="${config.entities.battery_current_191 === 'none' || !data.stateBatteryCurrent.isValid() ? 'none' : ''}"
                        fill=${data.batteryColour} 
                        class="${data.batteryCount === 2 
                            ? 'st3 st8' 
                            : data.largeFont !== true 
                                ? 'st14 st8' 
                                : 'st4 st8'}">
                        ${config.battery.show_absolute
                                ? Math.abs(Utils.toNum(data.stateBatteryCurrent.state, 1))
                                : Utils.toNum(data.stateBatteryCurrent.state, 1)
                        }
                        ${UnitOfElectricalCurrent.AMPERE}
                    </text>
                </a>
            </svg>
            <svg id="battery2_data" 
                style="overflow: visible; display: ${data.batteryCount === 2  ? 'inline' : 'none'};"
                x="36%">
                <rect x="6" y="320.75" width="40" height="50" 
                    rx="4.5" ry="4.5" fill="none"
                    stroke="${data.battery2Colour}" pointer-events="all"/>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_voltage_183)}>
                    <text id="battery2_voltage_183" x="25" y="329.5"
                        display="${config.entities.battery2_voltage_183 === 'none' || !config.entities.battery2_voltage_183 ? 'none' : ''}"
                        fill=${data.battery2Colour} 
                        class="st3 st8">
                        ${data.battery2Voltage} ${UnitOfElectricPotential.VOLT}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_power_190)}>
                    <text id="battery2_power_190" x="25" y="362"
                        display="${config.entities.battery2_power_190 === 'none' ? 'none' : ''}"
                        fill=${data.battery2Colour} 
                        class="st3 st8">
                        ${config.battery2.auto_scale
                                ? `${config.battery2.show_absolute
                                        ? `${Math.abs(parseFloat(Utils.convertValue(data.battery2Power, data.decimalPlaces)))} ${Utils.convertValue(data.battery2Power, data.decimalPlaces).split(' ')[1]}`
                                        : Utils.convertValue(data.battery2Power, data.decimalPlaces) || '0'}`
                                : `${config.battery2.show_absolute
                                        ? `${Math.abs(data.battery2Power)} ${UnitOfPower.WATT}`
                                        : `${data.battery2Power || 0} ${UnitOfPower.WATT}`
                                }`
                        }
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_current_191)}>
                    <text id="battery2_current_191" x="25" y="345.75"
                        display="${config.entities.battery2_current_191 === 'none' || !data.stateBattery2Current.isValid() ? 'none' : ''}"
                        fill=${data.battery2Colour} 
                        class="st3 st8">
                        ${config.battery2.show_absolute
                                ? Math.abs(Utils.toNum(data.stateBattery2Current.state, 1))
                                : Utils.toNum(data.stateBattery2Current.state, 1)
                        }
                        ${UnitOfElectricalCurrent.AMPERE}
                    </text>
                </a>
            </svg>
            <circle id="bat" 
                    cx="${data.batteryCount === 2 
                        ? '-8' 
                        : !config.battery.show_remaining_energy 
                            ? '73' 
                            : '8'}"
                    cy="377" r="3"
                    display="${config.entities?.battery_status === 'none' || !config.entities?.battery_status ? 'none' : ''}"
                    fill="${data.batteryStateColour}"/>
            <text x="${data.batteryCount === 2 
                    ? '0' 
                    : !config.battery.show_remaining_energy 
                        ? '80' 
                        : '15'}"
                y="378" class="st3 left-align"
                fill="${data.batteryColour}">${data.batteryStateMsg}
            </text>
            <svg id="battery_daily"
                x="${data.batteryCount === 2  ? '-2%' : '0%'}"
                y="${data.batteryCount === 2  ? '2%' : '0%'}">
                <text id="daily_bat_charge" x="4.5" y="251" class="st3 left-align"
                    fill="${data.batteryShowDaily !== true ? 'transparent' : `${data.batteryColour}`}">
                    ${localize('common.daily_charge')}
                </text>
                <text id="daily_bat_discharge" x="4.5" y="285" class="st3 left-align"
                    fill="${data.batteryShowDaily !== true ? 'transparent' : `${data.batteryColour}`}">
                    ${localize('common.daily_discharge')}
                </text>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_battery_charge_70)}>
                    <text id="daily_bat_charge_value" x="4.5" y="237" class="st10 left-align"
                        display="${data.batteryShowDaily !== true || !data.stateDayBatteryCharge.isValid() ? 'none' : ''}"
                        fill="${data.batteryColour}">
                        ${data.stateDayBatteryCharge.toPowerString(true, data.decimalPlacesEnergy)}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_battery_discharge_71)}>
                    <text id="daily_bat_discharge_value" x="4.5" y="271" class="st10 left-align"
                        display="${data.batteryShowDaily !== true || !data.stateDayBatteryDischarge.isValid()? 'none' : ''}"
                        fill="${data.batteryColour}">
                        ${data.stateDayBatteryDischarge.toPowerString(true, data.decimalPlacesEnergy)}
                    </text>
                </a>
            </svg>
            <svg id="battery-flow">
                <path id="bat-line" 
                    d="${config.wide 
                            ? (data.batteryCount === 2 
                                ? 'M 279 280 L 156 281' 
                                : 'M 279 280 L 96 280 Q 86 280 86 290 L 86 297') 
                            : 'M 155 280 L 96 280 Q 86 280 86 290 L 86 297'}"
                    fill="none"
                    stroke="${config.battery.dynamic_colour ? data.flowBatColour : data.batteryColour}" stroke-width="${data.batLineWidth}" stroke-miterlimit="10"
                    pointer-events="stroke"/>
                <circle id="power-dot-discharge" cx="0" cy="0"
                        r="${Math.min(2 + data.batLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.batteryPowerTotal < 0 || data.batteryPowerTotal === 0 ? 'transparent' : `${data.batteryColour}`}">
                    <animateMotion dur="${data.durationCur['battery']}s" repeatCount="indefinite"
                                keyPoints=${config.battery.invert_flow === true ? Utils.invertKeyPoints("1;0") : "1;0"} 
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#bat-line"/>
                    </animateMotion>
                </circle>
                <circle id="power-dot-charge" cx="0" cy="0"
                        r="${Math.min(2 + data.batLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.batteryPowerTotal > 0 || data.batteryPowerTotal === 0 ? 'transparent' : `${config.battery.dynamic_colour ? data.flowBatColour : data.batteryColour}`}">
                    <animateMotion dur="${data.durationCur['battery']}s" repeatCount="indefinite"
                                keyPoints=${config.battery.invert_flow === true ? Utils.invertKeyPoints("0;1") : "0;1"} 
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#bat-line"/>
                    </animateMotion>
                </circle>
            </svg>
        </svg>
    `;
}