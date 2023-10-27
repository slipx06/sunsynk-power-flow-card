import { LitElement, html, TemplateResult, CSSResultGroup, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { styles } from './style';
import { inverterProg, sunsynkPowerFlowCardConfig } from './types';
import defaultConfig from './defaults';
import { CARD_VERSION, inverterStatusGroups, validLoadValues, valid3phase } from './const';
import { localize } from './localize/localize';
import merge from 'lodash.merge';

console.groupCollapsed(
  `%c ⚡ SUNSYNK-POWER-FLOW-CARD %c ${localize('common.version')}: ${CARD_VERSION} `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);
console.log("Readme:", "https://github.com/slipx06/sunsynk-power-flow-card"),
  console.groupEnd();

@customElement('sunsynk-power-flow-card')
export class SunsynkPowerFlowCard extends LitElement {
  @property() public hass!: HomeAssistant;
  @property() private _config!: sunsynkPowerFlowCardConfig;

  static get styles(): CSSResultGroup {
    return styles;
  }

  static getStubConfig() {
    return {
      cardstyle: 'lite',
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
      }
    };
  }

  render() {
    const config = this._config;
    const stateObj = this.hass.states[config.entities.day_battery_discharge_71] || { state: '0' };
    const stateObj1 = this.hass.states[config.entities.day_battery_charge_70] || { state: '0' };
    const stateObj2 = this.hass.states[config.entities.day_load_energy_84] || { state: '0' };
    const stateObj3 = this.hass.states[config.entities.day_grid_import_76] || { state: '0' };
    const stateObj4 = this.hass.states[config.entities.day_pv_energy_108] || { state: '0' };
    const stateObj5 = this.hass.states[config.entities.inverter_voltage_154] || { state: '0' };
    const stateObj6 = this.hass.states[config.entities.load_frequency_192] || { state: '0' };
    const stateObj7 = this.hass.states[config.entities.inverter_current_164] || { state: '0' };
    const stateObj8 = this.hass.states[config.entities.pv2_power_187] || { state: '0' };
    const stateObj9 = this.hass.states[config.entities.pv1_power_186] || { state: '0' };
    const stateObj11 = this.hass.states[config.entities.battery_voltage_183] || { state: '0' };
    const stateObj12 = this.hass.states[config.entities.battery_soc_184] || { state: '0' };
    const stateObj13 = this.hass.states[config.entities.battery_power_190] || { state: '0' };
    const stateObj14 = this.hass.states[config.entities.essential_power] || { state: '0' };
    const stateObj15 = this.hass.states[config.entities.grid_ct_power_172] || { state: '0' };
    const stateObj16 = this.hass.states[config.entities.pv1_voltage_109] || { state: '0' };
    const stateObj17 = this.hass.states[config.entities.pv1_current_110] || { state: '0' };
    const stateObj18 = this.hass.states[config.entities.pv2_voltage_111] || { state: '0' };
    const stateObj19 = this.hass.states[config.entities.pv2_current_112] || { state: '0' };
    const stateObj20 = this.hass.states[config.entities.grid_connected_status_194] || { state: 'on' };
    const stateObj21 = this.hass.states[config.entities.inverter_status_59] || { state: '' };
    const stateObj22 = this.hass.states[config.entities.inverter_power_175] || { state: '0' };
    const stateObj23 = this.hass.states[config.entities.grid_power_169] || { state: '0' };
    const stateObj24 = this.hass.states[config.entities.aux_power_166] || { state: '0' };
    const stateObj25 = this.hass.states[config.entities.priority_load_243] || { state: 'undefined' };
    const stateObj26 = this.hass.states[config.entities.use_timer_248] || { state: 'undefined' };
    const stateObj27 = this.hass.states[config.entities.pv3_voltage_113] || { state: '0' };
    const stateObj28 = this.hass.states[config.entities.pv3_current_114] || { state: '0' };
    const stateObj29 = this.hass.states[config.entities.pv4_voltage_115] || { state: '0' };
    const stateObj30 = this.hass.states[config.entities.pv4_current_116] || { state: '0' };
    const stateObj31 = this.hass.states[config.entities.pv3_power_188] || { state: '0' };
    const stateObj32 = this.hass.states[config.entities.pv4_power_189] || { state: '0' };
    const stateObj33 = this.hass.states[config.entities.day_grid_export_77] || { state: '0' };
    const stateObj34 = this.hass.states[config.entities.nonessential_power] || { state: '0' };
    const stateObj35 = this.hass.states[config.entities.battery_current_191] || { state: '0' };
    const stateObj36 = this.hass.states[config.entities.remaining_solar] || { state: 0 };
    const stateObj37 = this.hass.states[config.entities.battery_temp_182] || { state: '' };
    const stateObj38 = this.hass.states[config.entities.dc_transformer_temp_90] || { state: '' };
    const stateObj39 = this.hass.states[config.entities.radiator_temp_91] || { state: '' };
    const stateObj40 = this.hass.states[config.entities.non_essential_load1] || { state: '0' };
    const stateObj41 = this.hass.states[config.entities.non_essential_load2] || { state: '0' };
    const stateObj42 = this.hass.states[config.entities.essential_load1] || { state: '0' };
    const stateObj43 = this.hass.states[config.entities.energy_cost_buy] || { state: '', attributes: { unit_of_measurement: '' } };
    const stateObj44 = this.hass.states[config.entities.solar_sell_247] || { state: 'undefined' };
    const stateObj45 = this.hass.states[config.entities.essential_load2] || { state: '0' };
    const stateObj46 = this.hass.states[config.entities.pv_total] || { state: '0' };
    const stateObj47 = this.hass.states[config.entities.aux_connected_status] || { state: 'on' };
    const stateObj48 = this.hass.states[config.entities.aux_load1] || { state: '0' };
    const stateObj49 = this.hass.states[config.entities.aux_load2] || { state: '0' };
    const stateObj50 = this.hass.states[config.entities.day_aux_energy] || { state: '0' };
    const stateObj51 = this.hass.states[config.entities.energy_cost_sell] || { state: '', attributes: { unit_of_measurement: '' } };
    const stateObj52 = this.hass.states[config.entities.essential_load1_extra] || { state: '0', attributes: { unit_of_measurement: '' } };
    const stateObj53 = this.hass.states[config.entities.essential_load2_extra] || { state: '0', attributes: { unit_of_measurement: '' } };
    const stateObj54 = this.hass.states[config.entities.inverter_voltage_L2] || { state: '' };
    const stateObj55 = this.hass.states[config.entities.inverter_voltage_L3] || { state: '' };
    const stateObj56 = this.hass.states[config.entities.inverter_current_L2] || { state: '' };
    const stateObj57 = this.hass.states[config.entities.inverter_current_L3] || { state: '' };
    const stateObj58 = this.hass.states[config.entities.grid_ct_power_L2] || { state: '' };
    const stateObj59 = this.hass.states[config.entities.grid_ct_power_L3] || { state: '' };
    const stateObj60 = this.hass.states[config.entities.load_power_L1] || { state: '' };
    const stateObj61 = this.hass.states[config.entities.load_power_L2] || { state: '' };
    const stateObj62 = this.hass.states[config.entities.load_power_L3] || { state: '' };
    const stateObj63 = this.hass.states[config.entities.total_pv_generation] || { state: 0 };
    const stateObj64 = this.hass.states[config.entities.essential_load3] || { state: '0' };
    const stateObj65 = this.hass.states[config.entities.essential_load4] || { state: '0' };

    //Set defaults
    let { invert_aux } = config.load;
    let aux_power = (invert_aux === true) ? parseInt(stateObj24.state) * -1 : parseInt(stateObj24.state);
    let { invert_grid } = config.grid;
    let grid_power = (invert_grid === true) ? parseInt(stateObj15.state) * -1 : parseInt(stateObj15.state);
    let grid_power_L2 = (invert_grid === true) ? parseInt(stateObj58.state) * -1 : parseInt(stateObj58.state);
    let grid_power_L3 = (invert_grid === true) ? parseInt(stateObj59.state) * -1 : parseInt(stateObj59.state);
    let inverter_modern = config.inverter?.modern;
    let load_colour = config.load?.colour;
    let aux_colour = config.load?.aux_colour || load_colour;
    let aux_off_colour = config.load?.aux_off_colour || load_colour;
    let load_showdaily = config.load?.show_daily;
    let grid_colour = config.grid?.colour;
    let no_grid_colour = config.grid?.no_grid_colour;
    let grid_show_noness = config.grid?.show_nonessential;
    let grid_status = config.entities?.grid_connected_status_194 ? stateObj20.state : 'on';
    let aux_status = config.entities?.aux_connected_status ? stateObj47.state : 'on';
    let load_frequency = config.entities?.load_frequency_192 ? parseFloat(stateObj6.state).toFixed(2) : 0;
    let inverter_voltage = config.entities?.inverter_voltage_154 ? (config.inverter.three_phase === true && config.cardstyle === 'lite' ? parseFloat(stateObj5.state).toFixed(0) : parseFloat(stateObj5.state).toFixed(1)) : 0;
    let inverter_voltage_L2 = config.entities?.inverter_voltage_L2 ? (config.inverter.three_phase === true && config.cardstyle === 'lite' ? parseFloat(stateObj54.state).toFixed(0) : parseFloat(stateObj54.state).toFixed(1)) : '';
    let inverter_voltage_L3 = config.entities?.inverter_voltage_L3 ? (config.inverter.three_phase === true && config.cardstyle === 'lite' ? parseFloat(stateObj55.state).toFixed(0) : parseFloat(stateObj55.state).toFixed(1)) : '';
    let inverter_current = config.entities?.inverter_current_164 ? (config.inverter.three_phase === true && config.cardstyle === 'full' ? parseFloat(stateObj7.state).toFixed(0) : parseFloat(stateObj7.state).toFixed(1)) : 0;
    let inverter_current_L2 = config.entities?.inverter_current_L2 ? (config.inverter.three_phase === true && config.cardstyle === 'full' ? parseFloat(stateObj56.state).toFixed(0) : parseFloat(stateObj56.state).toFixed(1)) : '';
    let inverter_current_L3 = config.entities?.inverter_current_L3 ? (config.inverter.three_phase === true && config.cardstyle === 'full' ? parseFloat(stateObj57.state).toFixed(0) : parseFloat(stateObj57.state).toFixed(1)) : '';
    let battery_voltage = config.entities?.battery_voltage_183 ? parseFloat(stateObj11.state).toFixed(1) : 0;
    let inverter_power_round = config.entities?.inverter_power_175 ? parseFloat(stateObj22.state).toFixed(0) : 0;
    let grid_power_round = config.entities?.grid_power_169 ? parseFloat(stateObj23.state).toFixed(0) : 0;
    let load_power_L1 = config.entities?.load_power_L1 ? parseFloat(stateObj60.state).toFixed(0) : '';
    let load_power_L2 = config.entities?.load_power_L2 ? parseFloat(stateObj61.state).toFixed(0) : '';
    let load_power_L3 = config.entities?.load_power_L3 ? parseFloat(stateObj62.state).toFixed(0) : '';

    let noness_dual_load = config.grid?.additional_loads;
    if (!validLoadValues.includes(noness_dual_load)) {
      noness_dual_load = 0;
    }

    let grid_showdailybuy = config.grid?.show_daily_buy;
    let grid_showdailysell = config.grid?.show_daily_sell;
    let battery_colour = config.battery?.colour;
    let battery_showdaily = config.battery?.show_daily;
    let solar_colour = config.solar?.colour;
    let solar_showdaily = config.solar?.show_daily;
    let show_aux = config.load?.show_aux;
    let show_dailyaux = config.load?.show_daily_aux;

    let additional_load = config.load?.additional_loads;
    if (!validLoadValues.includes(additional_load) || (config.cardstyle === 'full' && additional_load === 4)) {
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
    let load1e_icon = config.load?.load1_icon; //valid options are boiler, aircon, pump
    let load2e_icon = config.load?.load2_icon; //valid options are boiler, aircon, pump
    let load3e_icon = config.load?.load3_icon;
    let load4e_icon = config.load?.load4_icon;
    let remaining_solar = config.entities.remaining_solar ? parseFloat(stateObj36.state).toFixed(1) : false;
    let total_solar_generation = config.entities.total_pv_generation ? parseFloat(stateObj63.state).toFixed(1) : false;
    let font = config.large_font;
    let panel = config.panel_mode;
    let inverter_colour = config.inverter?.colour;
    let useautarky = config.inverter?.autarky;
    let usetimer = (config.entities.use_timer_248 === false || !config.entities.use_timer_248) ? false : stateObj26.state;
    let priority = (config.entities.priority_load_243 === false || !config.entities.priority_load_243) ? false : stateObj25.state;
    let battery_power = (config.battery?.invert_power === true) ? parseInt(stateObj13.state) * -1 : parseInt(stateObj13.state);
    let height = config.card_height;
    let bat_full = config.battery?.full_capacity;
    let bat_empty = config.battery?.empty_capacity;
    let energy_cost_decimals = config.grid?.energy_cost_decimals === 0 ? 0 : config.grid?.energy_cost_decimals || 2;
    let energy_cost = grid_power >= 0 ? parseFloat(stateObj43.state).toFixed(energy_cost_decimals) : parseFloat(stateObj51.state).toFixed(energy_cost_decimals);

    //let width = config.card_width || '100%'

    //totalsolar = pv1_power_186 + pv2_power_187 + pv3_power_188 + pv4_power_189
    let totalsolar = (
      parseInt(parseFloat(stateObj8.state || '0').toFixed(0)) +
      parseInt(parseFloat(stateObj9.state || '0').toFixed(0)) +
      parseInt(parseFloat(stateObj31.state || '0').toFixed(0)) +
      parseInt(parseFloat(stateObj32.state || '0').toFixed(0))
    );

    let total_pv = config.entities?.pv_total ? parseInt(stateObj46.state) : totalsolar;

    //essential = inverter_power_175 + grid_power_169 - aux_power_166
    let essential = (config.entities.essential_power === 'none' || !config.entities.essential_power) ?
      parseInt(stateObj22.state) + parseInt(stateObj23.state) - parseInt(stateObj24.state) :
      parseInt(stateObj14.state);

    //nonessential = grid_ct_power_172 - grid_power_169
    //let nonessential = (config.entities.nonessential_power === 'none' || !config.entities.nonessential_power) ?
    //  parseInt(stateObj15.state) - parseInt(stateObj23.state) :
    //  parseInt(stateObj34.state);

    
    let three_phase = config.inverter?.three_phase;
    if (!valid3phase.includes(three_phase)) {
      three_phase = false;
    }
  
    let nonessential;
    const { nonessential_power } = config.entities;
     
    if (three_phase === false ) {
      nonessential = (nonessential_power === 'none' || !nonessential_power) ? parseInt(stateObj15.state) - parseInt(stateObj23.state) : parseInt(stateObj34.state);
    } else if (three_phase === true ) {
      nonessential = (nonessential_power === 'none' || !nonessential_power) ? (parseInt(stateObj15.state) + parseInt(stateObj58.state) + parseInt(stateObj59.state)) - parseInt(stateObj23.state) : parseInt(stateObj34.state);
    }  

    //Timer entities
    const prog1 = {
      time: this.hass.states[config.entities.prog1_time] || { state: '' },
      capacity: this.hass.states[config.entities.prog1_capacity] || { state: '' },
      charge: this.hass.states[config.entities.prog1_charge] || { state: '' }
    };
    const prog2 = {
      time: this.hass.states[config.entities.prog2_time] || { state: '' },
      capacity: this.hass.states[config.entities.prog2_capacity] || { state: '' },
      charge: this.hass.states[config.entities.prog2_charge] || { state: '' }
    };
    const prog3 = {
      time: this.hass.states[config.entities.prog3_time] || { state: '' },
      capacity: this.hass.states[config.entities.prog3_capacity] || { state: '' },
      charge: this.hass.states[config.entities.prog3_charge] || { state: '' }
    };
    const prog4 = {
      time: this.hass.states[config.entities.prog4_time] || { state: '' },
      capacity: this.hass.states[config.entities.prog4_capacity] || { state: '' },
      charge: this.hass.states[config.entities.prog4_charge] || { state: '' }
    };
    const prog5 = {
      time: this.hass.states[config.entities.prog5_time] || { state: '' },
      capacity: this.hass.states[config.entities.prog5_capacity] || { state: '' },
      charge: this.hass.states[config.entities.prog5_charge] || { state: '' }
    };
    const prog6 = {
      time: this.hass.states[config.entities.prog6_time] || { state: '' },
      capacity: this.hass.states[config.entities.prog6_capacity] || { state: '' },
      charge: this.hass.states[config.entities.prog6_charge] || { state: '' }
    };

    const shutdownsoc = this.hass.states[config.battery.shutdown_soc] || { state: '' };
    let shutdown = isNaN(parseInt(shutdownsoc.state)) ? config.battery.shutdown_soc : parseInt(shutdownsoc.state);
    let inverter_prog: inverterProg = {
//      capacity: config.battery.shutdown_soc,
      capacity: shutdown,
      entityID: ''
    };
    if (!config.entities.use_timer_248 || config.entities.use_timer_248 === false || stateObj26.state === 'off') {
      inverter_prog.show = false;
    } else if (!config.entities.prog1_time
      || !config.entities.prog2_time
      || !config.entities.prog3_time
      || !config.entities.prog4_time
      || !config.entities.prog5_time
      || !config.entities.prog6_time
    ) {
      inverter_prog.show = false;
    } else {
      inverter_prog.show = true;

      const timer_now = new Date(); // Create a new Date object representing the current time

      const progTimes: Date[] = [];

      [prog1, prog2, prog3, prog4, prog5, prog6].forEach((prog, index) => {
        const [hours, minutes] = prog.time.state.split(":").map(function (item) {
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

    //calculate battery capacity
    let battery_capacity: number = 0;
    if (config.show_battery !== false && battery_power > 0) {
      if (stateObj20.state === "off" || inverter_prog.show === false || parseInt(stateObj12.state) <= inverter_prog.capacity) {
//        battery_capacity = config.battery.shutdown_soc;
        battery_capacity = shutdown;
      } else {
        battery_capacity = inverter_prog.capacity;
      }
    } else if (config.show_battery !== false && battery_power < 0) {
      if (stateObj20.state === "off" || inverter_prog.show === false || parseInt(stateObj12.state) >= inverter_prog.capacity) {
        battery_capacity = 100;
      } else if (parseInt(stateObj12.state) < inverter_prog.capacity) {
        battery_capacity = inverter_prog.capacity;
      }
    }

    //calculate remaining battery time to charge or discharge
    let totalSeconds = 0;
    let formattedResultTime = "";
    let duration = "";

    if (config.show_battery !== false || config.battery.energy !== 0) {
      if (battery_power === 0) {
//        totalSeconds = (((parseInt(stateObj12.state) - config.battery.shutdown_soc) / 100) * config.battery.energy) / 1 * 60 * 60;
        totalSeconds = (((parseInt(stateObj12.state) - shutdown) / 100) * config.battery.energy) / 1 * 60 * 60;
      } else if (battery_power > 0) {
        totalSeconds = (((parseInt(stateObj12.state) - battery_capacity) / 100) * config.battery.energy) / battery_power * 60 * 60;
      } else if (battery_power < 0) {
        totalSeconds = ((((battery_capacity - parseInt(stateObj12.state)) / 100) * config.battery.energy) / battery_power) * 60 * 60 * -1;
      }
      const currentTime = new Date(); // Create a new Date object representing the current time
      const durationMilliseconds = totalSeconds * 1000; // Convert the duration to milliseconds
      const resultTime = new Date(currentTime.getTime() + durationMilliseconds); // Add the duration in milliseconds
      const resultHours = resultTime.getHours(); // Get the hours component of the resulting time
      const resultMinutes = resultTime.getMinutes(); // Get the minutes component of the resulting time
      const formattedMinutes = resultMinutes.toString().padStart(2, "0");
      const formattedHours = resultHours.toString().padStart(2, "0");
      formattedResultTime = `${formattedHours}:${formattedMinutes}`;

      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      if (days > 0) {
        duration += `${days} days, `;
      }
      if (hours > 0 || days > 0) {
        duration += `${hours} hrs, `;
      }
      duration += `${minutes} min`;
    }

    let float = !!((-2 <= parseInt(stateObj35.state)) && (parseInt(stateObj35.state) <= 2) && (parseInt(stateObj12.state) >= 99));

    //Set Inverter Status Message and dot
    let inverterStateColour = "";
    let inverterStateMsg = "";
    let inverterModel = "";
    let found = false;

    if (config.inverter.model !== 'sunsynk' && config.inverter.model !== 'lux') {
      inverterModel = 'sunsynk';
    } else {
      inverterModel = config.inverter.model;
    }

    let typeStatusGroups = inverterStatusGroups[inverterModel];

    for (const groupKey of Object.keys(typeStatusGroups)) {
      const info = typeStatusGroups[groupKey];
      const { states, color, message } = info;
      if (states.includes(stateObj21.state)) {
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


    //Autarky in Percent = Home Production / Home Consumption
    //Ratio in Percent = Home Consumption / Home Production
    //let production_e = parseFloat(stateObj4.state) + parseFloat(stateObj.state);
    //let consumption_e = parseFloat(stateObj2.state) + parseFloat(stateObj1.state);
    let production_e = (
      (isNaN(parseFloat(stateObj4.state)) ? 0 : parseFloat(stateObj4.state)) +
      (isNaN(parseFloat(stateObj.state)) ? 0 : parseFloat(stateObj.state))
    );
    let consumption_e = (
      (isNaN(parseFloat(stateObj2.state)) ? 0 : parseFloat(stateObj2.state)) +
      (isNaN(parseFloat(stateObj1.state)) ? 0 : parseFloat(stateObj1.state))
    );
    let Autarky = consumption_e != 0 ? Math.min(Math.round((production_e * 100) / consumption_e), 100) : 0;
    let Ratio = production_e != 0 ? Math.min(Math.round((consumption_e * 100) / production_e), 100) : 0;

    let production_p = totalsolar + parseInt(`${battery_power > 0 ? battery_power : 0}`) + parseInt(`${aux_power < 0 ? aux_power * -1 : 0}`);
    let consumption_p = essential + nonessential + parseInt(`${aux_power > 0 ? aux_power : 0}`) + parseInt(`${battery_power < 0 ? battery_power * -1 : 0}`);
    let Autarkyp = consumption_p != 0 ? Math.min(Math.round((production_p * 100) / consumption_p), 100) : 0;
    let Ratiop = production_p != 0 ? Math.min(Math.round((consumption_p * 100) / production_p), 100) : 0;

    //Calculate power use animation speeds depending on Inverter size
    let solar_animation_speed = config.solar?.animation_speed;
    if (config && config.solar && config.solar.animation_speed) {
      let speed = config.solar.animation_speed - ((config.solar.animation_speed - 1) * (totalsolar / (config.solar.max_power || totalsolar)));
      solar_animation_speed = speed >= 1 ? speed : 1;
    }

    let battery_animation_speed = config.battery?.animation_speed;
    if (config && config.battery && config.battery.animation_speed) {
      let speed = config.battery.animation_speed - ((config.battery.animation_speed - 1) * ((battery_power < 0 ? battery_power * -1 : battery_power) / (config.battery.max_power || (battery_power < 0 ? battery_power * -1 : battery_power))));
      battery_animation_speed = speed >= 1 ? speed : 1;
    }

    let load_animation_speed = config.load?.animation_speed;
    if (config && config.load && config.load.animation_speed) {
      let speed = config.load.animation_speed - ((config.load.animation_speed - 1) * (essential / (config.load.max_power || essential)));
      load_animation_speed = speed >= 1 ? speed : 1;
    }

    let aux_animation_speed = config.load?.animation_speed;
    if (config && config.load && config.load.animation_speed) {
      let speed = config.load.animation_speed - ((config.load.animation_speed - 1) * ((parseInt(stateObj24.state) < 0 ? parseInt(stateObj24.state) * -1 : parseInt(stateObj24.state)) / (config.load.max_power || (parseInt(stateObj24.state) < 0 ? parseInt(stateObj24.state) * -1 : parseInt(stateObj24.state)))));
      aux_animation_speed = speed >= 1 ? speed : 1;
    }

    let grid_animation_speed = config.grid?.animation_speed;
    if (config && config.grid && config.grid.animation_speed) {
      let speed = config.grid.animation_speed - ((config.grid.animation_speed - 1) * ((parseInt(stateObj15.state) < 0 ? parseInt(stateObj15.state) * -1 : parseInt(stateObj15.state)) / (config.grid.max_power || (parseInt(stateObj15.state) < 0 ? parseInt(stateObj15.state) * -1 : parseInt(stateObj15.state)))));
      grid_animation_speed = speed >= 1 ? speed : 1;
    }

    let ne_animation_speed = config.grid?.animation_speed;
    if (config && config.grid && config.grid.animation_speed) {
      let speed = config.grid.animation_speed - ((config.grid.animation_speed - 1) * (nonessential / (config.grid.max_power || nonessential)));
      ne_animation_speed = speed >= 1 ? speed : 1;
    }

    let round = config.decimal_places;
    function convertValue(value, decimal = 2) {
      let unit = ''; 
      
      if (decimal === null) {
        decimal = 2; // Set rounding to 2 when it's null
      }

      if (Math.abs(value) > 999) {
          unit = 'k'; // Update the unit variable when value > 999
          return `${(value / 1000).toFixed(decimal)} ${unit}W`;
      } else {
          unit = ''; 
          return `${value} ${unit}W`;
      }
    }

    if (config.cardstyle === 'full') {
      return html`
        <ha-card>
        <style>
        .essload-icon {
          color: ${load_colour} !important;
          --mdc-icon-size: 20px;
        }
        .essload1-icon {
          color: ${load_colour} !important;
          --mdc-icon-size: 36px;
        }
        .aux-icon {
          color: ${aux_colour} !important;
          --mdc-icon-size: 70px;
        }
        .aux-small-icon {
          color: ${aux_colour} !important;
          --mdc-icon-size: 24px;
        }
        .aux-off-icon {
          color: ${aux_off_colour} !important;
          --mdc-icon-size: 70px;
        }
        .nonessload-icon {
          color: ${grid_colour} !important;
          --mdc-icon-size: 32px;
        }
        .noness-icon {
          color: ${grid_colour} !important;
          --mdc-icon-size: 70px;
        }
        </style>
        <div class="container card">
        ${config.title ? html`<h1 style="text-align: center; color: ${config.title_colour || 'inherit'}; font-size: ${config.title_size || '32px'};">${config.title}</h1>` : ''}
          <svg viewBox="-0.5 -0.5 457 383" preserveAspectRatio="xMidYMid meet" height="${panel !== true ? `${height}` : '100%'}" width="100%" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
            <rect x="51" y="162" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${solar_colour}" pointer-events="all" display="${config.solar.mppts === 1 ? 'none' : ''}" class="${config.show_solar === false ? 'st12' : ''}"/>
            <rect x="6" y="300.75" width="70" height="70" rx="10.5" ry="10.5" fill="none" stroke="${battery_colour}" pointer-events="all" display="${config.show_battery === false ? 'none' : ''}"/>
            <rect x="234" y="153" width="70" height="70" rx="10.5" ry="10.5" fill="none" stroke="${grid_colour}" pointer-events="all" />
            <rect x="386" y="265" width="70" height="${config.inverter.three_phase === true ? '50' : '30'}" rx="${config.inverter.three_phase === true ? '7.5' : '4.5'}" ry="${config.inverter.three_phase === true ? '7.5' : '4.5'}" fill="none" stroke="${grid_colour}" pointer-events="all" />
            <rect x="237" y="32" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${aux_colour}" pointer-events="all" class="${show_aux !== true ? 'st12' : ''}"/>
            <rect x="236" y="103" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${load_colour}" pointer-events="all"/>
            <rect x="145.15" y="162" width="70" height="50" rx="7.5" ry="7.5" fill="none" stroke="${inverter_colour}" pointer-events="all"/>
            <rect id="pv1" x="0" y="40" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${solar_colour}" pointer-events="all" class="${config.show_solar === false ? 'st12' : ''}"/>
            <rect id ="pv2" x="101" y="40" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${solar_colour}" pointer-events="all" class="${config.show_solar === false || config.solar.mppts === 1 ? 'st12' : ''}"/>
            <rect id="pv3" x="0" y="100" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${solar_colour}" pointer-events="all" class="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 ? 'st12' : ''}"/>
            <rect id="pv4" x="101" y="100" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${solar_colour}" pointer-events="all" class="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 || config.solar.mppts === 3 ? 'st12' : ''}"/>
            <rect id="nonesstotal" x="304" y="265" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${grid_colour}" pointer-events="all" class="${grid_show_noness === false ? 'st12' : ''}"/>
            <rect id="noness1" x="304" y="310" width="70" height="20" rx="4.5" ry="4.5" display="${noness_dual_load === 1 ? '' : 'none'}" fill="none" stroke="${grid_colour}" pointer-events="all" class="${grid_show_noness === false ? 'st12' : ''}"/>
            <rect id="noness2" x="303" y="310" width="35" height="20" rx="4.5" ry="4.5" display="${noness_dual_load === 2 ? '' : 'none'}" fill="none" stroke="${grid_colour}" pointer-events="all" class="${grid_show_noness === false || noness_dual_load === 1 ? 'st12' : ''}"/>
            <rect id="noness2" x="340" y="310" width="35" height="20" rx="4.5" ry="4.5" display="${noness_dual_load === 2 ? '' : 'none'}" fill="none" stroke="${grid_colour}" pointer-events="all" class="${grid_show_noness === false || noness_dual_load === 1 ? 'st12' : ''}"/>
            <rect id="es-load1" x="374" y="${show_aux !== true ? '30' : '143'}" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${load_colour}" pointer-events="all" display="${additional_load === 1 ? '' : 'none'}"/>
            <rect id="es-load2" x="${show_aux !== true ? '376' : '373'}" y="${show_aux !== true ? '30' : '149'}" width="35" height="20" rx="4.5" ry="4.5" fill="none" stroke="${load_colour}" pointer-events="all" display="${additional_load === 2 ? '' : 'none'}"/>
            <rect id="es-load2" x="${show_aux !== true ? '413' : '410'}" y="${show_aux !== true ? '30' : '149'}" width="35" height="20" rx="4.5" ry="4.5" fill="none" stroke="${load_colour}" pointer-events="all" display="${additional_load === 2 ? '' : 'none'}"/>
            <rect id="aux-load1" x="374" y="20" width="70" height="25" rx="4.5" ry="4.5" fill="none" stroke="${aux_colour}" pointer-events="all" display="${show_aux !== true ? 'none' : ''}" class="${additional_aux_load === 1 || additional_aux_load === 2 ? '' : 'st12'}"/>
            <rect id="aux-load2" x="374" y="50" width="70" height="25" rx="4.5" ry="4.5" fill="none" stroke="${aux_colour}" pointer-events="all" display="${show_aux !== true ? 'none' : ''}" class="${additional_aux_load === 2 ? '' : 'st12'}"/>
            <text id="duration" x="132" y="352" class="${font !== true ? 'st14' : 'st4'} left-align" display="${config.show_battery === false ? 'none' : ''}" fill="${config.battery.energy === 0 || float === true || battery_power === 0 ? 'transparent' : `${battery_colour}`}" >${duration}</text>
            <text id="duration_text" x="132" y="368" class="st3 left-align" display="${config.show_battery === false ? 'none' : ''}" fill="${config.battery.energy === 0 || battery_power <= 0 || float === true ? 'transparent' : `${battery_colour}`}" >${localize('common.runtime_to')} ${battery_capacity}% @${formattedResultTime}</text>
            <text id="duration_text_charging" x="132" y="368" class="st3 left-align" display="${config.show_battery === false ? 'none' : ''}" fill="${config.battery.energy === 0 || battery_power >= 0 || float === true ? 'transparent' : `${battery_colour}`}" >${localize('common.to')} ${battery_capacity}% ${localize('common.charge')} @${formattedResultTime}</text>
            <text id="floating" x="132" y="368" class="st3 left-align" display="${config.show_battery === false ? 'none' : ''}" fill="${config.battery.energy === 0 || float === false ? 'transparent' : `${battery_colour}`}" >${localize('common.battery_floating')}</text>
            <text x="0" y="78.5" class="st3 st8 left-align" display="${config.show_solar === false ? 'none' : ''}" fill="${solar_colour}">${config.solar.pv1_name}</text>
            <text x="99" y="78.5" class="st3 st8 left-align" display="${config.show_solar === false || config.solar.mppts === 1 ? 'none' : ''}" fill="${solar_colour}">${config.solar.pv2_name}</text>
            <text x="0" y="139" class="st3 st8 left-align" display="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 ? 'none' : ''}" fill="${solar_colour}">${config.solar.pv3_name}</text>
            <text x="99" y="139" class="st3 st8 left-align" display="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 || config.solar.mppts === 3 ? 'none' : ''}" fill="${solar_colour}">${config.solar.pv4_name}</text>
            <text x="421" y="377" class="st3 st8" fill="${grid_colour}">Grid</text>
            <text x="185" y="306" class="st3" fill="${inverter_colour}">${inverterStateMsg}</text>
            <text x="411" y="157" class="st3 st8" display="${(additional_load === 1 || additional_load === 2) && show_aux === true ? 'none' : ''}" fill="${load_colour}">${localize('common.essential')}</text>
            <text id="ess_load" x="411" y="130" class="st3 st8" display="${additional_load === 0 || show_aux !== true ? 'none' : ''}" fill="${load_colour}">${localize('common.essential')}</text>
            <text id="ess-load1" x="416" y="${show_aux !== true ? 70 : 181}" class="st3 left-align" display="${additional_load === 1 ? '' : 'none'}" fill="${load_colour}" >${config.load.load1_name}</text>
            <text id="ess-load2" x="${show_aux !== true ? 393 : 390}" y="${show_aux !== true ? 59 : 178}" class="st3 st8" display="${additional_load === 2 ? '' : 'none'}" fill="${load_colour}" >${config.load.load1_name}</text>
            <text id="ess-load2" x="${show_aux !== true ? 429 : 426}" y="${show_aux !== true ? 59 : 178}" class="st3 st8" display="${additional_load === 2 ? '' : 'none'}" fill="${load_colour}" >${config.load.load2_name}</text>
            <text id="daily_load_aux" x="${additional_aux_load === 2 ? '238' : '306'}" y="93" class="st3 left-align" fill="${load_showdaily !== true || show_aux !== true ? 'transparent' : `${load_colour}`}" >${localize('common.daily_load')}</text>
            <text id="daily_load" x="${additional_load === 0 ? '377' : '306'}" y="${additional_load === 0 ? 71 : 93}" class="st3 left-align" fill="${load_showdaily !== true || show_aux === true ? 'transparent' : `${load_colour}`}" >${localize('common.daily_load')}</text>
            <text id="daily_solar" x="43.5" y="29" class="st3 left-align" display="${config.solar.display_mode === 1 ? '' : 'none'}" fill="${solar_showdaily !== true || config.show_solar === false ? 'transparent' : `${solar_colour}`}" >${localize('common.daily_solar')}</text>
            <text id="remaining_solar" x="43.5" y="29" class="st3 left-align" display="${config.solar.display_mode === 2 ? '' : 'none'}" fill="${solar_showdaily !== true || config.show_solar === false  ? 'transparent' : `${solar_colour}`}" >${localize('common.daily_solar_left')}</text>
            <text id="total_solar_generation" x="43.5" y="29" class="st3 left-align" display="${config.solar.display_mode === 3 ? '' : 'none'}" fill="${solar_showdaily !== true || config.show_solar === false ? 'transparent' : `${solar_colour}`}" >${localize('common.total_solar_generation')}</text>
            <text id="daily_bat_charge" x="4.5" y="251" class="st3 left-align"  fill="${battery_showdaily !== true || config.show_battery === false ? 'transparent' : `${battery_colour}`}" >${localize('common.daily_charge')}</text>
            <text id="daily_bat_discharge" x="4.5" y="285" class="st3 left-align"  fill="${battery_showdaily !== true || config.show_battery === false ? 'transparent' : `${battery_colour}`}" >${localize('common.daily_discharge')}</text>
            <text id="daily_grid_buy" x="${grid_show_noness === false ? '311' : '347'}" y="${grid_show_noness === false ? '368' : '253'}" class="st3 left-align" fill="${grid_showdailybuy !== true ? 'transparent' : `${grid_colour}`}" >${localize('common.daily_grid_buy')}</text>
            <text id="daily_grid_sell" x="${grid_show_noness === false ? '311' : '347'}" y="${grid_show_noness === false ? '337' : '222'}" class="st3 left-align" fill="${grid_showdailysell !== true ? 'transparent' : `${grid_colour}`}" >${localize('common.daily_grid_sell')}</text>
            <text id="aux_one" x="411" y="82" class="st3 st8" display="${show_aux !== true || additional_aux_load === 1 || additional_aux_load === 2 ? 'none' : ''}" fill="${aux_status === 'on' || aux_status === '1' ? `${aux_colour}` : `${aux_off_colour}`}" >${config.load.aux_name}</text>
            <text id="noness" x="340" y="377" class="st3 st8" display="${grid_show_noness === false ? 'none' : ''}" fill="${grid_colour}">${config.grid.nonessential_name}</text>
            <text id="noness1" x="340"" y="338" class="st3 st8" display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 2 ? 'none' : ''}" fill="${grid_colour}">${config.grid.load1_name}</text>
            <text id="noness2" x="321"" y="338" class="st3 st8" display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}">${config.grid.load1_name}</text>
            <text id="noness2" x="358" y="338" class="st3 st8" display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}">${config.grid.load2_name}</text>
            <text id="autarkye_value" x="212" y="283" display="${useautarky === 'no' ? 'none' : ''}" class="${useautarky === 'energy' ? 'st4 st8 left-align' : 'st12'}" fill="${inverter_colour}" >${Autarky}%</text>
            <text id="ratioe_value" x="251" y="283" display="${useautarky === 'no' ? 'none' : ''}" class="${useautarky === 'energy' ? 'st4 st8 left-align' : 'st12'}" fill="${inverter_colour}" >${Ratio}%</text>
            <text id="autarkyp_value" x="212" y="283" display="${useautarky === 'no' ? 'none' : ''}" class="${useautarky === 'power' ? 'st4 st8 left-align' : 'st12'}" fill="${inverter_colour}" >${Autarkyp}%</text>
            <text id="ratiop_value" x="251" y="283" display="${useautarky === 'no' ? 'none' : ''}" class="${useautarky === 'power' ? 'st4 st8 left-align' : 'st12'}" fill="${inverter_colour}" >${Ratiop}%</text>
            <text id="autarky" x="212" y="295" display="${useautarky === 'no' ? 'none' : ''}" class="st3 left-align" fill="${inverter_colour}" >${localize('common.autarky')}</text>
            <text id="ratio" x="251" y="295" display="${useautarky === 'no' ? 'none' : ''}" class="st3 left-align" fill="${inverter_colour}" >${localize('common.ratio')}</text>
            <text id="aux_load1" x="411" y="${additional_aux_load === 1 ? 53 : 14}" class="st3 st8" display="${show_aux !== true || additional_aux_load === 0 ? 'none' : ''}" fill="${aux_colour}" >${config.load.aux_load1_name}</text>
            <text id="aux_load2" x="411" y="83" class="st3 st8" display="${show_aux !== true || additional_aux_load === 0 || additional_aux_load === 1 ? 'none' : ''}" fill="${aux_colour}" >${config.load.aux_load2_name}</text>
            <text id="aux_daily_text" x="${(additional_aux_load === 1 || additional_aux_load === 2) ? '238' : '306'}" y="24" class="st3 left-align" display="${show_aux !== true || show_dailyaux !== true ? 'none' : ''}" fill="${aux_colour}" >${localize('common.daily_aux')}</text>
            <text id="load-power-3P" x="237" y="142" display="${config.inverter.three_phase === true && config.entities?.load_power_L1 ? '' : 'none'}" class="st3 left-align" fill="${load_colour}" > ${config.inverter.three_phase === true && config.entities?.load_power_L1 ? load_power_L1 : '0'} ${config.inverter.three_phase === true && config.entities?.load_power_L2 ? '| ' + load_power_L2 : ''} ${config.inverter.three_phase === true && config.entities?.load_power_L3 ? '| ' + load_power_L3 : ''} W</text>
            
            <circle id="standby" cx="164" cy="304" r="3.5" fill="${inverterStateColour}"/>

            <path id="es-load1" d="M 409 143 L 409 135" display="${show_aux === true ? '' : 'none'}" class="${additional_load === 1 || additional_load === 2 ? '' : 'st12'}" fill="none" stroke="${load_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <path id="es-load1" d="M 412 80 L 412 60" display="${show_aux !== true ? '' : 'none'}" class="${additional_load === 1 ? '' : 'st12'}" fill="none" stroke="${load_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <path id="es-load2" d="M 412 80 L 412 53" display="${show_aux !== true ? '' : 'none'}" class="${additional_load === 2 ? '' : 'st12'}" fill="none" stroke="${load_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <path id="pv1-line" d="${config.solar.mppts === 1 ? 'M 86 175 M 155 250 L 96 250 Q 86 250 86 240 L 86 56 H 70' : 'M 86 162 L 86 56 Q 86 56 86 56 L 70 56'}" class="${config.show_solar === false ? 'st12' : ''}" fill="none" stroke="${solar_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="pv1-dot" cx="0" cy="0" r="3" class="${config.show_solar === false ? 'st12' : ''}" fill="${parseInt(stateObj9.state) <= 0 ? 'transparent' : `${solar_colour}`}">
              <animateMotion dur="${solar_animation_speed}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#pv1-line"/>
              </animateMotion>
            </circle>
            <path id="pv2-line" d="M 86 162 L 86 56 Q 86 56 86 56 L 101 56" class="${config.show_solar === false || config.solar.mppts === 1 ? 'st12' : ''}" fill="none" stroke="${solar_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="pv2-dot" cx="0" cy="0" r="3" class="${config.show_solar === false || config.solar.mppts === 1 ? 'st12' : ''}" fill="${parseInt(stateObj8.state) <= 0 ? 'transparent' : `${solar_colour}`}">
              <animateMotion dur="${solar_animation_speed}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#pv2-line"/>
              </animateMotion>
            </circle>
            <path id="pv3-line" d="M 86 162 L 86 115 Q 86 115 86 115 L 70 115" class="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 ? 'st12' : ''}" fill="none" stroke="${solar_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="pv3-dot" cx="0" cy="0" r="3" class="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 ? 'st12' : ''}" fill="${parseInt(stateObj31.state) <= 0 ? 'transparent' : `${solar_colour}`}">
              <animateMotion dur="${solar_animation_speed}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#pv3-line"/>
              </animateMotion>
            </circle>
            <path id="pv4-line" d="M 86 162 L 86 115 Q 86 115 86 115 L 101 115" class="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 || config.solar.mppts === 3 ? 'st12' : ''}" fill="none" stroke="${solar_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="pv4-dot" cx="0" cy="0" r="3" class="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 || config.solar.mppts === 3 ? 'st12' : ''}" fill="${parseInt(stateObj32.state) <= 0 ? 'transparent' : `${solar_colour}`}">
              <animateMotion dur="${solar_animation_speed}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#pv4-line"/>
              </animateMotion>
            </circle>
            <path id="so-line" d="M 155 250 L 96 250 Q 86 250 86 240 L 86 192" class="${config.show_solar === false || config.solar.mppts === 1 ? 'st12' : ''}" fill="none" stroke="${solar_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="so-dot" cx="0" cy="0" r="3" class="${config.show_solar === false || config.solar.mppts === 1 ? 'st12' : ''}" fill="${totalsolar === 0 ? 'transparent' : `${solar_colour}`}">
              <animateMotion dur="${solar_animation_speed}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#so-line"/>
              </animateMotion>
            </circle>
            <path id="bat-line" d="M 155 280 L 91 280 Q 85 280 86 286 L 86 297" class="${config.show_battery === false ? 'st12' : ''}" fill="none" stroke="${battery_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="power-dot-charge" cx="0" cy="0" r="3" class="${config.show_battery === false ? 'st12' : ''}" fill="${battery_power < 0 || battery_power === 0 ? 'transparent' : `${battery_colour}`}">
              <animateMotion dur="${battery_animation_speed}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#bat-line"/>
              </animateMotion>
            </circle>
            <circle id="power-dot-discharge" cx="0" cy="0" r="3" class="${config.show_battery === false ? 'st12' : ''}" fill="${battery_power > 0 || battery_power === 0 ? 'transparent' : `${battery_colour}`}">
              <animateMotion dur="${battery_animation_speed}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#bat-line"/>
              </animateMotion>
            </circle>
            <path id="grid-line" d="M 304 188 L 411 188 Q 421 188 421 198 L421 265" fill="none" stroke="${grid_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="grid-dot" cx="0" cy="0" r="3" fill="${grid_power < 0 || grid_power === 0 ? 'transparent' : `${grid_colour}`}">
              <animateMotion dur="${grid_animation_speed}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#grid-line"/>
              </animateMotion>
            </circle>
            <circle id="grid-dot" cx="0" cy="0" r="3" fill="${grid_power > 0 || grid_power === 0 ? 'transparent' : `${grid_colour}`}">
              <animateMotion dur="${grid_animation_speed}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#grid-line"/>
              </animateMotion>
            </circle>
            <path id="grid-line1" d="${config.inverter.three_phase === true ? 'M 421 315 L 421 337' : 'M 421 295 L 421 310.5'}" fill="none" stroke="${grid_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="grid-dot" cx="0" cy="0" r="3" fill="${grid_power < 0 || grid_power === 0 ? 'transparent' : `${grid_colour}`}">
              <animateMotion dur="${grid_animation_speed / 2}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#grid-line1"/>
              </animateMotion>
            </circle>
            <circle id="grid-dot" cx="0" cy="0" r="3" fill="${grid_power > 0 || grid_power === 0 ? 'transparent' : `${grid_colour}`}">
              <animateMotion dur="${grid_animation_speed / 2}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#grid-line1"/>
              </animateMotion>
            </circle>
            <path id="ne-line1" d="M 339 295 L 339 310" fill="none" stroke="${grid_colour}" stroke-width="1" stroke-miterlimit="10" class="${grid_show_noness === false ? 'st12' : ''}" pointer-events="stroke"/>
            <circle id="ne-dot1" cx="0" cy="0" r="3" class="${grid_show_noness === false ? 'st12' : ''}" fill="${nonessential <= 0 ? 'transparent' : `${grid_colour}`}">
              <animateMotion dur="${ne_animation_speed / 2}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#ne-line1"/>
              </animateMotion>
            </circle>
            <path id="ne-line" d="M 339 265 L 339 188" fill="none" stroke="${grid_colour}" stroke-width="1" stroke-miterlimit="10" class="${grid_show_noness === false ? 'st12' : ''}" pointer-events="stroke"/>
            <circle id="ne-dot" cx="0" cy="0" r="3" class="${grid_show_noness === false ? 'st12' : ''}" fill="${nonessential <= 0 ? 'transparent' : `${grid_colour}`}">
              <animateMotion dur="${ne_animation_speed}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#ne-line"/>
              </animateMotion>
            </circle>
            <path id="aux-line" d="M 307 47 L 371.5 47" fill="none" class="${show_aux !== true ? 'st12' : ''}" stroke="${aux_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="aux-dot" cx="0" cy="0" r="3" class="${show_aux !== true || aux_power === 0 ? 'st12' : ''}" fill="${aux_power < 0 ? 'transparent' : `${aux_colour}`}">
              <animateMotion dur="${aux_animation_speed}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#aux-line"/>
              </animateMotion>
            </circle>
            <circle id="aux-dot" cx="0" cy="0" r="3" class="${show_aux !== true || aux_power === 0 ? 'st12' : ''}" fill="${aux_power > 0 ? 'transparent' : `${aux_colour}`}">
              <animateMotion dur="${aux_animation_speed}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#aux-line"/>
              </animateMotion>
            </circle>
            <path id="aux-line2" d="M 200 162 L 200 57 Q 200 47 210 47 L 237 47" fill="none" class="${show_aux !== true ? 'st12' : ''}" stroke="${aux_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <path d="M 215.15 187 L 224.58 187 Q 234 187 234 187.5 L 234 188" fill="none" stroke="${grid_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <path d="M 180.15 212 L 180.15 235" fill="none" stroke="${inverter_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <path id="es-line2" d="M 306 118 L 374 118" fill="none" stroke="${load_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="es-dot" cx="0" cy="0" r="3" fill="${essential === 0 ? 'transparent' : `${load_colour}`}">
              <animateMotion dur="${load_animation_speed}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#es-line2"/>
              </animateMotion>
            </circle>
            <path id="es-line" d="M 235 118 L 212 118 Q 200 118 200 128 L 200 162" fill="none" stroke="${load_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>

            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" x="154.5" y="224.75" width="54" height="79" viewBox="0 0 74 91"  preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)" fill="${inverter_colour}" stroke="none"> <path d="M35 887 l-27 -23 0 -404 0 -404 27 -23 c26 -23 28 -23 329 -23 284 0 305 1 327 19 l24 19 0 412 0 412 -24 19 c-22 18 -43 19 -327 19 -301 0 -303 0 -329 -23z m585 -157 l0 -80 -255 0 -255 0 0 80 0 80 255 0 255 0 0 -80z m-242 -229 c44 -34 40 -46 -14 -46 -60 0 -97 -38 -93 -94 5 -64 -23 -80 -35 -20 -9 44 24 113 63 134 35 18 34 15 21 50 -11 29 -14 30 58 -24z m110 -129 c4 -51 -19 -97 -59 -117 -27 -14 -30 -20 -23 -48 l6 -31 -51 43 c-29 24 -49 46 -46 49 3 4 23 5 44 3 58 -4 95 32 97 95 3 60 1 57 17 52 6 -3 13 -23 15 -46z"/> </g> </svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-high" x="74.5" y="296.25" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) >= bat_full ? 1 : 0}" viewBox="0 0 24 24"><path class="${config.show_battery === false ? 'st12' : ''}" fill="${battery_colour}" d="M 12 20 H 4 V 6 h 8 L 12 20 m 0.67 -16 H 11 V 2 H 5 v 2 H 3.33 C 2.6 4 2 4.6 2 5.33 v 15.34 C 2 21.4 2.6 22 3.33 22 h 9.34 c 0.74 0 1.33 -0.59 1.33 -1.33 V 5.33 C 14 4.6 13.4 4 12.67 4 M 11 16 H 5 v 3 h 6 v -3 m 0 -9 H 5 v 3 h 6 V 7 m 0 4.5 H 5 v 3 h 6 v -3 h -3 h 3"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-med" x="74.5" y="296.25" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) >= 50 && parseInt(stateObj12.state) < bat_full ? 1 : 0}" viewBox="0 0 24 24"><path class="${config.show_battery === false ? 'st12' : ''}" fill="${battery_colour}" d="M 12 20 H 4 V 6 h 8 L 12 20 m 0.67 -16 H 11 V 2 H 5 v 2 H 3.33 C 2.6 4 2 4.6 2 5.33 v 15.34 C 2 21.4 2.6 22 3.33 22 h 9.34 c 0.74 0 1.33 -0.59 1.33 -1.33 V 5.33 C 14 4.6 13.4 4 12.67 4 M 11 16 H 5 v 3 h 6 v -3 m 0 -4.5 H 5 v 3 h 6 v -3 h -3 h 3"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-low" x="74.5" y="296.25" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) > bat_empty && parseInt(stateObj12.state) <= 49 ? '1' : '0'}" viewBox="0 0 24 24"><path class="${config.show_battery === false ? 'st12' : ''}" fill="${battery_colour}" d="M 12 20 H 4 V 6 h 8 L 12 6 L 12 20 m 0.67 -15.999 H 11 V 2 H 5 v 2 H 3.33 C 2.6 4 2 4.6 2 5.33 v 15.34 C 2 21.4 2.6 22 3.33 22 h 9.34 c 0.74 0 1.33 -0.59 1.33 -1.33 V 5.33 C 14 4.6 13.4 4 12.67 4 M 11 16 H 5 v 3 h 6 v -3"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-empty" x="74.5" y="296.25" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) <= bat_empty ? 1 : 0}" viewBox="0 0 24 24"><path class="${config.show_battery === false ? 'st12' : ''}" fill="${battery_colour}" d="M 12 6 L 12 20 M 12 20 H 4 l 0.05 -14 h 7.95 m 0.67 -2 h -1.67 V 2 h -6 v 2 H 3.38 a 1.33 1.33 0 0 0 -1.33 1.33 v 15.34 c 0 0.73 0.6 1.33 1.33 1.33 h 9.34 c 0.73 0 1.33 -0.6 1.33 -1.33 V 5.33 A 1.33 1.33 0 0 0 12.72 4 Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="sun" x="0" y="-0.5" width="40" height="40" viewBox="0 0 24 24"><path class="${config.show_solar === false ? 'st12' : ''}" fill="${solar_colour}" d="M11.45 2v3.55L15 3.77L11.45 2m-1 6L8 10.46l3.75 1.25L10.45 8M2 11.45L3.77 15l1.78-3.55H2M10 2H2v8c.57.17 1.17.25 1.77.25c3.58.01 6.49-2.9 6.5-6.5c-.01-.59-.1-1.18-.27-1.75m7 20v-6h-3l5-9v6h3l-5 9Z"/></svg>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.grid_connected_status_194)}>
              <svg xmlns="http://www.w3.org/2000/svg" id="transmission_on" x="${config.inverter.three_phase === true ? '404' : '387'}" y="${config.inverter.three_phase === true ? '339' : '310'}" width="${config.inverter.three_phase === true ? '34' : '67'}" height="${config.inverter.three_phase === true ? '34' : '67'}" viewBox="0 0 24 24"><path class="${grid_status === 'off' || grid_status === '0' || grid_status === 'Off-Grid' ? 'st12' : ''}" fill="${grid_colour}" d="m8.28 5.45l-1.78-.9L7.76 2h8.47l1.27 2.55l-1.78.89L15 4H9l-.72 1.45M18.62 8h-4.53l-.79-3h-2.6l-.79 3H5.38L4.1 10.55l1.79.89l.73-1.44h10.76l.72 1.45l1.79-.89L18.62 8m-.85 14H15.7l-.24-.9L12 15.9l-3.47 5.2l-.23.9H6.23l2.89-11h2.07l-.36 1.35L12 14.1l1.16-1.75l-.35-1.35h2.07l2.89 11m-6.37-7l-.9-1.35l-1.18 4.48L11.4 15m3.28 3.12l-1.18-4.48l-.9 1.36l2.08 3.12Z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" id="transmission_off" x="${config.inverter.three_phase === true ? '404' : '387'}" y="${config.inverter.three_phase === true ? '339' : '310'}" width="${config.inverter.three_phase === true ? '34' : '67'}" height="${config.inverter.three_phase === true ? '34' : '67'}" viewBox="0 0 24 24"><path class="${grid_status === 'on' || grid_status === '1' || grid_status === 'On-Grid' ? 'st12' : ''}" fill="${no_grid_colour}" d="M22.1 21.5L2.4 1.7L1.1 3l5 5h-.7l-1.3 2.5l1.8.9l.7-1.4h1.5l1 1l-2.9 11h2.1l.2-.9l3.5-5.2l3.5 5.2l.2.9h2.1l-.8-3.2l3.9 3.9l1.2-1.2M9.3 18.1l1.2-4.5l.9 1.3l-2.1 3.2m5.4 0L12.6 15l.2-.3l1.3 1.3l.6 2.1m-.5-7.1h.7l.2.9l-.9-.9m-.1-3h4.5l1.3 2.6l-1.8.9l-.7-1.5h-4.2l-3-3l.5-2h2.6l.8 3M8.4 5.2L6.9 3.7L7.8 2h8.5l1.3 2.5l-1.8.9L15 4H9l-.6 1.2Z"/></svg>
            </a>

            <!-- Nonessential Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" id="noness_default" x="303.5" y="305.5" width="70" height="70" viewBox="0 0 24 24" opacity="${nonessential_icon === 'default' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 2 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}" d="m15 13l-4 4v-3H2v-2h9V9l4 4M5 20v-4h2v2h10v-7.81l-5-4.5L7.21 10H4.22L12 3l10 9h-3v8H5Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness_oven" x="303.5" y="305.5" width="70" height="70" viewBox="0 0 32 32" opacity="${nonessential_icon === 'oven' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 2 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}" d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17Zm24 0A2.5 2.5 0 0 0 24.5 5h-17A2.5 2.5 0 0 0 5 7.5V11h22V7.5Zm0 17V13H5v11.5A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5Zm-17-15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM23.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM9 23v-6h14v6H9Zm-.5-8A1.5 1.5 0 0 0 7 16.5v7A1.5 1.5 0 0 0 8.5 25h15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness_boiler" x="303.5" y="305.5" width="70" height="70" viewBox="0 0 24 24" opacity="${nonessential_icon === 'boiler' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 2 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}" d="M9.3 10.775q0 .475.163.925t.462.825q.05-.3.2-.588t.375-.487L12 10l1.475 1.475q.225.2.375.475t.2.575q.275-.375.487-.8t.213-.9q0-.475-.15-.913t-.45-.812q-.275.125-.563.2T13 9.375q-.75 0-1.375-.425t-.95-1.125q-.3.3-.55.637t-.438.713Q9.5 9.55 9.4 9.95t-.1.825ZM12 12.1l-.425.425q-.1.1-.138.2t-.037.225q0 .25.175.4t.425.15q.25 0 .425-.15t.175-.4q0-.125-.037-.225t-.138-.2L12 12.1ZM12 5v1.9q0 .425.3.713t.725.287q.275 0 .5-.162t.4-.388l.175-.25q1.025.575 1.588 1.563t.562 2.162q0 1.75-1.25 2.963T12 15q-1.75 0-2.975-1.225T7.8 10.8q0-1.925 1.225-3.425T12 5ZM6 22q-.825 0-1.413-.588T4 20V6q0-1.65 1.175-2.825T8 2h8q1.65 0 2.825 1.175T20 6v14q0 .825-.588 1.413T18 22H6Zm0-4v2h12v-2q-.75 0-1.2.5T15 19q-1.35 0-1.763-.5T12 18q-.825 0-1.238.5T9 19q-1.35 0-1.763-.5T6 18Zm3-1q.825 0 1.238-.5T12 16q1.35 0 1.8.5t1.2.5q.75 0 1.2-.5T18 16V6q0-.825-.588-1.413T16 4H8q-.825 0-1.413.588T6 6v10q1.35 0 1.763.5T9 17Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness_pump" x="303.5" y="305.5" width="70" height="70" viewBox="0 0 24 24" opacity="${nonessential_icon === 'pump' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 2 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}" d="M3 17h4.1q-.425-.425-.787-.925T5.675 15H3v2Zm9 0q2.075 0 3.538-1.463T17 12q0-2.075-1.463-3.538T12 7Q9.925 7 8.462 8.463T7 12q0 2.075 1.463 3.538T12 17Zm6.325-8H21V7h-4.1q.425.425.788.925T18.325 9ZM1 20v-8h2v1h2.075q-.05-.25-.063-.488T5 12q0-2.925 2.038-4.963T12 5h9V4h2v8h-2v-1h-2.075q.05.25.063.488T19 12q0 2.925-2.038 4.963T12 19H3v1H1Zm2-3v-2v2Zm18-8V7v2Zm-9 3Zm0 3q-.825 0-1.413-.588T10 13q0-.575.238-1.137t.912-1.613L12 9l.85 1.25q.675 1.05.913 1.613T14 13q0 .825-.588 1.413T12 15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness_ac" x="311" y="312" width="55" height="55" viewBox="0 0 24 24" opacity="${nonessential_icon === 'aircon' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 2 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}" d="M6.59.66c2.34-1.81 4.88.4 5.45 3.84c.43 0 .85.12 1.23.34c.52-.6.98-1.42.8-2.34c-.42-2.15 1.99-3.89 4.28-.92c1.81 2.34-.4 4.88-3.85 5.45c0 .43-.11.86-.34 1.24c.6.51 1.42.97 2.34.79c2.13-.42 3.88 1.98.91 4.28c-2.34 1.81-4.88-.4-5.45-3.84c-.43 0-.85-.13-1.22-.35c-.52.6-.99 1.43-.81 2.35c.42 2.14-1.99 3.89-4.28.92c-1.82-2.35.4-4.89 3.85-5.45c0-.43.13-.85.35-1.23c-.6-.51-1.42-.98-2.35-.8c-2.13.42-3.88-1.98-.91-4.28M5 16h2a2 2 0 0 1 2 2v6H7v-2H5v2H3v-6a2 2 0 0 1 2-2m0 2v2h2v-2H5m7.93-2H15l-2.93 8H10l2.93-8M18 16h3v2h-3v4h3v2h-3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"/></svg>

            <g display="${grid_show_noness === false || noness_dual_load === 2 || noness_dual_load === 1 ? 'none' : ''}" >
              <foreignObject x="303.5" y="303.5" width="85" height="85" style="position: fixed; ">
                <body xmlns="http://www.w3.org/1999/xhtml">
                  <div style="position: fixed; ">
                    <ha-icon icon="${nonessential_icon}" class="noness-icon" ></ha-icon>
                  </div>
                </body>
              </foreignObject>
            </g>

            <!-- Nonessential Load Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" id="noness_default" x="320" y="339" width="38" height="38" viewBox="0 0 24 24" opacity="${load1_icon === 'default' && load2_icon === 'default' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}" d="m15 13l-4 4v-3H2v-2h9V9l4 4M5 20v-4h2v2h10v-7.81l-5-4.5L7.21 10H4.22L12 3l10 9h-3v8H5Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness_default_left" x="306" y="341" width="32" height="32" viewBox="0 0 24 24" opacity="${load1_icon === 'default' && load2_icon != 'default' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}" d="m15 13l-4 4v-3H2v-2h9V9l4 4M5 20v-4h2v2h10v-7.81l-5-4.5L7.21 10H4.22L12 3l10 9h-3v8H5Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness_default_right" x="343" y="341" width="32" height="32" viewBox="0 0 24 24" opacity="${load1_icon != 'default' && load2_icon === 'default' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}" d="m15 13l-4 4v-3H2v-2h9V9l4 4M5 20v-4h2v2h10v-7.81l-5-4.5L7.21 10H4.22L12 3l10 9h-3v8H5Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness_boiler_left" x="306" y="341" width="32" height="32" viewBox="0 0 24 24" opacity="${load1_icon === 'boiler' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}" d="M9.3 10.775q0 .475.163.925t.462.825q.05-.3.2-.588t.375-.487L12 10l1.475 1.475q.225.2.375.475t.2.575q.275-.375.487-.8t.213-.9q0-.475-.15-.913t-.45-.812q-.275.125-.563.2T13 9.375q-.75 0-1.375-.425t-.95-1.125q-.3.3-.55.637t-.438.713Q9.5 9.55 9.4 9.95t-.1.825ZM12 12.1l-.425.425q-.1.1-.138.2t-.037.225q0 .25.175.4t.425.15q.25 0 .425-.15t.175-.4q0-.125-.037-.225t-.138-.2L12 12.1ZM12 5v1.9q0 .425.3.713t.725.287q.275 0 .5-.162t.4-.388l.175-.25q1.025.575 1.588 1.563t.562 2.162q0 1.75-1.25 2.963T12 15q-1.75 0-2.975-1.225T7.8 10.8q0-1.925 1.225-3.425T12 5ZM6 22q-.825 0-1.413-.588T4 20V6q0-1.65 1.175-2.825T8 2h8q1.65 0 2.825 1.175T20 6v14q0 .825-.588 1.413T18 22H6Zm0-4v2h12v-2q-.75 0-1.2.5T15 19q-1.35 0-1.763-.5T12 18q-.825 0-1.238.5T9 19q-1.35 0-1.763-.5T6 18Zm3-1q.825 0 1.238-.5T12 16q1.35 0 1.8.5t1.2.5q.75 0 1.2-.5T18 16V6q0-.825-.588-1.413T16 4H8q-.825 0-1.413.588T6 6v10q1.35 0 1.763.5T9 17Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness_boiler_right" x="343" y="341" width="32" height="32" viewBox="0 0 24 24" opacity="${load2_icon === 'boiler' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}" d="M9.3 10.775q0 .475.163.925t.462.825q.05-.3.2-.588t.375-.487L12 10l1.475 1.475q.225.2.375.475t.2.575q.275-.375.487-.8t.213-.9q0-.475-.15-.913t-.45-.812q-.275.125-.563.2T13 9.375q-.75 0-1.375-.425t-.95-1.125q-.3.3-.55.637t-.438.713Q9.5 9.55 9.4 9.95t-.1.825ZM12 12.1l-.425.425q-.1.1-.138.2t-.037.225q0 .25.175.4t.425.15q.25 0 .425-.15t.175-.4q0-.125-.037-.225t-.138-.2L12 12.1ZM12 5v1.9q0 .425.3.713t.725.287q.275 0 .5-.162t.4-.388l.175-.25q1.025.575 1.588 1.563t.562 2.162q0 1.75-1.25 2.963T12 15q-1.75 0-2.975-1.225T7.8 10.8q0-1.925 1.225-3.425T12 5ZM6 22q-.825 0-1.413-.588T4 20V6q0-1.65 1.175-2.825T8 2h8q1.65 0 2.825 1.175T20 6v14q0 .825-.588 1.413T18 22H6Zm0-4v2h12v-2q-.75 0-1.2.5T15 19q-1.35 0-1.763-.5T12 18q-.825 0-1.238.5T9 19q-1.35 0-1.763-.5T6 18Zm3-1q.825 0 1.238-.5T12 16q1.35 0 1.8.5t1.2.5q.75 0 1.2-.5T18 16V6q0-.825-.588-1.413T16 4H8q-.825 0-1.413.588T6 6v10q1.35 0 1.763.5T9 17Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness_pump_left" x="306" y="341" width="32" height="32" viewBox="0 0 24 24" opacity="${load1_icon === 'pump' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}" d="M3 17h4.1q-.425-.425-.787-.925T5.675 15H3v2Zm9 0q2.075 0 3.538-1.463T17 12q0-2.075-1.463-3.538T12 7Q9.925 7 8.462 8.463T7 12q0 2.075 1.463 3.538T12 17Zm6.325-8H21V7h-4.1q.425.425.788.925T18.325 9ZM1 20v-8h2v1h2.075q-.05-.25-.063-.488T5 12q0-2.925 2.038-4.963T12 5h9V4h2v8h-2v-1h-2.075q.05.25.063.488T19 12q0 2.925-2.038 4.963T12 19H3v1H1Zm2-3v-2v2Zm18-8V7v2Zm-9 3Zm0 3q-.825 0-1.413-.588T10 13q0-.575.238-1.137t.912-1.613L12 9l.85 1.25q.675 1.05.913 1.613T14 13q0 .825-.588 1.413T12 15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness_pump_right" x="343" y="341" width="32" height="32" viewBox="0 0 24 24" opacity="${load2_icon === 'pump' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}" d="M3 17h4.1q-.425-.425-.787-.925T5.675 15H3v2Zm9 0q2.075 0 3.538-1.463T17 12q0-2.075-1.463-3.538T12 7Q9.925 7 8.462 8.463T7 12q0 2.075 1.463 3.538T12 17Zm6.325-8H21V7h-4.1q.425.425.788.925T18.325 9ZM1 20v-8h2v1h2.075q-.05-.25-.063-.488T5 12q0-2.925 2.038-4.963T12 5h9V4h2v8h-2v-1h-2.075q.05.25.063.488T19 12q0 2.925-2.038 4.963T12 19H3v1H1Zm2-3v-2v2Zm18-8V7v2Zm-9 3Zm0 3q-.825 0-1.413-.588T10 13q0-.575.238-1.137t.912-1.613L12 9l.85 1.25q.675 1.05.913 1.613T14 13q0 .825-.588 1.413T12 15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness_oven_left" x="306" y="341" width="32" height="32" viewBox="0 0 32 32" opacity="${load1_icon === 'oven' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}" d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17Zm24 0A2.5 2.5 0 0 0 24.5 5h-17A2.5 2.5 0 0 0 5 7.5V11h22V7.5Zm0 17V13H5v11.5A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5Zm-17-15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM23.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM9 23v-6h14v6H9Zm-.5-8A1.5 1.5 0 0 0 7 16.5v7A1.5 1.5 0 0 0 8.5 25h15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness_oven_right" x="343" y="341" width="32" height="32" viewBox="0 0 32 32" opacity="${load2_icon === 'oven' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}" d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17Zm24 0A2.5 2.5 0 0 0 24.5 5h-17A2.5 2.5 0 0 0 5 7.5V11h22V7.5Zm0 17V13H5v11.5A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5Zm-17-15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM23.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM9 23v-6h14v6H9Zm-.5-8A1.5 1.5 0 0 0 7 16.5v7A1.5 1.5 0 0 0 8.5 25h15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness_ac_left" x="308" y="345" width="25" height="25" viewBox="0 0 24 24" opacity="${load1_icon === 'aircon' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}" d="M6.59.66c2.34-1.81 4.88.4 5.45 3.84c.43 0 .85.12 1.23.34c.52-.6.98-1.42.8-2.34c-.42-2.15 1.99-3.89 4.28-.92c1.81 2.34-.4 4.88-3.85 5.45c0 .43-.11.86-.34 1.24c.6.51 1.42.97 2.34.79c2.13-.42 3.88 1.98.91 4.28c-2.34 1.81-4.88-.4-5.45-3.84c-.43 0-.85-.13-1.22-.35c-.52.6-.99 1.43-.81 2.35c.42 2.14-1.99 3.89-4.28.92c-1.82-2.35.4-4.89 3.85-5.45c0-.43.13-.85.35-1.23c-.6-.51-1.42-.98-2.35-.8c-2.13.42-3.88-1.98-.91-4.28M5 16h2a2 2 0 0 1 2 2v6H7v-2H5v2H3v-6a2 2 0 0 1 2-2m0 2v2h2v-2H5m7.93-2H15l-2.93 8H10l2.93-8M18 16h3v2h-3v4h3v2h-3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness_ac_right" x="345" y="345" width="25" height="25" viewBox="0 0 24 24" opacity="${load2_icon === 'aircon' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}" d="M6.59.66c2.34-1.81 4.88.4 5.45 3.84c.43 0 .85.12 1.23.34c.52-.6.98-1.42.8-2.34c-.42-2.15 1.99-3.89 4.28-.92c1.81 2.34-.4 4.88-3.85 5.45c0 .43-.11.86-.34 1.24c.6.51 1.42.97 2.34.79c2.13-.42 3.88 1.98.91 4.28c-2.34 1.81-4.88-.4-5.45-3.84c-.43 0-.85-.13-1.22-.35c-.52.6-.99 1.43-.81 2.35c.42 2.14-1.99 3.89-4.28.92c-1.82-2.35.4-4.89 3.85-5.45c0-.43.13-.85.35-1.23c-.6-.51-1.42-.98-2.35-.8c-2.13.42-3.88-1.98-.91-4.28M5 16h2a2 2 0 0 1 2 2v6H7v-2H5v2H3v-6a2 2 0 0 1 2-2m0 2v2h2v-2H5m7.93-2H15l-2.93 8H10l2.93-8M18 16h3v2h-3v4h3v2h-3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"/></svg>

            <g display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" >
              <foreignObject x="306" y="341" width="30" height="30" style="position: fixed; ">
                <body xmlns="http://www.w3.org/1999/xhtml" >
                  <div style="position: fixed; ">
                    <ha-icon icon="${load1_icon}" class="nonessload-icon" ></ha-icon>
                  </div>
                </body>
              </foreignObject>
            </g>

            <g display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}">
              <foreignObject x="343" y="341" width="30" height="30" style="position: fixed; ">
                <body xmlns="http://www.w3.org/1999/xhtml">
                  <div style="position: fixed; ">
                    <ha-icon icon="${load2_icon}" class="nonessload-icon" ></ha-icon>
                  </div>
                </body>
              </foreignObject>
            </g>

            <svg xmlns="http://www.w3.org/2000/svg" id="noness1_default" x="324.5" y="341" width="32" height="32" viewBox="0 0 24 24" opacity="${load1_icon === 'default' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 2 ? 'none' : ''}" fill="${grid_colour}" d="m15 13l-4 4v-3H2v-2h9V9l4 4M5 20v-4h2v2h10v-7.81l-5-4.5L7.21 10H4.22L12 3l10 9h-3v8H5Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness1_boiler" x="324.5" y="341" width="32" height="32" viewBox="0 0 24 24" opacity="${load1_icon === 'boiler' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 2 ? 'none' : ''}" fill="${grid_colour}" d="M9.3 10.775q0 .475.163.925t.462.825q.05-.3.2-.588t.375-.487L12 10l1.475 1.475q.225.2.375.475t.2.575q.275-.375.487-.8t.213-.9q0-.475-.15-.913t-.45-.812q-.275.125-.563.2T13 9.375q-.75 0-1.375-.425t-.95-1.125q-.3.3-.55.637t-.438.713Q9.5 9.55 9.4 9.95t-.1.825ZM12 12.1l-.425.425q-.1.1-.138.2t-.037.225q0 .25.175.4t.425.15q.25 0 .425-.15t.175-.4q0-.125-.037-.225t-.138-.2L12 12.1ZM12 5v1.9q0 .425.3.713t.725.287q.275 0 .5-.162t.4-.388l.175-.25q1.025.575 1.588 1.563t.562 2.162q0 1.75-1.25 2.963T12 15q-1.75 0-2.975-1.225T7.8 10.8q0-1.925 1.225-3.425T12 5ZM6 22q-.825 0-1.413-.588T4 20V6q0-1.65 1.175-2.825T8 2h8q1.65 0 2.825 1.175T20 6v14q0 .825-.588 1.413T18 22H6Zm0-4v2h12v-2q-.75 0-1.2.5T15 19q-1.35 0-1.763-.5T12 18q-.825 0-1.238.5T9 19q-1.35 0-1.763-.5T6 18Zm3-1q.825 0 1.238-.5T12 16q1.35 0 1.8.5t1.2.5q.75 0 1.2-.5T18 16V6q0-.825-.588-1.413T16 4H8q-.825 0-1.413.588T6 6v10q1.35 0 1.763.5T9 17Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness1_pump" x="324.5" y="341" width="32" height="32" viewBox="0 0 24 24" opacity="${load1_icon === 'pump' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 2 ? 'none' : ''}" fill="${grid_colour}" d="M3 17h4.1q-.425-.425-.787-.925T5.675 15H3v2Zm9 0q2.075 0 3.538-1.463T17 12q0-2.075-1.463-3.538T12 7Q9.925 7 8.462 8.463T7 12q0 2.075 1.463 3.538T12 17Zm6.325-8H21V7h-4.1q.425.425.788.925T18.325 9ZM1 20v-8h2v1h2.075q-.05-.25-.063-.488T5 12q0-2.925 2.038-4.963T12 5h9V4h2v8h-2v-1h-2.075q.05.25.063.488T19 12q0 2.925-2.038 4.963T12 19H3v1H1Zm2-3v-2v2Zm18-8V7v2Zm-9 3Zm0 3q-.825 0-1.413-.588T10 13q0-.575.238-1.137t.912-1.613L12 9l.85 1.25q.675 1.05.913 1.613T14 13q0 .825-.588 1.413T12 15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness1_oven" x="324.5" y="341" width="32" height="32" viewBox="0 0 32 32" opacity="${load1_icon === 'oven' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 2 ? 'none' : ''}" fill="${grid_colour}" d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17Zm24 0A2.5 2.5 0 0 0 24.5 5h-17A2.5 2.5 0 0 0 5 7.5V11h22V7.5Zm0 17V13H5v11.5A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5Zm-17-15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM23.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM9 23v-6h14v6H9Zm-.5-8A1.5 1.5 0 0 0 7 16.5v7A1.5 1.5 0 0 0 8.5 25h15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="noness1_ac" x="326.5" y="345" width="25" height="25" viewBox="0 0 24 24" opacity="${load1_icon === 'aircon' ? '1' : '0'}"><path display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 2 ? 'none' : ''}" fill="${grid_colour}" d="M6.59.66c2.34-1.81 4.88.4 5.45 3.84c.43 0 .85.12 1.23.34c.52-.6.98-1.42.8-2.34c-.42-2.15 1.99-3.89 4.28-.92c1.81 2.34-.4 4.88-3.85 5.45c0 .43-.11.86-.34 1.24c.6.51 1.42.97 2.34.79c2.13-.42 3.88 1.98.91 4.28c-2.34 1.81-4.88-.4-5.45-3.84c-.43 0-.85-.13-1.22-.35c-.52.6-.99 1.43-.81 2.35c.42 2.14-1.99 3.89-4.28.92c-1.82-2.35.4-4.89 3.85-5.45c0-.43.13-.85.35-1.23c-.6-.51-1.42-.98-2.35-.8c-2.13.42-3.88-1.98-.91-4.28M5 16h2a2 2 0 0 1 2 2v6H7v-2H5v2H3v-6a2 2 0 0 1 2-2m0 2v2h2v-2H5m7.93-2H15l-2.93 8H10l2.93-8M18 16h3v2h-3v4h3v2h-3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"/></svg>

            <g display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 2 ? 'none' : ''}">
              <foreignObject x="324.5" y="341" width="30" height="30" style="position: fixed; ">
                <body xmlns="http://www.w3.org/1999/xhtml">
                  <div style="position: fixed; ">
                    <ha-icon icon="${load1_icon}" class="nonessload-icon" ></ha-icon>
                  </div>
                </body>
              </foreignObject>
            </g>

            <!-- Essential Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" id="essen_aux" x="373.5" y="78.5" width="77" height="77" viewBox="0 0 24 24"><path display="${(additional_load === 1 || additional_load === 2) && show_aux !== true ? '' : 'none'}" fill="${load_colour}" d="M15 9h1V7.5h4V9h1c.55 0 1 .45 1 1v11c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1V10c0-.55.45-1 1-1m1 2v3h4v-3h-4m-4-5.31l-5 4.5V18h5v2H5v-8H2l10-9l2.78 2.5H14v1.67l-.24.1L12 5.69Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="essen_noaux" x="390" y="89" width="38" height="38" viewBox="0 0 24 24"><path display="${(additional_load === 1 || additional_load === 2) && show_aux === true ? '' : 'none'}" fill="${load_colour}" d="M15 9h1V7.5h4V9h1c.55 0 1 .45 1 1v11c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1V10c0-.55.45-1 1-1m1 2v3h4v-3h-4m-4-5.31l-5 4.5V18h5v2H5v-8H2l10-9l2.78 2.5H14v1.67l-.24.1L12 5.69Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="essen_default" x="373.5" y="78.5" width="77" height="77" viewBox="0 0 24 24"><path display="${additional_load === 1 || additional_load === 2 ? 'none' : ''}" fill="${load_colour}" d="M15 9h1V7.5h4V9h1c.55 0 1 .45 1 1v11c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1V10c0-.55.45-1 1-1m1 2v3h4v-3h-4m-4-5.31l-5 4.5V18h5v2H5v-8H2l10-9l2.78 2.5H14v1.67l-.24.1L12 5.69Z"/></svg>

            <!-- Aux Icon -->
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.aux_connected_status)}>
            <svg xmlns="http://www.w3.org/2000/svg" id="aux_default" x="371" y="5" width="83" height="83" viewBox="0 0 24 24"><path class="${aux_type === 'default' ? '' : 'st12'}" display="${show_aux !== true || additional_aux_load === 1 || additional_aux_load === 2 ? 'none' : ''}" fill="${aux_status === 'on' || aux_status === '1' ? `${aux_colour}` : `${aux_off_colour}`}" d="M5 20v-8H2l10-9l10 9h-3v8H5m7-14.31l-5 4.5V18h10v-7.81l-5-4.5M11.5 18v-4H9l3.5-7v4H15l-3.5 7Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="aux_generator" x="374" y="5" width="74" height="74" viewBox="0 0 24 24"><path class="${aux_type === 'gen' ? '' : 'st12'}" display="${show_aux !== true || additional_aux_load === 1 || additional_aux_load === 2 ? 'none' : ''}" fill="${aux_status === 'on' || aux_status === '1' ? `${aux_colour}` : `${aux_off_colour}`}" d="M6 3a2 2 0 0 0-2 2v11h2v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h6v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h2V5a2 2 0 0 0-2-2H6m6 4V5h6v2h-6m0 2h6v2h-6V9M8 5v4h2l-3 6v-4H5l3-6m14 15v2H2v-2h20Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="aux_inverter" x="388" y="8" width="44" height="69" viewBox="0 0 74 91"  preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)" class="${aux_type === 'inverter' ? '' : 'st12'}" display="${show_aux !== true || additional_aux_load === 1 || additional_aux_load === 2 ? 'none' : ''}" fill="${aux_status === 'on' || aux_status === '1' ? `${aux_colour}` : `${aux_off_colour}`}" stroke="none"> <path d="M35 887 l-27 -23 0 -404 0 -404 27 -23 c26 -23 28 -23 329 -23 284 0 305 1 327 19 l24 19 0 412 0 412 -24 19 c-22 18 -43 19 -327 19 -301 0 -303 0 -329 -23z m585 -157 l0 -80 -255 0 -255 0 0 80 0 80 255 0 255 0 0 -80z m-242 -229 c44 -34 40 -46 -14 -46 -60 0 -97 -38 -93 -94 5 -64 -23 -80 -35 -20 -9 44 24 113 63 134 35 18 34 15 21 50 -11 29 -14 30 58 -24z m110 -129 c4 -51 -19 -97 -59 -117 -27 -14 -30 -20 -23 -48 l6 -31 -51 43 c-29 24 -49 46 -46 49 3 4 23 5 44 3 58 -4 95 32 97 95 3 60 1 57 17 52 6 -3 13 -23 15 -46z"/> </g> </svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="aux_oven" x="375" y="5" width="70" height="70" viewBox="0 0 32 32"><path class="${aux_type === 'oven' ? '' : 'st12'}" display="${show_aux !== true || additional_aux_load === 1 || additional_aux_load === 2 ? 'none' : ''}" fill="${aux_status === 'on' || aux_status === '1' ? `${aux_colour}` : `${aux_off_colour}`}" d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17Zm24 0A2.5 2.5 0 0 0 24.5 5h-17A2.5 2.5 0 0 0 5 7.5V11h22V7.5Zm0 17V13H5v11.5A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5Zm-17-15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM23.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM9 23v-6h14v6H9Zm-.5-8A1.5 1.5 0 0 0 7 16.5v7A1.5 1.5 0 0 0 8.5 25h15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="aux_boiler" x="375" y="5" width="70" height="70" viewBox="0 0 24 24"><path class="${aux_type === 'boiler' ? '' : 'st12'}" display="${show_aux !== true || additional_aux_load === 1 || additional_aux_load === 2 ? 'none' : ''}" fill="${aux_status === 'on' || aux_status === '1' ? `${aux_colour}` : `${aux_off_colour}`}" d="M9.3 10.775q0 .475.163.925t.462.825q.05-.3.2-.588t.375-.487L12 10l1.475 1.475q.225.2.375.475t.2.575q.275-.375.487-.8t.213-.9q0-.475-.15-.913t-.45-.812q-.275.125-.563.2T13 9.375q-.75 0-1.375-.425t-.95-1.125q-.3.3-.55.637t-.438.713Q9.5 9.55 9.4 9.95t-.1.825ZM12 12.1l-.425.425q-.1.1-.138.2t-.037.225q0 .25.175.4t.425.15q.25 0 .425-.15t.175-.4q0-.125-.037-.225t-.138-.2L12 12.1ZM12 5v1.9q0 .425.3.713t.725.287q.275 0 .5-.162t.4-.388l.175-.25q1.025.575 1.588 1.563t.562 2.162q0 1.75-1.25 2.963T12 15q-1.75 0-2.975-1.225T7.8 10.8q0-1.925 1.225-3.425T12 5ZM6 22q-.825 0-1.413-.588T4 20V6q0-1.65 1.175-2.825T8 2h8q1.65 0 2.825 1.175T20 6v14q0 .825-.588 1.413T18 22H6Zm0-4v2h12v-2q-.75 0-1.2.5T15 19q-1.35 0-1.763-.5T12 18q-.825 0-1.238.5T9 19q-1.35 0-1.763-.5T6 18Zm3-1q.825 0 1.238-.5T12 16q1.35 0 1.8.5t1.2.5q.75 0 1.2-.5T18 16V6q0-.825-.588-1.413T16 4H8q-.825 0-1.413.588T6 6v10q1.35 0 1.763.5T9 17Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="aux_ac" x="380" y="10" width="60" height="60" viewBox="0 0 24 24"><path class="${aux_type === 'aircon' ? '' : 'st12'}" display="${show_aux !== true || additional_aux_load === 1 || additional_aux_load === 2 ? 'none' : ''}" fill="${aux_status === 'on' || aux_status === '1' ? `${aux_colour}` : `${aux_off_colour}`}" d="M6.59.66c2.34-1.81 4.88.4 5.45 3.84c.43 0 .85.12 1.23.34c.52-.6.98-1.42.8-2.34c-.42-2.15 1.99-3.89 4.28-.92c1.81 2.34-.4 4.88-3.85 5.45c0 .43-.11.86-.34 1.24c.6.51 1.42.97 2.34.79c2.13-.42 3.88 1.98.91 4.28c-2.34 1.81-4.88-.4-5.45-3.84c-.43 0-.85-.13-1.22-.35c-.52.6-.99 1.43-.81 2.35c.42 2.14-1.99 3.89-4.28.92c-1.82-2.35.4-4.89 3.85-5.45c0-.43.13-.85.35-1.23c-.6-.51-1.42-.98-2.35-.8c-2.13.42-3.88-1.98-.91-4.28M5 16h2a2 2 0 0 1 2 2v6H7v-2H5v2H3v-6a2 2 0 0 1 2-2m0 2v2h2v-2H5m7.93-2H15l-2.93 8H10l2.93-8M18 16h3v2h-3v4h3v2h-3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="aux_pump" x="380" y="15" width="60" height="70" viewBox="0 0 24 24"><path class="${aux_type === 'pump' ? '' : 'st12'}" display="${show_aux !== true || additional_aux_load === 1 || additional_aux_load === 2 ? 'none' : ''}" fill="${aux_status === 'on' || aux_status === '1' ? `${aux_colour}` : `${aux_off_colour}`}" d="M3 17h4.1q-.425-.425-.787-.925T5.675 15H3v2Zm9 0q2.075 0 3.538-1.463T17 12q0-2.075-1.463-3.538T12 7Q9.925 7 8.462 8.463T7 12q0 2.075 1.463 3.538T12 17Zm6.325-8H21V7h-4.1q.425.425.788.925T18.325 9ZM1 20v-8h2v1h2.075q-.05-.25-.063-.488T5 12q0-2.925 2.038-4.963T12 5h9V4h2v8h-2v-1h-2.075q.05.25.063.488T19 12q0 2.925-2.038 4.963T12 19H3v1H1Zm2-3v-2v2Zm18-8V7v2Zm-9 3Zm0 3q-.825 0-1.413-.588T10 13q0-.575.238-1.137t.912-1.613L12 9l.85 1.25q.675 1.05.913 1.613T14 13q0 .825-.588 1.413T12 15Z"/></svg>

              <g display="${show_aux !== true || additional_aux_load === 1 || additional_aux_load === 2 ? 'none' : ''}" >
                <foreignObject x="375" y="5" width="85" height="85" style="position: fixed; ">
                  <body xmlns="http://www.w3.org/1999/xhtml" >
                    <div style="position: fixed; ">
                      <ha-icon icon="${aux_type}" class="${aux_status === 'on' || aux_status === '1' ? 'aux-icon' : 'aux-off-icon'}" ></ha-icon>
                    </div>
                  </body>
                </foreignObject>
              </g>
            </a>

              <g display="${show_aux !== true || additional_aux_load === 0 ? 'none' : ''}" >
                <foreignObject x="345" y="18" width="40" height="40" style="position: fixed; ">
                  <body xmlns="http://www.w3.org/1999/xhtml" >
                    <div style="position: fixed; ">
                      <ha-icon icon="${aux_load1_icon}" class="aux-small-icon" ></ha-icon>
                    </div>
                  </body>
                </foreignObject>
              </g>

              <g display="${show_aux !== true || additional_aux_load === 1 || additional_aux_load === 0 ? 'none' : ''}" >
              <foreignObject x="345" y="52" width="40" height="40" style="position: fixed; ">
                <body xmlns="http://www.w3.org/1999/xhtml" >
                  <div style="position: fixed; ">
                    <ha-icon icon="${aux_load2_icon}" class="aux-small-icon" ></ha-icon>
                  </div>
                </body>
              </foreignObject>
            </g>

            <!-- Essential Boiler Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_boiler_left_bottom" x="369" y="123" width="24" height="24" viewBox="0 0 24 24" opacity="${load1e_icon === 'boiler' && additional_load === 2 ? '1' : '0'}"><path display="${show_aux !== true || additional_load === 0 || additional_load === 1 ? 'none' : ''}" fill="${load_colour}" d="M9.3 10.775q0 .475.163.925t.462.825q.05-.3.2-.588t.375-.487L12 10l1.475 1.475q.225.2.375.475t.2.575q.275-.375.487-.8t.213-.9q0-.475-.15-.913t-.45-.812q-.275.125-.563.2T13 9.375q-.75 0-1.375-.425t-.95-1.125q-.3.3-.55.637t-.438.713Q9.5 9.55 9.4 9.95t-.1.825ZM12 12.1l-.425.425q-.1.1-.138.2t-.037.225q0 .25.175.4t.425.15q.25 0 .425-.15t.175-.4q0-.125-.037-.225t-.138-.2L12 12.1ZM12 5v1.9q0 .425.3.713t.725.287q.275 0 .5-.162t.4-.388l.175-.25q1.025.575 1.588 1.563t.562 2.162q0 1.75-1.25 2.963T12 15q-1.75 0-2.975-1.225T7.8 10.8q0-1.925 1.225-3.425T12 5ZM6 22q-.825 0-1.413-.588T4 20V6q0-1.65 1.175-2.825T8 2h8q1.65 0 2.825 1.175T20 6v14q0 .825-.588 1.413T18 22H6Zm0-4v2h12v-2q-.75 0-1.2.5T15 19q-1.35 0-1.763-.5T12 18q-.825 0-1.238.5T9 19q-1.35 0-1.763-.5T6 18Zm3-1q.825 0 1.238-.5T12 16q1.35 0 1.8.5t1.2.5q.75 0 1.2-.5T18 16V6q0-.825-.588-1.413T16 4H8q-.825 0-1.413.588T6 6v10q1.35 0 1.763.5T9 17Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_boiler_right_bottom" x="427" y="123" width="24" height="24" viewBox="0 0 24 24" opacity="${load2e_icon === 'boiler' && additional_load === 2 ? '1' : '0'}"><path display="${show_aux !== true || additional_load === 0 || additional_load === 1 ? 'none' : ''}" fill="${load_colour}" d="M9.3 10.775q0 .475.163.925t.462.825q.05-.3.2-.588t.375-.487L12 10l1.475 1.475q.225.2.375.475t.2.575q.275-.375.487-.8t.213-.9q0-.475-.15-.913t-.45-.812q-.275.125-.563.2T13 9.375q-.75 0-1.375-.425t-.95-1.125q-.3.3-.55.637t-.438.713Q9.5 9.55 9.4 9.95t-.1.825ZM12 12.1l-.425.425q-.1.1-.138.2t-.037.225q0 .25.175.4t.425.15q.25 0 .425-.15t.175-.4q0-.125-.037-.225t-.138-.2L12 12.1ZM12 5v1.9q0 .425.3.713t.725.287q.275 0 .5-.162t.4-.388l.175-.25q1.025.575 1.588 1.563t.562 2.162q0 1.75-1.25 2.963T12 15q-1.75 0-2.975-1.225T7.8 10.8q0-1.925 1.225-3.425T12 5ZM6 22q-.825 0-1.413-.588T4 20V6q0-1.65 1.175-2.825T8 2h8q1.65 0 2.825 1.175T20 6v14q0 .825-.588 1.413T18 22H6Zm0-4v2h12v-2q-.75 0-1.2.5T15 19q-1.35 0-1.763-.5T12 18q-.825 0-1.238.5T9 19q-1.35 0-1.763-.5T6 18Zm3-1q.825 0 1.238-.5T12 16q1.35 0 1.8.5t1.2.5q.75 0 1.2-.5T18 16V6q0-.825-.588-1.413T16 4H8q-.825 0-1.413.588T6 6v10q1.35 0 1.763.5T9 17Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_boiler_left_top" x="382" y="5" width="24" height="24" viewBox="0 0 24 24" opacity="${load1e_icon === 'boiler' && additional_load === 2 && show_aux !== true ? '1' : '0'}"><path display="${additional_load === 0 || additional_load === 1 ? 'none' : ''}" fill="${load_colour}" d="M9.3 10.775q0 .475.163.925t.462.825q.05-.3.2-.588t.375-.487L12 10l1.475 1.475q.225.2.375.475t.2.575q.275-.375.487-.8t.213-.9q0-.475-.15-.913t-.45-.812q-.275.125-.563.2T13 9.375q-.75 0-1.375-.425t-.95-1.125q-.3.3-.55.637t-.438.713Q9.5 9.55 9.4 9.95t-.1.825ZM12 12.1l-.425.425q-.1.1-.138.2t-.037.225q0 .25.175.4t.425.15q.25 0 .425-.15t.175-.4q0-.125-.037-.225t-.138-.2L12 12.1ZM12 5v1.9q0 .425.3.713t.725.287q.275 0 .5-.162t.4-.388l.175-.25q1.025.575 1.588 1.563t.562 2.162q0 1.75-1.25 2.963T12 15q-1.75 0-2.975-1.225T7.8 10.8q0-1.925 1.225-3.425T12 5ZM6 22q-.825 0-1.413-.588T4 20V6q0-1.65 1.175-2.825T8 2h8q1.65 0 2.825 1.175T20 6v14q0 .825-.588 1.413T18 22H6Zm0-4v2h12v-2q-.75 0-1.2.5T15 19q-1.35 0-1.763-.5T12 18q-.825 0-1.238.5T9 19q-1.35 0-1.763-.5T6 18Zm3-1q.825 0 1.238-.5T12 16q1.35 0 1.8.5t1.2.5q.75 0 1.2-.5T18 16V6q0-.825-.588-1.413T16 4H8q-.825 0-1.413.588T6 6v10q1.35 0 1.763.5T9 17Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_boiler_right_top" x="419" y="5" width="24" height="24" viewBox="0 0 24 24" opacity="${load2e_icon === 'boiler' && additional_load === 2 && show_aux !== true ? '1' : '0'}"><path display="${additional_load === 0 || additional_load === 1 ? 'none' : ''}" fill="${load_colour}" d="M9.3 10.775q0 .475.163.925t.462.825q.05-.3.2-.588t.375-.487L12 10l1.475 1.475q.225.2.375.475t.2.575q.275-.375.487-.8t.213-.9q0-.475-.15-.913t-.45-.812q-.275.125-.563.2T13 9.375q-.75 0-1.375-.425t-.95-1.125q-.3.3-.55.637t-.438.713Q9.5 9.55 9.4 9.95t-.1.825ZM12 12.1l-.425.425q-.1.1-.138.2t-.037.225q0 .25.175.4t.425.15q.25 0 .425-.15t.175-.4q0-.125-.037-.225t-.138-.2L12 12.1ZM12 5v1.9q0 .425.3.713t.725.287q.275 0 .5-.162t.4-.388l.175-.25q1.025.575 1.588 1.563t.562 2.162q0 1.75-1.25 2.963T12 15q-1.75 0-2.975-1.225T7.8 10.8q0-1.925 1.225-3.425T12 5ZM6 22q-.825 0-1.413-.588T4 20V6q0-1.65 1.175-2.825T8 2h8q1.65 0 2.825 1.175T20 6v14q0 .825-.588 1.413T18 22H6Zm0-4v2h12v-2q-.75 0-1.2.5T15 19q-1.35 0-1.763-.5T12 18q-.825 0-1.238.5T9 19q-1.35 0-1.763-.5T6 18Zm3-1q.825 0 1.238-.5T12 16q1.35 0 1.8.5t1.2.5q.75 0 1.2-.5T18 16V6q0-.825-.588-1.413T16 4H8q-.825 0-1.413.588T6 6v10q1.35 0 1.763.5T9 17Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_boiler_aux" x="340" y="140" width="36" height="36" viewBox="0 0 24 24" opacity="${load1e_icon === 'boiler' && additional_load === 1 ? '1' : '0'}"><path display="${show_aux !== true || additional_load === 0 || additional_load === 2 ? 'none' : ''}" fill="${load_colour}" d="M9.3 10.775q0 .475.163.925t.462.825q.05-.3.2-.588t.375-.487L12 10l1.475 1.475q.225.2.375.475t.2.575q.275-.375.487-.8t.213-.9q0-.475-.15-.913t-.45-.812q-.275.125-.563.2T13 9.375q-.75 0-1.375-.425t-.95-1.125q-.3.3-.55.637t-.438.713Q9.5 9.55 9.4 9.95t-.1.825ZM12 12.1l-.425.425q-.1.1-.138.2t-.037.225q0 .25.175.4t.425.15q.25 0 .425-.15t.175-.4q0-.125-.037-.225t-.138-.2L12 12.1ZM12 5v1.9q0 .425.3.713t.725.287q.275 0 .5-.162t.4-.388l.175-.25q1.025.575 1.588 1.563t.562 2.162q0 1.75-1.25 2.963T12 15q-1.75 0-2.975-1.225T7.8 10.8q0-1.925 1.225-3.425T12 5ZM6 22q-.825 0-1.413-.588T4 20V6q0-1.65 1.175-2.825T8 2h8q1.65 0 2.825 1.175T20 6v14q0 .825-.588 1.413T18 22H6Zm0-4v2h12v-2q-.75 0-1.2.5T15 19q-1.35 0-1.763-.5T12 18q-.825 0-1.238.5T9 19q-1.35 0-1.763-.5T6 18Zm3-1q.825 0 1.238-.5T12 16q1.35 0 1.8.5t1.2.5q.75 0 1.2-.5T18 16V6q0-.825-.588-1.413T16 4H8q-.825 0-1.413.588T6 6v10q1.35 0 1.763.5T9 17Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_boiler_noaux" x="340" y="27" width="36" height="36" viewBox="0 0 24 24" opacity="${load1e_icon === 'boiler' && additional_load === 1 && show_aux !== true ? '1' : '0'}"><path display="${additional_load === 0 || additional_load === 2 ? 'none' : ''}" fill="${load_colour}" d="M9.3 10.775q0 .475.163.925t.462.825q.05-.3.2-.588t.375-.487L12 10l1.475 1.475q.225.2.375.475t.2.575q.275-.375.487-.8t.213-.9q0-.475-.15-.913t-.45-.812q-.275.125-.563.2T13 9.375q-.75 0-1.375-.425t-.95-1.125q-.3.3-.55.637t-.438.713Q9.5 9.55 9.4 9.95t-.1.825ZM12 12.1l-.425.425q-.1.1-.138.2t-.037.225q0 .25.175.4t.425.15q.25 0 .425-.15t.175-.4q0-.125-.037-.225t-.138-.2L12 12.1ZM12 5v1.9q0 .425.3.713t.725.287q.275 0 .5-.162t.4-.388l.175-.25q1.025.575 1.588 1.563t.562 2.162q0 1.75-1.25 2.963T12 15q-1.75 0-2.975-1.225T7.8 10.8q0-1.925 1.225-3.425T12 5ZM6 22q-.825 0-1.413-.588T4 20V6q0-1.65 1.175-2.825T8 2h8q1.65 0 2.825 1.175T20 6v14q0 .825-.588 1.413T18 22H6Zm0-4v2h12v-2q-.75 0-1.2.5T15 19q-1.35 0-1.763-.5T12 18q-.825 0-1.238.5T9 19q-1.35 0-1.763-.5T6 18Zm3-1q.825 0 1.238-.5T12 16q1.35 0 1.8.5t1.2.5q.75 0 1.2-.5T18 16V6q0-.825-.588-1.413T16 4H8q-.825 0-1.413.588T6 6v10q1.35 0 1.763.5T9 17Z"/></svg>

            <!-- Essential Aircon Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_ac_left_bottom" x="371" y="124" width="20" height="20" viewBox="0 0 24 24" opacity="${load1e_icon === 'aircon' && additional_load === 2 ? '1' : '0'}"><path display="${show_aux !== true || additional_load === 0 || additional_load === 1 ? 'none' : ''}" fill="${load_colour}" d="M6.59.66c2.34-1.81 4.88.4 5.45 3.84c.43 0 .85.12 1.23.34c.52-.6.98-1.42.8-2.34c-.42-2.15 1.99-3.89 4.28-.92c1.81 2.34-.4 4.88-3.85 5.45c0 .43-.11.86-.34 1.24c.6.51 1.42.97 2.34.79c2.13-.42 3.88 1.98.91 4.28c-2.34 1.81-4.88-.4-5.45-3.84c-.43 0-.85-.13-1.22-.35c-.52.6-.99 1.43-.81 2.35c.42 2.14-1.99 3.89-4.28.92c-1.82-2.35.4-4.89 3.85-5.45c0-.43.13-.85.35-1.23c-.6-.51-1.42-.98-2.35-.8c-2.13.42-3.88-1.98-.91-4.28M5 16h2a2 2 0 0 1 2 2v6H7v-2H5v2H3v-6a2 2 0 0 1 2-2m0 2v2h2v-2H5m7.93-2H15l-2.93 8H10l2.93-8M18 16h3v2h-3v4h3v2h-3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_ac_right_bottom" x="429" y="124" width="20" height="20" viewBox="0 0 24 24" opacity="${load2e_icon === 'aircon' && additional_load === 2 ? '1' : '0'}"><path display="${show_aux !== true || additional_load === 0 || additional_load === 1 ? 'none' : ''}" fill="${load_colour}" d="M6.59.66c2.34-1.81 4.88.4 5.45 3.84c.43 0 .85.12 1.23.34c.52-.6.98-1.42.8-2.34c-.42-2.15 1.99-3.89 4.28-.92c1.81 2.34-.4 4.88-3.85 5.45c0 .43-.11.86-.34 1.24c.6.51 1.42.97 2.34.79c2.13-.42 3.88 1.98.91 4.28c-2.34 1.81-4.88-.4-5.45-3.84c-.43 0-.85-.13-1.22-.35c-.52.6-.99 1.43-.81 2.35c.42 2.14-1.99 3.89-4.28.92c-1.82-2.35.4-4.89 3.85-5.45c0-.43.13-.85.35-1.23c-.6-.51-1.42-.98-2.35-.8c-2.13.42-3.88-1.98-.91-4.28M5 16h2a2 2 0 0 1 2 2v6H7v-2H5v2H3v-6a2 2 0 0 1 2-2m0 2v2h2v-2H5m7.93-2H15l-2.93 8H10l2.93-8M18 16h3v2h-3v4h3v2h-3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_ac_left_top" x="382" y="6" width="20" height="20" viewBox="0 0 24 24" opacity="${load1e_icon === 'aircon' && additional_load === 2 && show_aux !== true ? '1' : '0'}"><path display="${additional_load === 0 || additional_load === 1 ? 'none' : ''}" fill="${load_colour}" d="M6.59.66c2.34-1.81 4.88.4 5.45 3.84c.43 0 .85.12 1.23.34c.52-.6.98-1.42.8-2.34c-.42-2.15 1.99-3.89 4.28-.92c1.81 2.34-.4 4.88-3.85 5.45c0 .43-.11.86-.34 1.24c.6.51 1.42.97 2.34.79c2.13-.42 3.88 1.98.91 4.28c-2.34 1.81-4.88-.4-5.45-3.84c-.43 0-.85-.13-1.22-.35c-.52.6-.99 1.43-.81 2.35c.42 2.14-1.99 3.89-4.28.92c-1.82-2.35.4-4.89 3.85-5.45c0-.43.13-.85.35-1.23c-.6-.51-1.42-.98-2.35-.8c-2.13.42-3.88-1.98-.91-4.28M5 16h2a2 2 0 0 1 2 2v6H7v-2H5v2H3v-6a2 2 0 0 1 2-2m0 2v2h2v-2H5m7.93-2H15l-2.93 8H10l2.93-8M18 16h3v2h-3v4h3v2h-3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_ac_right_top" x="419" y="6" width="20" height="20" viewBox="0 0 24 24" opacity="${load2e_icon === 'aircon' && additional_load === 2 && show_aux !== true ? '1' : '0'}"><path display="${additional_load === 0 || additional_load === 1 ? 'none' : ''}" fill="${load_colour}" d="M6.59.66c2.34-1.81 4.88.4 5.45 3.84c.43 0 .85.12 1.23.34c.52-.6.98-1.42.8-2.34c-.42-2.15 1.99-3.89 4.28-.92c1.81 2.34-.4 4.88-3.85 5.45c0 .43-.11.86-.34 1.24c.6.51 1.42.97 2.34.79c2.13-.42 3.88 1.98.91 4.28c-2.34 1.81-4.88-.4-5.45-3.84c-.43 0-.85-.13-1.22-.35c-.52.6-.99 1.43-.81 2.35c.42 2.14-1.99 3.89-4.28.92c-1.82-2.35.4-4.89 3.85-5.45c0-.43.13-.85.35-1.23c-.6-.51-1.42-.98-2.35-.8c-2.13.42-3.88-1.98-.91-4.28M5 16h2a2 2 0 0 1 2 2v6H7v-2H5v2H3v-6a2 2 0 0 1 2-2m0 2v2h2v-2H5m7.93-2H15l-2.93 8H10l2.93-8M18 16h3v2h-3v4h3v2h-3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_ac_aux" x="342" y="143" width="30" height="30" viewBox="0 0 24 24" opacity="${load1e_icon === 'aircon' && additional_load === 1 ? '1' : '0'}"><path display="${show_aux !== true || additional_load === 0 || additional_load === 2 ? 'none' : ''}" fill="${load_colour}" d="M6.59.66c2.34-1.81 4.88.4 5.45 3.84c.43 0 .85.12 1.23.34c.52-.6.98-1.42.8-2.34c-.42-2.15 1.99-3.89 4.28-.92c1.81 2.34-.4 4.88-3.85 5.45c0 .43-.11.86-.34 1.24c.6.51 1.42.97 2.34.79c2.13-.42 3.88 1.98.91 4.28c-2.34 1.81-4.88-.4-5.45-3.84c-.43 0-.85-.13-1.22-.35c-.52.6-.99 1.43-.81 2.35c.42 2.14-1.99 3.89-4.28.92c-1.82-2.35.4-4.89 3.85-5.45c0-.43.13-.85.35-1.23c-.6-.51-1.42-.98-2.35-.8c-2.13.42-3.88-1.98-.91-4.28M5 16h2a2 2 0 0 1 2 2v6H7v-2H5v2H3v-6a2 2 0 0 1 2-2m0 2v2h2v-2H5m7.93-2H15l-2.93 8H10l2.93-8M18 16h3v2h-3v4h3v2h-3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_ac_noaux" x="342" y="30" width="30" height="30" viewBox="0 0 24 24" opacity="${load1e_icon === 'aircon' && additional_load === 1 && show_aux !== true ? '1' : '0'}"><path display="${additional_load === 0 || additional_load === 2 ? 'none' : ''}" fill="${load_colour}" d="M6.59.66c2.34-1.81 4.88.4 5.45 3.84c.43 0 .85.12 1.23.34c.52-.6.98-1.42.8-2.34c-.42-2.15 1.99-3.89 4.28-.92c1.81 2.34-.4 4.88-3.85 5.45c0 .43-.11.86-.34 1.24c.6.51 1.42.97 2.34.79c2.13-.42 3.88 1.98.91 4.28c-2.34 1.81-4.88-.4-5.45-3.84c-.43 0-.85-.13-1.22-.35c-.52.6-.99 1.43-.81 2.35c.42 2.14-1.99 3.89-4.28.92c-1.82-2.35.4-4.89 3.85-5.45c0-.43.13-.85.35-1.23c-.6-.51-1.42-.98-2.35-.8c-2.13.42-3.88-1.98-.91-4.28M5 16h2a2 2 0 0 1 2 2v6H7v-2H5v2H3v-6a2 2 0 0 1 2-2m0 2v2h2v-2H5m7.93-2H15l-2.93 8H10l2.93-8M18 16h3v2h-3v4h3v2h-3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"/></svg>

            <!-- Essential Pump Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_pump_left_bottom" x="371" y="125" width="20" height="25" viewBox="0 0 24 24" opacity="${load1e_icon === 'pump' && additional_load === 2 ? '1' : '0'}"><path display="${show_aux !== true || additional_load === 0 || additional_load === 1 ? 'none' : ''}" fill="${load_colour}" d="M3 17h4.1q-.425-.425-.787-.925T5.675 15H3v2Zm9 0q2.075 0 3.538-1.463T17 12q0-2.075-1.463-3.538T12 7Q9.925 7 8.462 8.463T7 12q0 2.075 1.463 3.538T12 17Zm6.325-8H21V7h-4.1q.425.425.788.925T18.325 9ZM1 20v-8h2v1h2.075q-.05-.25-.063-.488T5 12q0-2.925 2.038-4.963T12 5h9V4h2v8h-2v-1h-2.075q.05.25.063.488T19 12q0 2.925-2.038 4.963T12 19H3v1H1Zm2-3v-2v2Zm18-8V7v2Zm-9 3Zm0 3q-.825 0-1.413-.588T10 13q0-.575.238-1.137t.912-1.613L12 9l.85 1.25q.675 1.05.913 1.613T14 13q0 .825-.588 1.413T12 15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_pump_right_bottom" x="429" y="125" width="20" height="25" viewBox="0 0 24 24" opacity="${load2e_icon === 'pump' && additional_load === 2 ? '1' : '0'}"><path display="${show_aux !== true || additional_load === 0 || additional_load === 1 ? 'none' : ''}" fill="${load_colour}" d="M3 17h4.1q-.425-.425-.787-.925T5.675 15H3v2Zm9 0q2.075 0 3.538-1.463T17 12q0-2.075-1.463-3.538T12 7Q9.925 7 8.462 8.463T7 12q0 2.075 1.463 3.538T12 17Zm6.325-8H21V7h-4.1q.425.425.788.925T18.325 9ZM1 20v-8h2v1h2.075q-.05-.25-.063-.488T5 12q0-2.925 2.038-4.963T12 5h9V4h2v8h-2v-1h-2.075q.05.25.063.488T19 12q0 2.925-2.038 4.963T12 19H3v1H1Zm2-3v-2v2Zm18-8V7v2Zm-9 3Zm0 3q-.825 0-1.413-.588T10 13q0-.575.238-1.137t.912-1.613L12 9l.85 1.25q.675 1.05.913 1.613T14 13q0 .825-.588 1.413T12 15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_pump_left_top" x="383" y="7" width="20" height="25" viewBox="0 0 24 24" opacity="${load1e_icon === 'pump' && additional_load === 2 && show_aux !== true ? '1' : '0'}"><path display="${additional_load === 0 || additional_load === 1 ? 'none' : ''}" fill="${load_colour}" d="M3 17h4.1q-.425-.425-.787-.925T5.675 15H3v2Zm9 0q2.075 0 3.538-1.463T17 12q0-2.075-1.463-3.538T12 7Q9.925 7 8.462 8.463T7 12q0 2.075 1.463 3.538T12 17Zm6.325-8H21V7h-4.1q.425.425.788.925T18.325 9ZM1 20v-8h2v1h2.075q-.05-.25-.063-.488T5 12q0-2.925 2.038-4.963T12 5h9V4h2v8h-2v-1h-2.075q.05.25.063.488T19 12q0 2.925-2.038 4.963T12 19H3v1H1Zm2-3v-2v2Zm18-8V7v2Zm-9 3Zm0 3q-.825 0-1.413-.588T10 13q0-.575.238-1.137t.912-1.613L12 9l.85 1.25q.675 1.05.913 1.613T14 13q0 .825-.588 1.413T12 15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_pump_right_top" x="421" y="7" width="20" height="25" viewBox="0 0 24 24" opacity="${load2e_icon === 'pump' && additional_load === 2 && show_aux !== true ? '1' : '0'}"><path display="${additional_load === 0 || additional_load === 1 ? 'none' : ''}" fill="${load_colour}" d="M3 17h4.1q-.425-.425-.787-.925T5.675 15H3v2Zm9 0q2.075 0 3.538-1.463T17 12q0-2.075-1.463-3.538T12 7Q9.925 7 8.462 8.463T7 12q0 2.075 1.463 3.538T12 17Zm6.325-8H21V7h-4.1q.425.425.788.925T18.325 9ZM1 20v-8h2v1h2.075q-.05-.25-.063-.488T5 12q0-2.925 2.038-4.963T12 5h9V4h2v8h-2v-1h-2.075q.05.25.063.488T19 12q0 2.925-2.038 4.963T12 19H3v1H1Zm2-3v-2v2Zm18-8V7v2Zm-9 3Zm0 3q-.825 0-1.413-.588T10 13q0-.575.238-1.137t.912-1.613L12 9l.85 1.25q.675 1.05.913 1.613T14 13q0 .825-.588 1.413T12 15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_pump_aux" x="336" y="140" width="36" height="36" viewBox="0 0 24 24" opacity="${load1e_icon === 'pump' && additional_load === 1 ? '1' : '0'}"><path display="${show_aux !== true || additional_load === 0 || additional_load === 2 ? 'none' : ''}" fill="${load_colour}" d="M3 17h4.1q-.425-.425-.787-.925T5.675 15H3v2Zm9 0q2.075 0 3.538-1.463T17 12q0-2.075-1.463-3.538T12 7Q9.925 7 8.462 8.463T7 12q0 2.075 1.463 3.538T12 17Zm6.325-8H21V7h-4.1q.425.425.788.925T18.325 9ZM1 20v-8h2v1h2.075q-.05-.25-.063-.488T5 12q0-2.925 2.038-4.963T12 5h9V4h2v8h-2v-1h-2.075q.05.25.063.488T19 12q0 2.925-2.038 4.963T12 19H3v1H1Zm2-3v-2v2Zm18-8V7v2Zm-9 3Zm0 3q-.825 0-1.413-.588T10 13q0-.575.238-1.137t.912-1.613L12 9l.85 1.25q.675 1.05.913 1.613T14 13q0 .825-.588 1.413T12 15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_pump_noaux" x="336" y="27" width="36" height="36" viewBox="0 0 24 24" opacity="${load1e_icon === 'pump' && additional_load === 1 && show_aux !== true ? '1' : '0'}"><path display="${additional_load === 0 || additional_load === 2 ? 'none' : ''}" fill="${load_colour}" d="M3 17h4.1q-.425-.425-.787-.925T5.675 15H3v2Zm9 0q2.075 0 3.538-1.463T17 12q0-2.075-1.463-3.538T12 7Q9.925 7 8.462 8.463T7 12q0 2.075 1.463 3.538T12 17Zm6.325-8H21V7h-4.1q.425.425.788.925T18.325 9ZM1 20v-8h2v1h2.075q-.05-.25-.063-.488T5 12q0-2.925 2.038-4.963T12 5h9V4h2v8h-2v-1h-2.075q.05.25.063.488T19 12q0 2.925-2.038 4.963T12 19H3v1H1Zm2-3v-2v2Zm18-8V7v2Zm-9 3Zm0 3q-.825 0-1.413-.588T10 13q0-.575.238-1.137t.912-1.613L12 9l.85 1.25q.675 1.05.913 1.613T14 13q0 .825-.588 1.413T12 15Z"/></svg>

            <!-- Essential Oven Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_oven_left_bottom" x="371" y="126" width="20" height="20" viewBox="0 0 32 32" opacity="${load1e_icon === 'oven' && additional_load === 2 ? '1' : '0'}"><path display="${show_aux !== true || additional_load === 0 || additional_load === 1 ? 'none' : ''}" fill="${load_colour}" d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17Zm24 0A2.5 2.5 0 0 0 24.5 5h-17A2.5 2.5 0 0 0 5 7.5V11h22V7.5Zm0 17V13H5v11.5A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5Zm-17-15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM23.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM9 23v-6h14v6H9Zm-.5-8A1.5 1.5 0 0 0 7 16.5v7A1.5 1.5 0 0 0 8.5 25h15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_oven_right_bottom" x="429" y="126" width="20" height="20" viewBox="0 0 32 32" opacity="${load2e_icon === 'oven' && additional_load === 2 ? '1' : '0'}"><path display="${show_aux !== true || additional_load === 0 || additional_load === 1 ? 'none' : ''}" fill="${load_colour}" d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17Zm24 0A2.5 2.5 0 0 0 24.5 5h-17A2.5 2.5 0 0 0 5 7.5V11h22V7.5Zm0 17V13H5v11.5A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5Zm-17-15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM23.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM9 23v-6h14v6H9Zm-.5-8A1.5 1.5 0 0 0 7 16.5v7A1.5 1.5 0 0 0 8.5 25h15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_oven_left_top" x="382" y="5" width="24" height="24" viewBox="0 0 32 32" opacity="${load1e_icon === 'oven' && additional_load === 2 && show_aux !== true ? '1' : '0'}"><path display="${additional_load === 0 || additional_load === 1 ? 'none' : ''}" fill="${load_colour}" d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17Zm24 0A2.5 2.5 0 0 0 24.5 5h-17A2.5 2.5 0 0 0 5 7.5V11h22V7.5Zm0 17V13H5v11.5A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5Zm-17-15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM23.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM9 23v-6h14v6H9Zm-.5-8A1.5 1.5 0 0 0 7 16.5v7A1.5 1.5 0 0 0 8.5 25h15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_oven_right_top" x="419" y="5" width="24" height="24" viewBox="0 0 32 32" opacity="${load2e_icon === 'oven' && additional_load === 2 && show_aux !== true ? '1' : '0'}"><path display="${additional_load === 0 || additional_load === 1 ? 'none' : ''}" fill="${load_colour}" d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17Zm24 0A2.5 2.5 0 0 0 24.5 5h-17A2.5 2.5 0 0 0 5 7.5V11h22V7.5Zm0 17V13H5v11.5A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5Zm-17-15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM23.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM9 23v-6h14v6H9Zm-.5-8A1.5 1.5 0 0 0 7 16.5v7A1.5 1.5 0 0 0 8.5 25h15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_oven_noaux" x="336" y="27" width="36" height="36" viewBox="0 0 32 32" opacity="${load1e_icon === 'oven' && additional_load === 1 && show_aux !== true ? '1' : '0'}"><path display="${additional_load === 0 || additional_load === 2 ? 'none' : ''}" fill="${load_colour}" d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17Zm24 0A2.5 2.5 0 0 0 24.5 5h-17A2.5 2.5 0 0 0 5 7.5V11h22V7.5Zm0 17V13H5v11.5A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5Zm-17-15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM23.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM9 23v-6h14v6H9Zm-.5-8A1.5 1.5 0 0 0 7 16.5v7A1.5 1.5 0 0 0 8.5 25h15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_oven_aux" x="336" y="140" width="36" height="36" viewBox="0 0 32 32" opacity="${load1e_icon === 'oven' && additional_load === 1 ? '1' : '0'}"><path display="${show_aux !== true || additional_load === 0 || additional_load === 2 ? 'none' : ''}" fill="${load_colour}" d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17Zm24 0A2.5 2.5 0 0 0 24.5 5h-17A2.5 2.5 0 0 0 5 7.5V11h22V7.5Zm0 17V13H5v11.5A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5Zm-17-15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM23.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM9 23v-6h14v6H9Zm-.5-8A1.5 1.5 0 0 0 7 16.5v7A1.5 1.5 0 0 0 8.5 25h15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-15Z"/></svg>

            <g display="${additional_load === 0 || additional_load === 1 ? 'none' : ''}" >
              <foreignObject x="${show_aux === true ? '371' : '384'}" y="${show_aux === true ? '123' : '5'}" width="30" height="30" style="position: fixed; ">
                <body xmlns="http://www.w3.org/1999/xhtml">
                  <div style="position: fixed; ">
                    <ha-icon icon="${load1e_icon}" class="essload-icon" ></ha-icon>
                  </div>
                </body>
              </foreignObject>
            </g>

            <g display="${additional_load === 0 || additional_load === 1 ? 'none' : ''}">
              <foreignObject x="${show_aux === true ? '429' : '421'}" y="${show_aux === true ? '123' : '5'}" width="30" height="30" style="position: fixed;">
                <body xmlns="http://www.w3.org/1999/xhtml">
                  <div style="position: fixed;">
                    <ha-icon icon="${load2e_icon}" class="essload-icon" ></ha-icon>
                  </div>
                </body>
              </foreignObject>
            </g>

            <g display="${additional_load === 0 || additional_load === 2 ? 'none' : ''}">
              <foreignObject x="${show_aux === true ? '336' : '336'}" y="${show_aux === true ? '140' : '27'}" width="40" height="40" style="position: fixed; ">
                <body xmlns="http://www.w3.org/1999/xhtml" >
                  <div style="position: fixed; ">
                    <ha-icon icon="${load1e_icon}" class="essload1-icon" ></ha-icon>
                  </div>
                </body>
              </foreignObject>
            </g>

            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.use_timer_248)}>
              <svg xmlns="http://www.w3.org/2000/svg" id="timer" x="210" y="${useautarky != 'no' ? "232" : "249"}" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj26.state == 'on' && usetimer !== 'no' ? '' : 'none'}" fill="${inverter_colour}" d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" id="timer_off" x="210" y="${useautarky != 'no' ? "232" : "249"}" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj26.state == 'off' && usetimer !== 'no' ? '' : 'none'}" fill="${inverter_colour}" d="m19.95 17.15l-1.5-1.5q.275-.675.413-1.337T19 13q0-2.9-2.05-4.95T12 6q-.6 0-1.275.125t-1.4.4l-1.5-1.5q.95-.5 2.012-.763T12 4q1.5 0 2.938.5t2.712 1.45l1.4-1.4l1.4 1.4l-1.4 1.4q.95 1.275 1.45 2.713T21 13q0 1.05-.263 2.087t-.787 2.063ZM13 10.2V8h-2v.2l2 2Zm6.8 12.4l-2.4-2.4q-1.2.875-2.588 1.338T12 22q-1.85 0-3.488-.713T5.65 19.35q-1.225-1.225-1.938-2.863T3 13q0-1.5.463-2.888T4.8 7.6L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4ZM12 20q1.05 0 2.05-.325t1.875-.925L6.2 9.025q-.6.875-.9 1.875T5 13q0 2.9 2.05 4.95T12 20ZM9 3V1h6v2H9Zm2.075 10.875Zm2.825-2.8Z"/></svg>
              <text id="timer_text_on" x="228.5" y="${useautarky != 'no' ? "243" : "260"}" class="st3 left-align" display="${stateObj26.state == 'on' && usetimer !== 'no' ? '' : 'none'}" fill="${inverter_colour}">${localize('common.timer_on')}</text>
              <text id="timer_text_off" x="228.5" y="${useautarky != 'no' ? "243" : "260"}" class="st3 left-align" display="${stateObj26.state == 'off' && usetimer !== 'no' ? '' : 'none'}" fill="${inverter_colour}">${localize('common.timer_off')}</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.solar_sell_247)}>
              <svg xmlns="http://www.w3.org/2000/svg" id="solar_sell_on" x="96" y="197" width="18" height="18" viewBox="0 0 30 30"><path display="${!config.entities.solar_sell_247 || config.entities.solar_sell_247 === 'none' || stateObj44.state === 'off' || stateObj44.state === '0' || config.show_solar === false || !['1', 'on'].includes(stateObj44.state) ? 'none' : ''}" fill="${solar_colour}" d="m5.18 5.45l-1.78-.9L4.66 2h8.47l1.27 2.55l-1.78.89L11.9 4h-6l-.72 1.45M15.5 8H11l-.8-3H7.6l-.79 3H2.28L1 10.55l1.79.89L3.5 10h10.78l.72 1.45l1.79-.89L15.5 8m-.83 14H12.6l-.24-.9l-3.46-5.2l-3.47 5.2l-.23.9H3.13L6 11h2.09l-.36 1.35L8.9 14.1l1.16-1.75L9.71 11h2.07l2.89 11M8.3 15l-.9-1.35l-1.18 4.48L8.3 15m3.28 3.12l-1.18-4.48L9.5 15l2.08 3.12M23 16l-4-4v3h-4v2h4v3l4-4Z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" id="solar_sell_off" x="96" y="197" width="18" height="18" viewBox="0 0 30 30"><path display="${!config.entities.solar_sell_247 || config.entities.solar_sell_247 === 'none' || stateObj44.state === 'on' || stateObj44.state === '1' || config.show_solar === false || !['0', 'off'].includes(stateObj44.state) ? 'none' : ''}" fill="${solar_colour}" d="M 26 16 L 22 12 L 22 15 L 18 15 L 18 17 L 22 17 L 22 20 L 26 16 Z M 22.1 21.5 L 2.4 1.7 L 1.1 3 L 6.1 8 L 5.4 8 L 4.1 10.5 L 5.9 11.4 L 6.6 10 L 8.1 10 L 9.1 11 L 6.2 22 L 8.3 22 L 8.5 21.1 L 12 15.9 L 15.5 21.1 L 15.7 22 L 17.8 22 L 17 18.8 L 20.9 22.7 L 22.1 21.5 M 9.3 18.1 L 10.5 13.6 L 11.4 14.9 L 9.3 18.1 M 14.7 18.1 L 12.6 15 L 12.8 14.7 L 14.1 16 L 14.7 18.1 M 14.2 11 L 14.9 11 L 15.1 11.9 L 14.2 11 M 14.1 8 L 18.6 8 L 19.9 10.6 L 18.1 11.5 L 17.4 10 L 13.2 10 L 10.2 7 L 10.7 5 L 13.3 5 L 14.1 8 M 8.4 5.2 L 6.9 3.7 L 7.8 2 L 16.3 2 L 17.6 4.5 L 15.8 5.4 L 15 4 L 9 4 L 8.4 5.2 Z"/></svg>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.priority_load_243)}>
              <svg xmlns="http://www.w3.org/2000/svg" id="pbat" x="210" y="${useautarky != 'no' ? "251" : "268"}" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj25.state === 'off' && priority !== 'no' ? '' : 'none'}" fill="${inverter_colour}" d="M15.95 21.175L13.1 18.35l1.425-1.4l1.425 1.4l3.525-3.525l1.425 1.4l-4.95 4.95ZM8 22q-.425 0-.713-.288T7 21V5q0-.425.288-.713T8 4h2V2h4v2h2q.425 0 .713.288T17 5v7q-.525 0-1.025.088T15 12.35V6H9v14h2.35q.2.575.488 1.075t.687.925H8Zm1-2h2.35H11h.35H9Z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" id="pload" x="210" y="${useautarky != 'no' ? "251" : "268"}" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj25.state === 'on' && priority !== 'no' ? '' : 'none'}" fill="${inverter_colour}" d="m15 13l-4 4v-3H2v-2h9V9l4 4M5 20v-4h2v2h10v-7.81l-5-4.5L7.21 10H4.22L12 3l10 9h-3v8H5Z"/></svg>
              <text id="priority_text_load" x="228.5" y="${useautarky != 'no' ? "262" : "280"}" class="st3 left-align" display="${stateObj25.state === 'on' && priority !== 'no' ? '' : 'none'}" fill="${inverter_colour}">${localize('common.priority_load')}</text>
              <text id="priority_text_batt" x="228.5" y="${useautarky != 'no' ? "262" : "280"}" class="st3 left-align" display="${stateObj25.state === 'off' && priority !== 'no' ? '' : 'none'}" fill="${inverter_colour}">${localize('common.priority_batt')}</text>
            </a>
            <image x="155" y="224.75" width="53" height="72" class="${inverter_modern === false ? '' : 'st12'}" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABvCAYAAABRjbZ6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAuhSURBVHhe7Z1nbxNNFIXHpoReE0B0ECDRBRJ8o/wAfhZ/BL2AxCeEQKBECCEkikD0GkjoJZRA6C3Br5/rHGez7Ngbex0bZ4+08nrKnXvP3Ds7OzNOMt+/f8+5PH79+uX6+vrcx48f7T6Tybhx48aRNSYwZcoUN3v2bDdt2jT7nvn27VsOMl69euV+//5thORyxtWYw/jx493ixYvd9OnTXfbPnz+ut7fX9ff3GyljEbKbSHn27Jn78uWLy+ZDyeW9pmIvyWaz9gnB9QYGokelXo8t1Pv69avL/vjxww0MDAxmjRwocuzYMXfkyBHzunoBozBo79697saNG8UOiwvIFKF4TmRtFYoDys2ZM8fNnTs3dp1agM7FqEWLFrkJEyaMSBfqBT2M+0w+pnLPnz83hsPCgoV9oAxPr7DwfxVwYIPv4Peq0Ajji5BUB1VNTD3DJwrok4ROiXhMMyIlxoNhxCg+k4rTuGi0cAR19RgI4Yn2+vVre08DjTKQ140YPJKpd1dXl90zA2c6ziy8IWbRwXnMSPDu3TubaTKxY0JFz/MShpE/f/602ePEiRNdS0uLeQbfuXh7ZYbM+xllqU898vj+9u1bN3XqVJs0Akh6+vSpmzx5sr0B0xb3lMXLkE15ZABm8praT5o0yeRCNvnULxe25Fc8j3n//r25P4AE7iEJoRjC9+7ubnfq1KmiwRjx4sULU1rKqyyG4y0fPnxw8+bNK9aB7EuXLtmsVl507tw5u3/w4IHJuXv3rrt+/brlUR5iX7586d68eWMdcPHiRavPCoJkxEFFxNADYPny5dazIgRgEMsXKLNt2zZ7jyKNS9N2vAhC6UE8hnUQenTGjBmWRxnJgizylyxZ4mbOnOnWrVvnDh8+bO0tWLDACMYzHz16VNSD9pF/4sQJt2nTJtNx4cKFRlxcVEQMaxa48/Hjx4s9I+MFFMTFd+3a5a5evTqst7TuM2vWLCMHMpYuXWrl5S2AOtS/deuW9TzG4lEbNmxwbW1tRiZyVq9ebZ7HRR3Szp4969asWWOkVgIPMSjmf1zT+KpVq9yePXtcR0eHxT1K0yMYxkBKL+IhGNDa2uru378/7O2bniYftyeMIJhxh7ELeQLjxO7du00+4QDoFNpCD2RSfsuWLa6zs9PCHOzYscPKE3LBDosLIwaGhyqLlOA1HBh+7do1d/78ebd161br+Z6eHnflyhV75adX8QR6FLnyMMjiu1weozCQchingRXCIJg8xh96nzIMioD6AHLxMsrjdYQuetAOcrZv327tPXnyxMqPBBFPpagB6m/HogcxDgVoHENksJQNgu+Uox0uPIMBmbEDrwB4DD2ucQd5kEddiBnSsSCP/GAaIEwhVHlcyBCZPpCvTmMsM2JwZQSw7gvbra1z80WDnvI3MUCNIRBASlhRNUgenygN+MTzCCWIkaEaUKNkCaXyggjr5wNt4xyEPZ3KQ8CkoyRMHzp0yJ08edKNy/dOAQj2M02DwUajlFU+eSIFYBzuz5MNZfASvEcyShkehxQQ1s8HPPfo0aPu8uXLRdnFUIJdYpEJGINlIaTiKVAp4vZorUGoES2EEN5SDCUmXig52oo2CjGC9CmGkhRrFAUbAX/FCuSIuVqDthqpM6QP44x3EBktchoVtR1d/0HgEDYdGPyeIo9glKTEeJAS40FKjAcpMR5EEtNo84t6IPUYD+pGDK/6vLxxsZbDwnb4oky9MOrEEKIQwcVSBxcEKHyDF2VYs4E8vo8mRo0YDIMEjB2pJ6geBDErHQ3UlBgZwSfGVWOYZHCNhvfUlBjeUiv1Eh8gRaFXS9SUGJRnEA17iQZdpQeNlOEC98Hv5FO31uTUjBiRok0xgXt2GORFKieSuCefPNLY9YSIIERekLCkUTNiwsYI8hZCDAJ0ukFewFNITyNtBUd5huqI0KRRE2I0SEYBj2Efee3atbabqV0CdhBYiGfzjg27lStXWpk7d+64z58/D/M6AcJqRUzFx0BKQZOzKJn0MpvskEE5jGPXkvLsaclQvrPFyukF9p1IJz8MCCM9Cf1FfnExPGlgrE9R0gkRtnc54nHv3j0LHTwG47kIMTzl4MGD7ubNm8O8JRxWtfKaxIlB0VKDIkbiNXgBocNOpDxMgBjkbN682cpwFESbdWFiAHWj0qtB4qGE0Rga3HUU6FmIIY9dSI6aQRChxJiEJ+HG8hxCiXKUJ08yw7rynXAKelYlqFkoIRgDo0imR0mndyGDpw4noTCYgwEQQH0u7ilLPie1OAVRyiPIS9pjEiUG5ejVqJ5TGvMavIoTUDyRODqGZ9DjPI0YlCGLcy0cNeHQEWdnqFcKkh/VdiVIlBigcCkHNvEpyydk6pgHdfEovISjIPPnzy8+rchLyvBySHSMQWl6G8/xGUAoadZLWYyX4UHgVZyVYV5DnsIrCrSlRzb3lYaVdE58jJFCpYjBOzTgcqqCe0hgIObpwxgFEXgQ51XwHEgphWBblZISRuKhRM+VA4bIGDyHnoYMHtM80eQZKsN3n7cIvo6oFIkTg0dgZKmewwi9JzHwUlahojN4ykNWOaN9A341SJwYEDVmhEH4EDZ8ihDGE0KLuprXgHJEl/OmuAi2YRJJQMFPnz7ZZ7VgXACljGEMwXh6m3K8KEIE8xu+kwfB5JfyiKQ8Be/EUwUjBsYhZN++fa69vb3qxqjP5SOGdEKH46kc61L7kMEYAyGk40EKTR/ohGo9hkF///79NmeiPVCUiKIcNN64cWPJno4DSEFeKYMoQ/iIQCmkwZtPvMonAzK4VK8a8ITcuXOnW7ZsWTFsM11dXTle7cV6qZ4eKWiE0IjTo1KIsuhQDpCmkE0Katd+fYILi4gkSQH0pjwH2VEXsB7K3wcJDJcLX7VGpru7O8e7CEYkScrIQdu1N7gURLjNfEVIfUkB9SMlygOrG86bGCkxHqTEeJB/EKTcRCFlxYOUmDyinsgpMR6kxHiQHa0p9r+GLGsQ9Z/1Nh7sr5pFvdqHPQny9F1vwmFCw2kqr3TJ5IqaJqh8GEpXXd0Lwfuo9kEwHUinMJSeaW9vz7F6BkFaUZPhghrAGL0pyzDWbpXOGgrfWRIQrJGAggLt0F6YIJWXzFKQjpKP9+ttnlUDZITtCMrnngt9SaMeSw4cT8l0dHTkWGeVMaxxoHB/P0oPX1KkIgK5lM4eEaABiBG5cSAlqwUygkbyGYdULtnCJ3VIY+Uwc+HChRwJGHP69GnX1tbq1m9YT81BETQ8ZCgVg2ujUkSIMjSYHweUl05xIGIE7kkL6+LTg848c+aMecqKFSsKy63aImWljT8X0Nl5b1goAATqApTXFW4sWFbXSIFBcUkB4TZESFw9WITn58X8+QORnMmTkSORBHYJCIeWlvCSYXNPdyCCcZa1X4YSDhbYPEZssnLF4DUECGluUgAcYLuGBa7mt7pC/EUM7DHYBgfcsQgjRu4TvsYy0lDyICXGg5QYD1JiPEiJ8SAlxoOUGA9SYjxIifEgJcaDlBgPUmI8SInxICXGg5QYD1JiPEiJ8SAlxoNscAmzsN7LHbt4pXfymh32z+1EDj8B7Osr/MHyAkhv/rVfdlb5/TebjgXnyBRCiRs2nPgFxoED/1nhAsYGMfz2kr8KwDYte0u2n93T05N7/PixFbh9+/bgPzdYYN+H0NxDER7Dz5n5e+X8TpO/DpDp7e3NPXz40MJJe9EDA/pLHgVC8KggmnFrBS+RXZx2yHIEhN19Etn1L5xkgIjC8YgwKc0KHRuBIPtZDjf8Ql6/RSwUGDuEBIFz8AN49rGL/6QXcOqBf6QAIAbS9HumOETp0FEY1IdwyeDTJy/YlnpRaXQe8vmOZwflMQwMdWwhjXLYwD12BMsL5FMX2TgI4wsYRgygYYTziQDuEVoOUoTTEjQWPFzEPXLIB+TrZEGYSNJRlPQo4yGfY3GSBZBHu+gZlkc6dXXyS5A8fardApz7H6zyhGuotUz4AAAAAElFTkSuQmCC" preserveAspectRatio="none"/>

            <a href="#" @click=${(e) => this.handlePopup(e, inverter_prog.entityID)}>
              <svg xmlns="http://www.w3.org/2000/svg" id="prog_grid_on" x="265" y="${useautarky != 'no' ? "232" : "249"}" width="20" height="18" viewBox="0 0 24 24"><path display="${inverter_prog.show === false || config.entities.use_timer_248 === 'none' ? 'none' : ''}" class="${inverter_prog.charge === 'none' ? 'st12' : ''}" fill="${inverter_colour}" d="M11.5 19h1v-1.85l3.5-3.5V9H8v4.65l3.5 3.5V19Zm-2 2v-3L6 14.5V9q0-.825.588-1.413T8 7h1L8 8V3h2v4h4V3h2v5l-1-1h1q.825 0 1.413.588T18 9v5.5L14.5 18v3h-5Zm2.5-7Z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" id="prog_grid_off" x="265" y="${useautarky != 'no' ? "232" : "249"}" width="20" height="18" viewBox="0 0 24 24"><path display="${inverter_prog.show === false || config.entities.use_timer_248 === 'none' ? 'none' : ''}" class="${inverter_prog.charge === 'none' ? '' : 'st12'}" fill="${inverter_colour}" d="M10 3H8v1.88l2 2zm6 6v3.88l1.8 1.8l.2-.2V9c0-1.1-.9-2-2-2V3h-2v4h-3.88l2 2H16zM4.12 3.84L2.71 5.25L6 8.54v5.96L9.5 18v3h5v-3l.48-.48l4.47 4.47l1.41-1.41L4.12 3.84zm8.38 13.33V19h-1v-1.83L8 13.65v-3.11l5.57 5.57l-1.07 1.06z"/></svg>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_pv_energy_108)}>
              <text id="daily_solar_value" x="43.5" y="15" class="st10 left-align" display="${config.solar.display_mode === 1 ? '' : 'none'}" fill="${solar_showdaily !== true || config.show_solar === false ? 'transparent' : `${solar_colour}`}" >${isNaN(parseFloat(stateObj4.state)) ? '0' : `${parseFloat(stateObj4.state).toFixed(1)}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_pv_energy_108)}>
              <text id="remaining_solar_value" x="43.5" y="15" class="st10 left-align" display="${config.solar.display_mode === 2 ? '' : 'none'}" fill="${solar_showdaily !== true || config.show_solar === false  ? 'transparent' : `${solar_colour}`}" >${isNaN(parseFloat(stateObj4.state)) ? '0' : `${parseFloat(stateObj4.state).toFixed(1)} kWh / ${remaining_solar}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_pv_energy_108)}>
              <text id="total_solar_value" x="43.5" y="15" class="st10 left-align" display="${config.solar.display_mode === 3 ? '' : 'none'}" fill="${solar_showdaily !== true || config.show_solar === false ? 'transparent' : `${solar_colour}`}" >${isNaN(parseFloat(stateObj4.state)) ? '0' : `${parseFloat(stateObj4.state).toFixed(1)} kWh / ${total_solar_generation}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_load_energy_84)}>
              <text id="daily_load_value_aux" x="${additional_aux_load === 2 ? '238' : '306'}" y="80" class="st10 left-align" display="${load_showdaily !== true || show_aux !== true ? 'none' : ''}" fill="${load_colour}" >${isNaN(parseFloat(stateObj2.state)) ? '0' : `${parseFloat(stateObj2.state).toFixed(1)}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_load_energy_84)}>
              <text id="daily_load_value" x="${additional_load === 0 ? '377' : '306'}" y="${additional_load === 0 ? '57' : '80'}" class="st10 left-align" display="${load_showdaily !== true || show_aux === true ? 'none' : ''}" fill="${load_colour}" >${isNaN(parseFloat(stateObj2.state)) ? '0' : `${parseFloat(stateObj2.state).toFixed(1)}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_battery_charge_70)}>
              <text id="daily_bat_charge_value" x="4.5" y="237" class= "st10 left-align" display="${battery_showdaily !== true || config.show_battery === false ? 'none' : ''}" fill="${battery_colour}">${isNaN(parseFloat(stateObj1.state)) ? '0' : `${parseFloat(stateObj1.state).toFixed(1)}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_battery_discharge_71)}>
              <text id="daily_bat_discharge_value" x="4.5" y="271" class="st10 left-align" display="${battery_showdaily !== true || config.show_battery === false ? 'none' : ''}" fill="${battery_colour}" >${isNaN(parseFloat(stateObj.state)) ? '0' : `${parseFloat(stateObj.state).toFixed(1)}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_grid_import_76)}>
              <text id="daily_grid_buy_value" x="${grid_show_noness === false ? '311' : '347'}" y="${grid_show_noness === false ? '354' : '239'}" class="st10 left-align" display="${grid_showdailybuy !== true ? 'none' : ''}" fill="${grid_colour}" >${isNaN(parseFloat(stateObj3.state)) ? '0' : `${parseFloat(stateObj3.state).toFixed(1)}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_grid_export_77)}>
              <text id="daily_grid_sell_value" x="${grid_show_noness === false ? '311' : '347'}" y="${grid_show_noness === false ? '323' : '209'}" class="st10 left-align" display="${grid_showdailysell !== true ? 'none' : ''}" fill="${grid_colour}" >${isNaN(parseFloat(stateObj33.state)) ? '0' : `${parseFloat(stateObj33.state).toFixed(1)}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_aux_energy)}>
              <text id="aux_daily_value" x="${(additional_aux_load === 1 || additional_aux_load === 2) ? '238' : '306'}" y="12" class="st10 left-align" display="${show_aux !== true || show_dailyaux !== true ? 'none' : ''}" fill="${aux_colour}" >${isNaN(parseFloat(stateObj50.state)) ? '0' : `${parseFloat(stateObj50.state).toFixed(1)}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.essential_load1_extra)}>
               <text id="ess_load1_value_extra" x="430" y="23" display="${config.entities?.essential_load1_extra && additional_load === 1 && show_aux !== true ? '' : 'none'}" class="st3 .right-align" fill="${load_colour}">${isNaN(parseFloat(stateObj52.state)) ? '0' : `${parseFloat(stateObj52.state).toFixed(1)} ${stateObj52.attributes.unit_of_measurement}`}</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.essential_load1_extra)}>
               <text id="ess_load2_value_extra" x="392" y="70" display="${config.entities?.essential_load1_extra && additional_load === 2 && show_aux !== true ? '' : 'none'}" class="st3 .right-align" fill="${load_colour}">${isNaN(parseFloat(stateObj52.state)) ? '0' : `${parseFloat(stateObj52.state).toFixed(1)} ${stateObj52.attributes.unit_of_measurement}`}</text>
            </a>
           <a href="#" @click=${(e) => this.handlePopup(e, config.entities.essential_load2_extra)}>
               <text id="ess_load2_value_extra" x="430" y="70" display="${config.entities?.essential_load2_extra && additional_load === 2 && show_aux !== true ? '' : 'none'}" class="st3 .left-align" fill="${load_colour}">${isNaN(parseFloat(stateObj52.state)) ? '0' : `${parseFloat(stateObj53.state).toFixed(1)} ${stateObj53.attributes.unit_of_measurement}`}</text>
            </a>        
            ${config.entities?.pv_total
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv_total)}>
                    <text id="pvtotal_power" x="19%" y="46.5%" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.solar.mppts === 1 ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(total_pv, round) || 0}` : `${total_pv || 0} W`}</text>
                  </a>`
          : svg` <text id="pvtotal_power" x="87" y="178" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.solar.mppts === 1 ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(total_pv, round) || 0}` : `${total_pv || 0} W`}</text>`}
            ${config.entities?.essential_power
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.essential_power)}>
                    <text id="ess_power" x="270" y="119" class="${font !== true ? 'st14' : 'st4'} st8" fill="${load_colour}">${config.load.auto_scale === true ? `${convertValue(essential, round) || 0}` : `${essential || 0} W`}</text>
                  </a>`
          : svg`<text id="ess_power" x="270" y="119" class="${font !== true ? 'st14' : 'st4'} st8" fill="${load_colour}">${config.load.auto_scale === true ? `${convertValue(essential, round) || 0}` : `${essential || 0} W`}</text>`}
            ${config.entities?.nonessential_power
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.nonessential_power)}>
                    <text id="non_ess_power" x="338" y="281.5" display="${grid_show_noness === false ? 'none' : ''}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${grid_colour}">${config.grid.auto_scale === true ? `${convertValue(nonessential, round) || 0}` : `${nonessential || 0} W`}</text>
                  </a>`
          : svg`<text id="non_ess_power" x="338" y="281.5" display="${grid_show_noness === false ? 'none' : ''}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${grid_colour}">${config.grid.auto_scale === true ? `${convertValue(nonessential, round) || 0}` : `${nonessential || 0} W`}</text>`}
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.grid_ct_power_172)}>
              <text id="grid_ct_power_172" x="420" y="${config.inverter.three_phase === true ? '276' : '281.5'}" display="${config.entities.grid_ct_power_172 === 'none' ? 'none' : ''}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${grid_colour}">${config.grid.auto_scale === true ? `${convertValue(grid_power, round) || 0}` : `${grid_power || 0} W`}</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.grid_ct_power_L2)}>
              <text id="grid_ct_power_L2" x="420" y="292" display="${config.inverter.three_phase === true  && config.entities?.grid_ct_power_L2 ? '' : 'none'}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${grid_colour}">${config.grid.auto_scale === true ? `${convertValue(grid_power_L2, round) || 0}` : `${grid_power_L2 || 0} W`}</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.grid_ct_power_L3)}>
              <text id="grid_ct_power_L3" x="420" y="307" display="${config.inverter.three_phase === true  && config.entities?.grid_ct_power_L3 ? '' : 'none'}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${grid_colour}">${config.grid.auto_scale === true ? `${convertValue(grid_power_L3, round) || 0}` : `${grid_power_L3 || 0} W`}</text>
            </a>
            ${config.entities?.aux_power_166
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.aux_power_166)}>
                    <text id="aux_power_166" x="270" y="48" class="${font !== true ? 'st14' : 'st4'} st8" display="${show_aux !== true ? 'none' : ''}" fill="${aux_colour}">${config.load.auto_scale === true ? `${config.load.show_absolute_aux === true ? `${Math.abs(parseFloat(convertValue(aux_power, round)))} ${convertValue(aux_power, round).split(' ')[1]}` : convertValue(aux_power, round) || '0'}` : `${config.load.show_absolute_aux === true ? `${Math.abs(aux_power)}` : aux_power || 0} W`}</text>
                  </a>`
          : svg`<text id="aux_power_166" x="270" y="48" class="${font !== true ? 'st14' : 'st4'} st8" display="${show_aux !== true ? 'none' : ''}" fill="${aux_colour}">${config.load.auto_scale === true ? `${config.load.show_absolute_aux === true ? `${Math.abs(parseFloat(convertValue(aux_power, round)))} ${convertValue(aux_power, round).split(' ')[1]}` : convertValue(aux_power, round) || '0'}` : `${config.load.show_absolute_aux === true ? `${Math.abs(aux_power)}` : aux_power || 0} W`}</text>`}
            ${config.entities?.pv1_power_186
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv1_power_186)}>
                    <text id="pv1_power_186" x="36.5" y="56.5" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false ? 'none' : ''}" fill="${solar_colour}" >${config.solar.auto_scale === true ? `${convertValue(parseFloat(stateObj9.state).toFixed(0), round)}` : `${parseFloat(stateObj9.state).toFixed(0)} W`}</text>
                  </a>`
          : svg`<text id="pv1_power_186" x="36.5" y="56.5" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.entities.pv1_power_186 === 'none' ? 'none' : ''}" fill="${solar_colour}" >${config.solar.auto_scale === true ? `${convertValue(parseFloat(stateObj9.state).toFixed(0), round)}` : `${parseFloat(stateObj9.state).toFixed(0)} W`}</text>`}
            ${config.entities?.pv2_power_187
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv2_power_187)}>
                    <text id="pv2_power_187" x="137" y="56.5" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.solar.mppts === 1 ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(parseFloat(stateObj8.state).toFixed(0), round)}` : `${parseFloat(stateObj8.state).toFixed(0)} W`}</text>
                  </a>`
          : svg`<text id="pv2_power_187" x="137" y="56.5" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.entities.pv2_power_187 === 'none' || config.solar.mppts === 1 ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(parseFloat(stateObj8.state).toFixed(0), round)}` : `${parseFloat(stateObj8.state).toFixed(0)} W`}</text>`}
            ${config.entities?.pv3_power_188
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv3_power_188)}>
                    <text id="pv3_power_188" x="36.5" y="117" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(parseFloat(stateObj31.state).toFixed(0), round)}` : `${parseFloat(stateObj31.state).toFixed(0)} W`}</text>
                  </a>`
          : svg`<text id="pv3_power_188" x="36.5" y="117" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.entities.pv3_power_188 === 'none' || config.solar.mppts === 1 || config.solar.mppts === 2 ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(parseFloat(stateObj31.state).toFixed(0), round)}` : `${parseFloat(stateObj31.state).toFixed(0)} W`}</text>`}
            ${config.entities?.pv4_power_189
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv4_power_189)}>
                    <text id="pv4_power_189" x="137" y="117" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 || config.solar.mppts === 3 ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(parseFloat(stateObj32.state).toFixed(0), round)}` : `${parseFloat(stateObj32.state).toFixed(0)} W`}</text>
                  </a>`
          : svg`<text id="pv4_power_189" x="137" y="117" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.entities.pv4_power_189 === 'none' || config.solar.mppts === 1 || config.solar.mppts === 2 || config.solar.mppts === 3 ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(parseFloat(stateObj32.state).toFixed(0), round)}` : `${parseFloat(stateObj32.state).toFixed(0)} W`}</text>`}
            ${config.entities?.aux_load1
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.aux_load1)}>
                    <text id="aux_load1_value" x="411" y="34" class="${font !== true ? 'st14' : 'st4'} st8" display="${show_aux !== true || additional_aux_load === 0 ? 'none' : ''}" fill="${aux_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj48.state)) ? '0' : convertValue(parseFloat(stateObj48.state), round)}` : `${parseFloat(stateObj48.state).toFixed(0) || 0} W`}</text>
                  </a>`
          : svg`<text id="aux_load1_value" x="411" y="34" class="${font !== true ? 'st14' : 'st4'} st8" display="${show_aux !== true || additional_aux_load === 0 ? 'none' : ''}" fill="${aux_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj48.state)) ? '0' : convertValue(parseFloat(stateObj48.state), round)}` : `${parseFloat(stateObj48.state).toFixed(0) || 0} W`}</text>`}
            ${config.entities?.aux_load2
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.aux_load2)}>
                    <text id="aux_load2_value" x="411" y="64" class="${font !== true ? 'st14' : 'st4'} st8" display="${show_aux !== true || additional_aux_load === 0 || additional_aux_load === 1 ? 'none' : ''}" fill="${aux_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj49.state)) ? '0' : convertValue(parseFloat(stateObj49.state), round)}` : `${parseFloat(stateObj49.state).toFixed(0) || 0} W`}</text>
                  </a>`
          : svg`<text id="aux_load2_value" x="411" y="64" class="${font !== true ? 'st14' : 'st4'} st8" display="${show_aux !== true || additional_aux_load === 0 || additional_aux_load === 1 ? 'none' : ''}" fill="${aux_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj49.state)) ? '0' : convertValue(parseFloat(stateObj49.state), round)}` : `${parseFloat(stateObj49.state).toFixed(0) || 0} W`}</text>`}
            ${config.entities?.non_essential_load1
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.non_essential_load1)}>
                    <text id="noness1_value" x="340"" y="321" class="st3" display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 2 ? 'none' : ''}" fill="${grid_colour}">${config.grid.auto_scale === true ? `${isNaN(parseFloat(stateObj40.state)) ? '0' : convertValue(parseFloat(stateObj40.state), round)}` : `${parseFloat(stateObj40.state).toFixed(0) || 0} W`}</text>
                  </a>`
          : svg`<text id="noness1_value" x="340"" y="321" class="st3" display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 2 ? 'none' : ''}" fill="${grid_colour}">${config.grid.auto_scale === true ? `${isNaN(parseFloat(stateObj40.state)) ? '0' : convertValue(parseFloat(stateObj40.state), round)}` : `${parseFloat(stateObj40.state).toFixed(0) || 0} W`}</text>`}
            ${config.entities?.non_essential_load1
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.non_essential_load1)}>
                    <text id="noness2_value" x="320"" y="321" class="st3" display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}">${config.grid.auto_scale === true ? `${isNaN(parseFloat(stateObj40.state)) ? '0' : convertValue(parseFloat(stateObj40.state), round)}` : `${parseFloat(stateObj40.state).toFixed(0) || 0} W`}</text>
                  </a>`
          : svg`<text id="noness2_value" x="320"" y="321" class="st3" display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}">${config.grid.auto_scale === true ? `${isNaN(parseFloat(stateObj40.state)) ? '0' : convertValue(parseFloat(stateObj40.state), round)}` : `${parseFloat(stateObj40.state).toFixed(0) || 0} W`}</text>`}
            ${config.entities?.non_essential_load2
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.non_essential_load2)}>
                    <text id="noness2_value" x="357" y="321" class="st3" display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}">${config.grid.auto_scale === true ? `${isNaN(parseFloat(stateObj41.state)) ? '0' : convertValue(parseFloat(stateObj41.state), round)}` : `${parseFloat(stateObj41.state).toFixed(0) || 0} W`}</text>
                  </a>`
          : svg`<text id="noness2_value" x="357" y="321" class="st3" display="${grid_show_noness === false || noness_dual_load === 0 || noness_dual_load === 1 ? 'none' : ''}" fill="${grid_colour}">${config.grid.auto_scale === true ? `${isNaN(parseFloat(stateObj41.state)) ? '0' : convertValue(parseFloat(stateObj41.state), round)}` : `${parseFloat(stateObj41.state).toFixed(0) || 0} W`}</text>`}
            ${config.entities?.essential_load1
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.essential_load1)}>
                    <text id="ess_load1_value" x="409" y="${show_aux !== true ? '47' : '158'}" display="${additional_load === 1 ? '' : 'none'}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj42.state)) ? '0' : convertValue(parseFloat(stateObj42.state), round)}` : `${parseFloat(stateObj42.state).toFixed(0) || 0} W`}</text>
                  </a>`
          : svg`<text id="ess_load1_value" x="409" y="${show_aux !== true ? '47' : '158'}" display="${additional_load === 1 ? '' : 'none'}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj42.state)) ? '0' : convertValue(parseFloat(stateObj42.state), round)}` : `${parseFloat(stateObj42.state).toFixed(0) || 0} W`}</text>`}
            ${config.entities?.essential_load1
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.essential_load1)}>
                    <text id="ess_load2_value" x="${show_aux !== true ? '394' : '391'}" y="${show_aux !== true ? '42' : '160'}" display="${additional_load === 2 ? '' : 'none'}" class="st3" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj42.state)) ? '0' : convertValue(parseFloat(stateObj42.state), round)}` : `${parseFloat(stateObj42.state).toFixed(0) || 0} W`}</text>
                  </a>`
          : svg`<text id="ess_load2_value" x="${show_aux !== true ? '394' : '391'}" y="${show_aux !== true ? '42' : '160'}" display="${additional_load === 2 ? '' : 'none'}" class="st3" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj42.state)) ? '0' : convertValue(parseFloat(stateObj42.state), round)}` : `${parseFloat(stateObj42.state).toFixed(0) || 0} W`}</text>`}
            ${config.entities?.essential_load2
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.essential_load2)}>
                    <text id="ess_load2_value" x="${show_aux !== true ? '430' : '427'}" y="${show_aux !== true ? '42' : '160'}" display="${additional_load === 2 ? '' : 'none'}" class="st3" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj45.state)) ? '0' : convertValue(parseFloat(stateObj45.state), round)}` : `${parseFloat(stateObj45.state).toFixed(0) || 0} W`}</text>
                  </a>`
          : svg`<text id="ess_load2_value" x="${show_aux !== true ? '430' : '427'}" y="${show_aux !== true ? '42' : '160'}" display="${additional_load === 2 ? '' : 'none'}" class="st3" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj45.state)) ? '0' : convertValue(parseFloat(stateObj45.state), round)}` : `${parseFloat(stateObj45.state).toFixed(0) || 0} W`}</text>`}
            ${grid_power >= 0
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.energy_cost_buy)}>
              <text id="energy_cost" x="427" y="257"  class="st3 left-align" fill="${grid_colour}" display="${config.entities?.energy_cost_buy  ? '' : 'none'}" >${energy_cost} ${stateObj43.attributes.unit_of_measurement}</text>
                  </a>`
          : svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.energy_cost_sell)}>
              <text id="energy_cost" x="427" y="257"  class="st3 left-align" fill="${grid_colour}" display="${config.entities?.energy_cost_sell ? '' : 'none'}" >${energy_cost} ${stateObj51.attributes.unit_of_measurement}</text>
                  </a>`}

            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.inverter_voltage_154)}>
              <text id="inverter_voltage_154" x="270" y="${config.inverter.three_phase === true ? '164' : '170.4'}" display="${config.entities.inverter_voltage_154 === 'none' || !config.entities.inverter_voltage_154 ? 'none' : ''}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${grid_colour}" >${inverter_voltage} V</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.inverter_voltage_L2)}>
              <text id="inverter_voltage_L2" x="270" y="177" display="${config.inverter.three_phase === true  && config.entities?.inverter_voltage_L2 ? '' : 'none'}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${grid_colour}" >${inverter_voltage_L2} V</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.inverter_voltage_L3)}>
              <text id="inverter_voltage_L3" x="270" y="190" display="${config.inverter.three_phase === true  && config.entities?.inverter_voltage_L3 ? '' : 'none'}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${grid_colour}" >${inverter_voltage_L3} V</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.load_frequency_192)}>
              <text id="load_frequency_192" x="270" y="${config.inverter.three_phase === true ? '203' : '189.5'}" display="${config.entities.load_frequency_192 === 'none' || !config.entities.load_frequency_192 ? 'none' : ''}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${grid_colour}">${load_frequency} Hz</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.inverter_current_164)}>
              <text id="inverter_current_164" x="180.5" y="${config.inverter.three_phase === true ? '188' : '199'}" display="${config.entities.inverter_current_164 === 'none' || !config.entities.inverter_current_164 ? 'none' : ''}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${inverter_colour}" > ${inverter_current} ${config.inverter.three_phase === true && config.entities?.inverter_current_L2 ? '| ' + inverter_current_L2 : ''} A</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.inverter_current_L3)}>
              <text id="inverter_current_L3" x="180.5" y="203" display="${config.inverter.three_phase === true  && config.entities?.inverter_current_L3 ? '' : 'none'}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${inverter_colour}">${inverter_current_L3} A</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.battery_voltage_183)}>
              <text id="battery_voltage_183" x="41" y="317" display="${config.entities.battery_voltage_183 === 'none' || !config.entities.battery_voltage_183 || config.show_battery === false ? 'none' : ''}" fill=${battery_colour} class="${font !== true ? 'st14' : 'st4'} st8">${battery_voltage} V</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.battery_soc_184)}>
              <text id="battery_soc_184" x="132.5" y="333" display="${config.entities.battery_soc_184 === 'none' || config.show_battery === false ? 'none' : ''}" fill=${battery_colour} class="st13 st8 left-align">${parseInt(stateObj12.state)} %</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.battery_soc_184)}>
              <text id="battery_soc_184" x="196.5" y="333" fill=${battery_colour} class="st13 st8 left-align" display="${inverter_prog.show === false || config.entities.battery_soc_184 === 'none' || config.show_battery === false ? 'none' : ''}"> | ${inverter_prog.capacity || 0} %</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.battery_power_190)}>
              <text id="battery_power_190" x="41" y="356" display="${config.entities.battery_power_190 === 'none' || config.show_battery === false ? 'none' : ''}" fill=${battery_colour} class="${font !== true ? 'st14' : 'st4'} st8">${config.battery.auto_scale === true ? `${config.battery.show_absolute === true ? `${Math.abs(parseFloat(convertValue(battery_power, round)))} ${convertValue(battery_power, round).split(' ')[1]}` : convertValue(battery_power, round) || '0'}` : `${config.battery.show_absolute === true ? `${Math.abs(battery_power)}` : battery_power || 0} W`}</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.battery_current_191)}>
              <text id="battery_current_191" x="41" y="336" display="${config.entities.battery_current_191 === 'none' || config.show_battery === false ? 'none' : ''}" fill=${battery_colour} class="${font !== true ? 'st14' : 'st4'} st8">${config.battery.show_absolute === true ? Math.abs(parseFloat(stateObj35.state)).toFixed(1) : parseFloat(stateObj35.state).toFixed(1)} A</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.inverter_power_175)}>
              <text id="inverter_power_175" x="180.5" y="${config.inverter.three_phase === true ? '174' : '178'}" display="${config.entities.inverter_power_175 === 'none' ? 'none' : ''}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${inverter_colour}">${config.inverter.auto_scale === true ? `${convertValue(inverter_power_round, round) || 0}` : `${parseFloat(stateObj22.state).toFixed(0) || 0} W`}</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.grid_power_169)}>
              <text id="grid_power_169" x="270" y="${config.inverter.three_phase === true ? '216' : '209'}" display="${config.entities.grid_power_169 === 'none' ? 'none' : ''}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${grid_colour}">${config.grid.auto_scale === true ? `${convertValue(grid_power_round, round) || 0}` : `${parseFloat(stateObj23.state).toFixed(0) || 0} W`}</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv1_voltage_109)}>
              <text id="pv1_voltage" x="41" y="78.5" class="st3 left-align" display="${config.show_solar === false || !config.entities.pv1_voltage_109 || config.entities.pv1_voltage_109 === 'none' ? 'none' : ''}" fill="${solar_colour}" >${parseFloat(stateObj16.state).toFixed(1)} V</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv1_current_110)}>
              <text id="pv1_current" x="41" y="90" class="st3 left-align" display="${config.show_solar === false || !config.entities.pv1_current_110 || config.entities.pv1_current_110 === 'none' ? 'none' : ''}" fill="${solar_colour}" >${parseFloat(stateObj17.state).toFixed(1)} A</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv2_voltage_111)}>
              <text id="pv2_voltage" x="142" y="78.5" class="st3 left-align" display="${config.show_solar === false || !config.entities.pv2_voltage_111 || config.entities.pv2_voltage_111 === 'none' || config.solar.mppts === 1 ? 'none' : ''}" fill="${solar_colour}" >${parseFloat(stateObj18.state).toFixed(1)} V</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv2_current_112)}>
              <text id="pv2_current" x="142" y="90" class="st3 left-align" display="${config.show_solar === false || !config.entities.pv2_current_112 || config.entities.pv2_current_112 === 'none' || config.solar.mppts === 1 ? 'none' : ''}" fill="${solar_colour}" >${parseFloat(stateObj19.state).toFixed(1)} A</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv3_voltage_113)}>
              <text id="pv3_voltage" x="41" y="139" class="st3 left-align" display="${config.show_solar === false || !config.entities.pv3_voltage_113 || config.entities.pv3_voltage_113 === 'none' || config.solar.mppts === 1 || config.solar.mppts === 2 ? 'none' : ''}" fill="${solar_colour}" >${parseFloat(stateObj27.state).toFixed(1)} V</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv3_current_114)}>
              <text id="pv3_current" x="41" y="150" class="st3 left-align" display="${config.show_solar === false || !config.entities.pv3_current_114 || config.entities.pv3_current_114 === 'none' || config.solar.mppts === 1 || config.solar.mppts === 2 ? 'none' : ''}" fill="${solar_colour}" >${parseFloat(stateObj28.state).toFixed(1)} A</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv4_voltage_115)}>
              <text id="pv4_voltage" x="142" y="139" class="st3 left-align" display="${config.show_solar === false || !config.entities.pv4_voltage_115 || config.entities.pv4_voltage_115 === 'none' || config.solar.mppts === 1 || config.solar.mppts === 2 || config.solar.mppts === 3 ? 'none' : ''}" fill="${solar_colour}" >${parseFloat(stateObj29.state).toFixed(1)} V</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv4_current_116)}>
              <text id="pv4_current" x="142" y="150" class="st3 left-align" display="${config.show_solar === false || !config.entities.pv4_current_116 || config.entities.pv4_current_116 === 'none' || config.solar.mppts === 1 || config.solar.mppts === 2 || config.solar.mppts === 3 ? 'none' : ''}" fill="${solar_colour}" >${parseFloat(stateObj30.state).toFixed(1)} A</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.battery_temp_182)}>
              <text id="battery_temp_182" x="93.7" y="295" class="${config.entities?.battery_temp_182 ? 'st3 left-align' : 'st12'}" fill="${battery_colour}" display="${config.show_battery === false ? 'none' : ''}" >${stateObj37.state}°</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.radiator_temp_91)}>
              <text id="ac_temp" x="${config.solar?.mppts === 4 ? '137' : '158'}"  y="${config.solar?.mppts === 4 ? '222' : '153'}" class="st3 left-align" fill="${inverter_colour}" display="${config.entities?.radiator_temp_91 ? '' : 'none'}" >AC: ${parseFloat(stateObj39.state).toFixed(1)}°</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.dc_transformer_temp_90)}>
              <text id="dc_temp" x="110" y="266" class="st3 left-align" fill="${inverter_colour}" display="${config.entities?.dc_transformer_temp_90 ? '' : 'none'}" >DC: ${parseFloat(stateObj38.state).toFixed(1)}°</text>
            </a>
          </svg>
        </div>
        </ha-card>
      `;
    }

    if (config.cardstyle === 'lite') {
      return html`
        <ha-card>
        <style>
        .essload-icon {
          color: ${load_colour} !important;
          --mdc-icon-size: 32px;
        }
        .essload_small-icon {
          color: ${load_colour} !important;
          --mdc-icon-size: 20px;
        }
        </style>
        <div class="container card">
        ${config.title ? html`<h1 style="text-align: center; color: ${config.title_colour || 'inherit'}; font-size: ${config.title_size || '32px'};">${config.title}</h1>` : ''}
          <svg viewBox="-0.5 ${config.show_solar === false ? (additional_load !== 0 || config.show_battery === false ? 80 : 145.33) : -0.5} 483 ${config.show_solar === false ? (config.show_battery === true ? (additional_load !== 0 ? 350 : 270.67) : 270.67) : (config.show_battery === false ? (additional_load === 2 ? 350 : 300) : 406)}" preserveAspectRatio="xMidYMid meet" height="${panel === false ? `${config.show_solar === false && config.show_battery === false ? '270px' : config.show_solar === false ? (additional_load !== 0 ? '330px' : '246px') : config.show_solar === true && config.show_battery === false ? (additional_load === 2 ? '350px' : '300px') : `${height}`}` : `${config.show_solar === false ? '75%' : '100%'}`}" width="100%"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
            <rect x="304" y="203.5" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${load_colour}" pointer-events="all"/>
            <rect x="205" y="116.5" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${solar_colour}" pointer-events="all" display="${config.solar.mppts === 1 ? 'none' : ''}" class="${config.show_solar === false ? 'st12' : ''}"/>
            <rect x="159" y="329.75" width="70" height="70" rx="10.5" ry="10.5" fill="none" stroke="${battery_colour}" pointer-events="all" display="${config.show_battery === false ? 'none' : ''}"/>
            <rect x="103" y="${config.inverter.three_phase === true ? '193.5' : '203.5'}" width="70" height="${config.inverter.three_phase === true ? '50' : '30'}" rx="${config.inverter.three_phase === true ? '7.5' : '4.5'}" ry="${config.inverter.three_phase === true ? '7.5' : '4.5'}" fill="none" stroke="${grid_colour}" pointer-events="all"/>
            <rect id="pv1" x="${config.solar.mppts === 1 ? '205' : '154'}" y="54.5" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${solar_colour}" pointer-events="all" class="${config.show_solar === false ? 'st12' : ''}"/>
            <rect id="pv2" x="254" y="54.5" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${solar_colour}" pointer-events="all" class="${config.show_solar === false || config.solar.mppts === 1 ? 'st12' : ''}"/>
            <rect id="pv3" x="78" y="54.5" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${solar_colour}" pointer-events="all" class="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 ? 'st12' : ''}"/>
            <rect id="pv4" x="330" y="54.5" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${solar_colour}" pointer-events="all" class="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 || config.solar.mppts === 3 ? 'st12' : ''}"/>
            <rect id="es-load1" x="406" y="116.5" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${load_colour}" pointer-events="all" display="${additional_load === 1  ? '' : 'none'}"/>
            <rect id="es-load1" x="406" y="116.5" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${load_colour}" pointer-events="all" display="${additional_load === 2  ? '' : 'none'}"/>
            <rect id="es-load2" x="406" y="290" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${load_colour}" pointer-events="all" display="${additional_load === 2  ? '' : 'none'}"/>
            <rect id="es-load4" x="405" y="127" width="35" height="20" rx="4.5" ry="4.5" fill="none" stroke="${load_colour}" pointer-events="all" display="${additional_load === 4 ? '' : 'none'}"/>
            <rect id="es-load4" x="441" y="127" width="35" height="20" rx="4.5" ry="4.5" fill="none" stroke="${load_colour}" pointer-events="all" display="${additional_load === 4 ? '' : 'none'}"/>
            <rect id="es-load4" x="405" y="290" width="35" height="20" rx="4.5" ry="4.5" fill="none" stroke="${load_colour}" pointer-events="all" display="${additional_load === 4 ? '' : 'none'}"/>
            <rect id="es-load4" x="441" y="290" width="35" height="20" rx="4.5" ry="4.5" fill="none" stroke="${load_colour}" pointer-events="all" display="${additional_load === 4 ? '' : 'none'}"/>
            
            <text id="duration" x="290" y="377.5" class="${font !== true ? 'st14' : 'st4'} left-align" display="${config.show_battery === false ? 'none' : ''}" fill="${config.battery.energy === 0 || float === true || battery_power === 0 ? 'transparent' : `${battery_colour}`}" >${duration}</text>
            <text id="duration_text" x="290" y="393.7" class="st3 left-align" display="${config.show_battery === false ? 'none' : ''}" fill="${config.battery.energy === 0 || battery_power <= 0 || float === true ? 'transparent' : `${battery_colour}`}" >${localize('common.runtime_to')} ${battery_capacity}% @${formattedResultTime}</text>
            <text id="duration_text_charging" x="290" y="393.7" class="st3 left-align" display="${config.show_battery === false ? 'none' : ''}" fill="${config.battery.energy === 0 || battery_power >= 0 || float === true ? 'transparent' : `${battery_colour}`}" >${localize('common.to')} ${battery_capacity}% ${localize('common.charge')} @${formattedResultTime}</text>
            <text id="floating" x="290" y="393.7" class="st3 left-align" display="${config.show_battery === false ? 'none' : ''}" fill="${config.battery.energy === 0 || float === false ? 'transparent' : `${battery_colour}`}" >${localize('common.battery_floating')}</text>
            <text id="daily_bat_charge" x="77.2" y="357.2" class="st3 left-align"  fill="${battery_showdaily !== true || config.show_battery === false ? 'transparent' : `${battery_colour}`}"  >${localize('common.daily_charge')}</text>
            <text id="daily_bat_dischcharge" x="77.2" y="393.7" class="st3 left-align"  fill="${battery_showdaily !== true || config.show_battery === false ? 'transparent' : `${battery_colour}`}" >${localize('common.daily_discharge')}</text>
            <text id="daily_load" x="${additional_load === 2 || additional_load === 4 ? '365' : '415'}" y="${additional_load === 2 || additional_load === 4 ? '189' : '282.1'}" class="st3 left-align" fill="${load_showdaily === false ? 'transparent' : `${load_colour}`}" >${localize('common.daily_load')}</text>
            <text id="daily_grid_buy" x="5" y="282.1" class="st3 left-align" fill="${grid_showdailybuy !== true ? 'transparent' : `${grid_colour}`}" >${localize('common.daily_grid_buy')}</text>
            <text id="daily_grid_sell" x="5" y="179" class="st3 left-align" fill="${grid_showdailysell !== true ? 'transparent' : `${grid_colour}`}" >${localize('common.daily_grid_sell')}</text>
            <text id="daily_solar" x="200" y="40" class="st3 left-align" display="${config.solar.display_mode === 1 ? '' : 'none'}" fill="${solar_showdaily !== true || config.show_solar === false ? 'transparent' : `${solar_colour}`}" >${localize('common.daily_solar')}</text>
            <text id="remaining_solar" x="200" y="40" class="st3 left-align" display="${config.solar.display_mode === 2 ? '' : 'none'}" fill="${solar_showdaily !== true || config.show_solar === false  ? 'transparent' : `${solar_colour}`}" >${localize('common.daily_solar_left')}</text>
            <text id="total_solar_generation" x="200" y="40" class="st3 left-align" display="${config.solar.display_mode === 3 ? '' : 'none'}" fill="${solar_showdaily !== true || config.show_solar === false ? 'transparent' : `${solar_colour}`}" >${localize('common.total_solar_generation')}</text>
            <text x="${config.solar.mppts === 1 ? '212.7' : '162'}" y="94" class="st3 st8" display="${config.show_solar === false ? 'none' : ''}" fill="${solar_colour}">${config.solar.pv1_name}</text>
            <text x="264" y="94" class="st3 st8" display="${config.show_solar === false || config.solar.mppts === 1 ? 'none' : ''}" fill="${solar_colour}">${config.solar.pv2_name}</text>
            <text x="88" y="94" class="st3 st8" display="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 ? 'none' : ''}" fill="${solar_colour}">${config.solar.pv3_name}</text>
            <text x="340" y="94" class="st3 st8" display="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 || config.solar.mppts === 3 ? 'none' : ''}" fill="${solar_colour}">${config.solar.pv4_name}</text>
            <text id="autarkye_value" x="130" y="260" display="${useautarky === "no" ? 'none' : ''}" class="${useautarky === 'energy' ? 'st4 st8 left-align' : 'st12'}" fill="${inverter_colour}" >${Autarky}%</text>
            <text id="ratioe_value" x="173" y="260" display="${useautarky === "no" ? 'none' : ''}" class="${useautarky === 'energy' ? 'st4 st8 left-align' : 'st12'}" fill="${inverter_colour}" >${Ratio}%</text>
            <text id="autarkyp_value" x="130" y="260" display="${useautarky === "no" ? 'none' : ''}" class="${useautarky === 'power' ? 'st4 st8 left-align' : 'st12'}" fill="${inverter_colour}" >${Autarkyp}%</text>
            <text id="ratiop_value" x="173" y="260" display="${useautarky === "no" ? 'none' : ''}" class="${useautarky === 'power' ? 'st4 st8 left-align' : 'st12'}" fill="${inverter_colour}" >${Ratiop}%</text>
            <text id="autarky" x="130" y="273" display="${useautarky === "no" ? 'none' : ''}" class="st3 left-align" fill="${inverter_colour}" >${localize('common.autarky')}</text>
            <text id="ratio" x="173" y="273" display="${useautarky === "no" ? 'none' : ''}" class="st3 left-align" fill="${inverter_colour}" >${localize('common.ratio')}</text>
            <text id="es-load1" x="441" y="108" class="st3" display="${(additional_load === 1 || additional_load === 2)  ? '' : 'none'}" fill="${load_colour}" >${config.load?.load1_name ? `${config.load.load1_name}` : ''}</text>
            <text id="es-load2" x="441" y="330.5" class="st3" display="${additional_load === 2  ? '' : 'none'}" fill="${load_colour}" >${config.load?.load2_name ? `${config.load.load2_name}` : ''}</text>
            <text id="es-load4" x="423" y="156" class="st3 st8" display="${additional_load === 4  ? '' : 'none'}" fill="${load_colour}" >${config.load?.load1_name ? `${config.load.load1_name}` : ''}</text>
            <text id="es-load4" x="459" y="156" class="st3 st8" display="${additional_load === 4  ? '' : 'none'}" fill="${load_colour}" >${config.load?.load2_name ? `${config.load.load2_name}` : ''}</text>
            <text id="es-load4" x="423" y="320" class="st3 st8" display="${additional_load === 4  ? '' : 'none'}" fill="${load_colour}" >${config.load?.load3_name ? `${config.load.load3_name}` : ''}</text>
            <text id="es-load4" x="459" y="320" class="st3 st8" display="${additional_load === 4  ? '' : 'none'}" fill="${load_colour}" >${config.load?.load4_name ? `${config.load.load4_name}` : ''}</text>
            <text id="load-power-L1" x="375" y="241" display="${config.inverter.three_phase === true && config.entities?.load_power_L1 ? '' : 'none'}" class="st3 left-align" fill="${load_colour}" >${config.load.auto_scale === true ? `${convertValue(load_power_L1, round) || 0}` : `${load_power_L1 || ''} W`}</text>
            <text id="load-power-L2" x="375" y="254" display="${config.inverter.three_phase === true && config.entities?.load_power_L2 ? '' : 'none'}" class="st3 left-align" fill="${load_colour}" >${config.load.auto_scale === true ? `${convertValue(load_power_L2, round) || 0}` : `${load_power_L2 || ''} W`}</text>
            <text id="load-power-L3" x="375" y="267" display="${config.inverter.three_phase === true && config.entities?.load_power_L3 ? '' : 'none'}" class="st3 left-align" fill="${load_colour}" >${config.load.auto_scale === true ? `${convertValue(load_power_L3, round) || 0}` : `${load_power_L3 || ''} W`}</text>

            <circle id="standby" cx="220" cy="260" r="3.5" fill="${inverterStateColour}"/>

            <path id="pv1-line" d="${config.solar.mppts === 1 ? 'M 239.23 84 L 239 190' : 'M 187 84 L 187 122 Q 187 132 195 132 L 205 132.03'}" class="${config.show_solar === false ? 'st12' : ''}" fill="none" stroke="${solar_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="pv1-dot" cx="0" cy="0" r="3" class="${config.show_solar === false ? 'st12' : ''}" fill="${parseInt(stateObj9.state) <= 0 ? 'transparent' : `${solar_colour}`}">
              <animateMotion dur="${solar_animation_speed}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#pv1-line"/>
              </animateMotion>
            </circle>
            <path id="pv2-line" d="M 289 84.5 L 289 125 Q 289 132 282 132 L 275 132" class="${config.show_solar === false || config.solar.mppts === 1 ? 'st12' : ''}" fill="none" stroke="${solar_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="pv2-dot" cx="0" cy="0" r="3" class="${config.show_solar === false || config.solar.mppts === 1 ? 'st12' : ''}" fill="${parseInt(stateObj8.state) <= 0 ? 'transparent' : `${solar_colour}`}">
              <animateMotion dur="${solar_animation_speed}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#pv2-line"/>
              </animateMotion>
            </circle>
            <path id="pv3-line" d="M 113 84 L 113 125 Q 113 132 120 132 L 205 132.03" class="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 ? 'st12' : ''}" fill="none" stroke="${solar_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="pv3-dot" cx="0" cy="0" r="3" class="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 ? 'st12' : ''}" fill="${parseInt(stateObj31.state) <= 0 ? 'transparent' : `${solar_colour}`}">
              <animateMotion dur="${solar_animation_speed}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#pv3-line"/>
              </animateMotion>
            </circle>
            <path id="pv4-line" d="M 365 85 L 365 125 Q 365 132 358 132 L 275 132" class="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 || config.solar.mppts === 3 ? 'st12' : ''}" fill="none" stroke="${solar_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="pv4-dot" cx="0" cy="0" r="3" class="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 || config.solar.mppts === 3 ? 'st12' : ''}" fill="${parseInt(stateObj32.state) <= 0 ? 'transparent' : `${solar_colour}`}">
              <animateMotion dur="${solar_animation_speed}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#pv4-line"/>
              </animateMotion>
            </circle>
            <path id="bat-line" d="M 239.23 250 L 239.21 288.03 Q 239.21 298.03 239.1 308.02 L 239 324" class="${config.show_battery === false ? 'st12' : ''}" fill="none" stroke="${battery_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="power-dot-charge" cx="0" cy="0" r="3" class="${config.show_battery === false ? 'st12' : ''}" fill="${battery_power < 0 || battery_power === 0 ? 'transparent' : `${battery_colour}`}">
              <animateMotion dur="${battery_animation_speed}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#bat-line"/>
              </animateMotion>
            </circle>
            <circle id="power-dot-discharge" cx="0" cy="0" r="3" class="${config.show_battery === false ? 'st12' : ''}" fill="${battery_power > 0 || battery_power === 0 ? 'transparent' : `${battery_colour}`}">
              <animateMotion dur="${battery_animation_speed}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#bat-line"/>
              </animateMotion>
            </circle>
            <path id="so-line" d="M 239.23 190 L 239 147" class="${config.show_solar === false || config.solar.mppts === 1 ? 'st12' : ''}" fill="none" stroke="${solar_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="so-dot" cx="0" cy="0" r="3" class="${config.show_solar === false || config.solar.mppts === 1 ? 'st12' : ''}" fill="${totalsolar === 0 ? 'transparent' : `${solar_colour}`}">
              <animateMotion dur="${solar_animation_speed}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#so-line"/>
              </animateMotion>
            </circle>
            <path id="grid-line" d="M 173 218.25 L 214 218" fill="none" stroke="${grid_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="grid-dot" cx="0" cy="0" r="3" fill="${grid_power < 0 || grid_power === 0 ? 'transparent' : `${grid_colour}`}">
              <animateMotion dur="${grid_animation_speed}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#grid-line"/>
              </animateMotion>
            </circle>
            <circle id="grid-dot" cx="0" cy="0" r="3" fill="${grid_power > 0 || grid_power === 0 ? 'transparent' : `${grid_colour}`}">
              <animateMotion dur="${grid_animation_speed}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#grid-line"/>
              </animateMotion>
            </circle>
            <path id="grid-line1" d="M 103 218.25 L 64.5 218.25" fill="none" stroke="${grid_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="grid-dot1" cx="0" cy="0" r="3" fill="${grid_power < 0 || grid_power === 0 ? 'transparent' : `${grid_colour}`}">
              <animateMotion dur="${grid_animation_speed}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#grid-line1"/>
              </animateMotion>
            </circle>
            <circle id="grid-dot1" cx="0" cy="0" r="3" fill="${grid_power > 0 || grid_power === 0 ? 'transparent' : `${grid_colour}`}">
              <animateMotion dur="${grid_animation_speed}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#grid-line1"/>
              </animateMotion>
            </circle>
            <path id="es-line" d="M 304 218.5 L 264.7 218.48" fill="none" stroke="${load_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="es-dot" cx="0" cy="0" r="3" fill="${essential === 0 ? 'transparent' : `${load_colour}`}">
              <animateMotion dur="${load_animation_speed}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#es-line"/>
              </animateMotion>
            </circle>
            <path id="es-line1" d="M 374 218.5 L 402.38 218.52" fill="none" stroke="${load_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="es-dot" cx="0" cy="0" r="3" fill="${essential === 0 ? 'transparent' : `${load_colour}`}">
              <animateMotion dur="${load_animation_speed}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#es-line1"/>
              </animateMotion>
            </circle>
            <path id="es-load1" d="M 441 180 L 441 147" class="${additional_load === 1 ? '' : 'st12'}" fill="none" stroke="${load_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <path id="es-load1" d="M 441 180 L 441 147" class="${additional_load === 2 || additional_load === 4 ? '' : 'st12'}" fill="none" stroke="${load_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <path id="es-load2" d="M 441 290 L 441 257" class="${additional_load === 2 || additional_load === 4 ? '' : 'st12'}" fill="none" stroke="${load_colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>

            <svg xmlns="http://www.w3.org/2000/svg" id="ess_oven_top" x="368" y="113" width="36" height="36" viewBox="0 0 32 32" opacity="${load1e_icon === 'oven' && (additional_load === 1 || additional_load === 2) ? '1' : '0'}"><path display="${additional_load === 0  ? 'none' : ''}" fill="${load_colour}" d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17Zm24 0A2.5 2.5 0 0 0 24.5 5h-17A2.5 2.5 0 0 0 5 7.5V11h22V7.5Zm0 17V13H5v11.5A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5Zm-17-15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM23.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM9 23v-6h14v6H9Zm-.5-8A1.5 1.5 0 0 0 7 16.5v7A1.5 1.5 0 0 0 8.5 25h15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_oven_bottom" x="368" y="287" width="36" height="36" viewBox="0 0 32 32" opacity="${load2e_icon === 'oven' && additional_load === 2 ? '1' : '0'}"><path display="${additional_load === 0  ? 'none' : ''}" fill="${load_colour}" d="M3 7.5A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v17a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17Zm24 0A2.5 2.5 0 0 0 24.5 5h-17A2.5 2.5 0 0 0 5 7.5V11h22V7.5Zm0 17V13H5v11.5A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5Zm-17-15a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM23.5 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM9 23v-6h14v6H9Zm-.5-8A1.5 1.5 0 0 0 7 16.5v7A1.5 1.5 0 0 0 8.5 25h15a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_pump_top" x="368" y="113" width="36" height="36" viewBox="0 0 24 24" opacity="${load1e_icon === 'pump' && (additional_load === 1 || additional_load === 2) ? '1' : '0'}"><path display="${additional_load === 0 ? 'none' : ''}" fill="${load_colour}" d="M3 17h4.1q-.425-.425-.787-.925T5.675 15H3v2Zm9 0q2.075 0 3.538-1.463T17 12q0-2.075-1.463-3.538T12 7Q9.925 7 8.462 8.463T7 12q0 2.075 1.463 3.538T12 17Zm6.325-8H21V7h-4.1q.425.425.788.925T18.325 9ZM1 20v-8h2v1h2.075q-.05-.25-.063-.488T5 12q0-2.925 2.038-4.963T12 5h9V4h2v8h-2v-1h-2.075q.05.25.063.488T19 12q0 2.925-2.038 4.963T12 19H3v1H1Zm2-3v-2v2Zm18-8V7v2Zm-9 3Zm0 3q-.825 0-1.413-.588T10 13q0-.575.238-1.137t.912-1.613L12 9l.85 1.25q.675 1.05.913 1.613T14 13q0 .825-.588 1.413T12 15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_pump_bottom" x="368" y="287" width="36" height="36" viewBox="0 0 24 24" opacity="${load2e_icon === 'pump' && additional_load === 2 ? '1' : '0'}"><path display="${additional_load === 0  ? 'none' : ''}" fill="${load_colour}" d="M3 17h4.1q-.425-.425-.787-.925T5.675 15H3v2Zm9 0q2.075 0 3.538-1.463T17 12q0-2.075-1.463-3.538T12 7Q9.925 7 8.462 8.463T7 12q0 2.075 1.463 3.538T12 17Zm6.325-8H21V7h-4.1q.425.425.788.925T18.325 9ZM1 20v-8h2v1h2.075q-.05-.25-.063-.488T5 12q0-2.925 2.038-4.963T12 5h9V4h2v8h-2v-1h-2.075q.05.25.063.488T19 12q0 2.925-2.038 4.963T12 19H3v1H1Zm2-3v-2v2Zm18-8V7v2Zm-9 3Zm0 3q-.825 0-1.413-.588T10 13q0-.575.238-1.137t.912-1.613L12 9l.85 1.25q.675 1.05.913 1.613T14 13q0 .825-.588 1.413T12 15Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_ac_top" x="374" y="116" width="30" height="30" viewBox="0 0 24 24" opacity="${load1e_icon === 'aircon' && (additional_load === 1 || additional_load === 2) ? '1' : '0'}"><path display="${additional_load === 0  ? 'none' : ''}" fill="${load_colour}" d="M6.59.66c2.34-1.81 4.88.4 5.45 3.84c.43 0 .85.12 1.23.34c.52-.6.98-1.42.8-2.34c-.42-2.15 1.99-3.89 4.28-.92c1.81 2.34-.4 4.88-3.85 5.45c0 .43-.11.86-.34 1.24c.6.51 1.42.97 2.34.79c2.13-.42 3.88 1.98.91 4.28c-2.34 1.81-4.88-.4-5.45-3.84c-.43 0-.85-.13-1.22-.35c-.52.6-.99 1.43-.81 2.35c.42 2.14-1.99 3.89-4.28.92c-1.82-2.35.4-4.89 3.85-5.45c0-.43.13-.85.35-1.23c-.6-.51-1.42-.98-2.35-.8c-2.13.42-3.88-1.98-.91-4.28M5 16h2a2 2 0 0 1 2 2v6H7v-2H5v2H3v-6a2 2 0 0 1 2-2m0 2v2h2v-2H5m7.93-2H15l-2.93 8H10l2.93-8M18 16h3v2h-3v4h3v2h-3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_ac_bottom" x="374" y="289" width="30" height="30" viewBox="0 0 24 24" opacity="${load2e_icon === 'aircon' && additional_load === 2 ? '1' : '0'}"><path display="${additional_load === 0  ? 'none' : ''}" fill="${load_colour}" d="M6.59.66c2.34-1.81 4.88.4 5.45 3.84c.43 0 .85.12 1.23.34c.52-.6.98-1.42.8-2.34c-.42-2.15 1.99-3.89 4.28-.92c1.81 2.34-.4 4.88-3.85 5.45c0 .43-.11.86-.34 1.24c.6.51 1.42.97 2.34.79c2.13-.42 3.88 1.98.91 4.28c-2.34 1.81-4.88-.4-5.45-3.84c-.43 0-.85-.13-1.22-.35c-.52.6-.99 1.43-.81 2.35c.42 2.14-1.99 3.89-4.28.92c-1.82-2.35.4-4.89 3.85-5.45c0-.43.13-.85.35-1.23c-.6-.51-1.42-.98-2.35-.8c-2.13.42-3.88-1.98-.91-4.28M5 16h2a2 2 0 0 1 2 2v6H7v-2H5v2H3v-6a2 2 0 0 1 2-2m0 2v2h2v-2H5m7.93-2H15l-2.93 8H10l2.93-8M18 16h3v2h-3v4h3v2h-3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_boiler_top" x="371" y="113" width="36" height="36" viewBox="0 0 24 24" opacity="${load1e_icon === 'boiler' && (additional_load === 1 || additional_load === 2) ? '1' : '0'}"><path display="${additional_load === 0  ? 'none' : ''}" fill="${load_colour}" d="M9.3 10.775q0 .475.163.925t.462.825q.05-.3.2-.588t.375-.487L12 10l1.475 1.475q.225.2.375.475t.2.575q.275-.375.487-.8t.213-.9q0-.475-.15-.913t-.45-.812q-.275.125-.563.2T13 9.375q-.75 0-1.375-.425t-.95-1.125q-.3.3-.55.637t-.438.713Q9.5 9.55 9.4 9.95t-.1.825ZM12 12.1l-.425.425q-.1.1-.138.2t-.037.225q0 .25.175.4t.425.15q.25 0 .425-.15t.175-.4q0-.125-.037-.225t-.138-.2L12 12.1ZM12 5v1.9q0 .425.3.713t.725.287q.275 0 .5-.162t.4-.388l.175-.25q1.025.575 1.588 1.563t.562 2.162q0 1.75-1.25 2.963T12 15q-1.75 0-2.975-1.225T7.8 10.8q0-1.925 1.225-3.425T12 5ZM6 22q-.825 0-1.413-.588T4 20V6q0-1.65 1.175-2.825T8 2h8q1.65 0 2.825 1.175T20 6v14q0 .825-.588 1.413T18 22H6Zm0-4v2h12v-2q-.75 0-1.2.5T15 19q-1.35 0-1.763-.5T12 18q-.825 0-1.238.5T9 19q-1.35 0-1.763-.5T6 18Zm3-1q.825 0 1.238-.5T12 16q1.35 0 1.8.5t1.2.5q.75 0 1.2-.5T18 16V6q0-.825-.588-1.413T16 4H8q-.825 0-1.413.588T6 6v10q1.35 0 1.763.5T9 17Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="ess_boiler_bottom" x="371" y="287" width="36" height="36" viewBox="0 0 24 24" opacity="${load2e_icon === 'boiler' && additional_load === 2 ? '1' : '0'}"><path display="${additional_load === 0 ? 'none' : ''}" fill="${load_colour}" d="M9.3 10.775q0 .475.163.925t.462.825q.05-.3.2-.588t.375-.487L12 10l1.475 1.475q.225.2.375.475t.2.575q.275-.375.487-.8t.213-.9q0-.475-.15-.913t-.45-.812q-.275.125-.563.2T13 9.375q-.75 0-1.375-.425t-.95-1.125q-.3.3-.55.637t-.438.713Q9.5 9.55 9.4 9.95t-.1.825ZM12 12.1l-.425.425q-.1.1-.138.2t-.037.225q0 .25.175.4t.425.15q.25 0 .425-.15t.175-.4q0-.125-.037-.225t-.138-.2L12 12.1ZM12 5v1.9q0 .425.3.713t.725.287q.275 0 .5-.162t.4-.388l.175-.25q1.025.575 1.588 1.563t.562 2.162q0 1.75-1.25 2.963T12 15q-1.75 0-2.975-1.225T7.8 10.8q0-1.925 1.225-3.425T12 5ZM6 22q-.825 0-1.413-.588T4 20V6q0-1.65 1.175-2.825T8 2h8q1.65 0 2.825 1.175T20 6v14q0 .825-.588 1.413T18 22H6Zm0-4v2h12v-2q-.75 0-1.2.5T15 19q-1.35 0-1.763-.5T12 18q-.825 0-1.238.5T9 19q-1.35 0-1.763-.5T6 18Zm3-1q.825 0 1.238-.5T12 16q1.35 0 1.8.5t1.2.5q.75 0 1.2-.5T18 16V6q0-.825-.588-1.413T16 4H8q-.825 0-1.413.588T6 6v10q1.35 0 1.763.5T9 17Z"/></svg>

            <g display="${additional_load === 0 || additional_load === 4 ? 'none' : ''}">
              <foreignObject x="371" y="114" width="36" height="36" style="position: fixed; " >
                <body xmlns="http://www.w3.org/1999/xhtml" >
                  <div style="position: fixed; ">
                      <ha-icon icon="${load1e_icon}" class="essload-icon" ></ha-icon>
                  </div>
                </body>
              </foreignObject>
            </g>

            <g display="${additional_load === 0 || additional_load === 1 || additional_load === 4 ? 'none' : ''}">
              <foreignObject x="371" y="288" width="36" height="36" style="position:fixed; " >
                <body xmlns="http://www.w3.org/1999/xhtml" >
                  <div style="position: fixed; ">
                    <ha-icon icon="${load2e_icon}" class="essload-icon" ></ha-icon>
                  </div>
                </body>
              </foreignObject>
            </g>

            <g display="${additional_load === 4  ? '' : 'none'}" >
              <foreignObject x="412" y="101" width="30" height="30" style="position: fixed; ">
                <body xmlns="http://www.w3.org/1999/xhtml">
                  <div style="position: fixed; ">
                    <ha-icon icon="${load1e_icon}" class="essload_small-icon" ></ha-icon>
                  </div>
                </body>
              </foreignObject>
            </g>

            <g display="${additional_load === 4  ? '' : 'none'}" >
              <foreignObject x="449" y="101" width="30" height="30" style="position: fixed; ">
                <body xmlns="http://www.w3.org/1999/xhtml">
                  <div style="position: fixed; ">
                    <ha-icon icon="${load2e_icon}" class="essload_small-icon" ></ha-icon>
                  </div>
                </body>
              </foreignObject>
            </g>

            <g display="${additional_load === 4  ? '' : 'none'}" >
              <foreignObject x="412" y="264" width="30" height="30" style="position: fixed; ">
                <body xmlns="http://www.w3.org/1999/xhtml">
                  <div style="position: fixed; ">
                    <ha-icon icon="${load3e_icon}" class="essload_small-icon" ></ha-icon>
                  </div>
                </body>
              </foreignObject>
            </g>

            <g display="${additional_load === 4  ? '' : 'none'}" >
              <foreignObject x="449" y="264" width="30" height="30" style="position: fixed; ">
                <body xmlns="http://www.w3.org/1999/xhtml">
                  <div style="position: fixed; ">
                    <ha-icon icon="${load4e_icon}" class="essload_small-icon" ></ha-icon>
                  </div>
                </body>
              </foreignObject>
            </g>


            <svg xmlns="http://www.w3.org/2000/svg" id="sun" x="154" y="10" width="40" height="40" viewBox="0 0 24 24"><path class="${config.show_solar === false ? 'st12' : ''}" fill="${solar_colour}" d="M11.45 2v3.55L15 3.77L11.45 2m-1 6L8 10.46l3.75 1.25L10.45 8M2 11.45L3.77 15l1.78-3.55H2M10 2H2v8c.57.17 1.17.25 1.77.25c3.58.01 6.49-2.9 6.5-6.5c-.01-.59-.1-1.18-.27-1.75m7 20v-6h-3l5-9v6h3l-5 9Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-high" x="232.5" y="325.5" width="78.75" height="78.75" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) >= bat_full ? 1 : 0}" viewBox="0 0 24 24"> <path class="${config.show_battery === false ? 'st12' : ''}" fill="${battery_colour}" d="M 12 20 H 4 V 6 h 8 L 12 20 m 0.67 -16 H 11 V 2 H 5 v 2 H 3.33 C 2.6 4 2 4.6 2 5.33 v 15.34 C 2 21.4 2.6 22 3.33 22 h 9.34 c 0.74 0 1.33 -0.59 1.33 -1.33 V 5.33 C 14 4.6 13.4 4 12.67 4 M 11 16 H 5 v 3 h 6 v -3 m 0 -9 H 5 v 3 h 6 V 7 m 0 4.5 H 5 v 3 h 6 v -3 h -3 h 3"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-med" x="232.5" y="325.5" width="78.75" height="78.75" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) >= 50 && parseInt(stateObj12.state) < bat_full ? 1 : 0}" viewBox="0 0 24 24"><path class="${config.show_battery === false ? 'st12' : ''}" fill="${battery_colour}" d="M 12 20 H 4 V 6 h 8 L 12 20 m 0.67 -16 H 11 V 2 H 5 v 2 H 3.33 C 2.6 4 2 4.6 2 5.33 v 15.34 C 2 21.4 2.6 22 3.33 22 h 9.34 c 0.74 0 1.33 -0.59 1.33 -1.33 V 5.33 C 14 4.6 13.4 4 12.67 4 M 11 16 H 5 v 3 h 6 v -3 m 0 -4.5 H 5 v 3 h 6 v -3 h -3 h 3"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-low" x="232.5" y="325.5" width="78.75" height="78.75" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) > bat_empty && parseInt(stateObj12.state) <= 49 ? 1 : 0}" viewBox="0 0 24 24"><path class="${config.show_battery === false ? 'st12' : ''}" fill="${battery_colour}" d="M 12 20 H 4 V 6 h 8 L 12 6 L 12 20 m 0.67 -15.999 H 11 V 2 H 5 v 2 H 3.33 C 2.6 4 2 4.6 2 5.33 v 15.34 C 2 21.4 2.6 22 3.33 22 h 9.34 c 0.74 0 1.33 -0.59 1.33 -1.33 V 5.33 C 14 4.6 13.4 4 12.67 4 M 11 16 H 5 v 3 h 6 v -3"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-empty" x="232.5" y="325.5" width="78.75" height="78.75" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) <= bat_empty ? 1 : 0}" viewBox="0 0 24 24"> <path class="${config.show_battery === false ? 'st12' : ''}" fill="${battery_colour}" d="M 12 6 L 12 20 M 12 20 H 4 l 0.05 -14 h 7.95 m 0.67 -2 h -1.67 V 2 h -6 v 2 H 3.38 a 1.33 1.33 0 0 0 -1.33 1.33 v 15.34 c 0 0.73 0.6 1.33 1.33 1.33 h 9.34 c 0.73 0 1.33 -0.6 1.33 -1.33 V 5.33 A 1.33 1.33 0 0 0 12.72 4 Z"/></svg>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.grid_connected_status_194)}>
              <svg xmlns="http://www.w3.org/2000/svg" id="transmission_on" x="-0.5" y="187.5" width="64.5" height="64.5" viewBox="0 0 24 24"><path class="${grid_status === 'off' || grid_status === '0' || grid_status === 'Off-Grid' ? 'st12' : ''}" fill="${grid_colour}" d="m8.28 5.45l-1.78-.9L7.76 2h8.47l1.27 2.55l-1.78.89L15 4H9l-.72 1.45M18.62 8h-4.53l-.79-3h-2.6l-.79 3H5.38L4.1 10.55l1.79.89l.73-1.44h10.76l.72 1.45l1.79-.89L18.62 8m-.85 14H15.7l-.24-.9L12 15.9l-3.47 5.2l-.23.9H6.23l2.89-11h2.07l-.36 1.35L12 14.1l1.16-1.75l-.35-1.35h2.07l2.89 11m-6.37-7l-.9-1.35l-1.18 4.48L11.4 15m3.28 3.12l-1.18-4.48l-.9 1.36l2.08 3.12Z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" id="transmission_off" x="-0.5" y="187.5" width="64.5" height="64.5" viewBox="0 0 24 24"><path class="${grid_status === 'on' || grid_status === '1' || grid_status === 'On-Grid' ? 'st12' : ''}" fill="${no_grid_colour}" d="M22.1 21.5L2.4 1.7L1.1 3l5 5h-.7l-1.3 2.5l1.8.9l.7-1.4h1.5l1 1l-2.9 11h2.1l.2-.9l3.5-5.2l3.5 5.2l.2.9h2.1l-.8-3.2l3.9 3.9l1.2-1.2M9.3 18.1l1.2-4.5l.9 1.3l-2.1 3.2m5.4 0L12.6 15l.2-.3l1.3 1.3l.6 2.1m-.5-7.1h.7l.2.9l-.9-.9m-.1-3h4.5l1.3 2.6l-1.8.9l-.7-1.5h-4.2l-3-3l.5-2h2.6l.8 3M8.4 5.2L6.9 3.7L7.8 2h8.5l1.3 2.5l-1.8.9L15 4H9l-.6 1.2Z"/></svg>
            </a>
            <svg xmlns="http://www.w3.org/2000/svg" id="essen" x="402" y="177.5" width="79" height="79" viewBox="0 0 24 24"><path fill="${load_colour}" d="M15 9h1V7.5h4V9h1c.55 0 1 .45 1 1v11c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1V10c0-.55.45-1 1-1m1 2v3h4v-3h-4m-4-5.31l-5 4.5V18h5v2H5v-8H2l10-9l2.78 2.5H14v1.67l-.24.1L12 5.69Z"/></svg>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" x="213.5" y="179.5" width="54" height="79" viewBox="0 0 74 91"  preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)" fill="${inverter_colour}" stroke="none"> <path d="M35 887 l-27 -23 0 -404 0 -404 27 -23 c26 -23 28 -23 329 -23 284 0 305 1 327 19 l24 19 0 412 0 412 -24 19 c-22 18 -43 19 -327 19 -301 0 -303 0 -329 -23z m585 -157 l0 -80 -255 0 -255 0 0 80 0 80 255 0 255 0 0 -80z m-242 -229 c44 -34 40 -46 -14 -46 -60 0 -97 -38 -93 -94 5 -64 -23 -80 -35 -20 -9 44 24 113 63 134 35 18 34 15 21 50 -11 29 -14 30 58 -24z m110 -129 c4 -51 -19 -97 -59 -117 -27 -14 -30 -20 -23 -48 l6 -31 -51 43 c-29 24 -49 46 -46 49 3 4 23 5 44 3 58 -4 95 32 97 95 3 60 1 57 17 52 6 -3 13 -23 15 -46z"/> </g> </svg>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.use_timer_248)}>
              <svg xmlns="http://www.w3.org/2000/svg" id="timer" x="267.7" y="243.3" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj26.state == 'on' && usetimer !== false ? '' : 'none'}" fill="${inverter_colour}" d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" id="timer_off" x="267.7" y="243.3" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj26.state == 'off' && usetimer !== false ? '' : 'none'}" fill="${inverter_colour}" d="m19.95 17.15l-1.5-1.5q.275-.675.413-1.337T19 13q0-2.9-2.05-4.95T12 6q-.6 0-1.275.125t-1.4.4l-1.5-1.5q.95-.5 2.012-.763T12 4q1.5 0 2.938.5t2.712 1.45l1.4-1.4l1.4 1.4l-1.4 1.4q.95 1.275 1.45 2.713T21 13q0 1.05-.263 2.087t-.787 2.063ZM13 10.2V8h-2v.2l2 2Zm6.8 12.4l-2.4-2.4q-1.2.875-2.588 1.338T12 22q-1.85 0-3.488-.713T5.65 19.35q-1.225-1.225-1.938-2.863T3 13q0-1.5.463-2.888T4.8 7.6L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4ZM12 20q1.05 0 2.05-.325t1.875-.925L6.2 9.025q-.6.875-.9 1.875T5 13q0 2.9 2.05 4.95T12 20ZM9 3V1h6v2H9Zm2.075 10.875Zm2.825-2.8Z"/></svg>
              <text id="timer_text_off" x="287" y="254.7" class="st3 left-align" display="${stateObj26.state == 'off' && usetimer !== false ? '' : 'none'}" fill="${inverter_colour}">${localize('common.timer_off')}</text>
              <text id="timer_text_on" x="287" y="254.7" class="st3 left-align" display="${stateObj26.state == 'on' && usetimer !== false ? '' : 'none'}" fill="${inverter_colour}">${localize('common.timer_on')}</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.priority_load_243)}>
              <svg xmlns="http://www.w3.org/2000/svg" id="pbat" x="267.7" y="262.5" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj25.state === 'off' && priority !== false ? '' : 'none'}" fill="${inverter_colour}" d="M15.95 21.175L13.1 18.35l1.425-1.4l1.425 1.4l3.525-3.525l1.425 1.4l-4.95 4.95ZM8 22q-.425 0-.713-.288T7 21V5q0-.425.288-.713T8 4h2V2h4v2h2q.425 0 .713.288T17 5v7q-.525 0-1.025.088T15 12.35V6H9v14h2.35q.2.575.488 1.075t.687.925H8Zm1-2h2.35H11h.35H9Z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" id="pload" x="267.7" y="262.5" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj25.state === 'on' && priority !== false ? '' : 'none'}" fill="${inverter_colour}" d="m15 13l-4 4v-3H2v-2h9V9l4 4M5 20v-4h2v2h10v-7.81l-5-4.5L7.21 10H4.22L12 3l10 9h-3v8H5Z"/></svg>
              <text id="priority_text_batt"x="287" y="273" class="st3 left-align" display="${stateObj25.state === 'off' && priority !== false ? '' : 'none'}" fill="${inverter_colour}">${localize('common.priority_batt')}</text>
              <text id="priority_text_load"x="287" y="273" class="st3 left-align" display="${stateObj25.state === 'on' && priority !== false ? '' : 'none'}" fill="${inverter_colour}">${localize('common.priority_load')}</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.solar_sell_247)}>
              <svg xmlns="http://www.w3.org/2000/svg" id="solar_sell_on" x="245" y="150" width="18" height="18" viewBox="0 0 30 30"><path display="${!config.entities.solar_sell_247 || stateObj44.state === 'off' || stateObj44.state === '0' || config.show_solar === false || !['1', 'on'].includes(stateObj44.state) ? 'none' : ''}" fill="${solar_colour}" d="m5.18 5.45l-1.78-.9L4.66 2h8.47l1.27 2.55l-1.78.89L11.9 4h-6l-.72 1.45M15.5 8H11l-.8-3H7.6l-.79 3H2.28L1 10.55l1.79.89L3.5 10h10.78l.72 1.45l1.79-.89L15.5 8m-.83 14H12.6l-.24-.9l-3.46-5.2l-3.47 5.2l-.23.9H3.13L6 11h2.09l-.36 1.35L8.9 14.1l1.16-1.75L9.71 11h2.07l2.89 11M8.3 15l-.9-1.35l-1.18 4.48L8.3 15m3.28 3.12l-1.18-4.48L9.5 15l2.08 3.12M23 16l-4-4v3h-4v2h4v3l4-4Z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" id="solar_sell_off" x="245" y="150" width="18" height="18" viewBox="0 0 30 30"><path display="${!config.entities.solar_sell_247 || stateObj44.state === 'on' || stateObj44.state === '1' || config.show_solar === false || !['0', 'off'].includes(stateObj44.state) ? 'none' : ''}" fill="${solar_colour}" d="M 26 16 L 22 12 L 22 15 L 18 15 L 18 17 L 22 17 L 22 20 L 26 16 Z M 22.1 21.5 L 2.4 1.7 L 1.1 3 L 6.1 8 L 5.4 8 L 4.1 10.5 L 5.9 11.4 L 6.6 10 L 8.1 10 L 9.1 11 L 6.2 22 L 8.3 22 L 8.5 21.1 L 12 15.9 L 15.5 21.1 L 15.7 22 L 17.8 22 L 17 18.8 L 20.9 22.7 L 22.1 21.5 M 9.3 18.1 L 10.5 13.6 L 11.4 14.9 L 9.3 18.1 M 14.7 18.1 L 12.6 15 L 12.8 14.7 L 14.1 16 L 14.7 18.1 M 14.2 11 L 14.9 11 L 15.1 11.9 L 14.2 11 M 14.1 8 L 18.6 8 L 19.9 10.6 L 18.1 11.5 L 17.4 10 L 13.2 10 L 10.2 7 L 10.7 5 L 13.3 5 L 14.1 8 M 8.4 5.2 L 6.9 3.7 L 7.8 2 L 16.3 2 L 17.6 4.5 L 15.8 5.4 L 15 4 L 9 4 L 8.4 5.2 Z"/></svg>
            </a>
            <image x="212" y="180" width="54" height="72" class="${inverter_modern === false ? '' : 'st12'}" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABvCAYAAABRjbZ6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAuhSURBVHhe7Z1nbxNNFIXHpoReE0B0ECDRBRJ8o/wAfhZ/BL2AxCeEQKBECCEkikD0GkjoJZRA6C3Br5/rHGez7Ngbex0bZ4+08nrKnXvP3Ds7OzNOMt+/f8+5PH79+uX6+vrcx48f7T6Tybhx48aRNSYwZcoUN3v2bDdt2jT7nvn27VsOMl69euV+//5thORyxtWYw/jx493ixYvd9OnTXfbPnz+ut7fX9ff3GyljEbKbSHn27Jn78uWLy+ZDyeW9pmIvyWaz9gnB9QYGokelXo8t1Pv69avL/vjxww0MDAxmjRwocuzYMXfkyBHzunoBozBo79697saNG8UOiwvIFKF4TmRtFYoDys2ZM8fNnTs3dp1agM7FqEWLFrkJEyaMSBfqBT2M+0w+pnLPnz83hsPCgoV9oAxPr7DwfxVwYIPv4Peq0Ajji5BUB1VNTD3DJwrok4ROiXhMMyIlxoNhxCg+k4rTuGi0cAR19RgI4Yn2+vVre08DjTKQ140YPJKpd1dXl90zA2c6ziy8IWbRwXnMSPDu3TubaTKxY0JFz/MShpE/f/602ePEiRNdS0uLeQbfuXh7ZYbM+xllqU898vj+9u1bN3XqVJs0Akh6+vSpmzx5sr0B0xb3lMXLkE15ZABm8praT5o0yeRCNvnULxe25Fc8j3n//r25P4AE7iEJoRjC9+7ubnfq1KmiwRjx4sULU1rKqyyG4y0fPnxw8+bNK9aB7EuXLtmsVl507tw5u3/w4IHJuXv3rrt+/brlUR5iX7586d68eWMdcPHiRavPCoJkxEFFxNADYPny5dazIgRgEMsXKLNt2zZ7jyKNS9N2vAhC6UE8hnUQenTGjBmWRxnJgizylyxZ4mbOnOnWrVvnDh8+bO0tWLDACMYzHz16VNSD9pF/4sQJt2nTJtNx4cKFRlxcVEQMaxa48/Hjx4s9I+MFFMTFd+3a5a5evTqst7TuM2vWLCMHMpYuXWrl5S2AOtS/deuW9TzG4lEbNmxwbW1tRiZyVq9ebZ7HRR3Szp4969asWWOkVgIPMSjmf1zT+KpVq9yePXtcR0eHxT1K0yMYxkBKL+IhGNDa2uru378/7O2bniYftyeMIJhxh7ELeQLjxO7du00+4QDoFNpCD2RSfsuWLa6zs9PCHOzYscPKE3LBDosLIwaGhyqLlOA1HBh+7do1d/78ebd161br+Z6eHnflyhV75adX8QR6FLnyMMjiu1weozCQchingRXCIJg8xh96nzIMioD6AHLxMsrjdYQuetAOcrZv327tPXnyxMqPBBFPpagB6m/HogcxDgVoHENksJQNgu+Uox0uPIMBmbEDrwB4DD2ucQd5kEddiBnSsSCP/GAaIEwhVHlcyBCZPpCvTmMsM2JwZQSw7gvbra1z80WDnvI3MUCNIRBASlhRNUgenygN+MTzCCWIkaEaUKNkCaXyggjr5wNt4xyEPZ3KQ8CkoyRMHzp0yJ08edKNy/dOAQj2M02DwUajlFU+eSIFYBzuz5MNZfASvEcyShkehxQQ1s8HPPfo0aPu8uXLRdnFUIJdYpEJGINlIaTiKVAp4vZorUGoES2EEN5SDCUmXig52oo2CjGC9CmGkhRrFAUbAX/FCuSIuVqDthqpM6QP44x3EBktchoVtR1d/0HgEDYdGPyeIo9glKTEeJAS40FKjAcpMR5EEtNo84t6IPUYD+pGDK/6vLxxsZbDwnb4oky9MOrEEKIQwcVSBxcEKHyDF2VYs4E8vo8mRo0YDIMEjB2pJ6geBDErHQ3UlBgZwSfGVWOYZHCNhvfUlBjeUiv1Eh8gRaFXS9SUGJRnEA17iQZdpQeNlOEC98Hv5FO31uTUjBiRok0xgXt2GORFKieSuCefPNLY9YSIIERekLCkUTNiwsYI8hZCDAJ0ukFewFNITyNtBUd5huqI0KRRE2I0SEYBj2Efee3atbabqV0CdhBYiGfzjg27lStXWpk7d+64z58/D/M6AcJqRUzFx0BKQZOzKJn0MpvskEE5jGPXkvLsaclQvrPFyukF9p1IJz8MCCM9Cf1FfnExPGlgrE9R0gkRtnc54nHv3j0LHTwG47kIMTzl4MGD7ubNm8O8JRxWtfKaxIlB0VKDIkbiNXgBocNOpDxMgBjkbN682cpwFESbdWFiAHWj0qtB4qGE0Rga3HUU6FmIIY9dSI6aQRChxJiEJ+HG8hxCiXKUJ08yw7rynXAKelYlqFkoIRgDo0imR0mndyGDpw4noTCYgwEQQH0u7ilLPie1OAVRyiPIS9pjEiUG5ejVqJ5TGvMavIoTUDyRODqGZ9DjPI0YlCGLcy0cNeHQEWdnqFcKkh/VdiVIlBigcCkHNvEpyydk6pgHdfEovISjIPPnzy8+rchLyvBySHSMQWl6G8/xGUAoadZLWYyX4UHgVZyVYV5DnsIrCrSlRzb3lYaVdE58jJFCpYjBOzTgcqqCe0hgIObpwxgFEXgQ51XwHEgphWBblZISRuKhRM+VA4bIGDyHnoYMHtM80eQZKsN3n7cIvo6oFIkTg0dgZKmewwi9JzHwUlahojN4ykNWOaN9A341SJwYEDVmhEH4EDZ8ihDGE0KLuprXgHJEl/OmuAi2YRJJQMFPnz7ZZ7VgXACljGEMwXh6m3K8KEIE8xu+kwfB5JfyiKQ8Be/EUwUjBsYhZN++fa69vb3qxqjP5SOGdEKH46kc61L7kMEYAyGk40EKTR/ohGo9hkF///79NmeiPVCUiKIcNN64cWPJno4DSEFeKYMoQ/iIQCmkwZtPvMonAzK4VK8a8ITcuXOnW7ZsWTFsM11dXTle7cV6qZ4eKWiE0IjTo1KIsuhQDpCmkE0Katd+fYILi4gkSQH0pjwH2VEXsB7K3wcJDJcLX7VGpru7O8e7CEYkScrIQdu1N7gURLjNfEVIfUkB9SMlygOrG86bGCkxHqTEeJB/EKTcRCFlxYOUmDyinsgpMR6kxHiQHa0p9r+GLGsQ9Z/1Nh7sr5pFvdqHPQny9F1vwmFCw2kqr3TJ5IqaJqh8GEpXXd0Lwfuo9kEwHUinMJSeaW9vz7F6BkFaUZPhghrAGL0pyzDWbpXOGgrfWRIQrJGAggLt0F6YIJWXzFKQjpKP9+ttnlUDZITtCMrnngt9SaMeSw4cT8l0dHTkWGeVMaxxoHB/P0oPX1KkIgK5lM4eEaABiBG5cSAlqwUygkbyGYdULtnCJ3VIY+Uwc+HChRwJGHP69GnX1tbq1m9YT81BETQ8ZCgVg2ujUkSIMjSYHweUl05xIGIE7kkL6+LTg848c+aMecqKFSsKy63aImWljT8X0Nl5b1goAATqApTXFW4sWFbXSIFBcUkB4TZESFw9WITn58X8+QORnMmTkSORBHYJCIeWlvCSYXNPdyCCcZa1X4YSDhbYPEZssnLF4DUECGluUgAcYLuGBa7mt7pC/EUM7DHYBgfcsQgjRu4TvsYy0lDyICXGg5QYD1JiPEiJ8SAlxoOUGA9SYjxIifEgJcaDlBgPUmI8SInxICXGg5QYD1JiPEiJ8SAlxoNscAmzsN7LHbt4pXfymh32z+1EDj8B7Osr/MHyAkhv/rVfdlb5/TebjgXnyBRCiRs2nPgFxoED/1nhAsYGMfz2kr8KwDYte0u2n93T05N7/PixFbh9+/bgPzdYYN+H0NxDER7Dz5n5e+X8TpO/DpDp7e3NPXz40MJJe9EDA/pLHgVC8KggmnFrBS+RXZx2yHIEhN19Etn1L5xkgIjC8YgwKc0KHRuBIPtZDjf8Ql6/RSwUGDuEBIFz8AN49rGL/6QXcOqBf6QAIAbS9HumOETp0FEY1IdwyeDTJy/YlnpRaXQe8vmOZwflMQwMdWwhjXLYwD12BMsL5FMX2TgI4wsYRgygYYTziQDuEVoOUoTTEjQWPFzEPXLIB+TrZEGYSNJRlPQo4yGfY3GSBZBHu+gZlkc6dXXyS5A8fardApz7H6zyhGuotUz4AAAAAElFTkSuQmCC" preserveAspectRatio="none"/>
            <a href="#" @click=${(e) => this.handlePopup(e, inverter_prog.entityID)}>
              <svg xmlns="http://www.w3.org/2000/svg" id="prog_grid_on" x="323" y="243" width="20" height="18" viewBox="0 0 24 24"><path display="${inverter_prog.show === false || config.entities.use_timer_248 === 'none' ? 'none' : ''}" class="${inverter_prog.charge === 'none' ? 'st12' : ''}" fill="${inverter_colour}" d="M11.5 19h1v-1.85l3.5-3.5V9H8v4.65l3.5 3.5V19Zm-2 2v-3L6 14.5V9q0-.825.588-1.413T8 7h1L8 8V3h2v4h4V3h2v5l-1-1h1q.825 0 1.413.588T18 9v5.5L14.5 18v3h-5Zm2.5-7Z"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" id="prog_grid_off" x="323" y="243" width="20" height="18" viewBox="0 0 24 24"><path display="${inverter_prog.show === false || config.entities.use_timer_248 === 'none' ? 'none' : ''}" class="${inverter_prog.charge === 'none' ? '' : 'st12'}" fill="${inverter_colour}" d="M10 3H8v1.88l2 2zm6 6v3.88l1.8 1.8l.2-.2V9c0-1.1-.9-2-2-2V3h-2v4h-3.88l2 2H16zM4.12 3.84L2.71 5.25L6 8.54v5.96L9.5 18v3h5v-3l.48-.48l4.47 4.47l1.41-1.41L4.12 3.84zm8.38 13.33V19h-1v-1.83L8 13.65v-3.11l5.57 5.57l-1.07 1.06z"/></svg>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_battery_charge_70)}>
              <text id="daily_bat_charge_value" x="77.2" y="343" class= "st10 left-align" display="${battery_showdaily !== true || config.show_battery === false ? 'none' : ''}" fill="${battery_colour}">${isNaN(parseFloat(stateObj1.state)) ? '0' : `${parseFloat(stateObj1.state).toFixed(1)}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_pv_energy_108)}>
              <text id="daily_solar_value" x="200" y="26" class="st10 left-align" display="${config.solar.display_mode === 1 ? '' : 'none'}" fill="${solar_showdaily !== true || config.show_solar === false ? 'transparent' : `${solar_colour}`}" >${isNaN(parseFloat(stateObj4.state)) ? '0' : `${parseFloat(stateObj4.state).toFixed(1)}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_pv_energy_108)}>
              <text id="remaining_solar_value" x="200" y="26" class="st10 left-align" display="${config.solar.display_mode === 2 ? '' : 'none'}" fill="${solar_showdaily !== true || config.show_solar === false  ? 'transparent' : `${solar_colour}`}" >${isNaN(parseFloat(stateObj4.state)) ? '0' : `${parseFloat(stateObj4.state).toFixed(1)} kWh / ${remaining_solar}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_pv_energy_108)}>
              <text id="total_solar_value" x="200" y="26" class="st10 left-align" display="${config.solar.display_mode === 3 ? '' : 'none'}" fill="${solar_showdaily !== true || config.show_solar === false ? 'transparent' : `${solar_colour}`}" >${isNaN(parseFloat(stateObj4.state)) ? '0' : `${parseFloat(stateObj4.state).toFixed(1)} kWh / ${total_solar_generation}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_battery_discharge_71)}>
              <text id="daily_bat_discharge_value" x="77.2" y="380.1" class="st10 left-align" display="${battery_showdaily !== true || config.show_battery === false ? 'none' : ''}" fill="${battery_colour}" >${isNaN(parseFloat(stateObj.state)) ? '0' : `${parseFloat(stateObj.state).toFixed(1)}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_load_energy_84)}>
              <text id="daily_load_value" x="${additional_load === 2 || additional_load === 4 ? '365' : '415'}" y="${additional_load === 2 || additional_load === 4 ? '175' : '267.9'}" class="st10 left-align" display="${load_showdaily === false ? 'none' : ''}" fill="${load_colour}" >${isNaN(parseFloat(stateObj2.state)) ? '0' : `${parseFloat(stateObj2.state).toFixed(1)}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_grid_import_76)}>
              <text id="daily_grid_buy_value" x="5" y="267.9" class="st10 left-align" display="${grid_showdailybuy !== true ? 'none' : ''}" fill="${grid_colour}" >${isNaN(parseFloat(stateObj3.state)) ? '0' : `${parseFloat(stateObj3.state).toFixed(1)}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.day_grid_export_77)}>
              <text id="daily_grid_sell_value" x="5" y="165" class="st10 left-align" display="${grid_showdailysell !== true ? 'none' : ''}" fill="${grid_colour}" >${isNaN(parseFloat(stateObj33.state)) ? '0' : `${parseFloat(stateObj33.state).toFixed(1)}`} kWh</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.inverter_voltage_154)}>
              <text id="inverter_voltage_154" x="270.2" y="168.2" display="${config.entities.inverter_voltage_154 === 'none' || !config.entities.inverter_voltage_154 ? 'none' : ''}" class="st3 left-align" fill="${inverter_colour}" >${inverter_voltage} ${config.inverter.three_phase === true && config.entities?.inverter_voltage_L2 ? '| ' + inverter_voltage_L2 : ''} ${config.inverter.three_phase === true && config.entities?.inverter_voltage_L3 ? '| ' + inverter_voltage_L3 : ''} V</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.load_frequency_192)}>
              <text id="load_frequency_192" x="270.2" y="192.6" display="${config.entities.load_frequency_192 === 'none' || !config.entities.load_frequency_192 ? 'none' : ''}" class="st3 left-align" fill="${inverter_colour}">${load_frequency} Hz</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.inverter_current_164)}>
              <text id="inverter_current_164" x="270.2" y="180.4" display="${config.entities.inverter_current_164 === 'none' || !config.entities.inverter_current_164 ? 'none' : ''}" class="st3 left-align" fill="${inverter_colour}">${inverter_current} ${config.inverter.three_phase === true && config.entities?.inverter_current_L2 ? '| ' + inverter_current_L2 : ''} ${config.inverter.three_phase === true && config.entities?.inverter_current_L3 ? '| ' + inverter_current_L3 : ''} A</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.battery_voltage_183)}>
              <text id="battery_voltage_183" x="193" y="346" display="${config.entities.battery_voltage_183 === 'none' || !config.entities.battery_voltage_183 || config.show_battery === false ? 'none' : ''}" fill=${battery_colour} class="${font !== true ? 'st14' : 'st4'} st8">${battery_voltage} V</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.battery_soc_184)}>
              <text id="battery_soc_184" x="290" y="358" display="${config.entities.battery_soc_184 === 'none' || config.show_battery === false ? 'none' : ''}" fill=${battery_colour} class="st13 st8 left-align">${parseInt(stateObj12.state)} %</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.battery_soc_184)}>
              <text id="battery_soc_184" x="355" y="358" fill=${battery_colour} class="st13 st8 left-align" display="${inverter_prog.show === false || config.entities.battery_soc_184 === 'none' || config.show_battery === false ? 'none' : ''}"> | ${inverter_prog.capacity || 0} %</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.battery_power_190)}>
              <text id="battery_power_190" x="193" y="386" display="${config.entities.battery_power_190 === 'none' || config.show_battery === false ? 'none' : ''}" fill=${battery_colour} class="${font !== true ? 'st14' : 'st4'} st8">${config.battery.auto_scale === true ? `${config.battery.show_absolute === true ? `${Math.abs(parseFloat(convertValue(battery_power, round)))} ${convertValue(battery_power, round).split(' ')[1]}` : convertValue(battery_power, round) || '0'}` : `${config.battery.show_absolute === true ? `${Math.abs(battery_power)}` : battery_power || 0} W`}</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.battery_current_191)}>
            <text id="battery_current_191" x="193" y="365.3" display="${config.entities.battery_current_191 === 'none' || config.show_battery === false ? 'none' : ''}" fill=${battery_colour} class="${font !== true ? 'st14' : 'st4'} st8">${config.battery.show_absolute === true ? Math.abs(parseFloat(stateObj35.state)).toFixed(1) : parseFloat(stateObj35.state).toFixed(1)} A</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.grid_ct_power_172)}>
              <text id="grid_ct_power_172" x="135" y="${config.inverter.three_phase === true ? '205.5' : '219.2'}" display="${config.entities.grid_ct_power_172 === 'none' ? 'none' : ''}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${grid_colour}">${config.grid.auto_scale === true ? `${convertValue(grid_power, round) || 0}` : `${grid_power || 0} W`}</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.grid_ct_power_L2)}>
              <text id="grid_ct_power_L2" x="135" y="220" display="${config.inverter.three_phase === true  && config.entities?.grid_ct_power_L2 ? '' : 'none'}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${grid_colour}">${config.grid.auto_scale === true ? `${convertValue(grid_power_L2, round) || 0}` : `${grid_power_L2 || 0} W`}</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.grid_ct_power_L3)}>
              <text id="grid_ct_power_L3" x="135" y="234.5" display="${config.inverter.three_phase === true  && config.entities?.grid_ct_power_L3 ? '' : 'none'}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${grid_colour}">${config.grid.auto_scale === true ? `${convertValue(grid_power_L3, round) || 0}` : `${grid_power_L3 || 0} W`}</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv1_voltage_109)}>
              <text id="pv1_voltage" x="${config.solar.mppts === 1 ? '244.7' : '194'}" y="106" class="st3 left-align" display="${config.show_solar === false || !config.entities.pv1_voltage_109 || config.entities.pv1_voltage_109 === 'none' ? 'none' : ''}" fill="${solar_colour}" >${parseFloat(stateObj16.state).toFixed(1)} V</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv1_current_110)}>
              <text id="pv1_current" x="${config.solar.mppts === 1 ? '244.7' : '194'}" y="94" class="st3 left-align" display="${config.show_solar === false || !config.entities.pv1_current_110 || config.entities.pv1_current_110 === 'none' ? 'none' : ''}" fill="${solar_colour}" >${parseFloat(stateObj17.state).toFixed(1)} A</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv2_voltage_111)}>
              <text id="pv2_voltage" x="296" y="106" class="st3 left-align" display="${config.show_solar === false || !config.entities.pv2_voltage_111 || config.entities.pv2_voltage_111 === 'none' || config.solar.mppts === 1 ? 'none' : ''}" fill="${solar_colour}" >${parseFloat(stateObj18.state).toFixed(1)} V</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv2_current_112)}>
              <text id="pv2_current" x="296" y="94" class="st3 left-align" display="${config.show_solar === false || !config.entities.pv2_current_112 || config.entities.pv2_current_112 === 'none' || config.solar.mppts === 1 ? 'none' : ''}" fill="${solar_colour}" >${parseFloat(stateObj19.state).toFixed(1)} A</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv3_voltage_113)}>
              <text id="pv3_voltage" x="120" y="106" class="st3 left-align" display="${config.show_solar === false || !config.entities.pv3_voltage_113 || config.entities.pv3_voltage_113 === 'none' || config.solar.mppts === 1 || config.solar.mppts === 2 ? 'none' : ''}" fill="${solar_colour}" >${parseFloat(stateObj27.state).toFixed(1)} V</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv3_current_114)}>
              <text id="pv3_current" x="120" y="94" class="st3 left-align" display="${config.show_solar === false || !config.entities.pv3_current_114 || config.entities.pv3_current_114 === 'none' || config.solar.mppts === 1 || config.solar.mppts === 2 ? 'none' : ''}" fill="${solar_colour}" >${parseFloat(stateObj28.state).toFixed(1)} A</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv4_voltage_115)}>
              <text id="pv4_voltage" x="372" y="106" class="st3 left-align" display="${config.show_solar === false || !config.entities.pv4_voltage_115 || config.entities.pv4_voltage_115 === 'none' || config.solar.mppts === 1 || config.solar.mppts === 2 || config.solar.mppts === 3 ? 'none' : ''}" fill="${solar_colour}" >${parseFloat(stateObj29.state).toFixed(1)} V</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv4_current_116)}>
              <text id="pv4_current" x="372" y="94" class="st3 left-align" display="${config.show_solar === false || !config.entities.pv4_current_116 || config.entities.pv4_current_116 === 'none' || config.solar.mppts === 1 || config.solar.mppts === 2 || config.solar.mppts === 3 ? 'none' : ''}" fill="${solar_colour}" >${parseFloat(stateObj30.state).toFixed(1)} A</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.battery_temp_182)}>
              <text id="battery_temp_182" x="250" y="324.5" class="${config.entities?.battery_temp_182 ? 'st3 left-align' : 'st12'}" fill="${battery_colour}" display="${config.show_battery === false ? 'none' : ''}" >${stateObj37.state}°</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.radiator_temp_91)}>
            <text id="ac_temp" x="173" y="168.2" class="st3 left-align" fill="${inverter_colour}" display="${config.entities?.radiator_temp_91 ? '' : 'none'}" >AC: ${parseFloat(stateObj39.state).toFixed(1)}°</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.dc_transformer_temp_90)}>
              <text id="dc_temp" x="173" y="180.4" class="st3 left-align" fill="${inverter_colour}" display="${config.entities?.dc_transformer_temp_90 ? '' : 'none'}" >DC: ${parseFloat(stateObj38.state).toFixed(1)}°</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.essential_load1_extra)}>
               <text id="ess_load1_extra" x="465" y="157" display="${config.entities?.essential_load1_extra && (additional_load === 1 || additional_load === 2)  ? '' : 'none'}" class="st3 .right-align" fill="${load_colour}">${isNaN(parseFloat(stateObj52.state)) ? '0' : `${parseFloat(stateObj52.state).toFixed(1)} ${stateObj52.attributes.unit_of_measurement}`}</text>
            </a>
            <a href="#" @click=${(e) => this.handlePopup(e, config.entities.essential_load2_extra)}>
               <text id="ess_load2_extra" x="465" y="282" display="${config.entities?.essential_load2_extra && additional_load === 2 ? '' : 'none'}" class="st3 .right-align" fill="${load_colour}">${isNaN(parseFloat(stateObj53.state)) ? '0' : `${parseFloat(stateObj53.state).toFixed(1)} ${stateObj53.attributes.unit_of_measurement}`}</text>
            </a>          
            ${grid_power >= 0
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.energy_cost_buy)}>
              <text id="energy_cost" x="105" y="${config.inverter.three_phase === true ? '186' : '195'}" class="st3 left-align" fill="${grid_colour}" display="${config.entities?.energy_cost_buy ? '' : 'none'}" >${energy_cost} ${stateObj43.attributes.unit_of_measurement}</text>
                  </a>`
          : svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.energy_cost_sell)}>
              <text id="energy_cost" x="105" y="${config.inverter.three_phase === true ? '186' : '195'}"  class="st3 left-align" fill="${grid_colour}" display="${config.entities?.energy_cost_sell ? '' : 'none'}" >${energy_cost} ${stateObj51.attributes.unit_of_measurement}</text>
                  </a>`}
            ${config.entities?.pv_total
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv_total)}>
                    <text id="pvtotal_power" x="238.8" y="133.9" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.solar.mppts === 1 ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(total_pv, round) || 0}` : `${total_pv || 0} W`}</text>
                  </a>`
          : svg`<text id="pvtotal_power" x="238.8" y="133.9" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.solar.mppts === 1 ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(total_pv, round) || 0}` : `${total_pv || 0} W`}</text>`}
            ${config.entities?.pv1_power_186
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv1_power_186)}>
                    <text id="pv1_power_186" x="${config.solar.mppts === 1 ? '238.8' : '188.1'}" y="71" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(parseFloat(stateObj9.state).toFixed(0), round)}` : `${parseFloat(stateObj9.state).toFixed(0)} W`}</text>
                  </a>`
          : svg`<text id="pv1_power_186" x="${config.solar.mppts === 1 ? '238.8' : '188.1'}" y="71" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.entities.pv1_power_186 === 'none' ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(parseFloat(stateObj9.state).toFixed(0), round)}` : `${parseFloat(stateObj9.state).toFixed(0)} W`}</text>`}
            ${config.entities?.pv2_power_187
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv2_power_187)}>
                    <text id="pv2_power_187" x="289.5" y="71" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.solar.mppts === 1 ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(parseFloat(stateObj8.state).toFixed(0), round)}` : `${parseFloat(stateObj8.state).toFixed(0)} W`}</text>
                  </a>`
          : svg`<text id="pv2_power_187" x="289.5" y="71" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.entities.pv2_power_187 === 'none' || config.solar.mppts === 1 ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(parseFloat(stateObj8.state).toFixed(0), round)}` : `${parseFloat(stateObj8.state).toFixed(0)} W`}</text>`}
            ${config.entities?.pv3_power_188
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv3_power_188)}>
                    <text id="pv3_power_188" x="113" y="71" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(parseFloat(stateObj31.state).toFixed(0), round)}` : `${parseFloat(stateObj31.state).toFixed(0)} W`}</text>
                  </a>`
          : svg`<text id="pv3_power_188" x="113" y="71" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.entities.pv3_power_188 === 'none' || config.solar.mppts === 1 || config.solar.mppts === 2 ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(parseFloat(stateObj31.state).toFixed(0), round)}` : `${parseFloat(stateObj31.state).toFixed(0)} W`}</text>`}
            ${config.entities?.pv4_power_189
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.pv4_power_189)}>
                    <text id="pv4_power_189" x="366" y="71" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.solar.mppts === 1 || config.solar.mppts === 2 || config.solar.mppts === 3 ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(parseFloat(stateObj32.state).toFixed(0), round)}` : `${parseFloat(stateObj32.state).toFixed(0)} W`}</text>
                  </a>`
          : svg`<text id="pv4_power_189" x="366" y="71" class="${font !== true ? 'st14' : 'st4'} st8" display="${config.show_solar === false || config.entities.pv4_power_189 === 'none' || config.solar.mppts === 1 || config.solar.mppts === 2 || config.solar.mppts === 3 ? 'none' : ''}" fill="${solar_colour}">${config.solar.auto_scale === true ? `${convertValue(parseFloat(stateObj32.state).toFixed(0), round)}` : `${parseFloat(stateObj32.state).toFixed(0)} W`}</text>`}
            ${config.entities?.essential_power
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.essential_power)}>
                    <text id="ess_power" x="340.1" y="219.2" class="${font !== true ? 'st14' : 'st4'} st8" fill="${load_colour}">${config.load.auto_scale === true ? `${convertValue(essential, round) || 0}` : `${essential || 0} W`}</text>
                  </a>`
          : svg`<text id="ess_power" x="340.1" y="219.2" class="${font !== true ? 'st14' : 'st4'} st8" fill="${load_colour}">${config.load.auto_scale === true ? `${convertValue(essential, round) || 0}` : `${essential || 0} W`}</text>`}
            ${config.entities?.essential_load1
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.essential_load1)}>
                    <text id="ess_load1" x="440" y="133" display="${(additional_load === 1 || additional_load === 2)  ? '' : 'none'}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj42.state)) ? '0' : convertValue(parseFloat(stateObj42.state), round)}` : `${parseFloat(stateObj42.state).toFixed(0) || 0} W`}</text>
                  </a>`
          : svg`<text id="ess_load1" x="440" y="133" display="${(additional_load === 1 || additional_load === 2)  ? '' : 'none'}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj42.state)) ? '0' : convertValue(parseFloat(stateObj42.state), round)}` : `${parseFloat(stateObj42.state).toFixed(0) || 0} W`}</text>`}
            ${config.entities?.essential_load2
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.essential_load2)}>
                    <text id="ess_load2" x="440" y="306.5" display="${additional_load === 2 ? '' : 'none'}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj45.state)) ? '0' : convertValue(parseFloat(stateObj45.state), round)}` : `${parseFloat(stateObj45.state).toFixed(0) || 0} W`}</text>
                  </a>`
          : svg`<text id="ess_load2" x="440" y="306.5" display="${additional_load === 2 ? '' : 'none'}" class="${font !== true ? 'st14' : 'st4'} st8" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj45.state)) ? '0' : convertValue(parseFloat(stateObj45.state), round)}` : `${parseFloat(stateObj45.state).toFixed(0) || 0} W`}</text>`}   
          
          ${config.entities?.essential_load1
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.essential_load1)}>
                    <text id="ess_load4" x="423" y="138" display="${additional_load === 4 ? '' : 'none'}" class="st3" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj42.state)) ? '0' : convertValue(parseFloat(stateObj42.state), round)}` : `${parseFloat(stateObj42.state).toFixed(0) || 0} W`}</text>
                  </a>`
          : svg`<text id="ess_load4" x="423" y="138" display="${additional_load === 4 ? '' : 'none'}" class="st3" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj42.state)) ? '0' : convertValue(parseFloat(stateObj42.state), round)}` : `${parseFloat(stateObj42.state).toFixed(0) || 0} W`}</text>`}   
            ${config.entities?.essential_load2
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.essential_load2)}>
                    <text id="ess_load4" x="459" y="138" display="${additional_load === 4 ? '' : 'none'}" class="st3" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj45.state)) ? '0' : convertValue(parseFloat(stateObj45.state), round)}` : `${parseFloat(stateObj45.state).toFixed(0) || 0} W`}</text>
                  </a>`
          : svg`<text id="ess_load4" x="459" y="138" display="${additional_load === 4 ? '' : 'none'}" class="st3" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj45.state)) ? '0' : convertValue(parseFloat(stateObj45.state), round)}` : `${parseFloat(stateObj45.state).toFixed(0) || 0} W`}</text>`}   
            ${config.entities?.essential_load3
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.essential_load3)}>
                    <text id="ess_load4" x="423" y="301" display="${additional_load === 4 ? '' : 'none'}" class="st3" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj64.state)) ? '0' : convertValue(parseFloat(stateObj64.state), round)}` : `${parseFloat(stateObj64.state).toFixed(0) || 0} W`}</text>
                  </a>`
          : svg`<text id="ess_load4" x="423" y="301" display="${additional_load === 4 ? '' : 'none'}" class="st3" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj64.state)) ? '0' : convertValue(parseFloat(stateObj64.state), round)}` : `${parseFloat(stateObj64.state).toFixed(0) || 0} W`}</text>`}   
            ${config.entities?.essential_load4
          ? svg`<a href="#" @click=${(e) => this.handlePopup(e, config.entities.essential_load4)}>
                    <text id="ess_load4" x="459" y="301" display="${additional_load === 4 ? '' : 'none'}" class="st3" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj65.state)) ? '0' : convertValue(parseFloat(stateObj65.state), round)}` : `${parseFloat(stateObj65.state).toFixed(0) || 0} W`}</text>
                  </a>`
          : svg`<text id="ess_load4" x="459" y="301" display="${additional_load === 4 ? '' : 'none'}" class="st3" fill="${load_colour}">${config.load.auto_scale === true ? `${isNaN(parseFloat(stateObj65.state)) ? '0' : convertValue(parseFloat(stateObj65.state), round)}` : `${parseFloat(stateObj65.state).toFixed(0) || 0} W`}</text>`}        
        </svg>
        </div>
        </ha-card>
      `;
    }
  }

  setConfig(config) {

    if (config.show_battery === true && !config.battery) {
      throw Error(localize('errors.battery.bat'));
    } else {
      if (config.show_battery === true && !config.battery.shutdown_soc) {
        throw new Error(localize('errors.battery.shutdown_soc'));
      }
      if (config.show_battery === true && config.battery.full_capacity < 80) {
        throw new Error(localize('errors.battery.full_capacity'));
      }
      if (config.show_battery === true && config.battery.empty_capacity > 30) {
        throw new Error(localize('errors.battery.empty_capacity'));
      }
      if (config.show_battery === true && config.battery.show_daily === true && (!config.entities.day_battery_charge_70 || !config.entities.day_battery_discharge_71)) {
        throw Error(localize('errors.battery.show_daily'));
      }
    }
    if (config.show_solar === true && !config.solar) {
      throw Error(localize('errors.solar.sol'));
    } else {
      if (config.show_solar === true && !config.solar.mppts) {
        throw Error(localize('errors.solar.mppts'));
      }
      if (config && config.solar && config.show_solar === true && config.solar.show_daily === true && !config.entities.day_pv_energy_108) {
        throw Error(localize('errors.solar.show_daily'));
      }
    }

    if ((config && config.grid && config.grid.show_daily_buy === true && !config.entities.day_grid_import_76) || (config && config.grid && config.grid.show_daily_sell === true && !config.entities.day_grid_export_77)) {
      throw Error(localize('errors.grid.show_daily'));
    }

    if ((config && config.entities && config.entities.essential_power === 'none' && !config.entities.inverter_power_175) || (config && config.entities && config.entities.essential_power === 'none' && config.entities.inverter_power_175 === 'none')) {
      throw Error(localize('errors.essential_power'));
    }

    if ((config && config.entities && config.entities.nonessential_power === 'none' && !config.entities.grid_power_169)) {
      throw Error(localize('errors.nonessential_power'));
    }

    const all_attributes = [
      'battery_soc_184', 'battery_power_190', 'battery_current_191', 'grid_ct_power_172', 'pv1_power_186'
    ];

    for (const attr of all_attributes) {

      if ((attr === 'pv1_power_186' && config.show_solar === true && !config.entities[attr]) && !config.entities[attr]) {
        throw new Error(`${localize('errors.missing_entity')} e.g: ${attr}: sensor.example`);
      }
    }

    const customConfig: sunsynkPowerFlowCardConfig = JSON.parse(JSON.stringify(config));

    this._config = merge({}, defaultConfig, customConfig);
  }

  handlePopup(e, entity) {
    e.stopPropagation();
    const entityId = entity;
    //console.log(entity);
    this._handleClick(this, { action: "more-info" }, entityId);
  }

  _handleClick(node, actionConfig, entityId) {
    let e;
    // eslint-disable-next-line default-case
    switch (actionConfig.action) {
      case "more-info": {
        e = new Event("hass-more-info", { composed: true });
        e.detail = { entityId };
        node.dispatchEvent(e);
        break;
      }
    }
  }


  getCardSize() {
    return 2;
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "sunsynk-power-flow-card",
  name: "Sunsynk Power Flow Card",
  preview: false, // Optional - defaults to false
  description: localize('common.description'), // Optional
});
