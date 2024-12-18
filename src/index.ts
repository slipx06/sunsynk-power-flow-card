import {CSSResultGroup, LitElement} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {HomeAssistant, LovelaceCardEditor} from 'custom-card-helpers';
import {styles} from './style';
import {CardStyle, DataDto, InverterModel, InverterSettings, sunsynkPowerFlowCardConfig,} from './types';
import defaultConfig from './defaults';
import {
    CARD_VERSION,
    EDITOR_NAME,
    MAIN_NAME,
    valid3phase,
    validaux,
    validauxLoads,
    validGridConnected,
    validGridDisconnected,
    validLoadValues,
    validnonLoadValues
} from './const';
import {localize} from './localize/localize';
import merge from 'lodash.merge';
import {Utils} from './helpers/utils';
import {fullCard} from './cards/full-card';
import {compactCard} from './cards/compact-card';
import {globalData} from './helpers/globals';
import {InverterFactory} from './inverters/inverter-factory';
import {BatteryIconManager} from './helpers/battery-icon-manager';
import {convertToCustomEntity, CustomEntity} from './inverters/dto/custom-entity';
import {icons} from './helpers/icons';

console.groupCollapsed(
    `%c ⚡ SUNSYNK-POWER-FLOW-CARD %c ${localize('common.version')}: ${CARD_VERSION} `,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: dimgray',
);
console.log('Readme:', 'https://github.com/slipx06/sunsynk-power-flow-card');
console.groupEnd();

@customElement(MAIN_NAME)
export class SunsynkPowerFlowCard extends LitElement {
    @property() public hass!: HomeAssistant;
    @property() private _config!: sunsynkPowerFlowCardConfig;
    @query('#grid-flow') gridFlow?: SVGSVGElement;
    @query('#grid1-flow') grid1Flow?: SVGSVGElement;
    @query('#solar-flow') solarFlow?: SVGSVGElement;
    @query('#pv1-flow') pv1Flow?: SVGSVGElement;
    @query('#pv2-flow') pv2Flow?: SVGSVGElement;
    @query('#pv3-flow') pv3Flow?: SVGSVGElement;
    @query('#pv4-flow') pv4Flow?: SVGSVGElement;
    @query('#battery-flow') batteryFlow?: SVGSVGElement;
    @query('#load-flow') loadFlow?: SVGSVGElement;
    @query('#aux-flow') auxFlow?: SVGSVGElement;
    @query('#ne-flow') neFlow?: SVGSVGElement;
    @query('#ne1-flow') ne1Flow?: SVGSVGElement;

    private durationPrev: { [name: string]: number } = {};
    private durationCur: { [name: string]: number } = {};

    static get styles(): CSSResultGroup {
        return styles;
    }

    public static async getConfigElement() {
        await import("./editor");
        return document.createElement(EDITOR_NAME) as LovelaceCardEditor;
    }

    static getStubConfig() {
        return {
            cardstyle: CardStyle.Lite,
            show_solar: true,
            battery: {
                energy: 0,
                shutdown_soc: 20,
                show_daily: true,
            },
            solar: {
                show_daily: true,
                mppts: 2,
            },
            load: {
                show_daily: true,
            },
            grid: {
                show_daily_buy: true,
                show_daily_sell: false,
                show_nonessential: true,
            },
            entities: {
                use_timer_248: 'switch.sunsynk_toggle_system_timer',
                priority_load_243: 'switch.sunsynk_toggle_priority_load',
                inverter_voltage_154: 'sensor.sunsynk_inverter_voltage',
                load_frequency_192: 'sensor.sunsynk_load_frequency',
                inverter_current_164: 'sensor.sunsynk_inverter_current',
                inverter_power_175: 'sensor.sunsynk_inverter_power',
                grid_connected_status_194: 'binary_sensor.sunsynk_grid_connected_status',
                inverter_status_59: 'sensor.sunsynk_overall_state',
                day_battery_charge_70: 'sensor.sunsynk_day_battery_charge',
                day_battery_discharge_71: 'sensor.sunsynk_day_battery_discharge',
                battery_voltage_183: 'sensor.sunsynk_battery_voltage',
                battery_soc_184: 'sensor.sunsynk_battery_soc',
                battery_power_190: 'sensor.sunsynk_battery_power',
                battery_current_191: 'sensor.sunsynk_battery_current',
                grid_power_169: 'sensor.sunsynk_grid_power',
                day_grid_import_76: 'sensor.sunsynk_day_grid_import',
                day_grid_export_77: 'sensor.sunsynk_day_grid_export',
                grid_ct_power_172: 'sensor.sunsynk_grid_ct_power',
                day_load_energy_84: 'sensor.sunsynk_day_load_energy',
                essential_power: 'none',
                nonessential_power: 'none',
                aux_power_166: 'sensor.sunsynk_aux_power',
                day_pv_energy_108: 'sensor.sunsynk_day_pv_energy',
                pv1_power_186: 'sensor.sunsynk_pv1_power',
                pv2_power_187: 'sensor.sunsynk_pv2_power',
                pv1_voltage_109: 'sensor.sunsynk_pv1_voltage',
                pv1_current_110: 'sensor.sunsynk_pv1_current',
                pv2_voltage_111: 'sensor.sunsynk_pv2_voltage',
                pv2_current_112: 'sensor.sunsynk_pv2_current',
            },
        } as unknown as sunsynkPowerFlowCardConfig;
    }

