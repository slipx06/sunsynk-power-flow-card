##########################
Goodwe Inverter Configuration
##########################

*********
Example 1
*********

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: lite
  panel_mode: false
  show_solar: true
  title: Goodwe
  title_colour: grey
  title_size: 32px
  show_battery: true
  inverter:
    model: goodwe
    modern: true
    colour: grey
    autarky: energy
    three_phase: true
  battery:
    energy: 10650
    shutdown_soc: 20
    invert_power: false
    colour: green
    show_daily: true
    max_power: 5400
    full_capacity: 100
    empty_capacity: 20
    show_absolute: false
    auto_scale: true
  solar:
    show_daily: true
    display_mode: 1
    mppts: 2
    animation_speed: 9
    max_power: 5400
    pv1_name: East
    pv2_name: West
  load:
    show_daily: true
  grid:
    show_daily_buy: true
    show_daily_sell: true
    show_nonessential: true
    invert_grid: false
  entities:
      day_battery_discharge_71: sensor.today_battery_discharge
      day_battery_charge_70: sensor.today_battery_charge
      day_load_energy_84: sensor.today_load
      day_pv_energy_108: sensor.today_s_pv_generation
      inverter_voltage_154: sensor.on_grid_l1_voltage
      inverter_voltage_L2: sensor.on_grid_l2_voltage
      inverter_voltage_L3: sensor.on_grid_l3_voltage
      load_frequency_192: sensor.meter_frequency
      inverter_current_164: sensor.on_grid_l1_current
      inverter_current_L2: sensor.on_grid_l2_current
      inverter_current_L3: sensor.on_grid_l3_current
      inverter_power_175: zero
      grid_power_169: sensor.house_consumption
      pv1_power_186: sensor.pv2_power
      pv2_power_187: sensor.pv1_power
      battery_voltage_183: sensor.battery_voltage
      battery_soc_184: sensor.battery_state_of_charge
      battery_power_190: sensor.battery_power
      battery_current_191: sensor.battery_current
      load_power_L1: sensor.load_l1
      load_power_L2: sensor.load_l2
      load_power_L3: sensor.load_l3
      grid_ct_power_172: sensor.active_power_l1
      grid_ct_power_L2: sensor.active_power_l2
      grid_ct_power_L3: sensor.active_power_l3
      pv1_voltage_109: sensor.pv2_voltage
      pv1_current_110: sensor.pv2_current
      pv2_voltage_111: sensor.pv1_voltage
      pv2_current_112: sensor.pv1_current
      grid_connected_status_194: sensor.grid_mode_code
      inverter_status_59: sensor.work_mode_code
      battery_temp_182: sensor.battery_temperature
      radiator_temp_91: sensor.inverter_temperature_radiator
      dc_transformer_temp_90: sensor.inverter_temperature_air
      battery_status: sensor.battery_mode_code