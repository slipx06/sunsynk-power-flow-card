################
FoxESS Inverter
################

******************************************************************************************
Example 1 - Integration via https://github.com/nathanmarlor/foxess_modbus
******************************************************************************************

.. code-block:: yaml
  :linenos:

    type: custom:sunsynk-power-flow-card
    cardstyle: full
    panel_mode: true
    card_width: 80%
    show_solar: true
    inverter:
      auto_scale: true
      colour: '#b6baa9'
      modern: true
      model: foxess
      autarky: power
    battery:
      energy: 33000
      shutdown_soc: 35
      colour: pink
      max_power: 9000
      show_daily: true
      auto_scale: true
    solar:
      show_daily: true
      mppts: 3
      auto_scale: true
      max_power: 5000
      pv1_name: 1 South F
      pv2_name: 2 South R
      pv3_name: 3 North
    load:
      show_daily: false
      auto_scale: true
      additional_loads: 2
      load1_name: HW
      load1_icon: mdi:water-boiler
      load2_name: Kitchen
      load2_icon: mdi:stove
      show_aux: true
      aux_name: Climate
      aux_loads: 2
      aux_load1_name: Mitsu AC/Heat
      aux_load1_icon: mdi:heat-pump-outline
      aux_load2_name: Mirror Heater
      aux_load2_icon: mdi:mirror-rectangle
      essential_name: Main
    grid:
      show_daily_buy: true
      show_daily_sell: true
      max_power: 12000
      auto_scale: true
      show_nonessential: true
      nonessential_name: EV
      nonessential_icon: mdi:ev-station
      invert_grid: true
    entities:
      use_timer_248: 'no'
      priority_load_243: 'no'
      inverter_voltage_154: sensor.emontx4_vrms
      inverter_current_164: sensor.foxess_rcurrent
      inverter_power_175: sensor.foxess_rpower
      grid_connected_status_194: sensor.foxess_inverter_state
      inverter_status_59: sensor.foxess_inverter_state
      day_battery_charge_70: sensor.foxess_battery_charge_today
      day_battery_discharge_71: sensor.foxess_battery_discharge_today
      battery_voltage_183: sensor.foxess_batvolt
      battery_soc_184: sensor.foxess_battery_soc
      battery_power_190: sensor.foxess_invbatpower
      battery_current_191: sensor.foxess_invbatcurrent
      day_grid_import_76: sensor.foxess_grid_consumption_energy_today
      day_grid_export_77: sensor.foxess_feed_in_energy_today
      grid_power_169: sensor.foxess_load_power
      grid_ct_power_172: sensor.foxess_grid_ct
      day_load_energy_84: sensor.foxess_load_energy_today
      essential_power: sensor.essential_total_power
      nonessential_power: sensor.emontx4_p3
      aux_power_166: sensor.aux_total_power
      day_pv_energy_108: sensor.foxess_solar_energy_today
      pv1_power_186: sensor.foxess_pv1_power
      pv2_power_187: sensor.foxess_pv2_power
      pv3_power_188: sensor.foxess_pv3_power
      pv1_voltage_109: sensor.foxess_pv1_voltage
      pv1_current_110: sensor.foxess_pv1_current
      pv2_voltage_111: sensor.foxess_pv2_voltage
      pv2_current_112: sensor.foxess_pv2_current
      pv3_voltage_113: sensor.foxess_pv3_voltage
      pv3_current_114: sensor.foxess_pv3_current
      nonessential_load1: sensor.emontx4_p3
      essential_load1: sensor.emontx4_p8
      essential_load2: sensor.kitchen_power
      aux_load1: sensor.emontx4_p12
      aux_load2: sensor.shlyclkrm_heater_power
      aux_load2_extra: sensor.shlycloakroom_temperature_2
      energy_cost_buy: sensor.octopus_energy_electricity_xxx_yyy_current_rate
      energy_cost_sell: sensor.octopus_energy_electricity_xxx_yyy_export_current_rate