    render() {
        globalData.hass = this.hass;
        const config = this._config;
        //Energy
        const stateDayBatteryDischarge = this.getEntity('entities.day_battery_discharge_71');
        const stateDayBatteryCharge = this.getEntity('entities.day_battery_charge_70');
        const stateDayBattery2Discharge = this.getEntity('entities.day_battery2_discharge_71');
        const stateDayBattery2Charge = this.getEntity('entities.day_battery2_charge_70');
        const stateDayLoadEnergy = this.getEntity('entities.day_load_energy_84');
        const stateDayGridImport = this.getEntity('entities.day_grid_import_76');
        const stateDayPVEnergy = this.getEntity('entities.day_pv_energy_108');
        const stateDayGridExport = this.getEntity('entities.day_grid_export_77');
        const stateDayAuxEnergy = this.getEntity('entities.day_aux_energy');

        //Inverter
        const stateInverterVoltage = this.getEntity('entities.inverter_voltage_154');
        const stateLoadFrequency = this.getEntity('entities.load_frequency_192');
        const stateInverterCurrent = this.getEntity('entities.inverter_current_164');
        const stateInverterStatus = this.getEntity('entities.inverter_status_59', {state: ''});
        const stateInverterPower = this.getEntity('entities.inverter_power_175');
        const statePriorityLoad = this.getEntity('entities.priority_load_243', {state: config.entities.priority_load_243?.toString() ?? 'false'});
        const stateUseTimer = this.getEntity('entities.use_timer_248', {state: config.entities.use_timer_248?.toString() ?? 'false'});
        const stateDCTransformerTemp = this.getEntity('entities.dc_transformer_temp_90', {state: ''});
        const stateRadiatorTemp = this.getEntity('entities.radiator_temp_91', {state: ''});
        const stateInverterVoltageL2 = this.getEntity('entities.inverter_voltage_L2', {state: ''});
        const stateInverterVoltageL3 = this.getEntity('entities.inverter_voltage_L3', {state: ''});
        const stateInverterCurrentL2 = this.getEntity('entities.inverter_current_L2', {state: ''});
        const stateInverterCurrentL3 = this.getEntity('entities.inverter_current_L3', {state: ''});
        const stateEnvironmentTemp = this.getEntity('entities.environment_temp', {state: ''});

        //Battery 1
        const stateBatteryVoltage = this.getEntity('entities.battery_voltage_183');
        const stateBatterySoc = this.getEntity('entities.battery_soc_184');
        const stateBatteryPower = this.getEntity('entities.battery_power_190');
        const stateBatteryCurrent = this.getEntity('entities.battery_current_191');
        const stateBatteryTemp = this.getEntity('entities.battery_temp_182', {state: ''});
        const stateBatteryStatus = this.getEntity('entities.battery_status', {state: ''});
        const stateBatteryCurrentDirection = this.getEntity('entities.battery_current_direction', {state: ''});
        const stateBatteryRatedCapacity = this.getEntity('entities.battery_rated_capacity', {state: ''});
        const stateShutdownSOC = this.getEntity('battery.shutdown_soc', {state: config.battery.shutdown_soc?.toString() ?? ''});
        const stateShutdownSOCOffGrid = this.getEntity('battery.shutdown_soc_offgrid', {state: config.battery.shutdown_soc_offgrid?.toString() ?? ''});
        const stateBatterySOH = this.getEntity('entities.battery_soh', {state: ''});
        const stateSOCEndOfCharge = this.getEntity('battery.soc_end_of_charge', {state: config.battery.soc_end_of_charge?.toString() ?? ''});

        //Battery 2
        const stateBattery2Voltage = this.getEntity('entities.battery2_voltage_183');
        const stateBattery2Soc = this.getEntity('entities.battery2_soc_184');
        const stateBattery2Power = this.getEntity('entities.battery2_power_190');
        const stateBattery2Current = this.getEntity('entities.battery2_current_191');
        const stateBattery2Temp = this.getEntity('entities.battery2_temp_182', {state: ''});
        const stateBattery2Status = this.getEntity('entities.battery2_status', {state: ''});
        const stateBattery2CurrentDirection = this.getEntity('entities.battery2_current_direction', {state: ''});
        const stateBattery2RatedCapacity = this.getEntity('entities.battery2_rated_capacity', {state: ''});
        const stateShutdownSOC2 = this.getEntity('battery2.shutdown_soc', {state: config.battery2.shutdown_soc?.toString() ?? ''});
        const stateShutdownSOCOffGrid2 = this.getEntity('battery2.shutdown_soc_offgrid', {state: config.battery2.shutdown_soc_offgrid?.toString() ?? ''});
        const stateBattery2SOH = this.getEntity('entities.battery2_soh', {state: ''});
        const stateSOCEndOfCharge2 = this.getEntity('battery2.soc_end_of_charge', {state: config.battery2.soc_end_of_charge?.toString() ?? ''});

        //Load
        const stateEssentialPower = this.getEntity('entities.essential_power');
        const stateAuxPower = this.getEntity('entities.aux_power_166');
        const stateNonessentialPower = this.getEntity('entities.nonessential_power');
        const stateNonessentialLoad1 = this.getEntity('entities.non_essential_load1');
        const stateNonessentialLoad2 = this.getEntity('entities.non_essential_load2');
        const stateNonessentialLoad3 = this.getEntity('entities.non_essential_load3');
        const stateNonEssentialLoad1Extra = this.getEntity('entities.non_essential_load1_extra');
        const stateNonEssentialLoad2Extra = this.getEntity('entities.non_essential_load2_extra');
        const stateNonEssentialLoad3Extra = this.getEntity('entities.non_essential_load3_extra');
        const stateEssentialLoad1 = this.getEntity('entities.essential_load1');
        const stateEssentialLoad2 = this.getEntity('entities.essential_load2');
        const stateEssentialLoad3 = this.getEntity('entities.essential_load3');
        const stateEssentialLoad4 = this.getEntity('entities.essential_load4');
        const stateEssentialLoad5 = this.getEntity('entities.essential_load5');
        const stateEssentialLoad6 = this.getEntity('entities.essential_load6');
        const stateAuxConnectedStatus = this.getEntity('entities.aux_connected_status', {state: 'on'});
        const stateAuxLoad1 = this.getEntity('entities.aux_load1');
        const stateAuxLoad2 = this.getEntity('entities.aux_load2');
        const stateEssentialLoad1Extra = this.getEntity('entities.essential_load1_extra');
        const stateEssentialLoad2Extra = this.getEntity('entities.essential_load2_extra');
        const stateEssentialLoad3Extra = this.getEntity('entities.essential_load3_extra');
        const stateEssentialLoad4Extra = this.getEntity('entities.essential_load4_extra');
        const stateEssentialLoad5Extra = this.getEntity('entities.essential_load5_extra');
        const stateEssentialLoad6Extra = this.getEntity('entities.essential_load6_extra');
        const stateLoadPowerL1 = this.getEntity('entities.load_power_L1');
        const stateLoadPowerL2 = this.getEntity('entities.load_power_L2');
        const stateLoadPowerL3 = this.getEntity('entities.load_power_L3');
        const stateAuxLoad1Extra = this.getEntity('entities.aux_load1_extra');
        const stateAuxLoad2Extra = this.getEntity('entities.aux_load2_extra');

        //Grid
        const stateGridCTPower = this.getEntity('entities.grid_ct_power_172');
        const stateGridCTPowerL2 = this.getEntity('entities.grid_ct_power_L2');
        const stateGridCTPowerL3 = this.getEntity('entities.grid_ct_power_L3');
        const stateGridCTPowerTotal = this.getEntity('entities.grid_ct_power_total');
        const stateGridConnectedStatus = this.getEntity('entities.grid_connected_status_194', {state: 'on'});
        const stateGridPower = this.getEntity('entities.grid_power_169');
        const stateEnergyCostBuy = this.getEntity('entities.energy_cost_buy', {
            state: '',
            attributes: {unit_of_measurement: ''},
        });
        const stateEnergyCostSell = this.getEntity('entities.energy_cost_sell', {
            state: '',
            attributes: {unit_of_measurement: ''},
        });
        const stateGridVoltage = this.getEntity('entities.grid_voltage', null);
        const statePrepaidUnits = this.getEntity('entities.prepaid_units');
        const stateMaxSellPower = this.getEntity('entities.max_sell_power');

        //Solar
        const statePV1Voltage = this.getEntity('entities.pv1_voltage_109');
        const statePV1Current = this.getEntity('entities.pv1_current_110');
        const statePV2Voltage = this.getEntity('entities.pv2_voltage_111');
        const statePV2Current = this.getEntity('entities.pv2_current_112');
        const statePV3Voltage = this.getEntity('entities.pv3_voltage_113');
        const statePV3Current = this.getEntity('entities.pv3_current_114');
        const statePV4Voltage = this.getEntity('entities.pv4_voltage_115');
        const statePV4Current = this.getEntity('entities.pv4_current_116');
        const statePV1Power = this.getEntity('entities.pv1_power_186');
        const statePV2Power = this.getEntity('entities.pv2_power_187');
        const statePV3Power = this.getEntity('entities.pv3_power_188');
        const statePV4Power = this.getEntity('entities.pv4_power_189');
        const stateRemainingSolar = this.getEntity('entities.remaining_solar');
        const stateSolarSell = this.getEntity('entities.solar_sell_247', {state: 'undefined'});
        const statePVTotal = this.getEntity('entities.pv_total');
        const stateTotalPVGeneration = this.getEntity('entities.total_pv_generation');

        //Set defaults
        const {invert_aux} = config.load;
        const auxPower = stateAuxPower.toPower(invert_aux);

        const {invert_grid} = config.grid;
        const gridPower = stateGridCTPower.toPower(invert_grid);
        const gridPowerL2 = stateGridCTPowerL2.toPower(invert_grid);
        const gridPowerL3 = stateGridCTPowerL3.toPower(invert_grid);
        const gridPowerTotal = config.entities?.grid_ct_power_total
            ? stateGridCTPowerTotal.toPower(invert_grid)
            : gridPower + gridPowerL2 + gridPowerL3;

        const totalGridPower = config.inverter.three_phase ? gridPowerTotal : gridPower;

        const gridVoltage = !stateGridVoltage.isNaN() ? stateGridVoltage.toNum(0) : null;
        const batteryCurrentDirection = !stateBatteryCurrentDirection.isNaN() ? stateBatteryCurrentDirection.toNum(0) : null;
        const battery2CurrentDirection = !stateBattery2CurrentDirection.isNaN() ? stateBattery2CurrentDirection.toNum(0) : null;
        const genericInverterImage = config.inverter?.modern;

        const decimalPlaces = config.decimal_places;
        const decimalPlacesEnergy = config.decimal_places_energy;

        const loadColour = this.colourConvert(config.load?.colour);
        const auxDynamicColour = this.calculateAuxLoadColour(stateAuxPower.toPower(false), Utils.toNum(config.load?.off_threshold, 0)) || loadColour;
        const auxOffColour = this.colourConvert(config.load?.aux_off_colour || auxDynamicColour);
        const auxDynamicColourLoad1 = this.calculateAuxLoadColour(stateAuxLoad1.toPower(false), Utils.toNum(config.load?.off_threshold, 0)) || loadColour;
        const auxDynamicColourLoad2 = this.calculateAuxLoadColour(stateAuxLoad2.toPower(false), Utils.toNum(config.load?.off_threshold, 0)) || loadColour;
        const dynamicColourEssentialLoad1 = this.calculateEssentialLoadColour(stateEssentialLoad1.toPower(false), Utils.toNum(config.load?.off_threshold, 0)) || loadColour;
        const dynamicColourEssentialLoad2 = this.calculateEssentialLoadColour(stateEssentialLoad2.toPower(false), Utils.toNum(config.load?.off_threshold, 0)) || loadColour;
        const dynamicColourEssentialLoad3 = this.calculateEssentialLoadColour(stateEssentialLoad3.toPower(false), Utils.toNum(config.load?.off_threshold, 0)) || loadColour;
        const dynamicColourEssentialLoad4 = this.calculateEssentialLoadColour(stateEssentialLoad4.toPower(false), Utils.toNum(config.load?.off_threshold, 0)) || loadColour;
        const dynamicColourEssentialLoad5 = this.calculateEssentialLoadColour(stateEssentialLoad5.toPower(false), Utils.toNum(config.load?.off_threshold, 0)) || loadColour;
        const dynamicColourEssentialLoad6 = this.calculateEssentialLoadColour(stateEssentialLoad6.toPower(false), Utils.toNum(config.load?.off_threshold, 0)) || loadColour;

        config.title_colour = this.colourConvert(config.title_colour);

        const loadShowDaily = config.load?.show_daily;
        const showNonessential = config.grid?.show_nonessential;
        let gridStatus = config.entities?.grid_connected_status_194 ? stateGridConnectedStatus.state : 'on';
        if (!validGridConnected.includes(gridStatus.toLowerCase()) && !validGridDisconnected.includes(gridStatus.toLowerCase())) {
            gridStatus = 'on';
        }

        const auxStatus = config.entities?.aux_connected_status ? stateAuxConnectedStatus.state : 'on';
        const loadFrequency = config.entities?.load_frequency_192 ? stateLoadFrequency.toNum(2) : 0;
        const inverterVoltage = config.entities?.inverter_voltage_154
            ? config.inverter.three_phase && (this.isLiteCard || this.isCompactCard)
                ? stateInverterVoltage.toNum(0)
                : stateInverterVoltage.toNum(1)
            : 0;
        const inverterVoltageL2 = config.entities?.inverter_voltage_L2
            ? config.inverter.three_phase && (this.isLiteCard || this.isCompactCard)
                ? stateInverterVoltageL2.toNum(0)
                : stateInverterVoltageL2.toNum(1)
            : '';
        const inverterVoltageL3 = config.entities?.inverter_voltage_L3
            ? config.inverter.three_phase && (this.isLiteCard || this.isCompactCard)
                ? stateInverterVoltageL3.toNum(0)
                : stateInverterVoltageL3.toNum(1)
            : '';
        const inverterCurrent = config.entities?.inverter_current_164
            ? stateInverterCurrent.toNum(1)
            : 0;
        const inverterCurrentL2 = config.entities?.inverter_current_L2
            ? stateInverterCurrentL2.toNum(1)
            : '';
        const inverterCurrentL3 = config.entities?.inverter_current_L3
            ? stateInverterCurrentL3.toNum(1)
            : '';
        const batteryVoltage = config.entities?.battery_voltage_183 ? stateBatteryVoltage.toNum(1) : 0;
        const battery2Voltage = config.entities?.battery2_voltage_183 ? stateBattery2Voltage.toNum(1) : 0;
               
        const autoScaledInverterPower = config.entities?.inverter_power_175
            ? stateInverterPower.toPower()
            : 0;
        const autoScaledGridPower = config.entities?.grid_power_169
            ? stateGridPower.toPower()
            : 0;

        const {invert_load} = config.load;
        const loadPowerL1 = config.entities?.load_power_L1
            ? stateLoadPowerL1.toPower(invert_load)
            : '';
        const loadPowerL2 = config.entities?.load_power_L2
            ? stateLoadPowerL2.toPower(invert_load)
            : '';
        const loadPowerL3 = config.entities?.load_power_L3
            ? stateLoadPowerL3.toPower(invert_load)
            : '';

        const gridImportColour = this.colourConvert(config.grid?.colour);
        const gridExportColour = this.colourConvert(config.grid?.export_colour || gridImportColour);
        const noGridColour = this.colourConvert(config.grid?.no_grid_colour || gridImportColour);

        let gridColour: string;
        switch (true) {
            case totalGridPower < -Utils.toNum(config.grid?.off_threshold, 0): 
                gridColour = gridExportColour;
                break;
            case totalGridPower >= -Utils.toNum(config.grid?.off_threshold, 0) && totalGridPower <= Utils.toNum(config.grid?.off_threshold, 0):
                gridColour = noGridColour;
                break;
            default: // Import
                gridColour = gridImportColour;
                break;
        }

        const dynamicColourNonEssentialLoad1 = Math.abs(stateNonessentialLoad1.toPower(false)) > Utils.toNum(config.grid?.off_threshold, 0)
            ? gridColour
            : 'grey';
        const dynamicColourNonEssentialLoad2 = Math.abs(stateNonessentialLoad2.toPower(false)) > Utils.toNum(config.grid?.off_threshold, 0)
            ? gridColour
            : 'grey';
        const dynamicColourNonEssentialLoad3 = Math.abs(stateNonessentialLoad3.toPower(false)) > Utils.toNum(config.grid?.off_threshold, 0)
            ? gridColour
            : 'grey';

        const gridOffColour = this.colourConvert(config.grid?.grid_off_colour || gridColour);

        let nonessentialLoads = config.grid?.additional_loads;
        if (!validnonLoadValues.includes(nonessentialLoads)) {
            nonessentialLoads = 0;
        }

        let pvEfficiencyMode = config.solar?.efficiency;
        if (!validnonLoadValues.includes(pvEfficiencyMode)) {
            pvEfficiencyMode = 0;
        }

        const gridShowDailyBuy = config.grid?.show_daily_buy;
        const gridShowDailySell = config.grid?.show_daily_sell;

        const batteryColourConfig = this.colourConvert(config.battery?.colour);
        const batteryChargeColour = this.colourConvert(config.battery?.charge_colour || batteryColourConfig);
        const battery2ColourConfig = this.colourConvert(config.battery2?.colour);
        const battery2ChargeColour = this.colourConvert(config.battery2?.charge_colour || battery2ColourConfig);
        const batteryShowDaily = config.battery?.show_daily;

        const solarShowDaily = config.solar?.show_daily;
        let showAux = config.load?.show_aux;
        if (!validaux.includes(showAux)) {
            showAux = false;
        }

        const showDailyAux = config.load?.show_daily_aux;

        let additionalLoad = config.load?.additional_loads;
        const invalidLoad =
            !validLoadValues.includes(additionalLoad) ||
            (this.isFullCard && [3, 4, 5, 6].includes(additionalLoad) && showAux) ||
            (this.isFullCard && additionalLoad === 3) ||
            (!config.wide && additionalLoad >= 5); // New condition

        if (invalidLoad) {
        additionalLoad = 0;
        }

        let additionalAuxLoad = config.load?.aux_loads;
        if (!validauxLoads.includes(additionalAuxLoad)) {
            additionalAuxLoad = 0;
        }

        const auxType = config.load?.aux_type; //valid options are gen,inverter, default, gen, boiler, pump, aircon

        //Icons
        const iconEssentialLoad1 = this.getEntity('load.load1_icon', {state: config.load?.load1_icon?.toString() ?? ''}).state;
        const iconEssentialLoad2 = this.getEntity('load.load2_icon', {state: config.load?.load2_icon?.toString() ?? ''}).state;
        const iconEssentialLoad3 = this.getEntity('load.load3_icon', {state: config.load?.load3_icon?.toString() ?? ''}).state;
        const iconEssentialLoad4 = this.getEntity('load.load4_icon', {state: config.load?.load4_icon?.toString() ?? ''}).state;
        const iconEssentialLoad5 = this.getEntity('load.load5_icon', {state: config.load?.load5_icon?.toString() ?? ''}).state;
        const iconEssentialLoad6 = this.getEntity('load.load6_icon', {state: config.load?.load6_icon?.toString() ?? ''}).state;
        const iconAuxLoad1 = this.getEntity('load.aux_load1_icon', {state: config.load?.aux_load1_icon?.toString() ?? ''}).state;
        const iconAuxLoad2 = this.getEntity('load.aux_load2_icon', {state: config.load?.aux_load2_icon?.toString() ?? ''}).state;
        const nonessentialIcon = this.getEntity('grid.nonessential_icon', {state: config.grid?.nonessential_icon?.toString() ?? ''}).state;
        const iconNonessentialLoad1 = this.getEntity('grid.load1_icon', {state: config.grid?.load1_icon?.toString() ?? ''}).state;
        const iconNonessentialLoad2 = this.getEntity('grid.load2_icon', {state: config.grid?.load2_icon?.toString() ?? ''}).state;
        const iconNonessentialLoad3 = this.getEntity('grid.load3_icon', {state: config.grid?.load3_icon?.toString() ?? ''}).state;
        const iconGridImport = this.getEntity('grid.import_icon', {state: config.grid?.import_icon?.toString() ?? ''}).state;
        const iconGridDisconnected = this.getEntity('grid.disconnected_icon', {state: config.grid?.disconnected_icon?.toString() ?? ''}).state;
        const iconGridExport = this.getEntity('grid.export_icon', {state: config.grid?.export_icon?.toString() ?? ''}).state;

        const remainingSolar = config.entities.remaining_solar ? Utils.convertValueNew(stateRemainingSolar.state, stateRemainingSolar.attributes?.unit_of_measurement, decimalPlaces) : false;
        const totalSolarGeneration = config.entities.total_pv_generation ? Utils.convertValueNew(stateTotalPVGeneration.state, stateTotalPVGeneration.attributes?.unit_of_measurement, 2) : false;
        const largeFont = config.large_font;
        const inverterColour = this.colourConvert(config.inverter?.colour);
        const enableAutarky = config.inverter?.autarky;
        const enableTimer = !config.entities.use_timer_248 ? false : stateUseTimer.state;
        const priorityLoad = !config.entities.priority_load_243 ? false : statePriorityLoad.state;
        let batteryPower = stateBatteryPower.toPower(config.battery?.invert_power);
        let battery2Power = stateBattery2Power.toPower(config.battery2?.invert_power);
        
        const cardHeight = this.getEntity('card_height', {state: config.card_height?.toString() ?? ''}).state;
        const cardWidth = this.getEntity('card_width', {state: config.card_width?.toString() ?? ''}).state;

        const energy_cost_decimals = config.grid?.energy_cost_decimals === 0 ? 0 : config.grid?.energy_cost_decimals || 2;
        const energyCost =
            totalGridPower >= 0
                ? stateEnergyCostBuy.toNum(energy_cost_decimals)
                : stateEnergyCostSell.toNum(energy_cost_decimals);

        let inverterModel = InverterModel.Sunsynk;

        // Check if the userInputModel is a valid inverter model
        if (Object.values(InverterModel).includes(config.inverter.model)) {
            inverterModel = config.inverter.model as InverterModel;
        }

        let inverterImg = '';
        const inverterSettings = InverterFactory.getInstance(inverterModel);
        if (!genericInverterImage) {
            inverterImg = inverterSettings.image;
        }


        let compactMode = false;
        if (this.isCompactCard) {
            compactMode = true;
        }
        //totalsolar = pv1_power_186 + pv2_power_187 + pv3_power_188 + pv4_power_189

        const pv1PowerWatts = statePV1Power.toPower();
        const pv2PowerWatts = statePV2Power.toPower();
        const pv3PowerWatts = statePV3Power.toPower();
        const pv4PowerWatts = statePV4Power.toPower();

        const totalsolar = pv1PowerWatts + pv2PowerWatts + pv3PowerWatts + pv4PowerWatts;
        const totalPV = config.entities?.pv_total ? statePVTotal.toNum() : totalsolar;

        const solarColour =
            !config.solar.dynamic_colour
                ? this.colourConvert(config.solar?.colour)
                : Utils.toNum(totalPV, 0) > Utils.toNum(config.solar?.off_threshold, 0)
                    ? this.colourConvert(config.solar?.colour)
                    : 'grey';

        //essentialPower = inverter_power_175 + grid_power_169 - aux_power_166
        //nonessentialPower = grid_ct_power_172 - grid_power_169

        let threePhase = config.inverter?.three_phase;
        if (!valid3phase.includes(threePhase)) {
            threePhase = false;
        }

        let essentialPower: number;
        let nonessentialPower: number;
        const {essential_power, nonessential_power} = config.entities;

        if (threePhase === false) {
            nonessentialPower =
                nonessential_power === 'none' || !nonessential_power
                    ? gridPower - autoScaledGridPower
                    : stateNonessentialPower.toPower();
        } else {
            nonessentialPower =
                nonessential_power === 'none' || !nonessential_power
                    ? gridPower
                    + gridPowerL2
                    + gridPowerL3
                    - autoScaledGridPower
                    : stateNonessentialPower.toPower();
        }

        // eslint-disable-next-line prefer-const
        essentialPower =
            essential_power === 'none' || !essential_power
                ? threePhase === true && config.entities.load_power_L1 && config.entities.load_power_L2
                    ? Number(loadPowerL1) + Number(loadPowerL2) + Number(loadPowerL3)
                    : autoScaledInverterPower + autoScaledGridPower - auxPower
                : stateEssentialPower.toPower(invert_load);

        //Timer entities
        const prog1 = {
            time: this.getEntity('entities.prog1_time', {state: config.entities.prog1_time ?? ''}),
            capacity: this.getEntity('entities.prog1_capacity', {state: config.entities.prog1_capacity ?? ''}),
            charge: this.getEntity('entities.prog1_charge', {state: config.entities.prog1_charge ?? ''}),
        };
        const prog2 = {
            time: this.getEntity('entities.prog2_time', {state: config.entities.prog2_time ?? ''}),
            capacity: this.getEntity('entities.prog2_capacity', {state: config.entities.prog2_capacity ?? ''}),
            charge: this.getEntity('entities.prog2_charge', {state: config.entities.prog2_charge ?? ''}),
        };
        const prog3 = {
            time: this.getEntity('entities.prog3_time', {state: config.entities.prog3_time ?? ''}),
            capacity: this.getEntity('entities.prog3_capacity', {state: config.entities.prog3_capacity ?? ''}),
            charge: this.getEntity('entities.prog3_charge', {state: config.entities.prog3_charge ?? ''}),
        };
        const prog4 = {
            time: this.getEntity('entities.prog4_time', {state: config.entities.prog4_time ?? ''}),
            capacity: this.getEntity('entities.prog4_capacity', {state: config.entities.prog4_capacity ?? ''}),
            charge: this.getEntity('entities.prog4_charge', {state: config.entities.prog4_charge ?? ''}),
        };
        const prog5 = {
            time: this.getEntity('entities.prog5_time', {state: config.entities.prog5_time ?? ''}),
            capacity: this.getEntity('entities.prog5_capacity', {state: config.entities.prog5_capacity ?? ''}),
            charge: this.getEntity('entities.prog5_charge', {state: config.entities.prog5_charge ?? ''}),
        };
        const prog6 = {
            time: this.getEntity('entities.prog6_time', {state: config.entities.prog6_time ?? ''}),
            capacity: this.getEntity('entities.prog6_capacity', {state: config.entities.prog6_capacity ?? ''}),
            charge: this.getEntity('entities.prog6_charge', {state: config.entities.prog6_charge ?? ''}),
        };

        let batteryCount = config.battery?.count;
        if ((!config.wide) || (batteryCount !== 1 && batteryCount !== 2)) {
            batteryCount = 1;
        }

        const shutdownOffGrid = stateShutdownSOCOffGrid.toNum();
        const batteryShutdown = stateShutdownSOC.toNum();
        const shutdownOffGrid2 = stateShutdownSOCOffGrid2.toNum() || shutdownOffGrid;
        const batteryShutdown2 = stateShutdownSOC2.toNum() || batteryShutdown;
        
        const inverterProg: InverterSettings = {
            capacity: batteryShutdown,
            entityID: '',
        };

        switch (true) {
            case stateUseTimer.state === 'off':
            case !enableTimer:
            case !config.entities.prog1_time:
            case !config.entities.prog2_time:
            case !config.entities.prog3_time:
            case !config.entities.prog4_time:
            case !config.entities.prog5_time:
            case !config.entities.prog6_time:
                inverterProg.show = false;
                break;
        
            default: {
                inverterProg.show = true;
        
                const timer_now = new Date(); // Create a new Date object representing the current time
                //console.log(`Current date and time: ${timer_now.toLocaleString()}`);
        
                assignInverterProgramBasedOnTime(timer_now);
        
                function assignInverterProgramBasedOnTime(timer_now: Date) {
                    const progTimes: { start: Date; end: Date }[] = [];
        
                    // Populate the progTimes array with Date objects based on the current time
                    [prog1, prog2, prog3, prog4, prog5, prog6].forEach((prog, index) => {
                        if (!prog || !prog.time || !prog.time.state) {
                            console.error(`Program ${index + 1} is not defined or has no valid time.`);
                            return; // Skip this program
                        }
                        
                        const [hours, minutes] = prog.time.state.split(':').map(item => parseInt(item, 10));
                        const progStartTime = new Date(timer_now.getTime());
                        progStartTime.setHours(hours);
                        progStartTime.setMinutes(minutes);
        
                        // Determine the end time for each program (next program's start time)
                        const nextIndex = (index + 1) % [prog1, prog2, prog3, prog4, prog5, prog6].length;
                        const nextProg = [prog1, prog2, prog3, prog4, prog5, prog6][nextIndex];
                        const progEndTime = nextProg && nextProg.time && nextProg.time.state ? 
                                            new Date(timer_now.getTime()) : 
                                            new Date(timer_now.getTime());
                        
                        if (nextProg && nextProg.time && nextProg.time.state) {
                            const [nextHours, nextMinutes] = nextProg.time.state.split(':').map(item => parseInt(item, 10));
                            progEndTime.setHours(nextHours);
                            progEndTime.setMinutes(nextMinutes);
                        } else {
                            console.warn(`Next program ${nextIndex + 1} is not defined or has no valid time.`);
                        }
        
                        //console.log(`Program ${index + 1} time (before adjustment): Start: ${progStartTime.toLocaleString()}, End: ${progEndTime.toLocaleString()}`);
                        
                        // Add to the progTimes array
                        progTimes[index] = { start: progStartTime, end: progEndTime };
                    });
        
                    // Adjust times for the next day if necessary
                    adjustProgramTimes(progTimes, timer_now);
        
                    // Time comparison logic to determine the active program
                    for (let i = 0; i < progTimes.length; i++) {
                        const { start: currentProgStartTime, end: currentProgEndTime } = progTimes[i];
        
                        // Check for normal case (start < end)
                        if (currentProgStartTime <= timer_now && timer_now < currentProgEndTime) {
                            //console.log(`Assigning Program ${i + 1}`);
                            assignInverterProgValues([prog1, prog2, prog3, prog4, prog5, prog6][i], config.entities[`prog${i + 1}_charge`]);
                            break; // Exit once the correct program is assigned
                        }
                        // Check for wrap-around case (start > end)
                        else if (currentProgStartTime > currentProgEndTime) {
                            if (timer_now >= currentProgStartTime || timer_now < currentProgEndTime) {
                                //console.log(`Assigning Program ${i + 1} (wrap-around)`);
                                assignInverterProgValues([prog1, prog2, prog3, prog4, prog5, prog6][i], config.entities[`prog${i + 1}_charge`]);
                                break; // Exit once the correct program is assigned
                            }
                        }
                    }
                }
        
                function adjustProgramTimes(progTimes: { start: Date; end: Date }[], timer_now: Date) {
                    const currentTime = timer_now.getTime();
                    // Adjust for times that roll over into the next day
                    progTimes.forEach((progTime) => {
                        // If the start time is before current time and the end time is after the current time, adjust to the next day
                        if (progTime.start.getTime() < currentTime && progTime.end.getTime() < currentTime) {
                            progTime.start.setDate(progTime.start.getDate() + 1);
                            progTime.end.setDate(progTime.end.getDate() + 1);
                            //console.log(`Adjusted Program ${index + 1} to next day: Start: ${progTime.start.toLocaleString()}, End: ${progTime.end.toLocaleString()}`);
                        }
                    });
                    return progTimes;
                }
        
                function assignInverterProgValues(prog, entityID) {
                    if (prog.charge.state === 'No Grid or Gen' || prog.charge.state === '0' || prog.charge.state === 'off') {
                        inverterProg.charge = 'none';
                    } else {
                        inverterProg.charge = 'both';
                    }
        
                    inverterProg.capacity = parseInt(prog.capacity.state);
                    inverterProg.entityID = entityID;
                }
        
                break;
            }
        }
        
        if (gridVoltage != null && !Number.isNaN(gridVoltage) && inverterModel == InverterModel.Solis) {
            // the grid voltage can sometimes read decimals like 0.1, in cases where there is power trickled back.
            gridStatus = gridVoltage > 50 ? 'on' : 'off';
        }

        if (batteryCurrentDirection != null) {
            if (inverterModel == InverterModel.Solis && batteryCurrentDirection === 0) {
                batteryPower = -batteryPower;
            }
        }

        if (battery2CurrentDirection != null) {
            if (inverterModel == InverterModel.Solis && battery2CurrentDirection === 0) {
                battery2Power = -battery2Power;
            }
        }

        let maximumSOC = stateSOCEndOfCharge.toNum();
        maximumSOC = Math.max(50, Math.min(maximumSOC, 100));

        let maximumSOC2 = stateSOCEndOfCharge2.toNum() || maximumSOC;
        maximumSOC2 = Math.max(50, Math.min(maximumSOC2, 100));

        const batteryPowerTotal = batteryCount === 2 
                ? batteryPower + battery2Power 
                : batteryPower;

        //calculate battery capacity
        let batteryCapacity: number = 0;
        if (config.show_battery) {
            switch (true) {
                case !inverterProg.show:
                    if (config.battery.invert_flow === true ? batteryPower < 0 : batteryPower > 0 ) {
                        if (
                            (gridStatus === 'on' || gridStatus === '1' || gridStatus.toLowerCase() === 'on-grid') &&
                            !inverterProg.show
                        ) {
                            batteryCapacity = batteryShutdown;
                        } else if (
                            (gridStatus === 'off' || gridStatus === '0' || gridStatus.toLowerCase() === 'off-grid') &&
                            stateShutdownSOCOffGrid.notEmpty() &&
                            !inverterProg.show
                        ) {
                            batteryCapacity = shutdownOffGrid;
                        } else {
                            batteryCapacity = batteryShutdown;
                        }
                    } else if (config.battery.invert_flow === true ? batteryPower > 0 : batteryPower < 0) {
                        batteryCapacity = maximumSOC;
                    }
                    break;

                default:
                    batteryCapacity = inverterSettings.getBatteryCapacity(batteryPower, gridStatus, batteryShutdown, inverterProg, stateBatterySoc, maximumSOC, config.battery.invert_flow);
            }
        }

        //calculate battery2 capacity
        let battery2Capacity: number = 0;
        if (config.show_battery) {
            switch (true) {
                case !inverterProg.show:
                    if (config.battery2.invert_flow === true ? battery2Power < 0 : battery2Power > 0 ) {
                        if (
                            (gridStatus === 'on' || gridStatus === '1' || gridStatus.toLowerCase() === 'on-grid') &&
                            !inverterProg.show
                        ) {
                            battery2Capacity = batteryShutdown2;
                        } else if (
                            (gridStatus === 'off' || gridStatus === '0' || gridStatus.toLowerCase() === 'off-grid') &&
                            stateShutdownSOCOffGrid2.notEmpty() &&
                            !inverterProg.show
                        ) {
                            battery2Capacity = shutdownOffGrid2;
                        } else {
                            battery2Capacity = batteryShutdown2;
                        }
                    } else if (config.battery2.invert_flow === true ? battery2Power > 0 : battery2Power < 0) {
                        battery2Capacity = maximumSOC2;
                    }
                    break;

                default:
                    battery2Capacity = inverterSettings.getBatteryCapacity(battery2Power, gridStatus, batteryShutdown2, inverterProg, stateBattery2Soc, maximumSOC2, config.battery2.invert_flow);
            }
        }

        

        //calculate remaining battery time to charge or discharge

        let formattedResultTime = '';
        let formattedResultTime2 = '';
        let batteryDuration = '';
        let batteryDuration2 = '';

        const battenergy = this.getEntity('battery.energy', {state: config.battery.energy?.toString() ?? ''});
        const batt2energy = this.getEntity('battery2.energy', {state: config.battery2.energy?.toString() ?? ''});
        let batteryEnergy = battenergy.toPower(false);
        let battery2Energy = batt2energy.toPower(false);
        

        if (batteryVoltage && stateBatteryRatedCapacity.notEmpty()) {
            batteryEnergy = Utils.toNum(batteryVoltage * stateBatteryRatedCapacity.toNum(0), 0)
        }
        if (battery2Voltage && stateBattery2RatedCapacity.notEmpty()) {
            battery2Energy = Utils.toNum(battery2Voltage * stateBattery2RatedCapacity.toNum(0), 0)
        }

        const batteryTotalEnergy = batteryEnergy + battery2Energy;
   
        if (config.show_battery || batteryEnergy !== 0 || battery2Energy !== 0) {
            const calculateTotalSeconds = (soc, shutdown, capacity, energy, power, invertFlow) => {
                if (power === 0) {
                    return ((soc.toNum(0) - shutdown) / 100) * energy * 60 * 60;
                } else if (invertFlow ? power < 0 : power > 0) {
                    return ((((soc.toNum(0) - capacity) / 100) * energy) / Math.abs(power)) * 60 * 60;
                } else if (invertFlow ? power > 0 : power < 0) {
                    return ((((capacity - soc.toNum(0)) / 100) * energy) / Math.abs(power)) * 60 * 60;
                }
                return 0; // Default case
            };
        
            let totalSeconds = 0;
            if (batteryEnergy !== 0) {
                totalSeconds = calculateTotalSeconds(
                    stateBatterySoc,
                    batteryShutdown,
                    batteryCapacity,
                    batteryEnergy,
                    batteryPower,
                    config.battery.invert_flow
                );

                const currentTime = new Date();
                const resultTime = new Date(currentTime.getTime() + totalSeconds * 1000);
                const resultHours = resultTime.getHours(); // Get the hours component of the resulting time
                const resultMinutes = resultTime.getMinutes(); // Get the minutes component of the resulting time
                const formattedMinutes = resultMinutes.toString().padStart(2, '0');
                const formattedHours = resultHours.toString().padStart(2, '0');
                formattedResultTime = `${formattedHours}:${formattedMinutes}`;
            
                // Calculate duration in days, hours, and minutes
                const days = Math.floor(totalSeconds / (60 * 60 * 24));
                const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
                const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
                
                if (days > 0) {
                    batteryDuration += `${days} ${localize('common.days')}, `;
                }
                if (hours > 0 || days > 0) {
                    batteryDuration += `${hours} ${localize('common.hrs')}, `;
                }
                batteryDuration += `${minutes} ${localize('common.min')}`;

            }
        
            let totalSeconds2 = 0;
            if (battery2Energy !== 0) {
                totalSeconds2 = calculateTotalSeconds(
                    stateBattery2Soc,
                    batteryShutdown2,
                    battery2Capacity,
                    battery2Energy,
                    battery2Power,
                    config.battery2.invert_flow 
                );

                const currentTime2 = new Date();
                const resultTime2 = new Date(currentTime2.getTime() + totalSeconds2 * 1000);
                const resultHours2 = resultTime2.getHours(); // Get the hours component of the resulting time
                const resultMinutes2 = resultTime2.getMinutes(); // Get the minutes component of the resulting time
                const formattedMinutes2 = resultMinutes2.toString().padStart(2, '0');
                const formattedHours2 = resultHours2.toString().padStart(2, '0');
                formattedResultTime2 = `${formattedHours2}:${formattedMinutes2}`;
            
                // Calculate duration in days, hours, and minutes
                const days2 = Math.floor(totalSeconds2 / (60 * 60 * 24));
                const hours2 = Math.floor((totalSeconds2 % (60 * 60 * 24)) / (60 * 60));
                const minutes2 = Math.floor((totalSeconds2 % (60 * 60)) / 60);
                
                if (days2 > 0) {
                    batteryDuration2 += `${days2} ${localize('common.days')}, `;
                }
                if (hours2 > 0 || days2 > 0) {
                    batteryDuration2 += `${hours2} ${localize('common.hrs')}, `;
                }
                batteryDuration2 += `${minutes2} ${localize('common.min')}`;
            }
        
        }

        const isFloating =
            -2 <= stateBatteryCurrent.toNum(0) && stateBatteryCurrent.toNum(0) <= 2 && stateBatterySoc.toNum(0) >= 99;

        const isFloating2 =
            -2 <= stateBattery2Current.toNum(0) && stateBattery2Current.toNum(0) <= 2 && stateBattery2Soc.toNum(0) >= 99;

        const isFloatingCombined = batteryCount === 2 ? (isFloating && isFloating2) : isFloating;

        // Determine battery colours
        let batteryColour: string;
        if (config.battery.invert_flow === true ? batteryPower > 0 && !isFloating : batteryPower < 0 && !isFloating ) {
            batteryColour = batteryChargeColour;
        } else {
            batteryColour = batteryColourConfig;
        }

        let battery2Colour: string;
        if (config.battery2.invert_flow === true ? battery2Power > 0 && !isFloating2 : battery2Power < 0 && !isFloating2) {
            battery2Colour = battery2ChargeColour;
        } else {
            battery2Colour = battery2ColourConfig;
        }

        //Set Inverter Status Message and dot
        let inverterStateColour = '';
        let inverterStateMsg = '';
        let inverterState = stateInverterStatus.state as string;

        let found = false;

        /**
         * Status can be returned as decimals "3.0", so this is just to change it to an int
         */
        if (inverterModel == InverterModel.Solis) {
            inverterState = !stateInverterStatus.isNaN() ? stateInverterStatus.toNum(0).toString() : stateInverterStatus.toString();
        }

        const typeStatusGroups = inverterSettings.statusGroups;
        if (typeStatusGroups)
            for (const groupKey of Object.keys(typeStatusGroups)) {
                const info = typeStatusGroups[groupKey];
                const {states, color, message} = info;
                if (states.includes(inverterState.toLowerCase())) {
                    inverterStateColour = color;
                    inverterStateMsg = message;
                    found = true;
                    break;
                }
            }

        if (!found) {
            if (config.entities?.inverter_status_59 === 'none' || !config.entities?.inverter_status_59) {
                inverterStateColour = 'transparent';
                inverterStateMsg = '';
            } else {
                inverterStateColour = 'transparent';
                inverterStateMsg = 'Status';
            }
        }

        //Set Battery Status Message and dot for goodwe
        let batteryStateColour = 'transparent';
        let batteryStateMsg = '';
        let battery2StateColour = 'transparent';
        let battery2StateMsg = '';
        let battery1Found = false;
        let battery2Found = false;

        if ([InverterModel.GoodweGridMode, InverterModel.Goodwe, InverterModel.Huawei]
            .includes(inverterModel)) {
            const batStatusGroups = inverterSettings.batteryStatusGroups;

            if (batStatusGroups) {
                for (const groupKey of Object.keys(batStatusGroups)) {
                    const info = batStatusGroups[groupKey];
                    const { states, color, message } = info;

                    // Check for stateBatteryStatus
                    if (!battery1Found && states.includes(stateBatteryStatus.state.toLowerCase())) {
                        batteryStateColour = color;
                        batteryStateMsg = message;
                        battery1Found = true;
                    }

                    // Check for stateBattery2Status
                    if (!battery2Found && states.includes(stateBattery2Status.state.toLowerCase())) {
                        battery2StateColour = color;
                        battery2StateMsg = message;
                        battery2Found = true;
                    }

                    // Break the loop if both batteries are found
                    if (battery1Found && battery2Found) break;
                }
            }

            // Default logic for battery 1
            if (!battery1Found) {
                if (config.entities?.battery_status === 'none' || !config.entities?.battery_status) {
                    batteryStateColour = 'transparent';
                    batteryStateMsg = '';
                } else {
                    batteryStateColour = 'transparent';
                    batteryStateMsg = 'Status';
                }
            }

            // Default logic for battery 2
            if (!battery2Found) {
                if (config.entities?.battery2_status === 'none' || !config.entities?.battery2_status) {
                    battery2StateColour = 'transparent';
                    battery2StateMsg = '';
                } else {
                    battery2StateColour = 'transparent';
                    battery2StateMsg = 'Status';
                }
            }
        }


        const totalDayBatteryDischarge = stateDayBatteryDischarge.toNum() + stateDayBattery2Discharge.toNum();

        const totalDayBatteryCharge = stateDayBatteryCharge.toNum() + stateDayBattery2Charge.toNum();
        //Autarky in Percent = Home Production / Home Consumption
        //Ratio in Percent = Home Consumption / Home Production
        const productionEnergy = stateDayPVEnergy.toNum() + totalDayBatteryDischarge;
        const consumptionEnergy = stateDayLoadEnergy.toNum() + totalDayBatteryCharge;
        const autarkyEnergy = consumptionEnergy != 0 ? Math.max(Math.min(Math.round((productionEnergy * 100) / consumptionEnergy), 100), 0) : 0;
        const ratioEnergy = productionEnergy != 0 ? Math.max(Math.min(Math.round((consumptionEnergy * 100) / productionEnergy), 100), 0) : 0;

        const productionPower =
            totalPV +
            Utils.toNum(`${(config.battery.invert_flow === true ? batteryPowerTotal < 0 : batteryPowerTotal > 0) ? Math.abs(batteryPowerTotal) : 0}`) +
            Utils.toNum(`${auxPower < 0 ? auxPower * -1 : 0}`);
        //console.log(`Production Data`);
        //console.log(`P_Solar Power:${totalPV}`);
        //console.log(`P_Battery Power:${Utils.toNum(`${batteryPower > 0 ? batteryPower : 0}`)}`);
        //console.log(`P_Aux Power:${Utils.toNum(`${auxPower < 0 ? auxPower * -1 : 0}`)}`);
        //console.log(`Production Total:${productionPower}`);      

        const consumptionPower =
            essentialPower +
            Math.max(nonessentialPower, 0) +
            Utils.toNum(`${auxPower > 0 ? auxPower : 0}`) +
            Utils.toNum(`${(config.battery.invert_flow === true ? batteryPowerTotal > 0 : batteryPowerTotal < 0) ? Math.abs(batteryPowerTotal) : 0}`);
        //console.log(`Consumption Data`);
        //console.log(`C_Essential Power:${essentialPower}`);
        //console.log(`C_NonEssential Power:${nonessentialPower}`);
        //console.log(`C_Battery Power:${Utils.toNum(`${batteryPower < 0 ? batteryPower * -1 : 0}`)}`);
        //console.log(`C_Aux Power:${Utils.toNum(`${auxPower > 0 ? auxPower : 0}`)}`);
        //console.log(`C_Consumption Total:${consumptionPower}`);

        const autarkyPower = consumptionPower != 0 ? Math.max(Math.min(Math.round((productionPower * 100) / consumptionPower), 100), 0) : 0;
        const ratioPower = productionPower != 0 ? Math.max(Math.min(Math.round((consumptionPower * 100) / productionPower), 100), 0) : 0;

        const maxLineWidth = (Utils.toNum(config.max_line_width) < 1 ? 1 : config.max_line_width) - 1;
        const minLineWidth = Utils.toNum(config.min_line_width) || 1;

        const batteryMaxPower = this.getEntity('battery.max_power', {state: config.battery.max_power?.toString() ?? ''});
        const BattMaxPower = batteryMaxPower.toNum(0);
        const solarMaxPower = this.getEntity('solar.max_power', {state: config.solar.max_power?.toString() ?? ''});
        const loadMaxPower = this.getEntity('load.max_power', {state: config.load.max_power?.toString() ?? ''});
        const gridMaxPower = this.getEntity('grid.max_power', {state: config.grid.max_power?.toString() ?? ''});

        //Calculate line width depending on power usage
        const pv1LineWidth = !config.solar.max_power ? minLineWidth : this.dynamicLineWidth(pv1PowerWatts, (solarMaxPower.toNum() || pv1PowerWatts), maxLineWidth, minLineWidth);
        const pv2LineWidth = !config.solar.max_power ? minLineWidth : this.dynamicLineWidth(pv2PowerWatts, (solarMaxPower.toNum() || pv2PowerWatts), maxLineWidth, minLineWidth);
        const pv3LineWidth = !config.solar.max_power ? minLineWidth : this.dynamicLineWidth(pv3PowerWatts, (solarMaxPower.toNum() || pv3PowerWatts), maxLineWidth, minLineWidth);
        const pv4LineWidth = !config.solar.max_power ? minLineWidth : this.dynamicLineWidth(pv4PowerWatts, (solarMaxPower.toNum() || pv4PowerWatts), maxLineWidth, minLineWidth);
        const batLineWidth = !config.battery.max_power ? minLineWidth : this.dynamicLineWidth(Math.abs(batteryPowerTotal), (BattMaxPower || Math.abs(batteryPowerTotal)), maxLineWidth, minLineWidth);
        const loadLineWidth = !config.load.max_power ? minLineWidth : this.dynamicLineWidth(Math.abs(essentialPower), (loadMaxPower.toNum() || Math.abs(essentialPower)), maxLineWidth, minLineWidth);
        const auxLineWidth = !config.load.max_power ? minLineWidth : this.dynamicLineWidth(Math.abs(auxPower), (loadMaxPower.toNum() || Math.abs(auxPower)), maxLineWidth, minLineWidth);
        const gridLineWidth = !config.grid.max_power ? minLineWidth : this.dynamicLineWidth(Math.abs(totalGridPower), (gridMaxPower.toNum() || Math.abs(totalGridPower)), maxLineWidth, minLineWidth);
        const grid169LineWidth = !config.grid.max_power ? minLineWidth : this.dynamicLineWidth(Math.abs(autoScaledGridPower), (gridMaxPower.toNum() || Math.abs(autoScaledGridPower)), maxLineWidth, minLineWidth);
        const nonessLineWidth = !config.grid.max_power ? minLineWidth : this.dynamicLineWidth(Math.abs(nonessentialPower), (gridMaxPower.toNum() || Math.abs(nonessentialPower)), maxLineWidth, minLineWidth);
        const solarLineWidth = !config.solar.max_power ? minLineWidth : this.dynamicLineWidth(totalPV, (solarMaxPower.toNum() || totalPV), maxLineWidth, minLineWidth);

        //Calculate power use animation speeds depending on Inverter size
        if (config && config.solar && config.solar.animation_speed) {
            const speed =
                config.solar.animation_speed -
                (config.solar.animation_speed - 1) * (totalPV / (solarMaxPower.toNum() || totalPV));
            this.changeAnimationSpeed(`solar`, speed);
        }

        if (config && config.solar && config.solar.animation_speed) {
            const speed =
                config.solar.animation_speed -
                (config.solar.animation_speed - 1) *
                (pv1PowerWatts / (solarMaxPower.toNum() || pv1PowerWatts));
            this.changeAnimationSpeed(`pv1`, speed);
        }

        if (config && config.solar && config.solar.animation_speed) {
            const speed =
                config.solar.animation_speed -
                (config.solar.animation_speed - 1) *
                (pv2PowerWatts / (solarMaxPower.toNum() || pv2PowerWatts));
            this.changeAnimationSpeed(`pv2`, speed);
        }

        if (config && config.solar && config.solar.animation_speed) {
            const speed =
                config.solar.animation_speed -
                (config.solar.animation_speed - 1) *
                (pv3PowerWatts / (solarMaxPower.toNum() || pv3PowerWatts));
            this.changeAnimationSpeed(`pv3`, speed);
        }

        if (config && config.solar && config.solar.animation_speed) {
            const speed =
                config.solar.animation_speed -
                (config.solar.animation_speed - 1) *
                (pv4PowerWatts / (solarMaxPower.toNum() || pv4PowerWatts));
            this.changeAnimationSpeed(`pv4`, speed);
        }

        if (config && config.battery && config.battery.animation_speed) {
            const speed =
                config.battery.animation_speed -
                (config.battery.animation_speed - 1) *
                (Math.abs(batteryPowerTotal) / (BattMaxPower || Math.abs(batteryPowerTotal)));
            this.changeAnimationSpeed(`battery`, speed);
        }

        if (config && config.load && config.load.animation_speed) {
            const speed =
                config.load.animation_speed -
                (config.load.animation_speed - 1) * (Math.abs(essentialPower) / (loadMaxPower.toNum() || Math.abs(essentialPower)));
            this.changeAnimationSpeed(`load`, speed);
            this.changeAnimationSpeed(`load1`, speed);
        }

        if (config && config.load && config.load.animation_speed) {
            const speed =
                config.load.animation_speed -
                (config.load.animation_speed - 1) * (Math.abs(auxPower) / (loadMaxPower.toNum() || Math.abs(auxPower)));
            this.changeAnimationSpeed(`aux`, speed);
            this.changeAnimationSpeed(`aux1`, speed);
        }

        if (config && config.grid && config.grid.animation_speed) {
            const speed =
                config.grid.animation_speed -
                (config.grid.animation_speed - 1) *
                (Math.abs(totalGridPower) / (gridMaxPower.toNum() || Math.abs(totalGridPower)));
            this.changeAnimationSpeed(`grid1`, speed);
            this.changeAnimationSpeed(`grid`, speed);
            this.changeAnimationSpeed(`grid2`, speed);
        }

        if (config && config.grid && config.grid.animation_speed) {
            const speed =
                config.grid.animation_speed -
                (config.grid.animation_speed - 1) *
                (Math.abs(nonessentialPower) / (gridMaxPower.toNum() || Math.abs(nonessentialPower)));
            this.changeAnimationSpeed(`ne`, speed);
        }

        //Calculate dynamic colour for load icon based on the contribution of the power source (battery, grid, solar) supplying the load
    
        const pvPercentageRaw = totalPV === 0
            ? 0
            : (priorityLoad === 'off' || !priorityLoad)
                ? (config.battery.invert_flow === true 
                    ? (batteryPowerTotal < 0 
                        ? (totalPV / (threePhase ? essentialPower + Math.max(auxPower, 0) : essentialPower)) * 100
                        : ((totalPV - Math.abs(batteryPowerTotal)) / (threePhase ? essentialPower + Math.max(auxPower, 0) : essentialPower)) * 100)
                    : (batteryPowerTotal > 0 
                        ? (totalPV / (threePhase ? essentialPower + Math.max(auxPower, 0) : essentialPower)) * 100
                        : ((totalPV - Math.abs(batteryPowerTotal)) / (threePhase ? essentialPower + Math.max(auxPower, 0) : essentialPower)) * 100))
                : (totalPV / (threePhase ? essentialPower + Math.max(auxPower, 0) : essentialPower)) * 100;

        const batteryPercentageRaw = 
            config.battery.invert_flow === true
                ? (batteryPowerTotal >= 0 
                    ? 0 
                    : (Math.abs(batteryPowerTotal) / (threePhase ? essentialPower + Math.max(auxPower, 0) : essentialPower)) * 100)
                : (batteryPowerTotal <= 0 
                    ? 0 
                    : (Math.abs(batteryPowerTotal) / (threePhase ? essentialPower + Math.max(auxPower, 0) : essentialPower)) * 100);

        //console.log(`${pvPercentageRaw} % RAW PV to load, ${batteryPercentageRaw} % RAW Bat to load`); 

        // Normalize percentages
        const totalPercentage = pvPercentageRaw + batteryPercentageRaw;
        const normalizedPvPercentage = totalPercentage === 0 ? 0 : (pvPercentageRaw / totalPercentage) * 100;
        const normalizedBatteryPercentage = totalPercentage === 0 ? 0 : (batteryPercentageRaw / totalPercentage) * 100;

        //console.log(`${normalizedPvPercentage} % normalizedPVPercentage to load, ${normalizedBatteryPercentage} % normalizedBatteryPercentage to load`); 

        let pvPercentage = 0;
        let batteryPercentage = 0;
        let gridPercentage = 0;
        if (totalPercentage > 100) {
            pvPercentage = Utils.toNum(normalizedPvPercentage, 0);
            batteryPercentage = Utils.toNum(normalizedBatteryPercentage, 0);
        } else {
            pvPercentage = Utils.toNum(Math.min(pvPercentageRaw, 100), 0);
            batteryPercentage = Utils.toNum(Math.min(batteryPercentageRaw, 100), 0);
            gridPercentage = totalGridPower > 0 ? 100 - (pvPercentage + batteryPercentage) : 0;
        }

        //console.log(`${pvPercentage} % PVPercentage, ${batteryPercentage} % BatteryPercentage, ${gridPercentage} % GridPercentage`); 

        //Calculate dynamic colour for battery icon based on the contribution of the power source (grid, solar) supplying the battery
        const pvPercentageRawBat = (totalPV === 0 || (config.battery.invert_flow === true ? batteryPowerTotal <= 0 : batteryPowerTotal >= 0))
            ? 0
            : priorityLoad === 'off' || !priorityLoad
                ? (totalPV / Math.abs(batteryPowerTotal)) * 100
                : ((totalPV - essentialPower) / Math.abs(batteryPowerTotal)) * 100;
        const gridPercentageRawBat = ((config.battery.invert_flow === true ? batteryPower <= 0 : batteryPower >= 0) || totalGridPower <= 0)
            ? 0
            : priorityLoad === 'on'
                ? (totalPV - essentialPower) >= Math.abs(batteryPowerTotal)
                    ? 0
                    : ((totalGridPower - (Math.max((essentialPower - totalPV), 0))) / Math.abs(batteryPowerTotal)) * 100
                : totalPV >= Math.abs(batteryPowerTotal)
                    ? 0
                    : ((Math.abs(batteryPowerTotal) - totalPV) / Math.abs(batteryPowerTotal)) * 100;

        //console.log(`${pvPercentageRawBat} % RAW PV to charge battery, ${gridPercentageRawBat} % RAW Grid to charge battery`);        
        // Normalize percentages
        const totalPercentageBat = pvPercentageRawBat + gridPercentageRawBat;
        const normalizedPvPercentage_bat = totalPercentageBat === 0 ? 0 : (pvPercentageRawBat / totalPercentageBat) * 100;
        const normalizedGridPercentage = totalPercentageBat === 0 ? 0 : (gridPercentageRawBat / totalPercentageBat) * 100;

        let pvPercentageBat = 0;
        let gridPercentageBat = 0;
        if (totalPercentageBat > 100) {
            pvPercentageBat = Utils.toNum(normalizedPvPercentage_bat, 0);
            gridPercentageBat = Utils.toNum(normalizedGridPercentage, 0);
        } else {
            pvPercentageBat = Utils.toNum(Math.min(pvPercentageRawBat, 100), 0);
            gridPercentageBat = Utils.toNum(Math.min(gridPercentageRawBat, 100), 0);
        }

        let flowBatColour: string;
        switch (true) {
            case pvPercentageBat >= Utils.toNum(config.battery?.path_threshold, 0):
                flowBatColour = solarColour;
                break;
            case gridPercentageBat >= Utils.toNum(config.battery?.path_threshold, 0):
                flowBatColour = gridColour;
                break;
            default:
                flowBatColour = batteryColour;
                break;
        }

        let flowColour: string;
        switch (true) {
            case pvPercentage >= Utils.toNum(config.load?.path_threshold, 0):
                flowColour = solarColour;
                break;
            case batteryPercentage >= Utils.toNum(config.load?.path_threshold, 0):
                flowColour = batteryColour;
                break;
            case gridPercentage >= Utils.toNum(config.load?.path_threshold, 0):
                flowColour = gridColour;
                break;
            default:
                flowColour = loadColour;
                break;
        }

        let flowInvColour: string;
        switch (true) {
            case pvPercentage >= Utils.toNum(config.load?.path_threshold, 0):
                flowInvColour = solarColour;
                break;
            case batteryPercentage >= Utils.toNum(config.load?.path_threshold, 0):
                flowInvColour = batteryColour;
                break;
            case gridPercentage >= Utils.toNum(config.load?.path_threshold, 0):
                flowInvColour = gridColour;
                break;
            case gridPercentageBat >= Utils.toNum(config.battery?.path_threshold, 0):
                flowInvColour = gridColour;
                break;
            default:
                flowInvColour = inverterColour;
                break;
        }

        //console.log(`${pvPercentageBat} % PV to charge battery, ${gridPercentageBat} % Grid to charge battery`);

        let essIcon: string;
        let essIconSize: number;

        switch (true) {
            case pvPercentageRaw >= 100 && batteryPercentageRaw <= 5 && (totalGridPower - nonessentialPower) < 50 && config.load.dynamic_icon:
                essIcon = icons.essPv;
                essIconSize = 1;
                break;
            case batteryPercentageRaw >= 100 && pvPercentageRaw <= 5 && (totalGridPower - nonessentialPower) < 50 && config.load.dynamic_icon:
                essIcon = icons.essBat;
                essIconSize = 0;
                break;
            case pvPercentageRaw < 5 && batteryPercentageRaw < 5 && gridPercentage > 0 && config.load.dynamic_icon:
                essIcon = icons.essGrid;
                essIconSize = 0;
                break;
            default:
                essIcon = icons.ess;
                essIconSize = 0;
                break;
        }

        const {batteryIcon, batteryCharge, stopColour, battery0} = BatteryIconManager.convert(stateBatterySoc);
        const {
            batteryIcon: battery2Icon,
            batteryCharge: battery2Charge,
            stopColour: stop2Colour,
            battery0: battery20
        } = BatteryIconManager.convert(stateBattery2Soc);
        

        //Calculate pv efficiency
        const pv1MaxPower = this.getEntity('solar.pv1_max_power', {state: config.solar.pv1_max_power?.toString() ?? ''});
        const pv2MaxPower = this.getEntity('solar.pv2_max_power', {state: config.solar.pv2_max_power?.toString() ?? ''});
        const pv3MaxPower = this.getEntity('solar.pv3_max_power', {state: config.solar.pv3_max_power?.toString() ?? ''});
        const pv4MaxPower = this.getEntity('solar.pv4_max_power', {state: config.solar.pv4_max_power?.toString() ?? ''});

        const totalPVEfficiency = (!config.solar.max_power || config.solar.efficiency === 0) ? 100 : Utils.toNum(Math.min((totalPV / solarMaxPower.toNum()) * 100, 200), 0);
        const PV1Efficiency = (!config.solar.pv1_max_power || config.solar.efficiency === 0) ? 100 : Utils.toNum(Math.min((pv1PowerWatts / pv1MaxPower.toNum()) * 100, 200), 0);
        const PV2Efficiency = (!config.solar.pv2_max_power || config.solar.efficiency === 0) ? 100 : Utils.toNum(Math.min((pv2PowerWatts / pv2MaxPower.toNum()) * 100, 200), 0);
        const PV3Efficiency = (!config.solar.pv3_max_power || config.solar.efficiency === 0) ? 100 : Utils.toNum(Math.min((pv3PowerWatts / pv3MaxPower.toNum()) * 100, 200), 0);
        const PV4Efficiency = (!config.solar.pv4_max_power || config.solar.efficiency === 0) ? 100 : Utils.toNum(Math.min((pv4PowerWatts / pv4MaxPower.toNum()) * 100, 200), 0);
        
        let customGridIcon: string;
        let customGridIconColour: string;
        switch (true) {
            case totalGridPower < 0 && validGridConnected.includes(gridStatus.toLowerCase()):
                customGridIcon = iconGridExport;
                customGridIconColour = gridColour;
                break;
            case totalGridPower >= 0 && validGridConnected.includes(gridStatus.toLowerCase()):
                customGridIcon = iconGridImport;
                customGridIconColour = gridColour;
                break;
            case totalGridPower === 0 && validGridDisconnected.includes(gridStatus.toLowerCase()):
                customGridIcon = iconGridDisconnected;
                customGridIconColour = gridOffColour;
                break;
            default:
                customGridIcon = iconGridImport;
                customGridIconColour = gridColour;
                break;
        }
             
        let viewBoxYLite:string;
        let viewBoxHeightLite:string;
        switch (true) {
            case !config.show_solar && config.show_battery && additionalLoad === 0:
                viewBoxYLite = '138';
                viewBoxHeightLite = '280';
                break;
            case !config.show_solar && config.show_battery && [1, 2, 3, 4].includes(additionalLoad):
                viewBoxYLite = '70';
                viewBoxHeightLite = '350';
                break;
            case config.show_solar && !config.show_battery && [2, 3, 4].includes(additionalLoad):
                viewBoxYLite = '0';
                viewBoxHeightLite = '350';
                break;
            case config.show_solar && !config.show_battery && [0, 1].includes(additionalLoad):
                viewBoxYLite = '0';
                viewBoxHeightLite = '315';
                break;
            case !config.show_solar && !config.show_battery && additionalLoad === 0:
                viewBoxYLite = '115';
                viewBoxHeightLite = '225';
                break;
            case !config.show_solar && !config.show_battery && additionalLoad === 1:
                viewBoxYLite = '85';
                viewBoxHeightLite = '230';
                break;
            case !config.show_solar && !config.show_battery && [2, 3, 4].includes(additionalLoad):
                viewBoxYLite = '65';
                viewBoxHeightLite = '285';
                break;
            default:
                viewBoxYLite = '0';
                viewBoxHeightLite = '408';
        }

        const offThreshold = Utils.toNum(config.load?.off_threshold, 0);
        const offColourTransparent = config.load?.off_colour === 'transparent';
        
        // Helper function to check if all given loads are <= offThreshold
        const areLoadsBelowThreshold = (...loads) => 
          loads.every(load => load.toPower(false) <= offThreshold);
        
        // Initialize colours
        let load1Colour = loadColour;
        let load2Colour = loadColour;
        
        // Mapping for Lite and Compact cards
        const liteCompactLoads = {
          1: [stateEssentialLoad1],
          2: [stateEssentialLoad1],
          3: [stateEssentialLoad1],
          4: [stateEssentialLoad1, stateEssentialLoad2],
          5: [stateEssentialLoad1, stateEssentialLoad2, stateEssentialLoad5],
          6: [stateEssentialLoad1, stateEssentialLoad2, stateEssentialLoad5],
        };
        const liteCompactLoads2 = {
          2: [stateEssentialLoad2],
          3: [stateEssentialLoad2, stateEssentialLoad3],
          4: [stateEssentialLoad3, stateEssentialLoad4],
          5: [stateEssentialLoad3, stateEssentialLoad4],
          6: [stateEssentialLoad3, stateEssentialLoad4, stateEssentialLoad6],
        };
        
        // Mapping for Full cards
        const fullCardLoads = {
          1: [stateEssentialLoad1],
          2: [stateEssentialLoad1, stateEssentialLoad2],
          4: [stateEssentialLoad1, stateEssentialLoad2],
          5: [stateEssentialLoad1, stateEssentialLoad2, stateEssentialLoad5],
          6: [stateEssentialLoad1, stateEssentialLoad2, stateEssentialLoad5],
        };
        const fullCardLoads2 = {
          4: [stateEssentialLoad3, stateEssentialLoad4],
          5: [stateEssentialLoad3, stateEssentialLoad4],
          6: [stateEssentialLoad3, stateEssentialLoad4, stateEssentialLoad6],
        };
        
        // Function to determine load color
        const getLoadColour = (essentialLoads, defaultColour) =>
          areLoadsBelowThreshold(...essentialLoads) ? 'transparent' : defaultColour;
        
        // Logic for Lite and Compact cards
        if (offColourTransparent && (this.isLiteCard || this.isCompactCard)) {
          load1Colour = getLoadColour(liteCompactLoads[additionalLoad] || [], load1Colour);
          load2Colour = getLoadColour(liteCompactLoads2[additionalLoad] || [], load2Colour);
        }
        
        // Logic for Full cards
        if (offColourTransparent && this.isFullCard) {
          load1Colour = getLoadColour(fullCardLoads[additionalLoad] || [], load1Colour);
          load2Colour = getLoadColour(fullCardLoads2[additionalLoad] || [], load2Colour);
        }
              
        const gridStatusLower = gridStatus.toLowerCase();
        let batteryOneShutdown = batteryShutdown;
        let batteryTwoShutdown = batteryShutdown2;
        switch (true) {
            case ['on', '1', 'on-grid'].includes(gridStatusLower):
                batteryOneShutdown = batteryShutdown;
                batteryTwoShutdown = batteryShutdown2;
                break;
        
            case ['off', '0', 'off-grid'].includes(gridStatusLower):
                batteryOneShutdown = stateShutdownSOCOffGrid.notEmpty() ? shutdownOffGrid : batteryShutdown;
                batteryTwoShutdown = stateShutdownSOCOffGrid2.notEmpty() ? shutdownOffGrid2 : batteryShutdown2;
                break;
        }
        

        /**
         * The current structure of this data object is intentional, but it is considered temporary.
         * There is a need to evaluate the data being passed, as there might be duplication.
         * Future improvements should focus on optimizing the data structure and ensuring a unified naming standard.
         */
        const data: DataDto = {
            config,
            compactMode,
            viewBoxYLite,
            viewBoxHeightLite,
            cardHeight,
            cardWidth,
            loadColour,
            load1Colour,
            load2Colour,
            batteryColour,
            battery2Colour,
            gridColour,
            isFloating,
            isFloating2,
            isFloatingCombined,
            inverterColour,
            solarColour,
            auxOffColour,
            batteryEnergy,
            battery2Energy,
            batteryTotalEnergy,
            largeFont,
            batteryPower,
            battery2Power,
            batteryPowerTotal,
            batteryDuration,
            batteryDuration2,
            batteryCapacity,
            battery2Capacity,
            additionalLoad,
            essIconSize,
            essIcon,
            stateUseTimer,
            batteryStateMsg,
            battery2StateMsg,
            stateBatterySoc,
            stateBattery2Soc,
            inverterProg,
            solarShowDaily,
            batteryPercentage,
            pvPercentage,
            loadShowDaily,
            stateEnergyCostSell,
            stateEnergyCostBuy,
            loadPowerL1,
            loadPowerL2,
            loadPowerL3,
            durationCur: this.durationCur,
            stateEssentialLoad1,
            stateEssentialLoad2,
            stateEssentialLoad3,
            stateEssentialLoad4,
            stateEssentialLoad5,
            stateEssentialLoad6,
            gridPower,
            gridPowerL2,
            gridPowerL3,
            decimalPlaces,
            decimalPlacesEnergy,
            stateEssentialLoad1Extra,
            stateEssentialLoad2Extra,
            stateEssentialLoad3Extra,
            stateEssentialLoad4Extra,
            stateEssentialLoad5Extra,
            stateEssentialLoad6Extra,
            stateNonEssentialLoad1Extra,
            stateNonEssentialLoad2Extra,
            stateNonEssentialLoad3Extra,
            loadFrequency,
            statePV4Current,
            gridShowDailyBuy,
            gridShowDailySell,
            batteryShowDaily,
            inverterModel,
            batteryShutdown,
            batteryShutdown2,
            enableAutarky,
            autarkyPower,
            ratioPower,
            ratioEnergy,
            autarkyEnergy,
            shutdownOffGrid2,
            shutdownOffGrid,
            batteryOneShutdown,
            batteryTwoShutdown,
            statePV1Current,
            statePV2Current,
            statePV3Current,
            energyCost,
            inverterCurrent,
            inverterCurrentL2,
            inverterCurrentL3,
            stateRadiatorTemp,
            inverterVoltage,
            inverterVoltageL2,
            inverterVoltageL3,
            batteryVoltage,
            battery2Voltage,
            stateBatteryCurrent,
            stateBattery2Current,
            batLineWidth,
            totalGridPower,
            solarLineWidth,
            totalPV,
            loadLineWidth,
            pvPercentageBat,
            gridPercentageBat,
            genericInverterImage,
            battery0,
            battery20,
            essentialPower,
            pv1LineWidth,
            pv2LineWidth,
            pv3LineWidth,
            pv4LineWidth,
            gridLineWidth,
            pv1PowerWatts,
            pv2PowerWatts,
            pv3PowerWatts,
            pv4PowerWatts,
            stateEnvironmentTemp,
            statePV1Voltage,
            statePV2Voltage,
            statePV3Voltage,
            statePV4Voltage,
            batteryStateColour,
            battery2StateColour,
            inverterStateColour,
            stateBatteryTemp,
            stateBattery2Temp,
            statePrepaidUnits,
            stateDCTransformerTemp,
            iconEssentialLoad1,
            iconEssentialLoad2,
            iconEssentialLoad3,
            iconEssentialLoad4,
            iconEssentialLoad5,
            iconEssentialLoad6,
            enableTimer,
            stateSolarSell,
            priorityLoad,
            inverterImg,
            stateDayPVEnergy,
            statePV2Power,
            statePV3Power,
            statePV4Power,
            remainingSolar,
            totalSolarGeneration,
            stateDayLoadEnergy,
            stateDayBatteryDischarge,
            stateDayGridImport,
            stateDayBatteryCharge,
            stateDayGridExport,
            statePVTotal,
            statePV1Power,
            minLineWidth,
            stopColour,
            stop2Colour,
            gridStatus,
            batteryCharge,
            battery2Charge,
            gridOffColour,
            batteryIcon,
            battery2Icon,
            formattedResultTime,
            formattedResultTime2,
            showAux,
            nonessentialIcon,
            showNonessential,
            auxStatus,
            nonessentialLoads,
            additionalAuxLoad,
            stateAuxLoad1Extra,
            stateAuxLoad2Extra,
            iconNonessentialLoad1,
            iconNonessentialLoad2,
            iconNonessentialLoad3,
            inverterStateMsg,
            auxType,
            showDailyAux,
            nonessentialPower,
            auxPower,
            nonessLineWidth,
            grid169LineWidth,
            auxLineWidth,
            iconAuxLoad1,
            iconAuxLoad2,
            stateDayAuxEnergy,
            stateAuxLoad1,
            stateAuxLoad2,
            stateNonessentialLoad1,
            stateNonessentialLoad2,
            stateNonessentialLoad3,
            autoScaledInverterPower,
            autoScaledGridPower,
            auxDynamicColour,
            auxDynamicColourLoad1,
            auxDynamicColourLoad2,
            stateMaxSellPower,
            totalPVEfficiency,
            PV1Efficiency,
            PV2Efficiency,
            PV3Efficiency,
            PV4Efficiency,
            gridPercentage,
            flowColour,
            flowBatColour,
            flowInvColour,
            dynamicColourEssentialLoad1,
            dynamicColourEssentialLoad2,
            dynamicColourEssentialLoad3,
            dynamicColourEssentialLoad4,
            dynamicColourEssentialLoad5,
            dynamicColourEssentialLoad6,
            dynamicColourNonEssentialLoad1,
            dynamicColourNonEssentialLoad2,
            dynamicColourNonEssentialLoad3,
            stateBatterySOH,
            stateBattery2SOH,
            customGridIcon,
            customGridIconColour,
            maximumSOC,
            batteryCount
        };

        if (this.isFullCard) {
            return fullCard(config, inverterImg, data)
        }

        if (this.isLiteCard || this.isCompactCard) {
            return compactCard(config, inverterImg, data)
        }
    }

