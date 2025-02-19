// bat-elements.ts
import {html} from 'lit';
import {localize} from '../../../localize/localize';
import {Utils} from '../../../helpers/utils';
import {DataDto, sunsynkPowerFlowCardConfig} from '../../../types';
import {UnitOfElectricalCurrent, UnitOfElectricPotential, UnitOfPower, UnitOfEnergy} from '../../../const';


export const renderBatteryElements = (data: DataDto, config: sunsynkPowerFlowCardConfig) => {
    return html`
        <!-- Battery Elements -->
        <svg id="battery_main" 
            style="overflow: visible; display: ${!config.show_battery ? 'none' : 'inline'};" 
            x="${config.wide ? '10%' : '0%'}">
            <g>
            <svg id="battery_total_power" 
                style="overflow: visible; display: ${config.wide && data.batteryCount === 2 ? 'inline' : 'none'};">
                <rect x="205" y="285" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                    stroke="${data.batteryColour}" pointer-events="all"
                    class="${data.compactMode ? '' : ''}"/>
                <text x="240" y="302" class="${data.largeFont !== true ? 'st14' : 'st4'} st8"
                    fill="${data.batteryColour}">
                ${config.battery.auto_scale
                    ? Utils.convertValue(data.batteryPowerTotal, data.decimalPlaces) || 0
                    : `${Utils.toNum(data.batteryPowerTotal || 0, 0)} ${UnitOfPower.WATT}`
                }
                </text>
            </svg>
            <svg id="battery_data" style="overflow: visible;" x="${data.batteryCount === 2 ? '-6.5%' : '0%'}">
                <rect x="205" y="290" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                    stroke="${data.batteryColour}" pointer-events="all"
                    class="${data.compactMode && data.batteryCount === 1 ? '' : 'st12'}"/>
                <rect x="159" y="${data.compactMode ? '348' : '329.75'}" width="70"
                    height="${data.compactMode ? '50' : '70'}"
                    rx="${data.compactMode ? '7.5' : '10.5'}" ry="${data.compactMode ? '7.5' : '10.5'}"
                    fill="none"
                    stroke="${data.batteryColour}" pointer-events="all"
                    class="${data.compactMode ? 'st12' : ''}"/>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_voltage_183)}>
                    <text id="battery_voltage_183" x="193" y="346"
                        display="${config.entities.battery_voltage_183 === 'none'
                        || !config.entities.battery_voltage_183 || data.compactMode ? 'none' : ''}"
                        fill=${data.batteryColour} class="${data.largeFont !== true ? 'st14' : 'st4'} st8">
                        ${data.batteryVoltage} ${UnitOfElectricPotential.VOLT}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_voltage_183)}>
                    <text id="battery_voltage_183" x="281" y="299"
                        display="${config.entities.battery_voltage_183 === 'none'
                        || !config.entities.battery_voltage_183 || !data.compactMode || data.batteryCount === 2 ? 'none' : ''}"
                        fill=${data.batteryColour} class="${data.compactMode ? 'st3 left-align' : 'st12'}">
                        ${data.batteryVoltage} ${UnitOfElectricPotential.VOLT}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_current_191)}>
                    <text id="battery_current_191" x="193" y="365.3"
                        display="${!config.entities.battery_current_191 || config.entities.battery_current_191 === 'none' || data.compactMode || !data.stateBatteryCurrent.isValid() ? 'none' : ''}"
                        fill=${data.batteryColour} class="${data.largeFont !== true ? 'st14' : 'st4'} st8">
                        ${config.battery.show_absolute ? Math.abs(data.stateBatteryCurrent.toNum(1)) : data.stateBatteryCurrent.toNum(1)}
                        ${UnitOfElectricalCurrent.AMPERE}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_current_191)}>
                    <text id="battery_current_191" x="281" y="312"
                        display="${!config.entities.battery_current_191 || config.entities.battery_current_191 === 'none' 
                        || !data.compactMode || !data.stateBatteryCurrent.isValid() || data.batteryCount === 2 ? 'none' : ''}"
                        fill=${data.batteryColour} class="${data.compactMode ? 'st3 left-align' : 'st12'}">
                        ${config.battery.show_absolute ? Math.abs(data.stateBatteryCurrent.toNum(1)) : data.stateBatteryCurrent.toNum(1)}
                        ${UnitOfElectricalCurrent.AMPERE}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_power_190)}>
                    <text id="data.batteryPower_190" x="${data.compactMode ? '239' : '193'}"
                        y="${data.compactMode ? '307' : '386'}"
                        display="${config.entities.battery_power_190 === 'none' || (data.compactMode && data.batteryCount === 2) ? 'none' : ''}"
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
                <text x="${data.compactMode ? '270' : !config.entities?.battery_status ? '193' : '169'}"
                    y="${data.compactMode ? '338' : '323'}"
                    class="${!config.entities?.battery_status && !data.compactMode ? 'st3' : 'st3 left-align'}"
                    display="${!config.battery.show_remaining_energy || (data.compactMode && data.batteryCount === 2) ? 'none' : ''}"
                    fill="${data.batteryColour}">
                    ${!config.battery.remaining_energy_to_shutdown
                        ? `${Utils.toNum((data.batteryEnergy * (data.stateBatterySoc.toNum() / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
                        : `${Utils.toNum((data.batteryEnergy * ((data.stateBatterySoc?.toNum() - data.batteryOneShutdown) / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
                    }
                </text>
                <text x="169" y="${!config.battery.show_remaining_energy ? '320' : '311'}" class="st3 left-align"
                    display="${data.compactMode  ? 'none' : ''}"
                    fill="${data.batteryColour}">
                    ${data.batteryStateMsg}
                </text>
            </svg>
            <svg id="two_batteries_data_compact_bat1" 
                    style="overflow: visible; display: ${config.wide && data.batteryCount === 2 && data.compactMode ? 'inline' : 'none'};"
                    x="-2.5%">
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_voltage_183)}>
                    <text id="battery_voltage_183" x="215" y="295"
                        display="${config.entities.battery_voltage_183 === 'none'
                        || !config.entities.battery_voltage_183 ? 'none' : ''}"
                        fill=${data.batteryColour} class="st3 right-align">
                        ${data.batteryVoltage} ${UnitOfElectricPotential.VOLT}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_current_191)}>
                    <text id="battery_current_191" x="215" y="308"
                        display="${!config.entities.battery_current_191 || config.entities.battery_current_191 === 'none' 
                        || !data.stateBatteryCurrent.isValid() ? 'none' : ''}"
                        fill=${data.batteryColour} class="st3 right-align">
                        ${config.battery.show_absolute ? Math.abs(data.stateBatteryCurrent.toNum(1)) : data.stateBatteryCurrent.toNum(1)}
                        ${UnitOfElectricalCurrent.AMPERE}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_power_190)}>
                    <text id="data.batteryPower_190" x="232"
                        y="325"
                        display="${config.entities.battery_power_190 === 'none' ? 'none' : ''}"
                        fill=${data.batteryColour} class="st3">
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
            </svg>
            <svg id="two_batteries_data_compact_bat2" 
                    style="overflow: visible; display: ${config.wide && data.batteryCount === 2 && data.compactMode ? 'inline' : 'none'};"
                    x="9.5%">
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_voltage_183)}>
                    <text id="battery2_voltage_183" x="213.5" y="295"
                        display="${config.entities.battery2_voltage_183 === 'none'
                        || !config.entities.battery2_voltage_183 ? 'none' : ''}"
                        fill=${data.battery2Colour} class="st3 left-align">
                        ${data.battery2Voltage} ${UnitOfElectricPotential.VOLT}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_current_191)}>
                    <text id="battery_current_191" x="213.5" y="308"
                        display="${!config.entities.battery2_current_191 || config.entities.battery2_current_191 === 'none' 
                        || !data.stateBattery2Current.isValid() ? 'none' : ''}"
                        fill=${data.battery2Colour} class="st3 left-align">
                        ${config.battery2.show_absolute ? Math.abs(data.stateBattery2Current.toNum(1)) : data.stateBattery2Current.toNum(1)}
                        ${UnitOfElectricalCurrent.AMPERE}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_power_190)}>
                    <text id="data.battery2Power_190" x="195.5"
                        y="325"
                        display="${config.entities.battery2_power_190 === 'none' ? 'none' : ''}"
                        fill=${data.battery2Colour} class="st3">
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
                <text x="225"
                    y="338"
                    class="st3 left-align"
                    display="${!config.battery2.show_remaining_energy ? 'none' : ''}"
                    fill="${data.battery2Colour}">
                    ${!config.battery2.remaining_energy_to_shutdown
                        ? `${Utils.toNum((data.battery2Energy * (data.stateBattery2Soc.toNum() / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
                        : `${Utils.toNum((data.battery2Energy * ((data.stateBattery2Soc?.toNum() - data.batteryTwoShutdown) / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
                    }
                </text>
            </svg>
            <svg id="battery2_data_lite" 
                style="overflow: visible; display: ${config.wide && data.batteryCount === 2 && !data.compactMode ? 'inline' : 'none'};" x="19%">
                <rect x="159" y="329.75" width="70"
                    height="70"
                    rx="10.5" ry="10.5"
                    fill="none"
                    stroke="${data.battery2Colour}" pointer-events="all"
                    display="${!config.show_battery ? 'none' : ''}"/>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_voltage_183)}>
                    <text id="battery2_voltage_183" x="193" y="346"
                        display="${config.entities.battery2_voltage_183 === 'none'
                        || !config.entities.battery2_voltage_183 || !config.show_battery ? 'none' : ''}"
                        fill=${data.battery2Colour} class="${data.largeFont !== true ? 'st14' : 'st4'} st8">
                        ${data.battery2Voltage} ${UnitOfElectricPotential.VOLT}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_current_191)}>
                    <text id="battery2_current_191" x="193" y="365.3"
                        display="${!config.entities.battery2_current_191 || config.entities.battery2_current_191 === 'none' || !config.show_battery  || !data.stateBattery2Current.isValid() ? 'none' : ''}"
                        fill=${data.battery2Colour} class="${data.largeFont !== true ? 'st14' : 'st4'} st8">
                        ${config.battery2.show_absolute ? Math.abs(data.stateBattery2Current.toNum(1)) : data.stateBattery2Current.toNum(1)}
                        ${UnitOfElectricalCurrent.AMPERE}
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_power_190)}>
                    <text id="data.battery2Power_190" x="193"
                        y="386"
                        display="${config.entities.battery2_power_190 === 'none' || !config.show_battery ? 'none' : ''}"
                        fill=${data.battery2Colour} class="${data.largeFont !== true ? 'st14' : 'st4'} st8">
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
                <text x="${!config.entities?.battery2_status ? '193' : '169'}"
                    y="323"
                    class="${!config.entities?.battery2_status ? 'st3' : 'st3 left-align'}"
                    display="${!config.show_battery || !config.battery2.show_remaining_energy ? 'none' : ''}"
                    fill="${data.battery2Colour}">
                    ${!config.battery2.remaining_energy_to_shutdown
                        ? `${Utils.toNum((data.battery2Energy * (data.stateBattery2Soc.toNum() / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
                        : `${Utils.toNum((data.battery2Energy * ((data.stateBattery2Soc?.toNum() - data.batteryTwoShutdown) / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
                    }
                </text>
                <text x="169" y="${!config.battery2.show_remaining_energy ? '320' : '311'}" class="st3 left-align"
                    display="${!config.show_battery ? 'none' : ''}"
                    fill="${data.battery2Colour}">
                    ${data.battery2StateMsg}
                </text>
            </svg>
            <svg id="battery_1_runtime" style="overflow: visible; display: ${data.batteryCount === 2  ? 'none' : 'inline'};" >
                <text id="duration" x="${data.compactMode ? '270' : '290'}" y="377.5"
                    class="${data.largeFont !== true ? 'st14' : 'st4'} left-align"
                    display="${data.compactMode && data.batteryCount === 2 ? 'none' : ''}"
                    fill="${data.batteryEnergy === 0 || data.isFloating || data.batteryPower === 0 ? 'transparent' : data.batteryColour}">
                    ${data.batteryDuration}
                </text>
                <text id="duration_text" x="${data.compactMode ? '270' : '290'}" y="393.7" class="st3 left-align"
                    display="${data.compactMode && data.batteryCount === 2 ? 'none' : ''}"
                    fill="${data.batteryEnergy === 0 || (config.battery.invert_flow === true ? data.batteryPower >= 0 : data.batteryPower <= 0) || data.isFloating ? 'transparent' : data.batteryColour}">
                    ${localize('common.runtime_to')} ${data.batteryCapacity}% @${data.formattedResultTime}
                </text>
                <text id="duration_text_charging" x="${data.compactMode ? '270' : '290'}" y="393.7"
                    class="st3 left-align"
                    display="${data.compactMode && data.batteryCount === 2 ? 'none' : ''}"
                    fill="${data.batteryEnergy === 0 || (config.battery.invert_flow === true ? data.batteryPower <= 0 : data.batteryPower >= 0) || data.isFloating ? 'transparent' : data.batteryColour}">
                    ${localize('common.to')} ${data.batteryCapacity}% ${localize('common.charge')}
                        @${data.formattedResultTime}
                </text>
                <text id="floating" x="${data.compactMode ? '270' : '290'}" y="393.7" class="st3 left-align"
                    display="${data.compactMode && data.batteryCount === 2 ? 'none' : ''}"
                    fill="${data.batteryEnergy === 0 || !data.isFloating ? 'transparent' : data.batteryColour}">
                    ${localize('common.battery_floating')}
                </text>
                <text id="battery_soc_184" x="${data.compactMode ? '340' : '360'}" y="351"
                    fill=${data.batteryColour}
                    class="${config.battery.hide_soc || (data.compactMode && data.batteryCount === 2) ? 'st12' : 'st14 left-align'}"
                    display="${!data.inverterProg.show && config.battery?.shutdown_soc_offgrid ? '' : 'none'}">
                    ${data.batteryShutdown}%
                </text>
                <text id="battery_soc_184" x="${data.compactMode ? '340' : '360'}" y="364"
                    fill=${data.batteryColour}
                    class="${config.battery.hide_soc || (data.compactMode && data.batteryCount === 2) ? 'st12' : 'st14 left-align'}"
                    display="${!data.inverterProg.show && config.battery?.shutdown_soc_offgrid ? '' : 'none'}">
                    ${data.shutdownOffGrid}%
                </text>
                <svg id="Battery1_SOC" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() || (data.compactMode && data.batteryCount === 2) ? 'none' : 'inline'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="${data.compactMode ? '270' : '290'}" y="358"
                            display="${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() || (data.compactMode && data.batteryCount === 2) ? 'none' : ''}"
                            fill=${data.batteryColour} class="st13 st8 left-align">
                            ${!data.inverterProg.show && config.battery.shutdown_soc_offgrid 
                                ? (config.battery.hide_soc ? data.stateBatterySoc.toDisplay() : `${data.stateBatterySoc.toNum(0)}% | `)
                                : (config.battery.hide_soc ? data.stateBatterySoc.toDisplay() : `${data.stateBatterySoc.toNum(0)}%`)}
                    </a>
                </svg>
                <svg id="Battery1_SOC_Program_Capacity" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() || config.battery.hide_soc || !data.inverterProg.show ? 'none' : 'inline'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="${data.compactMode ? '270' : '290'}" y="358"
                            display="${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() ? 'none' : ''}"
                            fill=${data.batteryColour} class="st13 st8 left-align">
                            ${data.stateBatterySoc.toNum(0)}% | ${data.inverterProg.capacity || 0}%
                        </text>
                    </a>
                </svg>
                <svg id="Battery1_SOC_Shutdown" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 !== 'none' && data.stateBatterySoc.isValid() && !config.battery.hide_soc && !data.inverterProg.show && config.battery?.shutdown_soc && !config.battery?.shutdown_soc_offgrid ? 'inline' : 'none'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="${data.compactMode ? '270' : '290'}" y="358"
                            display="${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() ? 'none' : ''}"
                            fill=${data.batteryColour} class="st13 st8 left-align">
                            ${data.stateBatterySoc.toNum(0)}% | ${data.batteryShutdown || 0}%
                        </text>
                    </a>
                </svg>
            </svg>
            <svg id="two_batteries_battery1_runtime_lite" 
                style="overflow: visible; display: ${config.wide && data.batteryCount === 2 && !data.compactMode ? 'inline' : 'none'};" 
                x="-43.5%">
                <text id="duration" x="413" y="377.5"
                    class="${data.largeFont !== true ? 'st4' : 'st14'} right-align"
                    fill="${data.batteryEnergy === 0 || data.isFloating || data.batteryPower === 0 ? 'transparent' : data.batteryColour}">
                    ${data.batteryDuration}
                </text>                          
                <text id="duration_text" x="413" y="393.7" class="st3 right-align"
                    fill="${data.batteryEnergy === 0 || (config.battery.invert_flow ? data.batteryPower >= 0 : data.batteryPower <= 0) || data.isFloating ? 'transparent' : data.batteryColour}">
                    ${localize('common.runtime_to')} ${data.batteryCapacity}% @${data.formattedResultTime}
                </text>
                <text id="duration_text_charging" x="413" y="393.7"
                    class="st3 right-align"
                    fill="${data.batteryEnergy === 0 || (config.battery.invert_flow === true ? data.batteryPower <= 0 : data.batteryPower >= 0) || data.isFloating ? 'transparent' : data.batteryColour}">
                    ${localize('common.to')} ${data.batteryCapacity}% ${localize('common.charge')}
                        @${data.formattedResultTime}
                </text>
                <text id="floating" x="413" y="393.7" class="st3 right-align"
                    fill="${data.batteryEnergy === 0 || !data.isFloating ? 'transparent' : data.batteryColour}">
                    ${localize('common.battery_floating')}
                </text>
                <text id="battery_soc_184" x="342" y="351"
                    fill=${data.batteryColour}
                    class="${config.battery.hide_soc || (data.compactMode && data.batteryCount === 2) ? 'st12' : 'st14 right-align'}"
                    display="${!data.inverterProg.show && config.battery?.shutdown_soc_offgrid ? '' : 'none'}">
                    ${data.batteryShutdown}%
                </text>
                <text id="battery_soc_184" x="342" y="364"
                    fill=${data.batteryColour}
                    class="${config.battery.hide_soc || (data.compactMode && data.batteryCount === 2) ? 'st12' : 'st14 right-align'}"
                    display="${!data.inverterProg.show && config.battery?.shutdown_soc_offgrid ? '' : 'none'}">
                    ${data.shutdownOffGrid}%
                </text>
                <svg id="Battery1_SOC" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() || (data.compactMode && data.batteryCount === 2) ? 'none' : 'inline'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="413" y="358"
                            display="${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() || (data.compactMode && data.batteryCount === 2) ? 'none' : ''}"
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
                        <text id="battery_soc_184" x="413" y="358"
                            display="${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() ? 'none' : ''}"
                            fill=${data.batteryColour} class="st13 st8 right-align">
                            ${data.inverterProg.capacity || 0}% | ${data.stateBatterySoc.toNum(0)}%
                        </text>
                    </a>
                </svg>
                <svg id="Battery1_SOC_Shutdown" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 !== 'none' && data.stateBatterySoc.isValid() && !config.battery.hide_soc && !data.inverterProg.show && config.battery?.shutdown_soc && !config.battery?.shutdown_soc_offgrid ? 'inline' : 'none'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="413" y="358"
                            display="${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() ? 'none' : ''}"
                            fill=${data.batteryColour} class="st13 st8 right-align">
                            ${data.batteryShutdown || 0}% | ${data.stateBatterySoc.toNum(0)}%
                        </text>
                    </a>
                </svg>
            </svg>
            <svg id="two_batteries_battery_2_runtime_lite" 
                style="overflow: visible; display: ${config.wide && data.batteryCount === 2 && !data.compactMode ? 'inline' : 'none'};"  
                x="12%">
                <text id="duration" x="290" y="377.5"
                    class="${data.largeFont !== true ? 'st14' : 'st4'} left-align"
                    fill="${data.battery2Energy === 0 || data.isFloating2 || data.battery2Power === 0 ? 'transparent' : data.battery2Colour}">
                    ${data.batteryDuration2}
                </text>
                <text id="duration_text" x="290" y="393.7" class="st3 left-align"
                    fill="${data.battery2Energy === 0 || (config.battery2.invert_flow === true ? data.battery2Power >= 0 : data.battery2Power <= 0) || data.isFloating2 ? 'transparent' : data.battery2Colour}">
                    ${localize('common.runtime_to')} ${data.battery2Capacity}% @${data.formattedResultTime2}
                </text>
                <text id="duration_text_charging" x="290" y="393.7"
                    class="st3 left-align"
                    fill="${data.battery2Energy === 0 || (config.battery2.invert_flow === true ? data.battery2Power <= 0 : data.battery2Power >= 0) || data.isFloating2 ? 'transparent' : data.battery2Colour}">
                    ${localize('common.to')} ${data.battery2Capacity}% ${localize('common.charge')}
                        @${data.formattedResultTime2}
                </text>
                <text id="floating" x="290" y="393.7" class="st3 left-align"
                    fill="${data.battery2Energy === 0 || !data.isFloating2 ? 'transparent' : data.battery2Colour}">
                    ${localize('common.battery_floating')}
                </text>
                <text id="battery_soc_184" x="360" y="351"
                    fill=${data.battery2Colour}
                    class="${config.battery2.hide_soc ? 'st12' : 'st14 left-align'}"
                    display="${!data.inverterProg.show && config.battery2?.shutdown_soc_offgrid ? '' : 'none'}">
                    ${data.batteryShutdown2}%
                </text>
                <text id="battery_soc_184" x="360" y="364"
                    fill=${data.battery2Colour}
                    class="${config.battery2.hide_soc ? 'st12' : 'st14 left-align'}"
                    display="${!data.inverterProg.show && config.battery2?.shutdown_soc_offgrid ? '' : 'none'}">
                    ${data.shutdownOffGrid2}%
                </text>
                <svg id="Battery2_SOC" 
                    style="overflow: visible; 
                        display: ${config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid() ? 'none' : 'inline'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_soc_184)}>
                        <text id="battery_soc_184" x="290" y="358"
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
                        <text id="battery_soc_184" x="290" y="358"
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
                        <text id="battery_soc_184" x="290" y="358"
                            display="${config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid() ? 'none' : ''}"
                            fill=${data.battery2Colour} class="st13 st8 left-align">
                            ${data.stateBattery2Soc.toNum(0)}% | ${data.batteryShutdown2 || 0}%
                        </text>
                    </a>
                </svg>
            </svg>
            <svg id="two_batteries_runtime_compact_bat1" 
                    style="overflow: visible; display: ${config.wide && data.batteryCount === 2 && data.compactMode ? 'inline' : 'none'};"
                    x="-29%">
                <text id="duration" x="393" y="377.5"
                    class="${data.largeFont !== true ? 'st14' : 'st4'} right-align"
                    fill="${data.batteryEnergy === 0 || data.isFloating || data.batteryPower === 0 ? 'transparent' : data.batteryColour}">
                    ${data.batteryDuration}
                </text>
                <text id="duration_text" x="393" y="393.7" class="st3 right-align"
                    display="${data.batteryCount === 1 ? 'none' : ''}"
                    fill="${data.batteryEnergy === 0 || (config.battery.invert_flow === true ? data.batteryPower >= 0 : data.batteryPower <= 0) || data.isFloating ? 'transparent' : data.batteryColour}">
                    ${localize('common.runtime_to')} ${data.batteryCapacity}% @${data.formattedResultTime}
                </text>
                <text id="duration_text_charging" x="393" y="393.7"
                    class="st3 right-align"
                    fill="${data.batteryEnergy === 0 || (config.battery.invert_flow === true ? data.batteryPower <= 0 : data.batteryPower >= 0) || data.isFloating ? 'transparent' : data.batteryColour}">
                    ${localize('common.to')} ${data.batteryCapacity}% ${localize('common.charge')}
                        @${data.formattedResultTime}
                </text>
                <text id="floating" x="393" y="393.7" class="st3 right-align"
                    fill="${data.batteryEnergy === 0 || !data.isFloating ? 'transparent' : data.batteryColour}">
                    ${localize('common.battery_floating')}
                </text>
                <text id="battery_soc_184" x="320" y="351"
                    fill=${data.batteryColour}
                    class="${config.battery.hide_soc ? 'st12' : 'st14 right-align'}"
                    display="${!data.inverterProg.show && config.battery?.shutdown_soc_offgrid ? '' : 'none'}">
                    ${data.batteryShutdown}%
                </text>
                <text id="battery_soc_184" x="320" y="364"
                    fill=${data.batteryColour}
                    class="${config.battery.hide_soc  ? 'st12' : 'st14 right-align'}"
                    display="${!data.inverterProg.show && config.battery?.shutdown_soc_offgrid ? '' : 'none'}">
                    ${data.shutdownOffGrid}%
                </text>
                <svg id="Battery1_SOC" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() ? 'none' : 'inline'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soc_184)}>
                        <text id="battery_soc_184" x="393" y="358"
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
                        <text id="battery_soc_184" x="393" y="358"
                            display="${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() ? 'none' : ''}"
                            fill=${data.batteryColour} class="st13 st8 right-align">
                            ${data.inverterProg.capacity || 0}% | ${data.stateBatterySoc.toNum(0)}%
                        </text>
                    </a>
                </svg>
                <svg id="Battery1_SOC_Shutdown" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 !== 'none' && data.stateBatterySoc.isValid() && !config.battery.hide_soc && !data.inverterProg.show && config.battery?.shutdown_soc && !config.battery?.shutdown_soc_offgrid ? 'inline' : 'none'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_soc_184)}>
                        <text id="battery_soc_184" x="393" y="358"
                            display="${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() ? 'none' : ''}"
                            fill=${data.batteryColour} class="st13 st8 right-align">
                            ${data.batteryShutdown || 0}% | ${data.stateBatterySoc.toNum(0)}%
                        </text>
                    </a>
                </svg>
                <text x="393"
                    y="338"
                    class="st3 right-align"
                    display="${!config.battery.show_remaining_energy ? 'none' : ''}"
                    fill="${data.batteryColour}">
                    ${!config.battery.remaining_energy_to_shutdown
                        ? `${Utils.toNum((data.batteryEnergy * (data.stateBatterySoc.toNum() / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
                        : `${Utils.toNum((data.batteryEnergy * ((data.stateBatterySoc?.toNum() - data.batteryOneShutdown) / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
                    }
                </text>
            </svg>
            <svg id="two_batteries_runtime_compact_bat2" 
                    style="overflow: visible; display: ${config.wide && data.batteryCount === 2 && data.compactMode ? 'inline' : 'none'};"
                    x="0.3%">
                <text id="duration" x="290" y="377.5"
                    class="${data.largeFont !== true ? 'st14' : 'st4'} left-align"
                    fill="${data.battery2Energy === 0 || data.isFloating2 || data.battery2Power === 0 ? 'transparent' : data.battery2Colour}">
                    ${data.batteryDuration2}
                </text>
                <text id="duration_text" x="290" y="393.7" class="st3 left-align"
                    fill="${data.battery2Energy === 0 || (config.battery2.invert_flow === true ? data.battery2Power >= 0 : data.battery2Power <= 0) || data.isFloating2 ? 'transparent' : data.battery2Colour}">
                    ${localize('common.runtime_to')} ${data.battery2Capacity}% @${data.formattedResultTime2}
                </text>
                <text id="duration_text_charging" x="290" y="393.7"
                    class="st3 left-align"
                    fill="${data.battery2Energy === 0 || (config.battery2.invert_flow === true ? data.battery2Power <= 0 : data.battery2Power >= 0) || data.isFloating2 ? 'transparent' : data.battery2Colour}">
                    ${localize('common.to')} ${data.battery2Capacity}% ${localize('common.charge')}
                        @${data.formattedResultTime2}
                </text>
                <text id="floating" x="290" y="393.7" class="st3 left-align"
                    fill="${data.battery2Energy === 0 || !data.isFloating2 ? 'transparent' : data.battery2Colour}">
                    ${localize('common.battery_floating')}
                </text>
                <text id="battery_soc_184" x="360" y="351"
                    fill=${data.battery2Colour}
                    class="${config.battery2.hide_soc ? 'st12' : 'st14 left-align'}"
                    display="${!data.inverterProg.show && config.battery2?.shutdown_soc_offgrid ? '' : 'none'}">
                    ${data.batteryShutdown2}%
                </text>
                <text id="battery_soc_184" x="360" y="364"
                    fill=${data.battery2Colour}
                    class="${config.battery2.hide_soc ? 'st12' : 'st14 left-align'}"
                    display="${!data.inverterProg.show && config.battery2?.shutdown_soc_offgrid ? '' : 'none'}">
                    ${data.shutdownOffGrid2}%
                </text>
                <svg id="Battery2_SOC" 
                    style="overflow: visible; 
                        display: ${config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid() ? 'none' : 'inline'};">  
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_soc_184)}>
                        <text id="battery_soc_184" x="290" y="358"
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
                        <text id="battery_soc_184" x="290" y="358"
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
                        <text id="battery_soc_184" x="290" y="358"
                            display="${config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid() ? 'none' : ''}"
                            fill=${data.battery2Colour} class="st13 st8 left-align">
                            ${data.stateBattery2Soc.toNum(0)}% | ${data.batteryShutdown2 || 0}%
                        </text>
                    </a>
                </svg>
            </svg>
            <svg id="battery_flow" style="overflow: visible;">
                <path id="bat-line"
                d="${data.batteryCount === 2
                        ? 'M 239 250 L 239 285'
                        : data.compactMode
                            ? 'M 239 250 L 239 290'
                            : 'M 239 250 L 239 324'}"
                    fill="none"
                    stroke="${config.battery.dynamic_colour ? data.flowBatColour : data.batteryColour}" stroke-width="${data.batLineWidth}" stroke-miterlimit="10"
                    pointer-events="stroke"/>
                <circle id="power-dot-discharge" cx="0" cy="0"
                        r="${Math.min(2 + data.batLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.batteryPowerTotal < 0 || data.batteryPowerTotal === 0 ? 'transparent' : data.batteryColour}">
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
            <svg id="battery_icon" style="overflow: visible;" x="${data.batteryCount === 2 ? '-6.25%' : '0%'}">
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_temp_182)}>
                    <text id="battery_temp_182" x="${data.compactMode ? '205' : '250'}"
                        y="${data.compactMode ? '332' : '324.5'}"
                        class="${config.entities?.battery_temp_182 ? 'st3 left-align' : 'st12'}"
                        fill="${data.batteryColour}"
                        display="${!data.stateBatteryTemp.isValid() || (data.compactMode && data.batteryCount === 2) ? 'none' : ''}">
                        ${data.stateBatteryTemp.toNum(1)}°
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery_soh)}>
                    <text id="battery_soh" x="${data.compactMode ? '205' : '250'}"
                        y="${data.compactMode ? '332' : '324.5'}"
                        class="${config.entities?.battery_soh ? 'st3 left-align' : 'st12'}"
                        fill="${data.batteryColour}"
                        display="${!data.stateBatterySOH.isValid() || config.entities?.battery_temp_182 || (data.compactMode && data.batteryCount === 2) ? 'none' : ''}">
                        ${data.stateBatterySOH.toNum(0)}%
                    </text>
                </a>
                <circle id="bat" cx="${data.compactMode ? '238.5' : '162'}"
                    cy="${data.compactMode
                            ? '326'
                            : !config.battery.show_remaining_energy
                                    ? '319'
                                    : '310'
                    }"
                    r="3.5"
                    display="${config.entities?.battery_status === 'none' || !config.entities?.battery_status || (data.compactMode && data.batteryCount === 2) ? 'none' : ''}"
                    fill="${data.batteryStateColour}"/>
                
                        <a href="#" @click=${(e) => config.battery.navigate ? Utils.handleNavigation(e, config.battery.navigate) : null}>
                            <svg id="bat_outter" x="${data.compactMode && data.batteryCount === 1 ? '212.5' : '232.5'}"
                                y="325.5" width="78.75"
                                height="78.75" preserveAspectRatio="none"
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
                            <svg id="bat_inner" x="${data.compactMode && data.batteryCount === 1 ? '212.5' : '232.5'}"
                                y="325.5" width="78.75"
                                height="78.75" preserveAspectRatio="none"
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
            </svg>
            <svg id="battery2_icon" 
                style="overflow: visible; display: ${config.wide && data.batteryCount === 2 ? 'inline' : 'none'};" 
                x="0.75%">
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_temp_182)}>
                    <text id="battery2_temp_182" x="250"
                        y="324.5"
                        class="${config.entities?.battery2_temp_182 ? 'st3 left-align' : 'st12'}"
                        fill="${data.battery2Colour}"
                        display="${!data.stateBattery2Temp.isValid() || (data.compactMode && data.batteryCount === 2) ? 'none' : ''}">
                        ${data.stateBattery2Temp.toNum(1)}°
                    </text>
                </a>
                <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.battery2_soh)}>
                    <text id="battery_soh" x="250"
                        y="324.5"
                        class="${config.entities?.battery2_soh ? 'st3 left-align' : 'st12'}"
                        fill="${data.battery2Colour}"
                        display="${!data.stateBattery2SOH.isValid() || config.entities?.battery2_temp_182 || (data.compactMode && data.batteryCount === 2) ? 'none' : ''}">
                        ${data.stateBattery2SOH.toNum(0)}%
                    </text>
                </a>
                <circle id="bat" cx="295"
                    cy="${data.compactMode
                            ? '326'
                            : !config.battery2.show_remaining_energy
                                    ? '319'
                                    : '310'
                    }"
                    r="3.5"
                    display="${config.entities?.battery2_status === 'none' || !config.entities?.battery2_status || (data.compactMode && data.batteryCount === 2) ? 'none' : ''}"
                    fill="${data.battery2StateColour}"/>

                        <a href="#" @click=${(e) => config.battery2.navigate ? Utils.handleNavigation(e, config.battery2.navigate) : null}>
                            <svg id="bat" x="232.5"
                                y="325.5" width="78.75"
                                height="78.75" preserveAspectRatio="none"
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
                                            stop-color="${data.pvPercentageBat > 0 ? data.solarColour : data.batteryColour}"/>
                                        <stop offset="${(data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat) + (data.pvPercentageBat < 2 ? 0 : data.pvPercentageBat)}%"
                                            stop-color="${data.battery2Colour}"/>
                                        <stop offset="100%"
                                            stop-color="${data.battery2Colour}"/>
                                    </linearGradient>
                                </defs>
                                <path fill="${config.battery2.dynamic_colour ? `url(#b2Lg-${data.timestamp_id})` : data.battery2Colour}"
                                    d="${config.battery2.linear_gradient ? data.battery20 : data.battery2Icon}"/>
                            </svg>
                            <svg id="bat" x="232.5"
                                y="325.5" width="78.75"
                                height="78.75" preserveAspectRatio="none"
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
            </svg>
            <svg id="battery_daily" style="overflow: visible;">
                <svg id="battery_daily_charge" style="overflow: visible;" x="${data.batteryCount === 2 ? '42%' : '0%'}" y="${data.batteryCount === 2 ? '-20%' : '0%'}">
                    <text id="daily_bat_charge" x="${data.compactMode && data.batteryCount === 1 ? '132' : '77.2'}" y="357.2"
                        class="st3 left-align"
                        fill="${data.batteryShowDaily !== true  ? 'transparent' : data.batteryColour}">
                        ${localize('common.daily_charge')}
                    </text>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_battery_charge_70)}>
                        <text id="daily_bat_charge_value" x="${data.compactMode && data.batteryCount === 1 ? '132' : '77.2'}" y="343"
                            class="st10 left-align"
                            display="${data.batteryShowDaily !== true || !data.stateDayBatteryCharge.isValid() ? 'none' : ''}"
                            fill="${data.batteryColour}">
                            ${data.stateDayBatteryCharge?.toPowerString(true, data.decimalPlacesEnergy)}
                        </text>
                    </a>
                </svg>
                <svg id="battery_daily_discharge" style="overflow: visible;" x="${data.batteryCount === 2 ? '42%' : '0%'}" y="${data.batteryCount === 2 ? '-20%' : '0%'}">
                    <text id="daily_bat_dischcharge" x="${data.compactMode && data.batteryCount === 1 ? '132' : '77.2'}" y="393.7"
                        class="st3 left-align"
                        fill="${data.batteryShowDaily !== true ? 'transparent' : data.batteryColour}">
                        ${localize('common.daily_discharge')}
                    </text>
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_battery_discharge_71)}>
                        <text id="daily_bat_discharge_value" x="${data.compactMode && data.batteryCount === 1 ? '132' : '77.2'}" y="380.1"
                            class="st10 left-align"
                            display="${data.batteryShowDaily !== true || !data.stateDayBatteryDischarge.isValid() ? 'none' : ''}"
                            fill="${data.batteryColour}">
                            ${data.stateDayBatteryDischarge?.toPowerString(true, data.decimalPlacesEnergy)}
                        </text>
                    </a>
                </svg>
            </svg>
            </g>
        </svg>
    `;
}
