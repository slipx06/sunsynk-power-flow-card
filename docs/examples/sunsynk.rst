#################
Sunsynk Inverter
#################


********************************
Minimum Configuration (No Solar, No Battery)
********************************

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: full
  show_solar: false
  show_battery: false
  entities:
    inverter_power_175: sensor.sunsynk_inverter_power
    grid_power_169: sensor.sunsynk_grid_power
    battery_soc_184: sensor.sunsynk_battery_soc
    battery_power_190: sensor.sunsynk_battery_power
    battery_current_191: sensor.sunsynk_battery_current
    grid_ct_power_172: sensor.sunsynk_grid_ct_power


*****************************
Minimum Configuration (Solar)
*****************************

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: full
  solar:
    mppts: 1
  battery:
    energy: 15960
    shutdown_soc: 20
  entities:
    inverter_power_175: sensor.sunsynk_inverter_power
    grid_power_169: sensor.sunsynk_grid_power
    battery_soc_184: sensor.sunsynk_battery_soc
    battery_power_190: sensor.sunsynk_battery_power
    battery_current_191: sensor.sunsynk_battery_current
    grid_ct_power_172: sensor.sunsynk_grid_ct_power
    pv1_power_186: sensor.sunsynk_pv1_power

*****************************
Minimal Configuration (No Solar)
*****************************

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: full
  show_solar: false
  battery:
    energy: 15960
    shutdown_soc: 20
  entities:
    inverter_voltage_154: sensor.sunsynk_inverter_voltage
    load_frequency_192: sensor.sunsynk_load_frequency
    inverter_current_164: sensor.sunsynk_inverter_current
    inverter_power_175: sensor.sunsynk_inverter_power
    grid_power_169: sensor.sunsynk_grid_power
    battery_voltage_183: sensor.sunsynk_battery_voltage
    battery_soc_184: sensor.sunsynk_battery_soc
    battery_power_190: sensor.sunsynk_battery_power
    battery_current_191: sensor.sunsynk_battery_current
    grid_ct_power_172: sensor.sunsynk_grid_ct_power
    grid_connected_status_194: binary_sensor.sunsynk_grid_connected_status
    inverter_status_59: sensor.overall_state

*****************************
Minimal Configuration (No Battery)
*****************************

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: full
  show_battery: false
  entities:
    inverter_voltage_154: sensor.sunsynk_inverter_voltage
    load_frequency_192: sensor.sunsynk_load_frequency
    inverter_current_164: sensor.sunsynk_inverter_current
    inverter_power_175: sensor.sunsynk_inverter_power
    grid_power_169: sensor.sunsynk_grid_power
    battery_voltage_183: sensor.sunsynk_battery_voltage
    battery_soc_184: sensor.sunsynk_battery_soc
    battery_power_190: sensor.sunsynk_battery_power
    battery_current_191: sensor.sunsynk_battery_current
    grid_ct_power_172: sensor.sunsynk_grid_ct_power
    grid_connected_status_194: binary_sensor.sunsynk_grid_connected_status
    inverter_status_59: sensor.overall_state

*****************************
Minimal Configuration (Solar and Battery)
*****************************

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: full
  solar:
    mppts: 2
  battery:
    energy: 15960
    shutdown_soc: 20
  load:
    show_aux: false
  entities:
    inverter_voltage_154: sensor.sunsynk_inverter_voltage
    load_frequency_192: sensor.sunsynk_load_frequency
    inverter_current_164: sensor.sunsynk_inverter_current
    inverter_power_175: sensor.sunsynk_inverter_power
    grid_power_169: sensor.sunsynk_grid_power
    battery_voltage_183: sensor.sunsynk_battery_voltage
    battery_soc_184: sensor.sunsynk_battery_soc
    battery_power_190: sensor.sunsynk_battery_power
    battery_current_191: sensor.sunsynk_battery_current
    grid_ct_power_172: sensor.sunsynk_grid_ct_power
    grid_connected_status_194: binary_sensor.sunsynk_grid_connected_status
    inverter_status_59: sensor.sunsynk_overall_state
    pv1_power_186: sensor.sunsynk_pv1_power
    pv2_power_187: sensor.sunsynk_pv2_power
    pv1_voltage_109: sensor.sunsynk_pv1_voltage
    pv1_current_110: sensor.sunsynk_pv1_current
    pv2_voltage_111: sensor.sunsynk_pv2_voltage
    pv2_current_112: sensor.sunsynk_pv2_current