    /**
     * Fetches the entity object, returned the defaultValue when the entity is not found. Pass null for no default.
     * @param entity
     * @param defaultValue
     */
    getEntity(entity: keyof sunsynkPowerFlowCardConfig,
              defaultValue: Partial<CustomEntity> | null = {
                  state: '0', attributes: {unit_of_measurement: ''},
              }): CustomEntity {

        let entityString;

        const props = String(entity).split(".");

        if (props.length > 1) {
            entityString = this._config[props[0]][props[1]]
        } else if (props.length > 0) {
            entityString = this._config[props[0]]
        }

        const state = entityString ? this.hass.states[entityString] : undefined;
        return (state !== undefined ? convertToCustomEntity(state)
            : defaultValue ? convertToCustomEntity(defaultValue)
                : convertToCustomEntity({state: undefined})) as CustomEntity;
    }

    changeAnimationSpeed(el: string, speedRaw: number) {
        const speed = speedRaw >= 1 ? Utils.toNum(speedRaw, 3) : 1;
        const flow = this[`${el}Flow`] as SVGSVGElement;
        this.durationCur[el] = speed;
        if (flow && this.durationPrev[el] != speed) {
            // console.log(`${el} found, duration change ${this.durationPrev[el]} -> ${this.durationCur[el]}`);
            // this.gridFlow.pauseAnimations();
            flow.setCurrentTime(flow.getCurrentTime() * (speed / this.durationPrev[el]));
            // this.gridFlow.unpauseAnimations();
        }
        this.durationPrev[el] = this.durationCur[el];
    }

