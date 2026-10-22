##############
Lux Inverter
##############

*********
Example 1
*********

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

************************************************************************************
Example 2 using the lxp-bridge integration (https://github.com/celsworth/lxp-bridge)
************************************************************************************

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: lite
  show_solar: true
  inverter:
    model: lux
  battery:
    energy: 12800
    shutdown_soc: 20
    show_daily: true
    invert_power: true
  solar:
    show_daily: true
    mppts: 2
    pv1_name: PV1
    pv2_name: PV2
  load:
    show_daily: true
  grid:
    show_daily_buy: true
    show_daily_sell: true
    show_nonessential: false
    invert_grid: true
    additional_loads: 0
  entities:
    inverter_voltage_154: sensor.lxp_baXXXXXXXX_grid_voltage
    load_frequency_192: sensor.lxp_baXXXXXXXX_eps_frequency
    inverter_current_164: NONE
    inverter_status_59: NONE
    inverter_power_175: sensor.lxp_baXXXXXXXX_inverter_power
    day_battery_charge_70: sensor.lxp_baXXXXXXXX_battery_charge_today
    day_battery_discharge_71: sensor.lxp_baXXXXXXXX_battery_discharge_today
    battery_voltage_183: sensor.lxp_baXXXXXXXX_battery_voltage
    battery_soc_184: sensor.lxp_baXXXXXXXX_battery_percentage
    battery_power_190: sensor.lxp_baXXXXXXXX_battery_power_discharge_is_negative
    battery_current_191: NONE
    grid_power_169: sensor.lxp_baXXXXXXXX_grid_power_export_is_negative
    day_grid_import_76: sensor.lxp_baXXXXXXXX_energy_from_grid_today
    day_grid_export_77: sensor.lxp_baXXXXXXXX_energy_to_grid_today
    grid_ct_power_172: NONE
    day_load_energy_84: sensor.lxp_baXXXXXXXX_energy_of_inverter_today
    essential_power: sensor.lxp_baXXXXXXXX_inverter_power
    nonessential_power: NONE
    aux_power_166: NONE
    day_pv_energy_108: sensor.lxp_baXXXXXXXX_pv_generation_today
    pv_total: sensor.lxp_baXXXXXXXX_power_pv_array
    pv1_power_186: sensor.lxp_baXXXXXXXX_power_pv_string_1
    pv2_power_187: sensor.lxp_baXXXXXXXX_power_pv_string_2
    pv1_voltage_109: sensor.lxp_baXXXXXXXX_voltage_pv_string_1
    pv1_current_110: NONE
    pv2_voltage_111: sensor.lxp_baXXXXXXXX_voltage_pv_string_2
    pv2_current_112: NONE
    radiator_temp_91: sensor.lxp_baXXXXXXXX_radiator_1_temperature
    dc_transformer_temp_90: sensor.lxp_baXXXXXXXX_radiator_2_temperature
    remaining_solar: sensor.forecast_remaining_today
    energy_cost: NONE

.. note::

   Replace ``baXXXXXXXX`` with your wifi dongle number