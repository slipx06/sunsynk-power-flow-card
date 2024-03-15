import {CSSResultGroup, LitElement} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {HomeAssistant} from 'custom-card-helpers';
import {styles} from './style';
import {CardStyle, DataDto, InverterModel, InverterSettings, sunsynkPowerFlowCardConfig,} from './types';
import defaultConfig from './defaults';
import {CARD_VERSION, valid3phase, validaux, validLoadValues, validnonLoadValues,} from './const';
import {localize} from './localize/localize';
import merge from 'lodash.merge';
import {SunSynkCardEditor} from './editor';
import {Utils} from './helpers/utils';
import {fullCard} from './cards/full-card';
import {compactCard} from './cards/compact-card';
import {globalData} from './helpers/globals';
import {InverterFactory} from './inverters/inverter-factory';
import {BatteryIconManager} from './helpers/battery-icon-manager';
import {convertToCustomEntity, CustomEntity} from './inverters/dto/custom-entity';

console.groupCollapsed(
    `%c ⚡ SUNSYNK-POWER-FLOW-CARD %c ${localize('common.version')}: ${CARD_VERSION} `,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: dimgray',
);
console.log('Readme:', 'https://github.com/slipx06/sunsynk-power-flow-card');
console.groupEnd();

@customElement('sunsynk-power-flow-card')
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

    static getConfigElement() {
        return document.createElement("content-card-editor");
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
        const stateDayBatteryDischarge = this.getEntity('day_battery_discharge_71');
        const stateDayBatteryCharge = this.getEntity('day_battery_charge_70');
        const stateDayLoadEnergy = this.getEntity('day_load_energy_84');
        const stateDayGridImport = this.getEntity('day_grid_import_76');
        const stateDayPVEnergy = this.getEntity('day_pv_energy_108');
        const stateDayGridExport = this.getEntity('day_grid_export_77');
        const stateDayAuxEnergy = this.getEntity('day_aux_energy');

        //Inverter
        const state_inverter_voltage = this.getEntity('inverter_voltage_154');
        const state_load_frequency = this.getEntity('load_frequency_192');
        const state_inverter_current = this.getEntity('inverter_current_164');
        const state_inverter_status = this.getEntity('inverter_status_59', {state: ''});
        const state_inverter_power = this.getEntity('inverter_power_175');
        const state_priority_load = this.getEntity('priority_load_243', {state: 'undefined'});
        const state_use_timer = this.getEntity('use_timer_248', {state: 'undefined'});
        const state_dc_transformer_temp = this.getEntity('dc_transformer_temp_90', {state: ''});
        const state_radiator_temp = this.getEntity('radiator_temp_91', {state: ''});
        const state_inverter_voltage_L2 = this.getEntity('inverter_voltage_L2', {state: ''});
        const state_inverter_voltage_L3 = this.getEntity('inverter_voltage_L3', {state: ''});
        const state_inverter_current_L2 = this.getEntity('inverter_current_L2', {state: ''});
        const state_inverter_current_L3 = this.getEntity('inverter_current_L3', {state: ''});
        const state_environment_temp = this.getEntity('environment_temp', {state: ''});

        //Battery
        const state_battery_voltage = this.getEntity('battery_voltage_183');
        const state_battery_soc = this.getEntity('battery_soc_184');
        const state_battery_power = this.getEntity('battery_power_190');
        const state_battery_current = this.getEntity('battery_current_191');
        const state_battery_temp = this.getEntity('battery_temp_182', {state: ''});
        const state_battery_status = this.getEntity('battery_status', {state: ''});
        const state_battery_current_direction = this.getEntity('battery_current_direction', {state: ''});
        const state_battery_rated_capacity = this.getEntity('battery_rated_capacity', {state: ''});

        //Load
        const state_essential_power = this.getEntity('essential_power');
        const state_aux_power = this.getEntity('aux_power_166');
        const state_nonessential_power = this.getEntity('nonessential_power');
        const state_non_essential_load1 = this.getEntity('non_essential_load1');
        const state_non_essential_load2 = this.getEntity('non_essential_load2');
        const state_non_essential_load3 = this.getEntity('non_essential_load3');
        const state_essential_load1 = this.getEntity('essential_load1');
        const state_essential_load2 = this.getEntity('essential_load2');
        const state_aux_connected_status = this.getEntity('aux_connected_status', {state: 'on'});
        const state_aux_load1 = this.getEntity('aux_load1');
        const state_aux_load2 = this.getEntity('aux_load2');
        const state_essential_load1_extra = this.getEntity('essential_load1_extra');
        const state_essential_load2_extra = this.getEntity('essential_load2_extra');
        const state_essential_load3 = this.getEntity('essential_load3');
        const state_essential_load4 = this.getEntity('essential_load4');
        const state_load_power_L1 = this.getEntity('load_power_L1');
        const state_load_power_L2 = this.getEntity('load_power_L2');
        const state_load_power_L3 = this.getEntity('load_power_L3');
        const state_aux_load1_extra = this.getEntity('aux_load1_extra');
        const state_aux_load2_extra = this.getEntity('aux_load2_extra');

        //Grid
        const state_grid_ct_power = this.getEntity('grid_ct_power_172');
        const state_grid_ct_power_L2 = this.getEntity('grid_ct_power_L2');
        const state_grid_ct_power_L3 = this.getEntity('grid_ct_power_L3');
        const state_grid_ct_power_total = this.getEntity('grid_ct_power_total');
        const state_grid_connected_status = this.getEntity('grid_connected_status_194', {state: 'on'});
        const state_grid_power = this.getEntity('grid_power_169');
        const state_energy_cost_buy = this.getEntity('energy_cost_buy', {
            state: '',
            attributes: {unit_of_measurement: ''},
        });
        const state_energy_cost_sell = this.getEntity('energy_cost_sell', {
            state: '',
            attributes: {unit_of_measurement: ''},
        });
        const state_grid_voltage = this.getEntity('grid_voltage', null);
        const state_prepaid_units = this.getEntity('prepaid_units');

        //Solar
        const state_pv1_voltage = this.getEntity('pv1_voltage_109');
        const state_pv1_current = this.getEntity('pv1_current_110');
        const state_pv2_voltage = this.getEntity('pv2_voltage_111');
        const state_pv2_current = this.getEntity('pv2_current_112');
        const state_pv3_voltage = this.getEntity('pv3_voltage_113');
        const state_pv3_current = this.getEntity('pv3_current_114');
        const state_pv4_voltage = this.getEntity('pv4_voltage_115');
        const state_pv4_current = this.getEntity('pv4_current_116');
        const state_pv1_power = this.getEntity('pv1_power_186');
        const state_pv2_power = this.getEntity('pv2_power_187');
        const state_pv3_power = this.getEntity('pv3_power_188');
        const state_pv4_power = this.getEntity('pv4_power_189');
        const state_remaining_solar = this.getEntity('remaining_solar');
        const state_solar_sell = this.getEntity('solar_sell_247', {state: 'undefined'});
        const state_pv_total = this.getEntity('pv_total');
        const state_total_pv_generation = this.getEntity('total_pv_generation');

        const state_shutdown_soc = this.getEntity('battery.shutdown_soc', {state: config.battery.shutdown_soc?.toString() ?? ''});
        const state_shutdown_soc_offgrid = this.getEntity('battery.shutdown_soc_offgrid', {state: config.battery.shutdown_soc_offgrid?.toString() ?? ''});

        //Set defaults
        let {invert_aux} = config.load;
        let auxPower = state_aux_power.toPower(invert_aux);

        let {invert_grid} = config.grid;
        let gridPower = state_grid_ct_power.toPower(invert_grid);
        let gridPowerL2 = state_grid_ct_power_L2.toPower(invert_grid);
        let gridPowerL3 = state_grid_ct_power_L3.toPower(invert_grid);
        let grid_power_3phase = state_grid_ct_power_total.toPower(invert_grid);
        let grid_power_total = config.entities?.grid_ct_power_total
            ? grid_power_3phase
            : gridPower + gridPowerL2 + gridPowerL3;

        let totalGridPower = config.inverter.three_phase ? grid_power_total : gridPower;

        let grid_voltage = !state_grid_voltage.isNaN() ? Utils.toNum(state_grid_voltage.state) : null;
        let battery_current_direction = !state_battery_current_direction.isNaN() ? parseInt(state_battery_current_direction.state) : null;
        let genericInverterImage = config.inverter?.modern;

        let loadColour = this.colourConvert(config.load?.colour);
        let auxColour = this.colourConvert(config.load?.aux_colour || loadColour);
        let auxOffColour = this.colourConvert(config.load?.aux_off_colour || loadColour);

        config.title_colour = this.colourConvert(config.title_colour);

        let loadShowDaily = config.load?.show_daily;
        let showNonessential = config.grid?.show_nonessential;
        let gridStatus = config.entities?.grid_connected_status_194 ? state_grid_connected_status.state : 'on';
        let auxStatus = config.entities?.aux_connected_status ? state_aux_connected_status.state : 'on';
        let loadFrequency = config.entities?.load_frequency_192 ? state_load_frequency.toNum(2) : 0;
        let inverterVoltage = config.entities?.inverter_voltage_154
            ? config.inverter.three_phase && (this.isLiteCard || this.isCompactCard)
                ? state_inverter_voltage.toNum(0)
                : state_inverter_voltage.toNum(1)
            : 0;
        let inverterVoltageL2 = config.entities?.inverter_voltage_L2
            ? config.inverter.three_phase && (this.isLiteCard || this.isCompactCard)
                ? state_inverter_voltage_L2.toNum(0)
                : state_inverter_voltage_L2.toNum(1)
            : '';
        let inverterVoltageL3 = config.entities?.inverter_voltage_L3
            ? config.inverter.three_phase && (this.isLiteCard || this.isCompactCard)
                ? state_inverter_voltage_L3.toNum(0)
                : state_inverter_voltage_L3.toNum(1)
            : '';
        let inverterCurrent = config.entities?.inverter_current_164
            ? state_inverter_current.toNum(1)
            : 0;
        let inverterCurrentL2 = config.entities?.inverter_current_L2
            ? state_inverter_current_L2.toNum(1)
            : '';
        let inverterCurrentL3 = config.entities?.inverter_current_L3
            ? state_inverter_current_L3.toNum(1)
            : '';
        let batteryVoltage = config.entities?.battery_voltage_183 ? state_battery_voltage.toNum(1) : 0;
        let autoScaledInverterPower = config.entities?.inverter_power_175
            ? state_inverter_power.toPower()
            : 0;
        let autoScaledGridPower = config.entities?.grid_power_169
            ? state_grid_power.toPower()
            : 0;

        let {invert_load} = config.load;
        let loadPowerL1 = config.entities?.load_power_L1
            ? state_load_power_L1.toPower(invert_load)
            : '';
        let loadPowerL2 = config.entities?.load_power_L2
            ? state_load_power_L2.toPower(invert_load)
            : '';
        let loadPowerL3 = config.entities?.load_power_L3
            ? state_load_power_L3.toPower(invert_load)
            : '';

        const grid_import_colour = this.colourConvert(config.grid?.colour);
        const grid_export_colour = this.colourConvert(config.grid?.export_colour || grid_import_colour);
        const no_grid_colour = this.colourConvert(config.grid?.no_grid_colour || grid_import_colour);

        let gridColour: string;
        switch (true) {
            case totalGridPower < 0:
                gridColour = grid_export_colour;
                break;
            case totalGridPower === 0:
                gridColour = no_grid_colour;
                break;
            default:
                gridColour = grid_import_colour;
                break;
        }

        const gridOffColour = this.colourConvert(config.grid?.grid_off_colour || gridColour);

        let nonessentialLoads = config.grid?.additional_loads;
        if (!validnonLoadValues.includes(nonessentialLoads)) {
            nonessentialLoads = 0;
        }

        let gridShowDailyBuy = config.grid?.show_daily_buy;
        let gridShowDailySell = config.grid?.show_daily_sell;

        let battery_colour = this.colourConvert(config.battery?.colour);
        let battery_charge_colour = this.colourConvert(config.battery?.charge_colour || battery_colour);
        let batteryShowDaily = config.battery?.show_daily;

        let solarShowDaily = config.solar?.show_daily;
        let showAux = config.load?.show_aux;
        if (!validaux.includes(showAux)) {
            showAux = false;
        }

        let showDailyAux = config.load?.show_daily_aux;

        let additionalLoad = config.load?.additional_loads;
        if (!validLoadValues.includes(additionalLoad) || (this.isFullCard && additionalLoad === 4)) {
            additionalLoad = 0;
        }

        let additionalAuxLoad = config.load?.aux_loads;
        if (!validLoadValues.includes(additionalAuxLoad)) {
            additionalAuxLoad = 0;
        }

        let auxType = config.load?.aux_type; //valid options are gen,inverter, default, gen, boiler, pump, aircon
        let iconAuxLoad1 = config.load?.aux_load1_icon;
        let iconAuxLoad2 = config.load?.aux_load2_icon;
        let nonessentialIcon = config.grid?.nonessential_icon; //valid options are default, oven, boiler, pump, aircon
        let iconNonessentialLoad1 = config.grid?.load1_icon; //valid options are default, oven, boiler, pump
        let iconNonessentialLoad2 = config.grid?.load2_icon; //valid options are default, oven, boiler, pump
        let iconNonessentialLoad3 = config.grid?.load3_icon; //mdi icon
        let iconEssentialLoad1 = config.load?.load1_icon; //valid options are boiler, aircon, pump
        let iconEssentialLoad2 = config.load?.load2_icon; //valid options are boiler, aircon, pump
        let iconEssentialLoad3 = config.load?.load3_icon;
        let iconEssentialLoad4 = config.load?.load4_icon;
        let remainingSolar = config.entities.remaining_solar ? Utils.convertValueNew(state_remaining_solar.state, state_remaining_solar.attributes?.unit_of_measurement, 1) : false;
        let totalSolarGeneration = config.entities.total_pv_generation ? Utils.convertValueNew(state_total_pv_generation.state, state_total_pv_generation.attributes?.unit_of_measurement, 2) : false;
        let largeFont = config.large_font;
        let panelMode = config.panel_mode;
        let inverterColour = this.colourConvert(config.inverter?.colour);
        let enableAutarky = config.inverter?.autarky;
        let enableTimer = config.entities.use_timer_248 === false || !config.entities.use_timer_248 ? false : state_use_timer.state;
        let priorityLoad =
            config.entities.priority_load_243 === false || !config.entities.priority_load_243 ? false : state_priority_load.state;
        let batteryPower = state_battery_power.toPower(config.battery?.invert_power);

        const card_height = (config.card_height ? this.hass.states[config.card_height] : null) || {state: ''};
        let cardHeight =
            card_height.state === 'unavailable' || card_height.state === 'unknown' || card_height.state === ''
                ? config.card_height
                : card_height.state;
        let cardWidth = config.card_width;
        let energy_cost_decimals = config.grid?.energy_cost_decimals === 0 ? 0 : config.grid?.energy_cost_decimals || 2;
        let energyCost =
            totalGridPower >= 0
                ? state_energy_cost_buy.toNum(energy_cost_decimals)
                : state_energy_cost_sell.toNum(energy_cost_decimals);

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

        let pv1PowerWatts = state_pv1_power.toPower();
        let pv2PowerWatts = state_pv2_power.toPower();
        let pv3PowerWatts = state_pv3_power.toPower();
        let pv4PowerWatts = state_pv4_power.toPower();

        let totalsolar = pv1PowerWatts + pv2PowerWatts + pv3PowerWatts + pv4PowerWatts;
        let totalPV = config.entities?.pv_total ? state_pv_total.toNum() : totalsolar;

        let solarColour =
            !config.solar.dynamic_colour
                ? this.colourConvert(config.solar?.colour)
                : Utils.toNum(totalPV, 0) > 10
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
                    : state_nonessential_power.toPower();
        } else {
            nonessentialPower =
                nonessential_power === 'none' || !nonessential_power
                    ? gridPower
                    + gridPowerL2
                    + gridPowerL3
                    - autoScaledGridPower
                    : state_nonessential_power.toPower();
        }

        essentialPower =
            essential_power === 'none' || !essential_power
                ? threePhase === true && config.entities.load_power_L1 && config.entities.load_power_L2
                    ? Number(loadPowerL1) + Number(loadPowerL2) + Number(loadPowerL3)
                    : autoScaledInverterPower + autoScaledGridPower - auxPower
                : state_essential_power.toPower(invert_load);

        //Timer entities
        const prog1 = {
            time: this.getEntity('prog1_time', {state: config.entities.prog1_time ?? ''}),
            capacity: this.getEntity('prog1_capacity', {state: config.entities.prog1_capacity ?? ''}),
            charge: this.getEntity('prog1_charge', {state: config.entities.prog1_charge ?? ''}),
        };
        const prog2 = {
            time: this.getEntity('prog2_time', {state: config.entities.prog2_time ?? ''}),
            capacity: this.getEntity('prog2_capacity', {state: config.entities.prog2_capacity ?? ''}),
            charge: this.getEntity('prog2_charge', {state: config.entities.prog2_charge ?? ''}),
        };
        const prog3 = {
            time: this.getEntity('prog3_time', {state: config.entities.prog3_time ?? ''}),
            capacity: this.getEntity('prog3_capacity', {state: config.entities.prog3_capacity ?? ''}),
            charge: this.getEntity('prog3_charge', {state: config.entities.prog3_charge ?? ''}),
        };
        const prog4 = {
            time: this.getEntity('prog4_time', {state: config.entities.prog4_time ?? ''}),
            capacity: this.getEntity('prog4_capacity', {state: config.entities.prog4_capacity ?? ''}),
            charge: this.getEntity('prog4_charge', {state: config.entities.prog4_charge ?? ''}),
        };
        const prog5 = {
            time: this.getEntity('prog5_time', {state: config.entities.prog5_time ?? ''}),
            capacity: this.getEntity('prog5_capacity', {state: config.entities.prog5_capacity ?? ''}),
            charge: this.getEntity('prog5_charge', {state: config.entities.prog5_charge ?? ''}),
        };
        const prog6 = {
            time: this.getEntity('prog6_time', {state: config.entities.prog6_time ?? ''}),
            capacity: this.getEntity('prog6_capacity', {state: config.entities.prog6_capacity ?? ''}),
            charge: this.getEntity('prog6_charge', {state: config.entities.prog6_charge ?? ''}),
        };


        let shutdownOffGrid = state_shutdown_soc_offgrid.toNum();
        let batteryShutdown = state_shutdown_soc.toNum();

        let inverter_prog: InverterSettings = {
            capacity: batteryShutdown,
            entityID: '',
        };

        if (enableTimer === false || state_use_timer.state === 'off') {
            inverter_prog.show = false;
        } else if (
            !config.entities.prog1_time ||
            !config.entities.prog2_time ||
            !config.entities.prog3_time ||
            !config.entities.prog4_time ||
            !config.entities.prog5_time ||
            !config.entities.prog6_time
        ) {
            inverter_prog.show = false;
        } else {
            inverter_prog.show = true;

            const timer_now = new Date(); // Create a new Date object representing the current time

            const progTimes: Date[] = [];

            [prog1, prog2, prog3, prog4, prog5, prog6].forEach((prog, index) => {
                const [hours, minutes] = prog.time.state.split(':').map(function (item) {
                    return parseInt(item, 10);
                });
                progTimes[index] = new Date(timer_now.getTime());
                progTimes[index].setHours(hours);
                progTimes[index].setMinutes(minutes);
            });

            const [prog_time1, prog_time2, prog_time3, prog_time4, prog_time5, prog_time6] = progTimes;

            if (timer_now >= prog_time6 || timer_now < prog_time1) {
                assignInverterProgValues(prog6, config.entities.prog6_charge);
            } else if (timer_now >= prog_time1 && timer_now < prog_time2) {
                assignInverterProgValues(prog1, config.entities.prog1_charge);
            } else if (timer_now >= prog_time2 && timer_now < prog_time3) {
                assignInverterProgValues(prog2, config.entities.prog2_charge);
            } else if (timer_now >= prog_time3 && timer_now < prog_time4) {
                assignInverterProgValues(prog3, config.entities.prog3_charge);
            } else if (timer_now >= prog_time4 && timer_now < prog_time5) {
                assignInverterProgValues(prog4, config.entities.prog4_charge);
            } else if (timer_now >= prog_time5 && timer_now < prog_time6) {
                assignInverterProgValues(prog5, config.entities.prog5_charge);
            }

            function assignInverterProgValues(prog, entityID) {
                if (prog.charge.state === 'No Grid or Gen' || prog.charge.state === '0' || prog.charge.state === 'off') {
                    inverter_prog.charge = 'none';
                } else {
                    inverter_prog.charge = 'both';
                }
                inverter_prog.capacity = parseInt(prog.capacity.state);
                inverter_prog.entityID = entityID;
            }
        }

        if (grid_voltage != null && !Number.isNaN(grid_voltage) && inverterModel == InverterModel.Solis) {
            // the grid voltage can sometimes read decimals like 0.1, in cases where there is power trickled back.
            gridStatus = grid_voltage > 50 ? 'on' : 'off';
        }

        if (battery_current_direction != null && !Number.isNaN(battery_current_direction)) {
            if (inverterModel == InverterModel.Solis && battery_current_direction === 0) {
                batteryPower = -batteryPower;
            }
        }

        //calculate battery capacity
        let batteryCapacity: number = 0;
        if (config.show_battery) {
            switch (inverterModel) {
                case InverterModel.GoodweGridMode:
                case InverterModel.Goodwe:
                case InverterModel.Huawei:
                    if (batteryPower > 0) {
                        if (
                            (gridStatus === 'on' || gridStatus === '1' || gridStatus.toLowerCase() === 'on-grid') &&
                            !inverter_prog.show
                        ) {
                            batteryCapacity = batteryShutdown;
                        } else if (
                            (gridStatus === 'off' || gridStatus === '0' || gridStatus.toLowerCase() === 'off-grid') &&
                            state_shutdown_soc_offgrid.notEmpty() &&
                            !inverter_prog.show
                        ) {
                            batteryCapacity = shutdownOffGrid;
                        } else {
                            batteryCapacity = batteryShutdown;
                        }
                    } else if (batteryPower < 0) {
                        batteryCapacity = 100;
                    }
                    break;

                default:
                    batteryCapacity = inverterSettings.getBatteryCapacity(batteryPower, gridStatus, batteryShutdown, inverter_prog, state_battery_soc);
            }
        }

        //calculate remaining battery time to charge or discharge
        let totalSeconds = 0;
        let formattedResultTime = '';
        let batteryDuration = '';

        const battenergy = this.getEntity('battery.energy', {state: config.battery.energy?.toString() ?? ''});
        let batteryEnergy = battenergy.toNum(0);
        if (batteryVoltage && state_battery_rated_capacity.notEmpty()) {
            batteryEnergy = Utils.toNum(batteryVoltage * state_battery_rated_capacity.toNum(0), 0)
        }

        if (config.show_battery || batteryEnergy !== 0) {
            if (batteryPower === 0) {
                totalSeconds = ((state_battery_soc.toNum() - batteryShutdown) / 100) * batteryEnergy * 60 * 60;
            } else if (batteryPower > 0) {
                totalSeconds =
                    ((((state_battery_soc.toNum() - batteryCapacity) / 100) * batteryEnergy) / batteryPower) * 60 * 60;
            } else if (batteryPower < 0) {
                totalSeconds =
                    ((((batteryCapacity - state_battery_soc.toNum(0)) / 100) * batteryEnergy) / batteryPower) * 60 * 60 * -1;
            }
            const currentTime = new Date(); // Create a new Date object representing the current time
            const durationMilliseconds = totalSeconds * 1000; // Convert the duration to milliseconds
            const resultTime = new Date(currentTime.getTime() + durationMilliseconds); // Add the duration in milliseconds
            const resultHours = resultTime.getHours(); // Get the hours component of the resulting time
            const resultMinutes = resultTime.getMinutes(); // Get the minutes component of the resulting time
            const formattedMinutes = resultMinutes.toString().padStart(2, '0');
            const formattedHours = resultHours.toString().padStart(2, '0');
            formattedResultTime = `${formattedHours}:${formattedMinutes}`;

            const days = Math.floor(totalSeconds / (60 * 60 * 24));
            const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
            const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
            if (days > 0) {
                batteryDuration += `${days} ${localize('common.days')},`;
            }
            if (hours > 0 || days > 0) {
                batteryDuration += `${hours} ${localize('common.hrs')},`;
            }
            batteryDuration += `${minutes} ${localize('common.min')}`;
        }

        let isFloating =
            -2 <= state_battery_current.toNum(0) && state_battery_current.toNum(0) <= 2 && state_battery_soc.toNum(0) >= 99;

        // Determine battery colours
        let batteryColour: string;
        if (batteryPower < 0 && !isFloating) {
            batteryColour = battery_charge_colour;
        } else {
            batteryColour = battery_colour;
        }

        //Set Inverter Status Message and dot
        let inverterStateColour = '';
        let inverterStateMsg = '';
        let inverterState = state_inverter_status.state as any;

        let found = false;

        /**
         * Status can be returned as decimals "3.0", so this is just to change it to an int
         */
        if (inverterModel == InverterModel.Solis) {
            inverterState = !state_inverter_status.isNaN() ? state_inverter_status.toNum(0) : state_inverter_status.toString();
        }

        let typeStatusGroups = inverterSettings.statusGroups;
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
        if ([InverterModel.GoodweGridMode, InverterModel.Goodwe, InverterModel.Huawei]
            .includes(inverterModel)) {
            let batStatusGroups = inverterSettings.batteryStatusGroups;

            if (batStatusGroups)
                for (const groupKey of Object.keys(batStatusGroups)) {
                    const info = batStatusGroups[groupKey];
                    const {states, color, message} = info;
                    if (states.includes(state_battery_status.state.toLowerCase())) {
                        batteryStateColour = color;
                        batteryStateMsg = message;
                        found = true;
                        break;
                    }
                }
            if (!found) {
                if (config.entities?.battery_status === 'none' || !config.entities?.battery_status) {
                    batteryStateColour = 'transparent';
                    batteryStateMsg = '';
                } else {
                    batteryStateColour = 'transparent';
                    batteryStateMsg = 'Status';
                }
            }
        }

        //Autarky in Percent = Home Production / Home Consumption
        //Ratio in Percent = Home Consumption / Home Production
        let production_e = stateDayPVEnergy.toNum() + stateDayBatteryDischarge.toNum();
        let consumption_e = stateDayLoadEnergy.toNum() + stateDayBatteryCharge.toNum();
        let autarkyEnergy = consumption_e != 0 ? Math.max(Math.min(Math.round((production_e * 100) / consumption_e), 100), 0) : 0;
        let ratioEnergy = production_e != 0 ? Math.max(Math.min(Math.round((consumption_e * 100) / production_e), 100), 0) : 0;

        let production_p =
            totalPV +
            Utils.toNum(`${batteryPower > 0 ? batteryPower : 0}`) +
            Utils.toNum(`${auxPower < 0 ? auxPower * -1 : 0}`);
        //console.log(`Production Data`);
        //console.log(`P_Solar Power:${totalPV}`);
        //console.log(`P_Battery Power:${Utils.toNum(`${batteryPower > 0 ? batteryPower : 0}`)}`);
        //console.log(`P_Aux Power:${Utils.toNum(`${auxPower < 0 ? auxPower * -1 : 0}`)}`);
        //console.log(`Production Total:${production_p}`);      

        let consumption_p =
            essentialPower +
            nonessentialPower +
            Utils.toNum(`${auxPower > 0 ? auxPower : 0}`) +
            Utils.toNum(`${batteryPower < 0 ? batteryPower * -1 : 0}`);
        //console.log(`Consumption Data`);
        //console.log(`C_Essential Power:${essentialPower}`);
        //console.log(`C_NonEssential Power:${nonessentialPower}`);
        //console.log(`C_Battery Power:${Utils.toNum(`${batteryPower < 0 ? batteryPower * -1 : 0}`)}`);
        //console.log(`C_Aux Power:${Utils.toNum(`${auxPower > 0 ? auxPower : 0}`)}`);
        //console.log(`C_Consumption Total:${consumption_p}`);

        let autarkyPower = consumption_p != 0 ? Math.max(Math.min(Math.round((production_p * 100) / consumption_p), 100), 0) : 0;
        let ratioPower = production_p != 0 ? Math.max(Math.min(Math.round((consumption_p * 100) / production_p), 100), 0) : 0;

        let max_linewidth = (Utils.toNum(config.max_line_width) < 1 ? 1 : config.max_line_width) - 1;
        let minLineWidth = Utils.toNum(config.min_line_width) || 1;

        const BatteryMaxPower = this.getEntity('battery.max_power', {state: config.battery.max_power?.toString() ?? ''});
        let BattMaxPower = BatteryMaxPower.toNum();

        //Calculate line width depending on power usage
        let pv1LineWidth = !config.solar.max_power ? minLineWidth : this.dynamicLineWidth(pv1PowerWatts, (config.solar.max_power || pv1PowerWatts), max_linewidth, minLineWidth);
        let pv2LineWidth = !config.solar.max_power ? minLineWidth : this.dynamicLineWidth(pv2PowerWatts, (config.solar.max_power || pv2PowerWatts), max_linewidth, minLineWidth);
        let pv3LineWidth = !config.solar.max_power ? minLineWidth : this.dynamicLineWidth(pv3PowerWatts, (config.solar.max_power || pv3PowerWatts), max_linewidth, minLineWidth);
        let pv4LineWidth = !config.solar.max_power ? minLineWidth : this.dynamicLineWidth(pv4PowerWatts, (config.solar.max_power || pv4PowerWatts), max_linewidth, minLineWidth);
        let batLineWidth = !config.battery.max_power ? minLineWidth : this.dynamicLineWidth(Math.abs(batteryPower), (BattMaxPower || Math.abs(batteryPower)), max_linewidth, minLineWidth);
        let loadLineWidth = !config.load.max_power ? minLineWidth : this.dynamicLineWidth(Math.abs(essentialPower), (config.load.max_power || Math.abs(essentialPower)), max_linewidth, minLineWidth);
        let auxLineWidth = !config.load.max_power ? minLineWidth : this.dynamicLineWidth(Math.abs(auxPower), (config.load.max_power || Math.abs(auxPower)), max_linewidth, minLineWidth);
        let gridLineWidth = !config.grid.max_power ? minLineWidth : this.dynamicLineWidth(Math.abs(totalGridPower), (config.grid.max_power || Math.abs(totalGridPower)), max_linewidth, minLineWidth);
        let grid169LineWidth = !config.grid.max_power ? minLineWidth : this.dynamicLineWidth(Math.abs(autoScaledGridPower), (config.grid.max_power || Math.abs(autoScaledGridPower)), max_linewidth, minLineWidth);
        let nonessLineWidth = !config.grid.max_power ? minLineWidth : this.dynamicLineWidth(Math.abs(nonessentialPower), (config.grid.max_power || Math.abs(nonessentialPower)), max_linewidth, minLineWidth);
        let solarLineWidth = !config.solar.max_power ? minLineWidth : this.dynamicLineWidth(totalPV, (config.solar.max_power || totalPV), max_linewidth, minLineWidth);

        //Calculate power use animation speeds depending on Inverter size
        if (config && config.solar && config.solar.animation_speed) {
            const speed =
                config.solar.animation_speed -
                (config.solar.animation_speed - 1) * (totalPV / (config.solar.max_power || totalPV));
            this.changeAnimationSpeed(`solar`, speed);
        }

        if (config && config.solar && config.solar.animation_speed) {
            const speed =
                config.solar.animation_speed -
                (config.solar.animation_speed - 1) *
                (pv1PowerWatts / (config.solar.max_power || pv1PowerWatts));
            this.changeAnimationSpeed(`pv1`, speed);
        }

        if (config && config.solar && config.solar.animation_speed) {
            const speed =
                config.solar.animation_speed -
                (config.solar.animation_speed - 1) *
                (pv2PowerWatts / (config.solar.max_power || pv2PowerWatts));
            this.changeAnimationSpeed(`pv2`, speed);
        }

        if (config && config.solar && config.solar.animation_speed) {
            const speed =
                config.solar.animation_speed -
                (config.solar.animation_speed - 1) *
                (pv3PowerWatts / (config.solar.max_power || pv3PowerWatts));
            this.changeAnimationSpeed(`pv3`, speed);
        }

        if (config && config.solar && config.solar.animation_speed) {
            const speed =
                config.solar.animation_speed -
                (config.solar.animation_speed - 1) *
                (pv4PowerWatts / (config.solar.max_power || pv4PowerWatts));
            this.changeAnimationSpeed(`pv4`, speed);
        }

        if (config && config.battery && config.battery.animation_speed) {
            const speed =
                config.battery.animation_speed -
                (config.battery.animation_speed - 1) *
                (Math.abs(batteryPower) / (config.battery.max_power || Math.abs(batteryPower)));
            this.changeAnimationSpeed(`battery`, speed);
        }

        if (config && config.load && config.load.animation_speed) {
            const speed =
                config.load.animation_speed -
                (config.load.animation_speed - 1) * (Math.abs(essentialPower) / (config.load.max_power || Math.abs(essentialPower)));
            this.changeAnimationSpeed(`load`, speed);
        }

        if (config && config.load && config.load.animation_speed) {
            const speed =
                config.load.animation_speed -
                (config.load.animation_speed - 1) * (Math.abs(auxPower) / (config.load.max_power || Math.abs(auxPower)));
            this.changeAnimationSpeed(`aux`, speed);
        }

        if (config && config.grid && config.grid.animation_speed) {
            const speed =
                config.grid.animation_speed -
                (config.grid.animation_speed - 1) *
                (Math.abs(totalGridPower) / (config.grid.max_power || Math.abs(totalGridPower)));
            this.changeAnimationSpeed(`grid1`, speed);
            this.changeAnimationSpeed(`grid`, speed);
        }

        if (config && config.grid && config.grid.animation_speed) {
            const speed =
                config.grid.animation_speed -
                (config.grid.animation_speed - 1) *
                (Math.abs(nonessentialPower) / (config.grid.max_power || Math.abs(nonessentialPower)));
            this.changeAnimationSpeed(`ne`, speed);
        }

        let decimalPlaces = config.decimal_places;

        //Calculate dynamic colour for load icon based on the contribution of the power source (battery, grid, solar) supplying the load
        const pvPercentage_raw = totalPV === 0
            ? 0
            : priorityLoad === 'off' || !priorityLoad
                ? batteryPower > 0
                    ? (totalPV / (threePhase ? essentialPower + Math.max(auxPower, 0) : essentialPower)) * 100
                    : ((totalPV - Math.abs(batteryPower)) / (threePhase ? essentialPower + Math.max(auxPower, 0) : essentialPower)) * 100
                : (totalPV / (threePhase ? essentialPower + Math.max(auxPower, 0) : essentialPower)) * 100;
        const batteryPercentage_raw = batteryPower <= 0 ? 0 : (Math.abs(batteryPower) / (threePhase ? essentialPower + Math.max(auxPower, 0) : essentialPower)) * 100;

        // Normalize percentages
        const totalPercentage = pvPercentage_raw + batteryPercentage_raw;
        const normalizedPvPercentage = totalPercentage === 0 ? 0 : (pvPercentage_raw / totalPercentage) * 100;
        const normalizedBatteryPercentage = totalPercentage === 0 ? 0 : (batteryPercentage_raw / totalPercentage) * 100;

        let pvPercentage = 0;
        let batteryPercentage = 0;
        if (totalPercentage > 100) {
            pvPercentage = Utils.toNum(normalizedPvPercentage, 0);
            batteryPercentage = Utils.toNum(normalizedBatteryPercentage, 0);
        } else {
            pvPercentage = Utils.toNum(Math.min(pvPercentage_raw, 100), 0);
            batteryPercentage = Utils.toNum(Math.min(batteryPercentage_raw, 100), 0);
        }

        //Calculate dynamic colour for battery icon based on the contribution of the power source (grid, solar) supplying the battery
        const pvPercentage_raw_bat = (totalPV === 0 || batteryPower >= 0)
            ? 0
            : priorityLoad === 'off' || !priorityLoad
                ? (totalPV / Math.abs(batteryPower)) * 100
                : ((totalPV - essentialPower) / Math.abs(batteryPower)) * 100;
        const gridPercentage_raw_bat = (batteryPower >= 0 || totalGridPower <= 0)
            ? 0
            : priorityLoad === 'on'
                ? (totalPV - essentialPower) >= Math.abs(batteryPower)
                    ? 0
                    : (totalGridPower - Math.max((essentialPower - totalPV), 0) / Math.abs(batteryPower)) * 100
                : totalPV >= Math.abs(batteryPower)
                    ? 0
                    : ((Math.abs(batteryPower) - totalPV) / Math.abs(batteryPower)) * 100;

        //console.log(`${pvPercentage_raw_bat} % RAW PV to charge battery, ${gridPercentage_raw_bat} % RAW Grid to charge battery`);        
        // Normalize percentages
        const totalPercentage_bat = pvPercentage_raw_bat + gridPercentage_raw_bat;
        const normalizedPvPercentage_bat = totalPercentage_bat === 0 ? 0 : (pvPercentage_raw_bat / totalPercentage_bat) * 100;
        const normalizedGridPercentage = totalPercentage_bat === 0 ? 0 : (gridPercentage_raw_bat / totalPercentage_bat) * 100;

        let pvPercentageBat = 0;
        let gridPercentageBat = 0;
        if (totalPercentage_bat > 100) {
            pvPercentageBat = Utils.toNum(normalizedPvPercentage_bat, 0);
            gridPercentageBat = Utils.toNum(normalizedGridPercentage, 0);
        } else {
            pvPercentageBat = Utils.toNum(Math.min(pvPercentage_raw_bat, 100), 0);
            gridPercentageBat = Utils.toNum(Math.min(gridPercentage_raw_bat, 100), 0);
        }

        //console.log(`${pvPercentageBat} % PV to charge battery, ${gridPercentageBat} % Grid to charge battery`);

        const essBat = 'M15 9h1V7.5h4V9h1c.55 0 1 .45 1 1v11c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1V10c0-.55.45-1 1-1m1 2v3h4v-3h-4m-4-5.31l-5 4.5V18h5v2H5v-8H2l10-9l2.78 2.5H14v1.67l-.24.1L12 5.69Z';
        const essGrid = 'M5 20v-8H2l10-9l10 9h-3v8zm7-14.31l-5 4.5V18h10v-7.81zM11.5 18v-4H9l3.5-7v4H15z';
        const essPv = 'M11.6 3.45zM18.25 19.6v-7.6h2.85L11.6 3.45 2.1 12h2.85v7.6zM11.6 6.015l4.75 4.275V17.7H6.85v-7.41zM6.58 2.8v1.42L8 3.508zm-.4 2.4L5.2 6.184l1.5.5zM2.8 6.58 3.508 8l.712-1.42zM6 2.8H2.8v3.2c.228.068.468.1.708.1 1.432.004 2.596-1.16 2.6-2.6-.004-.236-.04-.472-.108-.7M12.5 3.844l2.25 2.026.5-.5-2.24-2.04zM17.71 8.53 18.2 8.04 15.76 5.84 15.26 6.34ZM20.52 11.09l.48-.49-2.31-2.14-.5.5z M18.1299 5.1169 17.318 4.6482l2.4492-1.6171-.75 1.299.8119.4687-2.4492 1.6171z';
        const ess = 'm15 13l-4 4v-3H2v-2h9V9l4 4M5 20v-4h2v2h10v-7.81l-5-4.5L7.21 10H4.22L12 3l10 9h-3v8H5Z';

        let essIcon: string;
        let essIconSize: number;
        switch (true) {
            case pvPercentage_raw >= 100 && batteryPercentage_raw <= 5 && (totalGridPower - nonessentialPower) < 50 && config.load.dynamic_icon:
                essIcon = essPv;
                essIconSize = 1;
                break;
            case batteryPercentage_raw >= 100 && pvPercentage_raw <= 5 && (totalGridPower - nonessentialPower) < 50 && config.load.dynamic_icon:
                essIcon = essBat;
                essIconSize = 0;
                break;
            case pvPercentage_raw < 5 && batteryPercentage_raw < 5 && config.load.dynamic_icon:
                essIcon = essGrid;
                essIconSize = 0;
                break;
            default:
                essIcon = ess;
                essIconSize = 0;
                break;
        }

        const {batteryIcon, batteryCharge, stopColour, battery0} = BatteryIconManager.convert(state_battery_soc)

        /**
         * The current structure of this data object is intentional, but it is considered temporary.
         * There is a need to evaluate the data being passed, as there might be duplication.
         * Additionally, establishing a consistent naming convention is essential, as the casings are mixed.
         * Future improvements should focus on optimizing the data structure and ensuring a unified naming standard.
         */
        const data: DataDto = {
            config,
            panelMode,
            compactMode,
            cardHeight,
            cardWidth,
            loadColour,
            batteryColour,
            gridColour,
            isFloating,
            inverterColour,
            solarColour,
            auxColour,
            auxOffColour,
            batteryEnergy,
            largeFont,
            batteryPower,
            batteryDuration,
            batteryCapacity,
            additionalLoad,
            essIconSize,
            essIcon,
            state_use_timer,
            batteryStateMsg,
            state_battery_soc,
            inverter_prog,
            solarShowDaily,
            batteryPercentage,
            pvPercentage,
            loadShowDaily,
            state_energy_cost_sell,
            state_energy_cost_buy,
            loadPowerL1,
            loadPowerL2,
            loadPowerL3,
            durationCur: this.durationCur,
            state_essential_load1,
            state_essential_load2,
            state_essential_load3,
            state_essential_load4,
            gridPower,
            gridPowerL2,
            gridPowerL3,
            decimalPlaces,
            state_essential_load1_extra,
            state_essential_load2_extra,
            loadFrequency,
            state_pv4_current,
            gridShowDailyBuy,
            gridShowDailySell,
            batteryShowDaily,
            inverterModel,
            batteryShutdown,
            enableAutarky,
            autarkyPower,
            ratioPower,
            ratioEnergy,
            autarkyEnergy,
            shutdownOffGrid,
            state_pv1_current,
            state_pv2_current,
            state_pv3_current,
            energyCost,
            inverterCurrent,
            inverterCurrentL2,
            inverterCurrentL3,
            state_radiator_temp,
            inverterVoltage,
            inverterVoltageL2,
            inverterVoltageL3,
            batteryVoltage,
            state_battery_current,
            batLineWidth,
            totalGridPower,
            solarLineWidth,
            totalPV,
            loadLineWidth,
            pvPercentageBat,
            gridPercentageBat,
            genericInverterImage,
            battery0,
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
            state_environment_temp,
            state_pv1_voltage,
            state_pv2_voltage,
            state_pv3_voltage,
            state_pv4_voltage,
            batteryStateColour,
            inverterStateColour,
            state_battery_temp,
            state_prepaid_units,
            state_dc_transformer_temp,
            iconEssentialLoad1,
            iconEssentialLoad2,
            iconEssentialLoad3,
            iconEssentialLoad4,
            enableTimer,
            state_solar_sell,
            priorityLoad,
            inverterImg,
            stateDayPVEnergy,
            state_pv2_power,
            state_pv3_power,
            state_pv4_power,
            remainingSolar,
            totalSolarGeneration,
            stateDayLoadEnergy,
            stateDayBatteryDischarge,
            stateDayGridImport,
            stateDayBatteryCharge,
            stateDayGridExport,
            state_pv_total,
            state_pv1_power,
            minLineWidth,
            stopColour,
            gridStatus,
            batteryCharge,
            gridOffColour,
            batteryIcon,
            formattedResultTime,
            showAux,
            nonessentialIcon,
            showNonessential,
            auxStatus,
            nonessentialLoads,
            additionalAuxLoad,
            state_aux_load1_extra,
            iconNonessentialLoad1,
            iconNonessentialLoad2,
            iconNonessentialLoad3,
            inverterStateMsg,
            auxType,
            state_aux_load2_extra,
            showDailyAux,
            nonessentialPower,
            auxPower,
            nonessLineWidth,
            grid169LineWidth,
            auxLineWidth,
            iconAuxLoad1,
            iconAuxLoad2,
            stateDayAuxEnergy,
            state_aux_load1,
            state_aux_load2,
            state_non_essential_load1,
            state_non_essential_load2,
            state_non_essential_load3,
            autoScaledInverterPower,
            autoScaledGridPower
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
        const ent = props.length > 0 ? props[0] : null;
        const prop = props.length > 1 ? props[1] : null;

        if (ent && prop) {
            entityString = this._config[ent][prop]
        } else if (ent) {
            entityString = this._config.entities[ent]
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

try {
    customElements.define("content-card-editor", SunSynkCardEditor);
} catch (_e) {
}
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'sunsynk-power-flow-card',
    name: 'Sunsynk Power Flow Card',
    preview: true,
    description: localize('common.description'),
    configurable: true
});
