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
        const state_day_battery_discharge = this.getEntity('day_battery_discharge_71');
        const state_day_battery_charge = this.getEntity('day_battery_charge_70');
        const state_day_load_energy = this.getEntity('day_load_energy_84');
        const state_day_grid_import = this.getEntity('day_grid_import_76');
        const state_day_pv_energy = this.getEntity('day_pv_energy_108');
        const state_day_grid_export = this.getEntity('day_grid_export_77');
        const state_day_aux_energy = this.getEntity('day_aux_energy');

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
        const state_battery_current_direction = this.getEntity('battery_current_direction', null);
        const state_battery_rated_capacity = this.getEntity('battery_rated_capacity', null)?.state;

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
        const state_prepaid_units = this.getEntity('prepaid_units', {state: '0'});

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

        const state_shutdown_soc = this.getEntity('battery.shutdown_soc', {state: config.battery.shutdown_soc ?? ''});
        const state_shutdown_soc_offgrid = this.getEntity('battery.shutdown_soc_offgrid', {state: config.battery.shutdown_soc_offgrid ?? ''});

        //Set defaults
        let {invert_aux} = config.load;
        let aux_power = state_aux_power.toPower(invert_aux);

        let {invert_grid} = config.grid;
        let grid_power = state_grid_ct_power.toPower(invert_grid);
        let grid_power_L2 = state_grid_ct_power_L2.toPower(invert_grid);
        let grid_power_L3 = state_grid_ct_power_L3.toPower(invert_grid);
        let grid_power_3phase = state_grid_ct_power_total.toPower(invert_grid);
        let grid_power_total = config.entities?.grid_ct_power_total
            ? grid_power_3phase
            : grid_power + grid_power_L2 + grid_power_L3;

        let total_grid_power = config.inverter.three_phase ? grid_power_total : grid_power;

        let grid_voltage = !isNaN(state_grid_voltage?.state) ? Utils.toNum(state_grid_voltage.state) : null;
        let battery_current_direction = !isNaN(state_battery_current_direction?.state) ? parseInt(state_battery_current_direction.state) : null;
        let inverter_modern = config.inverter?.modern;

        let load_colour = this.colourConvert(config.load?.colour);
        let aux_colour = this.colourConvert(config.load?.aux_colour || load_colour);
        let aux_off_colour = this.colourConvert(config.load?.aux_off_colour || load_colour);

        config.title_colour = this.colourConvert(config.title_colour);

        let load_showdaily = config.load?.show_daily;
        let grid_show_noness = config.grid?.show_nonessential;
        let grid_status = config.entities?.grid_connected_status_194 ? state_grid_connected_status.state : 'on';
        let aux_status = config.entities?.aux_connected_status ? state_aux_connected_status.state : 'on';
        let load_frequency = config.entities?.load_frequency_192 ? state_load_frequency.toNum(2) : 0;
        let inverter_voltage = config.entities?.inverter_voltage_154
            ? config.inverter.three_phase && (this.isLiteCard || this.isCompactCard)
                ? state_inverter_voltage.toNum(0)
                : state_inverter_voltage.toNum(1)
            : 0;
        let inverter_voltage_L2 = config.entities?.inverter_voltage_L2
            ? config.inverter.three_phase && (this.isLiteCard || this.isCompactCard)
                ? state_inverter_voltage_L2.toNum(0)
                : state_inverter_voltage_L2.toNum(1)
            : '';
        let inverter_voltage_L3 = config.entities?.inverter_voltage_L3
            ? config.inverter.three_phase && (this.isLiteCard || this.isCompactCard)
                ? state_inverter_voltage_L3.toNum(0)
                : state_inverter_voltage_L3.toNum(1)
            : '';
        let inverter_current = config.entities?.inverter_current_164
            ? state_inverter_current.toNum(1)
            : 0;
        let inverter_current_L2 = config.entities?.inverter_current_L2
            ? state_inverter_current_L2.toNum(1)
            : '';
        let inverter_current_L3 = config.entities?.inverter_current_L3
            ? state_inverter_current_L3.toNum(1)
            : '';
        let battery_voltage = config.entities?.battery_voltage_183 ? Utils.toNum(state_battery_voltage.state, 1) : 0;
        let inverter_power_round = config.entities?.inverter_power_175
            ? state_inverter_power.toPower()
            : 0;
        let grid_power_round = config.entities?.grid_power_169
            ? state_grid_power.toPower()
            : 0;

        let {invert_load} = config.load;
        let load_power_L1 = config.entities?.load_power_L1
            ? state_load_power_L1.toPower()
            : '';
        let load_power_L2 = config.entities?.load_power_L2
            ? state_load_power_L2.toPower()
            : '';
        let load_power_L3 = config.entities?.load_power_L3
            ? state_load_power_L3.toPower()
            : '';

        const grid_import_colour = this.colourConvert(config.grid?.colour);
        const grid_export_colour = this.colourConvert(config.grid?.export_colour || grid_import_colour);
        const no_grid_colour = this.colourConvert(config.grid?.no_grid_colour || grid_import_colour);

        let grid_colour: string;
        switch (true) {
            case total_grid_power < 0:
                grid_colour = grid_export_colour;
                break;
            case total_grid_power === 0:
                grid_colour = no_grid_colour;
                break;
            default:
                grid_colour = grid_import_colour;
                break;
        }

        const grid_off_colour = this.colourConvert(config.grid?.grid_off_colour || grid_colour);

        let noness_dual_load = config.grid?.additional_loads;
        if (!validnonLoadValues.includes(noness_dual_load)) {
            noness_dual_load = 0;
        }

        let grid_showdailybuy = config.grid?.show_daily_buy;
        let grid_showdailysell = config.grid?.show_daily_sell;

        let battery_colour = this.colourConvert(config.battery?.colour);
        let battery_charge_colour = this.colourConvert(config.battery?.charge_colour || battery_colour);
        let battery_showdaily = config.battery?.show_daily;

        let solar_showdaily = config.solar?.show_daily;
        let show_aux = config.load?.show_aux;
        if (!validaux.includes(show_aux)) {
            show_aux = false;
        }

        let show_dailyaux = config.load?.show_daily_aux;

        let additional_load = config.load?.additional_loads;
        if (!validLoadValues.includes(additional_load) || (this.isFullCard && additional_load === 4)) {
            additional_load = 0;
        }

        let additional_aux_load = config.load?.aux_loads;
        if (!validLoadValues.includes(additional_aux_load)) {
            additional_aux_load = 0;
        }

        let aux_type = config.load?.aux_type; //valid options are gen,inverter, default, gen, boiler, pump, aircon
        let aux_load1_icon = config.load?.aux_load1_icon;
        let aux_load2_icon = config.load?.aux_load2_icon;
        let nonessential_icon = config.grid?.nonessential_icon; //valid options are default, oven, boiler, pump, aircon
        let load1_icon = config.grid?.load1_icon; //valid options are default, oven, boiler, pump
        let load2_icon = config.grid?.load2_icon; //valid options are default, oven, boiler, pump
        let load3_icon = config.grid?.load3_icon; //mdi icon
        let load1e_icon = config.load?.load1_icon; //valid options are boiler, aircon, pump
        let load2e_icon = config.load?.load2_icon; //valid options are boiler, aircon, pump
        let load3e_icon = config.load?.load3_icon;
        let load4e_icon = config.load?.load4_icon;
        let remaining_solar = config.entities.remaining_solar ? Utils.convertValueNew(state_remaining_solar.state, state_remaining_solar.attributes?.unit_of_measurement, 1) : false;
        let total_solar_generation = config.entities.total_pv_generation ? Utils.convertValueNew(state_total_pv_generation.state, state_total_pv_generation.attributes?.unit_of_measurement, 2) : false;
        let font = config.large_font;
        let panel = config.panel_mode;
        let inverter_colour = this.colourConvert(config.inverter?.colour);
        let useautarky = config.inverter?.autarky;
        let usetimer = config.entities.use_timer_248 === false || !config.entities.use_timer_248 ? false : state_use_timer.state;
        let priority =
            config.entities.priority_load_243 === false || !config.entities.priority_load_243 ? false : state_priority_load.state;
        let battery_power = state_battery_power.toPower();

        const card_height = (config.card_height ? this.hass.states[config.card_height] : null) || {state: ''};
        let height =
            card_height.state === 'unavailable' || card_height.state === 'unknown' || card_height.state === ''
                ? config.card_height
                : card_height.state;
        let width = config.card_width;
        let energy_cost_decimals = config.grid?.energy_cost_decimals === 0 ? 0 : config.grid?.energy_cost_decimals || 2;
        let energy_cost =
            total_grid_power >= 0
                ? Utils.toNum(state_energy_cost_buy.state, energy_cost_decimals)
                : Utils.toNum(state_energy_cost_sell.state, energy_cost_decimals);

        let inverterModel = InverterModel.Sunsynk;

        // Check if the userInputModel is a valid inverter model
        if (Object.values(InverterModel).includes(config.inverter.model)) {
            inverterModel = config.inverter.model as InverterModel;
        }

        let inverterImg = '';
        const inverterSettings = InverterFactory.getInstance(inverterModel);
        if (!inverter_modern) {
            inverterImg = inverterSettings.image;
        }


        let compact = false;
        if (this.isCompactCard) {
            compact = true;
        }
        //totalsolar = pv1_power_186 + pv2_power_187 + pv3_power_188 + pv4_power_189

        let pv1_power_watts = state_pv1_power.toPower();
        let pv2_power_watts = state_pv2_power.toPower();
        let pv3_power_watts = state_pv3_power.toPower();
        let pv4_power_watts = state_pv4_power.toPower();

        let totalsolar = pv1_power_watts + pv2_power_watts + pv3_power_watts + pv4_power_watts;
        let total_pv = config.entities?.pv_total ? state_pv_total.toNum() : totalsolar;

        let solar_colour =
            !config.solar.dynamic_colour
                ? this.colourConvert(config.solar?.colour)
                : Utils.toNum(total_pv, 0) > 10
                    ? this.colourConvert(config.solar?.colour)
                    : 'grey';

        //essential = inverter_power_175 + grid_power_169 - aux_power_166
        //nonessential = grid_ct_power_172 - grid_power_169

        let three_phase = config.inverter?.three_phase;
        if (!valid3phase.includes(three_phase)) {
            three_phase = false;
        }

        let essential: number;
        let nonessential: number;
        const {essential_power, nonessential_power} = config.entities;

        if (three_phase === false) {
            nonessential =
                nonessential_power === 'none' || !nonessential_power
                    ? grid_power - grid_power_round
                    : state_nonessential_power.toPower();
        } else {
            nonessential =
                nonessential_power === 'none' || !nonessential_power
                    ? grid_power
                    + grid_power_L2
                    + grid_power_L3
                    - grid_power_round
                    : state_nonessential_power.toPower();
        }

        essential =
            essential_power === 'none' || !essential_power
                ? three_phase === true && config.entities.load_power_L1 && config.entities.load_power_L2
                    ? Number(load_power_L1) + Number(load_power_L2) + Number(load_power_L3)
                    : inverter_power_round + grid_power_round - aux_power
                : state_essential_power.toPower(invert_load);

        //Timer entities
        const prog1 = {
            time: this.hass.states[config.entities.prog1_time] || {state: ''},
            capacity: this.hass.states[config.entities.prog1_capacity] || {state: ''},
            charge: this.hass.states[config.entities.prog1_charge] || {state: ''},
        };
        const prog2 = {
            time: this.hass.states[config.entities.prog2_time] || {state: ''},
            capacity: this.hass.states[config.entities.prog2_capacity] || {state: ''},
            charge: this.hass.states[config.entities.prog2_charge] || {state: ''},
        };
        const prog3 = {
            time: this.hass.states[config.entities.prog3_time] || {state: ''},
            capacity: this.hass.states[config.entities.prog3_capacity] || {state: ''},
            charge: this.hass.states[config.entities.prog3_charge] || {state: ''},
        };
        const prog4 = {
            time: this.hass.states[config.entities.prog4_time] || {state: ''},
            capacity: this.hass.states[config.entities.prog4_capacity] || {state: ''},
            charge: this.hass.states[config.entities.prog4_charge] || {state: ''},
        };
        const prog5 = {
            time: this.hass.states[config.entities.prog5_time] || {state: ''},
            capacity: this.hass.states[config.entities.prog5_capacity] || {state: ''},
            charge: this.hass.states[config.entities.prog5_charge] || {state: ''},
        };
        const prog6 = {
            time: this.hass.states[config.entities.prog6_time] || {state: ''},
            capacity: this.hass.states[config.entities.prog6_capacity] || {state: ''},
            charge: this.hass.states[config.entities.prog6_charge] || {state: ''},
        };


        let shutdownoffgrid = Utils.toNum(state_shutdown_soc_offgrid.state);
        let shutdown = Utils.toNum(state_shutdown_soc.state);

        let inverter_prog: InverterSettings = {
            capacity: shutdown,
            entityID: '',
        };

        if (usetimer === false || state_use_timer.state === 'off') {
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
            grid_status = grid_voltage > 50 ? 'on' : 'off';
        }

        if (battery_current_direction != null && !Number.isNaN(battery_current_direction)) {
            if (inverterModel == InverterModel.Solis && battery_current_direction === 0) {
                battery_power = -battery_power;
            }
        }

        //calculate battery capacity
        let battery_capacity: number = 0;
        if (config.show_battery) {
            switch (inverterModel) {
                case InverterModel.GoodweGridMode:
                case InverterModel.Goodwe:
                case InverterModel.Huawei:
                    if (battery_power > 0) {
                        if (
                            (grid_status === 'on' || grid_status === '1' || grid_status.toLowerCase() === 'on-grid') &&
                            !inverter_prog.show
                        ) {
                            battery_capacity = shutdown;
                        } else if (
                            (grid_status === 'off' || grid_status === '0' || grid_status.toLowerCase() === 'off-grid') &&
                            state_shutdown_soc_offgrid.notEmpty() &&
                            !inverter_prog.show
                        ) {
                            battery_capacity = state_shutdown_soc_offgrid.toNum();
                        } else {
                            battery_capacity = shutdown;
                        }
                    } else if (battery_power < 0) {
                        battery_capacity = 100;
                    }
                    break;

                default:
                    battery_capacity = inverterSettings.getBatteryCapacity(battery_power, grid_status, shutdown, inverter_prog, state_battery_soc);
            }
        }

        //calculate remaining battery time to charge or discharge
        let totalSeconds = 0;
        let formattedResultTime = '';
        let duration = '';

        const battenergy = this.getEntity('battery.energy', {state: config.battery.energy ?? ''});
        let battery_energy = battenergy.toNum(0);
        if (battery_voltage && state_battery_rated_capacity) {
            battery_energy = Utils.toNum(battery_voltage * state_battery_rated_capacity, 0)
        }

        if (config.show_battery || battery_energy !== 0) {
            if (battery_power === 0) {
                totalSeconds = ((state_battery_soc.toNum() - shutdown) / 100) * battery_energy * 60 * 60;
            } else if (battery_power > 0) {
                totalSeconds =
                    ((((state_battery_soc.toNum() - battery_capacity) / 100) * battery_energy) / battery_power) * 60 * 60;
            } else if (battery_power < 0) {
                totalSeconds =
                    ((((battery_capacity - state_battery_soc.toNum(0)) / 100) * battery_energy) / battery_power) * 60 * 60 * -1;
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
                duration += `${days} ${localize('common.days')},`;
            }
            if (hours > 0 || days > 0) {
                duration += `${hours} ${localize('common.hrs')},`;
            }
            duration += `${minutes} ${localize('common.min')}`;
        }

        let isFloating =
            -2 <= parseInt(state_battery_current.state) && parseInt(state_battery_current.state) <= 2 && parseInt(state_battery_soc.state) >= 99;

        // Determine battery colours
        let bat_colour: string;
        if (battery_power < 0 && !isFloating) {
            bat_colour = battery_charge_colour;
        } else {
            bat_colour = battery_colour;
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
            const state = state_inverter_status.state as any;
            inverterState = !Number.isNaN(state) ? Number(state).toFixed(0) : state;
        }

        let typeStatusGroups = inverterSettings.statusGroups;
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
        let production_e = state_day_pv_energy.toNum() + state_day_battery_discharge.toNum();
        let consumption_e = state_day_load_energy.toNum() + state_day_battery_charge.toNum();
        let Autarky = consumption_e != 0 ? Math.max(Math.min(Math.round((production_e * 100) / consumption_e), 100), 0) : 0;
        let Ratio = production_e != 0 ? Math.max(Math.min(Math.round((consumption_e * 100) / production_e), 100), 0) : 0;

        let production_p =
            total_pv +
            Utils.toNum(`${battery_power > 0 ? battery_power : 0}`) +
            Utils.toNum(`${aux_power < 0 ? aux_power * -1 : 0}`);
        //console.log(`Production Data`);
        //console.log(`P_Solar Power:${total_pv}`);
        //console.log(`P_Battery Power:${Utils.toNum(`${battery_power > 0 ? battery_power : 0}`)}`);
        //console.log(`P_Aux Power:${Utils.toNum(`${aux_power < 0 ? aux_power * -1 : 0}`)}`);
        //console.log(`Production Total:${production_p}`);      

        let consumption_p =
            essential +
            nonessential +
            Utils.toNum(`${aux_power > 0 ? aux_power : 0}`) +
            Utils.toNum(`${battery_power < 0 ? battery_power * -1 : 0}`);
        //console.log(`Consumption Data`);
        //console.log(`C_Essential Power:${essential}`);
        //console.log(`C_NonEssential Power:${nonessential}`);
        //console.log(`C_Battery Power:${Utils.toNum(`${battery_power < 0 ? battery_power * -1 : 0}`)}`);
        //console.log(`C_Aux Power:${Utils.toNum(`${aux_power > 0 ? aux_power : 0}`)}`);
        //console.log(`C_Consumption Total:${consumption_p}`);

        let Autarkyp = consumption_p != 0 ? Math.max(Math.min(Math.round((production_p * 100) / consumption_p), 100), 0) : 0;
        let Ratiop = production_p != 0 ? Math.max(Math.min(Math.round((consumption_p * 100) / production_p), 100), 0) : 0;

        let max_linewidth = (Utils.toNum(config.max_line_width) < 1 ? 1 : config.max_line_width) - 1;
        let min_linewidth = Utils.toNum(config.min_line_width) || 1;

        const BatteryMaxPower = this.getEntity('battery.max_power', {state: config.battery.max_power ?? ''});
        let BattMaxPower = BatteryMaxPower.toNum();

        //Calculate line width depending on power usage
        let pv1LineWidth = !config.solar.max_power ? min_linewidth : this.dynamicLineWidth(pv1_power_watts, (config.solar.max_power || pv1_power_watts), max_linewidth, min_linewidth);
        let pv2LineWidth = !config.solar.max_power ? min_linewidth : this.dynamicLineWidth(pv2_power_watts, (config.solar.max_power || pv2_power_watts), max_linewidth, min_linewidth);
        let pv3LineWidth = !config.solar.max_power ? min_linewidth : this.dynamicLineWidth(pv3_power_watts, (config.solar.max_power || pv3_power_watts), max_linewidth, min_linewidth);
        let pv4LineWidth = !config.solar.max_power ? min_linewidth : this.dynamicLineWidth(pv4_power_watts, (config.solar.max_power || pv4_power_watts), max_linewidth, min_linewidth);
        let batLineWidth = !config.battery.max_power ? min_linewidth : this.dynamicLineWidth(Math.abs(battery_power), (BattMaxPower || Math.abs(battery_power)), max_linewidth, min_linewidth);
        let loadLineWidth = !config.load.max_power ? min_linewidth : this.dynamicLineWidth(Math.abs(essential), (config.load.max_power || Math.abs(essential)), max_linewidth, min_linewidth);
        let auxLineWidth = !config.load.max_power ? min_linewidth : this.dynamicLineWidth(Math.abs(aux_power), (config.load.max_power || Math.abs(aux_power)), max_linewidth, min_linewidth);
        let gridLineWidth = !config.grid.max_power ? min_linewidth : this.dynamicLineWidth(Math.abs(total_grid_power), (config.grid.max_power || Math.abs(total_grid_power)), max_linewidth, min_linewidth);
        let grid169LineWidth = !config.grid.max_power ? min_linewidth : this.dynamicLineWidth(Math.abs(grid_power_round), (config.grid.max_power || Math.abs(grid_power_round)), max_linewidth, min_linewidth);
        let nonessLineWidth = !config.grid.max_power ? min_linewidth : this.dynamicLineWidth(Math.abs(nonessential), (config.grid.max_power || Math.abs(nonessential)), max_linewidth, min_linewidth);
        let solarLineWidth = !config.solar.max_power ? min_linewidth : this.dynamicLineWidth(total_pv, (config.solar.max_power || total_pv), max_linewidth, min_linewidth);

        //Calculate power use animation speeds depending on Inverter size
        if (config && config.solar && config.solar.animation_speed) {
            const speed =
                config.solar.animation_speed -
                (config.solar.animation_speed - 1) * (total_pv / (config.solar.max_power || total_pv));
            this.changeAnimationSpeed(`solar`, speed);
        }

        if (config && config.solar && config.solar.animation_speed) {
            const speed =
                config.solar.animation_speed -
                (config.solar.animation_speed - 1) *
                (pv1_power_watts / (config.solar.max_power || pv1_power_watts));
            this.changeAnimationSpeed(`pv1`, speed);
        }

        if (config && config.solar && config.solar.animation_speed) {
            const speed =
                config.solar.animation_speed -
                (config.solar.animation_speed - 1) *
                (pv2_power_watts / (config.solar.max_power || pv2_power_watts));
            this.changeAnimationSpeed(`pv2`, speed);
        }

        if (config && config.solar && config.solar.animation_speed) {
            const speed =
                config.solar.animation_speed -
                (config.solar.animation_speed - 1) *
                (pv3_power_watts / (config.solar.max_power || pv3_power_watts));
            this.changeAnimationSpeed(`pv3`, speed);
        }

        if (config && config.solar && config.solar.animation_speed) {
            const speed =
                config.solar.animation_speed -
                (config.solar.animation_speed - 1) *
                (pv4_power_watts / (config.solar.max_power || pv4_power_watts));
            this.changeAnimationSpeed(`pv4`, speed);
        }

        if (config && config.battery && config.battery.animation_speed) {
            const speed =
                config.battery.animation_speed -
                (config.battery.animation_speed - 1) *
                (Math.abs(battery_power) / (config.battery.max_power || Math.abs(battery_power)));
            this.changeAnimationSpeed(`battery`, speed);
        }

        if (config && config.load && config.load.animation_speed) {
            const speed =
                config.load.animation_speed -
                (config.load.animation_speed - 1) * (Math.abs(essential) / (config.load.max_power || Math.abs(essential)));
            this.changeAnimationSpeed(`load`, speed);
        }

        if (config && config.load && config.load.animation_speed) {
            const speed =
                config.load.animation_speed -
                (config.load.animation_speed - 1) * (Math.abs(aux_power) / (config.load.max_power || Math.abs(aux_power)));
            this.changeAnimationSpeed(`aux`, speed);
        }

        if (config && config.grid && config.grid.animation_speed) {
            const speed =
                config.grid.animation_speed -
                (config.grid.animation_speed - 1) *
                (Math.abs(total_grid_power) / (config.grid.max_power || Math.abs(total_grid_power)));
            this.changeAnimationSpeed(`grid1`, speed);
            this.changeAnimationSpeed(`grid`, speed);
        }

        if (config && config.grid && config.grid.animation_speed) {
            const speed =
                config.grid.animation_speed -
                (config.grid.animation_speed - 1) *
                (Math.abs(nonessential) / (config.grid.max_power || Math.abs(nonessential)));
            this.changeAnimationSpeed(`ne`, speed);
        }

        let round = config.decimal_places;

        //Calculate dynamic colour for load icon based on the contribution of the power source (battery, grid, solar) supplying the load
        const pvPercentage_raw = total_pv === 0
            ? 0
            : priority === 'off' || !priority
                ? battery_power > 0
                    ? (total_pv / (three_phase ? essential + Math.max(aux_power, 0) : essential)) * 100
                    : ((total_pv - Math.abs(battery_power)) / (three_phase ? essential + Math.max(aux_power, 0) : essential)) * 100
                : (total_pv / (three_phase ? essential + Math.max(aux_power, 0) : essential)) * 100;
        const batteryPercentage_raw = battery_power <= 0 ? 0 : (Math.abs(battery_power) / (three_phase ? essential + Math.max(aux_power, 0) : essential)) * 100;

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
        const pvPercentage_raw_bat = (total_pv === 0 || battery_power >= 0)
            ? 0
            : priority === 'off' || !priority
                ? (total_pv / Math.abs(battery_power)) * 100
                : ((total_pv - essential) / Math.abs(battery_power)) * 100;
        const gridPercentage_raw_bat = (battery_power >= 0 || total_grid_power <= 0)
            ? 0
            : priority === 'on'
                ? (total_pv - essential) >= Math.abs(battery_power)
                    ? 0
                    : (total_grid_power - Math.max((essential - total_pv), 0) / Math.abs(battery_power)) * 100
                : total_pv >= Math.abs(battery_power)
                    ? 0
                    : ((Math.abs(battery_power) - total_pv) / Math.abs(battery_power)) * 100;

        //console.log(`${pvPercentage_raw_bat} % RAW PV to charge battery, ${gridPercentage_raw_bat} % RAW Grid to charge battery`);        
        // Normalize percentages
        const totalPercentage_bat = pvPercentage_raw_bat + gridPercentage_raw_bat;
        const normalizedPvPercentage_bat = totalPercentage_bat === 0 ? 0 : (pvPercentage_raw_bat / totalPercentage_bat) * 100;
        const normalizedGridPercentage = totalPercentage_bat === 0 ? 0 : (gridPercentage_raw_bat / totalPercentage_bat) * 100;

        let pvPercentagebat = 0;
        let gridPercentagebat = 0;
        if (totalPercentage_bat > 100) {
            pvPercentagebat = Utils.toNum(normalizedPvPercentage_bat, 0);
            gridPercentagebat = Utils.toNum(normalizedGridPercentage, 0);
        } else {
            pvPercentagebat = Utils.toNum(Math.min(pvPercentage_raw_bat, 100), 0);
            gridPercentagebat = Utils.toNum(Math.min(gridPercentage_raw_bat, 100), 0);
        }

        //console.log(`${pvPercentagebat} % PV to charge battery, ${gridPercentagebat} % Grid to charge battery`);

        const essBat = 'M15 9h1V7.5h4V9h1c.55 0 1 .45 1 1v11c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1V10c0-.55.45-1 1-1m1 2v3h4v-3h-4m-4-5.31l-5 4.5V18h5v2H5v-8H2l10-9l2.78 2.5H14v1.67l-.24.1L12 5.69Z';
        const essGrid = 'M5 20v-8H2l10-9l10 9h-3v8zm7-14.31l-5 4.5V18h10v-7.81zM11.5 18v-4H9l3.5-7v4H15z';
        const essPv = 'M11.6 3.45zM18.25 19.6v-7.6h2.85L11.6 3.45 2.1 12h2.85v7.6zM11.6 6.015l4.75 4.275V17.7H6.85v-7.41zM6.58 2.8v1.42L8 3.508zm-.4 2.4L5.2 6.184l1.5.5zM2.8 6.58 3.508 8l.712-1.42zM6 2.8H2.8v3.2c.228.068.468.1.708.1 1.432.004 2.596-1.16 2.6-2.6-.004-.236-.04-.472-.108-.7M12.5 3.844l2.25 2.026.5-.5-2.24-2.04zM17.71 8.53 18.2 8.04 15.76 5.84 15.26 6.34ZM20.52 11.09l.48-.49-2.31-2.14-.5.5z M18.1299 5.1169 17.318 4.6482l2.4492-1.6171-.75 1.299.8119.4687-2.4492 1.6171z';
        const ess = 'm15 13l-4 4v-3H2v-2h9V9l4 4M5 20v-4h2v2h10v-7.81l-5-4.5L7.21 10H4.22L12 3l10 9h-3v8H5Z';

        let essIcon: string;
        let essIconSize: number;
        switch (true) {
            case pvPercentage_raw >= 100 && batteryPercentage_raw <= 5 && (total_grid_power - nonessential) < 50 && config.load.dynamic_icon:
                essIcon = essPv;
                essIconSize = 1;
                break;
            case batteryPercentage_raw >= 100 && pvPercentage_raw <= 5 && (total_grid_power - nonessential) < 50 && config.load.dynamic_icon:
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
            panel,
            compact,
            height,
            width,
            load_colour,
            bat_colour,
            grid_colour,
            isFloating,
            inverter_colour,
            solar_colour,
            aux_colour,
            aux_off_colour,
            battery_energy,
            font,
            battery_power,
            duration,
            battery_capacity,
            additional_load,
            essIconSize,
            essIcon,
            state_use_timer,
            batteryStateMsg,
            state_battery_soc,
            inverter_prog,
            solar_showdaily,
            batteryPercentage,
            pvPercentage,
            load_showdaily,
            state_energy_cost_sell,
            state_energy_cost_buy,
            load_power_L1,
            load_power_L2,
            load_power_L3,
            durationCur: this.durationCur,
            state_essential_load1,
            state_essential_load2,
            state_essential_load3,
            state_essential_load4,
            grid_power,
            grid_power_L2,
            grid_power_L3,
            round,
            state_essential_load1_extra,
            state_essential_load2_extra,
            load_frequency,
            state_pv4_current,
            grid_showdailybuy,
            grid_showdailysell,
            battery_showdaily,
            inverterModel,
            shutdown,
            useautarky,
            Autarkyp,
            Ratiop,
            Ratio,
            Autarky,
            shutdownoffgrid,
            state_pv1_current,
            state_pv2_current,
            state_pv3_current,
            energy_cost,
            inverter_current,
            inverter_current_L2,
            inverter_current_L3,
            state_radiator_temp,
            inverter_voltage,
            inverter_voltage_L2,
            inverter_voltage_L3,
            battery_voltage,
            state_battery_current,
            batLineWidth,
            total_grid_power,
            solarLineWidth,
            total_pv,
            loadLineWidth,
            pvPercentagebat,
            gridPercentagebat,
            inverter_modern,
            battery0,
            essential,
            pv1LineWidth,
            pv2LineWidth,
            pv3LineWidth,
            pv4LineWidth,
            gridLineWidth,
            pv1_power_watts,
            pv2_power_watts,
            pv3_power_watts,
            pv4_power_watts,
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
            load1e_icon,
            load2e_icon,
            load3e_icon,
            load4e_icon,
            usetimer,
            state_solar_sell,
            priority,
            inverterImg,
            state_day_pv_energy,
            state_pv2_power,
            state_pv3_power,
            state_pv4_power,
            remaining_solar,
            total_solar_generation,
            state_day_load_energy,
            state_day_battery_discharge,
            state_day_grid_import,
            state_day_battery_charge,
            state_day_grid_export,
            state_pv_total,
            state_pv1_power,
            min_linewidth,
            stopColour,
            grid_status,
            batteryCharge,
            grid_off_colour,
            batteryIcon,
            formattedResultTime,
            show_aux,
            nonessential_icon,
            grid_show_noness,
            aux_status,
            noness_dual_load,
            additional_aux_load,
            state_aux_load1_extra,
            load1_icon,
            load2_icon,
            load3_icon,
            inverterStateMsg,
            aux_type,
            state_aux_load2_extra,
            show_dailyaux,
            nonessential,
            aux_power,
            nonessLineWidth,
            grid169LineWidth,
            auxLineWidth,
            aux_load1_icon,
            aux_load2_icon,
            state_day_aux_energy,
            state_aux_load1,
            state_aux_load2,
            state_non_essential_load1,
            state_non_essential_load2,
            state_non_essential_load3,
            inverter_power_round,
            grid_power_round
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
