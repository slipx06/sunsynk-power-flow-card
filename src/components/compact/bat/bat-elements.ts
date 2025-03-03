// bat-elements.ts
import {html} from 'lit';
import {localize} from '../../../localize/localize';
import {Utils} from '../../../helpers/utils';
import {DataDto, sunsynkPowerFlowCardConfig} from '../../../types';
import {UnitOfElectricalCurrent, UnitOfElectricPotential, UnitOfPower, UnitOfEnergy} from '../../../const';
import {createTextWithPopup, renderText} from '../../../helpers/text-utils';
import {renderPath} from '../../../helpers/render-path';

export const renderBatteryElements = (data: DataDto, config: sunsynkPowerFlowCardConfig) => {
    const { 
        batteryCount,
        batteryColour,
        battery2Colour,
        compactMode,
        largeFont,
        decimalPlaces,
        batteryPower,
        battery2Power,
        isFloating,
        isFloating2,
        batteryShutdown,
        batteryShutdown2
    } = data;
    
    const {
        auto_scale,
        show_absolute
    } = config.battery

    return html`
        <!-- Battery Elements -->
        <svg id="battery_main" 
            style="overflow: visible; display: ${!config.show_battery ? 'none' : 'inline'};" 
            x="${config.wide ? '10%' : '0%'}">
            <g>
            <svg id="battery_total_power" 
                style="overflow: visible; display: ${config.wide && batteryCount === 2 ? 'inline' : 'none'};">
                <rect x="205" y="285" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                    stroke="${batteryColour}" pointer-events="all"
                    class="${compactMode ? '' : ''}"/>
                ${renderText(
                    'battery_power_total',
                    240,
                    302,
                    true,
                    `${largeFont !== true ? 'st14' : 'st4'} st8`,
                    batteryColour,
                    auto_scale
                        ? `${Utils.convertValue(data.batteryPowerTotal, decimalPlaces) || 0}`
                        : `${Utils.toNum(data.batteryPowerTotal || 0, 0)} ${UnitOfPower.WATT}`,
                )}
            </svg>
            <svg id="battery_data" style="overflow: visible;" x="${batteryCount === 2 ? '-6.5%' : '0%'}">
                <rect x="205" y="290" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                    stroke="${batteryColour}" pointer-events="all"
                    class="${compactMode && batteryCount === 1 ? '' : 'st12'}"/>
                <rect x="159" y="${compactMode ? '348' : '329.75'}" width="70"
                    height="${compactMode ? '50' : '70'}"
                    rx="${compactMode ? '7.5' : '10.5'}" ry="${compactMode ? '7.5' : '10.5'}"
                    fill="none"
                    stroke="${batteryColour}" pointer-events="all"
                    class="${compactMode ? 'st12' : ''}"/>
                ${createTextWithPopup(
                    'battery_voltage_183',
                    193,
                    346,
                    config.entities.battery_voltage_183 === 'none' || !config.entities.battery_voltage_183 || compactMode,
                    `${largeFont !== true ? 'st14' : 'st4'} st8`,
                    batteryColour,
                    `${data.batteryVoltage} ${UnitOfElectricPotential.VOLT}`,
                    (e) => Utils.handlePopup(e, config.entities.battery_voltage_183),
                    true
                )}
                ${createTextWithPopup(
                    'battery_voltage_183',
                    281,
                    299,
                    config.entities.battery_voltage_183 === 'none' || !config.entities.battery_voltage_183 || !compactMode || batteryCount === 2,
                    `${compactMode ? 'st3 left-align' : 'st12'}`,
                    batteryColour,
                    `${data.batteryVoltage} ${UnitOfElectricPotential.VOLT}`,
                    (e) => Utils.handlePopup(e, config.entities.battery_voltage_183),
                    true
                )}
                ${createTextWithPopup(
                    'battery_current_191',
                    193,
                    365.3,
                    !config.entities.battery_current_191 || config.entities.battery_current_191 === 'none' || compactMode || !data.stateBatteryCurrent.isValid(),
                    `${largeFont !== true ? 'st14' : 'st4'} st8`,
                    batteryColour,
                    `${show_absolute ? Math.abs(data.stateBatteryCurrent.toNum(1)) : data.stateBatteryCurrent.toNum(1)} ${UnitOfElectricalCurrent.AMPERE}`,
                    (e) => Utils.handlePopup(e, config.entities.battery_current_191),
                    true
                )}
                ${createTextWithPopup(
                    'battery_current_191',
                    281,
                    312,
                    !config.entities.battery_current_191 || config.entities.battery_current_191 === 'none' || !compactMode || !data.stateBatteryCurrent.isValid() || batteryCount === 2,
                    `${compactMode ? 'st3 left-align' : 'st12'}`,
                    batteryColour,
                    `${show_absolute ? Math.abs(data.stateBatteryCurrent.toNum(1)) : data.stateBatteryCurrent.toNum(1)} ${UnitOfElectricalCurrent.AMPERE}`,
                    (e) => Utils.handlePopup(e, config.entities.battery_current_191),
                    true
                )}
                ${createTextWithPopup(
                    'data.batteryPower_190',
                    compactMode ? 239 : 193,
                    compactMode ? 307 : 386,
                    config.entities.battery_power_190 === 'none' || (compactMode && batteryCount === 2),
                    `${largeFont !== true ? 'st14' : 'st4'} st8`,
                    batteryColour,
                    auto_scale
                        ? `${show_absolute
                                ? `${Math.abs(parseFloat(Utils.convertValue(batteryPower, decimalPlaces)))} ${Utils.convertValue(batteryPower, decimalPlaces).split(' ')[1]}`
                                : Utils.convertValue(batteryPower, decimalPlaces) || '0'}`
                        : `${show_absolute
                                ? `${Math.abs(batteryPower)} ${UnitOfPower.WATT}`
                                : `${batteryPower || 0} ${UnitOfPower.WATT}`}`,
                    (e) => Utils.handlePopup(e, config.entities.battery_power_190),
                    true
                )}
                ${renderText(
                    'battery_remaining_energy',
                    compactMode ? 270 : !config.entities?.battery_status ? 193 : 169,
                    compactMode ? 338 : 323,
                    !config.battery.show_remaining_energy || (compactMode && batteryCount === 2),
                    !config.entities?.battery_status && !compactMode ? 'remaining-energy' : 'remaining-energy left-align',
                    batteryColour,
                    !config.battery.remaining_energy_to_shutdown
                        ? `${Utils.toNum((data.batteryEnergy * (data.stateBatterySoc.toNum() / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
                        : `${Utils.toNum((data.batteryEnergy * ((data.stateBatterySoc?.toNum() - data.batteryOneShutdown) / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`,
                    true
                )}
                ${renderText(
                    'battery_state_msg',
                    169,
                    !config.battery.show_remaining_energy ? 320 : 311,
                    compactMode,
                    'st3 left-align',
                    batteryColour,
                    data.batteryStateMsg,
                    true
                )}
            </svg>
            <svg id="two_batteries_data_compact_bat1" 
                    style="overflow: visible; display: ${config.wide && batteryCount === 2 && compactMode ? 'inline' : 'none'};"
                    x="-2.5%">
                    ${createTextWithPopup(
                        'battery_voltage_183',
                        215,
                        295,
                        config.entities.battery_voltage_183 === 'none' || !config.entities.battery_voltage_183,
                        'st3 right-align',
                        batteryColour,
                        `${data.batteryVoltage} ${UnitOfElectricPotential.VOLT}`,
                        (e) => Utils.handlePopup(e, config.entities.battery_voltage_183),
                        true
                    )}
                    ${createTextWithPopup(
                        'battery_current_191',
                        215,
                        308,
                        !config.entities.battery_current_191 || config.entities.battery_current_191 === 'none' || !data.stateBatteryCurrent.isValid(),
                        'st3 right-align',
                        batteryColour,
                        `${show_absolute ? Math.abs(data.stateBatteryCurrent.toNum(1)) : data.stateBatteryCurrent.toNum(1)} ${UnitOfElectricalCurrent.AMPERE}`,
                        (e) => Utils.handlePopup(e, config.entities.battery_current_191),
                        true
                    )}
                    ${createTextWithPopup(
                        'data.batteryPower_190',
                        232,
                        325,
                        config.entities.battery_power_190 === 'none',
                        'st3',
                        batteryColour,
                        auto_scale
                            ? `${show_absolute
                                    ? `${Math.abs(parseFloat(Utils.convertValue(batteryPower, decimalPlaces)))} ${Utils.convertValue(batteryPower, decimalPlaces).split(' ')[1]}`
                                    : Utils.convertValue(batteryPower, decimalPlaces) || '0'}`
                            : `${show_absolute
                                    ? `${Math.abs(batteryPower)} ${UnitOfPower.WATT}`
                                    : `${batteryPower || 0} ${UnitOfPower.WATT}`}`,
                        (e) => Utils.handlePopup(e, config.entities.battery_power_190),
                        true
                    )}
            </svg>
            <svg id="two_batteries_data_compact_bat2" 
                    style="overflow: visible; display: ${config.wide && batteryCount === 2 && compactMode ? 'inline' : 'none'};"
                    x="9.5%">
                ${createTextWithPopup(
                    'battery2_voltage_183',
                    213.5,
                    295,
                    config.entities.battery2_voltage_183 === 'none' || !config.entities.battery2_voltage_183,
                    'st3 left-align',
                    battery2Colour,
                    `${data.battery2Voltage} ${UnitOfElectricPotential.VOLT}`,
                    (e) => Utils.handlePopup(e, config.entities.battery2_voltage_183),
                    true
                )}
                ${createTextWithPopup(
                    'battery_current_191',
                    213.5,
                    308,
                    !config.entities.battery2_current_191 || config.entities.battery2_current_191 === 'none' || !data.stateBattery2Current.isValid(),
                    'st3 left-align',
                    battery2Colour,
                    `${config.battery2.show_absolute ? Math.abs(data.stateBattery2Current.toNum(1)) : data.stateBattery2Current.toNum(1)} ${UnitOfElectricalCurrent.AMPERE}`,
                    (e) => Utils.handlePopup(e, config.entities.battery2_current_191),
                    true
                )}
                ${createTextWithPopup(
                    'data.battery2Power_190',
                    195.5,
                    325,
                    config.entities.battery2_power_190 === 'none',
                    'st3',
                    battery2Colour,
                    config.battery2.auto_scale
                        ? `${config.battery2.show_absolute
                                ? `${Math.abs(parseFloat(Utils.convertValue(battery2Power, decimalPlaces)))} ${Utils.convertValue(battery2Power, decimalPlaces).split(' ')[1]}`
                                : Utils.convertValue(battery2Power, decimalPlaces) || '0'}`
                        : `${config.battery2.show_absolute
                                ? `${Math.abs(battery2Power)} ${UnitOfPower.WATT}`
                                : `${battery2Power || 0} ${UnitOfPower.WATT}`}`,
                    (e) => Utils.handlePopup(e, config.entities.battery2_power_190),
                    true
                )}
                ${renderText(
                    'battery2_remaining_energy',
                    225,
                    338,
                    !config.battery2.show_remaining_energy,
                    'remaining-energy left-align',
                    battery2Colour,
                    !config.battery2.remaining_energy_to_shutdown
                        ? `${Utils.toNum((data.battery2Energy * (data.stateBattery2Soc.toNum() / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
                        : `${Utils.toNum((data.battery2Energy * ((data.stateBattery2Soc?.toNum() - data.batteryTwoShutdown) / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`,
                    true
                )}
            </svg>
            <svg id="battery2_data_lite" 
                style="overflow: visible; display: ${config.wide && batteryCount === 2 && !compactMode ? 'inline' : 'none'};" x="19%">
                <rect x="159" y="329.75" width="70"
                    height="70"
                    rx="10.5" ry="10.5"
                    fill="none"
                    stroke="${battery2Colour}" pointer-events="all"
                    display="${!config.show_battery ? 'none' : ''}"/>
                ${createTextWithPopup(
                    'battery2_voltage_183',
                    193,
                    346,
                    config.entities.battery2_voltage_183 === 'none' || !config.entities.battery2_voltage_183 || !config.show_battery,
                    `${largeFont !== true ? 'st14' : 'st4'} st8`,
                    battery2Colour,
                    `${data.battery2Voltage} ${UnitOfElectricPotential.VOLT}`,
                    (e) => Utils.handlePopup(e, config.entities.battery2_voltage_183),
                    true
                )}
                ${createTextWithPopup(
                    'battery2_current_191',
                    193,
                    365.3,
                    !config.entities.battery2_current_191 || config.entities.battery2_current_191 === 'none' || !config.show_battery || !data.stateBattery2Current.isValid(),
                    `${largeFont !== true ? 'st14' : 'st4'} st8`,
                    battery2Colour,
                    `${config.battery2.show_absolute ? Math.abs(data.stateBattery2Current.toNum(1)) : data.stateBattery2Current.toNum(1)} ${UnitOfElectricalCurrent.AMPERE}`,
                    (e) => Utils.handlePopup(e, config.entities.battery2_current_191),
                    true
                )}
                ${createTextWithPopup(
                    'data.battery2Power_190',
                    193,
                    386,
                    config.entities.battery2_power_190 === 'none' || !config.show_battery,
                    `${largeFont !== true ? 'st14' : 'st4'} st8`,
                    battery2Colour,
                    config.battery2.auto_scale
                        ? `${config.battery2.show_absolute
                                ? `${Math.abs(parseFloat(Utils.convertValue(battery2Power, decimalPlaces)))} ${Utils.convertValue(battery2Power, decimalPlaces).split(' ')[1]}`
                                : Utils.convertValue(battery2Power, decimalPlaces) || '0'}`
                        : `${config.battery2.show_absolute
                                ? `${Math.abs(battery2Power)} ${UnitOfPower.WATT}`
                                : `${battery2Power || 0} ${UnitOfPower.WATT}`}`,
                    (e) => Utils.handlePopup(e, config.entities.battery2_power_190),
                    true
                )}
                ${renderText(
                    'battery2_remaining_energy',
                    !config.entities?.battery2_status ? 193 : 169,
                    323,
                    !config.show_battery || !config.battery2.show_remaining_energy,
                    !config.entities?.battery2_status ? 'remaining-energy' : 'remaining-energy left-align',
                    battery2Colour,
                    !config.battery2.remaining_energy_to_shutdown
                        ? `${Utils.toNum((data.battery2Energy * (data.stateBattery2Soc.toNum() / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
                        : `${Utils.toNum((data.battery2Energy * ((data.stateBattery2Soc?.toNum() - data.batteryTwoShutdown) / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`,
                    true
                )}
                ${renderText(
                    'battery2_state_msg',
                    169,
                    !config.battery2.show_remaining_energy ? 320 : 311,
                    !config.show_battery,
                    'st3 left-align',
                    battery2Colour,
                    data.battery2StateMsg,
                    true
                )}
            </svg>
            <svg id="battery_1_runtime" style="overflow: visible; display: ${batteryCount === 2  ? 'none' : 'inline'};" >
                ${renderText(
                    'duration',
                    compactMode ? 270 : 290,
                    377.5,
                    compactMode && batteryCount === 2,
                    `${largeFont !== true ? 'st14' : 'st4'} left-align`,
                    data.batteryEnergy === 0 || isFloating || batteryPower === 0 ? 'transparent' : batteryColour,
                    data.batteryDuration,
                    true
                )}    
                ${renderText(
                    'duration_text',
                    compactMode ? 270 : 290,
                    393.7,
                    compactMode && batteryCount === 2,
                    'st3 left-align',
                    data.batteryEnergy === 0 || (config.battery.invert_flow === true ? batteryPower >= 0 : batteryPower <= 0) || isFloating ? 'transparent' : batteryColour,
                    `${localize('common.runtime_to')} ${data.batteryCapacity}% @${data.formattedResultTime}`,
                    true
                )}
                ${renderText(
                    'duration_text_charging',
                    compactMode ? 270 : 290,
                    393.7,
                    compactMode && batteryCount === 2,
                    'st3 left-align',
                    data.batteryEnergy === 0 || (config.battery.invert_flow === true ? batteryPower <= 0 : batteryPower >= 0) || isFloating ? 'transparent' : batteryColour,
                    `${localize('common.to')} ${data.batteryCapacity}% ${localize('common.charge')} @${data.formattedResultTime}`,
                    true
                )}
                ${renderText(
                    'floating',
                    compactMode ? 270 : 290,
                    393.7,
                    compactMode && batteryCount === 2,
                    'st3 left-align',
                    data.batteryEnergy === 0 || !isFloating ? 'transparent' : batteryColour,
                    localize('common.battery_floating'),
                    true
                )}
                ${renderText(
                    'battery_soc_184',
                    compactMode ? 340 : 360,
                    351,
                    !data.inverterProg.show && config.battery?.shutdown_soc_offgrid,
                    `${config.battery.hide_soc || (compactMode && batteryCount === 2) ? 'st12' : 'st14 left-align'}`,
                    batteryColour,
                    `${batteryShutdown}%`,
                )}
                ${renderText(
                    'battery_soc_184',
                    compactMode ? 340 : 360,
                    364,
                    !data.inverterProg.show && config.battery?.shutdown_soc_offgrid,
                    `${config.battery.hide_soc || (compactMode && batteryCount === 2) ? 'st12' : 'st14 left-align'}`,
                    batteryColour,
                    `${data.shutdownOffGrid}%`,
                )}
                <svg id="Battery1_SOC" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() || (compactMode && batteryCount === 2) ? 'none' : 'inline'};">  
                    ${createTextWithPopup(
                        'battery_soc_184',
                        compactMode ? 270 : 290,
                        358,
                        config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() || (compactMode && batteryCount === 2),
                        'st13 st8 left-align',
                        batteryColour,
                        !data.inverterProg.show && config.battery.shutdown_soc_offgrid
                            ? (config.battery.hide_soc ? data.stateBatterySoc.toDisplay() : `${data.stateBatterySoc.toNum(0)}% | `)
                            : (config.battery.hide_soc ? data.stateBatterySoc.toDisplay() : `${data.stateBatterySoc.toNum(0)}%`),
                        (e) => Utils.handlePopup(e, config.entities.battery_soc_184),
                        true
                    )}
                </svg>
                <svg id="Battery1_SOC_Program_Capacity" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() || config.battery.hide_soc || !data.inverterProg.show ? 'none' : 'inline'};">  
                    ${createTextWithPopup(
                        'battery_soc_184',
                        compactMode ? 270 : 290,
                        358,
                        config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid(),
                        'st13 st8 left-align',
                        batteryColour,
                        `${data.stateBatterySoc.toNum(0)}% | ${data.inverterProg.capacity || 0}%`,
                        (e) => Utils.handlePopup(e, config.entities.battery_soc_184),
                        true
                    )}
                </svg>
                <svg id="Battery1_SOC_Shutdown" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 !== 'none' && data.stateBatterySoc.isValid() && !config.battery.hide_soc && !data.inverterProg.show && config.battery?.shutdown_soc && !config.battery?.shutdown_soc_offgrid ? 'inline' : 'none'};">  
                    ${createTextWithPopup(
                        'battery_soc_184',
                        compactMode ? 270 : 290,
                        358,
                        config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid(),
                        'st13 st8 left-align',
                        batteryColour,
                        `${data.stateBatterySoc.toNum(0)}% | ${batteryShutdown || 0}%`,
                        (e) => Utils.handlePopup(e, config.entities.battery_soc_184),
                        true
                    )}
                </svg>
            </svg>
            <svg id="two_batteries_battery1_runtime_lite" 
                style="overflow: visible; display: ${config.wide && batteryCount === 2 && !compactMode ? 'inline' : 'none'};" 
                x="-43.5%">
                ${renderText(
                    'duration',
                    413,
                    377.5,
                    true,
                    `${largeFont !== true ? 'st14' : 'st4'} right-align`,
                    data.batteryEnergy === 0 || isFloating || batteryPower === 0 ? 'transparent' : batteryColour,
                    data.batteryDuration
                )}
                ${renderText(
                    'duration_text',
                    413,
                    393.7,
                    true,
                    'st3 right-align',
                    data.batteryEnergy === 0 || (config.battery.invert_flow ? batteryPower >= 0 : batteryPower <= 0) || isFloating ? 'transparent' : batteryColour,
                    `${localize('common.runtime_to')} ${data.batteryCapacity}% @${data.formattedResultTime}`
                )}                         
                ${renderText(
                    'duration_text_charging',
                    413,
                    393.7,
                    true,
                    'st3 right-align',
                    data.batteryEnergy === 0 || (config.battery.invert_flow === true ? batteryPower <= 0 : batteryPower >= 0) || isFloating ? 'transparent' : batteryColour,
                    `${localize('common.to')} ${data.batteryCapacity}% ${localize('common.charge')} @${data.formattedResultTime}`
                )}
                ${renderText(
                    'floating',
                    413,
                    393.7,
                    true,
                    'st3 right-align',
                    data.batteryEnergy === 0 || !isFloating ? 'transparent' : batteryColour,
                    localize('common.battery_floating')
                )}
                ${renderText(
                    'battery_soc_184',
                    342,
                    351,
                    !data.inverterProg.show && config.battery?.shutdown_soc_offgrid,
                    `${config.battery.hide_soc || (compactMode && batteryCount === 2) ? 'st12' : 'st14 right-align'}`,
                    batteryColour,
                    `${batteryShutdown}%`
                )}
                ${renderText(
                    'battery_soc_184',
                    342,
                    364,
                    !data.inverterProg.show && config.battery?.shutdown_soc_offgrid,
                    `${config.battery.hide_soc || (compactMode && batteryCount === 2) ? 'st12' : 'st14 right-align'}`,
                    batteryColour,
                    `${data.shutdownOffGrid}%`
                )}
                <svg id="Battery1_SOC" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() || (compactMode && batteryCount === 2) ? 'none' : 'inline'};">  
                    ${createTextWithPopup(
                        'battery_soc_184',
                        413,
                        358,
                        config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() || (compactMode && batteryCount === 2),
                        'st13 st8 right-align',
                        batteryColour,
                        !data.inverterProg.show && config.battery.shutdown_soc_offgrid
                            ? (config.battery.hide_soc ? data.stateBatterySoc.toDisplay() : `| ${data.stateBatterySoc.toNum(0)}%`)
                            : (config.battery.hide_soc ? data.stateBatterySoc.toDisplay() : `${data.stateBatterySoc.toNum(0)}%`),
                        (e) => Utils.handlePopup(e, config.entities.battery_soc_184),
                        true
                    )}
                </svg>
                <svg id="Battery1_SOC_Program_Capacity" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() || config.battery.hide_soc || !data.inverterProg.show ? 'none' : 'inline'};">  
                    ${createTextWithPopup(
                        'battery_soc_184',
                        413,
                        358,
                        config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid(),
                        'st13 st8 right-align',
                        batteryColour,
                        `${data.inverterProg.capacity || 0}% | ${data.stateBatterySoc.toNum(0)}%`,
                        (e) => Utils.handlePopup(e, config.entities.battery_soc_184),
                        true
                    )}
                </svg>
                <svg id="Battery1_SOC_Shutdown" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 !== 'none' && data.stateBatterySoc.isValid() && !config.battery.hide_soc && !data.inverterProg.show && config.battery?.shutdown_soc && !config.battery?.shutdown_soc_offgrid ? 'inline' : 'none'};">  
                    ${createTextWithPopup(
                        'battery_soc_184',
                        413,
                        358,
                        config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid(),
                        'st13 st8 right-align',
                        batteryColour,
                        `${batteryShutdown || 0}% | ${data.stateBatterySoc.toNum(0)}%`,
                        (e) => Utils.handlePopup(e, config.entities.battery_soc_184),
                        true
                    )}
                </svg>
            </svg>
            <svg id="two_batteries_battery_2_runtime_lite" 
                style="overflow: visible; display: ${config.wide && batteryCount === 2 && !compactMode ? 'inline' : 'none'};"  
                x="12%">
                ${renderText(
                    'duration',
                    290,
                    377.5,
                    true,
                    `${largeFont !== true ? 'st14' : 'st4'} left-align`,
                    data.battery2Energy === 0 || isFloating2 || battery2Power === 0 ? 'transparent' : battery2Colour,
                    data.batteryDuration2
                )}
                ${renderText(
                    'duration_text',
                    290,
                    393.7,
                    true,
                    'st3 left-align',
                    data.battery2Energy === 0 || (config.battery2.invert_flow === true ? battery2Power >= 0 : battery2Power <= 0) || isFloating2 ? 'transparent' : battery2Colour,
                    `${localize('common.runtime_to')} ${data.battery2Capacity}% @${data.formattedResultTime2}`
                )}
                ${renderText(
                    'duration_text_charging',
                    290,
                    393.7,
                    true,
                    'st3 left-align',
                    data.battery2Energy === 0 || (config.battery2.invert_flow === true ? battery2Power <= 0 : battery2Power >= 0) || isFloating2 ? 'transparent' : battery2Colour,
                    `${localize('common.to')} ${data.battery2Capacity}% ${localize('common.charge')} @${data.formattedResultTime2}`
                )}
                ${renderText(
                    'floating',
                    290,
                    393.7,
                    true,
                    'st3 left-align',
                    data.battery2Energy === 0 || !isFloating2 ? 'transparent' : battery2Colour,
                    localize('common.battery_floating')
                )}
                ${renderText(
                    'battery_soc_184',
                    360,
                    351,
                    !data.inverterProg.show && config.battery2?.shutdown_soc_offgrid,
                    `${config.battery2.hide_soc ? 'st12' : 'st14 left-align'}`,
                    battery2Colour,
                    `${batteryShutdown2}%`
                )}
                ${renderText(
                    'battery_soc_184',
                    360,
                    364,
                    !data.inverterProg.show && config.battery2?.shutdown_soc_offgrid,
                    `${config.battery2.hide_soc ? 'st12' : 'st14 left-align'}`,
                    battery2Colour,
                    `${data.shutdownOffGrid2}%`
                )}
                <svg id="Battery2_SOC" 
                    style="overflow: visible; 
                        display: ${config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid() ? 'none' : 'inline'};">  
                    ${createTextWithPopup(
                        'battery_soc_184',
                        290,
                        358,
                        config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid(),
                        'st13 st8 left-align',
                        battery2Colour,
                        !data.inverterProg.show && config.battery2.shutdown_soc_offgrid
                            ? (config.battery2.hide_soc ? data.stateBattery2Soc.toDisplay() : `${data.stateBattery2Soc.toNum(0)}% |`)
                            : (config.battery2.hide_soc ? data.stateBattery2Soc.toDisplay() : `${data.stateBattery2Soc.toNum(0)}%`),
                        (e) => Utils.handlePopup(e, config.entities.battery2_soc_184),
                        true
                    )}
                </svg>
                <svg id="Battery2_SOC_Program_Capacity" 
                    style="overflow: visible; 
                        display: ${config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid() || config.battery2.hide_soc || !data.inverterProg.show ? 'none' : 'inline'};">  
                    ${createTextWithPopup(
                        'battery_soc_184',
                        290,
                        358,
                        config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid(),
                        'st13 st8 left-align',
                        battery2Colour,
                        `${data.stateBattery2Soc.toNum(0)}% | ${data.inverterProg.capacity || 0}%`,
                        (e) => Utils.handlePopup(e, config.entities.battery2_soc_184),
                        true
                    )}
                </svg>
                <svg id="Battery2_SOC_Shutdown" 
                    style="overflow: visible; 
                        display: ${config.entities.battery2_soc_184 !== 'none' && data.stateBattery2Soc.isValid() && !config.battery2.hide_soc && !data.inverterProg.show && config.battery2?.shutdown_soc && !config.battery2?.shutdown_soc_offgrid ? 'inline' : 'none'};">  
                    ${createTextWithPopup(
                        'battery_soc_184',
                        290,
                        358,
                        config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid(),
                        'st13 st8 left-align',
                        battery2Colour,
                        `${data.stateBattery2Soc.toNum(0)}% | ${batteryShutdown2 || 0}%`,
                        (e) => Utils.handlePopup(e, config.entities.battery2_soc_184),
                        true
                    )}
                </svg>
            </svg>
            <svg id="two_batteries_runtime_compact_bat1" 
                    style="overflow: visible; display: ${config.wide && batteryCount === 2 && compactMode ? 'inline' : 'none'};"
                    x="-29%">
                ${renderText(
                    'duration',
                    393,
                    377.5,
                    true,
                    `${largeFont !== true ? 'st14' : 'st4'} right-align`,
                    data.batteryEnergy === 0 || isFloating || batteryPower === 0 ? 'transparent' : batteryColour,
                    data.batteryDuration
                )}
                ${renderText(
                    'duration_text',
                    393,
                    393.7,
                    batteryCount === 1,
                    'st3 right-align',
                    data.batteryEnergy === 0 || (config.battery.invert_flow === true ? batteryPower >= 0 : batteryPower <= 0) || isFloating ? 'transparent' : batteryColour,
                    `${localize('common.runtime_to')} ${data.batteryCapacity}% @${data.formattedResultTime}`,
                    true
                )}
                ${renderText(
                    'duration_text_charging',
                    393,
                    393.7,
                    true,
                    'st3 right-align',
                    data.batteryEnergy === 0 || (config.battery.invert_flow === true ? batteryPower <= 0 : batteryPower >= 0) || isFloating ? 'transparent' : batteryColour,
                    `${localize('common.to')} ${data.batteryCapacity}% ${localize('common.charge')} @${data.formattedResultTime}`
                )}
                ${renderText(
                    'floating',
                    393,
                    393.7,
                    true,
                    'st3 right-align',
                    data.batteryEnergy === 0 || !isFloating ? 'transparent' : batteryColour,
                    localize('common.battery_floating')
                )}
                ${renderText(
                    'battery_soc_184',
                    320,
                    351,
                    !data.inverterProg.show && config.battery?.shutdown_soc_offgrid,
                    `${config.battery.hide_soc ? 'st12' : 'st14 right-align'}`,
                    batteryColour,
                    `${batteryShutdown}%`,
                )}
                ${renderText(
                    'battery_soc_184',
                    320,
                    364,
                    !data.inverterProg.show && config.battery?.shutdown_soc_offgrid,
                    `${config.battery.hide_soc ? 'st12' : 'st14 right-align'}`,
                    batteryColour,
                    `${data.shutdownOffGrid}%`
                )}
                <svg id="Battery1_SOC" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() ? 'none' : 'inline'};">  
                    ${createTextWithPopup(
                        'battery_soc_184',
                        393,
                        358,
                        config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid(),
                        'st13 st8 right-align',
                        batteryColour,
                        !data.inverterProg.show && config.battery.shutdown_soc_offgrid
                            ? (config.battery.hide_soc ? data.stateBatterySoc.toDisplay() : `| ${data.stateBatterySoc.toNum(0)}%`)
                            : (config.battery.hide_soc ? data.stateBatterySoc.toDisplay() : `${data.stateBatterySoc.toNum(0)}%`),
                        (e) => Utils.handlePopup(e, config.entities.battery_soc_184),
                        true
                    )}
                </svg>                            
                <svg id="Battery1_SOC_Program_Capacity" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid() || config.battery.hide_soc || !data.inverterProg.show ? 'none' : 'inline'};">  
                    ${createTextWithPopup(
                        'battery_soc_184',
                        393,
                        358,
                        config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid(),
                        'st13 st8 right-align',
                        batteryColour,
                        `${data.inverterProg.capacity || 0}% | ${data.stateBatterySoc.toNum(0)}%`,
                        (e) => Utils.handlePopup(e, config.entities.battery_soc_184),
                        true
                    )}
                </svg>
                <svg id="Battery1_SOC_Shutdown" 
                    style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 !== 'none' && data.stateBatterySoc.isValid() && !config.battery.hide_soc && !data.inverterProg.show && config.battery?.shutdown_soc && !config.battery?.shutdown_soc_offgrid ? 'inline' : 'none'};">  
                    ${createTextWithPopup(
                        'battery_soc_184',
                        393,
                        358,
                        config.entities.battery_soc_184 === 'none' || !data.stateBatterySoc.isValid(),
                        'st13 st8 right-align',
                        batteryColour,
                        `${batteryShutdown || 0}% | ${data.stateBatterySoc.toNum(0)}%`,
                        (e) => Utils.handlePopup(e, config.entities.battery2_soc_184),
                        true
                    )}
                </svg>
                ${renderText(
                    'battery_remaining_energy',
                    393,
                    338,
                    !config.battery.show_remaining_energy,
                    'remaining-energy right-align',
                    batteryColour,
                    !config.battery.remaining_energy_to_shutdown
                        ? `${Utils.toNum((data.batteryEnergy * (data.stateBatterySoc.toNum() / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
                        : `${Utils.toNum((data.batteryEnergy * ((data.stateBatterySoc?.toNum() - data.batteryOneShutdown) / 100) / 1000), 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`,
                    true
                )}
            </svg>
            <svg id="two_batteries_runtime_compact_bat2" 
                    style="overflow: visible; display: ${config.wide && batteryCount === 2 && compactMode ? 'inline' : 'none'};"
                    x="0.3%">
                ${renderText(
                    'duration',
                    290,
                    377.5,
                    true,
                    `${largeFont !== true ? 'st14' : 'st4'} left-align`,
                    data.battery2Energy === 0 || isFloating2 || battery2Power === 0 ? 'transparent' : battery2Colour,
                    data.batteryDuration2
                )}
                ${renderText(
                    'duration_text',
                    290,
                    393.7,
                    true,
                    'st3 left-align',
                    data.battery2Energy === 0 || (config.battery2.invert_flow === true ? battery2Power >= 0 : battery2Power <= 0) || isFloating2 ? 'transparent' : battery2Colour,
                    `${localize('common.runtime_to')} ${data.battery2Capacity}% @${data.formattedResultTime2}`
                )}
                ${renderText(
                    'duration_text_charging',
                    290,
                    393.7,
                    true,
                    'st3 left-align',
                    data.battery2Energy === 0 || (config.battery2.invert_flow === true ? battery2Power <= 0 : battery2Power >= 0) || isFloating2 ? 'transparent' : battery2Colour,
                    `${localize('common.to')} ${data.battery2Capacity}% ${localize('common.charge')} @${data.formattedResultTime2}`
                )}
                ${renderText(
                    'floating',
                    290,
                    393.7,
                    true,
                    'st3 left-align',
                    data.battery2Energy === 0 || !isFloating2 ? 'transparent' : battery2Colour,
                    localize('common.battery_floating')
                )}
                ${renderText(
                    'battery_soc_184',
                    360,
                    351,
                    !data.inverterProg.show && config.battery2?.shutdown_soc_offgrid,
                    `${config.battery2.hide_soc ? 'st12' : 'st14 left-align'}`,
                    battery2Colour,
                    `${batteryShutdown2}%`
                )}
                ${renderText(
                    'battery_soc_184',
                    360,
                    364,
                    !data.inverterProg.show && config.battery2?.shutdown_soc_offgrid,
                    `${config.battery2.hide_soc ? 'st12' : 'st14 left-align'}`,
                    battery2Colour,
                    `${data.shutdownOffGrid2}%`
                )}
                <svg id="Battery2_SOC" 
                    style="overflow: visible; 
                        display: ${config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid() ? 'none' : 'inline'};">  
                    ${createTextWithPopup(
                        'battery_soc_184',
                        290,
                        358,
                        config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid(),
                        'st13 st8 left-align',
                        battery2Colour,
                        !data.inverterProg.show && config.battery2.shutdown_soc_offgrid
                            ? (config.battery2.hide_soc ? data.stateBattery2Soc.toDisplay() : `${data.stateBattery2Soc.toNum(0)}% |`)
                            : (config.battery2.hide_soc ? data.stateBattery2Soc.toDisplay() : `${data.stateBattery2Soc.toNum(0)}%`),
                        (e) => Utils.handlePopup(e, config.entities.battery2_soc_184),
                        true
                    )}
                </svg>
                <svg id="Battery2_SOC_Program_Capacity" 
                    style="overflow: visible; 
                        display: ${config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid() || config.battery2.hide_soc || !data.inverterProg.show ? 'none' : 'inline'};">  
                    ${createTextWithPopup(
                        'battery_soc_184',
                        290,
                        358,
                        config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid(),
                        'st13 st8 left-align',
                        battery2Colour,
                        `${data.stateBattery2Soc.toNum(0)}% | ${data.inverterProg.capacity || 0}%`,
                        (e) => Utils.handlePopup(e, config.entities.battery2_soc_184),
                        true
                    )}
                </svg>
                <svg id="Battery2_SOC_Shutdown" 
                    style="overflow: visible; 
                        display: ${config.entities.battery2_soc_184 !== 'none' && data.stateBattery2Soc.isValid() && !config.battery2.hide_soc && !data.inverterProg.show && config.battery2?.shutdown_soc && !config.battery2?.shutdown_soc_offgrid ? 'inline' : 'none'};">  
                    ${createTextWithPopup(
                        'battery_soc_184',
                        290,
                        358,
                        config.entities.battery2_soc_184 === 'none' || !data.stateBattery2Soc.isValid(),
                        'st13 st8 left-align',
                        battery2Colour,
                        `${data.stateBattery2Soc.toNum(0)}% | ${batteryShutdown2 || 0}%`,
                        (e) => Utils.handlePopup(e, config.entities.battery2_soc_184),
                        true
                    )}
                </svg>
            </svg>
            <svg id="battery_flow" style="overflow: visible;">
                ${renderPath(
                    'bat-line',
                    batteryCount === 2
                        ? 'M 239 250 L 239 285'
                        : compactMode
                            ? 'M 239 250 L 239 290'
                            : 'M 239 250 L 239 324',
                    true,
                    config.battery.dynamic_colour ? data.flowBatColour : batteryColour,
                    data.batLineWidth
                )}
                <circle id="power-dot-discharge" cx="0" cy="0"
                        r="${Math.min(2 + data.batLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.batteryPowerTotal < 0 || data.batteryPowerTotal === 0 ? 'transparent' : batteryColour}">
                    <animateMotion dur="${data.durationCur['battery']}s" repeatCount="indefinite"
                                keyPoints=${config.battery.invert_flow === true ? Utils.invertKeyPoints("1;0") : "1;0"}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#bat-line"/>
                    </animateMotion>
                </circle>
                <circle id="power-dot-charge" cx="0" cy="0"
                        r="${Math.min(2 + data.batLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.batteryPowerTotal > 0 || data.batteryPowerTotal === 0 ? 'transparent' : `${config.battery.dynamic_colour ? data.flowBatColour : batteryColour}`}">
                    <animateMotion dur="${data.durationCur['battery']}s" repeatCount="indefinite"
                                keyPoints=${config.battery.invert_flow === true ? Utils.invertKeyPoints("0;1") : "0;1"} 
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#bat-line"/>
                    </animateMotion>
                </circle>
            </svg>
            <svg id="battery_icon" style="overflow: visible;" x="${batteryCount === 2 ? '-6.25%' : '0%'}">
                ${createTextWithPopup(
                    'battery_temp_182',
                    compactMode ? 205 : 250,
                    compactMode ? 332 : 324.5,
                    !data.stateBatteryTemp.isValid() || (compactMode && batteryCount === 2),
                    config.entities?.battery_temp_182 ? 'st3 left-align' : 'st12',
                    batteryColour,
                    `${data.stateBatteryTemp.toNum(1)}°`,
                    (e) => Utils.handlePopup(e, config.entities.battery_temp_182),
                    true
                )}    
                ${createTextWithPopup(
                    'battery_soh',
                    compactMode ? 205 : 250,
                    compactMode ? 332 : 324.5,
                    !data.stateBatterySOH.isValid() || config.entities?.battery_temp_182 || (compactMode && batteryCount === 2),
                    config.entities?.battery_soh ? 'st3 left-align' : 'st12',
                    batteryColour,
                    `${data.stateBatterySOH.toNum(0)}%`,
                    (e) => Utils.handlePopup(e, config.entities.battery_soh),
                    true
                )}
                <circle id="bat" cx="${compactMode ? '238.5' : '162'}"
                    cy="${compactMode
                            ? '326'
                            : !config.battery.show_remaining_energy
                                    ? '319'
                                    : '310'
                    }"
                    r="3.5"
                    display="${config.entities?.battery_status === 'none' || !config.entities?.battery_status || (compactMode && batteryCount === 2) ? 'none' : ''}"
                    fill="${data.batteryStateColour}"/>
                
                <a href="#" @click=${(e) => config.battery.navigate ? Utils.handleNavigation(e, config.battery.navigate) : null}>
                    <svg id="bat_outter" x="${compactMode && batteryCount === 1 ? '212.5' : '232.5'}"
                        y="325.5" width="78.75"
                        height="78.75" preserveAspectRatio="none"
                        viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="bLg-${data.timestamp_id}" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                    stop-color="${data.gridPercentageBat > 0 ? data.gridColour : data.pvPercentageBat > 0 ? data.solarColour : batteryColour}"/>
                                <stop offset="${data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat}%"
                                    stop-color="${data.gridPercentageBat > 0 ? data.gridColour : data.pvPercentageBat > 0 ? data.solarColour : batteryColour}"/>
                                <stop offset="${data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat}%"
                                    stop-color="${data.pvPercentageBat > 0 ? data.solarColour : batteryColour}"/>
                                <stop offset="${(data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat) + (data.pvPercentageBat < 2 ? 0 : data.pvPercentageBat)}%"
                                    stop-color="${data.pvPercentageBat > 0 ? data.solarColour : batteryColour}"/>
                                <stop offset="${(data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat) + (data.pvPercentageBat < 2 ? 0 : data.pvPercentageBat)}%"
                                    stop-color="${batteryColour}"/>
                                <stop offset="100%"
                                    stop-color="${batteryColour}"/>
                            </linearGradient>
                        </defs>
                        <path fill="${config.battery.dynamic_colour ? `url(#bLg-${data.timestamp_id})` : batteryColour}"
                            d="${config.battery.linear_gradient ? data.battery0 : data.batteryIcon}"/>
                    </svg>
                    <svg id="bat_inner" x="${compactMode && batteryCount === 1 ? '212.5' : '232.5'}"
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
                        <path fill="${config.battery.linear_gradient ? `url(#sLg-${data.timestamp_id})` : batteryColour}"
                            display="${!config.battery.linear_gradient ? 'none' : ''}"
                            d="${data.batteryCharge}"/>
                    </svg>
                </a>
            </svg>
            <svg id="battery2_icon" 
                style="overflow: visible; display: ${config.wide && batteryCount === 2 ? 'inline' : 'none'};" 
                x="0.75%">
                ${createTextWithPopup(
                    'battery2_temp_182',
                    250,
                    324.5,
                    !data.stateBattery2Temp.isValid() || (compactMode && batteryCount === 2),
                    config.entities?.battery2_temp_182 ? 'st3 left-align' : 'st12',
                    battery2Colour,
                    `${data.stateBattery2Temp.toNum(1)}°`,
                    (e) => Utils.handlePopup(e, config.entities.battery2_temp_182),
                    true
                )}
                ${createTextWithPopup(
                    'battery_soh',
                    250,
                    324.5,
                    !data.stateBattery2SOH.isValid() || config.entities?.battery2_temp_182 || (compactMode && batteryCount === 2),
                    config.entities?.battery2_soh ? 'st3 left-align' : 'st12',
                    battery2Colour,
                    `${data.stateBattery2SOH.toNum(0)}%`,
                    (e) => Utils.handlePopup(e, config.entities.battery2_soh),
                    true
                )}
                <circle id="bat" cx="295"
                    cy="${compactMode
                            ? '326'
                            : !config.battery2.show_remaining_energy
                                    ? '319'
                                    : '310'
                    }"
                    r="3.5"
                    display="${config.entities?.battery2_status === 'none' || !config.entities?.battery2_status || (compactMode && batteryCount === 2) ? 'none' : ''}"
                    fill="${data.battery2StateColour}"/>

                <a href="#" @click=${(e) => config.battery2.navigate ? Utils.handleNavigation(e, config.battery2.navigate) : null}>
                    <svg id="bat" x="232.5"
                        y="325.5" width="78.75"
                        height="78.75" preserveAspectRatio="none"
                        viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="b2Lg-${data.timestamp_id}" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                    stop-color="${data.gridPercentageBat > 0 ? data.gridColour : data.pvPercentageBat > 0 ? data.solarColour : battery2Colour}"/>
                                <stop offset="${data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat}%"
                                    stop-color="${data.gridPercentageBat > 0 ? data.gridColour : data.pvPercentageBat > 0 ? data.solarColour : battery2Colour}"/>
                                <stop offset="${data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat}%"
                                    stop-color="${data.pvPercentageBat > 0 ? data.solarColour : battery2Colour}"/>
                                <stop offset="${(data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat) + (data.pvPercentageBat < 2 ? 0 : data.pvPercentageBat)}%"
                                    stop-color="${data.pvPercentageBat > 0 ? data.solarColour : batteryColour}"/>
                                <stop offset="${(data.gridPercentageBat < 2 ? 0 : data.gridPercentageBat) + (data.pvPercentageBat < 2 ? 0 : data.pvPercentageBat)}%"
                                    stop-color="${battery2Colour}"/>
                                <stop offset="100%"
                                    stop-color="${battery2Colour}"/>
                            </linearGradient>
                        </defs>
                        <path fill="${config.battery2.dynamic_colour ? `url(#b2Lg-${data.timestamp_id})` : battery2Colour}"
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
                        <path fill="${config.battery2.linear_gradient ? `url(#s2Lg-${data.timestamp_id})` : battery2Colour}"
                            display="${!config.battery2.linear_gradient ? 'none' : ''}"
                            d="${data.battery2Charge}"/>
                    </svg>
                </a>
            </svg>
            <svg id="battery_daily" style="overflow: visible;">
                <svg id="battery_daily_charge" style="overflow: visible;" x="${batteryCount === 2 ? '42%' : '0%'}" y="${batteryCount === 2 ? '-20%' : '0%'}">
                    ${renderText(
                        'daily_bat_charge',
                        compactMode && batteryCount === 1 ? 132 : 77.2,
                        357.2,
                        data.batteryShowDaily !== true,
                        'st3 left-align',
                        batteryColour,
                        localize('common.daily_charge'),
                        true
                    )}    
                    ${createTextWithPopup(
                        'daily_bat_charge_value',
                        compactMode && batteryCount === 1 ? 132 : 77.2,
                        343,
                        data.batteryShowDaily !== true || !data.stateDayBatteryCharge.isValid(),
                        'st10 left-align',
                        batteryColour,
                        data.stateDayBatteryCharge?.toPowerString(true, data.decimalPlacesEnergy),
                        (e) => Utils.handlePopup(e, config.entities.day_battery_charge_70),
                        true
                    )}
                </svg>
                <svg id="battery_daily_discharge" style="overflow: visible;" x="${batteryCount === 2 ? '42%' : '0%'}" y="${batteryCount === 2 ? '-20%' : '0%'}">
                    ${renderText(
                        'daily_bat_dischcharge',
                        compactMode && batteryCount === 1 ? 132 : 77.2,
                        393.7,
                        data.batteryShowDaily !== true,
                        'st3 left-align',
                        batteryColour,
                        localize('common.daily_discharge'),
                        true
                    )}
                    ${createTextWithPopup(
                        'daily_bat_discharge_value',
                        compactMode && batteryCount === 1 ? 132 : 77.2,
                        380.1,
                        data.batteryShowDaily !== true || !data.stateDayBatteryDischarge.isValid(),
                        'st10 left-align',
                        batteryColour,
                        data.stateDayBatteryDischarge?.toPowerString(true, data.decimalPlacesEnergy),
                        (e) => Utils.handlePopup(e, config.entities.day_battery_discharge_71),
                        true
                    )}
                </svg> 
            </svg>
            </g>
        </svg>
    `;
}
