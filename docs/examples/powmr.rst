#################
PowMr Inverters
#################

Integration via https://github.com/odya/esphome-powmr-hybrid-inverter

*****************************************************************************************************
Example - PowMr OW-HVM2.0H-12V inverter with 2.4kW Battery, 1.8kW Solar and Grid (used in a Caravan)
*****************************************************************************************************

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: lite
  panel_mode: true
  large_font: false
  title: PowMr Inverter - Power Monitor
  title_size: 12px
  show_solar: true
  show_battery: true
  show_grid: true
  decimal_places: 2
  dynamic_line_width: true
  max_line_width: 8
  inverter:
    modern: false
    colour: grey
    autarky: power
    auto_scale: true
    model: powmr
    three_phase: false
  battery:
    energy: 2400
    max_power: 2000
    shutdown_soc: 0
    colour: '#9A64A0'
    show_daily: true
    invert_power: true
    show_absolute: true
    hide_soc: false
    show_remaining_energy: true
    dynamic_colour: true            
    linear_gradient: true
  solar:
    show_daily: true
    mppts: 1
    maxpower: your-panel-total-watts-here
    pv1_name: Solar PV
    auto_scale: true
    display_mode: 2
    dynamic_colour: true
  load:
    show_daily: true
    max_power: 2000
    show_daily_aux: true
    show_aux: false
    invert_aux: false
    show_absolute_aux: false
    aux_name: Generator
    aux_type: gen
    aux_colour: '#5490c2'
    aux_off_colour: brown
    aux_loads: 0
    aux_load1_icon: ''
    aux_load2_icon: ''
    animation_speed: 4
    essential_name: Caravan
    additional_loads: 3
    load1_name: Kitchen
    load2_name: Bedroom
    load3_name: Lights
    load1_icon: mdi:gas-burner
    load2_icon: mdi:bed-outline
    load3_icon: mdi:light-flood-down
    load4_icon: ''
    auto_scale: true
    dynamic_icon: true
    dynamic_colour: true
    invert_load: false
    aux_dynamic_colour: true
  grid:
    grid_name: Utility Power
    max_power: 2000
    colour: '#FF2400'
    export_colour: green
    no_grid_colour: null
    grid_off_colour: '#e7d59f'
    show_daily_buy: true
    show_daily_sell: false
    show_nonessential: true
    invert_grid: false
    nonessential_name: Non Essential
    nonessential_icon: none
    additional_loads: 1
    load1_name: AirCon
    load2_name: EV
    load1_icon: mdi:fan
    load2_icon: mdi:car
    animation_speed: 7
    auto_scale: true
    dynamic_icon: true
    dynamic_colour: true
    energy_cost_decimals: 3
  entities:
    day_battery_charge_70: sensor.battery_charge_daily
    day_battery_discharge_71: sensor.battery_discharge_daily
    day_load_energy_84: sensor.powmr_inverter_load_consumed_daily
    day_grid_import_76: sensor.powmr_inverter_grid_imported_daily
    day_pv_energy_108: sensor.powmr_inverter_pv_yield_daily
    day_aux_energy: sensor.aircon_energy_daily_kwh
    inverter_voltage_154: sensor.powmr_inverter_load_voltage
    load_frequency_192: sensor.powmr_inverter_load_frequency            
    grid_power_169: sensor.powmr_inverter_load_consumed_daily
    total_pv_generation: sensor.powmr_inverter_pv_yield_daily
    inverter_current_164: sensor.powmr_inverter_load_current
    inverter_power_175: sensor.powmr_inverter_load_power
    inverter_status_59: sensor.powmr_inverter_charger_status
    pv1_power_186: sensor.powmr_inverter_pv_power         
    environment_temp: sensor.<YOUR-LOCATION>_temp
    remaining_solar: sensor.energy_production_today_remaining            
    pv1_voltage_109: sensor.powmr_inverter_pv_voltage
    pv1_current_110: sensor.powmr_inverter_pv_current
    battery_voltage_183: sensor.powmr_inverter_battery_voltage
    battery_soc_184: sensor.powmr_inverter_battery_soc
    battery_power_190: sensor.powmr_inverter_battery_power
    battery_current_191: sensor.powmr_inverter_battery_current
    essential_power: sensor.powmr_inverter_load_power
    essential_load1: sensor.kitchen_active_power
    essential_load2: sensor.bed_av__active_power
    essential_load1_extra: sensor.kitchen_temperature
    essential_load2_extra: sensor.bedroom_temperature
    load_power_L1: sensor.powmr_inverter_load_power
    nonessential_power: sensor.sunsynk_card_non_essential_active_power
    non_essential_load1: null
    non_essential_load2: null
    non_essential_load3: null
    grid_ct_power_172: sensor.powmr_inverter_grid_power
    grid_connected_status_194: sensor.powmr_inverter_grid_active
    aux_power_166: sensor.aircon_aux_active_power
    aux_load1_extra: sensor.caravan_internal_temperature
    aux_load2_extra: sensor.caravan_external_temperature
    grid_voltage: sensor.powmr_inverter_grid_voltage 
