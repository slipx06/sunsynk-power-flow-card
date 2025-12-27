#################
Sunsynk and Deye Inverters
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
  wide: false
  inverter:
    modern: true
    colour: grey
    autarky: 'power'
    auto_scale: true
    three_phase: false
  battery:
    count: 1
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
    animate: true
    path_threshold: 100
  solar:
    colour: orange
    show_daily: true
    mppts: 2
    animation_speed: 9
    max_power: 8000
    pv1_name: North
    pv1_max_power: 2750
    pv2_name: North
    pv2_max_power: 2750
    pv3_name: East
    pv3_max_power: 2750
    pv4_name: West
    pv4_max_power: 2750
    auto_scale: true
    display_mode: 1
    dynamic_colour: true
    efficiency: 3
    off_threshold: 0
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
    path_theshold: 100
    off_threshold: 0
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
    off_threshold: 0
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


*********************************************
Deye SUN-10K-SG02LP1-EU-AM3 (Solar Assistant)
*********************************************

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: full
  title: Deye SUN-10k-SG02LP1-EU-AM3
  title_colour: grey
  title_size: 24px
  show_battery: true
  show_solar: true
  show_grid: true
  decimal_places: 1
  dynamic_line_width: true
  min_line_width: 2
  max_line_width: 8
  card_height: 100%
  card_width: 100%
  wide: true
  large_font: true
  inverter:
    modern: true
    colour: grey
    autarky: power
    auto_scale: true
    three_phase: false
    model: deye
  decimal_places_energy: 1
  battery:
    count: 2
    show_daily: true
    max_power: 10000
    show_remaining_energy: true
    dynamic_colour: false
    battery_rated_capacity: 560
    soc_decimal_places: 1
    invert_power: true
    linear_gradient: true
    shutdown_soc: number.deye_sunsynk_sol_ark_output_shutdown_capacity
    energy: 12200
    remaining_energy_to_shutdown: true
    show_absolute: false
    invert_flow: false
  battery2:
    energy: 12200
    shutdown_soc: number.deye_sunsynk_sol_ark_output_shutdown_capacity
    soc_decimal_places: 1
    battery_soc: sensor.deye_sunsynk_sol_ark_state_of_charge_2
    invert_power: true
    linear_gradient: true
    show_remaining_energy: true
    invert_flow: true
    remaining_energy_to_shutdown: true
  solar:
    show_daily: true
    mppts: 3
    max_power: 11100
    pv1_name: porch
    pv3_name: garden
    pv2_name: roof
    dynamic_colour: false
    pv1_max_power: 3500
    pv2_max_power: 4600
    pv3_max_power: 3000
    display_mode: 1
    auto_scale: false
  load:
    show_daily: true
    load1_name: Aircon
    load1_icon: mdi:air-conditioner
    load2_name: Aircon
    load2_icon: ""
    load1_switch: climate.local_daikin
    dynamic_icon: true
    essential_name: melwood home
    dynamic_colour: false
  grid:
    show_daily_buy: true
    show_daily_sell: false
    show_nonessential: true
    grid_name: PEA
    nonessential_icon: mdi:radiator
    load1_name: Sauna
    load1_icon: mdi:radiator
    nonessential_name: Sauna
    energy_cost_decimals: 0
    auto_scale: false
    disconnected_icon: mdi:lan-disconnect
  entities:
    use_timer_248: switch.deye_sunsynk_sol_ark_use_timer
    priority_load_243: switch.deye_sunsynk_sol_ark_prioritize_load
    inverter_voltage_154: sensor.deye_sunsynk_sol_ark_grid_voltage
    load_frequency_192: sensor.deye_sunsynk_sol_ark_ac_output_frequency
    inverter_current_164: sensor.deye_sunsynk_sol_ark_current
    inverter_power_175: sensor.deye_sunsynk_sol_ark_power
    grid_connected_status_194: binary_sensor.deye_sunsynk_sol_ark_grid_connected_status
    inverter_status_59: sensor.deye_sunsynk_sol_ark_device_mode
    day_battery_charge_70: sensor.deye_sunsynk_sol_ark_battery_energy_in
    day_battery_discharge_71: sensor.deye_sunsynk_sol_ark_battery_energy_out
    battery_voltage_183: sensor.deye_sunsynk_sol_ark_voltage
    battery_soc_184: sensor.deye_sunsynk_sol_ark_state_of_charge
    battery_power_190: sensor.deye_sunsynk_sol_ark_power
    battery_current_191: sensor.deye_sunsynk_sol_ark_current
    battery2_voltage_183: sensor.deye_sunsynk_sol_ark_voltage_2
    battery2_soc_184: sensor.deye_sunsynk_sol_ark_state_of_charge_2
    battery2_power_190: sensor.deye_sunsynk_sol_ark_power_2
    battery2_current_191: sensor.deye_sunsynk_sol_ark_current_2
    grid_power_169: sensor.deye_sunsynk_sol_ark_grid_power
    day_grid_import_76: sensor.deye_sunsynk_sol_ark_grid_energy_in
    day_grid_export_77: sensor.deye_sunsynk_sol_ark_grid_energy_out
    grid_ct_power_172: sensor.deye_sunsynk_sol_ark_grid_power_ct
    day_load_energy_84: sensor.deye_sunsynk_sol_ark_load_energy
    essential_power: sensor.deye_sunsynk_sol_ark_load_power_essential
    nonessential_power: sensor.deye_sunsynk_sol_ark_load_power_non_essential
    aux_power_166: sensor.deye_sunsynk_sol_ark_aux_power
    day_pv_energy_108: sensor.deye_sunsynk_sol_ark_pv_energy
    pv1_power_186: sensor.deye_sunsynk_sol_ark_pv_power_1
    pv2_power_187: sensor.deye_sunsynk_sol_ark_pv_power_2
    pv3_power_188: sensor.deye_sunsynk_sol_ark_pv_power_3
    pv1_voltage_109: sensor.deye_sunsynk_sol_ark_pv_voltage_1
    pv1_current_110: sensor.deye_sunsynk_sol_ark_pv_current_1
    pv2_voltage_111: sensor.deye_sunsynk_sol_ark_pv_voltage_2
    pv2_current_112: sensor.deye_sunsynk_sol_ark_pv_current_2
    pv3_voltage_113: sensor.deye_sunsynk_sol_ark_pv_voltage_3
    pv3_current_114: sensor.deye_sunsynk_sol_ark_pv_current_3
    essential_load1: sensor.shelly_sauna_heater_power
    grid_voltage: sensor.deye_sunsynk_sol_ark_grid_voltage
    non_essential_load1: sensor.shelly_sauna_heater_power
    energy_cost_buy: sensor.sdb_shala_energy_current_energy_price_cost
    large_font: true
    pv_total: sensor.deye_sunsynk_sol_ark_pv_power
    remaining_solar: sensor.energy_production_today_remaining
    environment_temp: sensor.dogatmo_temperature
    battery_temp_182: sensor.deye_sunsynk_sol_ark_battery_temperature
    battery2_temp_182: sensor.deye_sunsynk_sol_ark_temperature_2
    battery_rated_capacity: sensor.deye_sunsynk_sol_ark_capacity
    battery2_rated_capacity: sensor.deye_sunsynk_sol_ark_capacity_2
    prog1_time: select.deye_sunsynk_sol_ark_time_point_1
    prog2_time: select.deye_sunsynk_sol_ark_time_point_2
    prog3_time: select.deye_sunsynk_sol_ark_time_point_3
    prog4_time: select.deye_sunsynk_sol_ark_time_point_4
    prog5_time: select.deye_sunsynk_sol_ark_time_point_5
    prog6_time: select.deye_sunsynk_sol_ark_time_point_6
    prog1_capacity: number.deye_sunsynk_sol_ark_capacity_point_1
    prog2_capacity: number.deye_sunsynk_sol_ark_capacity_point_2
    prog3_capacity: number.deye_sunsynk_sol_ark_capacity_point_3
    prog4_capacity: number.deye_sunsynk_sol_ark_capacity_point_4
    prog5_capacity: number.deye_sunsynk_sol_ark_capacity_point_5
    prog6_capacity: number.deye_sunsynk_sol_ark_capacity_point_6
    prog1_charge: number.deye_sunsynk_sol_ark_grid_charge_point_1
    prog2_charge: number.deye_sunsynk_sol_ark_grid_charge_point_2
    prog3_charge: number.deye_sunsynk_sol_ark_grid_charge_point_3
    prog4_charge: number.deye_sunsynk_sol_ark_grid_charge_point_4
    prog5_charge: number.deye_sunsynk_sol_ark_grid_charge_point_5
    prog6_charge: number.deye_sunsynk_sol_ark_grid_charge_point_6