    get isCompactCard() {
        return this._config.cardstyle == CardStyle.Compact;
    }

    get isLiteCard() {
        return this._config.cardstyle == CardStyle.Lite;
    }

    get isFullCard() {
        return this._config.cardstyle == CardStyle.Full;
    }

    colourConvert(colour) {
        return colour && Array.isArray(colour) ? `rgb(${colour})` : colour;
    }

    dynamicLineWidth(power: number, maxpower: number, width: number, defaultLineWidth: number = 1) {
        let lineWidth: number;
        // Check if dynamic_line_width is disabled in the config
        if (!this._config.dynamic_line_width) {
            lineWidth = Math.min(defaultLineWidth, 8);
        } else {
            lineWidth = Math.min((defaultLineWidth + Math.min(power / maxpower, 1) * width), 8);
        }

        return lineWidth;
    }

    calculateAuxLoadColour(state, threshold) {
        return !this._config.load.aux_dynamic_colour
            ? this.colourConvert(this._config.load?.aux_colour)
            : Math.abs(state) > threshold
                ? this.colourConvert(this._config.load?.aux_colour)
                : 'grey';
    }

    calculateEssentialLoadColour(state, threshold) {
        return !this._config.load.dynamic_colour
            ? this.colourConvert(this._config.load?.colour)
            : Math.abs(state) > threshold
                ? this.colourConvert(this._config.load?.colour)
                : this.colourConvert(this._config.load?.off_colour) || 'grey';
    }