********************************************
Minimal Configuration (Solar + Daily Totals)
********************************************

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: full
  solar:
    mppts: 2
    show_daily: true
  battery:
    energy: 15960
    shutdown_soc: 20
    show_daily: true
  load:
    show_daily: true
  grid:
    show_daily_buy: true
  entities:
    inverter_voltage_154: sensor.sunsynk_inverter_voltage
    load_frequency_192: sensor.sunsynk_load_frequency
    inverter_current_164: sensor.sunsynk_inverter_current
    inverter_power_175: sensor.sunsynk_inverter_power
    grid_power_169: sensor.sunsynk_grid_power
    battery_voltage_183: sensor.sunsynk_battery_voltage
    battery_soc_184: sensor.sunsynk_battery_soc
    battery_power_190: sensor.sunsynk_battery_power
    battery_current_191: sensor.sunsynk_battery_current
    grid_ct_power_172: sensor.sunsynk_grid_ct_power
    grid_connected_status_194: binary_sensor.sunsynk_grid_connected_status
    inverter_status_59: sensor.sunsynk_overall_state
    pv1_power_186: sensor.sunsynk_pv1_power
    pv2_power_187: sensor.sunsynk_pv2_power
    pv1_voltage_109: sensor.sunsynk_pv1_voltage
    pv1_current_110: sensor.sunsynk_pv1_current
    pv2_voltage_111: sensor.sunsynk_pv2_voltage
    pv2_current_112: sensor.sunsynk_pv2_current
    day_pv_energy_108: sensor.sunsynk_day_pv_energy
    day_battery_charge_70: sensor.sunsynk_day_battery_charge
    day_battery_discharge_71: sensor.sunsynk_day_battery_discharge
    day_load_energy_84: sensor.sunsynk_day_load_energy
    day_grid_import_76: sensor.sunsynk_day_grid_import

********************************
Full Configuration (All Options)
********************************

