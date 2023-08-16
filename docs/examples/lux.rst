##########################
Lux Inverter Configuration
##########################


.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: lite
  show_solar: true
  inverter:
    model: lux
  battery:
    show: true
    energy: 12800
    shutdown_soc: 1
    show_daily: true
    invert_power: true
  solar:
    show_daily: true
    mppts: 2
    pv1_name: Rear
    pv2_name: Front
  load:
    show_daily: true
  grid:
    show_daily_buy: true
    show_daily_sell: true
    show_nonessential: false
    invert_grid: true
    additional_loads: 2
  entities:
    inverter_voltage_154: sensor.lux_grid_voltage_live
    load_frequency_192: sensor.lux_grid_frequency_live
    inverter_current_164: sensor.inverter_output_current
    inverter_status_59: sensor.lux_status
    inverter_power_175: sensor.lux_battery_flow_live
    day_battery_charge_70: sensor.lux_battery_charge_daily
    day_battery_discharge_71: sensor.lux_battery_discharge_daily
    battery_voltage_183: sensor.lux_battery_voltage_live
    battery_soc_184: sensor.lux_battery
    battery_power_190: sensor.lux_battery_flow_live
    battery_current_191: sensor.lux_battery_capacity_ah
    grid_power_169: sensor.lux_grid_flow_live
    day_grid_import_76: sensor.lux_power_from_grid_daily
    day_grid_export_77: sensor.lux_power_to_grid_daily
    grid_ct_power_172: sensor.lux_grid_flow_live
    day_load_energy_84: sensor.lux_power_from_inverter_to_home_daily
    essential_power: sensor.lux_home_consumption_live
    nonessential_power: none
    aux_power_166: sensor.aux_output_power
    day_pv_energy_108: sensor.lux_solar_output_daily
    pv_total: sensor.lux_solar_output_live
    pv1_power_186: sensor.lux_solar_output_array_1_live
    pv2_power_187: sensor.lux_solar_output_array_2_live
    pv1_voltage_109: sensor.lux_solar_voltage_array_1_live
    pv1_current_110: none
    pv2_voltage_111: sensor.lux_solar_voltage_array_2_live
    pv2_current_112: none
    radiator_temp_91: sensor.lux_radiator_1_temperature_live
    dc_transformer_temp_90: sensor.lux_radiator_2_temperature_live
    remaining_solar: sensor.forecast_remaining_today
    energy_cost: sensor.octopus_energy_electricity_20e5081533_2380002009185_current_rate