    setConfig(config) {
        if (config.show_battery && !config.battery) {
            throw Error(localize('errors.battery.bat'));
        } else {
            if (config.show_battery && !config.battery.shutdown_soc) {
                throw new Error(localize('errors.battery.shutdown_soc'));
            }
            if (
                config.show_battery &&
                config.battery.show_daily &&
                (!config.entities.day_battery_charge_70 || !config.entities.day_battery_discharge_71)
            ) {
                throw Error(localize('errors.battery.show_daily'));
            }
        }
        if (config.show_solar && !config.solar) {
            throw Error(localize('errors.solar.sol'));
        } else {
            if (config.show_solar && !config.solar.mppts) {
                throw Error(localize('errors.solar.mppts'));
            }
            if (
                config &&
                config.solar &&
                config.show_solar &&
                config.solar.show_daily &&
                !config.entities.day_pv_energy_108
            ) {
                throw Error(localize('errors.solar.show_daily'));
            }
        }

        if (
            (config && config.grid && config.grid.show_daily_buy && !config.entities.day_grid_import_76) ||
            (config && config.grid && config.grid.show_daily_sell && !config.entities.day_grid_export_77)
        ) {
            throw Error(localize('errors.grid.show_daily'));
        }

        if (
            (config &&
                config.entities &&
                config.entities.essential_power === 'none' &&
                !config.entities.inverter_power_175) ||
            (config &&
                config.entities &&
                config.entities.essential_power === 'none' &&
                config.entities.inverter_power_175 === 'none')
        ) {
            throw Error(localize('errors.essential_power'));
        }

        if (config && config.entities && config.entities.nonessential_power === 'none' && !config.entities.grid_power_169) {
            throw Error(localize('errors.nonessential_power'));
        }

        const all_attributes = [
            'battery_soc_184',
            'battery_power_190',
            'battery_current_191',
            'grid_ct_power_172',
            'pv1_power_186',
        ];

        for (const attr of all_attributes) {
            if (attr === 'pv1_power_186' && config.show_solar && !config.entities[attr] && !config.entities[attr]) {
                throw new Error(`${localize('errors.missing_entity')} e.g: ${attr}: sensor.example`);
            }
        }

        const customConfig: sunsynkPowerFlowCardConfig = config;

        this._config = merge({}, defaultConfig, customConfig);
    }

    getCardSize() {
        return 2;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).customCards.push({
    type: 'sunsynk-power-flow-card',
    name: 'Sunsynk Power Flow Card',
    preview: true,
    description: localize('common.description'),
    configurable: true
});