.. code-block:: yaml
  :linenos:
  
  type: custom:sunsynk-power-flow-card
  cardstyle: full
  panel_mode: false
  large_font: false
  title: Sunsynk Inverter
  title_colour: grey
  title_size: 32px
  show_solar: true
  show_battery: true
  show_grid: true
  decimal_places: 2
  dynamic_line_width: true
  min_line_width: 1
  max_line_width: 4
  inverter:
    modern: true
    colour: grey
    autarky: 'power'
    auto_scale: true
    three_phase: false
  battery:
    energy: 15960
    shutdown_soc: 20
    invert_power: false
    colour: pink
    show_daily: true
    animation_speed: 6
    max_power: 4500
    show_absolute: false
    auto_scale: true
    hide_soc: false
    dynamic_colour: true
    linear_gradient: true
  solar:
    colour: orange
    show_daily: true
    mppts: 2
    animation_speed: 9
    max_power: 8000
    pv1_name: North
    pv2_name: North
    pv3_name: East
    pv4_name: West
    auto_scale: true
    display_mode: 1
    dynamic_colour: true
  load:
    colour: '#5fb6ad'
    show_daily: true
    show_daily_aux: true
    show_aux: true
    invert_aux: false
    show_absolute_aux: false
    aux_name: Generator
    aux_type: gen
    aux_colour: green
    aux_off_colour: red
    aux_loads: 2
    aux_load1_name: Aux load 1
    aux_load2_name: Aux load 2
    aux_load1_icon: mdi:air-filter
    aux_load2_icon: mdi:stove
    animation_speed: 8
    max_power: 8000
    additional_loads: 2
    load1_name: Geyser
    load2_name: Pool
    load1_icon: boiler
    load2_icon: mdi:pool
    auto_scale: true
    dynamic_colour: true
  grid:
    colour: '#5490c2'
    export_colour: brown
    grid_off_colour: red
    show_daily_buy: true
    show_daily_sell: true
    no_grid_colour: '#a40013'
    show_nonessential: true
    invert_grid: false
    nonessential_name: Non Essential
    nonessential_icon: oven
    additional_loads: 2
    load1_name: Load 1
    load2_name: Load 2
    load1_icon: boiler
    load2_icon: mdi:ev-station
    animation_speed: 8
    max_power: 8000
    auto_scale: true
  entities:
    use_timer_248: switch.sunsynk_toggle_system_timer
    priority_load_243: switch.sunsynk_toggle_priority_load
    day_battery_charge_70: sensor.sunsynk_day_battery_charge
    day_battery_discharge_71: sensor.sunsynk_day_battery_discharge
    day_load_energy_84: sensor.sunsynk_day_load_energy
    day_grid_import_76: sensor.sunsynk_day_grid_import
    day_grid_export_77: sensor.sunsynk_day_grid_export
    day_pv_energy_108: sensor.sunsynk_day_pv_energy
    day_aux_energy: sensor.sunsynk_day_aux_energy
    inverter_voltage_154: sensor.sunsynk_inverter_voltage
    inverter_voltage_L2: null
    inverter_voltage_L3: null
    load_frequency_192: sensor.sunsynk_load_frequency
    inverter_current_164: sensor.sunsynk_inverter_current
    inverter_current_L2: null
    inverter_current_L3: null
    inverter_power_175: sensor.sunsynk_inverter_power
    grid_power_169: sensor.sunsynk_grid_power
    pv1_power_186: sensor.sunsynk_pv1_power
    pv2_power_187: sensor.sunsynk_pv2_power
    pv3_power_188: none
    pv4_power_189: none
    pv_total: sensor.sunsynk_totalsolar
    pv1_voltage_109: sensor.sunsynk_pv1_voltage
    pv1_current_110: sensor.sunsynk_pv1_current
    pv2_voltage_111: sensor.sunsynk_pv2_voltage
    pv2_current_112: sensor.sunsynk_pv2_current
    pv3_voltage_113: none
    pv3_current_114: none
    pv4_voltage_115: none
    pv4_current_116: none
    battery_voltage_183: sensor.sunsynk_battery_voltage
    battery_soc_184: sensor.sunsynk_battery_soc
    battery_power_190: sensor.sunsynk_battery_power
    battery_current_191: sensor.sunsynk_battery_current
    essential_power: none
    essential_load1: sensor.tuya_geyser_current_consumption
    essential_load2: sensor.load2_power
    essential_load1_extra: sensor.daily_geyser_energy
    essential_load2_extra: sensor.load2_extra
    nonessential_power: none
    non_essential_load1: sensor.nonessential1_power
    non_essential_load2: sensor.nonessential2_power
    grid_ct_power_172: sensor.sunsynk_grid_ct_power
    grid_ct_power_L2: null
    grid_ct_power_L3: null
    grid_connected_status_194: binary_sensor.sunsynk_grid_connected_status
    inverter_status_59: sensor.sunsynk_overall_state
    aux_power_166: sensor.sunsynk_aux_power
    aux_connected_status: binary_sensor.sunsynk_aux_connected_status
    remaining_solar: sensor.solcast_forecast_remaining_today
    battery_temp_182: sensor.sunsynk_battery_temperature
    radiator_temp_91: sensor.sunsynk_radiator_temperature
    dc_transformer_temp_90: sensor.sunsynk_dc_transformer_temperature
    environment_temp: sensor.home_realfeel_temperature
    prog1_time: sensor.sunsynk_time_slot_1
    prog1_capacity: number.sunsynk_prog1_capacity
    prog1_charge: switch.sunsynk_prog1_grid_charge
    prog2_time: sensor.sunsynk_time_slot_2
    prog2_capacity: number.sunsynk_prog2_capacity
    prog2_charge: switch.sunsynk_prog2_grid_charge
    prog3_time: sensor.sunsynk_time_slot_3
    prog3_capacity: number.sunsynk_prog3_capacity
    prog3_charge: switch.sunsynk_prog3_grid_charge
    prog4_time: sensor.sunsynk_time_slot_4
    prog4_capacity: number.sunsynk_prog4_capacity
    prog4_charge: switch.sunsynk_prog4_grid_charge
    prog5_time: sensor.sunsynk_time_slot_5
    prog5_capacity: number.sunsynk_prog5_capacity
    prog5_charge: switch.sunsynk_prog5_grid_charge
    prog6_time: sensor.sunsynk_time_slot_6
    prog6_capacity: number.sunsynk_prog6_capacity
    prog6_charge: switch.sunsynk_prog6_grid_charge
    energy_cost_buy: sensor.tibber_energy_cost_buy
    energy_cost_sell: sensor.tibber_energy_cost_sell
    solar_sell_247: switch.sunsynk_toggle_solar_sell
    aux_load1: sensor.gesyer
    aux_load2: sensor.pool_pump
    aux_load1_extra: sensor.daily_geyser_energy
    aux_load2_extra: sensor.pool_temperature
    load_power_L1: null
    load_power_L2: null
    load_power_L3: null
    total_pv_generation: null
    battery_status: null


