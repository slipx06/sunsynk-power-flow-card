################
SolaX Inverter
################

******************************************************************************************
Example 1
******************************************************************************************

.. code-block:: yaml
  :linenos:

    type: custom:sunsynk-power-flow-card
    cardstyle: compact
    show_solar: true
    show_grid: true
    show_battery: true
    large_font: false
    panel_mode: false
    inverter:
      auto_scale: false
      modern: false
      model: solax
    battery:
      energy: 17600
      shutdown_soc: 11
      show_daily: true
      invert_power: true
      max_power: 3750
      auto_scale: false
      show_absolute: false
      hide_soc: false
    solar:
      show_daily: true
      mppts: 1
      max_power: 7000
      display_mode: 2
      animation_speed: 9
      dynamic_colour: false
    load:
      show_daily: true
      max_power: 15000
      show_aux: false
      show_nonessential: true
      additional_loads: 2
      load1_name: Water
      load2_name: EV
      load1_icon: mdi:thermometer-water
      load2_icon: mdi:ev-station
      animation_speed: 9
    grid:
      show_daily_buy: true
      show_daily_sell: true
      show_nonessential: false
      animation_speed: 9
      auto_scale: false
      export_colour:
        - 194
        - 6
        - 219
      no_grid_colour:
        - 189
        - 188
        - 188
    entities:
      inverter_status_59: sensor.solax_run_mode
      inverter_voltage_154: sensor.solax_inverter_voltage
      inverter_current_164: sensor.solax_inverter_current
      inverter_power_175: sensor.solax_inverter_power
      radiator_temp_91: sensor.solax_inverter_temperature
      day_battery_charge_70: sensor.solax_battery_input_energy_today
      day_battery_discharge_71: sensor.solax_battery_output_energy_today
      battery_voltage_183: sensor.solax_battery_voltage_charge
      battery_soc_184: sensor.solax_battery_capacity
      battery_power_190: sensor.solax_battery_power_charge
      battery_current_191: sensor.solax_battery_current_charge
      battery_temp_182: sensor.solax_battery_temperature
      day_grid_import_76: sensor.solax_today_s_import_energy
      day_grid_export_77: sensor.solax_today_s_export_energy
      grid_power_169: sensor.solax_grid_export_import_sum2
      grid_ct_power_172: sensor.solax_grid_export_import_sum2
      day_load_energy_84: sensor.powerflow_today_house_load
      day_pv_energy_108: sensor.solax_today_s_solar_energy
      pv1_power_186: sensor.solax_pv_power_1
      pv1_voltage_109: sensor.solax_pv_voltage_1
      pv1_current_110: sensor.solax_pv_current_1
      remaining_solar: sensor.solcast_pv_forecast_forecast_remaining_today
      essential_load1: sensor.immersion_current_consumption
      essential_load1_extra: sensor.immersion_energy_day
      essential_load2: sensor.ev_power_consumption
      essential_load2_extra: sensor.ev_fast_charge_day
