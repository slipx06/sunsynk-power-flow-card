##########################
Solis S6 or S2-WL-ST Inverter Configuration
##########################

******************************************************************************************
Example 1 - Integration via https://github.com/fboundy/ha_solis_modbus
******************************************************************************************

.. code-block:: yaml
  :linenos:

    type: custom:sunsynk-power-flow-card
    cardstyle: full
    show_solar: true
    inverter:
      model: solis
    battery:
      energy: 54
      shutdown_soc: 20
      show_daily: true
    solar:
      show_daily: true
      mppts: 2
    load:
      show_daily: true
    grid:
      show_daily_buy: true
      show_daily_sell: false
      show_nonessential: false
    entities:
      inverter_voltage_154: sensor.solis_inverter_voltage
      load_frequency_192: sensor.solis_inverter_frequency
      inverter_current_164: sensor.solis_inverter_current
      inverter_power_175: sensor.solis_inverter_ac_power
      grid_connected_status_194: null
      grid_voltage: sensor.solis_grid_voltage
      inverter_status_59: sensor.solis_inverter_status
      day_battery_charge_70: none
      day_battery_discharge_71: none
      battery_voltage_183: sensor.solis_battery_voltage
      battery_soc_184: sensor.solis_battery_soc_lead
      battery_power_190: sensor.solis_battery_power
      battery_current_191: sensor.solis_battery_current
      battery_current_direction: sensor.solis_battery_current_direction
      grid_power_169: sensor.solis_grid_active_power_negative
      day_grid_import_76: sensor.solis_daily_energy_imported
      day_grid_export_77: sensor.solis_daily_energy_exported
      grid_ct_power_172: sensor.solis_grid_active_power_negative
      day_load_energy_84: sensor.solis_daily_consumption
      essential_power: sensor.solis_backup_load_power
      nonessential_power: none
      aux_power_166: none
      day_pv_energy_108: none
      pv1_power_186: none
      pv2_power_187: none
      pv1_voltage_109: sensor.solis_pv1_voltage
      pv1_current_110: sensor.solis_pv1_current
      pv2_voltage_111: sensor.solis_pv2_voltage
      pv2_current_112: sensor.solis_pv2_current

